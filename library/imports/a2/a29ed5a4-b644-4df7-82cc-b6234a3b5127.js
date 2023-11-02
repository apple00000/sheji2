"use strict";
cc._RF.push(module, 'a29edWktkRN94LMtiNKO1En', 'ZoomEffect');
// framework/component/ZoomEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Actions_1 = require("../actions/Actions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZoomEffect = /** @class */ (function (_super) {
    __extends(ZoomEffect, _super);
    function ZoomEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startValue = 1;
        _this.endValue = 1;
        _this.deltaValue = 0.1;
        _this.speed = 1 / 0.8;
        _this.times = 0;
        _this.damping = 0;
        _this.cycleDelay = 0;
        _this.repeatNum = 0;
        _this.repeatDelay = 0;
        return _this;
    }
    ZoomEffect.prototype.onLoad = function () {
        var action = Actions_1.default.cycleAction(cc.scaleTo, this.startValue, this.endValue, this.deltaValue, this.speed, this.times, this.damping, this.cycleDelay);
        if (this.repeatNum > 0) {
            action = cc.repeat(cc.sequence(action, cc.delayTime(this.repeatDelay)), this.repeatNum);
        }
        else if (this.repeatNum < 0) {
            action = cc.repeatForever(cc.sequence(action, cc.delayTime(this.repeatDelay)));
        }
        this.node.runAction(action);
    };
    __decorate([
        property({ displayName: "开始缩放值" })
    ], ZoomEffect.prototype, "startValue", void 0);
    __decorate([
        property({ displayName: "结束缩放值" })
    ], ZoomEffect.prototype, "endValue", void 0);
    __decorate([
        property({ displayName: "缩放差" })
    ], ZoomEffect.prototype, "deltaValue", void 0);
    __decorate([
        property({ displayName: "速度" })
    ], ZoomEffect.prototype, "speed", void 0);
    __decorate([
        property({ displayName: "缩放次数" })
    ], ZoomEffect.prototype, "times", void 0);
    __decorate([
        property({ displayName: "衰减值" })
    ], ZoomEffect.prototype, "damping", void 0);
    __decorate([
        property({ displayName: "周期性延时", textTips: "单摆到最高点时延时" })
    ], ZoomEffect.prototype, "cycleDelay", void 0);
    __decorate([
        property({ displayName: "重复", textTips: "小于零表示repeatForever" })
    ], ZoomEffect.prototype, "repeatNum", void 0);
    __decorate([
        property({ displayName: "重复延时", textTips: "重复次数不等于0时才有效" })
    ], ZoomEffect.prototype, "repeatDelay", void 0);
    ZoomEffect = __decorate([
        ccclass
    ], ZoomEffect);
    return ZoomEffect;
}(cc.Component));
exports.default = ZoomEffect;

cc._RF.pop();