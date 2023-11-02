"use strict";
cc._RF.push(module, '5d8e2MjyvlLOoCyuh6N0alo', 'EmitBulletEnemy');
// script/app/entities/enemy/EmitBulletEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Music_1 = require("../../../../framework/audio/Music");
var Enemy_1 = require("./Enemy");
var ccclass = cc._decorator.ccclass;
var EmitBulletEnemy = /** @class */ (function (_super) {
    __extends(EmitBulletEnemy, _super);
    function EmitBulletEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmitBulletEnemy.prototype.doAttack = function () {
        Music_1.Music.playSFX("sound/msc_en001");
        var bullet = window['GameBulletsController'].getInactiveEnemyBullet(this._enemyID);
        bullet.node.active = true;
        bullet.node.position = this.node.position;
        bullet.node.rotation = this.node.rotation;
        var dir = cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-bullet.node.rotation)).normalizeSelf();
        bullet.node.runAction(cc.sequence(cc.moveBy(this.attackDistance / this.bulletSpeed, dir.mul(this.attackDistance)), cc.callFunc(function () {
            bullet.node.active = false;
        })));
    };
    EmitBulletEnemy = __decorate([
        ccclass
    ], EmitBulletEnemy);
    return EmitBulletEnemy;
}(Enemy_1.default));
exports.default = EmitBulletEnemy;

cc._RF.pop();