export function getWindowTitle() {
    if (window && window.options && window.options.title) {
        return window.options.title;
    }
    return "";
}
export function hideWindow() {
    if (!window || !window.hideWindow) {
        throw 'hideWindow is not defined';
    }
    return window.hideWindow();
}
export function showWindow() {
    if (!window || !window.showWindow) {
        throw 'showWindow is not defined';
    }
    return window.showWindow();
}
export function closeWindow() {
    if (!window || !window.closeWindow) {
        throw 'closeWindow is not defined';
    }
    return window.closeWindow();
}
