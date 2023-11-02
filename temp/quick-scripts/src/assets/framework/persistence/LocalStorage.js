"use strict";
cc._RF.push(module, '0eb5f782MZHjINkdZwIcuag', 'LocalStorage');
// framework/persistence/LocalStorage.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.get = function (key) {
        return cc.sys.localStorage.getItem(this.prefix + key);
    };
    LocalStorage.set = function (key, value) {
        cc.sys.localStorage.setItem(this.prefix + key, value);
    };
    LocalStorage.getNumber = function (key) {
        var val = this.get(key);
        if (val == null) {
            return null;
        }
        return parseInt(val);
    };
    LocalStorage.setNumber = function (key, value) {
        this.set(key, value);
    };
    LocalStorage.getBoolean = function (key) {
        var val = this.getNumber(key);
        return !!val;
    };
    LocalStorage.setBoolean = function (key, b) {
        var value = 0;
        if (b) {
            value = 1;
        }
        this.set(key, value);
    };
    LocalStorage.getString = function (key) {
        return this.get(key);
    };
    LocalStorage.setString = function (key, value) {
        this.set(key, value);
    };
    LocalStorage.getObject = function (key, obj) {
        var val = this.get(key);
        if (val) {
            obj.decode(JSON.parse(val));
            return obj;
        }
        return null;
    };
    LocalStorage.setObject = function (key, obj) {
        var value = obj.encode();
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.set(key, value);
    };
    LocalStorage.prefix = "";
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;

cc._RF.pop();