
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/role/RoleSupply.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3JvbGUvUm9sZVN1cHBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUErQkM7UUE1QkcsU0FBRyxHQUFlLElBQUksQ0FBQztRQUV2QixjQUFRLEdBQVcsSUFBSSxDQUFDOztJQTBCNUIsQ0FBQztJQXZCRywyQkFBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOEJBQVMsR0FBVCxVQUFVLEVBQVMsRUFBQyxRQUFnQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksUUFBUSxHQUFHLE9BQU8sR0FBQyxDQUFDLFlBQVksR0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDaEQsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xGO0lBQ0wsQ0FBQztJQTNCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzJDQUNDO0lBSE4sVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQStCOUI7SUFBRCxpQkFBQztDQS9CRCxBQStCQyxDQS9CdUMsRUFBRSxDQUFDLFNBQVMsR0ErQm5EO2tCQS9Cb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVTdXBwbHkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHNrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcm9sZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN1cHBseShpZDpudW1iZXIscm9sZU5vZGU6Y2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5yb2xlTm9kZSA9IHJvbGVOb2RlO1xyXG4gICAgICAgIHRoaXMucm9sZU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5vbkZvbGxvd1JvbGUsIHRoaXMpO1xyXG4gICAgICAgIGxldCBza2luTmFtZSA9IFwicHJvcF9cIisoXCIwMDAwMDAwMDAwXCIraWQpLnN1YnN0cigtMyk7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0U2tpbihza2luTmFtZSk7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0QW5pbWF0aW9uKDAsIFwic3VwcGx5TG9uZ1wiLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Gb2xsb3dSb2xlKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gdGhpcy5yb2xlTm9kZS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBpZiAodGhpcy5yb2xlTm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZU5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMub25Gb2xsb3dSb2xlLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19