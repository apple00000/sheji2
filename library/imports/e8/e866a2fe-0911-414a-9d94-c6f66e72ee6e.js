"use strict";
cc._RF.push(module, 'e866aL+CRFBSp2UxvZucu5u', 'BulletEmitterHuoJianTong');
// script/app/entities/bulletEmitter/BulletEmitterHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterHuoJianTong = /** @class */ (function (_super) {
    __extends(BulletEmitterHuoJianTong, _super);
    function BulletEmitterHuoJianTong(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 1000;
        _this._interval = 0.5;
        _this._speed = 600;
        return _this;
    }
    BulletEmitterHuoJianTong.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.HuoJianTong);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterHuoJianTong;
}(BulletEmitter_1.default));
exports.default = BulletEmitterHuoJianTong;

cc._RF.pop();