"use strict";
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