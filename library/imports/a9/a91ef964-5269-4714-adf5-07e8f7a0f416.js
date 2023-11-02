"use strict";
cc._RF.push(module, 'a91eflkUmlHFK31B+j3oPQW', 'BulletStrikeScale');
// script/app/entities/bulletStrike/BulletStrikeScale.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletStrike_1 = require("./BulletStrike");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletStrikeScale = /** @class */ (function (_super) {
    __extends(BulletStrikeScale, _super);
    function BulletStrikeScale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletStrikeScale.prototype.init = function (id) {
    };
    BulletStrikeScale.prototype.strike = function () {
        var _this = this;
        this.node.rotation = Math.random() * 360;
        this.node.scale = 0;
        this.node.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.callFunc(function () {
            _this.node.stopAllActions();
            _this.node.active = false;
        })));
    };
    BulletStrikeScale = __decorate([
        ccclass
    ], BulletStrikeScale);
    return BulletStrikeScale;
}(BulletStrike_1.default));
exports.default = BulletStrikeScale;

cc._RF.pop();