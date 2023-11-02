
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJiGuang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c2450ByS4xJTppJiZNkPck4', 'BulletEmitterJiGuang');
// script/app/entities/bulletEmitter/BulletEmitterJiGuang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJiGuang = /** @class */ (function (_super) {
    __extends(BulletEmitterJiGuang, _super);
    function BulletEmitterJiGuang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._bulletJiGuang = null;
        _this._bulletJiGuangSke = null;
        _this._role = null;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterJiGuang.prototype.onEnter = function () {
        var _this = this;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiGuang);
        bullet.collider.enabled = false;
        var ske = bullet.getComponent(sp.Skeleton);
        ske.setStartListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name === "jiguang") {
                bullet.collider.enabled = true;
            }
        });
        ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name === "xuneng") {
                ske.setAnimation(0, "jiguang", false);
            }
            else if (name === "jiguang") {
                _this.bulletCount--;
                bullet.collider.enabled = false;
                bullet.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                    if (!bullet.collider.enabled) {
                        bullet.node.active = false;
                    }
                })));
            }
        });
        this._bulletJiGuangSke = ske;
        this._bulletJiGuang = bullet;
        this._role = window['GameRoleController'].role;
        this.changeBulletPosition();
        this._role.node.on(cc.Node.EventType.POSITION_CHANGED, this.changeBulletPosition, this);
        this._role.node.on(cc.Node.EventType.ROTATION_CHANGED, this.changeBulletPosition, this);
    };
    BulletEmitterJiGuang.prototype.onExit = function () {
        this._bulletJiGuang.node.active = false;
        this._role.node.off(cc.Node.EventType.POSITION_CHANGED, this.changeBulletPosition, this);
        this._role.node.off(cc.Node.EventType.ROTATION_CHANGED, this.changeBulletPosition, this);
    };
    BulletEmitterJiGuang.prototype.changeBulletPosition = function () {
        this._bulletJiGuang.node.rotation = this._role.node.rotation;
        this._bulletJiGuang.node.position = this._role.node.position.add(cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-this._role.node.rotation)).normalize().mul(this._role.gunTopNode.y + 20));
    };
    BulletEmitterJiGuang.prototype.fire = function (start, dir) {
        if (!this._bulletJiGuang.node.active) {
            this._bulletJiGuang.node.active = true;
            this._bulletJiGuangSke.setAnimation(0, "xuneng", false);
        }
        else if (this._bulletJiGuangSke.animation === "jiguang" && !this._bulletJiGuang.collider.enabled) {
            this._bulletJiGuangSke.setAnimation(0, "jiguang", false);
        }
    };
    return BulletEmitterJiGuang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJiGuang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckppR3VhbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlEQUE0QztBQUs1QztJQUFrRCx3Q0FBYTtJQUUzRCw4QkFBWSxxQkFBMkM7UUFBdkQsWUFDSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUkvQjtRQUVPLG9CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLHVCQUFpQixHQUFlLElBQUksQ0FBQztRQUVyQyxXQUFLLEdBQVEsSUFBSSxDQUFDO1FBUnRCLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztJQUN2QixDQUFDO0lBT0Qsc0NBQU8sR0FBUDtRQUFBLGlCQStCQztRQTlCRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLFVBQVUsRUFBRSxTQUFTO1lBQ3ZDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakUsSUFBRyxJQUFJLEtBQUssU0FBUyxFQUFDO2dCQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQztR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QUMsQ0FBQyxDQUFDO0lBQzVMLENBQUM7SUFFRCxtQ0FBSSxHQUFKLFVBQUssS0FBYyxFQUFFLEdBQVk7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzRDthQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUM7WUFDOUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FqRUEsQUFpRUMsQ0FqRWlELHVCQUFhLEdBaUU5RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgR2FtZUJ1bGxldHNDb250cm9sbGVyIGZyb20gXCIuLi8uLi9nYW1lL0dhbWVCdWxsZXRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlciBmcm9tIFwiLi9CdWxsZXRFbWl0dGVyXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4uL2J1bGxldC9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGUgZnJvbSBcIi4uL3JvbGUvUm9sZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldEVtaXR0ZXJKaUd1YW5nIGV4dGVuZHMgQnVsbGV0RW1pdHRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZUJ1bGxldHNDb250cm9sbGVyOkdhbWVCdWxsZXRzQ29udHJvbGxlcil7XHJcbiAgICAgICAgc3VwZXIoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICB0aGlzLl9maXJpbmdSYW5nZSA9IDgwMDtcclxuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDAuMDU7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSAxNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2J1bGxldEppR3Vhbmc6QnVsbGV0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2J1bGxldEppR3VhbmdTa2U6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3JvbGU6Um9sZSA9IG51bGw7XHJcblxyXG4gICAgb25FbnRlcigpe1xyXG4gICAgICAgIGxldCBidWxsZXQgPSB0aGlzLmdhbWVCdWxsZXRzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUJ1bGxldChCdWxsZXRFbWl0dGVyLlRZUEVTLkppR3VhbmcpO1xyXG4gICAgICAgIGJ1bGxldC5jb2xsaWRlci5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNrZSA9IGJ1bGxldC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHNrZS5zZXRTdGFydExpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpPT57XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiamlndWFuZ1wiKXtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5jb2xsaWRlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwieHVuZW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHNrZS5zZXRBbmltYXRpb24oMCwgXCJqaWd1YW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYobmFtZSA9PT0gXCJqaWd1YW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMCksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWxsZXQuY29sbGlkZXIuZW5hYmxlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9idWxsZXRKaUd1YW5nU2tlID0gc2tlO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldEppR3VhbmcgPSBidWxsZXQ7XHJcblxyXG4gICAgICAgIHRoaXMuX3JvbGUgPSB3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddLnJvbGU7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VCdWxsZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3JvbGUubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLmNoYW5nZUJ1bGxldFBvc2l0aW9uLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9yb2xlLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcy5jaGFuZ2VCdWxsZXRQb3NpdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbkV4aXQoKXtcclxuICAgICAgICB0aGlzLl9idWxsZXRKaUd1YW5nLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcm9sZS5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLmNoYW5nZUJ1bGxldFBvc2l0aW9uLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9yb2xlLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMuY2hhbmdlQnVsbGV0UG9zaXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUJ1bGxldFBvc2l0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fYnVsbGV0SmlHdWFuZy5ub2RlLnJvdGF0aW9uID0gdGhpcy5fcm9sZS5ub2RlLnJvdGF0aW9uO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldEppR3Vhbmcubm9kZS5wb3NpdGlvbiA9IHRoaXMuX3JvbGUubm9kZS5wb3NpdGlvbi5hZGQoY2MudjIoMCwgMSkucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtdGhpcy5fcm9sZS5ub2RlLnJvdGF0aW9uKSkubm9ybWFsaXplKCkubXVsKHRoaXMuX3JvbGUuZ3VuVG9wTm9kZS55ICsgMjApKTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1bGxldEppR3Vhbmcubm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRKaUd1YW5nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0SmlHdWFuZ1NrZS5zZXRBbmltYXRpb24oMCwgXCJ4dW5lbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLl9idWxsZXRKaUd1YW5nU2tlLmFuaW1hdGlvbiA9PT0gXCJqaWd1YW5nXCIgJiYgIXRoaXMuX2J1bGxldEppR3VhbmcuY29sbGlkZXIuZW5hYmxlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldEppR3VhbmdTa2Uuc2V0QW5pbWF0aW9uKDAsIFwiamlndWFuZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==