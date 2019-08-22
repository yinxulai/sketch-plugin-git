interface Window {
  options: any
  hideWindow: () => Promise<void>
  showWindow: () => Promise<void>
  closeWindow: () => Promise<void>
  documentPath: () => Promise<string>
  documentName: () => Promise<string>
  documentDirectoryPath: () => Promise<string>
  alert: (title: string, context: string) => Promise<void>
  runBashShell: (script: string) => Promise<[number, string]>
  runCommand: (cmd: string, ...args: string[]) => Promise<[number, string]>
}
