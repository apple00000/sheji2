"use strict";
cc._RF.push(module, 'de3b1rlVrNDVqI1fkc5g6jI', 'UpEffectController');
// script/app/home/UpEffectController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UpEffectController = /** @class */ (function (_super) {
    __extends(UpEffectController, _super);
    function UpEffectController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventName = "";
        _this.ske = null;
        return _this;
    }
    UpEffectController.prototype.onShowEffect = function () {
        this.ske.node.active = true;
        this.ske.setAnimation(0, "vfxAll", false);
    };
    UpEffectController.prototype.onLoad = function () {
        var _this = this;
        if (this.eventName !== "") {
            Facade_1.default.canvasNode.on(this.eventName, this.onShowEffect, this);
        }
        this.ske.setCompleteListener(function () {
            if (cc.isValid(_this) && cc.isValid(_this.ske)) {
                _this.ske.node.active = false;
            }
        });
        this.ske.node.active = false;
    };
    UpEffectController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off(this.eventName, this.onShowEffect, this);
    };
    __decorate([
        property
    ], UpEffectController.prototype, "eventName", void 0);
    __decorate([
        property(sp.Skeleton)
    ], UpEffectController.prototype, "ske", void 0);
    UpEffectController = __decorate([
        ccclass
    ], UpEffectController);
    return UpEffectController;
}(cc.Component));
exports.default = UpEffectController;

cc._RF.pop();