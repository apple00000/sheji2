"use strict";
cc._RF.push(module, '852b8t92dhL855GnoTwHCmW', 'LoadSceneIntercetor');
// script/app/interceptor/LoadSceneIntercetor.ts

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
var Facade_1 = require("../../../framework/facade/Facade");
var MusicPaths_1 = require("../config/MusicPaths");
var Music_1 = require("../../../framework/audio/Music");
var NetworkConfig_1 = require("../config/NetworkConfig");
var Network_1 = require("../network/Network");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadSceneIntercetor = /** @class */ (function () {
    function LoadSceneIntercetor() {
    }
    /**
     * 加载场景之前处理
     * */
    LoadSceneIntercetor.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var sceneName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sceneName = args[0];
                                    if (!(sceneName == "GameScene")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Facade_1.default.executeCommand("PreloadGameSceneCommand")];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    if (sceneName == "HomeScene") {
                                        if (NetworkConfig_1.NetworkConfig.connectServer) {
                                            Network_1.default.pushStorage();
                                        }
                                    }
                                    _a.label = 3;
                                case 3:
                                    resolve(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 加载场景完成之后处理
     * */
    LoadSceneIntercetor.prototype.postHandle = function (res) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var sceneName;
                        return __generator(this, function (_a) {
                            sceneName = args[0];
                            if (sceneName == "HomeScene") {
                                /** 背景音乐 */
                                // Music.setBgm(MusicPaths.HomeBg);
                                /** 加载子工程好友排行数据 */
                                /** 显示新手引导 */
                                /* let prefab = await cc.loader.loadResAwait("prefab/newbie", cc.Prefab);
                                 let node = cc.instantiate(prefab);
                                 let homeNode = Facade.canvasNode.getChildByName("HomeScene");
                                 let startGameNode = homeNode.getChildByName("startGame");
                                 node.position = startGameNode.position;
                                 node.setParent(Facade.canvasNode);
                                 LifeCycle.onDestroyFollow(node, homeNode);*/
                            }
                            else if (sceneName == "GameScene") {
                                /** 背景音乐 */
                                Music_1.Music.setBgm(MusicPaths_1.MusicPaths.GameBg);
                            }
                            else if (sceneName == "GameOverScene") {
                                // Music.stopBGM();
                            }
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    LoadSceneIntercetor = __decorate([
        ccclass
    ], LoadSceneIntercetor);
    return LoadSceneIntercetor;
}());
exports.default = LoadSceneIntercetor;

cc._RF.pop();