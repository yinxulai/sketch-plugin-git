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
import { currentVersions, isRepositorie, repositoriePath, branchs } from '../../controller/response';
var History = /** @class */ (function (_super) {
    __extends(History, _super);
    function History() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    History.prototype.componentDidMount = function () {
        isRepositorie().then(console.log, console.log);
        repositoriePath().then(console.log, console.log);
        currentVersions().then(console.log, console.log);
        branchs().then(console.log, console.log);
    };
    History.prototype.render = function () {
        return (React.createElement("div", null, "History"));
    };
    return History;
}(React.Component));
export default History;
