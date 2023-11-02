"use strict";
cc._RF.push(module, 'be01bjDEqJBnot/Ow1MalHA', 'BulletOfEnemy');
// script/app/entities/bullet/BulletOfEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfEnemy = /** @class */ (function (_super) {
    __extends(BulletOfEnemy, _super);
    function BulletOfEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletOfEnemy.prototype.init = function (id) {
        this.bulletId = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Enemy)[id % 100 - 1];
        this.bThrought = false;
        this.hurt = Math.floor(config['hurt'] * GameProxy_1.GameProxy.enemyHurtMulOf(config['id']));
        this.repel = 0;
        this.stiff = 0;
    };
    BulletOfEnemy.prototype.onEnable = function () {
        window['GameBulletsController'].enemyBullets.push(this);
    };
    BulletOfEnemy.prototype.onDisable = function () {
        this.node.stopAllActions();
        this._contacts.length = 0;
        var gameBulletsController = window['GameBulletsController'];
        gameBulletsController.enemyBullets.splice(gameBulletsController.enemyBullets.indexOf(this), 1);
    };
    BulletOfEnemy.prototype.onCollisionEnter = function (other, self) {
        console.log("角色被子弹击中");
        window['GameRoleController'].hp -= this.hurt;
        if (!this.bThrought) {
            this.node.active = false;
        }
    };
    BulletOfEnemy.prototype.onCollisionStay = function (other, self) {
        // super.onCollisionStay(other, self);
    };
    BulletOfEnemy.prototype.onCollisionExit = function (other, self) {
        // super.onCollisionExit(other, self);
    };
    BulletOfEnemy = __decorate([
        ccclass
    ], BulletOfEnemy);
    return BulletOfEnemy;
}(Bullet_1.default));
exports.default = BulletOfEnemy;

cc._RF.pop();