
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/welcome/Welcome.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e3f6FMdypHP65fD2gjB7kj', 'Welcome');
// script/app/welcome/Welcome.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Welcome = /** @class */ (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        return _this;
    }
    Welcome.prototype.onLoad = function () {
        var _this = this;
        console.log("xxx1");
        cc.warn = function () { };
        var promises = [];
        promises.push(Facade_1.default.executeCommand("LoadingCommand"));
        console.log("xxx2");
        promises.push(new Promise(function (resolve) {
            _this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () { return resolve(); })));
        }));
        console.log("xxx3");
        Promise.all(promises).then(function () {
            cc.loader.loadRes("prefab/HomeScene", cc.Prefab, function (error, resource) {
                if (error == null) {
                    var homeScene = cc.instantiate(resource);
                    Facade_1.default.canvasNode.addChild(homeScene);
                    _this.bgNode.destroy();
                }
                else {
                    console.error(error);
                }
            });
        });
        console.log("xxx4");
    };
    __decorate([
        property(cc.Node)
    ], Welcome.prototype, "bgNode", void 0);
    Welcome = __decorate([
        ccclass
    ], Welcome);
    return Welcome;
}(cc.Component));
exports.default = Welcome;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL3dlbGNvbWUvV2VsY29tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMkRBQXNEO0FBRWhELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBOEJDO1FBM0JHLFlBQU0sR0FBVyxJQUFJLENBQUM7O0lBMkIxQixDQUFDO0lBekJHLHdCQUFNLEdBQU47UUFBQSxpQkF3QkM7UUF2QkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVuQixFQUFFLENBQUMsSUFBSSxHQUFHLGNBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVsQixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzdCLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQUksT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUssRUFBRSxRQUFRO2dCQUM3RCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUM7b0JBQ2QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN0QyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN6QjtxQkFBSztvQkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUExQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDSTtJQUhMLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0E4QjNCO0lBQUQsY0FBQztDQTlCRCxBQThCQyxDQTlCb0MsRUFBRSxDQUFDLFNBQVMsR0E4QmhEO2tCQTlCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlbGNvbWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmdOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ4eHgxXCIpXHJcblxyXG4gICAgICAgIGNjLndhcm4gPSAoKT0+e307XHJcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XHJcblxyXG4gICAgICAgIHByb21pc2VzLnB1c2goRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiTG9hZGluZ0NvbW1hbmRcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieHh4MlwiKVxyXG4gICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDIpLCBjYy5jYWxsRnVuYygoKT0+cmVzb2x2ZSgpKSkpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInh4eDNcIilcclxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInByZWZhYi9Ib21lU2NlbmVcIiwgY2MuUHJlZmFiLCAoZXJyb3IsIHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhvbWVTY2VuZSA9IGNjLmluc3RhbnRpYXRlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5hZGRDaGlsZChob21lU2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmdOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ4eHg0XCIpXHJcbiAgICB9XHJcbn1cclxuIl19