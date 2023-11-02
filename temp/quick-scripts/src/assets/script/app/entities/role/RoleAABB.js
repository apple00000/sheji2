"use strict";
cc._RF.push(module, '77d4amxHlhAAaN1LjD+GliJ', 'RoleAABB');
// script/app/entities/role/RoleAABB.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AABBRegion_1 = require("../../../quad-tree/AABBRegion");
var _a = cc._decorator, ccclass = _a.ccclass, disallowMultiple = _a.disallowMultiple;
var RoleAABB = /** @class */ (function (_super) {
    __extends(RoleAABB, _super);
    function RoleAABB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._radius = 0;
        return _this;
    }
    RoleAABB.prototype.onLoad = function () {
        this._radius = this.getComponent(cc.CircleCollider).radius;
    };
    RoleAABB.prototype.aabb = function () {
        var doubleRadius = this._radius * 2;
        return cc.rect(this.node.x - this._radius, this.node.y - this._radius, doubleRadius, doubleRadius);
    };
    RoleAABB = __decorate([
        ccclass,
        disallowMultiple
    ], RoleAABB);
    return RoleAABB;
}(AABBRegion_1.default));
exports.default = RoleAABB;

cc._RF.pop();