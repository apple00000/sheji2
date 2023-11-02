"use strict";
cc._RF.push(module, 'a7c48jInGlJw7oRhT15QWXk', 'LifeCycle');
// framework/component/LifeCycle.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LifeCycle = /** @class */ (function (_super) {
    __extends(LifeCycle, _super);
    function LifeCycle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LifeCycle_1 = LifeCycle;
    LifeCycle.prototype.addCall = function (lifeName, callFunc, callObj) {
        var thatCall = this[lifeName];
        this[lifeName] = function () {
            if (thatCall) {
                thatCall();
            }
            if (callObj) {
                callFunc.call(callObj);
            }
            else {
                callFunc();
            }
        };
    };
    LifeCycle.onDestroyFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onDestroy", function () {
            if (node.isValid) {
                node.destroy();
            }
        });
    };
    LifeCycle.onDisableFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onDisable", function () {
            node.active = false;
        });
    };
    LifeCycle.onEnableFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onEnable", function () {
            node.active = true;
        });
    };
    var LifeCycle_1;
    LifeCycle = LifeCycle_1 = __decorate([
        ccclass
    ], LifeCycle);
    return LifeCycle;
}(cc.Component));
exports.default = LifeCycle;

cc._RF.pop();