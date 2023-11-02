"use strict";
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