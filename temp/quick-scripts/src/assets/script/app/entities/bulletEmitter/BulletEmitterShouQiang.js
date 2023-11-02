"use strict";
cc._RF.push(module, 'f0d58H7ssBLXIO9MZmgW0N8', 'BulletEmitterShouQiang');
// script/app/entities/bulletEmitter/BulletEmitterShouQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterShouQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterShouQiang, _super);
    function BulletEmitterShouQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterShouQiang.prototype.fire = function (start, dir) {
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.ShouQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterShouQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterShouQiang;

cc._RF.pop();