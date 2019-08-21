const sketchtool = "/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool"

// 获取当前打开文档的所在文件夹
export async function documentDirectoryPath(): Promise<string> {
  if (!window || !window.documentDirectoryPath) {
    throw 'documentDirectoryPath is not defined'
  }
  return await window.documentDirectoryPath()
}

// 获取当前文档的完整路径
export async function documentPath(): Promise<string> {
  if (!window || !window.documentPath) {
    throw 'documentPath is not defined'
  }
  return await window.documentPath()
}

// 获取当前文档的文件名
export async function documentName(): Promise<string> {
  if (!window || !window.documentName) {
    throw 'documentName is not defined'
  }
  return await window.documentName()
}


// 获取文档 json
export async function documentJSON(): Promise<string> {
  const document = documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} dump ${document}`)
  if (status !== 0) {
    throw output
  }
  return output
}

// 获取文档元信息
export async function documentMetadata(): Promise<string> {
  const document = documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} metadata ${document}`)
  if (status !== 0) {
    throw output
  }
  return output
}


// 导出 Artboards
// 返回导出的资源路径
// items 要导出的图层 id
export async function exportArtboards(path?: string, items?: string): Promise<void> {
  const document = documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} export artboards ${document} --output=${path}`)
  if (status !== 0) {
    throw output
  }
}

// 导出预览
// 返回导出的资源路径
export async function exportPreview(path?: string, items?: string): Promise<void> {
  const document = documentPath()
  const [status, output] = await window.runBashShell(`${sketchtool} export preview ${document} --output=${path}`)
  if (status !== 0) {
    throw output
  }
}
