import Window from 'sketch-plugin-web-window/src/index'
const rootview = require("./src/index.html")

export function commit(context) {
  const window = new Window(context, { title: "提交修改", height: 300, width: 280, frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export function version(context) {
  const window = new Window(context, { title: "版本管理", frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export function about(context) {
  const window = new Window(context, { title: "关于作者", frame: false })
  window.load(rootview)

  window.setLocationHash('commit')
}

export default commit
