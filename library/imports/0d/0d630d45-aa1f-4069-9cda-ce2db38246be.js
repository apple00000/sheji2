"use strict";
cc._RF.push(module, '0d6301Fqh9AaZzazi2zgka+', 'HttpClient');
// framework/http/HttpClient.ts

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
exports.HttpClient = void 0;
var HttpOption_1 = require("./HttpOption");
var NetworkConfig_1 = require("../../script/app/config/NetworkConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cookieMap = new Map();
/** http默认配置 */
var httpOption = new HttpOption_1.HttpOption();
httpOption.host = NetworkConfig_1.NetworkConfig.host;
httpOption.port = 443;
// httpOption.timeout = 3*6000;
httpOption.timeout = 1;
httpOption.cookieKey = "vertx-cookie";
// 不支持FormData的浏览器的处理
if (typeof FormData == "undefined") {
    httpOption.headers.set("content-type", "application/x-www-form-urlencoded");
}
/**
 * 错误处理:
 * error.status 0表示网络异常，1表示网络超时  >=200表示http请求状态码
 * */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.deleteCookie = function (cookieKey) {
        cookieMap.delete(cookieKey);
    };
    HttpClient.get = function (protocol, httpOption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send("GET", protocol, httpOption)];
            });
        });
    };
    HttpClient.post = function (protocol, httpOption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.send("POST", protocol, httpOption)];
            });
        });
    };
    HttpClient.send = function (method, protocol, httpOption) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var option, xmlrequest, url, val, res;
                        return __generator(this, function (_a) {
                            option = httpOption || HttpClient.defaultHttpOption;
                            xmlrequest = new XMLHttpRequest();
                            xmlrequest.timeout = option.timeout;
                            xmlrequest.ontimeout = function (e) {
                                console.log(e, "ontimeout...");
                                reject({
                                    message: "网络超时",
                                    status: 1,
                                    protocol: protocol
                                });
                            };
                            xmlrequest.onerror = function (err) {
                                console.log(err, "onerror...");
                                if (typeof wx != "undefined" && err.indexOf('timeout') !== -1) {
                                    reject({
                                        message: "网络超时",
                                        status: 1,
                                        protocol: protocol
                                    });
                                }
                                else {
                                    reject({
                                        message: "网络错误",
                                        status: 1,
                                        protocol: protocol
                                    });
                                }
                            };
                            xmlrequest.onloadend = function (e) {
                                if (xmlrequest.readyState == 4) {
                                    if (option.cookieKey && !cookieMap.get(option.cookieKey)) {
                                        cookieMap.set(option.cookieKey, xmlrequest.getResponseHeader(option.cookieKey));
                                    }
                                    if (xmlrequest.status === 200) {
                                        try {
                                            protocol.decode(xmlrequest.responseText);
                                            resolve(protocol.getResponseData());
                                        }
                                        catch (e) {
                                            reject({
                                                message: "服务器状态出错==>" + protocol.getResponseMessage(),
                                                status: 200,
                                                protocol: protocol
                                            });
                                        }
                                    }
                                    else {
                                        if (xmlrequest.status == 0 && e.timeStamp && e.timeStamp > xmlrequest.timeout) {
                                            /** 超时在超时回调里处理 */
                                            return;
                                        }
                                        var msg = void 0;
                                        if (xmlrequest.status === 0) {
                                            msg = "网络异常";
                                        }
                                        else {
                                            msg = "服务器异常";
                                        }
                                        reject({
                                            message: msg,
                                            status: xmlrequest.status,
                                            protocol: protocol
                                        });
                                    }
                                }
                            };
                            url = option.host;
                            if (option.port != 80 && option.port != 443) {
                                url += ":" + option.port;
                            }
                            url += protocol.uri;
                            xmlrequest.open(method, url);
                            if (option.cookieKey) {
                                val = cookieMap.get(option.cookieKey);
                                if (val != null) {
                                    xmlrequest.setRequestHeader(option.cookieKey, val);
                                }
                            }
                            option.headers.forEach(function (value, key) { return xmlrequest.setRequestHeader(key, value); });
                            res = protocol.encode();
                            xmlrequest.send(res);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    HttpClient.defaultHttpOption = httpOption;
    return HttpClient;
}());
exports.HttpClient = HttpClient;

cc._RF.pop();