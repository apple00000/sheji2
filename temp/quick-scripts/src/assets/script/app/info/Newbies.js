"use strict";
cc._RF.push(module, '21af4u3ilxCeqEbsCgLln+k', 'Newbies');
// script/app/info/Newbies.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("./World");
var Newbies = /** @class */ (function () {
    function Newbies(map) {
        this._map = null;
        this._map = map;
    }
    Newbies.prototype.state = function (key) {
        var val = this._map[key];
        return !!val;
    };
    Newbies.prototype.finish = function (key) {
        this._map[key] = 1;
        World_1.World.Storage.newbies = this.toJson();
    };
    Newbies.prototype.toJson = function () {
        return JSON.stringify(this._map);
    };
    return Newbies;
}());
exports.default = Newbies;

cc._RF.pop();