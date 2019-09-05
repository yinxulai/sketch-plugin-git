import { runBashShell } from "./window"
import { cupSuffix } from "../utils/string"

const sketchtool = "/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool"

// 获取当前打开文档的所在文件夹
export async function documentDirectoryPath(): Promise<string> {
  if (!window || !window.documentDirectoryPath) {
    console.error('documentDirectoryPath throw error')
    throw 'documentDirectoryPath is not defined'
  }
  return await window.documentDirectoryPath()
}

// 获取当前文档的完整路径
export async function documentPath(): Promise<string> {
  if (!window || !window.documentPath) {
    console.error('documentPath throw error')
    throw 'documentPath is not defined'
  }
  return await window.documentPath()
}

// 获取当前文档的文件名
export async function documentName(): Promise<string> {
  if (!window || !window.documentName) {
    console.error('documentName throw error')
    throw 'documentName is not defined'
  }
  return await window.documentName()
}

// 导出 Artboards
// 返回导出的资源路径
// items 要导出的图层 id
export async function exportArtboards(path?: string, items?: string): Promise<string> {
  const document = await documentPath()
  const [status, output] = await runBashShell(`rm -rf ${path} && mkdir -p ${path} && ${sketchtool} export artboards ${document} --output=${path}`)
  if (status !== 0) {
    console.error('exportArtboards throw error')
    throw output
  }
  return path
}

// 导出预览
// 返回导出的资源路径
export async function exportPreview(path?: string, items?: string): Promise<string> {
  const document = await documentPath()
  const [status, output] = await runBashShell(`rm -rf ${path} && mkdir -p ${path} && ${sketchtool} export preview ${document} --output=${path}`)
  if (status !== 0) {
    console.error('exportPreview throw error')
    throw output
  }
  return path
}

// 导出 json
// 只能导出到文件
export async function exportJSON(path: string): Promise<string> {
  const name = await documentName()
  const document = await documentPath()
  const exportFileNamePath = `${path}/${cupSuffix(name)}.json`
  const dumpShell = `rm -rf ${path} && mkdir -p ${path} && ${sketchtool} dump ${document} > ${exportFileNamePath}`
  const [status, output] = await runBashShell(dumpShell)
  if (status !== 0) {
    console.error('documentJSON throw error')
    throw output
  }
  return exportFileNamePath
}

// 获取文档元信息
export async function exportMetadata(path?: string): Promise<string> {
  const document = await documentPath()
  const [status, output] = await runBashShell(`${sketchtool} metadata ${document}`)
  if (status !== 0) {
    console.error('documentMetadata throw error')
    throw output
  }
  return JSON.parse(output)
}
