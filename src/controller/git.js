import { documentPath } from "./document"

// 是否是一个有效的 git 仓库
export async function isRepositorie() {
  const dirPath = await documentDirectoryPath()
  const [status, _] = await window.runBashShell(`git -C ${dirPath} status`)
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
  if (!window || !window.runBashShell) {
    return []
  }

  const filePath = await documentPath()
  const dirPath = await documentDirectoryPath()
  const [status, message] = await window.runBashShell(`git -C ${dirPath} log ${filePath}`)
  if (status !== 0) {
    // 执行错误
    throw message
  }

  return message
}

// 创建一个新的 Commit
export async function createCommit(options) {
  const { title, message, branch } = options

  if (!window || !window.runBashShell) {
    return []
  }

  const filePath = await documentPath()
  const resPath = await repositoriePath()
  const [status, rawData] = await window.runBashShell(`
    git -C ${resPath} add ${filePath};
    git -C ${resPath} -m "${title}" -m "${message}";
    git -C ${resPath} push origin/${branch}
  `)

  if (status !== 0) {
    // 执行错误
    throw rawData
  }

  console.log(rawData)
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
  if (!window || !window.runBashShell) {
    return []
  }

  const [status, rawData] = await window.runBashShell(`git log ${path}`)
  if (status !== 0) {
    // 执行错误
    throw rawData
  }

  console.log(rawData)
}

