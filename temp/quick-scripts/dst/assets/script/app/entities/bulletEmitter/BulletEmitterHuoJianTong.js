
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterHuoJianTong.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e866aL+CRFBSp2UxvZucu5u', 'BulletEmitterHuoJianTong');
// script/app/entities/bulletEmitter/BulletEmitterHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterHuoJianTong = /** @class */ (function (_super) {
    __extends(BulletEmitterHuoJianTong, _super);
    function BulletEmitterHuoJianTong(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 1000;
        _this._interval = 0.5;
        _this._speed = 600;
        return _this;
    }
    BulletEmitterHuoJianTong.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.HuoJianTong);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterHuoJianTong;
}(BulletEmitter_1.default));
exports.default = BulletEmitterHuoJianTong;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckh1b0ppYW5Ub25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFJNUM7SUFBc0QsNENBQWE7SUFFL0Qsa0NBQVkscUJBQTJDO1FBQXZELFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FJL0I7UUFIRyxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7SUFDdEIsQ0FBQztJQUVELHVDQUFJLEdBQUosVUFBSyxLQUFjLEVBQUUsR0FBWTtRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLHVCQUFhLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsQ0FoQnFELHVCQUFhLEdBZ0JsRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgR2FtZUJ1bGxldHNDb250cm9sbGVyIGZyb20gXCIuLi8uLi9nYW1lL0dhbWVCdWxsZXRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlciBmcm9tIFwiLi9CdWxsZXRFbWl0dGVyXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldEVtaXR0ZXJIdW9KaWFuVG9uZyBleHRlbmRzIEJ1bGxldEVtaXR0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMC41O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gNjAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUoc3RhcnQ6IGNjLlZlYzIsIGRpcjogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuYnVsbGV0Q291bnQtLTtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5IdW9KaWFuVG9uZyk7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBidWxsZXQubm9kZS5wb3NpdGlvbiA9IHN0YXJ0O1xyXG4gICAgICAgIGJ1bGxldC5mbHkoZGlyLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==