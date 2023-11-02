"use strict";
cc._RF.push(module, 'edd203mtm9Lw4Q0h6mhYNeR', 'BulletHuoYan');
// script/app/entities/bullet/BulletHuoYan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletHuoYan = /** @class */ (function (_super) {
    __extends(BulletHuoYan, _super);
    function BulletHuoYan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletHuoYan.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        _super.prototype.onCollisionEnter.call(this, other, self);
        var action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            _super.prototype.onCollisionEnter.call(_this, other, self);
        })));
        action.setTag(1388);
        other.node.stopActionByTag(1388);
        other.node.runAction(action);
    };
    BulletHuoYan.prototype.onCollisionExit = function (other, self) {
        other.node.stopActionByTag(1388);
    };
    BulletHuoYan.prototype.strike = function (other, self) {
        var gameBulletsController = window['GameBulletsController'];
        var bulletStrike = gameBulletsController.getInactiveBulletStrike(this.bulletId);
        bulletStrike.node.active = true;
        bulletStrike.node.position = cc.v2();
        bulletStrike.node.rotation = this.node.rotation;
        bulletStrike.node.setContentSize(other.node.getContentSize());
        bulletStrike.node.removeFromParent(false);
        bulletStrike.node.setParent(other.node);
        var spriteNode = bulletStrike.spriteNode;
        bulletStrike.node.rotation = Math.random() * 360;
        bulletStrike.node.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
            spriteNode.active = !spriteNode.active;
            // bulletStrike.node.rotation = Math.random()*360;
        })), 6), cc.callFunc(function () {
            bulletStrike.node.stopAllActions();
            bulletStrike.node.active = false;
            bulletStrike.node.removeFromParent(false);
            bulletStrike.node.setParent(gameBulletsController.bulletLayer);
        })));
    };
    BulletHuoYan.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        speed = 400;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        var duration = distance / speed;
        this.node.runAction(cc.sequence(cc.moveBy(duration, dir.mul(distance)).easing(cc.easeSineOut()), cc.callFunc(function () {
            _this.node.active = false;
        })));
        this.node.scale = 0.3;
        this.node.opacity = 255;
        this.node.runAction(cc.spawn(cc.scaleTo(duration, distance / 100), cc.fadeTo(duration, 50)));
    };
    BulletHuoYan = __decorate([
        ccclass
    ], BulletHuoYan);
    return BulletHuoYan;
}(Bullet_1.default));
exports.default = BulletHuoYan;

cc._RF.pop();