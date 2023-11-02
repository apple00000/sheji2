"use strict";
cc._RF.push(module, 'd6cb29kVNJHs4dOm8wuufsN', 'BulletOfFangHuDun');
// script/app/entities/bullet/BulletOfFangHuDun.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfFangHuDun = /** @class */ (function (_super) {
    __extends(BulletOfFangHuDun, _super);
    function BulletOfFangHuDun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        return _this;
    }
    BulletOfFangHuDun.prototype.strike = function (other, self) {
        this._ske.setAnimation(0, "transition", false);
    };
    BulletOfFangHuDun.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfFangHuDun.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.init(5);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            // console.log("=============>completeLis..", name);
            if (name == "start" || name == "transition") {
                _this._ske.setAnimation(0, "loops", false);
                if (!_this.node.getActionByTag(114)) {
                    var speedAction = cc.speed(cc.repeatForever(cc.rotateBy(1.25, 720)), 0);
                    speedAction.setTag(114);
                    _this.node.runAction(speedAction);
                    cc.tween(speedAction)
                        .to(1, { _speed: 1 }, { easing: 'sineIn' })
                        .start();
                }
            }
        });
        window['GameRoleController'].role.node.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.node.position = window['GameRoleController'].role.node.position;
        });
    };
    BulletOfFangHuDun.prototype.blink = function () {
        this.unblink();
        var action = cc.repeatForever(cc.sequence(cc.fadeTo(0.1, 0), cc.fadeTo(0.1, 255)));
        action.setTag(485);
        this.node.runAction(action);
    };
    BulletOfFangHuDun.prototype.unblink = function () {
        this.node.stopActionByTag(485);
        this.node.opacity = 255;
    };
    BulletOfFangHuDun.prototype.onDisable = function () {
        this.unblink();
        _super.prototype.onDisable.call(this);
        window['GameRoleController'].role.spaceCircleCollider.radius = 25;
    };
    BulletOfFangHuDun.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        window['GameRoleController'].role.spaceCircleCollider.radius = 80;
        this.node.position = window['GameRoleController'].role.node.position;
        this.node.stopAllActions();
        this._ske.setAnimation(0, "start", false);
    };
    /*update(dt:number){
        if (GameProxy.pauseGame)return;
        if (this.node.color.getR() < 255){
            this.node.color.setR(this.node.color.getR() + 1);
        }
        if (this.node.color.getG() < 255){
            this.node.color.setG(this.node.color.getG() + 1);
        }
        if (this.node.color.getB() < 255){
            this.node.color.setB(this.node.color.getB() + 1);
        }
        this._impenetrableDefenceCD -= dt;
        if (this._impenetrableDefenceCD <= 0){
            this.node.active = false;
        }
    }*/
    BulletOfFangHuDun.prototype.onCollisionStay = function (other, self) {
        this.strike(other, self);
    };
    BulletOfFangHuDun.prototype.collisionEnemy = function (other, self) {
        this.strike(other, self);
        var enemy = other.getComponent('Enemy');
        /** 僵硬 */
        if (this.stiff > 0) {
            enemy.doStiff(this.stiff);
        }
        /** 减速 */
        enemy.doSpeedcut();
        /** 击退效果 */
        this.doRepeal(enemy, this.repel);
        /** 飘血效果 */
        var damage = this.hurt;
        if (damage > 0) {
            enemy.hp -= damage;
        }
    };
    BulletOfFangHuDun.prototype.doRepeal = function (enemy, repel) {
        enemy.doRepel(enemy.node.position.sub(this.node.position).normalize(), repel);
    };
    BulletOfFangHuDun = __decorate([
        ccclass
    ], BulletOfFangHuDun);
    return BulletOfFangHuDun;
}(Bullet_1.default));
exports.default = BulletOfFangHuDun;

cc._RF.pop();