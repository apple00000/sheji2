
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/ExchangeController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '095cbB1T3BGjYPbnwd2ta5g', 'ExchangeController');
// script/app/home/ExchangeController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var Extend_1 = require("../../../framework/extend/Extend");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExchangeController = /** @class */ (function (_super) {
    __extends(ExchangeController, _super);
    function ExchangeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exchangeButton = null;
        _this.diamondLabel = null;
        _this.exchangeLabel = null;
        _this.exchangeSprite = null;
        _this.exchangeSpriteFrames = [];
        _this._diamondCount = 0;
        _this._type = 1;
        return _this;
    }
    Object.defineProperty(ExchangeController.prototype, "diamondCount", {
        get: function () {
            return this._diamondCount;
        },
        set: function (value) {
            this._diamondCount = value;
            if (this._type == 1) {
                this.exchangeLabel.string = Extend_1.ext.shortFormat(this.getGoldCount());
            }
            else {
                this.exchangeLabel.string = "" + this.getPowerCount();
            }
            this.updateView();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeController.prototype, "type", {
        set: function (value) {
            this._type = value;
            this.exchangeSprite.spriteFrame = this.exchangeSpriteFrames[this._type - 1];
            this.diamondCount = World_1.World.Storage.diamondCount;
        },
        enumerable: false,
        configurable: true
    });
    ExchangeController.prototype.getGoldCount = function () {
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        return cfg[World_1.World.Storage.goldLv - 1]['diamond_ex'] * this._diamondCount;
    };
    ExchangeController.prototype.getPowerCount = function () {
        return 5 * this._diamondCount;
    };
    ExchangeController.prototype.updateView = function () {
        this.exchangeButton.interactable = this._diamondCount > 0;
        this.diamondLabel.string = "" + this._diamondCount;
    };
    ExchangeController.prototype.onDiamondPlus = function () {
        if (this._diamondCount < World_1.World.Storage.diamondCount) {
            this.diamondCount++;
        }
    };
    ExchangeController.prototype.onDiamondMinus = function () {
        if (this._diamondCount > 0) {
            this.diamondCount--;
        }
    };
    ExchangeController.prototype.onExchange = function () {
        if (this._type == 1) {
            World_1.World.Storage.goldCount += this.getGoldCount();
        }
        else {
            World_1.World.Storage.power += this.getPowerCount();
        }
        this.node.destroy();
    };
    __decorate([
        property(cc.Button)
    ], ExchangeController.prototype, "exchangeButton", void 0);
    __decorate([
        property(cc.Label)
    ], ExchangeController.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], ExchangeController.prototype, "exchangeLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], ExchangeController.prototype, "exchangeSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ExchangeController.prototype, "exchangeSpriteFrames", void 0);
    ExchangeController = __decorate([
        ccclass
    ], ExchangeController);
    return ExchangeController;
}(cc.Component));
exports.default = ExchangeController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvRXhjaGFuZ2VDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBb0M7QUFDcEMsMkRBQXFEO0FBQ3JELHFFQUFrRTtBQUNsRSw2REFBMEQ7QUFFcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUE2RUM7UUExRUcsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsMEJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUVuQyxtQkFBYSxHQUFHLENBQUMsQ0FBQztRQWlCbEIsV0FBSyxHQUFHLENBQUMsQ0FBQzs7SUEyQ3RCLENBQUM7SUF6REcsc0JBQUksNENBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEtBQWE7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBQztnQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUNwRTtpQkFBSztnQkFDRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFHLElBQUksQ0FBQyxhQUFhLEVBQUksQ0FBQzthQUN6RDtZQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FWQTtJQWVELHNCQUFJLG9DQUFJO2FBQVIsVUFBUyxLQUFhO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbkQsQ0FBQzs7O09BQUE7SUFFRCx5Q0FBWSxHQUFaO1FBQ0ksSUFBSSxHQUFHLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxPQUFPLEdBQUcsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3hFLENBQUM7SUFFRCwwQ0FBYSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLGFBQWUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsMENBQWEsR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQztZQUNoRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO1lBQ2hCLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsRDthQUFLO1lBQ0YsYUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OERBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDVztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZEQUNZO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OERBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvRUFDa0I7SUFmMUIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0E2RXRDO0lBQUQseUJBQUM7Q0E3RUQsQUE2RUMsQ0E3RStDLEVBQUUsQ0FBQyxTQUFTLEdBNkUzRDtrQkE3RW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGNoYW5nZUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBleGNoYW5nZUJ1dHRvbjpjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGRpYW1vbmRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGV4Y2hhbmdlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgZXhjaGFuZ2VTcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBleGNoYW5nZVNwcml0ZUZyYW1lczpbY2MuU3ByaXRlRnJhbWVdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlhbW9uZENvdW50ID0gMDtcclxuXHJcblxyXG4gICAgZ2V0IGRpYW1vbmRDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaWFtb25kQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRpYW1vbmRDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZGlhbW9uZENvdW50ID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZXhjaGFuZ2VMYWJlbC5zdHJpbmcgPSBleHQuc2hvcnRGb3JtYXQodGhpcy5nZXRHb2xkQ291bnQoKSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV4Y2hhbmdlTGFiZWwuc3RyaW5nID0gYCR7dGhpcy5nZXRQb3dlckNvdW50KCl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdHlwZSA9IDE7XHJcblxyXG5cclxuICAgIHNldCB0eXBlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90eXBlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5leGNoYW5nZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuZXhjaGFuZ2VTcHJpdGVGcmFtZXNbdGhpcy5fdHlwZS0xXTtcclxuICAgICAgICB0aGlzLmRpYW1vbmRDb3VudCA9IFdvcmxkLlN0b3JhZ2UuZGlhbW9uZENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdvbGRDb3VudCgpe1xyXG4gICAgICAgIGxldCBjZmcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Hb2xkVXApO1xyXG4gICAgICAgIHJldHVybiBjZmdbV29ybGQuU3RvcmFnZS5nb2xkTHYtMV1bJ2RpYW1vbmRfZXgnXSp0aGlzLl9kaWFtb25kQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG93ZXJDb3VudCgpe1xyXG4gICAgICAgIHJldHVybiA1ICogdGhpcy5fZGlhbW9uZENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXcoKXtcclxuICAgICAgICB0aGlzLmV4Y2hhbmdlQnV0dG9uLmludGVyYWN0YWJsZSA9IHRoaXMuX2RpYW1vbmRDb3VudCA+IDA7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kTGFiZWwuc3RyaW5nID0gYCR7dGhpcy5fZGlhbW9uZENvdW50fWA7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaWFtb25kUGx1cygpe1xyXG4gICAgICAgIGlmICh0aGlzLl9kaWFtb25kQ291bnQgPCBXb3JsZC5TdG9yYWdlLmRpYW1vbmRDb3VudCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbW9uZENvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlhbW9uZE1pbnVzKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RpYW1vbmRDb3VudCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmRpYW1vbmRDb3VudC0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV4Y2hhbmdlKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT0gMSl7XHJcbiAgICAgICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ICs9IHRoaXMuZ2V0R29sZENvdW50KCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBXb3JsZC5TdG9yYWdlLnBvd2VyICs9IHRoaXMuZ2V0UG93ZXJDb3VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==