"use strict";
cc._RF.push(module, 'f61265lNHFLoLCiFgJtZAnX', 'RoleLayerController');
// script/app/home/RoleLayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Extend_1 = require("../../../framework/extend/Extend");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleLayerController = /** @class */ (function (_super) {
    __extends(RoleLayerController, _super);
    function RoleLayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpLvLabel = null;
        _this.adLvLabel = null;
        _this.hpCostLabel = null;
        _this.adCostLabel = null;
        _this.hpWorthLabel = null;
        _this.adWorthLabel = null;
        _this.hpLvButton = null;
        _this.adButton = null;
        _this._AdUpCount = 0;
        return _this;
    }
    RoleLayerController.prototype.onLoad = function () {
        this.updateHpUp();
        this.updateAdUp();
        cc.find('Canvas').on("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    RoleLayerController.prototype.onDestroy = function () {
        cc.find('Canvas').off("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    RoleLayerController.prototype.onUpdateStorageEvent = function (key) {
        if (key == "goldCount") {
            var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
            if (World_1.World.Storage.HpLv < config['lv_limit']) {
                var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.HpLv - 1]['life_expend'];
                this.hpLvButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.hpCostLabel.node.color = this.hpLvButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
            if (World_1.World.Storage.ADLv < config['lv_limit']) {
                var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.ADLv - 1]['fight_expend'];
                this.adButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.adCostLabel.node.color = this.adButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
        }
    };
    RoleLayerController.prototype.updateHpUp = function () {
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hpLvLabel.string = "<b><outline color=#1e1e1e width=4>\u751F\u547D\u529BLv." + World_1.World.Storage.HpLv + "</outline></b>";
        if (World_1.World.Storage.HpLv >= config['lv_limit']) {
            this.hpCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.hpLvButton.interactable = false;
        }
        else {
            var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.HpLv - 1]['life_expend'];
            this.hpCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.hpLvButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.hpCostLabel.node.color = this.hpLvButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        var life = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.HpLv - 1]['life'];
        this.hpWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(life) + "</outline></b>";
    };
    RoleLayerController.prototype.updateAdUp = function () {
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.adLvLabel.string = "<b><outline color=#1e1e1e width=4>\u6218\u529BLv." + World_1.World.Storage.ADLv + "</outline></b>";
        if (World_1.World.Storage.ADLv >= config['lv_limit']) {
            this.adCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.adButton.interactable = false;
        }
        else {
            var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.ADLv - 1]['fight_expend'];
            this.adCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.adButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.adCostLabel.node.color = this.adButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        var fight = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.ADLv - 1]['fight'];
        this.adWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(fight) + "</outline></b>";
    };
    RoleLayerController.prototype.onClickUpHpLv = function (event, data) {
        console.log("【click】RoleLayerController UpHpLv");
        var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.HpLv - 1]['life_expend'];
        World_1.World.Storage.goldCount -= needCost;
        World_1.World.Storage.HpLv++;
        this.updateHpUp();
        Facade_1.default.canvasNode.emit("RoleUp");
    };
    RoleLayerController.prototype.onClickUpADLv = function (event, data) {
        console.log("【click】RoleLayerController UpADLv");
        var needCost = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.ADLv - 1]['fight_expend'];
        World_1.World.Storage.goldCount -= needCost;
        World_1.World.Storage.ADLv++;
        this.updateAdUp();
        Facade_1.default.canvasNode.emit("RoleUp");
        this._AdUpCount++;
        var newbieNode = cc.director.getScene().getChildByName("newbieNode");
        if (newbieNode && (!this.adButton.interactable || this._AdUpCount > 2)) {
            newbieNode.destroy();
            World_1.World.My.newbies.finish("FirstRoleUp");
        }
    };
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "hpLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "adLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "hpCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "adCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "hpWorthLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], RoleLayerController.prototype, "adWorthLabel", void 0);
    __decorate([
        property(cc.Button)
    ], RoleLayerController.prototype, "hpLvButton", void 0);
    __decorate([
        property(cc.Button)
    ], RoleLayerController.prototype, "adButton", void 0);
    RoleLayerController = __decorate([
        ccclass
    ], RoleLayerController);
    return RoleLayerController;
}(cc.Component));
exports.default = RoleLayerController;

cc._RF.pop();