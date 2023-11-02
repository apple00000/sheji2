
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/interceptor/OpenViewInterceptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2ludGVyY2VwdG9yL09wZW5WaWV3SW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBR25HLDJEQUFzRDtBQUN0RCxvRUFBK0Q7QUFFekQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUM7QUFLOUM7SUFBQTtJQXNGQSxDQUFDOzRCQXRGb0IsbUJBQW1CO0lBUXZCLDZCQUFTLEdBQXRCLFVBQXVCLFFBQWUsRUFBRSxLQUFZOzs7O2dCQUM1QyxVQUFVLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQUcscUJBQXFCLEdBQUUsUUFBUSxDQUFFLENBQUMsQ0FBQztnQkFDeEYsSUFBSSxVQUFVLEVBQUM7b0JBQ1gsc0JBQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQztpQkFDdEM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDL0M7Ozs7S0FDSjtJQUVEOzs7Ozs7OztTQVFLO0lBQ0MsdUNBQVMsR0FBZjtRQUFnQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOzs7Z0JBQzVCLHNCQUFPLElBQUksT0FBTyxDQUFVLFVBQU0sT0FBTyxFQUFFLE1BQU07Ozs7d0NBQzNCLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFD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QUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO29DQUM3RSxPQUFPLEVBQUUsQ0FBQzs7Ozt5QkFDYixDQUFDLEVBQUM7OztLQUNOO0lBR0QsY0FBYztJQUVkLGNBQWM7SUFDUiw2Q0FBZSxHQUFyQixVQUFzQixJQUFZOzs7Ozs7d0JBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO3dCQUM3QyxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dCQUE5RSxTQUE4RSxDQUFDOzs7OztLQUNsRjs7SUFsRk0sbUNBQWUsR0FBRTtRQUNwQixPQUFPLEVBQUcsU0FBUztRQUNuQixnQkFBZ0IsRUFBRyxrQkFBa0I7UUFDckMsaUJBQWlCLEVBQUcsbUJBQW1CO0tBQzFDLENBQUM7SUFOZSxtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQXNGdkM7SUFBRCwwQkFBQztDQXRGRCxBQXNGQyxJQUFBO2tCQXRGb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQge0lDb21tYW5kSW50ZXJjZXB0b3J9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvQ29tbWFuZEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcbmltcG9ydCBMaWZlQ3ljbGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnQvTGlmZUN5Y2xlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IEJMT0NLX0xBWUVSX05BTUVfUFJFViA9IFwiYmxvY2tMYXllcj09PlwiO1xyXG5cclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuVmlld0ludGVyY2VwdG9yIGltcGxlbWVudHMgSUNvbW1hbmRJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgc3RhdGljIEJsb2NrTGF5ZXJFdmVudCA9e1xyXG4gICAgICAgIGRlc3Ryb3kgOiBcImRlc3Ryb3lcIixcclxuICAgICAgICB2aWV3Q3JlYXRlRmluaXNoIDogXCJ2aWV3Q3JlYXRlRmluaXNoXCIsXHJcbiAgICAgICAgdmlld0Rpc3BsYXlGaW5pc2ggOiBcInZpZXdEaXNwbGF5RmluaXNoXCIsXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBhc3luYyBvbmNlQXdhaXQodmlld1BhdGg6c3RyaW5nLCBldmVudDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBibG9ja0xheWVyID0gRmFjYWRlLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoYCR7QkxPQ0tfTEFZRVJfTkFNRV9QUkVWICt2aWV3UGF0aH1gKTtcclxuICAgICAgICBpZiAoYmxvY2tMYXllcil7XHJcbiAgICAgICAgICAgIHJldHVybiBibG9ja0xheWVyLm9uY2VBd2FpdChldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm5vdCBmb3VuZCB2aWV3PT0+XCIrdmlld1BhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gHZpZXfkuYvliY3lpITnkIZcclxuICAgICAqIEBwYXJhbSBhcmdzIOaJk+eql+WPo+eahOWPguaVsFxyXG4gICAgICpcclxuICAgICAqIOivtOaYju+8mlxyXG4gICAgICogMS7lpoLmnpzopoHnu5npmLvloZ7lsYLmt7vliqDngbDoibLnmoTog4zmma/vvIzliJnlj6/ku6XlnKhwcmVIYW5kbGXkuK3nu5l0aGlzLmJsb2NrTGF5ZXIuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgKiAyLuWmguaenOimgeWcqOS4pOS4queVjOmdoumXtOaPkuWFpeS4gOS4queVjOmdou+8jOWImeWPr+S7peWcqOatpOWkhOaLpuaIquW5tumYu+Whnua2iOaBr++8jOebtOWIsOaPkuWFpeeahOeVjOmdouWFs+mXrShhd2FpdCBGYWNhZGUuY2FudmFzTm9kZS5vbmNlQXdhaXQoeHh4KSk7XHJcbiAgICAgKiAzLuWmguaenOimgeWcqOaJk+W8gOeql+WPo+WSjOWFtuS7luS6i+S7tuWQjOaXtui/m+ihjOeahOS7u+WKoeOAguavlOWmguaJk+W8gOeql+WPo+eahOWQjOaXtuivt+axgue9kee7nOaVsOaNru+8jOetiee9kee7nOaVsOaNruWIsOi+vuaXtuWIt+aWsOeVjOmdouOAgihQcm9taXNlLmFsbChbcDEsIHAyXSkpO1xyXG4gICAgICogKi9cclxuICAgIGFzeW5jIHByZUhhbmRsZSguLi5hcmdzKTpQcm9taXNlPGJvb2xlYW4+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyhyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvbG9yUHJlZmFiID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9jb2xvclwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICAvKiog5re75Yqg6Zi75aGe5bGCICovXHJcbiAgICAgICAgICAgIGxldCBibG9ja0xheWVyID0gbmV3IGNjLk5vZGUoYCR7QkxPQ0tfTEFZRVJfTkFNRV9QUkVWICsgYXJnc1swXX1gKTtcclxuICAgICAgICAgICAgYmxvY2tMYXllci5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50KT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYOeCueWHu+S6humYu+WhnuWxgnRvdWNoIHN0YXJ0PT4ke2Jsb2NrTGF5ZXIubmFtZX1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJsb2NrTGF5ZXIuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgICAgICAgICBsZXQgY29sb3JTcHJpdGVGcmFtZSA9IGNjLmluc3RhbnRpYXRlKGNvbG9yUHJlZmFiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgYmxvY2tMYXllci5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvbG9yU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIGJsb2NrTGF5ZXIuY29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICAgICAgYmxvY2tMYXllci5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgYmxvY2tMYXllci5zZXRDb250ZW50U2l6ZShjYy52aWV3LmdldFZpc2libGVTaXplKCkpO1xyXG4gICAgICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5hZGRDaGlsZChibG9ja0xheWVyKTtcclxuICAgICAgICAgICAgYmxvY2tMYXllci5ydW5BY3Rpb24oY2MuZmFkZVRvKDEsIDE1MCkpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIB2aWV35LmL5ZCO5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDmiZPlvIDnqpflj6PnmoRub2RlXHJcbiAgICAgKiBAcGFyYW0gYXJncyDmiZPlvIDnqpflj6PnmoTlj4LmlbBcclxuICAgICAqXHJcbiAgICAgKiDor7TmmI7vvJpcclxuICAgICAqIDEu5aaC5p6c6KaB5aSE55CG54K55Ye76Zi75aGe5bGC5bCx5YWz6Zet56qX5Y+j77yM5YiZ5ZyocG9zdEhhbmRsZeS4reebkeWQrHRoaXMuYmxvY2tMYXllcueahFRvdWNo5LqL5Lu25Y2z5Y+v5aSE55CGLlxyXG4gICAgICogMi7lpoLmnpzopoHmt7vliqDmiZPlvIDnqpflj6PnmoTliqjnlLvvvIzliJnlnKhwb3N0SGFuZGxl5Lit5aSE55CG77yM5aaC6LCD55SodGhpcy5tb3ZlRG93blRvRm9jdXMocmVzKeetieaWueazlVxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIHBvc3RIYW5kbGUobm9kZTphbnksIC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYmxvY2tMYXllciA9IEZhY2FkZS5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKGAke0JMT0NLX0xBWUVSX05BTUVfUFJFViArYXJnc1swXX1gKTtcclxuICAgICAgICAgICAgYmxvY2tMYXllci5lbWl0KE9wZW5WaWV3SW50ZXJjZXB0b3IuQmxvY2tMYXllckV2ZW50LnZpZXdDcmVhdGVGaW5pc2gsIG5vZGUpO1xyXG4gICAgICAgICAgICAvKiog5bCG6Zi75aGe5bGC5LiO6IqC54K555qEZGVzdHJveeeUn+WRveWRqOacn+e7keWumiAqL1xyXG4gICAgICAgICAgICBsZXQgbGlmZUN5Y2xlID0gbm9kZS5hZGRDb21wb25lbnQoTGlmZUN5Y2xlKTtcclxuICAgICAgICAgICAgbGlmZUN5Y2xlLmFkZENhbGwoXCJvbkRlc3Ryb3lcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgICAgICBibG9ja0xheWVyLmVtaXQoT3BlblZpZXdJbnRlcmNlcHRvci5CbG9ja0xheWVyRXZlbnQuZGVzdHJveSk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0xheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChhcmdzWzBdID09IFwicHJlZmFiL3Rhc2tcIil7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCd0b3AnKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5tb3ZlRG93blRvRm9jdXMobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChhcmdzWzBdID09ICdwcmVmYWIvZ2FtZW92ZXInKXtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmxvY2tMYXllci5lbWl0KE9wZW5WaWV3SW50ZXJjZXB0b3IuQmxvY2tMYXllckV2ZW50LnZpZXdEaXNwbGF5RmluaXNoLCBub2RlKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiog5omT5byA56qX5Y+j55qE54m55pWIICovXHJcblxyXG4gICAgLyoqIOS7juWxj+W5leS4i+aWueW8ueWHuiAqL1xyXG4gICAgYXN5bmMgbW92ZURvd25Ub0ZvY3VzKG5vZGU6Y2MuTm9kZSl7XHJcbiAgICAgICAgbGV0IHggPSBub2RlLng7XHJcbiAgICAgICAgbGV0IHkgPSBub2RlLnk7XHJcbiAgICAgICAgbm9kZS55ID0geSAtIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgYXdhaXQgbm9kZS5ydW5BY3Rpb25Bd2FpdChjYy5tb3ZlVG8oMS4yLCB4LCB5KS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC42KSkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=