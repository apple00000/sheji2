"use strict";
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