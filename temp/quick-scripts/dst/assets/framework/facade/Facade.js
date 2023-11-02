
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/facade/Facade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7QUFJbkcsMkNBQXFDO0FBQ3JDLDhDQUF5QztBQUN6QywwREFBdUQ7QUFFdkQ7SUFBQTtJQW1NQSxDQUFDO0lBL0xXLG9CQUFhLEdBQXJCLFVBQXNCLFFBQWUsRUFBRSxJQUFJLEVBQUUsYUFBdUI7UUFDaEUsYUFBYSxHQUFHLGFBQWEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxFQUFDO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVNLHFCQUFjLEdBQXJCLFVBQXNCLElBQW9CO1FBQTFDLGlCQXlGQztRQXpGMkMsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOzs7Ozs2QkFDakMsQ0FBQSxPQUFPLElBQUksSUFBSSxRQUFRLENBQUEsRUFBdkIsd0JBQXVCO3dCQUNuQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEIsT0FBTyxHQUFHLEVBQUUsQ0FBQzs0Q0FDUixDQUFDOzs7Ozt3Q0FDRixTQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3Q0FDckIsWUFBWSxHQUFHLHlCQUFXLENBQUMsY0FBYyxDQUFD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SyxDQUFDLFVBQVUsQ0FBQzt3QkFDbEMsSUFBSSxRQUFRLEVBQUM7NEJBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7eUJBQzVCOzZCQUFNOzRCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQy9CO3dCQUNHLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxRQUFRLEVBQUM7NEJBQ1QsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7eUJBQ2hDO3dCQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUN2QixZQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMzQixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7d0JBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7S0FDbEI7SUExREQsaUJBQWlCO0lBQ1YsaUJBQVUsR0FBVyxJQUFJLENBQUM7SUFHbEIsd0JBQWlCLEdBQWEsSUFBSSxDQUFDO0lBMEJuQyxzQkFBZSxHQUFhLElBQUksQ0FBQztJQThCcEQsYUFBQztDQW5NRCxBQW1NQyxJQUFBO2tCQW5Nb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuXHJcbmltcG9ydCB7SUNvbW1hbmR9IGZyb20gXCIuL0lDb21tYW5kXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vZXh0ZW5kL0V4dGVuZFwiO1xyXG5pbXBvcnQgQWN0aW9ucyBmcm9tIFwiLi4vYWN0aW9ucy9BY3Rpb25zXCI7XHJcbmltcG9ydCB7SW50ZXJjZXB0b3J9IGZyb20gXCIuLi9pbnRlcmNlcHRvci9JbnRlcmNlcHRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFjYWRlIHtcclxuXHJcbiAgICBzdGF0aWMgZmluZENvbXBvbmVudDxUPihub2RlTmFtZTpzdHJpbmcsIHR5cGU6IHtwcm90b3R5cGU6IFR9IHwgc3RyaW5nLCByZWZlcmVuY2VOb2RlPzogY2MuTm9kZSk6IFQ7XHJcblxyXG4gICAgc3RhdGljICBmaW5kQ29tcG9uZW50KG5vZGVOYW1lOnN0cmluZywgdHlwZSwgcmVmZXJlbmNlTm9kZT86IGNjLk5vZGUpe1xyXG4gICAgICAgIHJlZmVyZW5jZU5vZGUgPSByZWZlcmVuY2VOb2RlIHx8IHRoaXMuY2FudmFzTm9kZTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQobm9kZU5hbWUsIHJlZmVyZW5jZU5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZ2V0Q29tcG9uZW50KHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZXhlY3V0ZUNvbW1hbmQobmFtZTpzdHJpbmd8W3N0cmluZ10sIC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IG5hbWUuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgaW4gYXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGFycltpXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGludGVyY2VwdG9ycyA9IEludGVyY2VwdG9yLmludGVyY2VwdG9yc09mKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcmNlcHRvcnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBBcnIgPSBpbnRlcmNlcHRvcnMuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbW1hbmRJbnRlcmNlcHRvciA9IHRlbXBBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGV4ZWN1dGUgcHJlSGFuZGxlPT09PmNvbW1hbmROYW1lPSR7bmFtZX0gaW50ZXJjZXB0b3JOYW1lPSR7Y29tbWFuZEludGVyY2VwdG9yLmNvbnN0cnVjdG9yLm5hbWV9IGFyZ3M9JHthcmdzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGF3YWl0IGNvbW1hbmRJbnRlcmNlcHRvci5wcmVIYW5kbGUoLi4uYXJncykuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhc29uID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBFcnJvcihyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gcmVhc29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBFcnJvcihgY29tbWFuZE5hbWU9JHtuYW1lfSAke2NvbW1hbmRJbnRlcmNlcHRvci5jb25zdHJ1Y3Rvci5uYW1lfS5wcmVIYW5kbGUoKWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pICYmIGZsYWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wQXJyID0gdGVtcEFyci5maWx0ZXIodmFsdWUgPT4gSW50ZXJjZXB0b3IuaW50ZXJjZXB0b3JzT2YobmFtZSkuc29tZSh2YWx1ZTIgPT4gdmFsdWUyID09IHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZXhlY3V0ZSBjb21tYW5kPT09PiR7bmFtZX0gYXJncz0ke2FyZ3N9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21tYW5kID0gPElDb21tYW5kPihleHQuY3JlYXRlT2JqKG5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighY29tbWFuZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihgY3JlYXRlT2JqKCR7bmFtZX0pPT09PiR7bmFtZX0gbm90IGZvdW5kYCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBjb21tYW5kLmV4ZWN1dGUoLi4uYXJncykuY2F0Y2gocmVhc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFzb24gPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSBFcnJvcihyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZWFzb24gaW5zdGFuY2VvZiBFcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSByZWFzb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0gRXJyb3IoYGNvbW1hbmQuZXhlY3V0ZSgpPT09PmNvbW1hbmROYW1lPSR7bmFtZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0b3JzID0gSW50ZXJjZXB0b3IuaW50ZXJjZXB0b3JzT2YobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVyY2VwdG9ycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBBcnIgPSBpbnRlcmNlcHRvcnMuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbW1hbmRJbnRlcmNlcHRvciA9IHRlbXBBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGV4ZWN1dGUgcG9zdEhhbmRsZT09PT5jb21tYW5kTmFtZT0ke25hbWV9IGludGVyY2VwdG9yTmFtZT0ke2NvbW1hbmRJbnRlcmNlcHRvci5jb25zdHJ1Y3Rvci5uYW1lfSByZXM9JHtyZXN9IGFyZ3M9JHthcmdzfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29tbWFuZEludGVyY2VwdG9yLnBvc3RIYW5kbGUocmVzLCAuLi5hcmdzKS5jYXRjaChyZWFzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFzb24gPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9IEVycm9yKHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVhc29uIGluc3RhbmNlb2YgRXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSByZWFzb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9IEVycm9yKGBjb21tYW5kTmFtZT0ke25hbWV9ICR7Y29tbWFuZEludGVyY2VwdG9yLmNvbnN0cnVjdG9yLm5hbWV9LnBvc3RIYW5kbGVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBBcnIgPSB0ZW1wQXJyLmZpbHRlcih2YWx1ZSA9PiBJbnRlcmNlcHRvci5pbnRlcmNlcHRvcnNPZihuYW1lKS5zb21lKHZhbHVlMiA9PiB2YWx1ZTIgPT0gdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAobmFtZSBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQobmFtZVtpXSwgLi4uYXJncykuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihcImV4ZWN1dGVDb21tYW5kIHR5cGVvZihuYW1lKT09PT5cIit0eXBlb2YgbmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyByZWxlYXNlUHJlZmFiKHByZWZhYjpzdHJpbmcsIGV4Y2x1ZGVQcmVmYWI/OnN0cmluZ3xbc3RyaW5nXSl7XHJcbiAgICAgICAgbGV0IGV4Y2x1ZGVzID0gW107XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVQcmVmYWIpe1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4Y2x1ZGVQcmVmYWIgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgICAgICBleGNsdWRlcy5wdXNoKGV4Y2x1ZGVQcmVmYWIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhjbHVkZXMgPSBleGNsdWRlUHJlZmFiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXhjbHVkZXMuaW5kZXhPZihwcmVmYWIpID49IDApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbGVhc2UgZmFpbCx0aGlzIHByZWZhYiBpbiByZXRhaW5QcmVmYWIgb3IgZXhjbHVkZXM9PT0+XCIrcHJlZmFiKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVwcyA9IGNjLmxvYWRlci5nZXREZXBlbmRzUmVjdXJzaXZlbHkocHJlZmFiKTtcclxuICAgICAgICBsZXQgYXJyID0gZGVwcy5maWx0ZXIodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGV4Y2x1ZGVzKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXRhaW5QcmVmYWIgPSBleGNsdWRlc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKGNjLmxvYWRlci5nZXREZXBlbmRzUmVjdXJzaXZlbHkocmV0YWluUHJlZmFiKS5pbmRleE9mKHZhbHVlKSA+PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIucmVsZWFzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCBcInJlbGVhc2U9PT09PlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5b2T5YmNY2FudmFz6IqC54K5ICovXHJcbiAgICBzdGF0aWMgY2FudmFzTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NlcGFyYXRpb25QcmVmYWI6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgaW5pdFNlcGFyYXRpb25MYXllcihzZXBhcmF0aW9uUHJlZmFiTmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3NlcGFyYXRpb25QcmVmYWIgPSBhd2FpdCBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KHNlcGFyYXRpb25QcmVmYWJOYW1lLCBjYy5QcmVmYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDliqDlhaXpmpTmlq3lsYIgKi9cclxuICAgIHN0YXRpYyBhZGRTZXBhcmF0aW9uTGF5ZXIoZ3JvdXBJZHg6bnVtYmVyID0gbnVsbCwgb3BhY2l0eTpOdW1iZXIgPSAxMTUsIHpPcmRlcjpOdW1iZXIgPSAwKTpjYy5Ob2Rle1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXBhcmF0aW9uUHJlZmFiID09IG51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicGxlYXNlIGNhbGwgRmFjYWRlLmluaXRTZXBhcmF0aW9uTGF5ZXIgYmVmb3JlIGNhbGwgRmFjYWRlLmFkZFNlcGFyYXRpb25MYXllclwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX3NlcGFyYXRpb25QcmVmYWIpO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuY2FudmFzTm9kZSk7XHJcbiAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3BhY2l0eSA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSB6T3JkZXI7XHJcblxyXG4gICAgICAgIGlmIChncm91cElkeCl7XHJcbiAgICAgICAgICAgIG5vZGUuZ3JvdXBJbmRleCA9IGdyb3VwSWR4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfdGV4dFRpcHNQcmVmYWI6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgaW5pdFRleHRUaXBzKHRleHRUaXBzUHJlZmFiTmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX3RleHRUaXBzUHJlZmFiID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNBd2FpdCh0ZXh0VGlwc1ByZWZhYk5hbWUsIGNjLlByZWZhYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaWh+Wtl+aPkOekuiAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHRleHRUaXBzKHRleHQ6c3RyaW5nLCBwb3NpdGlvbj86Y2MuVmVjMiwgZm9udFNpemU/Om51bWJlcil7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlcGFyYXRpb25QcmVmYWIgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJwbGVhc2UgY2FsbCBGYWNhZGUuaW5pdFRleHRUaXBzIGJlZm9yZSBjYWxsIEZhY2FkZS50ZXh0VGlwc1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX3RleHRUaXBzUHJlZmFiKTtcclxuICAgICAgICBub2RlLnNldFBhcmVudChGYWNhZGUuY2FudmFzTm9kZSk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgICAgIGlmIChwb3NpdGlvbil7XHJcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByaWNoVGV4dCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICBpZiAoZm9udFNpemUpe1xyXG4gICAgICAgICAgICByaWNoVGV4dC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByaWNoVGV4dC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGV4dC5zaG93UmljaFRleHQocmljaFRleHQpO1xyXG4gICAgICAgIGF3YWl0IG5vZGUucnVuQWN0aW9uQXdhaXQoQWN0aW9ucy5mbHV0dGVyQWN0aW9uKCkpO1xyXG4gICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19