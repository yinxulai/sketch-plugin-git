export function cupSuffix(name: string) {
  if (name) {
    return name.substring(0, name.lastIndexOf("."))
  }
}
