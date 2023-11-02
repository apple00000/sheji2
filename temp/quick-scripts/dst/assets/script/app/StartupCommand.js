
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/StartupCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL1N0YXJ0dXBDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkM7QUFFN0Msd0RBQWtEO0FBQ2xELHFEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQsdUVBQW9FO0FBQ3BFLHlFQUFvRTtBQUNwRSwyRUFBc0U7QUFDdEUseUVBQW9FO0FBQ3BFLHlFQUFzRTtBQUN0RSxzQ0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtJQWdFQSxDQUFDO0lBL0RTLGdDQUFPLEdBQWI7UUFBYyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOzs7Z0JBQzFCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU0sT0FBTzs7OzRCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHFCQUFTLENBQUMsUUFBUSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3hFLDJCQUFZLENBQUMsTUFBTSxHQUFHLHFCQUFTLENBQUMsTUFBTSxDQUFDOzRCQUN2QyxXQUFXOzRCQUNYLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQWVyQixPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDOzRCQUNoRCwwQkFBMEI7NEJBQzFCLG1DQUFtQzs0QkFDbkMseUNBQXlDOzRCQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQUcsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7NEJBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBRyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOzRCQUVoRCxTQUFTOzRCQUNULElBQUcsQ0FBQyxxQkFBUyxDQUFDLE9BQU8sRUFBQztnQ0FDbEIsT0FBTyxDQUFDLEdBQUcsR0FBRztnQ0FFZCxDQUFDLENBQUM7NkJBQ0w7NEJBRUQsY0FBSSxDQUFDLGlCQUFpQixHQUFHLG1CQUFtQixDQUFDOzRCQUc3QyxhQUFhOzRCQUNiLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFFYixhQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUVyQix5RUFBeUU7NEJBQ3pFOzs7Ozs7aUNBTUs7NEJBRUwsWUFBWTs0QkFDWix5QkFBVyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSw2QkFBbUIsQ0FBQyxDQUFDOzRCQUM3RCx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSw4QkFBb0IsQ0FBQyxDQUFDOzRCQUMvRCx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSw2QkFBbUIsQ0FBQyxDQUFDOzRCQUc5RCxXQUFXOzRCQUVYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O3lCQUNqQixDQUFDLEVBQUM7OztLQUNOO0lBL0RnQixjQUFjO1FBRGxDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztPQUNMLGNBQWMsQ0FnRWxDO0lBQUQscUJBQUM7Q0FoRUQsQUFnRUMsSUFBQTtrQkFoRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcENvbmZpZ30gZnJvbSBcIi4vY29uZmlnL0FwcENvbmZpZ1wiO1xyXG5pbXBvcnQge0lDb21tYW5kfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9JQ29tbWFuZFwiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCB7TXVzaWN9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYXVkaW8vTXVzaWNcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb21wb25lbnQvVmlld1wiO1xyXG5pbXBvcnQge0ludGVyY2VwdG9yfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2ludGVyY2VwdG9yL0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBPcGVuVmlld0ludGVyY2VwdG9yIGZyb20gXCIuL2ludGVyY2VwdG9yL09wZW5WaWV3SW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IENsb3NlVmlld0ludGVyY2VwdG9yIGZyb20gXCIuL2ludGVyY2VwdG9yL0Nsb3NlVmlld0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBMb2FkU2NlbmVJbnRlcmNldG9yIGZyb20gXCIuL2ludGVyY2VwdG9yL0xvYWRTY2VuZUludGVyY2V0b3JcIjtcclxuaW1wb3J0IHtMb2NhbFN0b3JhZ2V9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvcGVyc2lzdGVuY2UvTG9jYWxTdG9yYWdlXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoXCJTdGFydHVwQ29tbWFuZFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydHVwQ29tbWFuZCBpbXBsZW1lbnRzIElDb21tYW5kIHtcclxuICAgIGFzeW5jIGV4ZWN1dGUoLi4uYXJncyk6UHJvbWlzZXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnR1cENvbW1hbmQ9PT5cIiwgQXBwQ29uZmlnLmdhbWVOYW1lLCBBcHBDb25maWcudmVyc2lvbik7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZS5wcmVmaXggPSBBcHBDb25maWcuR2FtZUlEO1xyXG4gICAgICAgICAgICAvKiog6K6+572u5bin546HICovXHJcbiAgICAgICAgICAgIGNjLmdhbWUuc2V0RnJhbWVSYXRlKDYwKTtcclxuICAgICAgICAgICAgLyoqICDniannkIblvJXmk47phY3nva4gKi9cclxuICAgICAgICAgICAgLypsZXQgcGh5c2ljc01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgICAgICBwaHlzaWNzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcGh5c2ljc01hbmFnZXIuZW5hYmxlZEFjY3VtdWxhdG9yID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgcGh5c2ljc01hbmFnZXIuZGVidWdEcmF3RmxhZ3MgPVxyXG4gICAgICAgICAgICAgICAgMDtcclxuICAgICAgICAgICAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9hYWJiQml0IHxcclxuICAgICAgICAgICAgLy9jYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2pvaW50Qml0IHxcclxuICAgICAgICAgICAgLy9jYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3NoYXBlQml0XHJcbiAgICAgICAgICAgIDsqL1xyXG5cclxuICAgICAgICAgICAgLyoqIOeisOaSnuajgOa1i+mFjee9riAqL1xyXG4gICAgICAgICAgICBsZXQgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcclxuICAgICAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4dC5pc0lwaG9uZVgsIFwiaXNJcGhvbmVYPT09PlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXh0LmlzTGFuZHNjYXBlLCBcImlzTGFuZHNjYXBlPT09PlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8v5YWz6ZetZGVidWdcclxuICAgICAgICAgICAgaWYoIUFwcENvbmZpZy5pc0RlYnVnKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZpZXcuY2xpY2tTb3VuZENvbW1hbmQgPSBcIkNsaWNrU291bmRDb21tYW5kXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqIOivu+WPluWjsOmfs+mFjee9riAqL1xyXG4gICAgICAgICAgICBNdXNpYy5pbml0KCk7XHJcblxyXG4gICAgICAgICAgICBXb3JsZC5TdG9yYWdlLmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8qKiDlkI7lj7DliIflhaXliIflh7rlm57osIMtLS3lvJXmk47lt7Lnu4/lgZrkuobmmoLlgZzmuLjmiI/kuLvlvqrnjq/jgILljIXlkKvvvJrmuLjmiI/pgLvovpHvvIzmuLLmn5PvvIzkuovku7blpITnkIbvvIzog4zmma/pn7PkuZDlkozmiYDmnInpn7PmlYjjgILmiYDku6XmiJHku6zkuIDoiKzmg4XlhrXkuIvkuI3pnIDopoHlgZrku4DkuYggKi9cclxuICAgICAgICAgICAgLypjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYy5nYW1lLkVWRU5UX1NIT1c9PT09PT09PT09PT0+XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNjLmdhbWUuRVZFTlRfSElERT09PT09PT09PT09PT5cIik7XHJcbiAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICAvKiog5rOo5YaM5oum5oiq5ZmoICovXHJcbiAgICAgICAgICAgIEludGVyY2VwdG9yLnJlZ2lzdGVyKFwiT3BlblZpZXdDb21tYW5kXCIsIE9wZW5WaWV3SW50ZXJjZXB0b3IpO1xyXG4gICAgICAgICAgICBJbnRlcmNlcHRvci5yZWdpc3RlcihcIkNsb3NlVmlld0NvbW1hbmRcIiwgQ2xvc2VWaWV3SW50ZXJjZXB0b3IpO1xyXG4gICAgICAgICAgICBJbnRlcmNlcHRvci5yZWdpc3RlcihcIkxvYWRTY2VuZUNvbW1hbmRcIiwgTG9hZFNjZW5lSW50ZXJjZXRvcik7XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqIOW8gOWni+WKoOi9vSAqL1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=