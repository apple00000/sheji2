"use strict";
cc._RF.push(module, '7e91aqtLv1DgokxbtjCsUYR', 'BulletEmitterJuJiQiang');
// script/app/entities/bulletEmitter/BulletEmitterJuJiQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJuJiQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterJuJiQiang, _super);
    function BulletEmitterJuJiQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 2000;
        _this._interval = 0.5;
        _this._speed = 2000;
        return _this;
    }
    BulletEmitterJuJiQiang.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JuJiQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterJuJiQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJuJiQiang;

cc._RF.pop();