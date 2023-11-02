"use strict";
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