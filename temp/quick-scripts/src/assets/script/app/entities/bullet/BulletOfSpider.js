"use strict";
cc._RF.push(module, '3c259gWcuxDorUu2dpLcxFV', 'BulletOfSpider');
// script/app/entities/bullet/BulletOfSpider.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletOfEnemy_1 = require("./BulletOfEnemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfSpider = /** @class */ (function (_super) {
    __extends(BulletOfSpider, _super);
    function BulletOfSpider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        return _this;
    }
    BulletOfSpider.prototype.init = function (id) {
        var _this = this;
        _super.prototype.init.call(this, id);
        this.bThrought = true;
        this.ske = this.getComponent(sp.Skeleton);
        this.ske.setCompleteListener(function () {
            _this.node.active = false;
        });
    };
    BulletOfSpider.prototype.boom = function () {
        this.ske.setAnimation(0, "slow", false);
    };
    BulletOfSpider = __decorate([
        ccclass
    ], BulletOfSpider);
    return BulletOfSpider;
}(BulletOfEnemy_1.default));
exports.default = BulletOfSpider;

cc._RF.pop();