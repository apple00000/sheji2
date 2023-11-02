
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '20d59hobkVP7p8yXkmyYW5w', 'BulletEmitter');
// script/app/entities/bulletEmitter/BulletEmitter.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var GameProxy_1 = require("../../game/GameProxy");
var World_1 = require("../../info/World");
/**
 * 子弹发射器只负责发射子弹
 * 控制一次发射的子弹个数及每一颗子弹的发射
 */
var BulletEmitter = /** @class */ (function () {
    function BulletEmitter(gameBulletsController) {
        this._gameBulletsController = null;
        /** 射程 */
        this._firingRange = 0;
        /** 发射间隔 */
        this._interval = 0;
        /** 子弹的速度 */
        this._speed = 0;
        /** 弹容量 */
        this._payload = 0;
        /** 剩余弹量 */
        this._bulletCount = 0;
        this._bulletEmitterID = 0;
        this._gameBulletsController = gameBulletsController;
    }
    Object.defineProperty(BulletEmitter.prototype, "firingRange", {
        get: function () {
            return this._firingRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        set: function (value) {
            this._payload = value;
            this.bulletCount = this._payload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "bulletCount", {
        get: function () {
            return this._bulletCount;
        },
        set: function (value) {
            this._bulletCount = value;
            GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.UpdateBulletCount);
        },
        enumerable: false,
        configurable: true
    });
    /** 是否子弹用尽 */
    BulletEmitter.prototype.isUseUp = function () {
        return this._payload != 0 && this._bulletCount < 1;
    };
    Object.defineProperty(BulletEmitter.prototype, "gameBulletsController", {
        get: function () {
            return this._gameBulletsController;
        },
        enumerable: false,
        configurable: true
    });
    BulletEmitter.prototype.init = function (id) {
        this._bulletEmitterID = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[this._bulletEmitterID - 1];
        this._speed = config['speed'];
        this._firingRange = config['range'] * World_1.World.My.armory.rangeMulOf(this._bulletEmitterID);
        this._interval = config['fre'] * World_1.World.My.armory.freMulOf(this._bulletEmitterID);
        this.payload = World_1.World.My.armory.payloadAddOf(this._bulletEmitterID);
        console.log('payload===>', this._payload);
    };
    BulletEmitter.prototype.onEnter = function () { };
    BulletEmitter.prototype.onExit = function () { };
    BulletEmitter.TYPES = {
        ShouQiang: 1,
        PenZi: 2,
        JiaTeLin: 3,
        SanDanQiang: 4,
        HuoYan: 5,
        JiGuang: 6,
        JuJiQiang: 7,
        LiZiPao: 8,
        HuoJianTong: 9,
        ShanDianQiu: 10,
    };
    return BulletEmitter;
}());
exports.default = BulletEmitter;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0VBQTZEO0FBQzdELHdFQUFxRTtBQUNyRSxrREFBK0M7QUFDL0MsMENBQXVDO0FBRXZDOzs7R0FHRztBQUdIO0lBZUksdUJBQXNCLHFCQUEyQztRQUd6RCwyQkFBc0IsR0FBeUIsSUFBSSxDQUFDO1FBRzVELFNBQVM7UUFDQyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQU0zQixXQUFXO1FBQ0QsY0FBUyxHQUFHLENBQUMsQ0FBQztRQU94QixZQUFZO1FBQ0YsV0FBTSxHQUFHLENBQUMsQ0FBQztRQU9yQixVQUFVO1FBQ0YsYUFBUSxHQUFHLENBQUMsQ0FBQztRQVdyQixXQUFXO1FBQ0gsaUJBQVksR0FBRyxDQUFDLENBQUM7UUF1QmYscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBaEUzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7SUFDeEQsQ0FBQztJQU9ELHNCQUFJLHNDQUFXO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxtQ0FBUTthQUFaO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBTUQsc0JBQUksZ0NBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUtELHNCQUFJLGtDQUFPO2FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksS0FBYTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQzs7O09BTEE7SUFXRCxzQkFBSSxzQ0FBVzthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFHRCxVQUFnQixLQUFhO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEQsQ0FBQzs7O09BTkE7SUFRRCxhQUFhO0lBQ2IsK0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHNCQUFJLGdEQUFxQjthQUF6QjtZQUNJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQ3ZDLENBQUM7OztPQUFBO0lBS0QsNEJBQUksR0FBSixVQUFLLEVBQVM7UUFDVixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFJRCwrQkFBTyxHQUFQLGNBQVUsQ0FBQztJQUNYLDhCQUFNLEdBQU4sY0FBUyxDQUFDO0lBN0ZILG1CQUFLLEdBQUc7UUFDWCxTQUFTLEVBQUcsQ0FBQztRQUNiLEtBQUssRUFBRyxDQUFDO1FBQ1QsUUFBUSxFQUFHLENBQUM7UUFDWixXQUFXLEVBQUcsQ0FBQztRQUNmLE1BQU0sRUFBRyxDQUFDO1FBQ1YsT0FBTyxFQUFHLENBQUM7UUFDWCxTQUFTLEVBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRyxDQUFDO1FBQ1gsV0FBVyxFQUFHLENBQUM7UUFDZixXQUFXLEVBQUcsRUFBRTtLQUNuQixDQUFDO0lBbUZOLG9CQUFDO0NBaEdELEFBZ0dDLElBQUE7a0JBaEc2QixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVCdWxsZXRzQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lQnVsbGV0c0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtFeGNlbFRhYmxlTmFtZXN9IGZyb20gXCIuLi8uLi9jb25maWcvRXhjZWxUYWJsZU5hbWVzXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi4vLi4vZ2FtZS9HYW1lUHJveHlcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuXHJcbi8qKlxyXG4gKiDlrZDlvLnlj5HlsITlmajlj6rotJ/otKPlj5HlsITlrZDlvLlcclxuICog5o6n5Yi25LiA5qyh5Y+R5bCE55qE5a2Q5by55Liq5pWw5Y+K5q+P5LiA6aKX5a2Q5by555qE5Y+R5bCEXHJcbiAqL1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJ1bGxldEVtaXR0ZXIge1xyXG5cclxuICAgIHN0YXRpYyBUWVBFUyA9IHtcclxuICAgICAgICBTaG91UWlhbmcgOiAxLFxyXG4gICAgICAgIFBlblppIDogMixcclxuICAgICAgICBKaWFUZUxpbiA6IDMsXHJcbiAgICAgICAgU2FuRGFuUWlhbmcgOiA0LFxyXG4gICAgICAgIEh1b1lhbiA6IDUsXHJcbiAgICAgICAgSmlHdWFuZyA6IDYsXHJcbiAgICAgICAgSnVKaVFpYW5nIDogNyxcclxuICAgICAgICBMaVppUGFvIDogOCxcclxuICAgICAgICBIdW9KaWFuVG9uZyA6IDksXHJcbiAgICAgICAgU2hhbkRpYW5RaXUgOiAxMCxcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGdhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIpe1xyXG4gICAgICAgIHRoaXMuX2dhbWVCdWxsZXRzQ29udHJvbGxlciA9IGdhbWVCdWxsZXRzQ29udHJvbGxlcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX2dhbWVCdWxsZXRzQ29udHJvbGxlcjpHYW1lQnVsbGV0c0NvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICAvKiog5bCE56iLICovXHJcbiAgICBwcm90ZWN0ZWQgX2ZpcmluZ1JhbmdlID0gMDtcclxuXHJcbiAgICBnZXQgZmlyaW5nUmFuZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyaW5nUmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWPkeWwhOmXtOmalCAqL1xyXG4gICAgcHJvdGVjdGVkIF9pbnRlcnZhbCA9IDA7XHJcblxyXG5cclxuICAgIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5a2Q5by555qE6YCf5bqmICovXHJcbiAgICBwcm90ZWN0ZWQgX3NwZWVkID0gMDtcclxuXHJcblxyXG4gICAgZ2V0IHNwZWVkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvLnlrrnph48gKi9cclxuICAgIHByaXZhdGUgX3BheWxvYWQgPSAwO1xyXG5cclxuICAgIGdldCBwYXlsb2FkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BheWxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBheWxvYWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmJ1bGxldENvdW50ID0gdGhpcy5fcGF5bG9hZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Ymp5L2Z5by56YePICovXHJcbiAgICBwcml2YXRlIF9idWxsZXRDb3VudCA9IDA7XHJcblxyXG5cclxuICAgIGdldCBidWxsZXRDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWxsZXRDb3VudDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0IGJ1bGxldENvdW50KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9idWxsZXRDb3VudCA9IHZhbHVlO1xyXG4gICAgICAgIEdhbWVQcm94eS5lbWl0KEdhbWVQcm94eS5FdmVudC5VcGRhdGVCdWxsZXRDb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuWtkOW8ueeUqOWwvSAqL1xyXG4gICAgaXNVc2VVcCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXlsb2FkICE9IDAgJiYgdGhpcy5fYnVsbGV0Q291bnQgPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnYW1lQnVsbGV0c0NvbnRyb2xsZXIoKTogR2FtZUJ1bGxldHNDb250cm9sbGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUJ1bGxldHNDb250cm9sbGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2J1bGxldEVtaXR0ZXJJRCA9IDA7XHJcblxyXG4gICAgaW5pdChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX2J1bGxldEVtaXR0ZXJJRCA9IGlkO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pW3RoaXMuX2J1bGxldEVtaXR0ZXJJRC0xXTtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IGNvbmZpZ1snc3BlZWQnXTtcclxuICAgICAgICB0aGlzLl9maXJpbmdSYW5nZSA9IGNvbmZpZ1sncmFuZ2UnXSpXb3JsZC5NeS5hcm1vcnkucmFuZ2VNdWxPZih0aGlzLl9idWxsZXRFbWl0dGVySUQpO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gY29uZmlnWydmcmUnXSpXb3JsZC5NeS5hcm1vcnkuZnJlTXVsT2YodGhpcy5fYnVsbGV0RW1pdHRlcklEKTtcclxuICAgICAgICB0aGlzLnBheWxvYWQgPSBXb3JsZC5NeS5hcm1vcnkucGF5bG9hZEFkZE9mKHRoaXMuX2J1bGxldEVtaXR0ZXJJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3BheWxvYWQ9PT0+JywgdGhpcy5fcGF5bG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZmlyZShzdGFydDogY2MuVmVjMiwgZGlyOiBjYy5WZWMyKTtcclxuXHJcbiAgICBvbkVudGVyKCl7fVxyXG4gICAgb25FeGl0KCl7fVxyXG59XHJcblxyXG4iXX0=