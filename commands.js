import Window from 'sketch-plugin-web-window/src/index'
const rootview = require("./src/index.html")

export default function about(context) {
  const window = new Window(context, { title: "关于作者", })
  window.load(rootview)

  window.setLocationHash('about')
}

export function version(context) {
  const window = new Window(context, { title: "版本管理", })
  window.load(rootview)

  window.setLocationHash('inbox')
}

export function onOpenDocument(context) {
  if (context && context.actionContext && context.actionContext.document) {
    console.log('onOpenDocument')
  }
}
