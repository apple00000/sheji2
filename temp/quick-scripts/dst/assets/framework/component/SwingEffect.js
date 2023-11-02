
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/SwingEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1N3aW5nRWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFFbkMsSUFBQSxLQUE0QixFQUFFLENBQUMsVUFBVSxFQUF4QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWlCLENBQUM7QUFJaEQ7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFzQ0M7UUFuQ0csZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBR2IsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixXQUFLLEdBQUcsR0FBRyxHQUFDLENBQUMsQ0FBQztRQUdkLFdBQUssR0FBRyxDQUFDLENBQUM7UUFHVixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR1osZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsaUJBQVcsR0FBRyxDQUFDLENBQUM7O0lBV3BCLENBQUM7SUFURyw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEosSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBQztZQUNuQixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzRjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUM7WUFDMUIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQWxDRDtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQzttREFDaEI7SUFHZjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsQ0FBQztpREFDbEI7SUFHYjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDZjtJQUdmO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxDQUFDOzhDQUNmO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7OENBQ3JCO0lBR1Y7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLENBQUM7Z0RBQ2xCO0lBR1o7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxXQUFXLEVBQUMsQ0FBQzttREFDdkM7SUFHZjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLG9CQUFvQixFQUFDLENBQUM7a0RBQzlDO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxjQUFjLEVBQUMsQ0FBQztvREFDeEM7SUEzQkMsV0FBVztRQUYvQixPQUFPO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDO09BQ0gsV0FBVyxDQXNDL0I7SUFBRCxrQkFBQztDQXRDRCxBQXNDQyxDQXRDd0MsRUFBRSxDQUFDLFNBQVMsR0FzQ3BEO2tCQXRDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQWN0aW9ucyBmcm9tIFwiLi4vYWN0aW9ucy9BY3Rpb25zXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHksIG1lbnV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi6Ieq5a6a5LmJL1N3aW5nRWZmZWN0XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3aW5nRWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5byA5aeL6KeS5bqmXCJ9KVxyXG4gICAgc3RhcnRWYWx1ZSA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIue7k+adn+inkuW6plwifSlcclxuICAgIGVuZFZhbHVlID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi6KeS5bqm5beuXCJ9KVxyXG4gICAgZGVsdGFWYWx1ZSA9IDg7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIumAn+W6plwifSlcclxuICAgIHNwZWVkID0gMzYwLzI7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIuaRhuWKqOasoeaVsFwifSlcclxuICAgIHRpbWVzID0gODtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi6KGw5YeP5YC8XCJ9KVxyXG4gICAgZGFtcGluZyA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIuWRqOacn+aAp+W7tuaXtlwiLCB0ZXh0VGlwczpcIuWNleaRhuWIsOacgOmrmOeCueaXtuW7tuaXtlwifSlcclxuICAgIGN5Y2xlRGVsYXkgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLph43lpI1cIiwgdGV4dFRpcHM6XCLlsI/kuo7pm7booajnpLpyZXBlYXRGb3JldmVyXCJ9KVxyXG4gICAgcmVwZWF0TnVtID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi6YeN5aSN5bu25pe2XCIsIHRleHRUaXBzOlwi6YeN5aSN5qyh5pWw5LiN562J5LqOMOaXtuaJjeacieaViFwifSlcclxuICAgIHJlcGVhdERlbGF5ID0gMDtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBBY3Rpb25zLmN5Y2xlQWN0aW9uKGNjLnJvdGF0ZVRvLCB0aGlzLnN0YXJ0VmFsdWUsIHRoaXMuZW5kVmFsdWUsIHRoaXMuZGVsdGFWYWx1ZSwgdGhpcy5zcGVlZCwgdGhpcy50aW1lcywgdGhpcy5kYW1waW5nLCB0aGlzLmN5Y2xlRGVsYXkpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlcGVhdE51bSA+IDApe1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXQoY2Muc2VxdWVuY2UoYWN0aW9uLCBjYy5kZWxheVRpbWUodGhpcy5yZXBlYXREZWxheSkpLCB0aGlzLnJlcGVhdE51bSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlcGVhdE51bSA8IDApe1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGFjdGlvbiwgY2MuZGVsYXlUaW1lKHRoaXMucmVwZWF0RGVsYXkpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxufVxyXG4iXX0=