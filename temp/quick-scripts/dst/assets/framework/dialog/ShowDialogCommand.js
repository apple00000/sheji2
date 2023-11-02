
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/dialog/ShowDialogCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d21aRvW3dDg4Q92XfCz8Of', 'ShowDialogCommand');
// framework/dialog/ShowDialogCommand.ts

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
var Facade_1 = require("../facade/Facade");
var LifeCycle_1 = require("../component/LifeCycle");
var DialogMediator_1 = require("./DialogMediator");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowDialogCommand = /** @class */ (function () {
    function ShowDialogCommand() {
    }
    ShowDialogCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var separationLayer, prefab, node, obj, mediator, key, attr, res, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    separationLayer = Facade_1.default.addSeparationLayer(args[1], args[2]);
                                    return [4 /*yield*/, cc.loader.loadResAwait(DialogMediator_1.default.dialogPrefabName, cc.Prefab)];
                                case 1:
                                    prefab = _a.sent();
                                    node = cc.instantiate(prefab);
                                    node.setParent(Facade_1.default.canvasNode);
                                    LifeCycle_1.default.onDestroyFollow(separationLayer, node);
                                    obj = args[0];
                                    mediator = node.getComponent(DialogMediator_1.default);
                                    for (key in obj) {
                                        if (obj[key] != null && typeof obj[key] != "function") {
                                            for (attr in obj[key]) {
                                                mediator[key][attr] = obj[key][attr];
                                            }
                                        }
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, node.onceAwait("clickButton")];
                                case 3:
                                    res = _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ShowDialogCommand = __decorate([
        ccclass("ShowDialogCommand")
    ], ShowDialogCommand);
    return ShowDialogCommand;
}());
exports.default = ShowDialogCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZGlhbG9nL1Nob3dEaWFsb2dDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUluRywyQ0FBc0M7QUFDdEMsb0RBQStDO0FBQy9DLG1EQUE4QztBQUV4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFBO0lBNkJBLENBQUM7SUE1QlMsbUNBQU8sR0FBYjtRQUFlLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O3VDQUFFLE9BQU87OztnQkFDM0Isc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Ozs7b0NBQ2pDLGVBQWUsR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDckQscUJBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUE7O29DQUFqRixNQUFNLEdBQUcsU0FBd0U7b0NBQ2pGLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQ2xDLG1CQUFTLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQ0FFN0MsR0FBRyxHQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDO29DQUVqRCxLQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUM7d0NBQ2hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLEVBQUM7NENBQ2xELEtBQVEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnREFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2Q0FDeEM7eUNBQ0o7cUNBQ0o7Ozs7b0NBSWEscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBQTs7b0NBQXpDLEdBQUcsR0FBRyxTQUFtQztvQ0FDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O29DQUViLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQzs7Ozs7eUJBRWpCLENBQUMsRUFBQzs7O0tBQ047SUE1QmdCLGlCQUFpQjtRQURyQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7T0FDUixpQkFBaUIsQ0E2QnJDO0lBQUQsd0JBQUM7Q0E3QkQsQUE2QkMsSUFBQTtrQkE3Qm9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHtEaWFsb2dWT30gZnJvbSBcIi4vRGlhbG9nVk9cIjtcclxuaW1wb3J0IHtJQ29tbWFuZH0gZnJvbSBcIi4uL2ZhY2FkZS9JQ29tbWFuZFwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi9mYWNhZGUvRmFjYWRlXCI7XHJcbmltcG9ydCBMaWZlQ3ljbGUgZnJvbSBcIi4uL2NvbXBvbmVudC9MaWZlQ3ljbGVcIjtcclxuaW1wb3J0IERpYWxvZ01lZGlhdG9yIGZyb20gXCIuL0RpYWxvZ01lZGlhdG9yXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzKFwiU2hvd0RpYWxvZ0NvbW1hbmRcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd0RpYWxvZ0NvbW1hbmQgaW1wbGVtZW50cyBJQ29tbWFuZCB7XHJcbiAgICBhc3luYyBleGVjdXRlICguLi5hcmdzKTpQcm9taXNle1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZXBhcmF0aW9uTGF5ZXIgPSBGYWNhZGUuYWRkU2VwYXJhdGlvbkxheWVyKGFyZ3NbMV0sIGFyZ3NbMl0pO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChEaWFsb2dNZWRpYXRvci5kaWFsb2dQcmVmYWJOYW1lLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KEZhY2FkZS5jYW52YXNOb2RlKTtcclxuICAgICAgICAgICAgTGlmZUN5Y2xlLm9uRGVzdHJveUZvbGxvdyhzZXBhcmF0aW9uTGF5ZXIsIG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9iaiA9IDxEaWFsb2dWTz5hcmdzWzBdO1xyXG4gICAgICAgICAgICBsZXQgbWVkaWF0b3IgPSBub2RlLmdldENvbXBvbmVudChEaWFsb2dNZWRpYXRvcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKXtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpba2V5XSAhPSBudWxsICYmIHR5cGVvZiBvYmpba2V5XSAhPSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgYXR0ciBpbiBvYmpba2V5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhdG9yW2tleV1bYXR0cl0gPSBvYmpba2V5XVthdHRyXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbWVkaWF0b3IuY29udGVudC5ub2RlLmNoaWxkcmVuLmZvckVhY2godmFsdWUgPT4gdmFsdWUuYWN0aXZlID0gdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5vZGUub25jZUF3YWl0KFwiY2xpY2tCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==