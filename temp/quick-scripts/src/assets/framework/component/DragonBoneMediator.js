"use strict";
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