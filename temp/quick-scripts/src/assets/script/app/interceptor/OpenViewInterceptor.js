"use strict";
cc._RF.push(module, '27753peuxhLZrjjPlvjamxu', 'OpenViewInterceptor');
// script/app/interceptor/OpenViewInterceptor.ts

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
var Facade_1 = require("../../../framework/facade/Facade");
var LifeCycle_1 = require("../../../framework/component/LifeCycle");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BLOCK_LAYER_NAME_PREV = "blockLayer==>";
var OpenViewInterceptor = /** @class */ (function () {
    function OpenViewInterceptor() {
    }
    OpenViewInterceptor_1 = OpenViewInterceptor;
    OpenViewInterceptor.onceAwait = function (viewPath, event) {
        return __awaiter(this, void 0, void 0, function () {
            var blockLayer;
            return __generator(this, function (_a) {
                blockLayer = Facade_1.default.canvasNode.getChildByName("" + (BLOCK_LAYER_NAME_PREV + viewPath));
                if (blockLayer) {
                    return [2 /*return*/, blockLayer.onceAwait(event)];
                }
                else {
                    console.error("not found view==>" + viewPath);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 打开view之前处理
     * @param args 打窗口的参数
     *
     * 说明：
     * 1.如果要给阻塞层添加灰色的背景，则可以在preHandle中给this.blockLayer.addComponent(cc.Sprite);
     * 2.如果要在两个界面间插入一个界面，则可以在此处拦截并阻塞消息，直到插入的界面关闭(await Facade.canvasNode.onceAwait(xxx));
     * 3.如果要在打开窗口和其他事件同时进行的任务。比如打开窗口的同时请求网络数据，等网络数据到达时刷新界面。(Promise.all([p1, p2]));
     * */
    OpenViewInterceptor.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var colorPrefab, blockLayer, colorSpriteFrame;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cc.loader.loadResAwait("prefab/color", cc.Prefab)];
                                case 1:
                                    colorPrefab = _a.sent();
                                    blockLayer = new cc.Node("" + (BLOCK_LAYER_NAME_PREV + args[0]));
                                    blockLayer.on(cc.Node.EventType.TOUCH_START, function (event) {
                                        console.log("\u70B9\u51FB\u4E86\u963B\u585E\u5C42touch start=>" + blockLayer.name);
                                    });
                                    blockLayer.addComponent(cc.BlockInputEvents);
                                    colorSpriteFrame = cc.instantiate(colorPrefab).getComponent(cc.Sprite).spriteFrame;
                                    blockLayer.addComponent(cc.Sprite).spriteFrame = colorSpriteFrame;
                                    blockLayer.color = cc.Color.BLACK;
                                    blockLayer.opacity = 0;
                                    blockLayer.setContentSize(cc.view.getVisibleSize());
                                    Facade_1.default.canvasNode.addChild(blockLayer);
                                    blockLayer.runAction(cc.fadeTo(1, 150));
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 打开view之后处理
     * @param node 打开窗口的node
     * @param args 打开窗口的参数
     *
     * 说明：
     * 1.如果要处理点击阻塞层就关闭窗口，则在postHandle中监听this.blockLayer的Touch事件即可处理.
     * 2.如果要添加打开窗口的动画，则在postHandle中处理，如调用this.moveDownToFocus(res)等方法
     * */
    OpenViewInterceptor.prototype.postHandle = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var blockLayer, lifeCycle;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    blockLayer = Facade_1.default.canvasNode.getChildByName("" + (BLOCK_LAYER_NAME_PREV + args[0]));
                                    blockLayer.emit(OpenViewInterceptor_1.BlockLayerEvent.viewCreateFinish, node);
                                    lifeCycle = node.addComponent(LifeCycle_1.default);
                                    lifeCycle.addCall("onDestroy", function () {
                                        blockLayer.emit(OpenViewInterceptor_1.BlockLayerEvent.destroy);
                                        blockLayer.destroy();
                                    });
                                    if (!(args[0] == "prefab/task")) return [3 /*break*/, 2];
                                    cc.director.getScene().getChildByName('top').active = true;
                                    return [4 /*yield*/, this.moveDownToFocus(node)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    if (args[0] == 'prefab/gameover') {
                                        cc.director.getScene().getChildByName('top').active = true;
                                    }
                                    _a.label = 3;
                                case 3:
                                    blockLayer.emit(OpenViewInterceptor_1.BlockLayerEvent.viewDisplayFinish, node);
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** 打开窗口的特效 */
    /** 从屏幕下方弹出 */
    OpenViewInterceptor.prototype.moveDownToFocus = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x = node.x;
                        y = node.y;
                        node.y = y - cc.view.getVisibleSize().height;
                        return [4 /*yield*/, node.runActionAwait(cc.moveTo(1.2, x, y).easing(cc.easeElasticOut(0.6)))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var OpenViewInterceptor_1;
    OpenViewInterceptor.BlockLayerEvent = {
        destroy: "destroy",
        viewCreateFinish: "viewCreateFinish",
        viewDisplayFinish: "viewDisplayFinish",
    };
    OpenViewInterceptor = OpenViewInterceptor_1 = __decorate([
        ccclass
    ], OpenViewInterceptor);
    return OpenViewInterceptor;
}());
exports.default = OpenViewInterceptor;

cc._RF.pop();