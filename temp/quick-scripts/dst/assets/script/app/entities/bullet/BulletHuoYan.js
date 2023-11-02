
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletHuoYan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'edd203mtm9Lw4Q0h6mhYNeR', 'BulletHuoYan');
// script/app/entities/bullet/BulletHuoYan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletHuoYan = /** @class */ (function (_super) {
    __extends(BulletHuoYan, _super);
    function BulletHuoYan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletHuoYan.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        _super.prototype.onCollisionEnter.call(this, other, self);
        var action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            _super.prototype.onCollisionEnter.call(_this, other, self);
        })));
        action.setTag(1388);
        other.node.stopActionByTag(1388);
        other.node.runAction(action);
    };
    BulletHuoYan.prototype.onCollisionExit = function (other, self) {
        other.node.stopActionByTag(1388);
    };
    BulletHuoYan.prototype.strike = function (other, self) {
        var gameBulletsController = window['GameBulletsController'];
        var bulletStrike = gameBulletsController.getInactiveBulletStrike(this.bulletId);
        bulletStrike.node.active = true;
        bulletStrike.node.position = cc.v2();
        bulletStrike.node.rotation = this.node.rotation;
        bulletStrike.node.setContentSize(other.node.getContentSize());
        bulletStrike.node.removeFromParent(false);
        bulletStrike.node.setParent(other.node);
        var spriteNode = bulletStrike.spriteNode;
        bulletStrike.node.rotation = Math.random() * 360;
        bulletStrike.node.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
            spriteNode.active = !spriteNode.active;
            // bulletStrike.node.rotation = Math.random()*360;
        })), 6), cc.callFunc(function () {
            bulletStrike.node.stopAllActions();
            bulletStrike.node.active = false;
            bulletStrike.node.removeFromParent(false);
            bulletStrike.node.setParent(gameBulletsController.bulletLayer);
        })));
    };
    BulletHuoYan.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        speed = 400;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        var duration = distance / speed;
        this.node.runAction(cc.sequence(cc.moveBy(duration, dir.mul(distance)).easing(cc.easeSineOut()), cc.callFunc(function () {
            _this.node.active = false;
        })));
        this.node.scale = 0.3;
        this.node.opacity = 255;
        this.node.runAction(cc.spawn(cc.scaleTo(duration, distance / 100), cc.fadeTo(duration, 50)));
    };
    BulletHuoYan = __decorate([
        ccclass
    ], BulletHuoYan);
    return BulletHuoYan;
}(Bullet_1.default));
exports.default = BulletHuoYan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRIdW9ZYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUE4QjtBQUd4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBTTtJQUFoRDs7SUEwREEsQ0FBQztJQXhERyx1Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBSyxFQUFFLElBQUk7UUFBNUIsaUJBUUM7UUFQRyxpQkFBTSxnQkFBZ0IsWUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNyRSxpQkFBTSxnQkFBZ0IsYUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0NBQWUsR0FBZixVQUFnQixLQUFLLEVBQUUsSUFBSTtRQUN2QixLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBR0QsNkJBQU0sR0FBTixVQUFPLEtBQUssRUFBRSxJQUFJO1FBQ2QsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxJQUFJLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyx1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QUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQXpEZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQTBEaEM7SUFBRCxtQkFBQztDQTFERCxBQTBEQyxDQTFEeUMsZ0JBQU0sR0EwRC9DO2tCQTFEb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgQnVsbGV0U3RyaWtlTGlnaHRuaW5nIGZyb20gXCIuLi9idWxsZXRTdHJpa2UvQnVsbGV0U3RyaWtlTGlnaHRuaW5nXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldEh1b1lhbiBleHRlbmRzIEJ1bGxldCB7XHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xyXG4gICAgICAgIHN1cGVyLm9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBzdXBlci5vbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoMTM4OCk7XHJcbiAgICAgICAgb3RoZXIubm9kZS5zdG9wQWN0aW9uQnlUYWcoMTM4OCk7XHJcbiAgICAgICAgb3RoZXIubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXIsIHNlbGYpe1xyXG4gICAgICAgIG90aGVyLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDEzODgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdHJpa2Uob3RoZXIsIHNlbGYpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZ2FtZUJ1bGxldHNDb250cm9sbGVyID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXTtcclxuICAgICAgICBsZXQgYnVsbGV0U3RyaWtlID0gZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0U3RyaWtlKHRoaXMuYnVsbGV0SWQpO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucG9zaXRpb24gPSBjYy52MigpO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnJvdGF0aW9uID0gdGhpcy5ub2RlLnJvdGF0aW9uO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnNldENvbnRlbnRTaXplKG90aGVyLm5vZGUuZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc2V0UGFyZW50KG90aGVyLm5vZGUpO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlTm9kZSA9ICg8QnVsbGV0U3RyaWtlTGlnaHRuaW5nPmJ1bGxldFN0cmlrZSkuc3ByaXRlTm9kZTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkqMzYwO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MucmVwZWF0KFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMDUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuYWN0aXZlID0gIXNwcml0ZU5vZGUuYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidWxsZXRTdHJpa2Uubm9kZS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkqMzYwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApLCA2KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc2V0UGFyZW50KGdhbWVCdWxsZXRzQ29udHJvbGxlci5idWxsZXRMYXllcik7XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZseShkaXI6IGNjLlZlYzIsIGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBzcGVlZCA9IDQwMDtcclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSA5MCAtIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKGRpci55LCBkaXIueCkpO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGRpc3RhbmNlL3NwZWVkO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KGR1cmF0aW9uLCBkaXIubXVsKGRpc3RhbmNlKSkuZWFzaW5nKGNjLmVhc2VTaW5lT3V0KCkpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSkpKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAwLjM7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zcGF3bihjYy5zY2FsZVRvKGR1cmF0aW9uLCBkaXN0YW5jZS8xMDApLCBjYy5mYWRlVG8oZHVyYXRpb24sIDUwKSkpO1xyXG4gICAgfVxyXG59Il19