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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as styles from './style.less';
import autobind from 'autobind-decorator';
import { branchs } from '../../controller/response';
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        return _super.call(this, props) || this;
    }
    Select.prototype.handleChange = function (event) {
        var _a = this.props, items = _a.items, onChange = _a.onChange;
        var item = items.find(function (item) { return item.id === event.currentTarget.value; });
        onChange && item && onChange(item);
    };
    Select.prototype.render = function () {
        var _a = this.props, children = _a.children, items = _a.items, render = _a.render, onChange = _a.onChange, props = __rest(_a, ["children", "items", "render", "onChange"]);
        return (React.createElement("div", { className: styles.select },
            React.createElement("select", __assign({}, props, { size: 1, defaultValue: "tip", onChange: this.handleChange }),
                React.createElement("option", { value: "tip", disabled: true, hidden: true }, children),
                items.map(function (item) {
                    return render
                        ? render(item)
                        : (React.createElement("option", { key: item.id, value: item.id }, item));
                }))));
    };
    __decorate([
        autobind
    ], Select.prototype, "handleChange", null);
    return Select;
}(React.Component));
export default Select;
var BranchSelect = /** @class */ (function (_super) {
    __extends(BranchSelect, _super);
    function BranchSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            branchs: []
        };
        return _this;
    }
    BranchSelect.prototype.componentDidMount = function () {
        var _this = this;
        branchs().then(function (branchs) {
            _this.setState(__assign({}, _this.state, { branchs: branchs }));
        });
    };
    BranchSelect.prototype.render = function () {
        var branchs = this.state.branchs;
        var onChange = this.props.onChange;
        return (React.createElement(Select, { items: branchs, onChange: onChange, render: function (item) { return (React.createElement("option", { key: item.id, value: item.id }, item.name)); } }, "\u9009\u62E9\u5206\u652F"));
    };
    return BranchSelect;
}(React.Component));
export { BranchSelect };
