
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/tips/ShowTipsCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a011mWwutAHI4SKXF9o6cQ', 'ShowTipsCommand');
// script/app/tips/ShowTipsCommand.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Extend_1 = require("../../../framework/extend/Extend");
var View_1 = require("../../../framework/component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowTipsCommand = /** @class */ (function () {
    function ShowTipsCommand() {
    }
    ShowTipsCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.loader.loadRes('prefab/tips', cc.Prefab, function (error, resource) {
                            if (error == null) {
                                var node_1 = cc.instantiate(resource);
                                var titleLabel = node_1.getChildByName('title').getComponent(cc.RichText);
                                var string = args[0] || "您忘记传参数喽";
                                titleLabel.string = "<b><outline color=#1e1e1e width=3>" + string.replace(">", "》").replace("<", "《") + "</outline></b>";
                                if (cc.director.getScene()) {
                                    cc.director.getScene().addChild(node_1);
                                    node_1.getComponent(cc.Layout).updateLayout();
                                    node_1.position = cc.v2(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height);
                                    var duration = Extend_1.ext.isIphoneX ? 0.3 : 0.2;
                                    var y = Extend_1.ext.isIphoneX ? cc.view.getVisibleSize().height - node_1.height - View_1.default.IPHONEX_TOP_BLACK_HEIGHT : cc.view.getVisibleSize().height - node_1.height;
                                    node_1.runAction(cc.sequence(cc.moveTo(duration, cc.v2(cc.view.getVisibleSize().width / 2, y)), cc.delayTime(2), cc.moveTo(duration, cc.v2(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height)), cc.callFunc(function () {
                                        node_1.destroy();
                                        resolve();
                                    })));
                                }
                            }
                            else {
                                console.error(error);
                            }
                        });
                    })];
            });
        });
    };
    ShowTipsCommand = __decorate([
        ccclass('ShowTipsCommand')
    ], ShowTipsCommand);
    return ShowTipsCommand;
}());
exports.default = ShowTipsCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL3RpcHMvU2hvd1RpcHNDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyREFBcUQ7QUFDckQsMERBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7SUErQkEsQ0FBQztJQTdCUyxpQ0FBTyxHQUFiO1FBQWUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7dUNBQUUsT0FBTzs7Z0JBQzNCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBSyxFQUFFLFFBQVE7NEJBQ3pELElBQUksS0FBSyxJQUFFLElBQUksRUFBQztnQ0FDWCxJQUFJLE1BQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNwQyxJQUFJLFVBQVUsR0FBRyxNQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ3hFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7Z0NBQ2xDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsdUNBQXFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLG1CQUFnQixDQUFDO2dDQUNwSCxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUM7b0NBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQUksQ0FBQyxDQUFDO29DQUN0QyxNQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQ0FDNUMsTUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUN6RixJQUFJLFFBQVEsR0FBRyxZQUFHLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQztvQ0FDckMsSUFBSSxDQUFDLEdBQUcsWUFBRyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEdBQUMsTUFBSSxDQUFDLE1BQU0sR0FBQyxjQUFJLENBQUMsd0JBQXdCLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFDLE1BQUksQ0FBQyxNQUFNLENBQUM7b0NBQzVJLE1BQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDL0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDZixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQzdGLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0NBQ1IsTUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dDQUNmLE9BQU8sRUFBRSxDQUFDO29DQUNkLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDWjs2QkFDTDtpQ0FBTTtnQ0FDSCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUN4Qjt3QkFDSixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUE5QmdCLGVBQWU7UUFEbkMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO09BQ04sZUFBZSxDQStCbkM7SUFBRCxzQkFBQztDQS9CRCxBQStCQyxJQUFBO2tCQS9Cb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge0lDb21tYW5kfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9JQ29tbWFuZFwiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50L1ZpZXdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoJ1Nob3dUaXBzQ29tbWFuZCcpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3dUaXBzQ29tbWFuZCBpbXBsZW1lbnRzIElDb21tYW5kIHtcclxuXHJcbiAgICBhc3luYyBleGVjdXRlICguLi5hcmdzKTpQcm9taXNle1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdwcmVmYWIvdGlwcycsIGNjLlByZWZhYiwgKGVycm9yLCByZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICBpZiAoZXJyb3I9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZUxhYmVsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGUnKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSBhcmdzWzBdIHx8IFwi5oKo5b+Y6K6w5Lyg5Y+C5pWw5Za9XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7c3RyaW5nLnJlcGxhY2UoXCI+XCIsIFwi44CLXCIpLnJlcGxhY2UoXCI8XCIsIFwi44CKXCIpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkudXBkYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52MihjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgvMiwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGV4dC5pc0lwaG9uZVg/MC4zOjAuMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBleHQuaXNJcGhvbmVYP2NjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQtbm9kZS5oZWlnaHQtVmlldy5JUEhPTkVYX1RPUF9CTEFDS19IRUlHSFQ6Y2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodC1ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIGNjLnYyKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yLCB5KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sIGNjLnYyKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19