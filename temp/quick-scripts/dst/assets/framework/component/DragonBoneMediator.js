
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/DragonBoneMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a7acgYw3ZIX7xQplxXQaEU', 'DragonBoneMediator');
// framework/component/DragonBoneMediator.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent;
var DragonBonesEventType;
(function (DragonBonesEventType) {
    DragonBonesEventType[DragonBonesEventType["START"] = 0] = "START";
    DragonBonesEventType[DragonBonesEventType["LOOP_COMPLETE"] = 1] = "LOOP_COMPLETE";
    DragonBonesEventType[DragonBonesEventType["COMPLETE"] = 2] = "COMPLETE";
    DragonBonesEventType[DragonBonesEventType["FADE_IN"] = 3] = "FADE_IN";
    DragonBonesEventType[DragonBonesEventType["FADE_IN_COMPLETE"] = 4] = "FADE_IN_COMPLETE";
    DragonBonesEventType[DragonBonesEventType["FADE_OUT"] = 5] = "FADE_OUT";
    DragonBonesEventType[DragonBonesEventType["FADE_OUT_COMPLETE"] = 6] = "FADE_OUT_COMPLETE";
    DragonBonesEventType[DragonBonesEventType["FRAME_EVENT"] = 7] = "FRAME_EVENT";
    DragonBonesEventType[DragonBonesEventType["SOUND_EVENT"] = 8] = "SOUND_EVENT";
})(DragonBonesEventType || (DragonBonesEventType = {}));
var map = new Map();
map.set(DragonBonesEventType.START, dragonBones.EventObject.START);
map.set(DragonBonesEventType.LOOP_COMPLETE, dragonBones.EventObject.LOOP_COMPLETE);
map.set(DragonBonesEventType.COMPLETE, dragonBones.EventObject.COMPLETE);
map.set(DragonBonesEventType.FADE_IN, dragonBones.EventObject.FADE_IN);
map.set(DragonBonesEventType.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_IN_COMPLETE);
map.set(DragonBonesEventType.FADE_OUT, dragonBones.EventObject.FADE_OUT);
map.set(DragonBonesEventType.FADE_OUT_COMPLETE, dragonBones.EventObject.FADE_OUT_COMPLETE);
map.set(DragonBonesEventType.FRAME_EVENT, dragonBones.EventObject.FRAME_EVENT);
map.set(DragonBonesEventType.SOUND_EVENT, dragonBones.EventObject.SOUND_EVENT);
var DragonBoneMediator = /** @class */ (function (_super) {
    __extends(DragonBoneMediator, _super);
    function DragonBoneMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.armatureDisplay = null;
        _this.animationState = null;
        _this.armatureName = "Armature";
        _this.eventType = DragonBonesEventType.COMPLETE;
        _this.eventHandlers = [];
        return _this;
    }
    DragonBoneMediator.prototype.onLoad = function () {
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    };
    DragonBoneMediator.prototype._playAnim = function (name, playTimes, timeScale) {
        if (playTimes === void 0) { playTimes = 0; }
        if (timeScale === void 0) { timeScale = 1; }
        this.armatureDisplay.timeScale = timeScale;
        this.armatureDisplay.armatureName = this.armatureName;
        this.animationState = this.armatureDisplay.playAnimation(name, playTimes);
        console.log("playAnim===>name=" + this.animationState.name + " playTimes=" + playTimes + " timeScale=" + timeScale);
    };
    DragonBoneMediator.prototype.playAnim = function (name, timeScale) {
        this._playAnim(name, 0, timeScale);
    };
    DragonBoneMediator.prototype.playAnimOnce = function (name, timeScale) {
        this._playAnim(name, 1, timeScale);
    };
    DragonBoneMediator.prototype.isAnim = function (name) {
        if (this.animationState == null)
            return false;
        return this.animationState.name === name;
    };
    /** 更换slot.display */
    DragonBoneMediator.prototype.replaceSlotDisplay = function (slotName, spriteFrame) {
        // this.armatureDisplay.armature().getSlot(slotName).display = new cc.Scale9Sprite(spriteFrame);
        // this.armatureDisplay.armature().getSlot(slotName).display = spriteFrame;
        if (typeof spriteFrame == "number") {
            this.armatureDisplay.armature().getSlot(slotName).displayIndex = spriteFrame;
        }
    };
    /**获取骨骼bone的坐标*/
    DragonBoneMediator.prototype.getBoneWorldPosition = function (boneName) {
        var bone = this.armatureDisplay.armature().getBone(boneName);
        return this.node.convertToWorldSpaceAR(cc.v2(bone.global.x, -bone.global.y));
    };
    DragonBoneMediator.prototype.initDragonBone = function (dragonAsset, dragonAtlasAsset, armatureName) {
        if (!dragonAsset || !dragonAtlasAsset) {
            throw Error("dragonAsset=" + dragonAsset + " dragonAtlasAsset=" + dragonAtlasAsset);
        }
        this.node.removeComponent(dragonBones.ArmatureDisplay);
        var armatureDisplay = this.node.addComponent(dragonBones.ArmatureDisplay);
        armatureDisplay.dragonAsset = dragonAsset;
        armatureDisplay.dragonAtlasAsset = dragonAtlasAsset;
        armatureDisplay.armatureName = armatureName || this.armatureName;
        this.animationState = null;
        this.armatureDisplay = armatureDisplay;
    };
    DragonBoneMediator.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                cc.Component.EventHandler.emitEvents(this.eventHandlers, event);
                return [2 /*return*/];
            });
        });
    };
    DragonBoneMediator.prototype.onLoad = function () {
        this.armatureDisplay.addEventListener(map.get(this.eventType), this.handleEvent, this);
    };
    DragonBoneMediator.prototype.onDestroy = function () {
        this.armatureDisplay.removeEventListener(map.get(this.eventType), this.handleEvent, this);
    };
    __decorate([
        property
    ], DragonBoneMediator.prototype, "armatureName", void 0);
    __decorate([
        property({ type: cc.Enum(DragonBonesEventType) })
    ], DragonBoneMediator.prototype, "eventType", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "触发事件" })
    ], DragonBoneMediator.prototype, "eventHandlers", void 0);
    DragonBoneMediator = __decorate([
        ccclass,
        menu("自定义/DragonBoneMediator"),
        requireComponent(dragonBones.ArmatureDisplay)
    ], DragonBoneMediator);
    return DragonBoneMediator;
}(cc.Component));
exports.default = DragonBoneMediator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L0RyYWdvbkJvbmVNZWRpYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7QUFLN0YsSUFBQSxLQUE4QyxFQUFFLENBQUMsVUFBVSxFQUExRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxnQkFBZ0Isc0JBQWlCLENBQUM7QUFFbEUsSUFBSyxvQkFVSjtBQVZELFdBQUssb0JBQW9CO0lBQ3JCLGlFQUFLLENBQUE7SUFDTCxpRkFBYSxDQUFBO0lBQ2IsdUVBQVEsQ0FBQTtJQUNSLHFFQUFPLENBQUE7SUFDUCx1RkFBZ0IsQ0FBQTtJQUNoQix1RUFBUSxDQUFBO0lBQ1IseUZBQWlCLENBQUE7SUFDakIsNkVBQVcsQ0FBQTtJQUNYLDZFQUFXLENBQUE7QUFDZixDQUFDLEVBVkksb0JBQW9CLEtBQXBCLG9CQUFvQixRQVV4QjtBQUdELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFnQyxDQUFDO0FBQ2xELEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNuRixHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pFLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLFdBQVcs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QUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQXZFRDtRQURDLFFBQVE7NERBQ3dCO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBQyxDQUFDO3lEQUNnQjtJQUcvRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUMsTUFBTSxFQUFDLENBQUM7NkRBQ2hCO0lBYjlCLGtCQUFrQjtRQUh0QyxPQUFPO1FBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQzlCLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7T0FDekIsa0JBQWtCLENBZ0Z0QztJQUFELHlCQUFDO0NBaEZELEFBZ0ZDLENBaEYrQyxFQUFFLENBQUMsU0FBUyxHQWdGM0Q7a0JBaEZvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgcmVxdWlyZUNvbXBvbmVudH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBEcmFnb25Cb25lc0V2ZW50VHlwZXtcclxuICAgIFNUQVJULFxyXG4gICAgTE9PUF9DT01QTEVURSxcclxuICAgIENPTVBMRVRFLFxyXG4gICAgRkFERV9JTixcclxuICAgIEZBREVfSU5fQ09NUExFVEUsXHJcbiAgICBGQURFX09VVCxcclxuICAgIEZBREVfT1VUX0NPTVBMRVRFLFxyXG4gICAgRlJBTUVfRVZFTlQsXHJcbiAgICBTT1VORF9FVkVOVCxcclxufVxyXG5cclxuXHJcbmxldCBtYXAgPSBuZXcgTWFwPERyYWdvbkJvbmVzRXZlbnRUeXBlLCBzdHJpbmc+KCk7XHJcbm1hcC5zZXQoRHJhZ29uQm9uZXNFdmVudFR5cGUuU1RBUlQsIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LlNUQVJUKTtcclxubWFwLnNldChEcmFnb25Cb25lc0V2ZW50VHlwZS5MT09QX0NPTVBMRVRFLCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5MT09QX0NPTVBMRVRFKTtcclxubWFwLnNldChEcmFnb25Cb25lc0V2ZW50VHlwZS5DT01QTEVURSwgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUpO1xyXG5tYXAuc2V0KERyYWdvbkJvbmVzRXZlbnRUeXBlLkZBREVfSU4sIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU4pO1xyXG5tYXAuc2V0KERyYWdvbkJvbmVzRXZlbnRUeXBlLkZBREVfSU5fQ09NUExFVEUsIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU5fQ09NUExFVEUpO1xyXG5tYXAuc2V0KERyYWdvbkJvbmVzRXZlbnRUeXBlLkZBREVfT1VULCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX09VVCk7XHJcbm1hcC5zZXQoRHJhZ29uQm9uZXNFdmVudFR5cGUuRkFERV9PVVRfQ09NUExFVEUsIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfT1VUX0NPTVBMRVRFKTtcclxubWFwLnNldChEcmFnb25Cb25lc0V2ZW50VHlwZS5GUkFNRV9FVkVOVCwgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRlJBTUVfRVZFTlQpO1xyXG5tYXAuc2V0KERyYWdvbkJvbmVzRXZlbnRUeXBlLlNPVU5EX0VWRU5ULCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5TT1VORF9FVkVOVCk7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIuiHquWumuS5iS9EcmFnb25Cb25lTWVkaWF0b3JcIilcclxuQHJlcXVpcmVDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnb25Cb25lTWVkaWF0b3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgYXJtYXR1cmVEaXNwbGF5OmRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgYW5pbWF0aW9uU3RhdGU6ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgYXJtYXR1cmVOYW1lOnN0cmluZyA9IFwiQXJtYXR1cmVcIjtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShEcmFnb25Cb25lc0V2ZW50VHlwZSl9KVxyXG4gICAgZXZlbnRUeXBlOkRyYWdvbkJvbmVzRXZlbnRUeXBlID0gRHJhZ29uQm9uZXNFdmVudFR5cGUuQ09NUExFVEU7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIGRpc3BsYXlOYW1lOlwi6Kem5Y+R5LqL5Lu2XCJ9KVxyXG4gICAgZXZlbnRIYW5kbGVyczpbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0gPSBbXTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmFybWF0dXJlRGlzcGxheSA9IHRoaXMuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGxheUFuaW0obmFtZTpzdHJpbmcsIHBsYXlUaW1lcz0wLCB0aW1lU2NhbGU9MSl7XHJcbiAgICAgICAgdGhpcy5hcm1hdHVyZURpc3BsYXkudGltZVNjYWxlID0gdGltZVNjYWxlO1xyXG4gICAgICAgIHRoaXMuYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlTmFtZSA9IHRoaXMuYXJtYXR1cmVOYW1lO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSB0aGlzLmFybWF0dXJlRGlzcGxheS5wbGF5QW5pbWF0aW9uKG5hbWUsIHBsYXlUaW1lcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHBsYXlBbmltPT09Pm5hbWU9JHt0aGlzLmFuaW1hdGlvblN0YXRlLm5hbWV9IHBsYXlUaW1lcz0ke3BsYXlUaW1lc30gdGltZVNjYWxlPSR7dGltZVNjYWxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltKG5hbWU6c3RyaW5nLCB0aW1lU2NhbGU/KXtcclxuICAgICAgICB0aGlzLl9wbGF5QW5pbShuYW1lLCAwLCB0aW1lU2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltT25jZShuYW1lOnN0cmluZywgdGltZVNjYWxlPyl7XHJcbiAgICAgICAgdGhpcy5fcGxheUFuaW0obmFtZSwgMSwgdGltZVNjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0FuaW0obmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvblN0YXRlID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRpb25TdGF0ZS5uYW1lID09PSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmm7TmjaJzbG90LmRpc3BsYXkgKi9cclxuICAgIHJlcGxhY2VTbG90RGlzcGxheShzbG90TmFtZTpzdHJpbmcsIHNwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lIHwgbnVtYmVyKXtcclxuICAgICAgICAvLyB0aGlzLmFybWF0dXJlRGlzcGxheS5hcm1hdHVyZSgpLmdldFNsb3Qoc2xvdE5hbWUpLmRpc3BsYXkgPSBuZXcgY2MuU2NhbGU5U3ByaXRlKHNwcml0ZUZyYW1lKTtcclxuICAgICAgICAvLyB0aGlzLmFybWF0dXJlRGlzcGxheS5hcm1hdHVyZSgpLmdldFNsb3Qoc2xvdE5hbWUpLmRpc3BsYXkgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICBpZiAodHlwZW9mIHNwcml0ZUZyYW1lID09IFwibnVtYmVyXCIpe1xyXG4gICAgICAgICAgICB0aGlzLmFybWF0dXJlRGlzcGxheS5hcm1hdHVyZSgpLmdldFNsb3Qoc2xvdE5hbWUpLmRpc3BsYXlJbmRleCA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bpqqjpqrxib25l55qE5Z2Q5qCHKi9cclxuICAgIGdldEJvbmVXb3JsZFBvc2l0aW9uKGJvbmVOYW1lOnN0cmluZyk6Y2MuVmVjMntcclxuICAgICAgICBsZXQgYm9uZSA9IHRoaXMuYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlKCkuZ2V0Qm9uZShib25lTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoYm9uZS5nbG9iYWwueCwgLWJvbmUuZ2xvYmFsLnkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RHJhZ29uQm9uZShkcmFnb25Bc3NldDpkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0LCBkcmFnb25BdGxhc0Fzc2V0OmRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCwgYXJtYXR1cmVOYW1lPzpzdHJpbmcpe1xyXG4gICAgICAgIGlmICghZHJhZ29uQXNzZXQgfHwgIWRyYWdvbkF0bGFzQXNzZXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYGRyYWdvbkFzc2V0PSR7ZHJhZ29uQXNzZXR9IGRyYWdvbkF0bGFzQXNzZXQ9JHtkcmFnb25BdGxhc0Fzc2V0fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICAgICAgbGV0IGFybWF0dXJlRGlzcGxheSA9IHRoaXMubm9kZS5hZGRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuICAgICAgICBhcm1hdHVyZURpc3BsYXkuZHJhZ29uQXNzZXQgPSBkcmFnb25Bc3NldDtcclxuICAgICAgICBhcm1hdHVyZURpc3BsYXkuZHJhZ29uQXRsYXNBc3NldCA9IGRyYWdvbkF0bGFzQXNzZXQ7XHJcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlTmFtZSA9IGFybWF0dXJlTmFtZSB8fCB0aGlzLmFybWF0dXJlTmFtZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFybWF0dXJlRGlzcGxheSA9IGFybWF0dXJlRGlzcGxheTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgaGFuZGxlRXZlbnQoZXZlbnQpe1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmV2ZW50SGFuZGxlcnMsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuYXJtYXR1cmVEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIobWFwLmdldCh0aGlzLmV2ZW50VHlwZSksIHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuYXJtYXR1cmVEaXNwbGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIobWFwLmdldCh0aGlzLmV2ZW50VHlwZSksIHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=