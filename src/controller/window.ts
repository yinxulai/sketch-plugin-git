export function getWindowTitle(): string {
  if (window && window.options && window.options.title) {
    return window.options.title
  }
  return ""
}

export function hideWindow(): Promise<void> {
  if (!window || !window.hideWindow) {
    throw 'hideWindow is not defined'
  }
  return window.hideWindow()
}

export function showWindow(): Promise<void> {
  if (!window || !window.showWindow) {
    throw 'showWindow is not defined'
  }
  return window.showWindow()
}

export function closeWindow(): Promise<void> {
  if (!window || !window.closeWindow) {
    throw 'closeWindow is not defined'
  }
  return window.closeWindow()
}
