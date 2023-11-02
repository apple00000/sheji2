"use strict";
cc._RF.push(module, 'fb678niczNL5ILsd5k556at', 'BulletEmitterSanDanQiang');
// script/app/entities/bulletEmitter/BulletEmitterSanDanQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var BulletEmitterSanDanQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterSanDanQiang, _super);
    function BulletEmitterSanDanQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 900;
        _this._interval = 0.1;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterSanDanQiang.prototype.fire = function (start, dir) {
        var _this = this;
        this.bulletCount--;
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(this._bulletEmitterID);
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        var add = config[powerLv - 1]['bullet_split'];
        var num = 3 + 2 * add;
        var angle = 10 + 5 * add;
        var degrees = [];
        var half = Math.floor(num / 2);
        for (var i = 0; i < half; i++) {
            var a = (i + 1) * angle / half;
            degrees.push(a);
            degrees.push(-a);
        }
        if (num % 2 == 1) {
            degrees.push(0);
        }
        degrees.forEach(function (value) {
            var bullet = _this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.SanDanQiang);
            bullet.node.active = true;
            bullet.node.position = start;
            bullet.fly(dir.rotate(cc.misc.degreesToRadians(value)), _this._firingRange, _this._speed);
        });
    };
    return BulletEmitterSanDanQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterSanDanQiang;

cc._RF.pop();