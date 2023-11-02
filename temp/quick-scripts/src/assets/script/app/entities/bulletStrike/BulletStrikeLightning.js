"use strict";
cc._RF.push(module, 'ab684CB0vVLEKw8NZ+RRLXB', 'BulletStrikeLightning');
// script/app/entities/bulletStrike/BulletStrikeLightning.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletStrike_1 = require("./BulletStrike");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletStrikeLightning = /** @class */ (function (_super) {
    __extends(BulletStrikeLightning, _super);
    function BulletStrikeLightning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteNode = null;
        return _this;
    }
    BulletStrikeLightning.prototype.init = function (id) {
    };
    BulletStrikeLightning.prototype.strike = function () {
    };
    __decorate([
        property(cc.Node)
    ], BulletStrikeLightning.prototype, "spriteNode", void 0);
    BulletStrikeLightning = __decorate([
        ccclass
    ], BulletStrikeLightning);
    return BulletStrikeLightning;
}(BulletStrike_1.default));
exports.default = BulletStrikeLightning;

cc._RF.pop();