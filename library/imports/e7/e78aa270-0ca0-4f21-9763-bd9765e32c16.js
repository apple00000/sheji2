"use strict";
cc._RF.push(module, 'e78aaJwDKBPIZdjvZdl4ywW', 'EarningsLayerController');
// script/app/home/EarningsLayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var Extend_1 = require("../../../framework/extend/Extend");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EarningsLayerController = /** @class */ (function (_super) {
    __extends(EarningsLayerController, _super);
    function EarningsLayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goldLvLabel = null;
        _this.dayEarnLvLabel = null;
        _this.goldCostLabel = null;
        _this.dayEarnCostLabel = null;
        _this.goldWorthLabel = null;
        _this.dayEarnWorthLabel = null;
        _this.goldLvButton = null;
        _this.dayEarnButton = null;
        return _this;
    }
    EarningsLayerController.prototype.onLoad = function () {
        this.updateGoldUp();
        this.updateDayEarnUp();
        cc.find('Canvas').on("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    EarningsLayerController.prototype.onDestroy = function () {
        cc.find('Canvas').off("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    EarningsLayerController.prototype.onUpdateStorageEvent = function (key) {
        if (key == "goldCount") {
            var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
            if (World_1.World.Storage.goldLv < cfg.length) {
                var needCost = cfg[World_1.World.Storage.goldLv - 1]['gvalue_expend'];
                this.goldLvButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.goldCostLabel.node.color = this.goldLvButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
            if (World_1.World.Storage.dayEarnLv < cfg.length) {
                var needCost = cfg[World_1.World.Storage.dayEarnLv - 1]['on_hook_expend'];
                this.dayEarnButton.interactable = World_1.World.Storage.goldCount >= needCost;
                this.dayEarnCostLabel.node.color = this.dayEarnButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
            }
        }
    };
    EarningsLayerController.prototype.updateGoldUp = function () {
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        this.goldLvLabel.string = "<b><outline color=#1e1e1e width=4>\u91D1\u5E01\u4EF7\u503CLv." + World_1.World.Storage.goldLv + "</outline></b>";
        if (World_1.World.Storage.goldLv >= cfg.length) {
            this.goldCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.goldLvButton.interactable = false;
        }
        else {
            var needCost = cfg[World_1.World.Storage.goldLv - 1]['gvalue_expend'];
            this.goldCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.goldLvButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.goldCostLabel.node.color = this.goldLvButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        this.goldWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Math.floor(cfg[World_1.World.Storage.goldLv - 1]['gvalue'] * 100) + "%</outline></b>";
    };
    EarningsLayerController.prototype.updateDayEarnUp = function () {
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        this.dayEarnLvLabel.string = "<b><outline color=#1e1e1e width=4>\u65E5\u5E38\u6536\u76CALv." + World_1.World.Storage.dayEarnLv + "</outline></b>";
        if (World_1.World.Storage.dayEarnLv >= cfg.length) {
            this.dayEarnCostLabel.string = "<b><outline color=#1e1e1e width=3>\u6EE1\u7EA7</outline></b>";
            this.dayEarnButton.interactable = false;
        }
        else {
            var needCost = cfg[World_1.World.Storage.dayEarnLv - 1]['on_hook_expend'];
            this.dayEarnCostLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(needCost) + "</outline></b>";
            this.dayEarnButton.interactable = World_1.World.Storage.goldCount >= needCost;
        }
        this.dayEarnCostLabel.node.color = this.dayEarnButton.interactable ? cc.Color.WHITE : cc.Color.RED.fromHEX("#924338");
        this.dayEarnWorthLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(cfg[World_1.World.Storage.dayEarnLv - 1]['on_hook']) + "</outline></b>";
    };
    EarningsLayerController.prototype.onClickUpGoldLv = function (event, data) {
        console.log("【click】EarningsLayerController UpGoldLv");
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        var needCost = cfg[World_1.World.Storage.goldLv - 1]['gvalue_expend'];
        World_1.World.Storage.goldCount -= needCost;
        World_1.World.Storage.goldLv++;
        this.updateGoldUp();
        Facade_1.default.canvasNode.emit("GoldWorthUp");
    };
    EarningsLayerController.prototype.onClickUpDayEarnLv = function (event, data) {
        console.log("【click】EarningsLayerController UpDayEarnLv");
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        var needCost = cfg[World_1.World.Storage.dayEarnLv - 1]['on_hook_expend'];
        World_1.World.Storage.dayEarnLv++;
        World_1.World.Storage.goldCount -= needCost;
        this.updateDayEarnUp();
        Facade_1.default.canvasNode.emit("GoldDayEarnUp");
    };
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "goldLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "dayEarnLvLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "goldCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "dayEarnCostLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "goldWorthLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], EarningsLayerController.prototype, "dayEarnWorthLabel", void 0);
    __decorate([
        property(cc.Button)
    ], EarningsLayerController.prototype, "goldLvButton", void 0);
    __decorate([
        property(cc.Button)
    ], EarningsLayerController.prototype, "dayEarnButton", void 0);
    EarningsLayerController = __decorate([
        ccclass
    ], EarningsLayerController);
    return EarningsLayerController;
}(cc.Component));
exports.default = EarningsLayerController;

cc._RF.pop();