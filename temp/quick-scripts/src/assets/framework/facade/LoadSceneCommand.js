"use strict";
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