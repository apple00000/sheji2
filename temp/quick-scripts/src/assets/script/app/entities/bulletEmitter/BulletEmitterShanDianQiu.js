"use strict";
cc._RF.push(module, '1d278R1B3RH6KmJMSOmnfUe', 'BulletEmitterShanDianQiu');
// script/app/entities/bulletEmitter/BulletEmitterShanDianQiu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var magnify = 1;
var BulletEmitterShanDianQiu = /** @class */ (function (_super) {
    __extends(BulletEmitterShanDianQiu, _super);
    function BulletEmitterShanDianQiu(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 1000;
        _this._interval = 0.45;
        _this._speed = 300;
        return _this;
    }
    BulletEmitterShanDianQiu.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.ShanDianQiu);
        bullet.node.active = true;
        bullet.node.position = start /*.add(dir.mul((<cc.CircleCollider>bullet.collider).radius))*/;
        bullet.node.scale = magnify * World_1.World.My.armory.magnifyMul(bullet.bulletId);
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterShanDianQiu;
}(BulletEmitter_1.default));
exports.default = BulletEmitterShanDianQiu;

cc._RF.pop();