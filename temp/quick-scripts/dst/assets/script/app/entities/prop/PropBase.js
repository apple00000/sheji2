
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/prop/PropBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c07bd2qlBC57ZQMODENtUU', 'PropBase');
// script/app/entities/prop/PropBase.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropBase = /** @class */ (function (_super) {
    __extends(PropBase, _super);
    function PropBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        _this.cd = 12;
        _this.collider = null;
        /** 是否触发了 */
        _this._on_off = false;
        /** 是否被磁铁吸引 */
        _this._magnetic = false;
        _this.propID = -1;
        return _this;
    }
    Object.defineProperty(PropBase.prototype, "on_off", {
        get: function () {
            return this._on_off;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropBase.prototype, "magnetic", {
        get: function () {
            return this._magnetic;
        },
        set: function (value) {
            if (value != this._magnetic) {
                this._magnetic = value;
                if (this._magnetic) {
                    // console.log("磁力生效===>");
                    this.node.stopAllActions();
                    /** 撞向角色 */
                    this.moveToRole();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    PropBase.prototype.moveToRole = function () {
        var _this = this;
        var gameRoleController = window['GameRoleController'];
        var speed = 1000;
        var distance = this.node.position.sub(gameRoleController.role.node.position).mag();
        this.node.runAction(cc.sequence(cc.moveTo(distance / speed, gameRoleController.role.node.position).easing(cc.easeSineIn()), cc.callFunc(function () {
            _this.moveToRole();
        })));
    };
    PropBase.prototype.init = function (id) {
        this.propID = id;
    };
    PropBase.prototype.display = function () {
        var _this = this;
        this._on_off = false;
        this.node.active = true;
        //倒计时
        if (this.cd > 0) {
            this.node.runAction(cc.sequence(cc.delayTime(this.cd - 5), cc.blink(5, 25), cc.callFunc(function () {
                _this.node.active = false;
            })));
        }
    };
    PropBase.prototype.trigger = function () {
        this._on_off = true;
        this.node.stopAllActions();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.PropTrigger, this);
        this.node.active = false;
    };
    PropBase.prototype.onLoad = function () {
        this.collider = this.getComponent(cc.Collider);
    };
    PropBase.prototype.onEnable = function () {
        /** 检测与角色的碰撞 */
        this._on_off = false;
        this._magnetic = false;
        window['GameEnemysController'].gameProps.push(this);
    };
    PropBase.prototype.onDisable = function () {
        this.node.stopAllActions();
        var gameEnemysController = window['GameEnemysController'];
        gameEnemysController.gameProps.splice(gameEnemysController.gameProps.indexOf(this), 1);
    };
    PropBase = __decorate([
        ccclass
    ], PropBase);
    return PropBase;
}(cc.Component));
exports.default = PropBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3Byb3AvUHJvcEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGtEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW9GQztRQWxGRyxZQUFZO1FBQ1osUUFBRSxHQUFHLEVBQUUsQ0FBQztRQUVSLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFFNUIsWUFBWTtRQUNGLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFFMUIsY0FBYztRQUNOLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFnQzFCLFlBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUF5Q2hCLENBQUM7SUF2RUcsc0JBQUksNEJBQU07YUFBVjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDhCQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUVELFVBQWEsS0FBYztZQUN2QixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO2dCQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO29CQUNmLDJCQUEyQjtvQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDM0IsV0FBVztvQkFDWCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDOzs7T0FaQTtJQWNPLDZCQUFVLEdBQWxCO1FBQUEsaUJBT0M7UUFORyxJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xJLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBSUQsdUJBQUksR0FBSixVQUFLLEVBQVM7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsMEJBQU8sR0FBUDtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLEtBQUs7UUFDTCxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbEYsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNSO0lBQ0wsQ0FBQztJQUVELDBCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRCwyQkFBUSxHQUFSO1FBQ0ksZUFBZTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksb0JBQW9CLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUQsb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFuRmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FvRjVCO0lBQUQsZUFBQztDQXBGRCxBQW9GQyxDQXBGcUMsRUFBRSxDQUFDLFNBQVMsR0FvRmpEO2tCQXBGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wQmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICBjZCA9IDEyO1xyXG5cclxuICAgIGNvbGxpZGVyOmNjLkNvbGxpZGVyID0gbnVsbDtcclxuXHJcbiAgICAvKiog5piv5ZCm6Kem5Y+R5LqGICovXHJcbiAgICBwcm90ZWN0ZWQgX29uX29mZiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiDmmK/lkKbooqvno4Hpk4HlkLjlvJUgKi9cclxuICAgIHByaXZhdGUgX21hZ25ldGljID0gZmFsc2U7XHJcblxyXG4gICAgZ2V0IG9uX29mZigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb25fb2ZmO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgbWFnbmV0aWMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hZ25ldGljO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYWduZXRpYyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSB0aGlzLl9tYWduZXRpYyl7XHJcbiAgICAgICAgICAgIHRoaXMuX21hZ25ldGljID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYWduZXRpYyl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuejgeWKm+eUn+aViD09PT5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIC8qKiDmkp7lkJHop5LoibIgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvUm9sZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW92ZVRvUm9sZSgpe1xyXG4gICAgICAgIGxldCBnYW1lUm9sZUNvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IDEwMDA7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyhkaXN0YW5jZS9zcGVlZCwgZ2FtZVJvbGVDb250cm9sbGVyLnJvbGUubm9kZS5wb3NpdGlvbikuZWFzaW5nKGNjLmVhc2VTaW5lSW4oKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUm9sZSgpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcElEID0gLTE7XHJcblxyXG4gICAgaW5pdChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucHJvcElEID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgpe1xyXG4gICAgICAgIHRoaXMuX29uX29mZiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8v5YCS6K6h5pe2XHJcbiAgICAgICAgaWYgKHRoaXMuY2QgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUodGhpcy5jZC01KSwgY2MuYmxpbmsoNSwgMjUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmlnZ2VyKCl7XHJcbiAgICAgICAgdGhpcy5fb25fb2ZmID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuUHJvcFRyaWdnZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8qKiDmo4DmtYvkuI7op5LoibLnmoTnorDmkp4gKi9cclxuICAgICAgICB0aGlzLl9vbl9vZmYgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYWduZXRpYyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXS5nYW1lUHJvcHMucHVzaCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBsZXQgZ2FtZUVuZW15c0NvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVFbmVteXNDb250cm9sbGVyJ107XHJcbiAgICAgICAgZ2FtZUVuZW15c0NvbnRyb2xsZXIuZ2FtZVByb3BzLnNwbGljZShnYW1lRW5lbXlzQ29udHJvbGxlci5nYW1lUHJvcHMuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICB9XHJcbn1cclxuIl19