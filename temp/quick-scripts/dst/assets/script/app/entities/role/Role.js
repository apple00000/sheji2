
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/role/Role.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3JvbGUvUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHVDQUFrQztBQUVsQywyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLHlDQUFJLENBQUE7SUFDSiw2Q0FBTSxDQUFBO0lBQ04seUNBQUksQ0FBQTtBQUNSLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUlEO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBb0ZDO1FBakZHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRWxCLGdCQUFVLEdBQWEsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN0QyxZQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQiwwQkFBb0IsR0FBcUIsSUFBSSxDQUFDO1FBb0N0RCxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsaUJBQVcsR0FBRyxHQUFHLENBQUM7UUFHbEIsZUFBUyxHQUFHLEdBQUcsQ0FBQztRQUdoQixjQUFRLEdBQUcsQ0FBQyxDQUFDOztJQXVCakIsQ0FBQztJQWpFRyxzQkFBSSxxQ0FBbUI7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBCQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1QkFBSzthQUFUO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwyQkFBUzthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFjLEtBQWU7WUFDekIsUUFBUSxLQUFLLEVBQUM7Z0JBQ1YsS0FBSyxTQUFTLENBQUMsSUFBSTtvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUMsTUFBTTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUMvQixNQUFNO2dCQUNWLEtBQUssU0FBUyxDQUFDLElBQUk7b0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUM3QixNQUFNO2FBQ2I7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FmQTtJQTZCRCxxQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUdELFdBQVc7SUFDWCwrQkFBZ0IsR0FBaEIsVUFBa0IsS0FBSyxFQUFFLElBQUk7UUFDekIsWUFBWTtRQUNaLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELHdCQUFTLEdBQVQsVUFBVSxFQUFTO1FBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQS9FRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDUTtJQXVCMUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUMsTUFBTSxFQUFDLENBQUM7eUNBR25EO0lBa0JEO1FBREMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDOzJDQUNkO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLENBQUM7NkNBQ1Q7SUFHbEI7UUFEQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLENBQUM7MkNBQ1g7SUFHaEI7UUFEQyxRQUFROzBDQUNJO0lBN0RJLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FvRnhCO0lBQUQsV0FBQztDQXBGRCxBQW9GQyxDQXBGaUMsRUFBRSxDQUFDLFNBQVMsR0FvRjdDO2tCQXBGb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IFJvbGVBQUJCIGZyb20gXCIuL1JvbGVBQUJCXCI7XHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lUHJveHlcIjtcclxuaW1wb3J0IFJvbGVTdXBwbHkgZnJvbSBcIi4vUm9sZVN1cHBseVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBTcGVlZFR5cGUge1xyXG4gICAgU1RPUCxcclxuICAgIE5PUk1BTCxcclxuICAgIEZBU1QsXHJcbn1cclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgZmlyZVNwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ3VuVG9wTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNwcml0ZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3BlZWRUeXBlOlNwZWVkVHlwZSA9IFNwZWVkVHlwZS5TVE9QO1xyXG4gICAgcHJpdmF0ZSBfc3BlZWQgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX3JvbGVBQUJCOlJvbGVBQUJCID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9zcGFjZUNpcmNsZUNvbGxpZGVyOmNjLkNpcmNsZUNvbGxpZGVyID0gbnVsbDtcclxuXHJcblxyXG4gICAgZ2V0IHNwYWNlQ2lyY2xlQ29sbGlkZXIoKTogY2MuQ2lyY2xlQ29sbGlkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGFjZUNpcmNsZUNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByb2xlQUFCQigpOiBSb2xlQUFCQiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvbGVBQUJCO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZCp0aGlzLmFjY1NwZWVkO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKFNwZWVkVHlwZSksIHRvb2x0aXA6XCLpgJ/luqbnuqfliKtcIn0pXHJcbiAgICBnZXQgc3BlZWRUeXBlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc3BlZWRUeXBlKHZhbHVlOlNwZWVkVHlwZSl7XHJcbiAgICAgICAgc3dpdGNoICh2YWx1ZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLlNUT1A6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZCA9IHRoaXMuc3RvcFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwZWVkID0gdGhpcy5ub3JtYWxTcGVlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNwZWVkVHlwZS5GQVNUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSB0aGlzLmZhc3RTcGVlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zcGVlZFR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoe3Rvb2x0aXA6XCLlgZzmraLml7bpgJ/luqZcIn0pXHJcbiAgICBzdG9wU3BlZWQgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDpcIuato+W4uOmAn+W6plwifSlcclxuICAgIG5vcm1hbFNwZWVkID0gMTAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDpcIuacgOW/q+mAn+W6plwifSlcclxuICAgIGZhc3RTcGVlZCA9IDIwMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFjY1NwZWVkID0gMTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLl9yb2xlQUFCQiA9IHRoaXMuZ2V0Q29tcG9uZW50KFJvbGVBQUJCKTtcclxuICAgICAgICB0aGlzLl9zcGFjZUNpcmNsZUNvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQ2lyY2xlQ29sbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuc1xyXG4gICAgLyoqIOeisOaSnuWkhOeQhiAqL1xyXG4gICAgb25Db2xsaXNpb25FbnRlciAob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICAvKiog5aaC5p6c5piv5oCq54mpICovXHJcbiAgICAgICAgaWYgKG90aGVyLnRhZyA9PSAxKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLop5LoibLooqvmlLvlh7vkuoYuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRTdXBwbHkoaWQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgcHJlZmFiID0gY2MubG9hZGVyLmdldFJlcygncHJlZmFiL3JvbGVTdXBwbHknLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChSb2xlU3VwcGx5KS5zZXRTdXBwbHkoaWQsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldFBhcmVudCgpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=