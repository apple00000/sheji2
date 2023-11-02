
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterSanDanQiang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb678niczNL5ILsd5k556at', 'BulletEmitterSanDanQiang');
// script/app/entities/bulletEmitter/BulletEmitterSanDanQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var BulletEmitterSanDanQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterSanDanQiang, _super);
    function BulletEmitterSanDanQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 900;
        _this._interval = 0.1;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterSanDanQiang.prototype.fire = function (start, dir) {
        var _this = this;
        this.bulletCount--;
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(this._bulletEmitterID);
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        var add = config[powerLv - 1]['bullet_split'];
        var num = 3 + 2 * add;
        var angle = 10 + 5 * add;
        var degrees = [];
        var half = Math.floor(num / 2);
        for (var i = 0; i < half; i++) {
            var a = (i + 1) * angle / half;
            degrees.push(a);
            degrees.push(-a);
        }
        if (num % 2 == 1) {
            degrees.push(0);
        }
        degrees.forEach(function (value) {
            var bullet = _this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.SanDanQiang);
            bullet.node.active = true;
            bullet.node.position = start;
            bullet.fly(dir.rotate(cc.misc.degreesToRadians(value)), _this._firingRange, _this._speed);
        });
    };
    return BulletEmitterSanDanQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterSanDanQiang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclNhbkRhblFpYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFDNUMsMENBQXVDO0FBQ3ZDLHdFQUFxRTtBQUNyRSxnRUFBNkQ7QUFJN0Q7SUFBc0QsNENBQWE7SUFFL0Qsa0NBQVkscUJBQTJDO1FBQXZELFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FJL0I7UUFIRyxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7SUFDdkIsQ0FBQztJQUVELHVDQUFJLEdBQUosVUFBSyxLQUFjLEVBQUUsR0FBWTtRQUFqQyxpQkF1QkM7UUF0QkcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksT0FBTyxHQUFHLGFBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pFLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxFQUFFLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNqQixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsQ0FqQ3FELHVCQUFhLEdBaUNsRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgR2FtZUJ1bGxldHNDb250cm9sbGVyIGZyb20gXCIuLi8uLi9nYW1lL0dhbWVCdWxsZXRzQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlciBmcm9tIFwiLi9CdWxsZXRFbWl0dGVyXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi8uLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRFbWl0dGVyU2FuRGFuUWlhbmcgZXh0ZW5kcyBCdWxsZXRFbWl0dGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lQnVsbGV0c0NvbnRyb2xsZXI6R2FtZUJ1bGxldHNDb250cm9sbGVyKXtcclxuICAgICAgICBzdXBlcihnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmluZ1JhbmdlID0gOTAwO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMC4xO1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMTUwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50LS07XHJcbiAgICAgICAgbGV0IHBvd2VyTHYgPSBXb3JsZC5NeS5hcm1vcnkubGV2ZWxPZkVtaXR0ZXJQb3dlcih0aGlzLl9idWxsZXRFbWl0dGVySUQpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcCk7XHJcbiAgICAgICAgbGV0IGFkZCA9IGNvbmZpZ1twb3dlckx2LTFdWydidWxsZXRfc3BsaXQnXTtcclxuICAgICAgICBsZXQgbnVtID0gMyArIDIgKiBhZGQ7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gMTArNSphZGQ7XHJcbiAgICAgICAgbGV0IGRlZ3JlZXMgPSBbXTtcclxuICAgICAgICBsZXQgaGFsZiA9IE1hdGguZmxvb3IobnVtLzIpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGhhbGY7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBhID0gKGkrMSkqYW5nbGUvaGFsZjtcclxuICAgICAgICAgICAgZGVncmVlcy5wdXNoKGEpO1xyXG4gICAgICAgICAgICBkZWdyZWVzLnB1c2goLWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtJTIgPT0gMSl7XHJcbiAgICAgICAgICAgIGRlZ3JlZXMucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVncmVlcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuU2FuRGFuUWlhbmcpO1xyXG4gICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBidWxsZXQubm9kZS5wb3NpdGlvbiA9IHN0YXJ0O1xyXG4gICAgICAgICAgICBidWxsZXQuZmx5KGRpci5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKHZhbHVlKSksIHRoaXMuX2ZpcmluZ1JhbmdlLCB0aGlzLl9zcGVlZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19