
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/http/HttpClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaHR0cC9IdHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOzs7QUFJbkcsMkNBQXdDO0FBRXhDLHVFQUFvRTtBQUU5RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0FBR3ZDLGVBQWU7QUFDZixJQUFJLFVBQVUsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztBQUNsQyxVQUFVLENBQUMsSUFBSSxHQUFHLDZCQUFhLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLCtCQUErQjtBQUMvQixVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUN2QixVQUFVLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUN0QyxxQkFBcUI7QUFDckIsSUFBRyxPQUFPLFFBQVEsSUFBSSxXQUFXLEVBQUU7SUFDL0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7Q0FDL0U7QUFFRDs7O0tBR0s7QUFDTDtJQUFBO0lBdUdBLENBQUM7SUFuR1UsdUJBQVksR0FBbkIsVUFBb0IsU0FBZ0I7UUFDaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRVksY0FBRyxHQUFoQixVQUFpQixRQUFxQixFQUFFLFVBQXNCOzs7Z0JBQzFELHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBQzs7O0tBQ2pEO0lBRVksZUFBSSxHQUFqQixVQUFrQixRQUFxQixFQUFFLFVBQXNCOzs7Z0JBQzNELHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBQzs7O0tBQ2xEO0lBR1ksZUFBSSxHQUFqQixVQUFrQixNQUFhLEVBQUUsUUFBcUIsRUFBRSxVQUFzQjs7OztnQkFDMUUsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBTSxPQUFPLEVBQUUsTUFBTTs7OzRCQUNoQyxNQUFNLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDcEQsVUFBVSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7NEJBQ3RDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDcEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0NBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dDQUMvQixNQUFNLENBQUM7b0NBQ0gsT0FBTyxFQUFDLE1BQU07b0NBQ2QsTUFBTSxFQUFDLENBQUM7b0NBQ1IsUUFBUSxFQUFDLFFBQVE7aUNBQ3BCLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUM7NEJBRUYsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFTLEdBQUc7Z0NBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dDQUMvQixJQUFJLE9BQU8sRUFBRSxJQUFJLFdBQVcsSUFBYSxHQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29DQUNyRSxNQUFNLENBQUM7d0NBQ0gsT0FBTyxFQUFDLE1BQU07d0NBQ2QsTUFBTSxFQUFDLENBQUM7d0NBQ1IsUUFBUSxFQUFDLFFBQVE7cUNBQ3BCLENBQUMsQ0FBQztpQ0FDTjtxQ0FBSztvQ0FDRixNQUFNLENBQUM7d0NBQ0gsT0FBTyxFQUFDLE1BQU07d0NBQ2QsTUFBTSxFQUFDLENBQUM7d0NBQ1IsUUFBUSxFQUFDLFFBQVE7cUNBQ3BCLENBQUMsQ0FBQztpQ0FDTjs0QkFDTCxDQUFDLENBQUM7NEJBRUYsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0NBQzlCLElBQUksVUFBVSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUM7b0NBQzNCLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDO3dDQUNyRCxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO3FDQUNsRjtvQ0FDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO3dDQUMzQixJQUFJOzRDQUNBLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDOzRDQUN6QyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7eUNBQ3ZDO3dDQUFBLE9BQU8sQ0FBQyxFQUFFOzRDQUNQLE1BQU0sQ0FBQztnREFDSCxPQUFPLEVBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtnREFDbEQsTUFBTSxFQUFDLEdBQUc7Z0RBQ1YsUUFBUSxFQUFDLFFBQVE7NkNBQ3BCLENBQUMsQ0FBQzt5Q0FDTjtxQ0FDSjt5Q0FBSzt3Q0FDRixJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFDOzRDQUMxRSxpQkFBaUI7NENBQ2pCLE9BQU87eUNBQ1Y7d0NBQ0QsSUFBSSxHQUFHLFNBQUEsQ0FBQzt3Q0FDUixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDOzRDQUN4QixHQUFHLEdBQUcsTUFBTSxDQUFDO3lDQUNoQjs2Q0FBTTs0Q0FDSCxHQUFHLEdBQUcsT0FBTyxDQUFDO3lDQUNqQjt3Q0FDRCxNQUFNLENBQUM7NENBQ0gsT0FBTyxFQUFDLEdBQUc7NENBQ1gsTUFBTSxFQUFDLFVBQVUsQ0FBQyxNQUFNOzRDQUN4QixRQUFRLEVBQUMsUUFBUTt5Q0FDcEIsQ0FBQyxDQUFDO3FDQUNOO2lDQUNKOzRCQUNMLENBQUMsQ0FBQzs0QkFFRSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs0QkFDdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBQztnQ0FDeEMsR0FBRyxJQUFJLE1BQUksTUFBTSxDQUFDLElBQU0sQ0FBQzs2QkFDNUI7NEJBQ0QsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7NEJBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUU1QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUM7Z0NBQ2IsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUMxQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUM7b0NBQ1osVUFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7aUNBQ3REOzZCQUNKOzRCQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSyxPQUFBLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQzs0QkFDNUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDNUIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O3lCQUN4QixDQUFDLEVBQUM7OztLQUNOO0lBcEdNLDRCQUFpQixHQUFjLFVBQVUsQ0FBQztJQXFHckQsaUJBQUM7Q0F2R0QsQUF1R0MsSUFBQTtBQXZHWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuXHJcblxyXG5pbXBvcnQge0h0dHBPcHRpb259IGZyb20gXCIuL0h0dHBPcHRpb25cIjtcclxuaW1wb3J0IEh0dHBQcm90b2NvbCBmcm9tIFwiLi9IdHRwUHJvdG9jb2xcIjtcclxuaW1wb3J0IHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vLi4vc2NyaXB0L2FwcC9jb25maWcvTmV0d29ya0NvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5sZXQgY29va2llTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuXHJcblxyXG4vKiogaHR0cOm7mOiupOmFjee9riAqL1xyXG5sZXQgaHR0cE9wdGlvbiA9IG5ldyBIdHRwT3B0aW9uKCk7XHJcbmh0dHBPcHRpb24uaG9zdCA9IE5ldHdvcmtDb25maWcuaG9zdDtcclxuaHR0cE9wdGlvbi5wb3J0ID0gNDQzO1xyXG4vLyBodHRwT3B0aW9uLnRpbWVvdXQgPSAzKjYwMDA7XHJcbmh0dHBPcHRpb24udGltZW91dCA9IDE7XHJcbmh0dHBPcHRpb24uY29va2llS2V5ID0gXCJ2ZXJ0eC1jb29raWVcIjtcclxuLy8g5LiN5pSv5oyBRm9ybURhdGHnmoTmtY/op4jlmajnmoTlpITnkIZcclxuaWYodHlwZW9mIEZvcm1EYXRhID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGh0dHBPcHRpb24uaGVhZGVycy5zZXQoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDplJnor6/lpITnkIY6XHJcbiAqIGVycm9yLnN0YXR1cyAw6KGo56S6572R57uc5byC5bi477yMMeihqOekuue9kee7nOi2heaXtiAgPj0yMDDooajnpLpodHRw6K+35rGC54q25oCB56CBXHJcbiAqICovXHJcbmV4cG9ydCBjbGFzcyBIdHRwQ2xpZW50e1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0SHR0cE9wdGlvbjpIdHRwT3B0aW9uID0gaHR0cE9wdGlvbjtcclxuXHJcbiAgICBzdGF0aWMgZGVsZXRlQ29va2llKGNvb2tpZUtleTpzdHJpbmcpe1xyXG4gICAgICAgIGNvb2tpZU1hcC5kZWxldGUoY29va2llS2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0KHByb3RvY29sOkh0dHBQcm90b2NvbCwgaHR0cE9wdGlvbj86SHR0cE9wdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChcIkdFVFwiLCBwcm90b2NvbCwgaHR0cE9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIHBvc3QocHJvdG9jb2w6SHR0cFByb3RvY29sLCBodHRwT3B0aW9uPzpIdHRwT3B0aW9uKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKFwiUE9TVFwiLCBwcm90b2NvbCwgaHR0cE9wdGlvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBzZW5kKG1ldGhvZDpzdHJpbmcsIHByb3RvY29sOkh0dHBQcm90b2NvbCwgaHR0cE9wdGlvbj86SHR0cE9wdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gaHR0cE9wdGlvbiB8fCBIdHRwQ2xpZW50LmRlZmF1bHRIdHRwT3B0aW9uO1xyXG4gICAgICAgICAgICBsZXQgeG1scmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4bWxyZXF1ZXN0LnRpbWVvdXQgPSBvcHRpb24udGltZW91dDtcclxuICAgICAgICAgICAgeG1scmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSwgXCJvbnRpbWVvdXQuLi5cIik7XHJcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCLnvZHnu5zotoXml7ZcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6MSxcclxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDpwcm90b2NvbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4bWxyZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLCBcIm9uZXJyb3IuLi5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHd4ICE9IFwidW5kZWZpbmVkXCIgJiYgKDxzdHJpbmc+ZXJyKS5pbmRleE9mKCd0aW1lb3V0JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTpcIue9kee7nOi2heaXtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6cHJvdG9jb2xcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOlwi572R57uc6ZSZ6K+vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czoxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDpwcm90b2NvbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgeG1scmVxdWVzdC5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhtbHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmNvb2tpZUtleSAmJiAhY29va2llTWFwLmdldChvcHRpb24uY29va2llS2V5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZU1hcC5zZXQob3B0aW9uLmNvb2tpZUtleSwgeG1scmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihvcHRpb24uY29va2llS2V5KSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhtbHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sLmRlY29kZSh4bWxyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHByb3RvY29sLmdldFJlc3BvbnNlRGF0YSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XCLmnI3liqHlmajnirbmgIHlh7rplJk9PT5cIitwcm90b2NvbC5nZXRSZXNwb25zZU1lc3NhZ2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6MjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sOnByb3RvY29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhtbHJlcXVlc3Quc3RhdHVzID09IDAgJiYgZS50aW1lU3RhbXAgJiYgZS50aW1lU3RhbXAgPiB4bWxyZXF1ZXN0LnRpbWVvdXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIOi2heaXtuWcqOi2heaXtuWbnuiwg+mHjOWkhOeQhiAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4bWxyZXF1ZXN0LnN0YXR1cyA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2cgPSBcIue9kee7nOW8guW4uFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnID0gXCLmnI3liqHlmajlvILluLhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTptc2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6eG1scmVxdWVzdC5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDpwcm90b2NvbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgdXJsID0gb3B0aW9uLmhvc3Q7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24ucG9ydCAhPSA4MCAmJiBvcHRpb24ucG9ydCAhPSA0NDMpe1xyXG4gICAgICAgICAgICAgICAgdXJsICs9IGA6JHtvcHRpb24ucG9ydH1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybCArPSBwcm90b2NvbC51cmk7XHJcbiAgICAgICAgICAgIHhtbHJlcXVlc3Qub3BlbihtZXRob2QsdXJsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uY29va2llS2V5KXtcclxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBjb29raWVNYXAuZ2V0KG9wdGlvbi5jb29raWVLZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICB4bWxyZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIob3B0aW9uLmNvb2tpZUtleSwgdmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3B0aW9uLmhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4geG1scmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsdWUpKTtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IHByb3RvY29sLmVuY29kZSgpO1xyXG4gICAgICAgICAgICB4bWxyZXF1ZXN0LnNlbmQocmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==