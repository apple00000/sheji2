"use strict";
cc._RF.push(module, 'd49a3xULQFGQaanbQQSAKQb', 'BulletLiZiPao');
// script/app/entities/bullet/BulletLiZiPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var BulletEmitter_1 = require("../bulletEmitter/BulletEmitter");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletLiZiPao = /** @class */ (function (_super) {
    __extends(BulletLiZiPao, _super);
    function BulletLiZiPao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._distance = 0;
        _this._speed = 0;
        return _this;
    }
    BulletLiZiPao.prototype.boom = function () {
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(this.bulletId);
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        var add = config[powerLv - 1]['bullet_split'];
        var num = 4 + 2 * add;
        var _loop_1 = function (i) {
            var degree = i * 360 / num;
            var newBullet = window['GameBulletsController'].getInactiveBullet(BulletEmitter_1.default.TYPES.LiZiPao + 100);
            newBullet.node.rotation = this_1.node.rotation + degree;
            var dir = cc.v2(0, 1).normalize().rotate(cc.misc.degreesToRadians(-newBullet.node.rotation));
            newBullet.node.position = this_1.node.position.add(dir.mul(130));
            newBullet.node.active = true;
            newBullet.node.runAction(cc.sequence(cc.moveBy(this_1._distance / this_1._speed, dir.mul(this_1._distance)), cc.callFunc(function () {
                newBullet.node.active = false;
            })));
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    BulletLiZiPao.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this._distance = distance;
        this._speed = speed;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    BulletLiZiPao.prototype.collisionEnemy = function (other, self) {
        _super.prototype.collisionEnemy.call(this, other, self);
        this.boom();
    };
    BulletLiZiPao = __decorate([
        ccclass
    ], BulletLiZiPao);
    return BulletLiZiPao;
}(Bullet_1.default));
exports.default = BulletLiZiPao;

cc._RF.pop();