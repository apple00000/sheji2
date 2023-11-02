"use strict";
cc._RF.push(module, 'ea76fcmuIdJV6eQoHlSHVSh', 'BulletOfDiLei');
// script/app/entities/bullet/BulletOfDiLei.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var GameProxy_1 = require("../../game/GameProxy");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var World_1 = require("../../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfDiLei = /** @class */ (function (_super) {
    __extends(BulletOfDiLei, _super);
    function BulletOfDiLei() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletOfDiLei.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfDiLei.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfDiLei.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletOfDiLei.prototype.onCollisionEnter = function (other, self) {
        /** 爆炸 */
        this.node.active = false;
        this.boom();
    };
    BulletOfDiLei.prototype.boom = function () {
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = 0.5;
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    BulletOfDiLei = __decorate([
        ccclass
    ], BulletOfDiLei);
    return BulletOfDiLei;
}(Bullet_1.default));
exports.default = BulletOfDiLei;

cc._RF.pop();