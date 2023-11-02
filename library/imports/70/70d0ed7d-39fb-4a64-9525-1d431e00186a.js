"use strict";
cc._RF.push(module, '70d0e19OftKZJUlHUMeABhq', 'SettingsController');
// script/app/home/SettingsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Music_1 = require("../../../framework/audio/Music");
var World_1 = require("../info/World");
var View_1 = require("../../../framework/component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettingsController = /** @class */ (function (_super) {
    __extends(SettingsController, _super);
    function SettingsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundToggle = null;
        _this.shakeToggle = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    SettingsController.prototype.onLoad = function () {
        this.soundToggle.isChecked = Music_1.Music.getMusicOpen();
        this.shakeToggle.isChecked = World_1.World.Storage.shakeOpen;
        var sfxCheckEventHandler = new cc.Component.EventHandler();
        sfxCheckEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        sfxCheckEventHandler.component = "SettingsController";
        sfxCheckEventHandler.handler = "sfxToggleCallback";
        sfxCheckEventHandler.customEventData = "";
        this.soundToggle.checkEvents.push(sfxCheckEventHandler);
        var shakeCheckEventHandler = new cc.Component.EventHandler();
        shakeCheckEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        shakeCheckEventHandler.component = "SettingsController";
        shakeCheckEventHandler.handler = "shakeToggleCallback";
        shakeCheckEventHandler.customEventData = "";
        this.shakeToggle.checkEvents.push(shakeCheckEventHandler);
    };
    SettingsController.prototype.sfxToggleCallback = function (event, data) {
        if (this.soundToggle.isChecked != Music_1.Music.getMusicOpen()) {
            View_1.default.executeClickSoundCommand(event, data);
            Music_1.Music.setMusicOpen(!Music_1.Music.getMusicOpen());
            Music_1.Music.sfxOpen = Music_1.Music.getMusicOpen();
            Music_1.Music.persistence();
            // Facade.canvasNode.emit("SwitchMusic", Music.getMusicOpen());
        }
    };
    SettingsController.prototype.shakeToggleCallback = function (event, data) {
        if (this.shakeToggle.isChecked != World_1.World.Storage.shakeOpen) {
            View_1.default.executeClickSoundCommand(event, data);
            World_1.World.Storage.shakeOpen = !World_1.World.Storage.shakeOpen;
        }
    };
    __decorate([
        property(cc.Toggle)
    ], SettingsController.prototype, "soundToggle", void 0);
    __decorate([
        property(cc.Toggle)
    ], SettingsController.prototype, "shakeToggle", void 0);
    SettingsController = __decorate([
        ccclass
    ], SettingsController);
    return SettingsController;
}(cc.Component));
exports.default = SettingsController;

cc._RF.pop();