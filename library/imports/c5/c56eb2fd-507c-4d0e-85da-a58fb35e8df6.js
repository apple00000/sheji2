"use strict";
cc._RF.push(module, 'c56ebL9UHxNDoXapY+zXo32', 'Facade');
// framework/facade/Facade.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var Extend_1 = require("../extend/Extend");
var Actions_1 = require("../actions/Actions");
var Interceptor_1 = require("../interceptor/Interceptor");
var Facade = /** @class */ (function () {
    function Facade() {
    }
    Facade.findComponent = function (nodeName, type, referenceNode) {
        referenceNode = referenceNode || this.canvasNode;
        var node = cc.find(nodeName, referenceNode);
        if (node) {
            return node.getComponent(type);
        }
    };
    Facade.executeCommand = function (name) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var arr, results, _loop_1, _a, _b, _i, i, state_1, results, _c, _d, _e, i, res;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(typeof name == "string")) return [3 /*break*/, 5];
                        arr = name.split(",");
                        results = [];
                        _loop_1 = function (i) {
                            var name_1, interceptors, flag, tempArr, _loop_2, command, res, tempArr, _loop_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        name_1 = arr[i].trim();
                                        interceptors = Interceptor_1.Interceptor.interceptorsOf(name_1);
                                        if (!(interceptors.length > 0)) return [3 /*break*/, 4];
                                        flag = true;
                                        tempArr = interceptors.slice(0);
                                        _loop_2 = function () {
                                            var commandInterceptor;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        commandInterceptor = tempArr.shift();
                                                        if (CC_DEBUG) {
                                                            console.log("execute preHandle===>commandName=" + name_1 + " interceptorName=" + commandInterceptor.constructor.name + " args=" + args);
                                                        }
                                                        return [4 /*yield*/, commandInterceptor.preHandle.apply(commandInterceptor, args).catch(function (reason) {
                                                                var err;
                                                                if (typeof reason == "string") {
                                                                    err = Error(reason);
                                                                }
                                                                else if (reason instanceof Error) {
                                                                    err = reason;
                                                                }
                                                                else {
                                                                    err = Error("commandName=" + name_1 + " " + commandInterceptor.constructor.name + ".preHandle()");
                                                                }
                                                                reject(err);
                                                            })];
                                                    case 1:
                                                        flag = (_a.sent()) && flag;
                                                        tempArr = tempArr.filter(function (value) { return Interceptor_1.Interceptor.interceptorsOf(name_1).some(function (value2) { return value2 == value; }); });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _a.label = 1;
                                    case 1:
                                        if (!(tempArr.length > 0)) return [3 /*break*/, 3];
                                        return [5 /*yield**/, _loop_2()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 1];
                                    case 3:
                                        if (!flag) {
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        _a.label = 4;
                                    case 4:
                                        if (CC_DEBUG) {
                                            console.log("execute command===>" + name_1 + " args=" + args);
                                        }
                                        command = (Extend_1.ext.createObj(name_1));
                                        if (!command) {
                                            reject(Error("createObj(" + name_1 + ")===>" + name_1 + " not found"));
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        return [4 /*yield*/, command.execute.apply(command, args).catch(function (reason) {
                                                var err;
                                                if (typeof reason == "string") {
                                                    err = Error(reason);
                                                }
                                                else if (reason instanceof Error) {
                                                    err = reason;
                                                }
                                                else {
                                                    err = Error("command.execute()===>commandName=" + name_1);
                                                }
                                                reject(err);
                                            })];
                                    case 5:
                                        res = _a.sent();
                                        results.push(res);
                                        interceptors = Interceptor_1.Interceptor.interceptorsOf(name_1);
                                        if (!(interceptors.length > 0)) return [3 /*break*/, 8];
                                        tempArr = interceptors.slice(0);
                                        _loop_3 = function () {
                                            var commandInterceptor;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        commandInterceptor = tempArr.shift();
                                                        if (CC_DEBUG) {
                                                            console.log("execute postHandle===>commandName=" + name_1 + " interceptorName=" + commandInterceptor.constructor.name + " res=" + res + " args=" + args);
                                                        }
                                                        return [4 /*yield*/, commandInterceptor.postHandle.apply(commandInterceptor, __spreadArrays([res], args)).catch(function (reason) {
                                                                var err;
                                                                if (typeof reason == "string") {
                                                                    err = Error(reason);
                                                                }
                                                                else if (reason instanceof Error) {
                                                                    err = reason;
                                                                }
                                                                else {
                                                                    err = Error("commandName=" + name_1 + " " + commandInterceptor.constructor.name + ".postHandle");
                                                                }
                                                                reject(err);
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        tempArr = tempArr.filter(function (value) { return Interceptor_1.Interceptor.interceptorsOf(name_1).some(function (value2) { return value2 == value; }); });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _a.label = 6;
                                    case 6:
                                        if (!(tempArr.length > 0)) return [3 /*break*/, 8];
                                        return [5 /*yield**/, _loop_3()];
                                    case 7:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 8:
                                        resolve(results);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in arr)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        state_1 = _f.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!(name instanceof Array)) return [3 /*break*/, 10];
                        results = [];
                        _c = [];
                        for (_d in name)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 6;
                    case 6:
                        if (!(_e < _c.length)) return [3 /*break*/, 9];
                        i = _c[_e];
                        return [4 /*yield*/, Facade.executeCommand.apply(Facade, __spreadArrays([name[i]], args)).catch(function (reason) { return reject(reason); })];
                    case 7:
                        res = _f.sent();
                        results.push(res);
                        _f.label = 8;
                    case 8:
                        _e++;
                        return [3 /*break*/, 6];
                    case 9:
                        resolve(results);
                        return [3 /*break*/, 11];
                    case 10:
                        reject(Error("executeCommand typeof(name)===>" + typeof name));
                        _f.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        }); });
    };
    Facade.releasePrefab = function (prefab, excludePrefab) {
        var excludes = [];
        if (excludePrefab) {
            if (typeof excludePrefab == "string") {
                excludes.push(excludePrefab);
            }
            else {
                excludes = excludePrefab;
            }
        }
        if (excludes.indexOf(prefab) >= 0) {
            console.log("release fail,this prefab in retainPrefab or excludes===>" + prefab);
            return;
        }
        var deps = cc.loader.getDependsRecursively(prefab);
        var arr = deps.filter(function (value) {
            for (var i in excludes) {
                var retainPrefab = excludes[i];
                if (cc.loader.getDependsRecursively(retainPrefab).indexOf(value) >= 0) {
                    return false;
                }
            }
            return true;
        });
        arr.forEach(function (value) {
            cc.loader.release(value);
            console.log(value, "release====>");
        });
    };
    Facade.initSeparationLayer = function (separationPrefabName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, cc.loader.loadResAwait(separationPrefabName, cc.Prefab)];
                    case 1:
                        _a._separationPrefab = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 加入隔断层 */
    Facade.addSeparationLayer = function (groupIdx, opacity, zOrder) {
        if (groupIdx === void 0) { groupIdx = null; }
        if (opacity === void 0) { opacity = 115; }
        if (zOrder === void 0) { zOrder = 0; }
        if (this._separationPrefab == null) {
            console.error("please call Facade.initSeparationLayer before call Facade.addSeparationLayer");
            return;
        }
        var node = cc.instantiate(this._separationPrefab);
        node.setParent(this.canvasNode);
        node.position = cc.v2(0, 0);
        if (typeof opacity == "number") {
            node.opacity = opacity;
        }
        node.zIndex = zOrder;
        if (groupIdx) {
            node.groupIndex = groupIdx;
        }
        return node;
    };
    Facade.initTextTips = function (textTipsPrefabName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, cc.loader.loadResAwait(textTipsPrefabName, cc.Prefab)];
                    case 1:
                        _a._textTipsPrefab = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 文字提示 */
    Facade.textTips = function (text, position, fontSize) {
        return __awaiter(this, void 0, void 0, function () {
            var node, richText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._separationPrefab == null) {
                            console.error("please call Facade.initTextTips before call Facade.textTips");
                            return [2 /*return*/];
                        }
                        node = cc.instantiate(this._textTipsPrefab);
                        node.setParent(Facade.canvasNode);
                        node.zIndex = cc.macro.MAX_ZINDEX;
                        if (position) {
                            node.position = position;
                        }
                        else {
                            node.position = cc.v2(0, 0);
                        }
                        richText = node.getComponent(cc.RichText);
                        if (fontSize) {
                            richText.fontSize = fontSize;
                        }
                        richText.string = text;
                        Extend_1.ext.showRichText(richText);
                        return [4 /*yield*/, node.runActionAwait(Actions_1.default.flutterAction())];
                    case 1:
                        _a.sent();
                        node.destroy();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 当前canvas节点 */
    Facade.canvasNode = null;
    Facade._separationPrefab = null;
    Facade._textTipsPrefab = null;
    return Facade;
}());
exports.default = Facade;

cc._RF.pop();