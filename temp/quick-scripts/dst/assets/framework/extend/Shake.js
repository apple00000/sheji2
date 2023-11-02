
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/Shake.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47c33eZuWxPkonS55ujUXfr', 'Shake');
// framework/extend/Shake.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Shake = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Shake = /** @class */ (function (_super) {
    __extends(Shake, _super);
    function Shake() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._initial_x = 0;
        _this._initial_y = 0;
        _this._strength_x = 0;
        _this._strength_y = 0;
        return _this;
    }
    Shake_1 = Shake;
    /**
     *  创建抖动动画
     * @param {number} duration     动画持续时长
     * @param {number} strength_x   抖动幅度： x方向
     * @param {number} strength_y   抖动幅度： y方向
     * @returns {Shake}
     */
    Shake.create = function (duration, strength_x, strength_y) {
        var act = new Shake_1();
        act.initWithDuration(duration, strength_x, strength_y);
        return act;
    };
    Shake.prototype.initWithDuration = function (duration, strength_x, strength_y) {
        cc.ActionInterval.prototype['initWithDuration'].apply(this, arguments);
        this._strength_x = strength_x;
        this._strength_y = strength_y;
        return true;
    };
    Shake.prototype.fgRangeRand = function (min, max) {
        var rnd = Math.random();
        return rnd * (max - min) + min;
    };
    Shake.prototype.update = function (time) {
        var randx = this.fgRangeRand(-this._strength_x, this._strength_x);
        var randy = this.fgRangeRand(-this._strength_y, this._strength_y);
        this.getTarget().setPosition(randx + this._initial_x, randy + this._initial_y);
    };
    Shake.prototype.startWithTarget = function (target) {
        cc.ActionInterval.prototype['startWithTarget'].apply(this, arguments);
        this._initial_x = target.x;
        this._initial_y = target.y;
    };
    Shake.prototype.stop = function () {
        this.getTarget().setPosition(new cc.Vec2(this._initial_x, this._initial_y));
        cc.ActionInterval.prototype['stop'].apply(this);
    };
    var Shake_1;
    Shake = Shake_1 = __decorate([
        ccclass
    ], Shake);
    return Shake;
}(cc.ActionInterval));
exports.Shake = Shake;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL1NoYWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEIseUJBQWlCO0lBQTdDO1FBQUEscUVBd0RDO1FBckRXLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGlCQUFXLEdBQVUsQ0FBQyxDQUFDO1FBQ3ZCLGlCQUFXLEdBQVUsQ0FBQyxDQUFDOztJQWtEbkMsQ0FBQztjQXhEYSxLQUFLO0lBUWY7Ozs7OztPQU1HO0lBQ1csWUFBTSxHQUFwQixVQUFxQixRQUFlLEVBQUMsVUFBaUIsRUFBQyxVQUFpQjtRQUVwRSxJQUFJLEdBQUcsR0FBUyxJQUFJLE9BQUssRUFBRSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBRSxRQUFRLEVBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBRSxDQUFDO1FBQ3ZELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGdDQUFnQixHQUF2QixVQUF3QixRQUFlLEVBQUMsVUFBaUIsRUFBQyxVQUFpQjtRQUV2RSxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDJCQUFXLEdBQWxCLFVBQW1CLEdBQVUsRUFBQyxHQUFVO1FBRXBDLElBQUksR0FBRyxHQUFVLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkMsQ0FBQztJQUVNLHNCQUFNLEdBQWIsVUFBYyxJQUFXO1FBRXJCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSwrQkFBZSxHQUF0QixVQUF1QixNQUFjO1FBRWpDLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxvQkFBSSxHQUFYO1FBRUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUUzRSxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7SUF2RFMsS0FBSztRQURsQixPQUFPO09BQ00sS0FBSyxDQXdEbEI7SUFBRCxZQUFDO0NBeERELEFBd0RDLENBeEQyQixFQUFFLENBQUMsY0FBYyxHQXdENUM7QUF4RGEsc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCAgY2xhc3MgU2hha2UgZXh0ZW5kcyBjYy5BY3Rpb25JbnRlcnZhbFxyXG57XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbF94Om51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsX3k6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3N0cmVuZ3RoX3g6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3N0cmVuZ3RoX3k6bnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICDliJvlu7rmipbliqjliqjnlLtcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAgICAg5Yqo55S75oyB57ut5pe26ZW/XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZW5ndGhfeCAgIOaKluWKqOW5heW6pu+8miB45pa55ZCRXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZW5ndGhfeSAgIOaKluWKqOW5heW6pu+8miB55pa55ZCRXHJcbiAgICAgKiBAcmV0dXJucyB7U2hha2V9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGR1cmF0aW9uOm51bWJlcixzdHJlbmd0aF94Om51bWJlcixzdHJlbmd0aF95Om51bWJlcik6U2hha2VcclxuICAgIHtcclxuICAgICAgICBsZXQgYWN0OlNoYWtlID0gbmV3IFNoYWtlKCk7XHJcbiAgICAgICAgYWN0LmluaXRXaXRoRHVyYXRpb24oIGR1cmF0aW9uLHN0cmVuZ3RoX3gsc3RyZW5ndGhfeSApO1xyXG4gICAgICAgIHJldHVybiBhY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRXaXRoRHVyYXRpb24oZHVyYXRpb246bnVtYmVyLHN0cmVuZ3RoX3g6bnVtYmVyLHN0cmVuZ3RoX3k6bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlWydpbml0V2l0aER1cmF0aW9uJ10uYXBwbHkodGhpcyxhcmd1bWVudHMpO1xyXG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoX3ggPSBzdHJlbmd0aF94O1xyXG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoX3kgPSBzdHJlbmd0aF95O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmZ1JhbmdlUmFuZChtaW46bnVtYmVyLG1heDpudW1iZXIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBybmQ6bnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICByZXR1cm4gcm5kICogKG1heCAtIG1pbikgKyBtaW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSh0aW1lOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGxldCByYW5keCA9IHRoaXMuZmdSYW5nZVJhbmQoLXRoaXMuX3N0cmVuZ3RoX3gsdGhpcy5fc3RyZW5ndGhfeCk7XHJcbiAgICAgICAgbGV0IHJhbmR5ID0gdGhpcy5mZ1JhbmdlUmFuZCgtdGhpcy5fc3RyZW5ndGhfeSx0aGlzLl9zdHJlbmd0aF95KTtcclxuICAgICAgICB0aGlzLmdldFRhcmdldCgpLnNldFBvc2l0aW9uKHJhbmR4ICsgdGhpcy5faW5pdGlhbF94LHJhbmR5ICsgdGhpcy5faW5pdGlhbF95KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldDpjYy5Ob2RlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlWydzdGFydFdpdGhUYXJnZXQnXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbF94ID0gdGFyZ2V0Lng7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbF95ID0gdGFyZ2V0Lnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZXRUYXJnZXQoKS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMih0aGlzLl9pbml0aWFsX3gsdGhpcy5faW5pdGlhbF95KSk7XHJcblxyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZVsnc3RvcCddLmFwcGx5KHRoaXMpO1xyXG4gICAgfVxyXG59XHJcbiAiXX0=