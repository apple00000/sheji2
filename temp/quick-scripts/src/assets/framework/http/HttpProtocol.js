"use strict";
cc._RF.push(module, 'ce99fMxrOJCPI2VBILKV/GL', 'HttpProtocol');
// framework/http/HttpProtocol.ts

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
var HttpProtocol = /** @class */ (function () {
    function HttpProtocol() {
        this.uri = null;
        this.request = {};
        this.response = null;
    }
    HttpProtocol.prototype.getResponseStatus = function () {
        return this.response.status;
    };
    HttpProtocol.prototype.getResponseData = function () {
        return this.response.data;
    };
    HttpProtocol.prototype.getResponseMessage = function () {
        return this.response.message;
    };
    HttpProtocol.prototype.encode = function () {
        console.log(">>>>发发发发发发===" + this.uri, this.request);
        var result = null;
        if (typeof FormData == "function") {
            var data = new FormData();
            for (var attr in this.request) {
                if (typeof this.request[attr] != "function") {
                    data.append(attr, this.request[attr]);
                }
            }
            result = data;
        }
        else {
            // 不支持FormData的浏览器的处理
            var arr = [];
            var i = 0;
            for (var attr in this.request) {
                if (typeof this.request[attr] != "function") {
                    arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(this.request[attr]);
                    i++;
                }
            }
            result = arr.join("&");
        }
        return result;
    };
    HttpProtocol.prototype.decode = function (data) {
        this.response = JSON.parse(data);
        console.log("<<<<收收收收收收===" + this.uri, data);
        if (this.response.status != 0) {
            throw this.response;
        }
    };
    return HttpProtocol;
}());
exports.default = HttpProtocol;

cc._RF.pop();