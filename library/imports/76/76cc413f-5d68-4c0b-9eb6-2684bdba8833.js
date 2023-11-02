"use strict";
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