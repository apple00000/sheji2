"use strict";
cc._RF.push(module, 'c5068lByUNDfZVSWj7ABV1y', 'BulletEmitterLiZiPao');
// script/app/entities/bulletEmitter/BulletEmitterLiZiPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterLiZiPao = /** @class */ (function (_super) {
    __extends(BulletEmitterLiZiPao, _super);
    function BulletEmitterLiZiPao(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 500;
        _this._interval = 0.5;
        _this._speed = 800;
        return _this;
    }
    BulletEmitterLiZiPao.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.LiZiPao);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterLiZiPao;
}(BulletEmitter_1.default));
exports.default = BulletEmitterLiZiPao;

cc._RF.pop();