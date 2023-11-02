"use strict";
cc._RF.push(module, 'c2450ByS4xJTppJiZNkPck4', 'BulletEmitterJiGuang');
// script/app/entities/bulletEmitter/BulletEmitterJiGuang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJiGuang = /** @class */ (function (_super) {
    __extends(BulletEmitterJiGuang, _super);
    function BulletEmitterJiGuang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._bulletJiGuang = null;
        _this._bulletJiGuangSke = null;
        _this._role = null;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterJiGuang.prototype.onEnter = function () {
        var _this = this;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiGuang);
        bullet.collider.enabled = false;
        var ske = bullet.getComponent(sp.Skeleton);
        ske.setStartListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name === "jiguang") {
                bullet.collider.enabled = true;
            }
        });
        ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name === "xuneng") {
                ske.setAnimation(0, "jiguang", false);
            }
            else if (name === "jiguang") {
                _this.bulletCount--;
                bullet.collider.enabled = false;
                bullet.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                    if (!bullet.collider.enabled) {
                        bullet.node.active = false;
                    }
                })));
            }
        });
        this._bulletJiGuangSke = ske;
        this._bulletJiGuang = bullet;
        this._role = window['GameRoleController'].role;
        this.changeBulletPosition();
        this._role.node.on(cc.Node.EventType.POSITION_CHANGED, this.changeBulletPosition, this);
        this._role.node.on(cc.Node.EventType.ROTATION_CHANGED, this.changeBulletPosition, this);
    };
    BulletEmitterJiGuang.prototype.onExit = function () {
        this._bulletJiGuang.node.active = false;
        this._role.node.off(cc.Node.EventType.POSITION_CHANGED, this.changeBulletPosition, this);
        this._role.node.off(cc.Node.EventType.ROTATION_CHANGED, this.changeBulletPosition, this);
    };
    BulletEmitterJiGuang.prototype.changeBulletPosition = function () {
        this._bulletJiGuang.node.rotation = this._role.node.rotation;
        this._bulletJiGuang.node.position = this._role.node.position.add(cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-this._role.node.rotation)).normalize().mul(this._role.gunTopNode.y + 20));
    };
    BulletEmitterJiGuang.prototype.fire = function (start, dir) {
        if (!this._bulletJiGuang.node.active) {
            this._bulletJiGuang.node.active = true;
            this._bulletJiGuangSke.setAnimation(0, "xuneng", false);
        }
        else if (this._bulletJiGuangSke.animation === "jiguang" && !this._bulletJiGuang.collider.enabled) {
            this._bulletJiGuangSke.setAnimation(0, "jiguang", false);
        }
    };
    return BulletEmitterJiGuang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJiGuang;

cc._RF.pop();