"use strict";
cc._RF.push(module, 'a7126UmhvpEn48Odvb547b7', 'Role');
// script/app/entities/role/Role.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedType = void 0;
var RoleAABB_1 = require("./RoleAABB");
var RoleSupply_1 = require("./RoleSupply");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpeedType;
(function (SpeedType) {
    SpeedType[SpeedType["STOP"] = 0] = "STOP";
    SpeedType[SpeedType["NORMAL"] = 1] = "NORMAL";
    SpeedType[SpeedType["FAST"] = 2] = "FAST";
})(SpeedType = exports.SpeedType || (exports.SpeedType = {}));
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireSprite = null;
        _this.gunTopNode = null;
        _this.spriteNode = null;
        _this._speedType = SpeedType.STOP;
        _this._speed = 0;
        _this._roleAABB = null;
        _this._spaceCircleCollider = null;
        _this.stopSpeed = 0;
        _this.normalSpeed = 100;
        _this.fastSpeed = 200;
        _this.accSpeed = 1;
        return _this;
    }
    Object.defineProperty(Role.prototype, "spaceCircleCollider", {
        get: function () {
            return this._spaceCircleCollider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "roleAABB", {
        get: function () {
            return this._roleAABB;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "speed", {
        get: function () {
            return this._speed * this.accSpeed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "speedType", {
        get: function () {
            return this._speedType;
        },
        set: function (value) {
            switch (value) {
                case SpeedType.STOP:
                    this._speed = this.stopSpeed;
                    break;
                case SpeedType.NORMAL:
                    this._speed = this.normalSpeed;
                    break;
                case SpeedType.FAST:
                    this._speed = this.fastSpeed;
                    break;
            }
            this._speedType = value;
        },
        enumerable: false,
        configurable: true
    });
    Role.prototype.onLoad = function () {
        this._roleAABB = this.getComponent(RoleAABB_1.default);
        this._spaceCircleCollider = this.getComponent(cc.CircleCollider);
    };
    /** 碰撞处理 */
    Role.prototype.onCollisionEnter = function (other, self) {
        /** 如果是怪物 */
        if (other.tag == 1) {
            console.log("角色被攻击了.");
        }
    };
    Role.prototype.addSupply = function (id) {
        var prefab = cc.loader.getRes('prefab/roleSupply', cc.Prefab);
        var node = cc.instantiate(prefab);
        node.getComponent(RoleSupply_1.default).setSupply(id, this.node);
        this.node.getParent().addChild(node);
    };
    __decorate([
        property(cc.Sprite)
    ], Role.prototype, "fireSprite", void 0);
    __decorate([
        property(cc.Node)
    ], Role.prototype, "gunTopNode", void 0);
    __decorate([
        property(cc.Node)
    ], Role.prototype, "spriteNode", void 0);
    __decorate([
        property({ type: cc.Enum(SpeedType), tooltip: "速度级别" })
    ], Role.prototype, "speedType", null);
    __decorate([
        property({ tooltip: "停止时速度" })
    ], Role.prototype, "stopSpeed", void 0);
    __decorate([
        property({ tooltip: "正常速度" })
    ], Role.prototype, "normalSpeed", void 0);
    __decorate([
        property({ tooltip: "最快速度" })
    ], Role.prototype, "fastSpeed", void 0);
    __decorate([
        property
    ], Role.prototype, "accSpeed", void 0);
    Role = __decorate([
        ccclass
    ], Role);
    return Role;
}(cc.Component));
exports.default = Role;

cc._RF.pop();