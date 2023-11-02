
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/interceptor/LoadSceneIntercetor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2ludGVyY2VwdG9yL0xvYWRTY2VuZUludGVyY2V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBR25HLDJEQUFzRDtBQUN0RCxtREFBZ0Q7QUFDaEQsd0RBQXFEO0FBQ3JELHlEQUFzRDtBQUN0RCw4Q0FBeUM7QUFFbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtJQStDQSxDQUFDO0lBN0NHOztTQUVLO0lBQ0MsdUNBQVMsR0FBZjtRQUFnQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOzs7Z0JBQzVCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU0sT0FBTyxFQUFFLE1BQU07Ozs7O29DQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNwQixDQUFBLFNBQVMsSUFBSSxXQUFXLENBQUEsRUFBeEIsd0JBQXdCO29DQUN4QixxQkFBTSxnQkFBTSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFBOztvQ0FBdEQsU0FBc0QsQ0FBQzs7O29DQUNyRCxJQUFJLFNBQVMsSUFBSSxXQUFXLEVBQUM7d0NBQy9CLElBQUksNkJBQWEsQ0FBQyxhQUFhLEVBQUM7NENBQzVCLGlCQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7eUNBQ3pCO3FDQUNKOzs7b0NBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O3lCQUNqQixDQUFDLEVBQUM7OztLQUNOO0lBQ0Q7O1NBRUs7SUFDQyx3Q0FBVSxHQUFoQixVQUFpQixHQUFPO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7dUNBQUUsT0FBTzs7O2dCQUN0QyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOzs7NEJBQ2pDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hCLElBQUksU0FBUyxJQUFJLFdBQVcsRUFBQztnQ0FDekIsV0FBVztnQ0FDWCxtQ0FBbUM7Z0NBQ25DLGtCQUFrQjtnQ0FFbEIsYUFBYTtnQ0FDZDs7Ozs7OzZFQU02Qzs2QkFFL0M7aUNBQUssSUFBSSxTQUFTLElBQUksV0FBVyxFQUFDO2dDQUMvQixXQUFXO2dDQUNYLGFBQUssQ0FBQyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDbkM7aUNBQUssSUFBSSxTQUFTLElBQUksZUFBZSxFQUFDO2dDQUNuQyxtQkFBbUI7NkJBQ3RCOzRCQUNELE9BQU8sRUFBRSxDQUFDOzs7eUJBQ2IsQ0FBQyxFQUFDOzs7S0FDTjtJQTlDZ0IsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0ErQ3ZDO0lBQUQsMEJBQUM7Q0EvQ0QsQUErQ0MsSUFBQTtrQkEvQ29CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHtJQ29tbWFuZEludGVyY2VwdG9yfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ludGVyY2VwdG9yL0NvbW1hbmRJbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQge011c2ljUGF0aHN9IGZyb20gXCIuLi9jb25maWcvTXVzaWNQYXRoc1wiO1xyXG5pbXBvcnQge011c2ljfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2F1ZGlvL011c2ljXCI7XHJcbmltcG9ydCB7TmV0d29ya0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9OZXR3b3JrQ29uZmlnXCI7XHJcbmltcG9ydCBOZXR3b3JrIGZyb20gXCIuLi9uZXR3b3JrL05ldHdvcmtcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lSW50ZXJjZXRvciBpbXBsZW1lbnRzIElDb21tYW5kSW50ZXJjZXB0b3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Zy65pmv5LmL5YmN5aSE55CGXHJcbiAgICAgKiAqL1xyXG4gICAgYXN5bmMgcHJlSGFuZGxlKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVOYW1lID0gYXJnc1swXTtcclxuICAgICAgICAgICAgaWYgKHNjZW5lTmFtZSA9PSBcIkdhbWVTY2VuZVwiKXtcclxuICAgICAgICAgICAgICAgIGF3YWl0IEZhY2FkZS5leGVjdXRlQ29tbWFuZChcIlByZWxvYWRHYW1lU2NlbmVDb21tYW5kXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2NlbmVOYW1lID09IFwiSG9tZVNjZW5lXCIpe1xyXG4gICAgICAgICAgICAgICAgaWYgKE5ldHdvcmtDb25maWcuY29ubmVjdFNlcnZlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV0d29yay5wdXNoU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWcuuaZr+WujOaIkOS5i+WQjuWkhOeQhlxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIHBvc3RIYW5kbGUocmVzOmFueSwgLi4uYXJncyk6UHJvbWlzZXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2NlbmVOYW1lID0gYXJnc1swXTtcclxuICAgICAgICAgICAgaWYgKHNjZW5lTmFtZSA9PSBcIkhvbWVTY2VuZVwiKXtcclxuICAgICAgICAgICAgICAgIC8qKiDog4zmma/pn7PkuZAgKi9cclxuICAgICAgICAgICAgICAgIC8vIE11c2ljLnNldEJnbShNdXNpY1BhdGhzLkhvbWVCZyk7XHJcbiAgICAgICAgICAgICAgICAvKiog5Yqg6L295a2Q5bel56iL5aW95Y+L5o6S6KGM5pWw5o2uICovXHJcblxyXG4gICAgICAgICAgICAgICAgLyoqIOaYvuekuuaWsOaJi+W8leWvvCAqL1xyXG4gICAgICAgICAgICAgICAvKiBsZXQgcHJlZmFiID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9uZXdiaWVcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGxldCBob21lTm9kZSA9IEZhY2FkZS5jYW52YXNOb2RlLmdldENoaWxkQnlOYW1lKFwiSG9tZVNjZW5lXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0R2FtZU5vZGUgPSBob21lTm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJ0R2FtZVwiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBzdGFydEdhbWVOb2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoRmFjYWRlLmNhbnZhc05vZGUpO1xyXG4gICAgICAgICAgICAgICAgTGlmZUN5Y2xlLm9uRGVzdHJveUZvbGxvdyhub2RlLCBob21lTm9kZSk7Ki9cclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChzY2VuZU5hbWUgPT0gXCJHYW1lU2NlbmVcIil7XHJcbiAgICAgICAgICAgICAgICAvKiog6IOM5pmv6Z+z5LmQICovXHJcbiAgICAgICAgICAgICAgICBNdXNpYy5zZXRCZ20oTXVzaWNQYXRocy5HYW1lQmcpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAoc2NlbmVOYW1lID09IFwiR2FtZU92ZXJTY2VuZVwiKXtcclxuICAgICAgICAgICAgICAgIC8vIE11c2ljLnN0b3BCR00oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19