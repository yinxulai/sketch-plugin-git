// 获取当前打开文档的所在文件夹
export async function documentDirectoryPath(){
  if (window && window.documentDirectoryPath) {
    return await window.documentDirectoryPath()
  }
}
// 获取当前文档的完整路径
export async function documentPath(){
  if (window && window.documentPath) {
    return await window.documentPath()
  }
}
// 获取当前文档的文件名
export async function documentName(){
  if (window && window.documentName) {
    return await window.documentName()
  }
}

// 导出 Artboards
export async function exportArtboards(options){
  if (window && window.documentName) {
    return await window.documentName()
  }
}

// 导出预览
export async function exportPreview(options) {
  if (window && window.documentName) {
    return await window.documentName()
  }
}
