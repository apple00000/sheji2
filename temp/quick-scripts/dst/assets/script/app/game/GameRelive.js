
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameRelive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVJlbGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLDZEQUEwRDtBQUMxRCxxRUFBa0U7QUFDbEUsdUNBQW9DO0FBQ3BDLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXNFQztRQW5FRyxrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixxQkFBZSxHQUFvQixFQUFFLENBQUM7UUFHdEMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBb0QzQixDQUFDO0lBbERHLHdCQUF3QjtJQUV4QiwyQkFBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUM7WUFDakIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQzFCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ3hELHFCQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNu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OlsiXHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi9HYW1lUHJveHlcIjtcclxuaW1wb3J0IHtFeGNlbFRhYmxlTmFtZXN9IGZyb20gXCIuLi9jb25maWcvRXhjZWxUYWJsZU5hbWVzXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCBDRFRpbWVyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29tcG9uZW50L0NEVGltZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVJlbGl2ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBnYW1lT3Zlck5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgZ3VuU3ByaXRlRnJhbWVzOltjYy5TcHJpdGVGcmFtZV0gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgZ3VuU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgYnVsbGV0TGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGNkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShDRFRpbWVyKVxyXG4gICAgY2RUaW1lcjpDRFRpbWVyID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICBjYy5nYW1lLm9uKFwidmlkZW9fN1wiLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja1JlbGl2ZURvKClcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVSZWxpdmU9PT0+R2FtZVByb3h5LnBhdXNlR2FtZSA9IHRydWVcIik7XHJcbiAgICAgICAgR2FtZVByb3h5LnBhdXNlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jZFRpbWVyLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5jZFRpbWVyLnBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jZExhYmVsLnN0cmluZyA9IE1hdGguY2VpbCh0aGlzLmNkVGltZXIuY2REZWx0YSgpKS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9SZWxpdmVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDMpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vUmVsaXZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH0pKSk7XHJcbiAgICAgICAgbGV0IHdlYXBvbkNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbikuZmlsdGVyKHZhbHVlID0+IHZhbHVlWydpZCddICE9IDEpLnNvcnQoKChhLCBiKSA9PiBiWyd1bmxvY2snXSAtIGFbJ3VubG9jayddKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB3ZWFwb25Db25maWcpe1xyXG4gICAgICAgICAgICBpZiAoR2FtZVByb3h5LmxldmVsID49IGl0ZW1bJ3VubG9jayddKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3VuU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ndW5TcHJpdGVGcmFtZXNbaXRlbVsnaWQnXSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRMYWJlbC5zdHJpbmcgPSBg5a2Q5by5ICR7V29ybGQuTXkuYXJtb3J5LnBheWxvYWRBZGRPZihpdGVtWydpZCddKSAqIDN9eDNgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1JlbGl2ZShldmVudCwgZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJB2aWRlb+OAkTcg5aSN5rS744CQY2xpY2vjgJFHYW1lUmVsaXZlIFJlbGl2ZVwiKVxyXG5cclxuICAgICAgICBXb3JsZC5TdG9yYWdlLl92aWRlb1NpZ249N1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UudmlkZW9BZF9zaG93KCkgXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1JlbGl2ZURvKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQcm94eS5wYXVzZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuUmVsaXZlR2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ob1JlbGl2ZShldmVudCwgZGF0YSl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2FtZU92ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qcm9ncmVzc0V2ZW50KHByb2dyZXNzOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jZExhYmVsLnN0cmluZyA9IE1hdGguY2VpbCh0aGlzLmNkVGltZXIuY2REZWx0YSgpKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==