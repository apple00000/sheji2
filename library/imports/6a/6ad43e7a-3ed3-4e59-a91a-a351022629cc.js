"use strict";
cc._RF.push(module, '6ad4356PtNOWakao1ECJinM', 'JsonConverter');
// framework/converter/JsonConverter.ts

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
exports.JsonConverter = void 0;
var JsonConverter = /** @class */ (function () {
    function JsonConverter() {
    }
    JsonConverter.prototype.encode = function () {
        var json = {};
        for (var attr in this) {
            if (typeof this[attr] != "function") {
                json[attr] = this[attr];
            }
        }
        return json;
    };
    JsonConverter.prototype.decode = function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        for (var attr in this) {
            if (typeof this[attr] != "function") {
                if (typeof data[attr] == "undefined") {
                    throw this.constructor.name + ".decode data not found attr===>" + attr;
                }
                this[attr] = data[attr];
            }
        }
        return this;
    };
    return JsonConverter;
}());
exports.JsonConverter = JsonConverter;

cc._RF.pop();