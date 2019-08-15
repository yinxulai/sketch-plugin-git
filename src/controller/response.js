var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { documentPath } from "./document";
function runGit(params) {
    return __awaiter(this, void 0, void 0, function () {
        var dirPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositoriePath()];
                case 1:
                    dirPath = _a.sent();
                    return [4 /*yield*/, window.runBashShell("git -C " + dirPath.replace(/[\r\n]/g, "") + " " + params)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// 是否是一个有效的 git 仓库
export function isRepositorie() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, runGit("status")];
                case 1:
                    _a = _b.sent(), status = _a[0], _ = _a[1];
                    if (status !== 0) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
// 仓库路径
export function repositoriePath() {
    return __awaiter(this, void 0, void 0, function () {
        var dirPath, _a, status, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, window.documentDirectoryPath()];
                case 1:
                    dirPath = _b.sent();
                    return [4 /*yield*/, window.runBashShell("git -C " + dirPath + " rev-parse --show-toplevel")];
                case 2:
                    _a = _b.sent(), status = _a[0], message = _a[1];
                    if (status !== 0) {
                        throw message;
                    }
                    return [2 /*return*/, message];
            }
        });
    });
}
// 获取当前文档的版本历史
export function currentVersions() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, _a, status, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, documentPath()];
                case 1:
                    filePath = _b.sent();
                    return [4 /*yield*/, runGit("log " + filePath)];
                case 2:
                    _a = _b.sent(), status = _a[0], message = _a[1];
                    if (status !== 0) {
                        // 执行错误
                        throw message;
                    }
                    return [2 /*return*/, message];
            }
        });
    });
}
// 创建一个新的 Commit
export function createCommit(options) {
    return __awaiter(this, void 0, void 0, function () {
        var title, message, filePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = options.title, message = options.message;
                    return [4 /*yield*/, documentPath()];
                case 1:
                    filePath = _a.sent();
                    return [4 /*yield*/, runGit("add " + filePath)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, runGit("-m \"" + title + "\" -m \"" + message)
                        // await runGit(`push origin/${branch}`)
                        // if (status !== 0) {
                        //   // 执行错误
                        //   throw rawData
                        // }
                        // console.log(rawData)
                    ];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// 创建一个新的分支
export function createBranch() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, dirPath, _a, status, rawData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!window || !window.runBashShell) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, documentPath()];
                case 1:
                    filePath = _b.sent();
                    return [4 /*yield*/, window.documentDirectoryPath()];
                case 2:
                    dirPath = _b.sent();
                    return [4 /*yield*/, window.runBashShell("git -C " + dirPath + " log " + filePath)];
                case 3:
                    _a = _b.sent(), status = _a[0], rawData = _a[1];
                    if (status !== 0) {
                        // 执行错误
                        throw rawData;
                    }
                    console.log(rawData);
                    return [2 /*return*/];
            }
        });
    });
}
// 获取全部分支
export function branchs() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status, rawData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, runGit("branch")];
                case 1:
                    _a = _b.sent(), status = _a[0], rawData = _a[1];
                    if (status !== 0) {
                        // 执行错误
                        throw rawData;
                    }
                    return [2 /*return*/, rawData.split('\n').map(function (branch) {
                            if (branch) {
                                var branchItem = branch.replace(/\ +/g, "");
                                if (branchItem[0] === "*") {
                                    var id = branchItem.substring(1);
                                    return { id: id, name: id, current: true };
                                }
                                return { id: branchItem, name: branchItem, current: false };
                            }
                        }).filter(Boolean)];
            }
        });
    });
}
