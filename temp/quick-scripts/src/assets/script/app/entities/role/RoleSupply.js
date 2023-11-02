"use strict";
cc._RF.push(module, '2bd6dTM6NBDwZWsxGIeQ2I/', 'RoleSupply');
// script/app/entities/role/RoleSupply.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleSupply = /** @class */ (function (_super) {
    __extends(RoleSupply, _super);
    function RoleSupply() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        _this.roleNode = null;
        return _this;
    }
    RoleSupply.prototype.onLoad = function () {
        var _this = this;
        this.ske.setCompleteListener(function () {
            _this.node.destroy();
        });
    };
    RoleSupply.prototype.setSupply = function (id, roleNode) {
        this.roleNode = roleNode;
        this.roleNode.on(cc.Node.EventType.POSITION_CHANGED, this.onFollowRole, this);
        var skinName = "prop_" + ("0000000000" + id).substr(-3);
        this.ske.setSkin(skinName);
        this.ske.setAnimation(0, "supplyLong", false);
    };
    RoleSupply.prototype.onFollowRole = function () {
        this.node.position = this.roleNode.position;
    };
    RoleSupply.prototype.onDestroy = function () {
        if (this.roleNode) {
            this.roleNode.off(cc.Node.EventType.POSITION_CHANGED, this.onFollowRole, this);
        }
    };
    __decorate([
        property(sp.Skeleton)
    ], RoleSupply.prototype, "ske", void 0);
    RoleSupply = __decorate([
        ccclass
    ], RoleSupply);
    return RoleSupply;
}(cc.Component));
exports.default = RoleSupply;

cc._RF.pop();