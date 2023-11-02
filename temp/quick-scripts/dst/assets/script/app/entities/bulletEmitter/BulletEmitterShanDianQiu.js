
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterShanDianQiu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d278R1B3RH6KmJMSOmnfUe', 'BulletEmitterShanDianQiu');
// script/app/entities/bulletEmitter/BulletEmitterShanDianQiu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var magnify = 1;
var BulletEmitterShanDianQiu = /** @class */ (function (_super) {
    __extends(BulletEmitterShanDianQiu, _super);
    function BulletEmitterShanDianQiu(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 1000;
        _this._interval = 0.45;
        _this._speed = 300;
        return _this;
    }
    BulletEmitterShanDianQiu.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.ShanDianQiu);
        bullet.node.active = true;
        bullet.node.position = start /*.add(dir.mul((<cc.CircleCollider>bullet.collider).radius))*/;
        bullet.node.scale = magnify * World_1.World.My.armory.magnifyMul(bullet.bulletId);
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterShanDianQiu;
}(BulletEmitter_1.default));
exports.default = BulletEmitterShanDianQiu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclNoYW5EaWFuUWl1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFFNUMsMENBQXVDO0FBRXZDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVsQjtJQUFzRCw0Q0FBYTtJQUUvRCxrQ0FBWSxxQkFBMkM7UUFBdkQsWUFDSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUkvQjtRQUhHLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDOztJQUN0QixDQUFDO0lBRUQsdUNBQUksR0FBSixVQUFLLEtBQWMsRUFBRSxHQUFZO1FBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQSw4REFBOEQsQ0FBQztRQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsYUFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQWpCQSxBQWlCQyxDQWpCcUQsdUJBQWEsR0FpQmxFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuL0J1bGxldEVtaXR0ZXJcIjtcclxuaW1wb3J0IEdhbWVCdWxsZXRzQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lQnVsbGV0c0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IG1hZ25pZnkgPSAxO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0RW1pdHRlclNoYW5EaWFuUWl1IGV4dGVuZHMgQnVsbGV0RW1pdHRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZUJ1bGxldHNDb250cm9sbGVyOkdhbWVCdWxsZXRzQ29udHJvbGxlcil7XHJcbiAgICAgICAgc3VwZXIoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICB0aGlzLl9maXJpbmdSYW5nZSA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAwLjQ1O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMzAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUoc3RhcnQ6IGNjLlZlYzIsIGRpcjogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuYnVsbGV0Q291bnQtLTtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5TaGFuRGlhblFpdSk7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBidWxsZXQubm9kZS5wb3NpdGlvbiA9IHN0YXJ0LyouYWRkKGRpci5tdWwoKDxjYy5DaXJjbGVDb2xsaWRlcj5idWxsZXQuY29sbGlkZXIpLnJhZGl1cykpKi87XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUuc2NhbGUgPSBtYWduaWZ5ICogV29ybGQuTXkuYXJtb3J5Lm1hZ25pZnlNdWwoYnVsbGV0LmJ1bGxldElkKTtcclxuICAgICAgICBidWxsZXQuZmx5KGRpciwgdGhpcy5fZmlyaW5nUmFuZ2UsIHRoaXMuX3NwZWVkKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19