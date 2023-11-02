"use strict";
cc._RF.push(module, 'e5d01V2r2VHM5KPSwqwyJKc', 'Interceptor');
// framework/interceptor/Interceptor.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interceptor = void 0;
var map = new Map();
var Interceptor = /** @class */ (function () {
    function Interceptor() {
    }
    Interceptor.register = function (command, interceptor) {
        var constructor = null;
        if (typeof interceptor == "function") {
            constructor = interceptor;
        }
        else {
            constructor = interceptor.constructor;
        }
        var arr = this.interceptorsOf(command);
        if (arr.every(function (value) { return value.constructor != constructor; })) {
            if (typeof interceptor == "function") {
                arr.push(new interceptor());
            }
            else {
                arr.push(interceptor);
            }
        }
    };
    Interceptor.unregister = function (command, interceptor) {
        var arr = this.interceptorsOf(command);
        var constructor = null;
        if (typeof interceptor == "function") {
            constructor = interceptor;
        }
        else {
            constructor = interceptor.constructor;
        }
        var newArr = arr.filter(function (value) { return value.constructor != constructor; });
        map.set(command, newArr);
    };
    Interceptor.interceptorsOf = function (command) {
        var arr = map.get(command);
        if (typeof arr == "undefined") {
            arr = [];
            map.set(command, arr);
        }
        return arr;
    };
    return Interceptor;
}());
exports.Interceptor = Interceptor;

cc._RF.pop();