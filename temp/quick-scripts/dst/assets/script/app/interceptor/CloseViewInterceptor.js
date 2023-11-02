
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/interceptor/CloseViewInterceptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70f4ci32X1CS5X5s4ooQJYZ', 'CloseViewInterceptor');
// script/app/interceptor/CloseViewInterceptor.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CloseViewInterceptor = /** @class */ (function () {
    function CloseViewInterceptor() {
    }
    /**
     * 关闭view之前处理
     * */
    CloseViewInterceptor.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var str, node;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    str = args[0];
                                    if (typeof str != "string") {
                                        str = str.name;
                                    }
                                    if (!(str == "task")) return [3 /*break*/, 2];
                                    node = typeof args[0] == "string" ? Facade_1.default.canvasNode.getChildByName(str) : args[0];
                                    return [4 /*yield*/, this.moveFocusToDown(node)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 关闭view之后处理
     * */
    CloseViewInterceptor.prototype.postHandle = function (res) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var str = args[0];
                        if (typeof str != "string") {
                            str = str.name;
                        }
                        if (str == "task") {
                        }
                        resolve();
                    })];
            });
        });
    };
    /** 关闭窗口的特效 */
    /** 从下方移出 */
    CloseViewInterceptor.prototype.moveFocusToDown = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await node.runActionAwait(cc.moveBy(1.5, 0, -cc.view.getVisibleSize().height).easing(cc.easeElasticIn(0.6)));
                    return [4 /*yield*/, node.runActionAwait(cc.moveBy(0.5, 0, -cc.view.getVisibleSize().height).easing(cc.easeBackIn()))];
                    case 1:
                        // await node.runActionAwait(cc.moveBy(1.5, 0, -cc.view.getVisibleSize().height).easing(cc.easeElasticIn(0.6)));
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloseViewInterceptor = __decorate([
        ccclass
    ], CloseViewInterceptor);
    return CloseViewInterceptor;
}());
exports.default = CloseViewInterceptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2ludGVyY2VwdG9yL0Nsb3NlVmlld0ludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUduRywyREFBc0Q7QUFFaEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtJQTBDQSxDQUFDO0lBeENHOztTQUVLO0lBQ0Msd0NBQVMsR0FBZjtRQUFnQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRyxPQUFPOzs7Z0JBQzdCLHNCQUFPLElBQUksT0FBTyxDQUFVLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7O29DQUMxQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTt3Q0FDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7cUNBQ2xCO3lDQUNHLENBQUEsR0FBRyxJQUFJLE1BQU0sQ0FBQSxFQUFiLHdCQUFhO29DQUNULElBQUksR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN4RixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFBOztvQ0FBaEMsU0FBZ0MsQ0FBQzs7O29DQUVyQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7eUJBQ2pCLENBQUMsRUFBQzs7O0tBQ047SUFHRDs7U0FFSztJQUNDLHlDQUFVLEdBQWhCLFVBQWlCLEdBQVE7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOzt1Q0FBRyxPQUFPOztnQkFDeEMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTs0QkFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7eUJBQ2xCO3dCQUNELElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTt5QkFDbEI7d0JBQ0QsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUQsY0FBYztJQUVkLFlBQVk7SUFDTiw4Q0FBZSxHQUFyQixVQUFzQixJQUFhOzs7OztvQkFDL0IsZ0hBQWdIO29CQUNoSCxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUE7O3dCQUR0RyxnSEFBZ0g7d0JBQ2hILFNBQXNHLENBQUM7Ozs7O0tBQzFHO0lBekNnQixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQTBDeEM7SUFBRCwyQkFBQztDQTFDRCxBQTBDQyxJQUFBO2tCQTFDb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQge0lDb21tYW5kSW50ZXJjZXB0b3J9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvQ29tbWFuZEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3NlVmlld0ludGVyY2VwdG9yIGltcGxlbWVudHMgSUNvbW1hbmRJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl612aWV35LmL5YmN5aSE55CGXHJcbiAgICAgKiAqL1xyXG4gICAgYXN5bmMgcHJlSGFuZGxlKC4uLmFyZ3MpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gYXJnc1swXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgc3RyID0gc3RyLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0ciA9PSBcInRhc2tcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSB0eXBlb2YgYXJnc1swXSA9PSBcInN0cmluZ1wiID8gRmFjYWRlLmNhbnZhc05vZGUuZ2V0Q2hpbGRCeU5hbWUoc3RyKSA6IGFyZ3NbMF07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1vdmVGb2N1c1RvRG93bihub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXrXZpZXfkuYvlkI7lpITnkIZcclxuICAgICAqICovXHJcbiAgICBhc3luYyBwb3N0SGFuZGxlKHJlczogYW55LCAuLi5hcmdzKTogUHJvbWlzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyICE9IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdHIgPT0gXCJ0YXNrXCIpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWFs+mXreeql+WPo+eahOeJueaViCAqL1xyXG5cclxuICAgIC8qKiDku47kuIvmlrnnp7vlh7ogKi9cclxuICAgIGFzeW5jIG1vdmVGb2N1c1RvRG93bihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgLy8gYXdhaXQgbm9kZS5ydW5BY3Rpb25Bd2FpdChjYy5tb3ZlQnkoMS41LCAwLCAtY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCkuZWFzaW5nKGNjLmVhc2VFbGFzdGljSW4oMC42KSkpO1xyXG4gICAgICAgIGF3YWl0IG5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZUJ5KDAuNSwgMCwgLWNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQpLmVhc2luZyhjYy5lYXNlQmFja0luKCkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=