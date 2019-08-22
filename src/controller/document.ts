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


// 获取文档 json
// TODO: BUG 进程卡死
export async function documentJSON(): Promise<string> {
  const document = await documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} dump ${document}`)
  if (status !== 0) {
    console.error('documentJSON throw error')
    throw output
  }
  return output
}

// 获取文档元信息
export async function documentMetadata(): Promise<string> {
  const document = await documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} metadata ${document}`)
  if (status !== 0) {
    console.error('documentMetadata throw error')
    throw output
  }
  return output
}


// 导出 Artboards
// 返回导出的资源路径
// items 要导出的图层 id
export async function exportArtboards(path?: string, items?: string): Promise<string> {
  const document = await documentPath()
  const [status, output] = await window.runBashShell(`mkdir -p ${path} && ${sketchtool} export artboards ${document} --output=${path}`)
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
  const [status, output] = await window.runBashShell(`mkdir -p ${path} && ${sketchtool} export preview ${document} --output=${path}`)
  if (status !== 0) {
    console.error('exportPreview throw error')
    throw output
  }
  return path
}
