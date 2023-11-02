"use strict";
cc._RF.push(module, '2707dq5zzBBO4ixkxdjzf4B', 'ExplosiveHuoJianTong');
// script/app/entities/explosive/ExplosiveHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Explosive_1 = require("./Explosive");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExplosiveHuoJianTong = /** @class */ (function (_super) {
    __extends(ExplosiveHuoJianTong, _super);
    function ExplosiveHuoJianTong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._huojiantongSke = null;
        return _this;
    }
    ExplosiveHuoJianTong.prototype.init = function (id) {
        var _this = this;
        _super.prototype.init.call(this, id);
        this.bThrought = true;
        // this.hurt = 1;
        this._huojiantongSke = this.node.getComponent(sp.Skeleton);
        this._huojiantongSke.setCompleteListener(function (trackEntry, loopCount) {
            _this.node.active = false;
            /*let name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "perfect01" || name == "perfect02" || name == "great01" || name == "great02") {
            }*/
        });
    };
    ExplosiveHuoJianTong.prototype.boom = function () {
        this._huojiantongSke.setAnimation(0, "biubiu_009b", false);
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    ExplosiveHuoJianTong.prototype.doRepeal = function (enemy, repel) {
        enemy.doRepel(enemy.node.position.sub(this.node.position).normalize(), repel);
    };
    ExplosiveHuoJianTong = __decorate([
        ccclass
    ], ExplosiveHuoJianTong);
    return ExplosiveHuoJianTong;
}(Explosive_1.default));
exports.default = ExplosiveHuoJianTong;

cc._RF.pop();