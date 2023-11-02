
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterLiZiPao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5068lByUNDfZVSWj7ABV1y', 'BulletEmitterLiZiPao');
// script/app/entities/bulletEmitter/BulletEmitterLiZiPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterLiZiPao = /** @class */ (function (_super) {
    __extends(BulletEmitterLiZiPao, _super);
    function BulletEmitterLiZiPao(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 500;
        _this._interval = 0.5;
        _this._speed = 800;
        return _this;
    }
    BulletEmitterLiZiPao.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.LiZiPao);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterLiZiPao;
}(BulletEmitter_1.default));
exports.default = BulletEmitterLiZiPao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckxpWmlQYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUE0QztBQUc1QztJQUFrRCx3Q0FBYTtJQUUzRCw4QkFBWSxxQkFBMkM7UUFBdkQsWUFDSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUkvQjtRQUhHLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDOztJQUN0QixDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLEtBQWMsRUFBRSxHQUFZO1FBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUwsMkJBQUM7QUFBRCxDQWpCQSxBQWlCQyxDQWpCaUQsdUJBQWEsR0FpQjlEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuL0J1bGxldEVtaXR0ZXJcIjtcclxuaW1wb3J0IEdhbWVCdWxsZXRzQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lQnVsbGV0c0NvbnRyb2xsZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldEVtaXR0ZXJMaVppUGFvIGV4dGVuZHMgQnVsbGV0RW1pdHRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZUJ1bGxldHNDb250cm9sbGVyOkdhbWVCdWxsZXRzQ29udHJvbGxlcil7XHJcbiAgICAgICAgc3VwZXIoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICB0aGlzLl9maXJpbmdSYW5nZSA9IDUwMDtcclxuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDAuNTtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IDgwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50LS07XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuTGlaaVBhbyk7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBidWxsZXQubm9kZS5wb3NpdGlvbiA9IHN0YXJ0O1xyXG4gICAgICAgIGJ1bGxldC5mbHkoZGlyLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19