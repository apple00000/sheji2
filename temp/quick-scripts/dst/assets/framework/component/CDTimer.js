
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/CDTimer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L0NEVGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBOEMsRUFBRSxDQUFDLFVBQVUsRUFBMUQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsZ0JBQWdCLHNCQUFpQixDQUFDO0FBS2xFO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBK0NDO1FBN0NHLFVBQUksR0FBRyxLQUFLLENBQUM7UUFHYixRQUFFLEdBQUcsQ0FBQyxDQUFDO1FBR1AsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUdkLHdCQUFrQixHQUErQixFQUFFLENBQUM7UUFHcEQsdUJBQWlCLEdBQStCLEVBQUUsQ0FBQztRQUczQyxjQUFRLEdBQUcsQ0FBQyxDQUFDOztJQThCekIsQ0FBQztJQTVCRyxzQkFBSSw0QkFBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQseUJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSztZQUFDLE9BQU87UUFDdEIsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUM7Z0JBQ3pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksSUFBSSxDQUFDLElBQUksRUFBQztvQkFDVixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDaEI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQTVDRDtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLGdCQUFnQixFQUFDLENBQUM7eUNBQzlDO0lBR2I7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLENBQUM7dUNBQzFCO0lBR1A7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7MENBQ2pCO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsYUFBYSxFQUFDLENBQUM7dURBQ25DO0lBR3BEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLGFBQWEsRUFBQyxDQUFDO3NEQUNwQztJQWRsQyxPQUFPO1FBSDNCLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQztPQUNDLE9BQU8sQ0ErQzNCO0lBQUQsY0FBQztDQS9DRCxBQStDQyxDQS9Db0MsRUFBRSxDQUFDLFNBQVMsR0ErQ2hEO2tCQS9Db0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHksIG1lbnUsIGRpc2FsbG93TXVsdGlwbGV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbkBtZW51KFwi6Ieq5a6a5LmJL0NEVGltZXJcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0RUaW1lciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5piv5ZCm5LiA5qyh5oCnXCIsIHRleHRUaXBzOlwi6YCJ5piv5YiZ5Zyo5YCS6K6h5pe257uT5p2f5Lya6ZSA5q+B6Ieq5bexXCJ9KVxyXG4gICAgb25jZSA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLlgJLorqHml7Yo56eSKVwifSlcclxuICAgIGNkID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5pqC5YGc5byA5YWzXCJ9KVxyXG4gICAgcGF1c2UgPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciwgZGlzcGxheU5hbWU6XCLov5vluqbkuovku7ZcIiwgdGV4dFRpcHM6XCLmr4/kuIDluKfpg73kvJrmlLbliLDov5vluqbkv6Hmga9cIn0pXHJcbiAgICBmcmFtZUV2ZW50SGFuZGxlcnM6W2NjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIGRpc3BsYXlOYW1lOlwi5b2S6Zu25LqL5Lu2XCIsIHRleHRUaXBzOlwiQ0TlvZLpm7bml7bkvJrmlLbliLDmraTmtojmga9cIn0pXHJcbiAgICB6ZXJvRXZlbnRIYW5kbGVyczpbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0gPSBbXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfY3VyVGltZSA9IDA7XHJcblxyXG4gICAgZ2V0IGN1clRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBjZERlbHRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNkIC0gdGhpcy5jdXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5fY3VyVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhdXNlKXJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5jZCA+IDAgJiYgdGhpcy5fY3VyVGltZSA8IHRoaXMuY2Qpe1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLl9jdXJUaW1lL3RoaXMuY2Q7XHJcbiAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmZyYW1lRXZlbnRIYW5kbGVycywgcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyVGltZSA+PSB0aGlzLmNkKXtcclxuICAgICAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLnplcm9FdmVudEhhbmRsZXJzLCBwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==