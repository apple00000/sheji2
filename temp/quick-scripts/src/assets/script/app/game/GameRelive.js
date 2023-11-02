"use strict";
cc._RF.push(module, 'c841aUcQDlKNb/TIRPN/nS1', 'GameRelive');
// script/app/game/GameRelive.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("./GameProxy");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var World_1 = require("../info/World");
var CDTimer_1 = require("../../../framework/component/CDTimer");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameRelive = /** @class */ (function (_super) {
    __extends(GameRelive, _super);
    function GameRelive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameOverNode = null;
        _this.gunSpriteFrames = [];
        _this.gunSprite = null;
        _this.bulletLabel = null;
        _this.cdLabel = null;
        _this.cdTimer = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    GameRelive.prototype.onLoad = function () {
        var _this = this;
        cc.game.on("video_7", function () {
            _this.onClickReliveDo();
        }, this);
    };
    GameRelive.prototype.onEnable = function () {
        console.log("GameRelive===>GameProxy.pauseGame = true");
        GameProxy_1.GameProxy.pauseGame = true;
        this.cdTimer.reset();
        this.cdTimer.pause = false;
        this.cdLabel.string = Math.ceil(this.cdTimer.cdDelta()).toString();
        // this.noReliveNode.active = false;
        this.node.stopAllActions();
        // this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=>{
        //     this.noReliveNode.active = true;
        // })));
        var weaponConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon).filter(function (value) { return value['id'] != 1; }).sort((function (a, b) { return b['unlock'] - a['unlock']; }));
        for (var _i = 0, weaponConfig_1 = weaponConfig; _i < weaponConfig_1.length; _i++) {
            var item = weaponConfig_1[_i];
            if (GameProxy_1.GameProxy.level >= item['unlock']) {
                this.gunSprite.spriteFrame = this.gunSpriteFrames[item['id'] - 1];
                this.bulletLabel.string = "\u5B50\u5F39 " + World_1.World.My.armory.payloadAddOf(item['id']) * 3 + "x3";
                break;
            }
        }
    };
    GameRelive.prototype.onClickRelive = function (event, data) {
        console.log("【video】7 复活【click】GameRelive Relive");
        World_1.World.Storage._videoSign = 7;
        World_1.World.Storage.videoAd_show();
    };
    GameRelive.prototype.onClickReliveDo = function () {
        this.node.active = false;
        GameProxy_1.GameProxy.pauseGame = false;
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ReliveGame);
    };
    GameRelive.prototype.onNoRelive = function (event, data) {
        this.node.active = false;
        this.gameOverNode.active = true;
    };
    GameRelive.prototype.onProgressEvent = function (progress) {
        this.cdLabel.string = Math.ceil(this.cdTimer.cdDelta()).toString();
    };
    __decorate([
        property(cc.Node)
    ], GameRelive.prototype, "gameOverNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameRelive.prototype, "gunSpriteFrames", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameRelive.prototype, "gunSprite", void 0);
    __decorate([
        property(cc.Label)
    ], GameRelive.prototype, "bulletLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameRelive.prototype, "cdLabel", void 0);
    __decorate([
        property(CDTimer_1.default)
    ], GameRelive.prototype, "cdTimer", void 0);
    GameRelive = __decorate([
        ccclass
    ], GameRelive);
    return GameRelive;
}(cc.Component));
exports.default = GameRelive;

cc._RF.pop();