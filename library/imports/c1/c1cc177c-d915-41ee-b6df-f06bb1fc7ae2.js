"use strict";
cc._RF.push(module, 'c1cc1d82RVB7rbf8Gux/Hri', 'BossEnemy');
// script/app/entities/enemy/BossEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_1 = require("./Enemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossEnemy = /** @class */ (function (_super) {
    __extends(BossEnemy, _super);
    function BossEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpBar = null;
        return _this;
    }
    __decorate([
        property(cc.ProgressBar)
    ], BossEnemy.prototype, "hpBar", void 0);
    BossEnemy = __decorate([
        ccclass
    ], BossEnemy);
    return BossEnemy;
}(Enemy_1.default));
exports.default = BossEnemy;

cc._RF.pop();