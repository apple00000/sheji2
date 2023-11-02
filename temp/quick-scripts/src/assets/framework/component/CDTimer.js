"use strict";
cc._RF.push(module, 'c739atlrTdAc4RH4aaUDag6', 'CDTimer');
// framework/component/CDTimer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
var CDTimer = /** @class */ (function (_super) {
    __extends(CDTimer, _super);
    function CDTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.once = false;
        _this.cd = 0;
        _this.pause = false;
        _this.frameEventHandlers = [];
        _this.zeroEventHandlers = [];
        _this._curTime = 0;
        return _this;
    }
    Object.defineProperty(CDTimer.prototype, "curTime", {
        get: function () {
            return this._curTime;
        },
        enumerable: false,
        configurable: true
    });
    CDTimer.prototype.cdDelta = function () {
        return this.cd - this.curTime;
    };
    CDTimer.prototype.reset = function () {
        this._curTime = 0;
    };
    CDTimer.prototype.update = function (dt) {
        if (this.pause)
            return;
        if (this.cd > 0 && this._curTime < this.cd) {
            this._curTime += dt;
            var progress = this._curTime / this.cd;
            cc.Component.EventHandler.emitEvents(this.frameEventHandlers, progress);
            if (this._curTime >= this.cd) {
                cc.Component.EventHandler.emitEvents(this.zeroEventHandlers, progress);
                if (this.once) {
                    this.destroy();
                }
                else {
                    this.reset();
                }
            }
        }
    };
    __decorate([
        property({ displayName: "是否一次性", textTips: "选是则在倒计时结束会销毁自己" })
    ], CDTimer.prototype, "once", void 0);
    __decorate([
        property({ displayName: "倒计时(秒)" })
    ], CDTimer.prototype, "cd", void 0);
    __decorate([
        property({ displayName: "暂停开关" })
    ], CDTimer.prototype, "pause", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "进度事件", textTips: "每一帧都会收到进度信息" })
    ], CDTimer.prototype, "frameEventHandlers", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "归零事件", textTips: "CD归零时会收到此消息" })
    ], CDTimer.prototype, "zeroEventHandlers", void 0);
    CDTimer = __decorate([
        ccclass,
        disallowMultiple,
        menu("自定义/CDTimer")
    ], CDTimer);
    return CDTimer;
}(cc.Component));
exports.default = CDTimer;

cc._RF.pop();