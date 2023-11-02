
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterPenZi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff0edq6VF9JqK8aSEOQPcB3', 'BulletEmitterPenZi');
// script/app/entities/bulletEmitter/BulletEmitterPenZi.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var magnify = 1;
var BulletEmitterPenZi = /** @class */ (function (_super) {
    __extends(BulletEmitterPenZi, _super);
    function BulletEmitterPenZi(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterPenZi.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.PenZi);
        var ske = bullet.getComponent(sp.Skeleton);
        ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            bullet.node.active = false;
        });
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.node.scale = magnify * World_1.World.My.armory.magnifyMul(bullet.bulletId);
        bullet.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        ske.setAnimation(0, "animation", false);
    };
    return BulletEmitterPenZi;
}(BulletEmitter_1.default));
exports.default = BulletEmitterPenZi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclBlblppLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFFNUMsMENBQXVDO0FBRXZDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVsQjtJQUFnRCxzQ0FBYTtJQUV6RCw0QkFBWSxxQkFBMkM7UUFBdkQsWUFDSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUkvQjtRQUhHLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztJQUN2QixDQUFDO0lBRUQsaUNBQUksR0FBSixVQUFLLEtBQWMsRUFBRSxHQUFZO1FBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckYsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQUMsVUFBVSxFQUFFLFNBQVM7WUFDMUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVMLHlCQUFDO0FBQUQsQ0F4QkEsQUF3QkMsQ0F4QitDLHVCQUFhLEdBd0I1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0RW1pdHRlciBmcm9tIFwiLi9CdWxsZXRFbWl0dGVyXCI7XHJcbmltcG9ydCBHYW1lQnVsbGV0c0NvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL2dhbWUvR2FtZUJ1bGxldHNDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi8uLi9pbmZvL1dvcmxkXCI7XHJcblxyXG5jb25zdCBtYWduaWZ5ID0gMTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldEVtaXR0ZXJQZW5aaSBleHRlbmRzIEJ1bGxldEVtaXR0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSA4MDA7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAwLjA1O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMTUwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50LS07XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuUGVuWmkpO1xyXG4gICAgICAgIGxldCBza2UgPSBidWxsZXQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBza2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydDtcclxuICAgICAgICBidWxsZXQubm9kZS5zY2FsZSA9IG1hZ25pZnkgKiBXb3JsZC5NeS5hcm1vcnkubWFnbmlmeU11bChidWxsZXQuYnVsbGV0SWQpO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnJvdGF0aW9uID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMihkaXIueSwgZGlyLngpKTtcclxuICAgICAgICBza2Uuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19