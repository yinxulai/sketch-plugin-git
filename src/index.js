var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Header from './components/header';
import About from './pages/about';
import Commit from './pages/commit';
import History from './pages/history';
import Toolbar from './pages/toolbar';
import * as styles from './style.less';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { "data-app-region": "drag", className: styles.root },
            React.createElement(Header, null),
            React.createElement("div", { className: styles.container },
                React.createElement(HashRouter, null,
                    React.createElement(Route, { exact: true, path: "/" },
                        React.createElement(Route, { path: "/about", component: About }),
                        React.createElement(Route, { path: "/commit", component: Commit }),
                        React.createElement(Route, { path: "/history", component: History }),
                        React.createElement(Route, { path: "/toolbar", component: Toolbar }))))));
    };
    return App;
}(React.Component));
export default App;
window.addEventListener('load', function () {
    ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
});
