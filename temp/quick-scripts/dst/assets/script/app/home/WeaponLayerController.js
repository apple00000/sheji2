
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/WeaponLayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0699YuuRlMApvOLWG3FOLt', 'WeaponLayerController');
// script/app/home/WeaponLayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var Extend_1 = require("../../../framework/extend/Extend");
var Toast_1 = require("../../../framework/extend/Toast");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WeaponLayerController = /** @class */ (function (_super) {
    __extends(WeaponLayerController, _super);
    function WeaponLayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firePowerLvLabel = null;
        _this.powerLvLabel = null;
        _this.firePowerCostLabel = null;
        _this.powerCostLabel = null;
        _this.firePowerWorthLabel = null;
        _this.powerWorthLabel = null;
        _this.firePowerButton = null;
        _this.powerButton = null;
        _this.scrollView = null;
        _this.upEffectNode = null;
        _this.trialNode = null;
        _this.weaponButtons = [];
        _this._weaponFocus = -1;
        _this._orders = [];
        return _this;
    }
    WeaponLayerController.prototype.focusGunID = function () {
        return this._orders[this._weaponFocus]['id'];
    };
    Object.defineProperty(WeaponLayerController.prototype, "weaponFocus", {
        set: function (value) {
            var _this = this;
            if (this._weaponFocus != value) {
                this.upEffectNode.removeFromParent(false);
                this.weaponButtons[value].node.addChild(this.upEffectNode);
                this._weaponFocus = value;
                this.weaponButtons.forEach(function (value, index) { return value.target.getComponent(cc.Sprite).enabled = index == _this._weaponFocus; });
                this.updateWeaponAttr();
            }
        },
        enumerable: false,
        configurable: true
    });
    WeaponLayerController.prototype.updateWeaponAttr = function () {
        this.updateFirePower();
        this.updatePower();
    };
    WeaponLayerController.prototype.onLoad = function () {
        var _this = this;
        this.trialNode.active = false;
        this.weaponButtons = this.scrollView.content.children.map(function (value) { return value.getComponent(cc.Button); });
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon);
        this._orders = config.filter(function (value) { return value['id'] != 1; }).sort((function (a, b) {
            return a['order'] - b['order'];
        }));
        this.weaponButtons.forEach(function (value) {
            var id = parseInt(value.node.name);
            var cfg = _this._orders[id - 2];
            value.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cfg['gun_name'];
            // let weaponSke = value.node.getChildByName("Background").getChildByName("weapon").getComponent(sp.Skeleton);
            // weaponSke.setSkin(("000"+cfg['id']).substr(-3));
            // weaponSke.setAnimation(0, "gun", false);
            value.node.getChildByName("Background").getChildByName("weapon").active = false;
            var sprite = value.node.getChildByName("Background").getChildByName("weaponSprite").getComponent(cc.Sprite);
            var bLock = World_1.World.Storage.gameLevel < cfg['unlock'];
            sprite.setMaterial(0, cc.Material.getBuiltinMaterial(bLock ? "2d-gray-sprite" : "2d-sprite"));
            sprite.node.opacity = bLock ? 128 : 255;
        });
        cc.find('Canvas').on("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    WeaponLayerController.prototype.start = function () {
        /** 选中最新解锁的武器 */
        var num = 0;
        for (var _i = 0, _a = this._orders; _i < _a.length; _i++) {
            var item = _a[_i];
            if (World_1.World.Storage.gameLevel >= item['unlock']) {
                num++;
            }
            else {
                break;
            }
        }
        if (num <= 3) {
            this.scrollView.scrollToLeft();
        }
        else if (num >= this._orders.length - 1) {
            this.scrollView.scrollToRight();
        }
        else {
            var x = (num - 3) * this.weaponButtons[0].node.width;
            this.scrollView.scrollToOffset(cc.v2(x, this.scrollView.content.y));
        }
        this.weaponFocus = num - 1;
        if (World_1.World.Storage.unlockGun > 0) {
            var index = this._orders.findIndex(function (value) { return value['id'] == World_1.World.Storage.unlockGun; });
            if (typeof index == "undefined") {
                console.error("not found gun for id===>", World_1.World.Storage.unlockGun);
            }
            else {
                this.trialNode.removeFromParent(false);
                this.trialNode.active = true;
                this.weaponButtons[index].node.addChild(this.trialNode);
            }
        }
    };
    WeaponLayerController.prototype.onDestroy = function () {
        cc.find('Canvas').off("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    WeaponLayerController.prototype.onUpdateStorageEvent = function (key) {
        if (key == "goldCount") {
            var cfg = this._orders[this._weaponFocus];
            var id = cfg['id'];
            var firePowerLv = World_1.World.My.armory.levelOfEmitterFirePower(id);
            if (firePowerLv < cfg['lv_limit']) {
                var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[firePowerLv - 1]['fire_expend'];
                this.firePowerButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.firePowerCostLabel.node.color = this.firePowerButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
            var powerLv = World_1.World.My.armory.levelOfEmitterPower(id);
            if (powerLv < cfg['lv_limit']) {
                var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[powerLv - 1]['power_expend'];
                this.powerButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.powerCostLabel.node.color = this.powerButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
        }
    };
    WeaponLayerController.prototype.updateFirePower = function () {
        var cfg = this._orders[this._weaponFocus];
        var id = cfg['id'];
        var firePowerLv = World_1.World.My.armory.levelOfEmitterFirePower(id);
        this.firePowerLvLabel.string = "<b><outline color=#1e1e1e width=4>\u5F39\u91CF [Lv." + firePowerLv + "]</outline></b>";
        if (firePowerLv >= cfg['lv_limit']) {
            this.firePowerCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.firePowerButton.interactable = false;
        }
        else {
            var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[firePowerLv - 1]['fire_expend'];
            this.firePowerCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.firePowerButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.firePowerCostLabel.node.color = this.firePowerButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        this.firePowerWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(World_1.World.My.armory.payloadAddOf(id)) + "</outline></b>";
    };
    WeaponLayerController.prototype.updatePower = function () {
        var cfg = this._orders[this._weaponFocus];
        var id = cfg['id'];
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(id);
        this.powerLvLabel.string = "<b><outline color=#1e1e1e width=4>\u706B\u529B [Lv." + powerLv + "]</outline></b>";
        if (powerLv >= cfg['lv_limit']) {
            this.powerCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.powerButton.interactable = false;
        }
        else {
            var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[powerLv - 1]['power_expend'];
            this.powerCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.powerButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.powerCostLabel.node.color = this.powerButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        var hurt_add = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[powerLv - 1]['hurt_add'];
        this.powerWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Math.floor(hurt_add * 100) + "%</outline></b>";
    };
    WeaponLayerController.prototype.onClickWeapon = function (event, data) {
        console.log("【click】WeaponLayerController Weapon");
        data = parseInt(data);
        var cfg = this._orders[data - 2];
        var bLock = World_1.World.Storage.gameLevel < cfg['unlock'];
        if (bLock) {
            Toast_1.default.flutter({ string: "<color=#faffff><b><outline color=#1e1e1e width=4>\u7B2C" + cfg['unlock'] + "\u5173\u89E3\u9501\u8BE5\u6B66\u5668</outline></b></color>", fontSize: 30, y: cc.visibleRect.center.y });
        }
        else {
            this.weaponButtons[this._weaponFocus].node.getChildByName("Background").getChildByName("weaponSprite").active = true;
            this.weaponButtons[this._weaponFocus].node.getChildByName("Background").getChildByName("weapon").active = false;
            this.weaponFocus = data - 2;
        }
    };
    WeaponLayerController.prototype.onClickUpWeaponFirePower = function (event, data) {
        console.log("【click】WeaponLayerController UpWeaponFirePower");
        var cfg = this._orders[this._weaponFocus];
        var id = cfg['id'];
        var firePowerLv = World_1.World.My.armory.levelOfEmitterFirePower(id);
        if (firePowerLv >= World_1.World.Storage.ADLv) {
            Toast_1.default.flutter({ string: "<color=#faffff><b><outline color=#1e1e1e width=4>等级不得高于基础战斗力</outline></b></color>", fontSize: 30, y: cc.visibleRect.center.y });
            return;
        }
        var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[firePowerLv - 1]['fire_expend'];
        World_1.World.Storage.goldCount -= needCost;
        World_1.World.My.armory.addLevelOfEmitterFirePower(id, 1);
        this.updateFirePower();
        Facade_1.default.canvasNode.emit("WeaponUp");
    };
    WeaponLayerController.prototype.onClickUpWeaponPower = function (event, data) {
        console.log("【click】WeaponLayerController UpWeaponPower");
        var cfg = this._orders[this._weaponFocus];
        var id = cfg['id'];
        var powerLv = World_1.World.My.armory.levelOfEmitterPower(id);
        if (powerLv >= World_1.World.Storage.ADLv) {
            Toast_1.default.flutter({ string: "<color=#faffff><b><outline color=#1e1e1e width=4>等级不得高于基础战斗力</outline></b></color>", fontSize: 30, y: cc.visibleRect.center.y });
            return;
        }
        var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[powerLv - 1]['power_expend'];
        World_1.World.Storage.goldCount -= needCost;
        World_1.World.My.armory.addLevelOfEmitterPower(id, 1);
        this.updatePower();
        Facade_1.default.canvasNode.emit("WeaponUp");
    };
    WeaponLayerController.prototype.onClickToggle = function (toggle, data) {
        console.log("【click】WeaponLayerController Toggle");
        if (toggle.isChecked) {
            if (World_1.World.Storage.unlockGun > 0) {
                /** 切换focus */
                var index = this._orders.findIndex(function (value) { return value['id'] == World_1.World.Storage.unlockGun; });
                console.log("index===>", index);
                if (typeof index == "undefined") {
                    console.error("not found gun for id===>", World_1.World.Storage.unlockGun);
                }
                else {
                    this.weaponFocus = index;
                    /** 播放流光动画 */
                    this.weaponButtons[index].node.getChildByName("Background").getChildByName("weaponSprite").active = false;
                    this.weaponButtons[index].node.getChildByName("Background").getChildByName("weapon").active = true;
                    this.weaponButtons[index].node.getChildByName("Background").getChildByName("weapon").getComponent(sp.Skeleton).setAnimation(0, "gun_002", true);
                }
            }
        }
    };
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "firePowerLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "powerLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "firePowerCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "powerCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "firePowerWorthLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], WeaponLayerController.prototype, "powerWorthLabel", void 0);
    __decorate([
        property(cc.Button)
    ], WeaponLayerController.prototype, "firePowerButton", void 0);
    __decorate([
        property(cc.Button)
    ], WeaponLayerController.prototype, "powerButton", void 0);
    __decorate([
        property(cc.ScrollView)
    ], WeaponLayerController.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Node)
    ], WeaponLayerController.prototype, "upEffectNode", void 0);
    __decorate([
        property(cc.Node)
    ], WeaponLayerController.prototype, "trialNode", void 0);
    WeaponLayerController = __decorate([
        ccclass
    ], WeaponLayerController);
    return WeaponLayerController;
}(cc.Component));
exports.default = WeaponLayerController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvV2VhcG9uTGF5ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBb0M7QUFHcEMsMkRBQXFEO0FBQ3JELHlEQUFvRDtBQUNwRCxxRUFBa0U7QUFDbEUsNkRBQTBEO0FBQzFELDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQW1QQztRQWhQRyxzQkFBZ0IsR0FBZ0IsSUFBSSxDQUFDO1FBR3JDLGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUdqQyx3QkFBa0IsR0FBZ0IsSUFBSSxDQUFDO1FBR3ZDLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyx5QkFBbUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3hDLHFCQUFlLEdBQWdCLElBQUksQ0FBQztRQUdwQyxxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFHaEMsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUV6QixtQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUV2QixrQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBc0JsQixhQUFPLEdBQUcsRUFBRSxDQUFDOztJQXdMekIsQ0FBQztJQTVNRywwQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Qsc0JBQUksOENBQVc7YUFBZixVQUFnQixLQUFhO1lBQTdCLGlCQVFDO1lBUEcsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssRUFBQztnQkFDM0IsSUFBSSxDQUFD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WUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ25KO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUEvT0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzttRUFDZTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytEQUNXO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7cUVBQ2lCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUVBQ2E7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzRUFDa0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztrRUFDYztJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tFQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OERBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs2REFDUTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NERBQ087SUFqQ1IscUJBQXFCO1FBRHpDLE9BQU87T0FDYSxxQkFBcUIsQ0FtUHpDO0lBQUQsNEJBQUM7Q0FuUEQsQUFtUEMsQ0FuUGtELEVBQUUsQ0FBQyxTQUFTLEdBbVA5RDtrQkFuUG9CLHFCQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCB7TmV0d29ya0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9OZXR3b3JrQ29uZmlnXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IFRvYXN0IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL1RvYXN0XCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFwb25MYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGZpcmVQb3dlckx2TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwb3dlckx2TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBmaXJlUG93ZXJDb3N0TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwb3dlckNvc3RMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGZpcmVQb3dlcldvcnRoTGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwb3dlcldvcnRoTGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgZmlyZVBvd2VyQnV0dG9uOmNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHBvd2VyQnV0dG9uOmNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXHJcbiAgICBzY3JvbGxWaWV3OmNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdXBFZmZlY3ROb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHJpYWxOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHdlYXBvbkJ1dHRvbnM6W2NjLkJ1dHRvbl0gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF93ZWFwb25Gb2N1cyA9IC0xO1xyXG5cclxuICAgIGZvY3VzR3VuSUQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXJzW3RoaXMuX3dlYXBvbkZvY3VzXVsnaWQnXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0IHdlYXBvbkZvY3VzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2VhcG9uRm9jdXMgIT0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLnVwRWZmZWN0Tm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdXR0b25zW3ZhbHVlXS5ub2RlLmFkZENoaWxkKHRoaXMudXBFZmZlY3ROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uRm9jdXMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdXR0b25zLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUudGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBpbmRleCA9PSB0aGlzLl93ZWFwb25Gb2N1cyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2VhcG9uQXR0cigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVXZWFwb25BdHRyKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaXJlUG93ZXIoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBvd2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb3JkZXJzID0gW107XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnRyaWFsTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndlYXBvbkJ1dHRvbnMgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5jaGlsZHJlbi5tYXAodmFsdWUgPT4gdmFsdWUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pO1xyXG4gICAgICAgIHRoaXMuX29yZGVycyA9IGNvbmZpZy5maWx0ZXIodmFsdWUgPT4gdmFsdWVbJ2lkJ10gIT0gMSkuc29ydCgoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFbJ29yZGVyJ10gLSBiWydvcmRlciddO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLndlYXBvbkJ1dHRvbnMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcnNlSW50KHZhbHVlLm5vZGUubmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBjZmcgPSB0aGlzLl9vcmRlcnNbaWQtMl07XHJcbiAgICAgICAgICAgIHZhbHVlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjZmdbJ2d1bl9uYW1lJ107XHJcbiAgICAgICAgICAgIC8vIGxldCB3ZWFwb25Ta2UgPSB2YWx1ZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIndlYXBvblwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAvLyB3ZWFwb25Ta2Uuc2V0U2tpbigoXCIwMDBcIitjZmdbJ2lkJ10pLnN1YnN0cigtMykpO1xyXG4gICAgICAgICAgICAvLyB3ZWFwb25Ta2Uuc2V0QW5pbWF0aW9uKDAsIFwiZ3VuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgdmFsdWUubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWFwb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzcHJpdGUgPSB2YWx1ZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIndlYXBvblNwcml0ZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgbGV0IGJMb2NrID0gV29ybGQuU3RvcmFnZS5nYW1lTGV2ZWwgPCBjZmdbJ3VubG9jayddO1xyXG4gICAgICAgICAgICBzcHJpdGUuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKGJMb2NrP1wiMmQtZ3JheS1zcHJpdGVcIjpcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLm9wYWNpdHkgPSBiTG9jaz8xMjg6MjU1O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLm9uKFwiVXBkYXRlU3RvcmFnZVwiLCB0aGlzLm9uVXBkYXRlU3RvcmFnZUV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIC8qKiDpgInkuK3mnIDmlrDop6PplIHnmoTmrablmaggKi9cclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuX29yZGVycyl7XHJcbiAgICAgICAgICAgIGlmIChXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCA+PSBpdGVtWyd1bmxvY2snXSl7XHJcbiAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudW0gPD0gMyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0xlZnQoKTtcclxuICAgICAgICB9ZWxzZSBpZiAobnVtID49IHRoaXMuX29yZGVycy5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvUmlnaHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgeCA9IChudW0tMykgKiB0aGlzLndlYXBvbkJ1dHRvbnNbMF0ubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKHgsIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53ZWFwb25Gb2N1cyA9IG51bS0xO1xyXG4gICAgICAgIGlmIChXb3JsZC5TdG9yYWdlLnVubG9ja0d1biA+IDApe1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9vcmRlcnMuZmluZEluZGV4KHZhbHVlID0+IHZhbHVlWydpZCddID09IFdvcmxkLlN0b3JhZ2UudW5sb2NrR3VuKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJub3QgZm91bmQgZ3VuIGZvciBpZD09PT5cIiwgV29ybGQuU3RvcmFnZS51bmxvY2tHdW4pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWFsTm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpYWxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbkJ1dHRvbnNbaW5kZXhdLm5vZGUuYWRkQ2hpbGQodGhpcy50cmlhbE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLm9mZihcIlVwZGF0ZVN0b3JhZ2VcIiwgdGhpcy5vblVwZGF0ZVN0b3JhZ2VFdmVudCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGVTdG9yYWdlRXZlbnQoa2V5OnN0cmluZyl7XHJcbiAgICAgICAgaWYgKGtleSA9PSBcImdvbGRDb3VudFwiKXtcclxuICAgICAgICAgICAgbGV0IGNmZyA9IHRoaXMuX29yZGVyc1t0aGlzLl93ZWFwb25Gb2N1c107XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGNmZ1snaWQnXTtcclxuICAgICAgICAgICAgbGV0IGZpcmVQb3dlckx2ID0gV29ybGQuTXkuYXJtb3J5LmxldmVsT2ZFbWl0dGVyRmlyZVBvd2VyKGlkKTtcclxuICAgICAgICAgICAgaWYgKGZpcmVQb3dlckx2IDwgY2ZnWydsdl9saW1pdCddKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtmaXJlUG93ZXJMdi0xXVsnZmlyZV9leHBlbmQnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZVBvd2VyQnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlUG93ZXJDb3N0TGFiZWwubm9kZS5jb2xvciA9IHRoaXMuZmlyZVBvd2VyQnV0dG9uLmludGVyYWN0YWJsZT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQuZnJvbUhFWChcIiM5MjQzMzhcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBvd2VyTHYgPSBXb3JsZC5NeS5hcm1vcnkubGV2ZWxPZkVtaXR0ZXJQb3dlcihpZCk7XHJcbiAgICAgICAgICAgIGlmIChwb3dlckx2IDwgY2ZnWydsdl9saW1pdCddKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtwb3dlckx2LTFdWydwb3dlcl9leHBlbmQnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJCdXR0b24uaW50ZXJhY3RhYmxlID0gV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gbmVlZENvc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VyQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLnBvd2VyQnV0dG9uLmludGVyYWN0YWJsZT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQuZnJvbUhFWChcIiM5MjQzMzhcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlyZVBvd2VyKCl7XHJcbiAgICAgICAgbGV0IGNmZyA9IHRoaXMuX29yZGVyc1t0aGlzLl93ZWFwb25Gb2N1c107XHJcbiAgICAgICAgbGV0IGlkID0gY2ZnWydpZCddO1xyXG4gICAgICAgIGxldCBmaXJlUG93ZXJMdiA9IFdvcmxkLk15LmFybW9yeS5sZXZlbE9mRW1pdHRlckZpcmVQb3dlcihpZCk7XHJcbiAgICAgICAgdGhpcy5maXJlUG93ZXJMdkxhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTQ+5by56YePIFtMdi4ke2ZpcmVQb3dlckx2fV08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgaWYgKGZpcmVQb3dlckx2ID49IGNmZ1snbHZfbGltaXQnXSl7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZVBvd2VyQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+5ruh57qnPC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVQb3dlckJ1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbmVlZENvc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcClbZmlyZVBvd2VyTHYtMV1bJ2ZpcmVfZXhwZW5kJ107XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZVBvd2VyQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQobmVlZENvc3QpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICAgICAgdGhpcy5maXJlUG93ZXJCdXR0b24uaW50ZXJhY3RhYmxlID0gV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gbmVlZENvc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmlyZVBvd2VyQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmZpcmVQb3dlckJ1dHRvbi5pbnRlcmFjdGFibGU/Y2MuQ29sb3IuV0hJVEU6Y2MuQ29sb3IuUkVELmZyb21IRVgoXCIjOTI0MzM4XCIpO1xyXG4gICAgICAgIHRoaXMuZmlyZVBvd2VyV29ydGhMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7ZXh0LnNob3J0Rm9ybWF0KFdvcmxkLk15LmFybW9yeS5wYXlsb2FkQWRkT2YoaWQpKX08L291dGxpbmU+PC9iPmA7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG93ZXIoKXtcclxuICAgICAgICBsZXQgY2ZnID0gdGhpcy5fb3JkZXJzW3RoaXMuX3dlYXBvbkZvY3VzXTtcclxuICAgICAgICBsZXQgaWQgPSBjZmdbJ2lkJ107XHJcbiAgICAgICAgbGV0IHBvd2VyTHYgPSBXb3JsZC5NeS5hcm1vcnkubGV2ZWxPZkVtaXR0ZXJQb3dlcihpZCk7XHJcbiAgICAgICAgdGhpcy5wb3dlckx2TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9ND7ngavlipsgW0x2LiR7cG93ZXJMdn1dPC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgICAgIGlmIChwb3dlckx2ID49IGNmZ1snbHZfbGltaXQnXSl7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJDb3N0TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz7mu6Hnuqc8L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJCdXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbmVlZENvc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcClbcG93ZXJMdi0xXVsncG93ZXJfZXhwZW5kJ107XHJcbiAgICAgICAgICAgIHRoaXMucG93ZXJDb3N0TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz4ke2V4dC5zaG9ydEZvcm1hdChuZWVkQ29zdCl9PC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyQnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvd2VyQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLnBvd2VyQnV0dG9uLmludGVyYWN0YWJsZT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQuZnJvbUhFWChcIiM5MjQzMzhcIik7XHJcbiAgICAgICAgbGV0IGh1cnRfYWRkID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uVXApW3Bvd2VyTHYtMV1bJ2h1cnRfYWRkJ107XHJcbiAgICAgICAgdGhpcy5wb3dlcldvcnRoTGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz4ke01hdGguZmxvb3IoaHVydF9hZGQqMTAwKX0lPC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tXZWFwb24oZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFXZWFwb25MYXllckNvbnRyb2xsZXIgV2VhcG9uXCIpXHJcblxyXG4gICAgICAgIGRhdGEgPSBwYXJzZUludChkYXRhKTtcclxuICAgICAgICBsZXQgY2ZnID0gdGhpcy5fb3JkZXJzW2RhdGEtMl07XHJcbiAgICAgICAgbGV0IGJMb2NrID0gV29ybGQuU3RvcmFnZS5nYW1lTGV2ZWwgPCBjZmdbJ3VubG9jayddO1xyXG4gICAgICAgIGlmIChiTG9jayl7XHJcbiAgICAgICAgICAgIFRvYXN0LmZsdXR0ZXIoe3N0cmluZzpgPGNvbG9yPSNmYWZmZmY+PGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD00PuesrCR7Y2ZnWyd1bmxvY2snXX3lhbPop6PplIHor6Xmrablmag8L291dGxpbmU+PC9iPjwvY29sb3I+YCwgZm9udFNpemU6MzAsIHk6Y2MudmlzaWJsZVJlY3QuY2VudGVyLnl9KTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uQnV0dG9uc1t0aGlzLl93ZWFwb25Gb2N1c10ubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWFwb25TcHJpdGVcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25CdXR0b25zW3RoaXMuX3dlYXBvbkZvY3VzXS5ub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIndlYXBvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb25Gb2N1cyA9IGRhdGEgLSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVXBXZWFwb25GaXJlUG93ZXIoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFXZWFwb25MYXllckNvbnRyb2xsZXIgVXBXZWFwb25GaXJlUG93ZXJcIilcclxuXHJcbiAgICAgICAgbGV0IGNmZyA9IHRoaXMuX29yZGVyc1t0aGlzLl93ZWFwb25Gb2N1c107XHJcbiAgICAgICAgbGV0IGlkID0gY2ZnWydpZCddO1xyXG4gICAgICAgIGxldCBmaXJlUG93ZXJMdiA9IFdvcmxkLk15LmFybW9yeS5sZXZlbE9mRW1pdHRlckZpcmVQb3dlcihpZCk7XHJcbiAgICAgICAgaWYgKGZpcmVQb3dlckx2ID49IFdvcmxkLlN0b3JhZ2UuQURMdil7XHJcbiAgICAgICAgICAgIFRvYXN0LmZsdXR0ZXIoe3N0cmluZzpcIjxjb2xvcj0jZmFmZmZmPjxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9ND7nrYnnuqfkuI3lvpfpq5jkuo7ln7rnoYDmiJjmlpflips8L291dGxpbmU+PC9iPjwvY29sb3I+XCIsIGZvbnRTaXplOjMwLCB5OmNjLnZpc2libGVSZWN0LmNlbnRlci55fSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5lZWRDb3N0ID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uVXApW2ZpcmVQb3dlckx2LTFdWydmaXJlX2V4cGVuZCddO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50IC09IG5lZWRDb3N0O1xyXG4gICAgICAgIFdvcmxkLk15LmFybW9yeS5hZGRMZXZlbE9mRW1pdHRlckZpcmVQb3dlcihpZCwgMSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaXJlUG93ZXIoKTtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiV2VhcG9uVXBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1VwV2VhcG9uUG93ZXIoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFXZWFwb25MYXllckNvbnRyb2xsZXIgVXBXZWFwb25Qb3dlclwiKVxyXG5cclxuICAgICAgICBsZXQgY2ZnID0gdGhpcy5fb3JkZXJzW3RoaXMuX3dlYXBvbkZvY3VzXTtcclxuICAgICAgICBsZXQgaWQgPSBjZmdbJ2lkJ107XHJcbiAgICAgICAgbGV0IHBvd2VyTHYgPSBXb3JsZC5NeS5hcm1vcnkubGV2ZWxPZkVtaXR0ZXJQb3dlcihpZCk7XHJcbiAgICAgICAgaWYgKHBvd2VyTHYgPj0gV29ybGQuU3RvcmFnZS5BREx2KXtcclxuICAgICAgICAgICAgVG9hc3QuZmx1dHRlcih7c3RyaW5nOlwiPGNvbG9yPSNmYWZmZmY+PGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD00Puetiee6p+S4jeW+l+mrmOS6juWfuuehgOaImOaWl+WKmzwvb3V0bGluZT48L2I+PC9jb2xvcj5cIiwgZm9udFNpemU6MzAsIHk6Y2MudmlzaWJsZVJlY3QuY2VudGVyLnl9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmVlZENvc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcClbcG93ZXJMdi0xXVsncG93ZXJfZXhwZW5kJ107XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgLT0gbmVlZENvc3Q7XHJcbiAgICAgICAgV29ybGQuTXkuYXJtb3J5LmFkZExldmVsT2ZFbWl0dGVyUG93ZXIoaWQsIDEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUG93ZXIoKTtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiV2VhcG9uVXBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1RvZ2dsZSh0b2dnbGUsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFXZWFwb25MYXllckNvbnRyb2xsZXIgVG9nZ2xlXCIpXHJcblxyXG4gICAgICAgIGlmICh0b2dnbGUuaXNDaGVja2VkKXtcclxuICAgICAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UudW5sb2NrR3VuID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvKiog5YiH5o2iZm9jdXMgKi9cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX29yZGVycy5maW5kSW5kZXgodmFsdWUgPT4gdmFsdWVbJ2lkJ10gPT0gV29ybGQuU3RvcmFnZS51bmxvY2tHdW4pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbmRleD09PT5cIiwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibm90IGZvdW5kIGd1biBmb3IgaWQ9PT0+XCIsIFdvcmxkLlN0b3JhZ2UudW5sb2NrR3VuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWFwb25Gb2N1cyA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKiDmkq3mlL7mtYHlhYnliqjnlLsgKi9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYXBvbkJ1dHRvbnNbaW5kZXhdLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENoaWxkQnlOYW1lKFwid2VhcG9uU3ByaXRlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uQnV0dG9uc1tpbmRleF0ubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWFwb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYXBvbkJ1dHRvbnNbaW5kZXhdLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENoaWxkQnlOYW1lKFwid2VhcG9uXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwiZ3VuXzAwMlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=