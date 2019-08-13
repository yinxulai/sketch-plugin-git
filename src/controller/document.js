export async function currentPath(){
  if (window && window.documentPath) {
    return await window.documentPath()
  }
}
