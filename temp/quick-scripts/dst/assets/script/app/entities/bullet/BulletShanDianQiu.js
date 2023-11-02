
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletShanDianQiu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6485tJEkdMoIplWDIZNrRd', 'BulletShanDianQiu');
// script/app/entities/bullet/BulletShanDianQiu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletShanDianQiu = /** @class */ (function (_super) {
    __extends(BulletShanDianQiu, _super);
    function BulletShanDianQiu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletShanDianQiu.prototype.strike = function (other, self) {
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
    BulletShanDianQiu.prototype.fly = function (dir, distance, speed) {
        _super.prototype.fly.call(this, dir, distance, speed);
        this.node.scale = 0.3;
        this.node.runAction(cc.scaleTo(distance / speed, distance / 300));
    };
    BulletShanDianQiu = __decorate([
        ccclass
    ], BulletShanDianQiu);
    return BulletShanDianQiu;
}(Bullet_1.default));
exports.default = BulletShanDianQiu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRTaGFuRGlhblFpdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFNO0lBQXJEOztJQXFDQSxDQUFDO0lBbkNHLGtDQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsSUFBSTtRQUNkLElBQUkscUJBQXFCLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUQsSUFBSSxZQUFZLEdBQUcscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEQsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzlELFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLElBQUksVUFBVSxHQUEyQixZQUFhLENBQUMsVUFBVSxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDL0MsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDbkMsRUFBRSxDQUFDLE1BQU0sQ0FDTCxFQUFFLENBQUMsUUFBUSxDQUNQLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ2xCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDUixVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxrREFBa0Q7UUFDdEQsQ0FBQyxDQUFDLENBQ0wsRUFBRSxDQUFDLENBQUMsRUFDVCxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBR0QsK0JBQUcsR0FBSCxVQUFJLEdBQVksRUFBRSxRQUFnQixFQUFFLEtBQWE7UUFDN0MsaUJBQU0sR0FBRyxZQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLEtBQUssRUFBRSxRQUFRLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBcENnQixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQXFDckM7SUFBRCx3QkFBQztDQXJDRCxBQXFDQyxDQXJDOEMsZ0JBQU0sR0FxQ3BEO2tCQXJDb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBCdWxsZXRTdHJpa2VMaWdodG5pbmcgZnJvbSBcIi4uL2J1bGxldFN0cmlrZS9CdWxsZXRTdHJpa2VMaWdodG5pbmdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0U2hhbkRpYW5RaXUgZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuICAgIHN0cmlrZShvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIGxldCBnYW1lQnVsbGV0c0NvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddO1xyXG4gICAgICAgIGxldCBidWxsZXRTdHJpa2UgPSBnYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXRTdHJpa2UodGhpcy5idWxsZXRJZCk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucm90YXRpb24gPSB0aGlzLm5vZGUucm90YXRpb247XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc2V0Q29udGVudFNpemUob3RoZXIubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5zZXRQYXJlbnQob3RoZXIubm9kZSk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVOb2RlID0gKDxCdWxsZXRTdHJpa2VMaWdodG5pbmc+YnVsbGV0U3RyaWtlKS5zcHJpdGVOb2RlO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnJvdGF0aW9uID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXQoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4wNSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5hY3RpdmUgPSAhc3ByaXRlTm9kZS5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1bGxldFN0cmlrZS5ub2RlLnJvdGF0aW9uID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICksIDYpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5zZXRQYXJlbnQoZ2FtZUJ1bGxldHNDb250cm9sbGVyLmJ1bGxldExheWVyKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZmx5KGRpcjogY2MuVmVjMiwgZGlzdGFuY2U6IG51bWJlciwgc3BlZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmZseShkaXIsIGRpc3RhbmNlLCBzcGVlZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMC4zO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbyhkaXN0YW5jZS9zcGVlZCwgZGlzdGFuY2UvMzAwKSk7XHJcbiAgICB9XHJcbn1cclxuIl19