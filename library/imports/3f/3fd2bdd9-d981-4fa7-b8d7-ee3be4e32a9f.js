"use strict";
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