"use strict";
cc._RF.push(module, 'e66bcwOmhtNi6ipYqY6Dey8', 'BulletOfXuanFengHuoPao');
// script/app/entities/bullet/BulletOfXuanFengHuoPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var World_1 = require("../../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfXuanFengHuoPao = /** @class */ (function (_super) {
    __extends(BulletOfXuanFengHuoPao, _super);
    function BulletOfXuanFengHuoPao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletOfXuanFengHuoPao.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfXuanFengHuoPao.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfXuanFengHuoPao = __decorate([
        ccclass
    ], BulletOfXuanFengHuoPao);
    return BulletOfXuanFengHuoPao;
}(Bullet_1.default));
exports.default = BulletOfXuanFengHuoPao;

cc._RF.pop();