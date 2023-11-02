
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/facade/LoadSceneCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fde6oupepCYrYBAsbalMnm', 'LoadSceneCommand');
// framework/facade/LoadSceneCommand.ts

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
exports.getCurrentSceneName = void 0;
var Facade_1 = require("./Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var currentSceneName = "WelcomeScene";
var blockInputNode = null;
var LoadSceneCommand = /** @class */ (function () {
    function LoadSceneCommand() {
    }
    LoadSceneCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var sceneName, prefab, deletes, node;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sceneName = args[0];
                                    console.log(sceneName, "sceneName.");
                                    if (blockInputNode == null) {
                                        blockInputNode = new cc.Node();
                                        blockInputNode.zIndex = cc.macro.MAX_ZINDEX;
                                        blockInputNode.addComponent(cc.BlockInputEvents);
                                        blockInputNode.setContentSize(cc.view.getVisibleSize());
                                        blockInputNode.setPosition(cc.view.getViewportRect().center);
                                        blockInputNode.setParent(cc.director.getScene());
                                    }
                                    blockInputNode.active = true;
                                    return [4 /*yield*/, cc.loader.loadResAwait("prefab/" + sceneName, cc.Prefab)];
                                case 1:
                                    prefab = _a.sent();
                                    console.log("加载场景成功", sceneName);
                                    deletes = Facade_1.default.canvasNode.children.filter(function (value) { return value.getComponent(cc.Camera) == null; });
                                    deletes.forEach(function (value) {
                                        // value.removeFromParent(true);
                                        value.destroy();
                                    });
                                    console.log("清理场景成功.");
                                    blockInputNode.active = false;
                                    node = cc.instantiate(prefab);
                                    node.setParent(Facade_1.default.canvasNode);
                                    currentSceneName = sceneName;
                                    console.log("创建场景成功.", sceneName);
                                    resolve(node);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    LoadSceneCommand = __decorate([
        ccclass("LoadSceneCommand")
    ], LoadSceneCommand);
    return LoadSceneCommand;
}());
exports.default = LoadSceneCommand;
function getCurrentSceneName() {
    return currentSceneName;
}
exports.getCurrentSceneName = getCurrentSceneName;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZmFjYWRlL0xvYWRTY2VuZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7OztBQUduRyxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSSxnQkFBZ0IsR0FBVSxjQUFjLENBQUM7QUFFN0MsSUFBSSxjQUFjLEdBQVcsSUFBSSxDQUFDO0FBR2xDO0lBQUE7SUFxQ0EsQ0FBQztJQW5DUyxrQ0FBTyxHQUFiO1FBQWUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7dUNBQUUsT0FBTzs7O2dCQUMzQixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFNLE9BQU8sRUFBRSxNQUFNOzs7OztvQ0FLaEMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7b0NBQ3JDLElBQUksY0FBYyxJQUFJLElBQUksRUFBQzt3Q0FDdkIsY0FBYyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO3dDQUMvQixjQUFjLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO3dDQUM1QyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dDQUNqRCxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3Q0FDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dDQUM3RCxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztxQ0FDcEQ7b0NBRUQsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0NBQ2hCLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFBOztvQ0FBckUsTUFBTSxHQUFHLFNBQTREO29DQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztvQ0FFN0IsT0FBTyxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQXJDLENBQXFDLENBQUMsQ0FBQztvQ0FDaEcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7d0NBQ2pCLGdDQUFnQzt3Q0FDaEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUNwQixDQUFDLENBQUMsQ0FBQztvQ0FDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUN2QixjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQ0FDMUIsSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQ0FDbEMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO29DQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQ0FDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O3lCQUNqQixDQUFDLEVBQUM7OztLQUNOO0lBcENnQixnQkFBZ0I7UUFEcEMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO09BQ1AsZ0JBQWdCLENBcUNwQztJQUFELHVCQUFDO0NBckNELEFBcUNDLElBQUE7a0JBckNvQixnQkFBZ0I7QUF1Q3JDLFNBQWdCLG1CQUFtQjtJQUMvQixPQUFPLGdCQUFnQixDQUFDO0FBQzVCLENBQUM7QUFGRCxrREFFQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHtJQ29tbWFuZH0gZnJvbSBcIi4vSUNvbW1hbmRcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi9GYWNhZGVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxubGV0IGN1cnJlbnRTY2VuZU5hbWU6c3RyaW5nID0gXCJXZWxjb21lU2NlbmVcIjtcclxuXHJcbmxldCBibG9ja0lucHV0Tm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbkBjY2NsYXNzKFwiTG9hZFNjZW5lQ29tbWFuZFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmVDb21tYW5kIGltcGxlbWVudHMgSUNvbW1hbmQge1xyXG5cclxuICAgIGFzeW5jIGV4ZWN1dGUgKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvKiog55Sx5LqOY29jb3PliIfmjaLlnLrmma/lnKjpg6jliIZhbmRyb2lk5omL5py65LiK5Lya6buR5bGP5LiA5LiL77yM5omA5Lul5Yqg6L295Zy65pmv5pS55Li65Yqg6L295a+55bqUcHJlZmFiICovXHJcbiAgICAgICAgICAgIC8qY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lTmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KSovXHJcbiAgICAgICAgICAgIGxldCBzY2VuZU5hbWUgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzY2VuZU5hbWUsIFwic2NlbmVOYW1lLlwiKTtcclxuICAgICAgICAgICAgaWYgKGJsb2NrSW5wdXROb2RlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgYmxvY2tJbnB1dE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tJbnB1dE5vZGUuekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcclxuICAgICAgICAgICAgICAgIGJsb2NrSW5wdXROb2RlLmFkZENvbXBvbmVudChjYy5CbG9ja0lucHV0RXZlbnRzKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrSW5wdXROb2RlLnNldENvbnRlbnRTaXplKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKSk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0lucHV0Tm9kZS5zZXRQb3NpdGlvbihjYy52aWV3LmdldFZpZXdwb3J0UmVjdCgpLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICBibG9ja0lucHV0Tm9kZS5zZXRQYXJlbnQoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJsb2NrSW5wdXROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL1wiK3NjZW5lTmFtZSwgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3lnLrmma/miJDlip9cIiwgc2NlbmVOYW1lKTtcclxuICAgICAgICAgICAgLyoqIOWFiOaKiuWcuuaZr+S4iueahOi1hOa6kOmDveW5suaOiemZpOS6huaRhOWDj+acuiAqL1xyXG4gICAgICAgICAgICBsZXQgZGVsZXRlcyA9IEZhY2FkZS5jYW52YXNOb2RlLmNoaWxkcmVuLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKSA9PSBudWxsKTtcclxuICAgICAgICAgICAgZGVsZXRlcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHZhbHVlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIua4heeQhuWcuuaZr+aIkOWKny5cIik7XHJcbiAgICAgICAgICAgIGJsb2NrSW5wdXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoRmFjYWRlLmNhbnZhc05vZGUpO1xyXG4gICAgICAgICAgICBjdXJyZW50U2NlbmVOYW1lID0gc2NlbmVOYW1lO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIm+W7uuWcuuaZr+aIkOWKny5cIiwgc2NlbmVOYW1lKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTY2VuZU5hbWUoKTpzdHJpbmcge1xyXG4gICAgcmV0dXJuIGN1cnJlbnRTY2VuZU5hbWU7XHJcbn1cclxuIl19