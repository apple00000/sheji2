
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/network/Network.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f782cknxKBOBY6HpYDQ16Ji', 'Network');
// script/app/network/Network.ts

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
var World_1 = require("../info/World");
var AppConfig_1 = require("../config/AppConfig");
var HttpProtocol_1 = require("../../../framework/http/HttpProtocol");
var HttpClient_1 = require("../../../framework/http/HttpClient");
var LocalStorage_1 = require("../../../framework/persistence/LocalStorage");
var Facade_1 = require("../../../framework/facade/Facade");
var NetworkConfig_1 = require("../config/NetworkConfig");
var Network = /** @class */ (function () {
    function Network() {
    }
    Network.post = function (protocol, httpOption) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // SELF
                return [2 /*return*/];
            });
        });
    };
    Network.login = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Network.uploadInfo = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Network.initData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!NetworkConfig_1.NetworkConfig.connectServer) return [3 /*break*/, 2];
                        return [4 /*yield*/, Network.initGameData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        World_1.World.Storage.init();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Network.uploadLv = function (lv) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/addRecord";
                                    protocol.request = { gameId: AppConfig_1.AppConfig.GameID, key: AppConfig_1.AppConfig.rankKey, score: lv };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    this.pushStorage();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.buyItem = function (itemId, num) {
        if (num === void 0) { num = 1; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/mall/buy";
                                    protocol.request = { id: itemId, num: num };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.syncBought = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, list;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/user/items";
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    list = _a.sent();
                                    resolve(list);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.totalRankList = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, list, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/getTotalRank";
                                    protocol.request = { gameId: AppConfig_1.AppConfig.GameID, key: AppConfig_1.AppConfig.rankKey };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 2:
                                    list = (_a.sent()).list;
                                    resolve(list);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.addDiamond = function (add) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, diamond;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/user/addDiamond";
                                    protocol.request = { num: add };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    diamond = (_a.sent()).diamond;
                                    resolve(diamond);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.expendDiamond = function (expend) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, diamond;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/user/expendDiamond";
                                    protocol.request = { num: expend };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    diamond = (_a.sent()).diamond;
                                    resolve(diamond);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.onShare = function (shareKey, playerId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(World_1.World.My.playerId != 0)) return [3 /*break*/, 2];
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/onShare";
                                    protocol.request = { shareKey: shareKey, fromPlayerId: playerId };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.getShareList = function (shareKey) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, list;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/getShareList";
                                    protocol.request = { shareKey: shareKey };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    list = _a.sent();
                                    resolve(list);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.takeShareReward = function (shareKey, playerId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/receiveSharedRecord";
                                    protocol.request = { shareKey: shareKey, receivePlayerId: playerId };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.setStorage = function (key, value) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/setStorage";
                                    protocol.request = { key: key, value: value };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.multiSetStorage = function (pairs) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/multiSetStorage";
                                    protocol.request = { pairs: JSON.stringify(pairs) };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    _a.sent();
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.getStorage = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/getStorage";
                                    protocol.request = { key: key };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    data = _a.sent();
                                    resolve(data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.multiGetStorage = function (keys) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var protocol, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    protocol = new HttpProtocol_1.default();
                                    protocol.uri = "/game/multiGetStorage";
                                    protocol.request = { keys: JSON.stringify(keys) };
                                    return [4 /*yield*/, Network.post(protocol)];
                                case 1:
                                    data = _a.sent();
                                    resolve(data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Network.initGameData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var keys, values, key, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    keys = World_1.World.Storage.allKeys().filter(function (value) { return !World_1.World.updateStorageKeys.includes(value); });
                                    return [4 /*yield*/, Network.multiGetStorage(keys)];
                                case 1:
                                    values = _a.sent();
                                    for (key in values) {
                                        data = values[key];
                                        /** 字符串类型则不转成int */
                                        if (typeof World_1.World.Storage["_" + key] == "number") {
                                            data = parseInt(data);
                                        }
                                        else if (typeof World_1.World.Storage["_" + key] == "boolean") {
                                            data = data.toLowerCase() == "true";
                                        }
                                        World_1.World.Storage[key] = data;
                                    }
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /** 推送缓存里的数据到远程服务器 */
    Network.pushStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // SELF
                return [2 /*return*/];
            });
        });
    };
    return Network;
}());
exports.default = Network;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL25ldHdvcmsvTmV0d29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7QUFHbkcsdUNBQW9DO0FBQ3BDLGlEQUE4QztBQUM5QyxxRUFBZ0U7QUFDaEUsaUVBQThEO0FBRTlELDRFQUF5RTtBQUN6RSwyREFBc0Q7QUFDdEQseURBQXNEO0FBRXREO0lBQUE7SUEwT0EsQ0FBQztJQXhPZ0IsWUFBSSxHQUFqQixVQUFrQixRQUFxQixFQUFFLFVBQXNCO3VDQUFFLE9BQU87OztnQkFDcEUsT0FBTztnQkFDUCxzQkFBTTs7O0tBNEJUO0lBRVksYUFBSyxHQUFsQjt1Q0FBcUIsT0FBTzs7O2dCQUN4QixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFNLE9BQU87OzRCQUM1QixPQUFPLEVBQUUsQ0FBQzs7O3lCQUNiLENBQUMsRUFBQzs7O0tBQ047SUFFWSxrQkFBVSxHQUF2Qjt1Q0FBMEIsT0FBTzs7O2dCQUM3QixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOzs0QkFDckMsT0FBTyxFQUFFLENBQUM7Ozt5QkFDYixDQUFDLEVBQUM7OztLQUNOO0lBRVksZ0JBQVEsR0FBckI7Ozs7OzZCQUNRLDZCQUFhLENBQUMsYUFBYSxFQUEzQix3QkFBMkI7d0JBQzNCLHFCQUFNLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7Ozt3QkFFN0IsYUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0tBRTVCO0lBRVksZ0JBQVEsR0FBckIsVUFBc0IsRUFBUzt1Q0FBRSxPQUFPOzs7Z0JBQ3BDLHNCQUFPLElBQUksT0FBTyxDQUFDLFVB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QVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5Q0FDekI7NkNBQUssSUFBSSxPQUFPLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBQzs0Q0FDakQsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxNQUFNLENBQUM7eUNBQ3ZDO3dDQUNELGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO3FDQUM3QjtvQ0FDRCxPQUFPLEVBQUUsQ0FBQzs7Ozt5QkFDYixDQUFDLEVBQUM7OztLQUNOO0lBRUQscUJBQXFCO0lBQ0QsbUJBQVcsR0FBL0I7Ozs7Z0JBQ0ksT0FBTztnQkFDUCxzQkFBTTs7O0tBa0JUO0lBQ0wsY0FBQztBQUFELENBMU9BLEFBME9DLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9BcHBDb25maWdcIjtcclxuaW1wb3J0IEh0dHBQcm90b2NvbCBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2h0dHAvSHR0cFByb3RvY29sXCI7XHJcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9odHRwL0h0dHBDbGllbnRcIjtcclxuaW1wb3J0IHtIdHRwT3B0aW9ufSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2h0dHAvSHR0cE9wdGlvblwiO1xyXG5pbXBvcnQge0xvY2FsU3RvcmFnZX0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9wZXJzaXN0ZW5jZS9Mb2NhbFN0b3JhZ2VcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9GYWNhZGVcIjtcclxuaW1wb3J0IHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vY29uZmlnL05ldHdvcmtDb25maWdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmsge1xyXG5cclxuICAgIHN0YXRpYyBhc3luYyBwb3N0KHByb3RvY29sOkh0dHBQcm90b2NvbCwgaHR0cE9wdGlvbj86SHR0cE9wdGlvbik6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIC8vIFNFTEZcclxuICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBIdHRwQ2xpZW50LnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLCBcIue9kee7nOWHuumUmeS6huKApuKApuKApuKAplwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLnN0YXR1cyA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoJ1Nob3dUaXBzQ29tbWFuZCcsIGAke2UubWVzc2FnZX066K+35qOA5p+l572R57uc6L+e5o6lYCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoZS5zdGF0dXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKCdTaG93VGlwc0NvbW1hbmQnLCBgJHtlLm1lc3NhZ2V9OnVyaT0ke2UucHJvdG9jb2wudXJpfWApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcm90b2NvbC5nZXRSZXNwb25zZVN0YXR1cygpID09IC0yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIG5vdCBsb2dpbiovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IE5ldHdvcmsubG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBOZXR3b3JrLnBvc3QoZS5wcm90b2NvbCwgaHR0cE9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZhY2FkZS5leGVjdXRlQ29tbWFuZCgnU2hvd1RpcHNDb21tYW5kJywgYCR7ZS5tZXNzYWdlfTp1cmk9JHtlLnByb3RvY29sLnVyaX0gc3RhdHVzPSR7ZS5wcm90b2NvbC5nZXRSZXNwb25zZVN0YXR1cygpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoJ1Nob3dUaXBzQ29tbWFuZCcsIGAke2UubWVzc2FnZX06dXJpPSR7ZS5wcm90b2NvbC51cml9IHN0YXR1cz0ke2Uuc3RhdHVzfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGxvZ2luKCk6UHJvbWlzZXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgdXBsb2FkSW5mbygpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBpbml0RGF0YSgpe1xyXG4gICAgICAgIGlmIChOZXR3b3JrQ29uZmlnLmNvbm5lY3RTZXJ2ZXIpe1xyXG4gICAgICAgICAgICBhd2FpdCBOZXR3b3JrLmluaXRHYW1lRGF0YSgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgV29ybGQuU3RvcmFnZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyB1cGxvYWRMdihsdjpudW1iZXIpOlByb21pc2U8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvdG9jb2wgPSBuZXcgSHR0cFByb3RvY29sKCk7XHJcbiAgICAgICAgICAgIHByb3RvY29sLnVyaSA9IFwiL2dhbWUvYWRkUmVjb3JkXCI7XHJcbiAgICAgICAgICAgIHByb3RvY29sLnJlcXVlc3QgPSB7Z2FtZUlkOkFwcENvbmZpZy5HYW1lSUQsIGtleTpBcHBDb25maWcucmFua0tleSwgc2NvcmU6bHZ9O1xyXG4gICAgICAgICAgICBhd2FpdCBOZXR3b3JrLnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGJ1eUl0ZW0oaXRlbUlkOm51bWJlciwgbnVtOm51bWJlciA9IDEpOlByb21pc2U8YW55PntcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IG5ldyBIdHRwUHJvdG9jb2woKTtcclxuICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS9tYWxsL2J1eVwiO1xyXG4gICAgICAgICAgICBwcm90b2NvbC5yZXF1ZXN0ID0ge2lkOml0ZW1JZCwgbnVtOm51bX07XHJcbiAgICAgICAgICAgIGF3YWl0IE5ldHdvcmsucG9zdChwcm90b2NvbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgc3luY0JvdWdodCgpOlByb21pc2U8QXJyYXk8YW55Pj57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5PGFueT4+KGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvdG9jb2wgPSBuZXcgSHR0cFByb3RvY29sKCk7XHJcbiAgICAgICAgICAgIHByb3RvY29sLnVyaSA9IFwiL2dhbWUvdXNlci9pdGVtc1wiO1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IDxBcnJheTxhbnk+PmF3YWl0IE5ldHdvcmsucG9zdChwcm90b2NvbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIHRvdGFsUmFua0xpc3QoKTpQcm9taXNlPEFycmF5PGFueT4+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxBcnJheTxhbnk+Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IG5ldyBIdHRwUHJvdG9jb2woKTtcclxuICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS9nZXRUb3RhbFJhbmtcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtnYW1lSWQ6IEFwcENvbmZpZy5HYW1lSUQsIGtleTpBcHBDb25maWcucmFua0tleX07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQge2xpc3R9ID0gYXdhaXQgTmV0d29yay5wb3N0KHByb3RvY29sKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBhZGREaWFtb25kKGFkZDpudW1iZXIpOlByb21pc2U8bnVtYmVyPntcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IG5ldyBIdHRwUHJvdG9jb2woKTtcclxuICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS91c2VyL2FkZERpYW1vbmRcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtudW06YWRkfTtcclxuICAgICAgICAgICAgbGV0IHtkaWFtb25kfSA9IGF3YWl0IE5ldHdvcmsucG9zdChwcm90b2NvbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGlhbW9uZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGV4cGVuZERpYW1vbmQoZXhwZW5kOm51bWJlcik6UHJvbWlzZTxudW1iZXI+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3RvY29sID0gbmV3IEh0dHBQcm90b2NvbCgpO1xyXG4gICAgICAgICAgICBwcm90b2NvbC51cmkgPSBcIi9nYW1lL3VzZXIvZXhwZW5kRGlhbW9uZFwiO1xyXG4gICAgICAgICAgICBwcm90b2NvbC5yZXF1ZXN0ID0ge251bTpleHBlbmR9O1xyXG4gICAgICAgICAgICBsZXQge2RpYW1vbmR9ID0gYXdhaXQgTmV0d29yay5wb3N0KHByb3RvY29sKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShkaWFtb25kKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgb25TaGFyZShzaGFyZUtleTogc3RyaW5nLCBwbGF5ZXJJZDogbnVtYmVyKTogUHJvbWlzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKFdvcmxkLk15LnBsYXllcklkICE9IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3RvY29sID0gbmV3IEh0dHBQcm90b2NvbCgpO1xyXG4gICAgICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS9vblNoYXJlXCI7XHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbC5yZXF1ZXN0ID0ge3NoYXJlS2V5OiBzaGFyZUtleSwgZnJvbVBsYXllcklkOiBwbGF5ZXJJZH07XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBOZXR3b3JrLnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0U2hhcmVMaXN0KHNoYXJlS2V5OiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IG5ldyBIdHRwUHJvdG9jb2woKTtcclxuICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS9nZXRTaGFyZUxpc3RcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtzaGFyZUtleTogc2hhcmVLZXl9O1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGF3YWl0IE5ldHdvcmsucG9zdChwcm90b2NvbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIHRha2VTaGFyZVJld2FyZChzaGFyZUtleTogc3RyaW5nLCBwbGF5ZXJJZDogbnVtYmVyKTogUHJvbWlzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3RvY29sID0gbmV3IEh0dHBQcm90b2NvbCgpO1xyXG4gICAgICAgICAgICBwcm90b2NvbC51cmkgPSBcIi9nYW1lL3JlY2VpdmVTaGFyZWRSZWNvcmRcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtzaGFyZUtleTogc2hhcmVLZXksIHJlY2VpdmVQbGF5ZXJJZDogcGxheWVySWR9O1xyXG4gICAgICAgICAgICBhd2FpdCBOZXR3b3JrLnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgc2V0U3RvcmFnZShrZXk6c3RyaW5nLCB2YWx1ZTpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3RvY29sID0gbmV3IEh0dHBQcm90b2NvbCgpO1xyXG4gICAgICAgICAgICBwcm90b2NvbC51cmkgPSBcIi9nYW1lL3NldFN0b3JhZ2VcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtrZXk6a2V5LCB2YWx1ZTp2YWx1ZX07XHJcbiAgICAgICAgICAgIGF3YWl0IE5ldHdvcmsucG9zdChwcm90b2NvbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgbXVsdGlTZXRTdG9yYWdlKHBhaXJzOktWRGF0YTxzdHJpbmc+KTpQcm9taXNlPGJvb2xlYW4+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbCA9IG5ldyBIdHRwUHJvdG9jb2woKTtcclxuICAgICAgICAgICAgcHJvdG9jb2wudXJpID0gXCIvZ2FtZS9tdWx0aVNldFN0b3JhZ2VcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtwYWlyczpKU09OLnN0cmluZ2lmeShwYWlycyl9O1xyXG4gICAgICAgICAgICBhd2FpdCBOZXR3b3JrLnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGdldFN0b3JhZ2Uoa2V5OnN0cmluZyk6UHJvbWlzZTxzdHJpbmc+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb3RvY29sID0gbmV3IEh0dHBQcm90b2NvbCgpO1xyXG4gICAgICAgICAgICBwcm90b2NvbC51cmkgPSBcIi9nYW1lL2dldFN0b3JhZ2VcIjtcclxuICAgICAgICAgICAgcHJvdG9jb2wucmVxdWVzdCA9IHtrZXk6a2V5fTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBOZXR3b3JrLnBvc3QocHJvdG9jb2wpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG11bHRpR2V0U3RvcmFnZShrZXlzOkFycmF5PHN0cmluZz4pOlByb21pc2U8S1ZEYXRhPHN0cmluZz4+e1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxLVkRhdGE8c3RyaW5nPj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvdG9jb2wgPSBuZXcgSHR0cFByb3RvY29sKCk7XHJcbiAgICAgICAgICAgIHByb3RvY29sLnVyaSA9IFwiL2dhbWUvbXVsdGlHZXRTdG9yYWdlXCI7XHJcbiAgICAgICAgICAgIHByb3RvY29sLnJlcXVlc3QgPSB7a2V5czpKU09OLnN0cmluZ2lmeShrZXlzKX07XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgTmV0d29yay5wb3N0KHByb3RvY29sKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpbml0R2FtZURhdGEoKTpQcm9taXNle1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8qKiDku6XmnI3liqHlmajkuLrkuLss6Zmk5LqGdXBkYXRlU3RvcmFnZUtleXPph4zpnaLmsqHmm7TmlrDnmoTmlbDmja7ku6XlrqLmiLfnq6/kuLrkuLsgKiovXHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gV29ybGQuU3RvcmFnZS5hbGxLZXlzKCkuZmlsdGVyKHZhbHVlID0+ICFXb3JsZC51cGRhdGVTdG9yYWdlS2V5cy5pbmNsdWRlcyh2YWx1ZSkpO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gYXdhaXQgTmV0d29yay5tdWx0aUdldFN0b3JhZ2Uoa2V5cyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB2YWx1ZXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZXNba2V5XTtcclxuICAgICAgICAgICAgICAgIC8qKiDlrZfnrKbkuLLnsbvlnovliJnkuI3ovazmiJBpbnQgKi9cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgV29ybGQuU3RvcmFnZVtcIl9cIitrZXldID09IFwibnVtYmVyXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUludChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh0eXBlb2YgV29ybGQuU3RvcmFnZVtcIl9cIitrZXldID09IFwiYm9vbGVhblwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS50b0xvd2VyQ2FzZSgpID09IFwidHJ1ZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgV29ybGQuU3RvcmFnZVtrZXldID0gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaOqOmAgee8k+WtmOmHjOeahOaVsOaNruWIsOi/nOeoi+acjeWKoeWZqCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBwdXNoU3RvcmFnZSgpe1xyXG4gICAgICAgIC8vIFNFTEZcclxuICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT5wdXNoU3RvcmFnZVwiLCBXb3JsZC51cGRhdGVTdG9yYWdlS2V5cyk7XHJcbiAgICAgICAgICAgIGlmIChXb3JsZC51cGRhdGVTdG9yYWdlS2V5cy5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga3ZEYXRhcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgV29ybGQucHVzaFN0b3JhZ2VLZXlzID0gV29ybGQudXBkYXRlU3RvcmFnZUtleXM7XHJcbiAgICAgICAgICAgICAgICBXb3JsZC51cGRhdGVTdG9yYWdlS2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgV29ybGQucHVzaFN0b3JhZ2VLZXlzLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGt2RGF0YXNbdmFsdWVdID0gV29ybGQuU3RvcmFnZVt2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IE5ldHdvcmsubXVsdGlTZXRTdG9yYWdlKGt2RGF0YXMpO1xyXG4gICAgICAgICAgICAgICAgV29ybGQucHVzaFN0b3JhZ2VLZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICBMb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKFwidXBkYXRlS1ZEYXRhXCIsIEpTT04uc3RyaW5naWZ5KFdvcmxkLnVwZGF0ZVN0b3JhZ2VLZXlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=