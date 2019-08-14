import { documentPath } from "./document"

async function runGit(params) {
  const dirPath = await repositoriePath()
  return await window.runBashShell(`git -C ${dirPath.replace(/[\r\n]/g, "")} ${params}`)
}

// 是否是一个有效的 git 仓库
export async function isRepositorie() {
  const [status, _] = await runGit(`status`)
  if (status !== 0) {
    return false
  }
  return true
}

// 仓库路径
export async function repositoriePath() {
  const dirPath = await documentDirectoryPath()
  const [status, message] = await window.runBashShell(`git -C ${dirPath} rev-parse --show-toplevel`)
  if (status !== 0) {
    throw message
  }
  return message
}

// 获取当前文档的版本历史
export async function currentVersions() {
  const filePath = await documentPath()
  const [status, message] = await runGit(`log ${filePath}`)
  if (status !== 0) {
    // 执行错误
    throw message
  }

  return message
}

// 创建一个新的 Commit
export async function createCommit(options) {
  const { title, message, branch } = options

  const filePath = await documentPath()
  await runGit(`add ${filePath}`)
  await runGit(`-m "${title}" -m "${message}`)
  // await runGit(`push origin/${branch}`)


  // if (status !== 0) {
  //   // 执行错误
  //   throw rawData
  // }

  // console.log(rawData)
}

// 创建一个新的分支
export async function createBranch() {
  if (!window || !window.runBashShell) {
    return []
  }

  const filePath = await documentPath()
  const dirPath = await documentDirectoryPath()
  const [status, rawData] = await window.runBashShell(`git log ${path}`)
  if (status !== 0) {
    // 执行错误
    throw rawData
  }

  console.log(rawData)
}

// 获取全部分支
export async function branchs() {
  const [status, rawData] = await runGit(`branch`)
  if (status !== 0) {
    // 执行错误
    throw rawData
  }

  return rawData.split('\n').map(branch => {
    if (branch) {
      const branchItem = branch.replace(/\ +/g, "")
      if (branchItem[0] === "*") {
        const key = branchItem.substring(1)
        return { key, name: key, current: true }
      }
      return { key: branchItem, name: branchItem, current: false }
    }
  }).filter(Boolean)
}

