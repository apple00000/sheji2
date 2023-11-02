"use strict";
cc._RF.push(module, 'ad6c7iO+p1G1qYI4btYwplX', 'PropStateController');
// script/app/entities/prop/PropStateController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CDTimer_1 = require("../../../../framework/component/CDTimer");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropStateController = /** @class */ (function (_super) {
    __extends(PropStateController, _super);
    function PropStateController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteFrames = [];
        _this.sprite = null;
        _this.prgressBar = null;
        _this.cdTimer = null;
        _this.propID = 0;
        return _this;
    }
    PropStateController.prototype.onEnable = function () {
        this.sprite.node.active = false;
        this.prgressBar.node.active = false;
    };
    PropStateController.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    PropStateController.prototype.init = function (id) {
        this.propID = id;
        var spriteFrameIndex = 0;
        var cd = 0;
        switch (id) {
            case 5:
                spriteFrameIndex = 0;
                cd = 15;
                break;
            case 9:
                spriteFrameIndex = 1;
                cd = 12;
                break;
            case 10:
                spriteFrameIndex = 2;
                cd = 12;
                break;
            case 12:
                spriteFrameIndex = 3;
                cd = 20;
                break;
            case 13:
                spriteFrameIndex = 4;
                cd = 10;
                break;
        }
        this.sprite.spriteFrame = this.spriteFrames[spriteFrameIndex];
        this.cdTimer.cd = cd;
        this.cdTimer.reset();
        this.prgressBar.progress = 1;
        this.cdTimer.pause = true;
        this.node.scale = 1;
        this.sprite.node.active = true;
        this.prgressBar.node.active = true;
    };
    PropStateController.prototype.onProgressEvent = function (progress) {
        this.prgressBar.progress = 1 - progress;
    };
    PropStateController.prototype.onZeroEvent = function () {
        var _this = this;
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.PropCDZero, this.propID);
        this.node.runAction(cc.sequence(cc.scaleTo(0.15, 0), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    __decorate([
        property(cc.SpriteFrame)
    ], PropStateController.prototype, "spriteFrames", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropStateController.prototype, "sprite", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], PropStateController.prototype, "prgressBar", void 0);
    __decorate([
        property(CDTimer_1.default)
    ], PropStateController.prototype, "cdTimer", void 0);
    PropStateController = __decorate([
        ccclass
    ], PropStateController);
    return PropStateController;
}(cc.Component));
exports.default = PropStateController;

cc._RF.pop();