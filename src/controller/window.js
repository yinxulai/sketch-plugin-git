export function getWindowTitle() {
  if (window && window.options && window.options.title) {
    return window.options.title
  }

  return ""
}

export function hideWindow() {
  if (window && window.hideWindow) {
    window.hideWindow()
  }

}

export function showWindow() {
  if (window && window.showWindow) {
    window.showWindow()
  }
}

export function closeWindow() {
  if (window && window.closeWindow) {
    window.closeWindow()
  }
}
