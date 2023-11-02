
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterHuoYan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b0708OLqc1I7JmsZsEiOmlz', 'BulletEmitterHuoYan');
// script/app/entities/bulletEmitter/BulletEmitterHuoYan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterHuoYan = /** @class */ (function (_super) {
    __extends(BulletEmitterHuoYan, _super);
    function BulletEmitterHuoYan(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._list = [];
        _this._firingRange = 600;
        _this._interval = 0.15;
        _this._speed = 300;
        return _this;
    }
    BulletEmitterHuoYan.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.HuoYan);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
        this._list.unshift(bullet);
        this._list = this._list.filter(function (value) { return value.node.active == true; });
        // let p = start;
        // for (let i=0; i<3; i++){
        //     let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.HuoYan);
        //     bullet.node.active = true;
        //     bullet.node.position = p.add(dir.mul((3-i)*30));
        //     bullet.fly(dir, this._firingRange, this._speed);
        //     this._list.unshift(bullet);
        // }
        this._list.forEach(function (value, index) { return value.node.zIndex = index; });
    };
    return BulletEmitterHuoYan;
}(BulletEmitter_1.default));
exports.default = BulletEmitterHuoYan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckh1b1lhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaURBQTRDO0FBRTVDO0lBQWlELHVDQUFhO0lBSTFELDZCQUFZLHFCQUEyQztRQUF2RCxZQUNJLGtCQUFNLHFCQUFxQixDQUFDLFNBSS9CO1FBUE8sV0FBSyxHQUFTLEVBQUUsQ0FBQztRQUlyQixLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7SUFDdEIsQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxLQUFjLEVBQUUsR0FBWTtRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLHVCQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBQ25FLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsNkZBQTZGO1FBQzdGLGlDQUFpQztRQUNqQyx1REFBdUQ7UUFDdkQsdURBQXVEO1FBQ3ZELGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsQ0E3QmdELHVCQUFhLEdBNkI3RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgR2FtZUJ1bGxldHNDb250cm9sbGVyIGZyb20gXCIuLi8uLi9nYW1lL0dhbWVCdWxsZXRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlciBmcm9tIFwiLi9CdWxsZXRFbWl0dGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRFbWl0dGVySHVvWWFuIGV4dGVuZHMgQnVsbGV0RW1pdHRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlzdDpBcnJheSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSA2MDA7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAwLjE1O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMzAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUoc3RhcnQ6IGNjLlZlYzIsIGRpcjogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuYnVsbGV0Q291bnQtLTtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5IdW9ZYW4pO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydDtcclxuICAgICAgICBidWxsZXQuZmx5KGRpciwgdGhpcy5fZmlyaW5nUmFuZ2UsIHRoaXMuX3NwZWVkKTtcclxuICAgICAgICB0aGlzLl9saXN0LnVuc2hpZnQoYnVsbGV0KTtcclxuICAgICAgICB0aGlzLl9saXN0ID0gdGhpcy5fbGlzdC5maWx0ZXIodmFsdWUgPT4gdmFsdWUubm9kZS5hY3RpdmUgPT0gdHJ1ZSk7XHJcbiAgICAgICAgLy8gbGV0IHAgPSBzdGFydDtcclxuICAgICAgICAvLyBmb3IgKGxldCBpPTA7IGk8MzsgaSsrKXtcclxuICAgICAgICAvLyAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuSHVvWWFuKTtcclxuICAgICAgICAvLyAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBwLmFkZChkaXIubXVsKCgzLWkpKjMwKSk7XHJcbiAgICAgICAgLy8gICAgIGJ1bGxldC5mbHkoZGlyLCB0aGlzLl9maXJpbmdSYW5nZSwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9saXN0LnVuc2hpZnQoYnVsbGV0KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5fbGlzdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlLm5vZGUuekluZGV4ID0gaW5kZXgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==