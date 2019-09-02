import { documentPath } from "./document"

async function git(...args: string[]): Promise<[number, string]> {
  if (!window || !window.runBashShell) {
    throw 'runBashShell is not defined'
  }
  return await window.runBashShell(`git -C ${await repositoriePath()} ${args.join(' ')}`)
}

// 检查文件是否发生过修改
export async function isModified(...files: string[]): Promise<boolean> {
  const modifieds = await modifiedFiles()
  return modifieds.some(modifile => files.some(file => modifile.includes(file)))
}

// 获取所有发生过改变的文件
export async function modifiedFiles(): Promise<string[]> {
  const root = await repositoriePath()

  const [status, output] = await git('status')
  if (status !== 0 || !output) {
    return []
  }

  const files = output.match(/modified:\s*.*\n/g)
  if (!files || !files.length) {
    return []
  }
  // TODO: 清除回车
  return files.map(file => `${root}/${file.replace(/[\r\n]/g, "").split('modified:   ')[1]}`)
}

// 判断当前的文档所在目录 是否是一个有效的 repositorie 仓库
export async function isRepositorie(): Promise<boolean> {
  const [status, _] = await git('status')

  if (status !== 0) {
    return false
  }

  return true
}

// 当前的文档所在目录的仓库路径
export async function repositoriePath(): Promise<string> {
  // 上面的 git 方法调用了这里
  const dirPath = await window.documentDirectoryPath()
  const [status, message] = await window.runBashShell(`git -C ${dirPath} rev-parse --show-toplevel`)
  if (status !== 0) {
    console.error('repositoriePath throw error')
    throw message
  }

  return message.replace(/[\r\n]/g, "") // 过滤一下回车
}

export type TVersion = {
  hash: string
  title: string
  author: string // 作者（author）的名字
  message: string
  updateTime: string // 更新的时间
  authorEmail: string // 作者的电子邮件地址
}

// 当前的文档的历史信息
export async function currentVersions(): Promise<TVersion[]> {
  // %H 提交对象（commit）的完整哈希字串
  // %h 提交对象的简短哈希字串
  // %T 树对象（tree）的完整哈希字串
  // %t 树对象的简短哈希字串
  // %P 父对象（parent）的完整哈希字串
  // %p 父对象的简短哈希字串
  // %an 作者（author）的名字
  // %ae 作者的电子邮件地址
  // %ad 作者修订日期（可以用-date= 选项定制格式）
  // %ar 作者修订日期，按多久以前的方式显示
  // %cn 提交者(committer)的名字
  // %ce 提交者的电子邮件地址
  // %cd 提交日期
  // %cr 提交日期，按多久以前的方式显示
  // %s 提交说明
  const boundaryMarker = "#FIELD#"
  const filePath = await documentPath()
  const format = ['%H', '%an', '%ae', '%s', '%N', '%ad'].join(boundaryMarker)
  const [status, output] = await git('log', `--pretty=format:"${format}"`, filePath)
  if (status !== 0) {
    // 执行错误
    console.error('currentVersions throw error')
    throw output
  }

  return output.split('\n').map(item => {
    const [hash, author, authorEmail, title, message, updateTime] = item.split(boundaryMarker)
    return { hash, author, authorEmail, title, message, updateTime }
  })
}

export type TCommit = {
  title: string // 标题
  files: string[] // 包含的文件
  message?: string // 信息
}

// 创建一个新的 Commit
export async function createCommit(options: TCommit): Promise<any> {
  const { title, message, files } = options
  // TODO: 判断文件是否进行过修改

  // 执行添加文件命令 TODO: 执行成功的考虑失败时推出来
  const allResult = await Promise.all(files.map(file => git('add', file)))
  const errResult = allResult.filter(([status, _]) => status !== 0)
  if (errResult.length) {
    Promise.reject(errResult.map(([_, message]) => message).join('\n'))
    return
  }

  // TODO: 用户输入可能包含 "" 符号
  const [status, output] = await git('commit', '-m', `"${title}"`, '-m', `"${message || 'no message'}"`)
  status !== 0 ? Promise.reject(output) : Promise.resolve(output)
}

// 创建一个新的分支
// export async function createBranch(): Promise<any> {
// }

export type TBranch = {
  id: string, // id
  name: string, // 名称
  current: boolean // 是否是当前分支
}

// 获取全部分支信息
export async function branchs(): Promise<TBranch[]> {
  const [status, rawData] = await git(`branch`)
  if (status !== 0) {
    // 执行错误
    console.error('branchs throw error')
    throw rawData
  }

  return rawData.split('\n').map(branch => {
    if (branch) {
      const branchItem = branch.replace(/\ +/g, "")
      if (branchItem[0] === "*") {
        const id = branchItem.substring(1)
        return { id, name: id, current: true }
      }
      return { id: branchItem, name: branchItem, current: false }
    }
  }).filter(Boolean) as any
}
