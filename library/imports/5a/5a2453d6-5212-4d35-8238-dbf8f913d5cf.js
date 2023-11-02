"use strict";
cc._RF.push(module, '5a245PWUhJNNYI42/j5E9XP', 'BulletOfLighting');
// script/app/entities/bullet/BulletOfLighting.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Enemy_1 = require("../enemy/Enemy");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfLighting = /** @class */ (function (_super) {
    __extends(BulletOfLighting, _super);
    function BulletOfLighting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        _this._lightEnemys = [];
        return _this;
    }
    BulletOfLighting.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this._lightEnemys.length = 0;
    };
    BulletOfLighting.prototype.strike = function (other, self) {
        var gameBulletsController = window['GameBulletsController'];
        this._lightEnemys.push(other.getComponent(Enemy_1.default));
        var bulletStrike = gameBulletsController.getInactiveBulletStrike(10);
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
    BulletOfLighting.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfLighting.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var _a;
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            /** 寻找新的怪物攻击 */
            /** 找最近的怪生成闪电 */
            if (_this._lightEnemys.length > 0 && _this._lightEnemys.length < 6) {
                var list = window['GameEnemysController'].allAliveAndInScreenEnemy().filter(function (value) { return !_this._lightEnemys.includes(value); });
                if (list.length > 0) {
                    var minDistance_1 = -1;
                    var enemy_1 = null;
                    list.forEach(function (value) {
                        var distance = _this.node.position.sub(value.node.position).mag();
                        if (minDistance_1 < 0 || distance < minDistance_1) {
                            minDistance_1 = distance;
                            enemy_1 = value;
                        }
                    });
                    /** 生成闪电 */
                    var bullet = window['GameBulletsController'].getInactivePropBullet(6);
                    bullet.node.position = _this._lightEnemys[_this._lightEnemys.length - 1].node.position;
                    (_a = bullet._lightEnemys).push.apply(_a, _this._lightEnemys);
                    bullet.joint(enemy_1.node.position);
                }
            }
            _this.node.active = false;
        });
    };
    BulletOfLighting.prototype.joint = function (pos) {
        var sub = pos.sub(this.node.position);
        var distance = sub.mag();
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(sub.y, sub.x));
        this.node.scaleY = distance / 380;
        this.node.active = true;
        this._ske.setAnimation(0, "animation", false);
    };
    BulletOfLighting = __decorate([
        ccclass
    ], BulletOfLighting);
    return BulletOfLighting;
}(Bullet_1.default));
exports.default = BulletOfLighting;

cc._RF.pop();