"use strict";
cc._RF.push(module, 'abbefSmFDxID7incLgxXe5d', 'SwingEffect');
// framework/component/SwingEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Actions_1 = require("../actions/Actions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var SwingEffect = /** @class */ (function (_super) {
    __extends(SwingEffect, _super);
    function SwingEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startValue = 0;
        _this.endValue = 0;
        _this.deltaValue = 8;
        _this.speed = 360 / 2;
        _this.times = 8;
        _this.damping = 0;
        _this.cycleDelay = 0;
        _this.repeatNum = 0;
        _this.repeatDelay = 0;
        return _this;
    }
    SwingEffect.prototype.onLoad = function () {
        var action = Actions_1.default.cycleAction(cc.rotateTo, this.startValue, this.endValue, this.deltaValue, this.speed, this.times, this.damping, this.cycleDelay);
        if (this.repeatNum > 0) {
            action = cc.repeat(cc.sequence(action, cc.delayTime(this.repeatDelay)), this.repeatNum);
        }
        else if (this.repeatNum < 0) {
            action = cc.repeatForever(cc.sequence(action, cc.delayTime(this.repeatDelay)));
        }
        this.node.runAction(action);
    };
    __decorate([
        property({ displayName: "开始角度" })
    ], SwingEffect.prototype, "startValue", void 0);
    __decorate([
        property({ displayName: "结束角度" })
    ], SwingEffect.prototype, "endValue", void 0);
    __decorate([
        property({ displayName: "角度差" })
    ], SwingEffect.prototype, "deltaValue", void 0);
    __decorate([
        property({ displayName: "速度" })
    ], SwingEffect.prototype, "speed", void 0);
    __decorate([
        property({ displayName: "摆动次数" })
    ], SwingEffect.prototype, "times", void 0);
    __decorate([
        property({ displayName: "衰减值" })
    ], SwingEffect.prototype, "damping", void 0);
    __decorate([
        property({ displayName: "周期性延时", textTips: "单摆到最高点时延时" })
    ], SwingEffect.prototype, "cycleDelay", void 0);
    __decorate([
        property({ displayName: "重复", textTips: "小于零表示repeatForever" })
    ], SwingEffect.prototype, "repeatNum", void 0);
    __decorate([
        property({ displayName: "重复延时", textTips: "重复次数不等于0时才有效" })
    ], SwingEffect.prototype, "repeatDelay", void 0);
    SwingEffect = __decorate([
        ccclass,
        menu("自定义/SwingEffect")
    ], SwingEffect);
    return SwingEffect;
}(cc.Component));
exports.default = SwingEffect;

cc._RF.pop();