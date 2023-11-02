"use strict";
cc._RF.push(module, 'b0708OLqc1I7JmsZsEiOmlz', 'BulletEmitterHuoYan');
// script/app/entities/bulletEmitter/BulletEmitterHuoYan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterHuoYan = /** @class */ (function (_super) {
    __extends(BulletEmitterHuoYan, _super);
    function BulletEmitterHuoYan(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._list = [];
        _this._firingRange = 600;
        _this._interval = 0.15;
        _this._speed = 300;
        return _this;
    }
    BulletEmitterHuoYan.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.HuoYan);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
        this._list.unshift(bullet);
        this._list = this._list.filter(function (value) { return value.node.active == true; });
        // let p = start;
        // for (let i=0; i<3; i++){
        //     let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.HuoYan);
        //     bullet.node.active = true;
        //     bullet.node.position = p.add(dir.mul((3-i)*30));
        //     bullet.fly(dir, this._firingRange, this._speed);
        //     this._list.unshift(bullet);
        // }
        this._list.forEach(function (value, index) { return value.node.zIndex = index; });
    };
    return BulletEmitterHuoYan;
}(BulletEmitter_1.default));
exports.default = BulletEmitterHuoYan;

cc._RF.pop();