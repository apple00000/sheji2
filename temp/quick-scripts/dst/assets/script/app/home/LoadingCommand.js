
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/LoadingCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec9e9EHzntFyYuA7kcVJd7f', 'LoadingCommand');
// script/app/home/LoadingCommand.ts

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
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingCommand = /** @class */ (function () {
    function LoadingCommand() {
    }
    LoadingCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        console.log("LoadingCommand");
                        var list = [];
                        /** 初始化隔离层prefab */
                        list.push(ExcelConfig_1.ExcelConfig.loadAllExcel("data/"));
                        for (var i = 0; i < 8; i++) {
                            list.push(cc.loader.loadResAwait("prefab/entities/enemy/enemy" + (i + 1), cc.Prefab));
                        }
                        list.push(cc.loader.loadResAwait("prefab/guideCircle"));
                        list.push(cc.loader.loadResAwait("prefab/guideSke"));
                        list.push(Facade_1.default.initSeparationLayer("prefab/separationLayer"));
                        list.push(Facade_1.default.initTextTips("prefab/textTips"));
                        list.push(Facade_1.default.initTextTips("prefab/color"));
                        list.push(cc.loader.loadResAwait("frame_fy005", cc.SpriteFrame));
                        list.push(cc.loader.loadResDirAwait("sound/"));
                        /** 加载一些不是很紧急的资源 */
                        cc.loader.loadRes("prefab/exchange");
                        cc.loader.loadRes("prefab/friendRank");
                        cc.loader.loadRes("prefab/invites");
                        cc.loader.loadRes("prefab/props");
                        cc.loader.loadRes("prefab/roleSupply");
                        cc.loader.loadRes("prefab/settings");
                        cc.loader.loadRes("prefab/takeJackpot");
                        cc.loader.loadRes("prefab/tips");
                        cc.loader.loadRes("prefab/recommend");
                        Promise.all(list).then(function () {
                            console.log('加载完成...');
                            cc.sys.garbageCollect();
                            resolve();
                        }).catch(function (err) {
                            console.error(err);
                        });
                    })];
            });
        });
    };
    LoadingCommand = __decorate([
        ccclass("LoadingCommand")
    ], LoadingCommand);
    return LoadingCommand;
}());
exports.default = LoadingCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvTG9hZGluZ0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBSW5HLDJEQUFzRDtBQUN0RCxxRUFBa0U7QUFJNUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFLMUM7SUFBQTtJQXVDQSxDQUFDO0lBdENTLGdDQUFPLEdBQWI7UUFBZSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOztnQkFDM0Isc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBRTlCLElBQUksSUFBSSxHQUFrQixFQUFFLENBQUM7d0JBRTdCLG1CQUFtQjt3QkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDOzRCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLDZCQUE2QixHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUNyRjt3QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLG1CQUFtQjt3QkFDbkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt3QkFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ2xDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBQ3ZDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQ3hDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNqQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUV0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDdkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs0QkFDeEIsT0FBTyxFQUFFLENBQUM7d0JBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRzs0QkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUF0Q2dCLGNBQWM7UUFEbEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO09BQ0wsY0FBYyxDQXVDbEM7SUFBRCxxQkFBQztDQXZDRCxBQXVDQyxJQUFBO2tCQXZDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuXHJcbmltcG9ydCB7SUNvbW1hbmR9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0lDb21tYW5kXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7d3hBcGl9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvd3hBcGkvd3hBcGlcIjtcclxuaW1wb3J0IE5ldHdvcmsgZnJvbSBcIi4uL25ldHdvcmsvTmV0d29ya1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuXHJcbkBjY2NsYXNzKFwiTG9hZGluZ0NvbW1hbmRcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ0NvbW1hbmQgaW1wbGVtZW50cyBJQ29tbWFuZCB7XHJcbiAgICBhc3luYyBleGVjdXRlICguLi5hcmdzKTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmdDb21tYW5kXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGxpc3Q6QXJyYXk8UHJvbWlzZT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8qKiDliJ3lp4vljJbpmpTnprvlsYJwcmVmYWIgKi9cclxuICAgICAgICAgICAgbGlzdC5wdXNoKEV4Y2VsQ29uZmlnLmxvYWRBbGxFeGNlbChcImRhdGEvXCIpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPDg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9lbmVteS9lbmVteVwiKyhpKzEpLCBjYy5QcmVmYWIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0LnB1c2goY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9ndWlkZUNpcmNsZVwiKSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2d1aWRlU2tlXCIpKTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKEZhY2FkZS5pbml0U2VwYXJhdGlvbkxheWVyKFwicHJlZmFiL3NlcGFyYXRpb25MYXllclwiKSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChGYWNhZGUuaW5pdFRleHRUaXBzKFwicHJlZmFiL3RleHRUaXBzXCIpKTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKEZhY2FkZS5pbml0VGV4dFRpcHMoXCJwcmVmYWIvY29sb3JcIikpO1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcImZyYW1lX2Z5MDA1XCIsIGNjLlNwcml0ZUZyYW1lKSk7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChjYy5sb2FkZXIubG9hZFJlc0RpckF3YWl0KFwic291bmQvXCIpKTtcclxuICAgICAgICAgICAgLyoqIOWKoOi9veS4gOS6m+S4jeaYr+W+iOe0p+aApeeahOi1hOa6kCAqL1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYi9leGNoYW5nZVwiKTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvZnJpZW5kUmFua1wiKTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvaW52aXRlc1wiKTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvcHJvcHNcIik7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFiL3JvbGVTdXBwbHlcIik7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFiL3NldHRpbmdzXCIpO1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYi90YWtlSmFja3BvdFwiKTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvdGlwc1wiKTtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWIvcmVjb21tZW5kXCIpO1xyXG5cclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwobGlzdCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9veWujOaIkC4uLicpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=