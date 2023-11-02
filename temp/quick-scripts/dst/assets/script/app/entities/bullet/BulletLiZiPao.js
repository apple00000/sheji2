
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletLiZiPao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd49a3xULQFGQaanbQQSAKQb', 'BulletLiZiPao');
// script/app/entities/bullet/BulletLiZiPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var BulletEmitter_1 = require("../bulletEmitter/BulletEmitter");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletLiZiPao = /** @class */ (function (_super) {
    __extends(BulletLiZiPao, _super);
    function BulletLiZiPao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._distance = 0;
        _this._speed = 0;
        return _this;
    }
    BulletLiZiPao.prototype.boom = function () {
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(this.bulletId);
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        var add = config[powerLv - 1]['bullet_split'];
        var num = 4 + 2 * add;
        var _loop_1 = function (i) {
            var degree = i * 360 / num;
            var newBullet = window['GameBulletsController'].getInactiveBullet(BulletEmitter_1.default.TYPES.LiZiPao + 100);
            newBullet.node.rotation = this_1.node.rotation + degree;
            var dir = cc.v2(0, 1).normalize().rotate(cc.misc.degreesToRadians(-newBullet.node.rotation));
            newBullet.node.position = this_1.node.position.add(dir.mul(130));
            newBullet.node.active = true;
            newBullet.node.runAction(cc.sequence(cc.moveBy(this_1._distance / this_1._speed, dir.mul(this_1._distance)), cc.callFunc(function () {
                newBullet.node.active = false;
            })));
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    BulletLiZiPao.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this._distance = distance;
        this._speed = speed;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    BulletLiZiPao.prototype.collisionEnemy = function (other, self) {
        _super.prototype.collisionEnemy.call(this, other, self);
        this.boom();
    };
    BulletLiZiPao = __decorate([
        ccclass
    ], BulletLiZiPao);
    return BulletLiZiPao;
}(Bullet_1.default));
exports.default = BulletLiZiPao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRMaVppUGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFDOUIsZ0VBQTJEO0FBQzNELDBDQUF1QztBQUN2Qyx3RUFBcUU7QUFDckUsZ0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFNO0lBQWpEO1FBQUEscUVBc0NDO1FBcENXLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxZQUFNLEdBQUcsQ0FBQyxDQUFDOztJQW1DdkIsQ0FBQztJQWpDRyw0QkFBSSxHQUFKO1FBQ0ksSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQ0FDYixDQUFDO1lBQ04sSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBQyxHQUFHLENBQUM7WUFDekIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3JHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0YsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0QsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRTdCLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFLLFNBQVMsR0FBQyxPQUFLLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQUssU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUM3RyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7UUFWVCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFBZixDQUFDO1NBV1Q7SUFDTCxDQUFDO0lBRUQsMkJBQUcsR0FBSCxVQUFJLEdBQVksRUFBRSxRQUFnQixFQUFFLEtBQWE7UUFBakQsaUJBT0M7UUFORyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdEYsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFUyxzQ0FBYyxHQUF4QixVQUF5QixLQUFLLEVBQUUsSUFBSTtRQUNoQyxpQkFBTSxjQUFjLFlBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBcENnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBc0NqQztJQUFELG9CQUFDO0NBdENELEFBc0NDLENBdEMwQyxnQkFBTSxHQXNDaEQ7a0JBdENvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuLi9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtFeGNlbFRhYmxlTmFtZXN9IGZyb20gXCIuLi8uLi9jb25maWcvRXhjZWxUYWJsZU5hbWVzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldExpWmlQYW8gZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2Rpc3RhbmNlID0gMDtcclxuICAgIHByaXZhdGUgX3NwZWVkID0gMDtcclxuXHJcbiAgICBib29tKCl7XHJcbiAgICAgICAgbGV0IHBvd2VyTHYgPSBXb3JsZC5NeS5hcm1vcnkubGV2ZWxPZkVtaXR0ZXJQb3dlcih0aGlzLmJ1bGxldElkKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uVXApO1xyXG4gICAgICAgIGxldCBhZGQgPSBjb25maWdbcG93ZXJMdi0xXVsnYnVsbGV0X3NwbGl0J107XHJcbiAgICAgICAgbGV0IG51bSA9IDQgKyAyICogYWRkO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxudW07IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBkZWdyZWUgPSBpICogMzYwL251bTtcclxuICAgICAgICAgICAgbGV0IG5ld0J1bGxldCA9IHdpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5MaVppUGFvICsgMTAwKTtcclxuICAgICAgICAgICAgbmV3QnVsbGV0Lm5vZGUucm90YXRpb24gPSB0aGlzLm5vZGUucm90YXRpb24gKyBkZWdyZWU7XHJcbiAgICAgICAgICAgIGxldCBkaXIgPSBjYy52MigwLCAxKS5ub3JtYWxpemUoKS5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC1uZXdCdWxsZXQubm9kZS5yb3RhdGlvbikpO1xyXG4gICAgICAgICAgICBuZXdCdWxsZXQubm9kZS5wb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbi5hZGQoZGlyLm11bCgxMzApKTtcclxuICAgICAgICAgICAgbmV3QnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIG5ld0J1bGxldC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkodGhpcy5fZGlzdGFuY2UvdGhpcy5fc3BlZWQsIGRpci5tdWwodGhpcy5fZGlzdGFuY2UpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIG5ld0J1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmbHkoZGlyOiBjYy5WZWMyLCBkaXN0YW5jZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoZGlyLnksIGRpci54KSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoZGlzdGFuY2Uvc3BlZWQsIGRpci5tdWwoZGlzdGFuY2UpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbGxpc2lvbkVuZW15KG90aGVyLCBzZWxmKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuY29sbGlzaW9uRW5lbXkob3RoZXIsIHNlbGYpO1xyXG4gICAgICAgIHRoaXMuYm9vbSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=