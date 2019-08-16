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

// 导出 Artboards
// 返回导出的资源路径
export async function exportArtboards(): Promise<string[]> {
  return Promise.resolve([])
}

// 导出预览
// 返回导出的资源路径
export async function exportPreview(): Promise<string[]> {
  return Promise.resolve([])
}
