"use strict";
cc._RF.push(module, 'd6485tJEkdMoIplWDIZNrRd', 'BulletShanDianQiu');
// script/app/entities/bullet/BulletShanDianQiu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletShanDianQiu = /** @class */ (function (_super) {
    __extends(BulletShanDianQiu, _super);
    function BulletShanDianQiu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletShanDianQiu.prototype.strike = function (other, self) {
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
    BulletShanDianQiu.prototype.fly = function (dir, distance, speed) {
        _super.prototype.fly.call(this, dir, distance, speed);
        this.node.scale = 0.3;
        this.node.runAction(cc.scaleTo(distance / speed, distance / 300));
    };
    BulletShanDianQiu = __decorate([
        ccclass
    ], BulletShanDianQiu);
    return BulletShanDianQiu;
}(Bullet_1.default));
exports.default = BulletShanDianQiu;

cc._RF.pop();