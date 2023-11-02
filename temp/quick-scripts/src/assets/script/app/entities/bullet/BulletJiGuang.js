"use strict";
cc._RF.push(module, '5191cP2MvJAj5S4Mn/Tj0r2', 'BulletJiGuang');
// script/app/entities/bullet/BulletJiGuang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletJiGuang = /** @class */ (function (_super) {
    __extends(BulletJiGuang, _super);
    function BulletJiGuang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletJiGuang.prototype.fly = function (dir, distance, speed) {
    };
    BulletJiGuang.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        _super.prototype.onCollisionEnter.call(this, other, self);
        var action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            _super.prototype.onCollisionEnter.call(_this, other, self);
        })));
        action.setTag(1333);
        other.node.stopActionByTag(1333);
        other.node.runAction(action);
    };
    BulletJiGuang.prototype.onCollisionExit = function (other, self) {
        other.node.stopActionByTag(1333);
    };
    BulletJiGuang = __decorate([
        ccclass
    ], BulletJiGuang);
    return BulletJiGuang;
}(Bullet_1.default));
exports.default = BulletJiGuang;

cc._RF.pop();