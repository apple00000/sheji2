"use strict";
cc._RF.push(module, '289e79F1UZP3ZKZdsJwQRLh', 'Explosive');
// script/app/entities/explosive/Explosive.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("../bullet/Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Explosive = /** @class */ (function (_super) {
    __extends(Explosive, _super);
    function Explosive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Explosive = __decorate([
        ccclass
    ], Explosive);
    return Explosive;
}(Bullet_1.default));
exports.default = Explosive;

cc._RF.pop();