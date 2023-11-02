"use strict";
cc._RF.push(module, '1f4dfBMj31PKbFLl7ohviZN', 'StartupCommand');
// script/app/StartupCommand.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./config/AppConfig");
var Extend_1 = require("../../framework/extend/Extend");
var Music_1 = require("../../framework/audio/Music");
var View_1 = require("../../framework/component/View");
var Interceptor_1 = require("../../framework/interceptor/Interceptor");
var OpenViewInterceptor_1 = require("./interceptor/OpenViewInterceptor");
var CloseViewInterceptor_1 = require("./interceptor/CloseViewInterceptor");
var LoadSceneIntercetor_1 = require("./interceptor/LoadSceneIntercetor");
var LocalStorage_1 = require("../../framework/persistence/LocalStorage");
var World_1 = require("./info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StartupCommand = /** @class */ (function () {
    function StartupCommand() {
    }
    StartupCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var manager;
                        return __generator(this, function (_a) {
                            console.log("StartupCommand==>", AppConfig_1.AppConfig.gameName, AppConfig_1.AppConfig.version);
                            LocalStorage_1.LocalStorage.prefix = AppConfig_1.AppConfig.GameID;
                            /** 设置帧率 */
                            cc.game.setFrameRate(60);
                            manager = cc.director.getCollisionManager();
                            // manager.enabled = true;
                            // manager.enabledDebugDraw = true;
                            // manager.enabledDrawBoundingBox = true;
                            console.log(Extend_1.ext.isIphoneX, "isIphoneX===>");
                            console.log(Extend_1.ext.isLandscape, "isLandscape===>");
                            //关闭debug
                            if (!AppConfig_1.AppConfig.isDebug) {
                                console.log = function () {
                                };
                            }
                            View_1.default.clickSoundCommand = "ClickSoundCommand";
                            /** 读取声音配置 */
                            Music_1.Music.init();
                            World_1.World.Storage.init();
                            /** 后台切入切出回调---引擎已经做了暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。所以我们一般情况下不需要做什么 */
                            /*cc.game.on(cc.game.EVENT_SHOW, function () {
                                console.log("cc.game.EVENT_SHOW============>");
                            });
                
                            cc.game.on(cc.game.EVENT_HIDE, function () {
                                console.log("cc.game.EVENT_HIDE============>");
                            });*/
                            /** 注册拦截器 */
                            Interceptor_1.Interceptor.register("OpenViewCommand", OpenViewInterceptor_1.default);
                            Interceptor_1.Interceptor.register("CloseViewCommand", CloseViewInterceptor_1.default);
                            Interceptor_1.Interceptor.register("LoadSceneCommand", LoadSceneIntercetor_1.default);
                            /** 开始加载 */
                            resolve(true);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    StartupCommand = __decorate([
        ccclass("StartupCommand")
    ], StartupCommand);
    return StartupCommand;
}());
exports.default = StartupCommand;

cc._RF.pop();