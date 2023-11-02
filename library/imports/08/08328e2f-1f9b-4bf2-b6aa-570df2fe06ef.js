"use strict";
cc._RF.push(module, '083284vH5tL8raqVw3y/gbv', 'BulletOfShouLei');
// script/app/entities/bullet/BulletOfShouLei.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var GameProxy_1 = require("../../game/GameProxy");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfShouLei = /** @class */ (function (_super) {
    __extends(BulletOfShouLei, _super);
    function BulletOfShouLei() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        _this._bounds = cc.rect();
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletOfShouLei.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfShouLei.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
        var bgNode = cc.find('Canvas').getChildByName('GameScene').getChildByName('shakeNode').getChildByName('bg');
        this._bounds.x = -bgNode.width / 2;
        this._bounds.y = -bgNode.height / 2;
        this._bounds.width = bgNode.width;
        this._bounds.height = bgNode.height;
    };
    BulletOfShouLei.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletOfShouLei.prototype.move = function (dir) {
        var _this = this;
        if (this.node.x <= this._bounds.xMin || this.node.x >= this._bounds.xMax || this.node.y <= this._bounds.yMin || this.node.y >= this._bounds.yMax) {
            this.node.active = false;
            return;
        }
        this._ske.setAnimation(0, "animation", true);
        /** 计算终点 */
        var destPos = dir.mul(this._bounds.height + this._bounds.width);
        var intersections = [];
        if (dir.x > 0) {
            //右边界
            if (destPos.x >= this._bounds.xMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMax, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.x < 0) {
            //左边界
            if (destPos.x <= this._bounds.xMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMin, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        if (dir.y > 0) {
            //上边界
            if (destPos.y >= this._bounds.yMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMax), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.y < 0) {
            //上边界
            if (destPos.y <= this._bounds.yMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMin), point)) {
                    intersections.push(point);
                }
            }
        }
        if (intersections.length > 0) {
            // console.log("重新计算destPos===>intersections", intersections);
            /** 重新计算destPos */
            if (intersections.length == 1) {
                destPos = intersections[0];
            }
            else {
                /** 取距离怪物最近的那个点 */
                var p = intersections[0];
                var minDistance = p.sub(this.node.position).mag();
                for (var i = 1; i < intersections.length; i++) {
                    var mag = intersections[i].sub(this.node.position).mag();
                    if (mag < minDistance) {
                        p = intersections[i];
                        minDistance = mag;
                    }
                }
                destPos = p;
            }
        }
        var distance = destPos.sub(this.node.position).mag();
        var speed = 50;
        var action = cc.sequence(cc.moveTo(distance / speed, destPos), cc.callFunc(function () {
            _this.node.active = false;
        }));
        this.node.runAction(action);
    };
    BulletOfShouLei.prototype.onCollisionEnter = function (other, self) {
        /** 爆炸 */
        this.node.active = false;
        this.boom();
    };
    BulletOfShouLei.prototype.boom = function () {
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = 0.5;
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    BulletOfShouLei = __decorate([
        ccclass
    ], BulletOfShouLei);
    return BulletOfShouLei;
}(Bullet_1.default));
exports.default = BulletOfShouLei;

cc._RF.pop();