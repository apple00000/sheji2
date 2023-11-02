
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/UpEffectController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'de3b1rlVrNDVqI1fkc5g6jI', 'UpEffectController');
// script/app/home/UpEffectController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UpEffectController = /** @class */ (function (_super) {
    __extends(UpEffectController, _super);
    function UpEffectController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "";
        _this.ske = null;
        return _this;
    }
    UpEffectController.prototype.onShowEffect = function () {
        this.ske.node.active = true;
        this.ske.setAnimation(0, "vfxAll", false);
    };
    UpEffectController.prototype.onLoad = function () {
        var _this = this;
        if (this.eventName !== "") {
            Facade_1.default.canvasNode.on(this.eventName, this.onShowEffect, this);
        }
        this.ske.setCompleteListener(function () {
            if (cc.isValid(_this) && cc.isValid(_this.ske)) {
                _this.ske.node.active = false;
            }
        });
        this.ske.node.active = false;
    };
    UpEffectController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off(this.eventName, this.onShowEffect, this);
    };
    __decorate([
        property
    ], UpEffectController.prototype, "eventName", void 0);
    __decorate([
        property(sp.Skeleton)
    ], UpEffectController.prototype, "ske", void 0);
    UpEffectController = __decorate([
        ccclass
    ], UpEffectController);
    return UpEffectController;
}(cc.Component));
exports.default = UpEffectController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvVXBFZmZlY3RDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFFaEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUE2QkM7UUExQkcsZUFBUyxHQUFHLEVBQUUsQ0FBQztRQUdmLFNBQUcsR0FBZSxJQUFJLENBQUM7O0lBdUIzQixDQUFDO0lBcEJHLHlDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFBQSxpQkFVQztRQVRHLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUM7WUFDdEIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7WUFDekIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUN6QyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0ksZ0JBQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBekJEO1FBREMsUUFBUTt5REFDTTtJQUdmO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7bURBQ0M7SUFOTixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQTZCdEM7SUFBRCx5QkFBQztDQTdCRCxBQTZCQyxDQTdCK0MsRUFBRSxDQUFDLFNBQVMsR0E2QjNEO2tCQTdCb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwRWZmZWN0Q29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBldmVudE5hbWUgPSBcIlwiO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHNrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIG9uU2hvd0VmZmVjdCgpe1xyXG4gICAgICAgIHRoaXMuc2tlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24oMCwgXCJ2ZnhBbGxcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnROYW1lICE9PSBcIlwiKXtcclxuICAgICAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUub24odGhpcy5ldmVudE5hbWUsIHRoaXMub25TaG93RWZmZWN0LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzKSAmJiBjYy5pc1ZhbGlkKHRoaXMuc2tlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNrZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5za2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5vZmYodGhpcy5ldmVudE5hbWUsIHRoaXMub25TaG93RWZmZWN0LCB0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXX0=