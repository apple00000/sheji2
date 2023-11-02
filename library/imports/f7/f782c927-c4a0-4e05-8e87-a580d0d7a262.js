"use strict";
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