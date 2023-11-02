
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/PauseAllRunningActions.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76cc4E/XWhMC562JoS9uogz', 'PauseAllRunningActions');
// framework/component/PauseAllRunningActions.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var PauseAllRunningActions = /** @class */ (function (_super) {
    __extends(PauseAllRunningActions, _super);
    function PauseAllRunningActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PauseAllRunningActions.prototype.onLoad = function () {
        var list = cc.director.getActionManager().pauseAllRunningActions();
        this.onDestroy = function () {
            cc.director.getActionManager().resumeTargets(list);
        };
    };
    PauseAllRunningActions = __decorate([
        ccclass,
        menu("自定义/PauseAllRunningActions")
    ], PauseAllRunningActions);
    return PauseAllRunningActions;
}(cc.Component));
exports.default = PauseAllRunningActions;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1BhdXNlQWxsUnVubmluZ0FjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBa0IsRUFBRSxDQUFDLFVBQVUsRUFBOUIsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFpQixDQUFDO0FBSXRDO0lBQW9ELDBDQUFZO0lBQWhFOztJQU9BLENBQUM7SUFORyx1Q0FBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQU5nQixzQkFBc0I7UUFGMUMsT0FBTztRQUNQLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztPQUNkLHNCQUFzQixDQU8xQztJQUFELDZCQUFDO0NBUEQsQUFPQyxDQVBtRCxFQUFFLENBQUMsU0FBUyxHQU8vRDtrQkFQb0Isc0JBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHtjY2NsYXNzLCBtZW51fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIuiHquWumuS5iS9QYXVzZUFsbFJ1bm5pbmdBY3Rpb25zXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdXNlQWxsUnVubmluZ0FjdGlvbnMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZUFsbFJ1bm5pbmdBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kgPSAoKT0+e1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVzdW1lVGFyZ2V0cyhsaXN0KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==