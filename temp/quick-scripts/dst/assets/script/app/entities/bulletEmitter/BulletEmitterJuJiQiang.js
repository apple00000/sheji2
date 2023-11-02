
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJuJiQiang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7e91aqtLv1DgokxbtjCsUYR', 'BulletEmitterJuJiQiang');
// script/app/entities/bulletEmitter/BulletEmitterJuJiQiang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitter_1 = require("./BulletEmitter");
var BulletEmitterJuJiQiang = /** @class */ (function (_super) {
    __extends(BulletEmitterJuJiQiang, _super);
    function BulletEmitterJuJiQiang(gameBulletsController) {
        var _this = _super.call(this, gameBulletsController) || this;
        _this._firingRange = 2000;
        _this._interval = 0.5;
        _this._speed = 2000;
        return _this;
    }
    BulletEmitterJuJiQiang.prototype.fire = function (start, dir) {
        this.bulletCount--;
        var bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JuJiQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    };
    return BulletEmitterJuJiQiang;
}(BulletEmitter_1.default));
exports.default = BulletEmitterJuJiQiang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckp1SmlRaWFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQTRDO0FBRzVDO0lBQW9ELDBDQUFhO0lBRTdELGdDQUFZLHFCQUEyQztRQUF2RCxZQUNJLGtCQUFNLHFCQUFxQixDQUFDLFNBSS9CO1FBSEcsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxxQ0FBSSxHQUFKLFVBQUssS0FBYyxFQUFFLEdBQVk7UUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTCw2QkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEJtRCx1QkFBYSxHQWdCaEUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXIgZnJvbSBcIi4vQnVsbGV0RW1pdHRlclwiO1xyXG5pbXBvcnQgR2FtZUJ1bGxldHNDb250cm9sbGVyIGZyb20gXCIuLi8uLi9nYW1lL0dhbWVCdWxsZXRzQ29udHJvbGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0RW1pdHRlckp1SmlRaWFuZyBleHRlbmRzIEJ1bGxldEVtaXR0ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHN1cGVyKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgdGhpcy5fZmlyaW5nUmFuZ2UgPSAyMDAwO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMC41O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gMjAwMDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlKHN0YXJ0OiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50LS07XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2FtZUJ1bGxldHNDb250cm9sbGVyLmdldEluYWN0aXZlQnVsbGV0KEJ1bGxldEVtaXR0ZXIuVFlQRVMuSnVKaVFpYW5nKTtcclxuICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gc3RhcnQ7XHJcbiAgICAgICAgYnVsbGV0LmZseShkaXIsIHRoaXMuX2ZpcmluZ1JhbmdlLCB0aGlzLl9zcGVlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==