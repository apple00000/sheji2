
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/info/PropInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3fd2b3Z2YFPp7jX7jvk4yqf', 'PropInfo');
// script/app/info/PropInfo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("./World");
var PropInfo = /** @class */ (function () {
    function PropInfo(map) {
        this._map = null;
        this._map = map;
    }
    /** 过期时间 */
    PropInfo.prototype.expireTime = function (id) {
        return this._map[id];
    };
    /** 是否在使用中 */
    PropInfo.prototype.beUsing = function (id) {
        return this._map[id] && this._map[id] > new Date().getTime();
    };
    /** 使用 */
    PropInfo.prototype.use = function (id) {
        this._map[id] = new Date().getTime() + 60 * 60 * 1000;
        World_1.World.Storage.props = this.toJson();
    };
    PropInfo.prototype.toJson = function () {
        return JSON.stringify(this._map);
    };
    return PropInfo;
}());
exports.default = PropInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2luZm8vUHJvcEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUE4QjtBQUU5QjtJQUNJLGtCQUFZLEdBQUc7UUFJUCxTQUFJLEdBQXVCLElBQUksQ0FBQztRQUhwQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBSUQsV0FBVztJQUNYLDZCQUFVLEdBQVYsVUFBVyxFQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYTtJQUNiLDBCQUFPLEdBQVAsVUFBUSxFQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUztJQUNULHNCQUFHLEdBQUgsVUFBSSxFQUFTO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO1FBQ2xELGFBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUJBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQTFCQSxBQTBCQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuL1dvcmxkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wSW5mb3tcclxuICAgIGNvbnN0cnVjdG9yKG1hcCl7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hcDpNYXA8bnVtYmVyLCBudW1iZXI+ID0gbnVsbDtcclxuXHJcbiAgICAvKiog6L+H5pyf5pe26Ze0ICovXHJcbiAgICBleHBpcmVUaW1lKGlkOm51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtpZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuWcqOS9v+eUqOS4rSAqL1xyXG4gICAgYmVVc2luZyhpZDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICByZXR1cm4gdGhpcy5fbWFwW2lkXSAmJiB0aGlzLl9tYXBbaWRdID4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOS9v+eUqCAqL1xyXG4gICAgdXNlKGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fbWFwW2lkXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgNjAqNjAqMTAwMDtcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLnByb3BzID0gdGhpcy50b0pzb24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b0pzb24oKXtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fbWFwKTtcclxuICAgIH1cclxufVxyXG4iXX0=