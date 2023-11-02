
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/EarningsLayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvRWFybmluZ3NMYXllckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFvQztBQUdwQywyREFBcUQ7QUFDckQscUVBQWtFO0FBQ2xFLDZEQUEwRDtBQUMxRCwyREFBc0Q7QUFFaEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUQsMkNBQVk7SUFBakU7UUFBQSxxRUF3R0M7UUFyR0csaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBR2hDLG9CQUFjLEdBQWdCLElBQUksQ0FBQztRQUduQyxtQkFBYSxHQUFnQixJQUFJLENBQUM7UUFHbEMsc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUdyQyxvQkFBYyxHQUFlLElBQUksQ0FBQztRQUdsQyx1QkFBaUIsR0FBZSxJQUFJLENBQUM7UUFHckMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7O0lBZ0ZuQyxDQUFDO0lBOUVHLHdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDJDQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxzREFBb0IsR0FBcEIsVUFBcUIsR0FBVTtRQUMzQixJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUM7WUFDbkIsSUFB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Q0FBQyxDQUFDO0lBQzVDLENBQUM7SUFwR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnRUFDVTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO21FQUNhO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0VBQ1k7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztxRUFDZTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO21FQUNZO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0VBQ2U7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpRUFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tFQUNXO0lBeEJkLHVCQUF1QjtRQUQzQyxPQUFPO09BQ2EsdUJBQXVCLENBd0czQztJQUFELDhCQUFDO0NBeEdELEFBd0dDLENBeEdvRCxFQUFFLENBQUMsU0FBUyxHQXdHaEU7a0JBeEdvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vY29uZmlnL05ldHdvcmtDb25maWdcIjtcclxuaW1wb3J0IE5ldHdvcmsgZnJvbSBcIi4uL25ldHdvcmsvTmV0d29ya1wiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYXJuaW5nc0xheWVyQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgZ29sZEx2TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBkYXlFYXJuTHZMYWJlbDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGdvbGRDb3N0TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBkYXlFYXJuQ29zdExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgZ29sZFdvcnRoTGFiZWw6Y2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGRheUVhcm5Xb3J0aExhYmVsOmNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgZ29sZEx2QnV0dG9uOmNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIGRheUVhcm5CdXR0b246Y2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlR29sZFVwKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXlFYXJuVXAoKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5vbihcIlVwZGF0ZVN0b3JhZ2VcIiwgdGhpcy5vblVwZGF0ZVN0b3JhZ2VFdmVudCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzJykub2ZmKFwiVXBkYXRlU3RvcmFnZVwiLCB0aGlzLm9uVXBkYXRlU3RvcmFnZUV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZVN0b3JhZ2VFdmVudChrZXk6c3RyaW5nKXtcclxuICAgICAgICBpZiAoa2V5ID09IFwiZ29sZENvdW50XCIpe1xyXG4gICAgICAgICAgICBsZXQgY2ZnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuR29sZFVwKTtcclxuICAgICAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZ29sZEx2IDwgY2ZnLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZENvc3QgPSBjZmdbV29ybGQuU3RvcmFnZS5nb2xkTHYtMV1bJ2d2YWx1ZV9leHBlbmQnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29sZEx2QnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmdvbGRMdkJ1dHRvbi5pbnRlcmFjdGFibGU/Y2MuQ29sb3IuV0hJVEU6Y2MuQ29sb3IuUkVELmZyb21IRVgoXCIjOTI0MzM4XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChXb3JsZC5TdG9yYWdlLmRheUVhcm5MdiA8IGNmZy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRDb3N0ID0gY2ZnW1dvcmxkLlN0b3JhZ2UuZGF5RWFybkx2LTFdWydvbl9ob29rX2V4cGVuZCddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXlFYXJuQnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXlFYXJuQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmRheUVhcm5CdXR0b24uaW50ZXJhY3RhYmxlP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRC5mcm9tSEVYKFwiIzkyNDMzOFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHb2xkVXAoKXtcclxuICAgICAgICBsZXQgY2ZnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuR29sZFVwKTtcclxuICAgICAgICB0aGlzLmdvbGRMdkxhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTQ+6YeR5biB5Lu35YC8THYuJHtXb3JsZC5TdG9yYWdlLmdvbGRMdn08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZ29sZEx2ID49IGNmZy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmdvbGRDb3N0TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz7mu6Hnuqc8L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZEx2QnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgbGV0IG5lZWRDb3N0ID0gY2ZnW1dvcmxkLlN0b3JhZ2UuZ29sZEx2LTFdWydndmFsdWVfZXhwZW5kJ107XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZENvc3RMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7ZXh0LnNob3J0Rm9ybWF0KG5lZWRDb3N0KX08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZEx2QnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdvbGRDb3N0TGFiZWwubm9kZS5jb2xvciA9IHRoaXMuZ29sZEx2QnV0dG9uLmludGVyYWN0YWJsZT9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQuZnJvbUhFWChcIiM5MjQzMzhcIik7XHJcbiAgICAgICAgdGhpcy5nb2xkV29ydGhMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7TWF0aC5mbG9vcihjZmdbV29ybGQuU3RvcmFnZS5nb2xkTHYtMV1bJ2d2YWx1ZSddKjEwMCl9JTwvb3V0bGluZT48L2I+YDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXlFYXJuVXAoKXtcclxuICAgICAgICBsZXQgY2ZnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuR29sZFVwKTtcclxuICAgICAgICB0aGlzLmRheUVhcm5MdkxhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTQ+5pel5bi45pS255uKTHYuJHtXb3JsZC5TdG9yYWdlLmRheUVhcm5Mdn08L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZGF5RWFybkx2ID49IGNmZy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmRheUVhcm5Db3N0TGFiZWwuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz7mu6Hnuqc8L291dGxpbmU+PC9iPmA7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5RWFybkJ1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuZWVkQ29zdCA9IGNmZ1tXb3JsZC5TdG9yYWdlLmRheUVhcm5Mdi0xXVsnb25faG9va19leHBlbmQnXTtcclxuICAgICAgICAgICAgdGhpcy5kYXlFYXJuQ29zdExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQobmVlZENvc3QpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICAgICAgdGhpcy5kYXlFYXJuQnV0dG9uLmludGVyYWN0YWJsZSA9IFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IG5lZWRDb3N0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kYXlFYXJuQ29zdExhYmVsLm5vZGUuY29sb3IgPSB0aGlzLmRheUVhcm5CdXR0b24uaW50ZXJhY3RhYmxlP2NjLkNvbG9yLldISVRFOmNjLkNvbG9yLlJFRC5mcm9tSEVYKFwiIzkyNDMzOFwiKTtcclxuICAgICAgICB0aGlzLmRheUVhcm5Xb3J0aExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQoY2ZnW1dvcmxkLlN0b3JhZ2UuZGF5RWFybkx2LTFdWydvbl9ob29rJ10pfTwvb3V0bGluZT48L2I+YDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVXBHb2xkTHYoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFFYXJuaW5nc0xheWVyQ29udHJvbGxlciBVcEdvbGRMdlwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjZmcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Hb2xkVXApO1xyXG4gICAgICAgIGxldCBuZWVkQ29zdCA9IGNmZ1tXb3JsZC5TdG9yYWdlLmdvbGRMdi0xXVsnZ3ZhbHVlX2V4cGVuZCddO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50IC09IG5lZWRDb3N0O1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZEx2Kys7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkVXAoKTtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiR29sZFdvcnRoVXBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1VwRGF5RWFybkx2KGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkGNsaWNr44CRRWFybmluZ3NMYXllckNvbnRyb2xsZXIgVXBEYXlFYXJuTHZcIilcclxuXHJcbiAgICAgICAgbGV0IGNmZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLkdvbGRVcCk7XHJcbiAgICAgICAgbGV0IG5lZWRDb3N0ID0gY2ZnW1dvcmxkLlN0b3JhZ2UuZGF5RWFybkx2LTFdWydvbl9ob29rX2V4cGVuZCddO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZGF5RWFybkx2Kys7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgLT0gbmVlZENvc3Q7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXlFYXJuVXAoKTtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiR29sZERheUVhcm5VcFwiKTtcclxuICAgIH1cclxufVxyXG4iXX0=