"use strict";
cc._RF.push(module, 'f1a9acz1GRFM6HjLvTeZdOh', 'BulletHuoJianTong');
// script/app/entities/bullet/BulletHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var World_1 = require("../../info/World");
var Music_1 = require("../../../../framework/audio/Music");
var ccclass = cc._decorator.ccclass;
var magnify = 1;
var BulletHuoJianTong = /** @class */ (function (_super) {
    __extends(BulletHuoJianTong, _super);
    function BulletHuoJianTong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletHuoJianTong.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletHuoJianTong.prototype.init = function (id) {
        this.bulletId = id;
    };
    BulletHuoJianTong.prototype.boom = function () {
        Music_1.Music.playSFX("sound/msc_g002");
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = magnify * World_1.World.My.armory.magnifyMul(explosiveHuoJianTong.bulletId);
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
    };
    BulletHuoJianTong.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)).easing(cc.easeQuadraticActionIn()), cc.callFunc(function () {
            _this.node.active = false;
            _this.boom();
        })));
    };
    BulletHuoJianTong.prototype.onCollisionEnter = function (other, self) {
        this.node.active = false;
        this.boom();
    };
    BulletHuoJianTong = __decorate([
        ccclass
    ], BulletHuoJianTong);
    return BulletHuoJianTong;
}(Bullet_1.default));
exports.default = BulletHuoJianTong;

cc._RF.pop();