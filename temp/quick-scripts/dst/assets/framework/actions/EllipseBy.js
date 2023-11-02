
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/actions/EllipseBy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e636l3EM1LZYhD7W7Tk3eC', 'EllipseBy');
// framework/actions/EllipseBy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _c = cc._decorator, ccclass = _c.ccclass, property = _c.property;
/** 椭圆运动 */
var EllipseBy = /** @class */ (function (_super) {
    __extends(EllipseBy, _super);
    function EllipseBy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center = cc.v2();
        _this._a = 0;
        _this._b = 0;
        return _this;
        /*public startWithTarget(target:cc.Node):void
        {
            console.log("====startWithTarget=====", this._a, this._c);
            cc.ActionInterval.prototype['startWithTarget'].apply(this,arguments);
        }
    
        public stop():void
        {
            console.log("====stop=====");
            cc.ActionInterval.prototype['stop'].apply(this);
        }*/
    }
    EllipseBy_1 = EllipseBy;
    /***
     * @param duration  时间
     * @param center  中间点坐标
     * @param a  长半轴
     * @param b  短半轴
     * */
    EllipseBy.create = function (duration, center, a, b) {
        var ret = new EllipseBy_1();
        ret.initWithDuration(duration, center, a, b);
        return ret;
    };
    EllipseBy.prototype.initWithDuration = function (duration, center, a, b) {
        cc.ActionInterval.prototype['initWithDuration'].apply(this, arguments);
        this._center = center;
        this._a = a;
        this._b = b;
        return true;
    };
    EllipseBy.prototype.update = function (dt) {
        var x = -this._a * Math.cos(2 * Math.PI * dt) + this._a;
        var y = this._b * Math.sin(2 * Math.PI * dt);
        this.getTarget().setPosition(this._center.add(cc.v2(x - this._a, y)));
    };
    var EllipseBy_1;
    EllipseBy = EllipseBy_1 = __decorate([
        ccclass
    ], EllipseBy);
    return EllipseBy;
}(cc.ActionInterval));
exports.default = EllipseBy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvYWN0aW9ucy9FbGxpcHNlQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBSTFDLFdBQVc7QUFFWDtJQUF1Qyw2QkFBaUI7SUFBeEQ7UUFBQSxxRUEyQ0M7UUF6Q1csYUFBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNsQixRQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsUUFBRSxHQUFHLENBQUMsQ0FBQzs7UUE0QmY7Ozs7Ozs7Ozs7V0FVRztJQUNQLENBQUM7a0JBM0NvQixTQUFTO0lBTTFCOzs7OztTQUtLO0lBQ1MsZ0JBQU0sR0FBcEIsVUFBcUIsUUFBZSxFQUFFLE1BQWMsRUFBRSxDQUFRLEVBQUUsQ0FBUTtRQUNwRSxJQUFJLEdBQUcsR0FBRyxJQUFJLFdBQVMsRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxvQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBZSxFQUFFLE1BQWMsRUFBRSxDQUFRLEVBQUUsQ0FBUTtRQUNoRSxFQUFFLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sRUFBUztRQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7SUE5QmdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0EyQzdCO0lBQUQsZ0JBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ3NDLEVBQUUsQ0FBQyxjQUFjLEdBMkN2RDtrQkEzQ29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuXHJcbi8qKiDmpK3lnIbov5DliqggKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxsaXBzZUJ5IGV4dGVuZHMgY2MuQWN0aW9uSW50ZXJ2YWwge1xyXG5cclxuICAgIHByaXZhdGUgX2NlbnRlciA9IGNjLnYyKCk7XHJcbiAgICBwcml2YXRlIF9hID0gMDtcclxuICAgIHByaXZhdGUgX2IgPSAwO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiAg5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gY2VudGVyICDkuK3pl7TngrnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBhICDplb/ljYrovbRcclxuICAgICAqIEBwYXJhbSBiICDnn63ljYrovbRcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkdXJhdGlvbjpudW1iZXIsIGNlbnRlcjpjYy5WZWMyLCBhOm51bWJlciwgYjpudW1iZXIpOkVsbGlwc2VCeXtcclxuICAgICAgICBsZXQgcmV0ID0gbmV3IEVsbGlwc2VCeSgpO1xyXG4gICAgICAgIHJldC5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBjZW50ZXIsIGEsIGIpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbjpudW1iZXIsIGNlbnRlcjpjYy5WZWMyLCBhOm51bWJlciwgYjpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlWydpbml0V2l0aER1cmF0aW9uJ10uYXBwbHkodGhpcyxhcmd1bWVudHMpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcclxuICAgICAgICB0aGlzLl9hID0gYTtcclxuICAgICAgICB0aGlzLl9iID0gYjtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgeCA9IC10aGlzLl9hICogTWF0aC5jb3MoMipNYXRoLlBJKmR0KSt0aGlzLl9hO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5fYiAqIE1hdGguc2luKDIqTWF0aC5QSSpkdCk7XHJcbiAgICAgICAgdGhpcy5nZXRUYXJnZXQoKS5zZXRQb3NpdGlvbih0aGlzLl9jZW50ZXIuYWRkKGNjLnYyKHgtdGhpcy5fYSwgeSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKnB1YmxpYyBzdGFydFdpdGhUYXJnZXQodGFyZ2V0OmNjLk5vZGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT1zdGFydFdpdGhUYXJnZXQ9PT09PVwiLCB0aGlzLl9hLCB0aGlzLl9jKTtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGVbJ3N0YXJ0V2l0aFRhcmdldCddLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIj09PT1zdG9wPT09PT1cIik7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlWydzdG9wJ10uYXBwbHkodGhpcyk7XHJcbiAgICB9Ki9cclxufVxyXG4iXX0=