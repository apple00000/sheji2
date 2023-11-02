"use strict";
cc._RF.push(module, 'ff0edq6VF9JqK8aSEOQPcB3', 'BulletEmitterPenZi');
// script/app/entities/bulletEmitter/BulletEmitterPenZi.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var magnify = 1;
var BulletEmitterPenZi = /** @class */ (function (_super) {
    __extends(BulletEmitterPenZi, _super);
    function BulletEmitterPenZi(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterPenZi.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.PenZi);
        var ske = bullet.getComponent(sp.Skeleton);
        ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            bullet.node.active = false;
        });
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.node.scale = magnify * World_1.World.My.armory.magnifyMul(bullet.bulletId);
        bullet.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        ske.setAnimation(0, "animation", false);
    };
    return BulletEmitterPenZi;
}(BulletEmitter_1.default));
exports.default = BulletEmitterPenZi;

cc._RF.pop();