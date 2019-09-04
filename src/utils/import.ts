
function hackExportModul(file: string, variableName: string) {
  const exportScript = `
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = ${variableName};
  `

  window.runBashShell(`cat ${exportScript.replace(/\[ \r\n]+/g, "")} >> file`)
}
