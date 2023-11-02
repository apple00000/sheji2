"use strict";
cc._RF.push(module, '714fcJtcJtP9q86lkg3hnXM', 'TakeJackpotController');
// script/app/home/TakeJackpotController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var Extend_1 = require("../../../framework/extend/Extend");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TakeJackpotController = /** @class */ (function (_super) {
    __extends(TakeJackpotController, _super);
    function TakeJackpotController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.oneLabel = null;
        _this.threeLabel = null;
        _this.oneButtonNode = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TakeJackpotController.prototype.onLoad = function () {
        this.updateView();
        Facade_1.default.canvasNode.on('UpdateStorage', this.onUpdateStorage, this);
        // this.oneBackgroundSprite.setMaterial(0, this.oneBackgroundSprite.getMaterial(1));
        // this.oneBackgroundSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        // this.oneButtonNode.active = false;
        // this.scheduleOnce(()=>this.oneButtonNode.active = true, 3);
    };
    TakeJackpotController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off('UpdateStorage', this.onUpdateStorage, this);
    };
    TakeJackpotController.prototype.onUpdateStorage = function (key) {
        if (key == "dayEarnTotal") {
            this.updateView();
        }
    };
    TakeJackpotController.prototype.updateView = function () {
        this.oneLabel.string = Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal);
        this.threeLabel.string = Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal * 3);
    };
    TakeJackpotController.prototype.onTakeIt = function (event, data) {
        data = parseInt(data);
        if (data == 1) {
            this.node.destroy();
            Facade_1.default.canvasNode.emit("TakeJackpot", 1);
        }
        else {
            /** 看广告 */
            this.node.destroy();
            Facade_1.default.canvasNode.emit("TakeJackpot", 3);
        }
    };
    __decorate([
        property(cc.Label)
    ], TakeJackpotController.prototype, "oneLabel", void 0);
    __decorate([
        property(cc.Label)
    ], TakeJackpotController.prototype, "threeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], TakeJackpotController.prototype, "oneButtonNode", void 0);
    TakeJackpotController = __decorate([
        ccclass
    ], TakeJackpotController);
    return TakeJackpotController;
}(cc.Component));
exports.default = TakeJackpotController;

cc._RF.pop();