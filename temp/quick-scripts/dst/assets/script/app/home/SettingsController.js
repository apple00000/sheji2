
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/SettingsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvU2V0dGluZ3NDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3REFBcUQ7QUFDckQsdUNBQW9DO0FBQ3BDLDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQStDQztRQTVDRyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFhLElBQUksQ0FBQzs7SUF5Q2pDLENBQUM7SUF2Q0csd0JBQXdCO0lBRXhCLG1DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxhQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0Qsb0JBQW9CLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyw0QkFBNEI7UUFDckUsb0JBQW9CLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO1FBQ3RELG9CQUFvQixDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUNuRCxvQkFBb0IsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBR3hELElBQUksc0JBQXNCLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELHNCQUFzQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsNEJBQTRCO1FBQ3ZFLHNCQUFzQixDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztRQUN4RCxzQkFBc0IsQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDdkQsc0JBQXNCLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsOENBQWlCLEdBQWpCLFVBQWtCLEtBQUssRUFBRSxJQUFJO1FBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksYUFBSyxDQUFDLFlBQVksRUFBRSxFQUFDO1lBQ25ELGNBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsYUFBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLGFBQUssQ0FBQyxPQUFPLEdBQUcsYUFBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JDLGFBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQiwrREFBK0Q7U0FDbEU7SUFDTCxDQUFDO0lBRUQsZ0RBQW1CLEdBQW5CLFVBQW9CLEtBQUssRUFBRSxJQUFJO1FBQzNCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUM7WUFDdEQsY0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQyxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ1M7SUFOWixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQStDdEM7SUFBRCx5QkFBQztDQS9DRCxBQStDQyxDQS9DK0MsRUFBRSxDQUFDLFNBQVMsR0ErQzNEO2tCQS9Db0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7TXVzaWN9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvYXVkaW8vTXVzaWNcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnQvVmlld1wiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nc0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXHJcbiAgICBzb3VuZFRvZ2dsZTpjYy5Ub2dnbGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXHJcbiAgICBzaGFrZVRvZ2dsZTpjYy5Ub2dnbGUgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZFRvZ2dsZS5pc0NoZWNrZWQgPSBNdXNpYy5nZXRNdXNpY09wZW4oKTtcclxuICAgICAgICB0aGlzLnNoYWtlVG9nZ2xlLmlzQ2hlY2tlZCA9IFdvcmxkLlN0b3JhZ2Uuc2hha2VPcGVuO1xyXG4gICAgICAgIGxldCBzZnhDaGVja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgc2Z4Q2hlY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlOyAvL+i/meS4qiBub2RlIOiKgueCueaYr+S9oOeahOS6i+S7tuWkhOeQhuS7o+eggee7hOS7tuaJgOWxnueahOiKgueCuVxyXG4gICAgICAgIHNmeENoZWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiU2V0dGluZ3NDb250cm9sbGVyXCI7XHJcbiAgICAgICAgc2Z4Q2hlY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IFwic2Z4VG9nZ2xlQ2FsbGJhY2tcIjtcclxuICAgICAgICBzZnhDaGVja0V2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnNvdW5kVG9nZ2xlLmNoZWNrRXZlbnRzLnB1c2goc2Z4Q2hlY2tFdmVudEhhbmRsZXIpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHNoYWtlQ2hlY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIHNoYWtlQ2hlY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlOyAvL+i/meS4qiBub2RlIOiKgueCueaYr+S9oOeahOS6i+S7tuWkhOeQhuS7o+eggee7hOS7tuaJgOWxnueahOiKgueCuVxyXG4gICAgICAgIHNoYWtlQ2hlY2tFdmVudEhhbmRsZXIuY29tcG9uZW50ID0gXCJTZXR0aW5nc0NvbnRyb2xsZXJcIjtcclxuICAgICAgICBzaGFrZUNoZWNrRXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcInNoYWtlVG9nZ2xlQ2FsbGJhY2tcIjtcclxuICAgICAgICBzaGFrZUNoZWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMuc2hha2VUb2dnbGUuY2hlY2tFdmVudHMucHVzaChzaGFrZUNoZWNrRXZlbnRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzZnhUb2dnbGVDYWxsYmFjayhldmVudCwgZGF0YSl7XHJcbiAgICAgICAgaWYgKHRoaXMuc291bmRUb2dnbGUuaXNDaGVja2VkICE9IE11c2ljLmdldE11c2ljT3BlbigpKXtcclxuICAgICAgICAgICAgVmlldy5leGVjdXRlQ2xpY2tTb3VuZENvbW1hbmQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICBNdXNpYy5zZXRNdXNpY09wZW4oIU11c2ljLmdldE11c2ljT3BlbigpKTtcclxuICAgICAgICAgICAgTXVzaWMuc2Z4T3BlbiA9IE11c2ljLmdldE11c2ljT3BlbigpO1xyXG4gICAgICAgICAgICBNdXNpYy5wZXJzaXN0ZW5jZSgpO1xyXG4gICAgICAgICAgICAvLyBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiU3dpdGNoTXVzaWNcIiwgTXVzaWMuZ2V0TXVzaWNPcGVuKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaGFrZVRvZ2dsZUNhbGxiYWNrKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBpZiAodGhpcy5zaGFrZVRvZ2dsZS5pc0NoZWNrZWQgIT0gV29ybGQuU3RvcmFnZS5zaGFrZU9wZW4pe1xyXG4gICAgICAgICAgICBWaWV3LmV4ZWN1dGVDbGlja1NvdW5kQ29tbWFuZChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgICAgIFdvcmxkLlN0b3JhZ2Uuc2hha2VPcGVuID0gIVdvcmxkLlN0b3JhZ2Uuc2hha2VPcGVuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=