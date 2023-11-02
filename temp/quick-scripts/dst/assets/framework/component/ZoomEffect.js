
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/ZoomEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1pvb21FZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUVuQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXNDQztRQW5DRyxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUdmLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFHYixnQkFBVSxHQUFHLEdBQUcsQ0FBQztRQUdqQixXQUFLLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUdkLFdBQUssR0FBRyxDQUFDLENBQUM7UUFHVixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR1osZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsaUJBQVcsR0FBRyxDQUFDLENBQUM7O0lBV3BCLENBQUM7SUFURywyQkFBTSxHQUFOO1FBQ0ksSUFBSSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckosSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBQztZQUNuQixNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzRjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUM7WUFDMUIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQWxDRDtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsQ0FBQztrREFDakI7SUFHZjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsQ0FBQztnREFDbkI7SUFHYjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQztrREFDYjtJQUdqQjtRQURDLFFBQVEsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQzs2Q0FDZjtJQUdkO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzZDQUNyQjtJQUdWO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDOytDQUNsQjtJQUdaO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsV0FBVyxFQUFDLENBQUM7a0RBQ3ZDO0lBR2Y7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxvQkFBb0IsRUFBQyxDQUFDO2lEQUM5QztJQUdkO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsY0FBYyxFQUFDLENBQUM7bURBQ3hDO0lBM0JDLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FzQzlCO0lBQUQsaUJBQUM7Q0F0Q0QsQUFzQ0MsQ0F0Q3VDLEVBQUUsQ0FBQyxTQUFTLEdBc0NuRDtrQkF0Q29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFjdGlvbnMgZnJvbSBcIi4uL2FjdGlvbnMvQWN0aW9uc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab29tRWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5byA5aeL57yp5pS+5YC8XCJ9KVxyXG4gICAgc3RhcnRWYWx1ZSA9IDE7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIue7k+adn+e8qeaUvuWAvFwifSlcclxuICAgIGVuZFZhbHVlID0gMTtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi57yp5pS+5beuXCJ9KVxyXG4gICAgZGVsdGFWYWx1ZSA9IDAuMTtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi6YCf5bqmXCJ9KVxyXG4gICAgc3BlZWQgPSAxLzAuODtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi57yp5pS+5qyh5pWwXCJ9KVxyXG4gICAgdGltZXMgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLoobDlh4/lgLxcIn0pXHJcbiAgICBkYW1waW5nID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5ZGo5pyf5oCn5bu25pe2XCIsIHRleHRUaXBzOlwi5Y2V5pGG5Yiw5pyA6auY54K55pe25bu25pe2XCJ9KVxyXG4gICAgY3ljbGVEZWxheSA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHtkaXNwbGF5TmFtZTpcIumHjeWkjVwiLCB0ZXh0VGlwczpcIuWwj+S6jumbtuihqOekunJlcGVhdEZvcmV2ZXJcIn0pXHJcbiAgICByZXBlYXROdW0gPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLph43lpI3lu7bml7ZcIiwgdGV4dFRpcHM6XCLph43lpI3mrKHmlbDkuI3nrYnkuo4w5pe25omN5pyJ5pWIXCJ9KVxyXG4gICAgcmVwZWF0RGVsYXkgPSAwO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IEFjdGlvbnMuY3ljbGVBY3Rpb24oY2Muc2NhbGVUbywgdGhpcy5zdGFydFZhbHVlLCB0aGlzLmVuZFZhbHVlLCB0aGlzLmRlbHRhVmFsdWUsIHRoaXMuc3BlZWQsIHRoaXMudGltZXMsIHRoaXMuZGFtcGluZywgdGhpcy5jeWNsZURlbGF5KTtcclxuICAgICAgICBpZiAodGhpcy5yZXBlYXROdW0gPiAwKXtcclxuICAgICAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0KGNjLnNlcXVlbmNlKGFjdGlvbiwgY2MuZGVsYXlUaW1lKHRoaXMucmVwZWF0RGVsYXkpKSwgdGhpcy5yZXBlYXROdW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXBlYXROdW0gPCAwKXtcclxuICAgICAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShhY3Rpb24sIGNjLmRlbGF5VGltZSh0aGlzLnJlcGVhdERlbGF5KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuIl19