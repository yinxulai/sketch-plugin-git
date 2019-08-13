import Window from 'sketch-plugin-web-window/src/index'

// 借用 sketch-plugin-web-window superpower
import { alert } from 'sketch-plugin-web-window/src/superpower/utils'
import { runBashShell, runCommand } from 'sketch-plugin-web-window/src/superpower/command'
import { documentDirectoryPath } from 'sketch-plugin-web-window/src/superpower/document'

const rootview = require("./src/index.html")

// 在 Finder 中打开当前文件的文件夹
export function openCurrentDocumentFolderInFinder(context) {
  // document 可能不存在，比如新建的文件还没有保存的
  const path = documentDirectoryPath(context.document)
  runCommand('/usr/bin/open', path)
}

// 在 Finder 中打开当前 Repositorie 的文件夹
export function openCurrentRepositorieFolderInFinder(context) {
  const path = documentDirectoryPath(context.document)
  const [status, message] = runBashShell(`git -C ${path} rev-parse --show-toplevel`)
  if (status !== 0) {
    alert('出错了', message)
    return
  }

  runCommand('/usr/bin/open', path)
}


export function commit(context) {
  const window = new Window(context, { title: "提交修改", height: 300, width: 280, frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export function version(context) {
  const window = new Window(context, { title: "版本管理", frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export function about(context) {
  const window = new Window(context, { title: "关于作者", frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export default commit
