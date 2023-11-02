
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterShouQiang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0d58H7ssBLXIO9MZmgW0N8', 'BulletEmitterShouQiang');
// script/app/entities/bulletEmitter/BulletEmitterShouQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterShouQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterShouQiang, _super);
    function BulletEmitterShouQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 800;
        _this._interval = 0.05;
        _this._speed = 1500;
        return _this;
    }
    BulletEmitterShouQiang.prototype.fire = function (start, dir) {
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.ShouQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterShouQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterShouQiang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclNob3VRaWFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQTRDO0FBSzVDO0lBQW9ELDBDQUFhO0lBRTdELGdDQUFZLHFCQUEyQztRQUF2RCxZQUNJLGtCQUFNLHFCQUFxQixDQUFDLFNBSS9CO1FBSEcsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxxQ0FBSSxHQUFKLFVBQUssS0FBYyxFQUFFLEdBQVk7UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLHVCQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FmQSxBQWVDLENBZm1ELHVCQUFhLEdBZWhFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuL0J1bGxldEVtaXR0ZXJcIjtcclxuaW1wb3J0IEdhbWVCdWxsZXRzQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lQnVsbGV0c0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0RW1pdHRlclNob3VRaWFuZyBleHRlbmRzIEJ1bGxldEVtaXR0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSA4MDA7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAwLjA1O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMTUwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nYW1lQnVsbGV0c0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVCdWxsZXQoQnVsbGV0RW1pdHRlci5UWVBFUy5TaG91UWlhbmcpO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydDtcclxuICAgICAgICBidWxsZXQuZmx5KGRpciwgdGhpcy5fZmlyaW5nUmFuZ2UsIHRoaXMuX3NwZWVkKTtcclxuICAgIH1cclxufVxyXG4iXX0=