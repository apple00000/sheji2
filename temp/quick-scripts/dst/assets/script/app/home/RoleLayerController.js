
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/RoleLayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvUm9sZUxheWVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQW9DO0FBR3BDLHFFQUFrRTtBQUNsRSw2REFBMEQ7QUFDMUQsMkRBQXFEO0FBQ3JELDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQWdIQztRQTdHRyxlQUFTLEdBQWdCLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUc5QixpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFHaEMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQWUsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQWUsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFzRWxCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDOztJQWtCM0IsQ0FBQztJQXRGRyxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsa0RBQW9CLEdBQXBCLFVBQXFCLEdBQVU7UUFDM0IsSUFBSSxHQUFHLElBQUks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Q0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ007SUF4QlQsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0FnSHZDO0lBQUQsMEJBQUM7Q0FoSEQsQUFnSEMsQ0FoSGdELEVBQUUsQ0FBQyxTQUFTLEdBZ0g1RDtrQkFoSG9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCB7TmV0d29ya0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9OZXR3b3JrQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVMYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGhwTHZMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGFkTHZMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGhwQ29zdExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgYWRDb3N0TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBocFdvcnRoTGFiZWw6Y2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGFkV29ydGhMYWJlbDpjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIGhwTHZCdXR0b246Y2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgYWRCdXR0b246Y2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlSHBVcCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQWRVcCgpO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcycpLm9uKFwiVXBkYXRlU3RvcmFnZVwiLCB0aGlzLm9uVXBkYXRlU3RvcmFnZUV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5vZmYoXCJVcGRhdGVTdG9yYWdlXCIsIHRoaXMub25VcGRhdGVTdG9yYWdlRXZlbnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlU3RvcmFnZUV2ZW50KGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGlmIChrZXkgPT0gXCJnb2xkQ291bnRcIil7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pWzBdO1xyXG4gICAgICAgICAgICBpZiAoV29ybGQuU3RvcmFnZS5IcEx2IDwgY29uZmlnWydsdl9saW1pdCddKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkhwTHYtMV1bJ2xpZmVfZXhwZW5kJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwTHZCdXR0b24uaW50ZXJhY3RhYmxlID0gV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gbmVlZENvc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmhwTHZCdXR0b24uaW50ZXJhY3RhYmxlP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRC5mcm9tSEVYKFwiIzkyNDMzOFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoV29ybGQuU3RvcmFnZS5BREx2IDwgY29uZmlnWydsdl9saW1pdCddKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkFETHYtMV1bJ2ZpZ2h0X2V4cGVuZCddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCA+PSBuZWVkQ29zdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRDb3N0TGFiZWwubm9kZS5jb2xvciA9IHRoaXMuYWRCdXR0b24uaW50ZXJhY3RhYmxlP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRC5mcm9tSEVYKFwiIzkyNDMzOFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIcFVwKCl7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbilbMF07XHJcbiAgICAgICAgdGhpcy5ocEx2TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9ND7nlJ/lkb3liptMdi4ke1dvcmxkLlN0b3JhZ2UuSHBMdn08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuSHBMdiA+PSBjb25maWdbJ2x2X2xpbWl0J10pe1xyXG4gICAgICAgICAgICB0aGlzLmhwQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+5ruh57qnPC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgICAgICAgICB0aGlzLmhwTHZCdXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbmVlZENvc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcClbV29ybGQuU3RvcmFnZS5IcEx2LTFdWydsaWZlX2V4cGVuZCddO1xyXG4gICAgICAgICAgICB0aGlzLmhwQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQobmVlZENvc3QpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICAgICAgdGhpcy5ocEx2QnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhwQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmhwTHZCdXR0b24uaW50ZXJhY3RhYmxlP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRC5mcm9tSEVYKFwiIzkyNDMzOFwiKTtcclxuICAgICAgICBsZXQgbGlmZSA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkhwTHYtMV1bJ2xpZmUnXTtcclxuICAgICAgICB0aGlzLmhwV29ydGhMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7ZXh0LnNob3J0Rm9ybWF0KGxpZmUpfTwvb3V0bGluZT48L2I+YDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBZFVwKCl7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbilbMF07XHJcbiAgICAgICAgdGhpcy5hZEx2TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9ND7miJjliptMdi4ke1dvcmxkLlN0b3JhZ2UuQURMdn08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuQURMdiA+PSBjb25maWdbJ2x2X2xpbWl0J10pe1xyXG4gICAgICAgICAgICB0aGlzLmFkQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+5ruh57qnPC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgICAgICAgICB0aGlzLmFkQnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkFETHYtMV1bJ2ZpZ2h0X2V4cGVuZCddO1xyXG4gICAgICAgICAgICB0aGlzLmFkQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQobmVlZENvc3QpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICAgICAgdGhpcy5hZEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCA+PSBuZWVkQ29zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZENvc3RMYWJlbC5ub2RlLmNvbG9yID0gdGhpcy5hZEJ1dHRvbi5pbnRlcmFjdGFibGU/Y2MuQ29sb3IuV0hJVEU6Y2MuQ29sb3IuUkVELmZyb21IRVgoXCIjOTI0MzM4XCIpO1xyXG4gICAgICAgIGxldCBmaWdodCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkFETHYtMV1bJ2ZpZ2h0J107XHJcbiAgICAgICAgdGhpcy5hZFdvcnRoTGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz4ke2V4dC5zaG9ydEZvcm1hdChmaWdodCl9PC9vdXRsaW5lPjwvYj5gO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tVcEhwTHYoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFSb2xlTGF5ZXJDb250cm9sbGVyIFVwSHBMdlwiKVxyXG5cclxuICAgICAgICBsZXQgbmVlZENvc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb25VcClbV29ybGQuU3RvcmFnZS5IcEx2LTFdWydsaWZlX2V4cGVuZCddO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50IC09IG5lZWRDb3N0O1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuSHBMdisrO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSHBVcCgpO1xyXG4gICAgICAgIEZhY2FkZS5jYW52YXNOb2RlLmVtaXQoXCJSb2xlVXBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQWRVcENvdW50ID0gMDtcclxuXHJcbiAgICBvbkNsaWNrVXBBREx2KGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkGNsaWNr44CRUm9sZUxheWVyQ29udHJvbGxlciBVcEFETHZcIilcclxuXHJcbiAgICAgICAgbGV0IG5lZWRDb3N0ID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uVXApW1dvcmxkLlN0b3JhZ2UuQURMdi0xXVsnZmlnaHRfZXhwZW5kJ107XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgLT0gbmVlZENvc3Q7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5BREx2Kys7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBZFVwKCk7XHJcbiAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUuZW1pdChcIlJvbGVVcFwiKTtcclxuICAgICAgICB0aGlzLl9BZFVwQ291bnQrKztcclxuICAgICAgICBsZXQgbmV3YmllTm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJuZXdiaWVOb2RlXCIpO1xyXG4gICAgICAgIGlmIChuZXdiaWVOb2RlICYmICghdGhpcy5hZEJ1dHRvbi5pbnRlcmFjdGFibGUgfHwgdGhpcy5fQWRVcENvdW50ID4gMikpe1xyXG4gICAgICAgICAgICBuZXdiaWVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgV29ybGQuTXkubmV3Ymllcy5maW5pc2goXCJGaXJzdFJvbGVVcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==