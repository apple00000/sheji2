"use strict";
cc._RF.push(module, 'aabefjCqDVKqrglQB8l3ylo', 'BulletJuJiDan');
// script/app/entities/bullet/BulletJuJiDan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletJuJiDan = /** @class */ (function (_super) {
    __extends(BulletJuJiDan, _super);
    function BulletJuJiDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletJuJiDan.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    BulletJuJiDan = __decorate([
        ccclass
    ], BulletJuJiDan);
    return BulletJuJiDan;
}(Bullet_1.default));
exports.default = BulletJuJiDan;

cc._RF.pop();