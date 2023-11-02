"use strict";
cc._RF.push(module, 'c0d80OY65BAjLn62n5cq+8P', 'BulletOfJianGuangSi');
// script/app/entities/bullet/BulletOfJianGuangSi.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfJianGuangSi = /** @class */ (function (_super) {
    __extends(BulletOfJianGuangSi, _super);
    function BulletOfJianGuangSi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        return _this;
    }
    BulletOfJianGuangSi.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfJianGuangSi.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            _this.node.active = false;
        });
    };
    BulletOfJianGuangSi.prototype.onCollisionEnter = function (other, self) {
    };
    BulletOfJianGuangSi.prototype.execute = function () {
        var _this = this;
        this._ske.setAnimation(0, "614", false);
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            /** 对所有敌人造成伤害 */
            // console.log("对所有敌人造成伤害");
            window['GameEnemysController'].allAliveEnemy().forEach(function (value) { return value.hp -= _this.hurt; });
        })));
    };
    BulletOfJianGuangSi = __decorate([
        ccclass
    ], BulletOfJianGuangSi);
    return BulletOfJianGuangSi;
}(Bullet_1.default));
exports.default = BulletOfJianGuangSi;

cc._RF.pop();