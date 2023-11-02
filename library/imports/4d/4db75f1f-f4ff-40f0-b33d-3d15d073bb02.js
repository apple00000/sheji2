"use strict";
cc._RF.push(module, '4db758f9P9A8LM9PRXQc7sC', 'BulletEmitterJiaTeLin');
// script/app/entities/bulletEmitter/BulletEmitterJiaTeLin.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJiaTeLin = /** @class */ (function (_super) {
    __extends(BulletEmitterJiaTeLin, _super);
    function BulletEmitterJiaTeLin(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this.degree = 0;
        _this.num = 0;
        _this._firingRange = 1000;
        _this._interval = 0.1;
        _this._speed = 1200;
        return _this;
    }
    BulletEmitterJiaTeLin.prototype.fire = function (start, dir) {
        this.bulletCount--;
        switch (this.num % 4) {
            case 0:
                /** 发射一颗 */
                {
                    var degree = Math.random() * 2;
                    this.degree = this.degree > 0 ? -degree : degree;
                    var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet.node.active = true;
                    bullet.node.position = start;
                    bullet.fly(dir.rotate(cc.misc.degreesToRadians(this.degree)), this._firingRange, this._speed);
                }
                break;
            case 1:
                /** 小角度同时发射两颗 */
                {
                    var degree = 3 + Math.random() * 5;
                    var bullet1 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet1.node.active = true;
                    bullet1.node.position = start.add(dir.mul(Math.random() * -10));
                    bullet1.fly(dir.rotate(cc.misc.degreesToRadians(this.degree + degree)), this._firingRange, this._speed);
                    var bullet2 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet2.node.active = true;
                    bullet2.node.position = start.add(dir.mul(Math.random() * 10));
                    bullet2.fly(dir.rotate(cc.misc.degreesToRadians(-this.degree - degree)), this._firingRange, this._speed);
                }
                break;
            case 2:
                /** 发射一颗 */
                {
                    var degree = Math.random() * 2;
                    this.degree = this.degree > 0 ? -degree : degree;
                    var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet.node.active = true;
                    bullet.node.position = start;
                    bullet.fly(dir.rotate(cc.misc.degreesToRadians(this.degree)), this._firingRange, this._speed);
                }
                break;
            case 3:
                /** 大角度同时发射两颗 */
                {
                    var degree = 10 + Math.random() * 5;
                    var bullet1 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet1.node.active = true;
                    bullet1.node.position = start.add(dir.mul(Math.random() * -15));
                    bullet1.fly(dir.rotate(cc.misc.degreesToRadians(this.degree + degree)), this._firingRange, this._speed);
                    var bullet2 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet2.node.active = true;
                    bullet2.node.position = start.add(dir.mul(Math.random() * 15));
                    bullet2.fly(dir.rotate(cc.misc.degreesToRadians(-this.degree - degree)), this._firingRange, this._speed);
                }
                break;
        }
        this.num++;
    };
    return BulletEmitterJiaTeLin;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJiaTeLin;

cc._RF.pop();