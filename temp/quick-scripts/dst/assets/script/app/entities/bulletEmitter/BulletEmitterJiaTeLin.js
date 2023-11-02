
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJiaTeLin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4db758f9P9A8LM9PRXQc7sC', 'BulletEmitterJiaTeLin');
// script/app/entities/bulletEmitter/BulletEmitterJiaTeLin.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJiaTeLin = /** @class */ (function (_super) {
    __extends(BulletEmitterJiaTeLin, _super);
    function BulletEmitterJiaTeLin(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this.degree = 0;
        _this.num = 0;
        _this._firingRange = 1000;
        _this._interval = 0.1;
        _this._speed = 1200;
        return _this;
    }
    BulletEmitterJiaTeLin.prototype.fire = function (start, dir) {
        this.bulletCount--;
        switch (this.num % 4) {
            case 0:
                /** 发射一颗 */
                {
                    var degree = Math.random() * 2;
                    this.degree = this.degree > 0 ? -degree : degree;
                    var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet.node.active = true;
                    bullet.node.position = start;
                    bullet.fly(dir.rotate(cc.misc.degreesToRadians(this.degree)), this._firingRange, this._speed);
                }
                break;
            case 1:
                /** 小角度同时发射两颗 */
                {
                    var degree = 3 + Math.random() * 5;
                    var bullet1 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet1.node.active = true;
                    bullet1.node.position = start.add(dir.mul(Math.random() * -10));
                    bullet1.fly(dir.rotate(cc.misc.degreesToRadians(this.degree + degree)), this._firingRange, this._speed);
                    var bullet2 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet2.node.active = true;
                    bullet2.node.position = start.add(dir.mul(Math.random() * 10));
                    bullet2.fly(dir.rotate(cc.misc.degreesToRadians(-this.degree - degree)), this._firingRange, this._speed);
                }
                break;
            case 2:
                /** 发射一颗 */
                {
                    var degree = Math.random() * 2;
                    this.degree = this.degree > 0 ? -degree : degree;
                    var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet.node.active = true;
                    bullet.node.position = start;
                    bullet.fly(dir.rotate(cc.misc.degreesToRadians(this.degree)), this._firingRange, this._speed);
                }
                break;
            case 3:
                /** 大角度同时发射两颗 */
                {
                    var degree = 10 + Math.random() * 5;
                    var bullet1 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet1.node.active = true;
                    bullet1.node.position = start.add(dir.mul(Math.random() * -15));
                    bullet1.fly(dir.rotate(cc.misc.degreesToRadians(this.degree + degree)), this._firingRange, this._speed);
                    var bullet2 = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiaTeLin);
                    bullet2.node.active = true;
                    bullet2.node.position = start.add(dir.mul(Math.random() * 15));
                    bullet2.fly(dir.rotate(cc.misc.degreesToRadians(-this.degree - degree)), this._firingRange, this._speed);
                }
                break;
        }
        this.num++;
    };
    return BulletEmitterJiaTeLin;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJiaTeLin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckppYVRlTGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFJNUM7SUFBbUQseUNBQWE7SUFNNUQsK0JBQVkscUJBQTJDO1FBQXZELFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FJL0I7UUFUTyxZQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsU0FBRyxHQUFHLENBQUMsQ0FBQztRQUlaLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztJQUN2QixDQUFDO0lBRUQsb0NBQUksR0FBSixVQUFLLEtBQWMsRUFBRSxHQUFZO1FBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxFQUFDO1lBQ2YsS0FBSyxDQUFDO2dCQUNGLFdBQVc7Z0JBQ2Y7b0JBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDakQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLHVCQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFH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QUM7QUFBRCxDQTdFQSxBQTZFQyxDQTdFa0QsdUJBQWEsR0E2RS9EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuL0J1bGxldEVtaXR0ZXJcIjtcclxuaW1wb3J0IEdhbWVCdWxsZXRzQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lQnVsbGV0c0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRFbWl0dGVySmlhVGVMaW4gZXh0ZW5kcyBCdWxsZXRFbWl0dGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGRlZ3JlZSA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBudW0gPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMC4xO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMTIwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50LS07XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm51bSU0KXtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgLyoqIOWPkeWwhOS4gOmilyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gTWF0aC5yYW5kb20oKSoyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWUgPSB0aGlzLmRlZ3JlZSA+IDAgPyAtZGVncmVlIDogZGVncmVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlhVGVMaW4pO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gc3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmZseShkaXIucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyh0aGlzLmRlZ3JlZSkpLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLyoqIOWwj+inkuW6puWQjOaXtuWPkeWwhOS4pOmilyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gMyArIE1hdGgucmFuZG9tKCkgKiA1O1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDEgPSB0aGlzLmdhbWVCdWxsZXRzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUJ1bGxldChCdWxsZXRFbWl0dGVyLlRZUEVTLkppYVRlTGluKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldDEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0MS5ub2RlLnBvc2l0aW9uID0gc3RhcnQuYWRkKGRpci5tdWwoTWF0aC5yYW5kb20oKSotMTApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLmZseShkaXIucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyh0aGlzLmRlZ3JlZStkZWdyZWUpKSwgdGhpcy5fZmlyaW5nUmFuZ2UsIHRoaXMuX3NwZWVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0MiA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlhVGVMaW4pO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Mi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQyLm5vZGUucG9zaXRpb24gPSBzdGFydC5hZGQoZGlyLm11bChNYXRoLnJhbmRvbSgpKjEwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0Mi5mbHkoZGlyLnJvdGF0ZShjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLXRoaXMuZGVncmVlLWRlZ3JlZSkpLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLyoqIOWPkeWwhOS4gOmilyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gTWF0aC5yYW5kb20oKSoyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWUgPSB0aGlzLmRlZ3JlZSA+IDAgPyAtZGVncmVlIDogZGVncmVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlhVGVMaW4pO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gc3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmZseShkaXIucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucyh0aGlzLmRlZ3JlZSkpLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLyoqIOWkp+inkuW6puWQjOaXtuWPkeWwhOS4pOmilyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gMTAgKyBNYXRoLnJhbmRvbSgpICogNTtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQxID0gdGhpcy5nYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5KaWFUZUxpbik7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldDEubm9kZS5wb3NpdGlvbiA9IHN0YXJ0LmFkZChkaXIubXVsKE1hdGgucmFuZG9tKCkqLTE1KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnVsbGV0MS5mbHkoZGlyLnJvdGF0ZShjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5kZWdyZWUrZGVncmVlKSksIHRoaXMuX2ZpcmluZ1JhbmdlLCB0aGlzLl9zcGVlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDIgPSB0aGlzLmdhbWVCdWxsZXRzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUJ1bGxldChCdWxsZXRFbWl0dGVyLlRZUEVTLkppYVRlTGluKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldDIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Mi5ub2RlLnBvc2l0aW9uID0gc3RhcnQuYWRkKGRpci5tdWwoTWF0aC5yYW5kb20oKSoxNSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldDIuZmx5KGRpci5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC10aGlzLmRlZ3JlZS1kZWdyZWUpKSwgdGhpcy5fZmlyaW5nUmFuZ2UsIHRoaXMuX3NwZWVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubnVtKys7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==