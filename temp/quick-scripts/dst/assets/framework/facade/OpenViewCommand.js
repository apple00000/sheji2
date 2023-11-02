
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/facade/OpenViewCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b27f8KHhAhEG5gWtv30iiyW', 'OpenViewCommand');
// framework/facade/OpenViewCommand.ts

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
var Facade_1 = require("./Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OpenViewCommand = /** @class */ (function () {
    function OpenViewCommand() {
    }
    OpenViewCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var prefabName, prefab, node;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    prefabName = args[0];
                                    if (!Facade_1.default.canvasNode.getChildByName(prefabName.substring(prefabName.lastIndexOf("/") + 1))) return [3 /*break*/, 1];
                                    console.error("\u6B64\u7A97\u53E3\u5DF2\u6253\u5F00===>" + prefabName, "或者是prefab根节点名称与其他prefab根节点名称冲突...规则：prefab名称要与该prefab根节点名称一致。");
                                    reject();
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, cc.loader.loadResAwait(prefabName, cc.Prefab)];
                                case 2:
                                    prefab = _a.sent();
                                    node = cc.instantiate(prefab);
                                    node.setParent(Facade_1.default.canvasNode);
                                    resolve(node);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    OpenViewCommand = __decorate([
        ccclass("OpenViewCommand")
    ], OpenViewCommand);
    return OpenViewCommand;
}());
exports.default = OpenViewCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZmFjYWRlL09wZW5WaWV3Q29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7QUFJbkcsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7SUFnQkEsQ0FBQztJQWRTLGlDQUFPLEdBQWI7UUFBYyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOzs7Z0JBQzFCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU0sT0FBTyxFQUFFLE1BQU07Ozs7O29DQUNoQyxVQUFVLEdBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUM3QixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXJGLHdCQUFxRjtvQ0FDcEYsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBYSxVQUFZLEVBQUUsK0RBQStELENBQUMsQ0FBQztvQ0FDMUcsTUFBTSxFQUFFLENBQUM7O3dDQUVJLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUE7O29DQUE1RCxNQUFNLEdBQUcsU0FBbUQ7b0NBQzVELElBQUksR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7eUJBRXJCLENBQUMsRUFBQzs7O0tBQ047SUFmZ0IsZUFBZTtRQURuQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7T0FDTixlQUFlLENBZ0JuQztJQUFELHNCQUFDO0NBaEJELEFBZ0JDLElBQUE7a0JBaEJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQge0lDb21tYW5kfSBmcm9tIFwiLi9JQ29tbWFuZFwiO1xyXG5pbXBvcnQgTGlmZUN5Y2xlIGZyb20gXCIuLi9jb21wb25lbnQvTGlmZUN5Y2xlXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4vRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzKFwiT3BlblZpZXdDb21tYW5kXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wZW5WaWV3Q29tbWFuZCBpbXBsZW1lbnRzIElDb21tYW5kIHtcclxuXHJcbiAgICBhc3luYyBleGVjdXRlKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiTmFtZTpzdHJpbmcgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICBpZihGYWNhZGUuY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShwcmVmYWJOYW1lLnN1YnN0cmluZyhwcmVmYWJOYW1lLmxhc3RJbmRleE9mKFwiL1wiKSsxKSkpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihg5q2k56qX5Y+j5bey5omT5byAPT09PiR7cHJlZmFiTmFtZX1gLCBcIuaIluiAheaYr3ByZWZhYuagueiKgueCueWQjeensOS4juWFtuS7lnByZWZhYuagueiKgueCueWQjeensOWGsueqgS4uLuinhOWIme+8mnByZWZhYuWQjeensOimgeS4juivpXByZWZhYuagueiKgueCueWQjeensOS4gOiHtOOAglwiKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChwcmVmYWJOYW1lLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudChGYWNhZGUuY2FudmFzTm9kZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19