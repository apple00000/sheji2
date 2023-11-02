
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameOver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ff30pjHBFH77CAQSQ7Z0pY', 'GameOver');
// script/app/game/GameOver.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var Extend_1 = require("../../../framework/extend/Extend");
var GameProxy_1 = require("./GameProxy");
var World_1 = require("../info/World");
var GameOverLucky_1 = require("./GameOverLucky");
var Network_1 = require("../network/Network");
var NetworkConfig_1 = require("../config/NetworkConfig");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
//curTime = 80  subTime = 0.6   addTime = 10  max = 100   7次，第8次出误点banner
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.topNode = null;
        _this.goldLabel = null;
        _this.videoGoldLabel = null;
        _this.videoMulLabel = null;
        _this.luckyProgressBar = null;
        _this.gameOverLucky = null;
        _this.oneButtonNode = null;
        _this.tripleButtonNode = null;
        _this.luckyButtonNode = null;
        _this.luckyVideoSprite = null;
        _this.inviteSpriteFrame = null;
        _this.videoSpriteFrame = null;
        _this._takeGoldOne = 0;
        _this._videoMul = 3;
        return _this;
    }
    GameOver.prototype.onLoad = function () {
        var _this = this;
        this.oneButtonNode.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.luckyButtonNode.parent.position = _this.oneButtonNode.position.add(cc.v2(0, 120));
        });
        cc.game.on("video_5", function () {
            _this.onGameOverTakeDajiangDo();
        }, this);
    };
    GameOver.prototype.onEnable = function () {
        var _this = this;
        this._takeGoldOne = 0;
        this._videoMul = 3;
        this.gameOverLucky.node.active = false;
        this.gameOverLucky.node.zIndex = 10;
        console.log("GameOver===>GameProxy.pauseGame = true");
        GameProxy_1.GameProxy.pauseGame = true;
        // this.oneBackgroundSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.children.forEach(function (value, index) {
            value.scale = 0;
            value.runAction(cc.sequence(cc.delayTime(1 + 0.08 * index), cc.scaleTo(0.2, 1).easing(cc.easeElasticOut(0.45))));
        });
        World_1.World.Storage.unlockGun = -World_1.World.Storage.unlockGun;
        this.topNode.removeFromParent(false);
        this.node.addChild(this.topNode);
        this.topNode.getChildByName('progress').runAction(cc.sequence(cc.delayTime(0.3), cc.moveBy(0.35, cc.v2(0, -125))));
        this.topNode.getChildByName('level').runAction(cc.sequence(cc.delayTime(0.7), cc.spawn(cc.scaleTo(0.35, 2).easing(cc.easeElasticOut(0.6)), cc.moveBy(0.35, cc.v2(0, -95)).easing(cc.easeElasticOut(0.6)))));
        if (GameProxy_1.GameProxy.killCount >= GameProxy_1.GameProxy.maxEnemyNum) {
            // World.Storage.passLuckyCount++;
            GameProxy_1.GameProxy.goldCount += GameProxy_1.GameProxy.passGold();
            World_1.World.Storage.gameLevel++;
            /** 上传关卡 */
            if (NetworkConfig_1.NetworkConfig.connectServer) {
                Network_1.default.uploadLv(World_1.World.Storage.gameLevel);
            }
            /** 计算解锁最新的一把枪 */
            var weaponConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon);
            for (var _i = 0, weaponConfig_1 = weaponConfig; _i < weaponConfig_1.length; _i++) {
                var item = weaponConfig_1[_i];
                if (item['unlock'] == World_1.World.Storage.gameLevel) {
                    World_1.World.Storage.unlockGun = item['id'];
                    break;
                }
            }
        }
        else {
            this.titleLabel.string = "战斗失败";
        }
        this._takeGoldOne = GameProxy_1.GameProxy.goldCount;
        this.goldLabel.string = Extend_1.ext.shortFormat(this._takeGoldOne);
        this.topNode.getChildByName('progress').getChildByName('goldLabel').getComponent(cc.Label).string = this.goldLabel.string;
        this.updateVideo();
        // this.oneButtonNode.active = false;
        // this.scheduleOnce(()=>this.oneButtonNode.active = true, 2);
        this.scheduleOnce(function () {
            _this.luckyButtonNode.parent.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.95), cc.scaleTo(0.5, 1))));
        }, 2);
    };
    GameOver.prototype.updateVideo = function () {
        this.videoMulLabel.string = "x" + this._videoMul;
        this.videoGoldLabel.string = Extend_1.ext.shortFormat(this._takeGoldOne * this._videoMul);
        this.luckyProgressBar.progress = 1;
        this.tripleButtonNode.active = false;
        // this.luckyProgressBar.progress = World.Storage.passLuckyCount/5;
        // this.tripleButtonNode.active = World.Storage.passLuckyCount < 5;
        this.luckyButtonNode.active = !this.tripleButtonNode.active;
        var spriteFrame = this.inviteSpriteFrame;
        // if (WXADVideo.canPlay()){
        //     spriteFrame = this.videoSpriteFrame;
        // }
        this.luckyVideoSprite.spriteFrame = spriteFrame;
    };
    GameOver.prototype.onGameOverTake = function (event, data) {
        console.log("【video】5 幸运大奖 【Click】GameOver onGameOverTake ", data);
        var num = parseInt(data);
        if (num == 1) {
            if (this._takeGoldOne > 0) {
                World_1.World.Storage.goldCount += this._takeGoldOne;
                Facade_1.default.executeCommand('ShowTipsCommand', "\u91D1\u5E01 +" + Extend_1.ext.shortFormat(this._takeGoldOne));
            }
            this.node.active = false;
            Facade_1.default.executeCommand("LoadSceneCommand", "HomeScene");
        }
        else {
            this.onGameOverTakeDajiang();
        }
    };
    GameOver.prototype.onGameOverTakeDajiang = function () {
        World_1.World.Storage._videoSign = 5;
        World_1.World.Storage.videoAd_show();
    };
    GameOver.prototype.onGameOverTakeDajiangDo = function () {
        var _this = this;
        if (this.luckyProgressBar.progress >= 1) {
            console.log("幸运大奖.");
            this.gameOverLucky.node.active = true;
            var num_1 = Extend_1.ext.randomElement([10, 9, 8, 7, 6, 5, 4]);
            this.gameOverLucky.run(num_1, function () {
                _this._videoMul = num_1;
                // World.Storage.passLuckyCount = 0;
                _this.node.active = false;
                var goldCount = _this._takeGoldOne * _this._videoMul;
                if (goldCount > 0) {
                    World_1.World.Storage.goldCount += goldCount;
                    Facade_1.default.executeCommand('ShowTipsCommand', "\u91D1\u5E01 +" + Extend_1.ext.shortFormat(goldCount));
                }
                Facade_1.default.executeCommand("LoadSceneCommand", "HomeScene");
            });
            return;
        }
        var goldCount = this._takeGoldOne * this._videoMul;
        if (goldCount > 0) {
            World_1.World.Storage.goldCount += goldCount;
            Facade_1.default.executeCommand('ShowTipsCommand', "\u91D1\u5E01 +" + Extend_1.ext.shortFormat(goldCount));
        }
        this.node.active = false;
        Facade_1.default.executeCommand("LoadSceneCommand", "HomeScene");
    };
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "titleLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameOver.prototype, "topNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "videoGoldLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameOver.prototype, "videoMulLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], GameOver.prototype, "luckyProgressBar", void 0);
    __decorate([
        property(GameOverLucky_1.default)
    ], GameOver.prototype, "gameOverLucky", void 0);
    __decorate([
        property(cc.Node)
    ], GameOver.prototype, "oneButtonNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameOver.prototype, "tripleButtonNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameOver.prototype, "luckyButtonNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameOver.prototype, "luckyVideoSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameOver.prototype, "inviteSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameOver.prototype, "videoSpriteFrame", void 0);
    GameOver = __decorate([
        ccclass
    ], GameOver);
    return GameOver;
}(cc.Component));
exports.default = GameOver;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZU92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJEQUFzRDtBQUN0RCwyREFBcUQ7QUFDckQseUNBQXNDO0FBQ3RDLHVDQUFvQztBQUNwQyxpREFBNEM7QUFDNUMsOENBQXlDO0FBQ3pDLHlEQUFzRDtBQUN0RCxxRUFBa0U7QUFDbEUsNkRBQTBEO0FBRTFELHlFQUF5RTtBQUNuRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXdLQztRQXJLRyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsc0JBQWdCLEdBQWtCLElBQUksQ0FBQztRQUd2QyxtQkFBYSxHQUFpQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0Isc0JBQWdCLEdBQVcsSUFBSSxDQUFDO1FBR2hDLHFCQUFlLEdBQVcsSUFBSSxDQUFDO1FBRy9CLHNCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyx1QkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBR3hDLHNCQUFnQixHQUFrQixJQUFJLENBQUM7UUFHL0Isa0JBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsZUFBUyxHQUFHLENBQUMsQ0FBQzs7SUE0SDFCLENBQUM7SUExSEcseUJBQU0sR0FBTjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMs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LENBQUMsV0FBVyxDQUFDO3NEQUNjO0lBR3ZDO1FBREMsUUFBUSxDQUFDLHVCQUFhLENBQUM7bURBQ1c7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNjO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2E7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNlO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7c0RBQ2M7SUF2Q3RCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F3SzVCO0lBQUQsZUFBQztDQXhLRCxBQXdLQyxDQXhLcUMsRUFBRSxDQUFDLFNBQVMsR0F3S2pEO2tCQXhLb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi9HYW1lUHJveHlcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IEdhbWVPdmVyTHVja3kgZnJvbSBcIi4vR2FtZU92ZXJMdWNreVwiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCB7TmV0d29ya0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9OZXR3b3JrQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5cclxuLy9jdXJUaW1lID0gODAgIHN1YlRpbWUgPSAwLjYgICBhZGRUaW1lID0gMTAgIG1heCA9IDEwMCAgIDfmrKHvvIznrKw45qyh5Ye66K+v54K5YmFubmVyXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU92ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRpdGxlTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdG9wTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBnb2xkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHZpZGVvR29sZExhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB2aWRlb011bExhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBsdWNreVByb2dyZXNzQmFyOmNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoR2FtZU92ZXJMdWNreSlcclxuICAgIGdhbWVPdmVyTHVja3k6R2FtZU92ZXJMdWNreSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBvbmVCdXR0b25Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHJpcGxlQnV0dG9uTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGx1Y2t5QnV0dG9uTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgbHVja3lWaWRlb1Nwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGludml0ZVNwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICB2aWRlb1Nwcml0ZUZyYW1lOmNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfdGFrZUdvbGRPbmUgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX3ZpZGVvTXVsID0gMztcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLm9uZUJ1dHRvbk5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgKCk9PntcclxuICAgICAgICAgICB0aGlzLmx1Y2t5QnV0dG9uTm9kZS5wYXJlbnQucG9zaXRpb24gPSB0aGlzLm9uZUJ1dHRvbk5vZGUucG9zaXRpb24uYWRkKGNjLnYyKDAsIDEyMCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKFwidmlkZW9fNVwiLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25HYW1lT3ZlclRha2VEYWppYW5nRG8oKVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3Rha2VHb2xkT25lID0gMDtcclxuICAgICAgICB0aGlzLl92aWRlb011bCA9IDM7XHJcbiAgICAgICAgdGhpcy5nYW1lT3Zlckx1Y2t5Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nYW1lT3Zlckx1Y2t5Lm5vZGUuekluZGV4ID0gMTA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHYW1lT3Zlcj09PT5HYW1lUHJveHkucGF1c2VHYW1lID0gdHJ1ZVwiKTtcclxuICAgICAgICBHYW1lUHJveHkucGF1c2VHYW1lID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm9uZUJhY2tncm91bmRTcHJpdGUuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdmFsdWUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICB2YWx1ZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDErMC4wOCppbmRleCksIGNjLnNjYWxlVG8oMC4yLCAxKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC40NSkpKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UudW5sb2NrR3VuID0gLVdvcmxkLlN0b3JhZ2UudW5sb2NrR3VuO1xyXG4gICAgICAgIHRoaXMudG9wTm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy50b3BOb2RlKTtcclxuICAgICAgICB0aGlzLnRvcE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb2dyZXNzJykucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjMpLCBjYy5tb3ZlQnkoMC4zNSwgY2MudjIoMCwgLTEyNSkpKSk7XHJcbiAgICAgICAgdGhpcy50b3BOb2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC43KSwgY2Muc3Bhd24oY2Muc2NhbGVUbygwLjM1LCAyKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC42KSksIGNjLm1vdmVCeSgwLjM1LCBjYy52MigwLCAtOTUpKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC42KSkpKSk7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5raWxsQ291bnQgPj0gR2FtZVByb3h5Lm1heEVuZW15TnVtKXtcclxuICAgICAgICAgICAgLy8gV29ybGQuU3RvcmFnZS5wYXNzTHVja3lDb3VudCsrO1xyXG4gICAgICAgICAgICBHYW1lUHJveHkuZ29sZENvdW50ICs9IEdhbWVQcm94eS5wYXNzR29sZCgpO1xyXG4gICAgICAgICAgICBXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCsrO1xyXG4gICAgICAgICAgICAvKiog5LiK5Lyg5YWz5Y2hICovXHJcbiAgICAgICAgICAgIGlmIChOZXR3b3JrQ29uZmlnLmNvbm5lY3RTZXJ2ZXIpe1xyXG4gICAgICAgICAgICAgICAgTmV0d29yay51cGxvYWRMdihXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqIOiuoeeul+ino+mUgeacgOaWsOeahOS4gOaKiuaeqiAqL1xyXG4gICAgICAgICAgICBsZXQgd2VhcG9uQ29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB3ZWFwb25Db25maWcpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1bJ3VubG9jayddID09IFdvcmxkLlN0b3JhZ2UuZ2FtZUxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBXb3JsZC5TdG9yYWdlLnVubG9ja0d1biA9IGl0ZW1bJ2lkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSBcIuaImOaWl+Wksei0pVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90YWtlR29sZE9uZSA9IEdhbWVQcm94eS5nb2xkQ291bnQ7XHJcbiAgICAgICAgdGhpcy5nb2xkTGFiZWwuc3RyaW5nID0gZXh0LnNob3J0Rm9ybWF0KHRoaXMuX3Rha2VHb2xkT25lKTtcclxuICAgICAgICB0aGlzLnRvcE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb2dyZXNzJykuZ2V0Q2hpbGRCeU5hbWUoJ2dvbGRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nb2xkTGFiZWwuc3RyaW5nO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlkZW8oKTtcclxuICAgICAgICAvLyB0aGlzLm9uZUJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCk9PnRoaXMub25lQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlLCAyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmx1Y2t5QnV0dG9uTm9kZS5wYXJlbnQucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDAuOTUpLCBjYy5zY2FsZVRvKDAuNSwgMSkpKSk7XHJcbiAgICAgICAgfSwgMik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmlkZW8oKXtcclxuICAgICAgICB0aGlzLnZpZGVvTXVsTGFiZWwuc3RyaW5nID0gYHgke3RoaXMuX3ZpZGVvTXVsfWA7XHJcbiAgICAgICAgdGhpcy52aWRlb0dvbGRMYWJlbC5zdHJpbmcgPSBleHQuc2hvcnRGb3JtYXQodGhpcy5fdGFrZUdvbGRPbmUgKiB0aGlzLl92aWRlb011bCk7XHJcbiAgICAgICAgdGhpcy5sdWNreVByb2dyZXNzQmFyLnByb2dyZXNzID0gMTtcclxuICAgICAgICB0aGlzLnRyaXBsZUJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5sdWNreVByb2dyZXNzQmFyLnByb2dyZXNzID0gV29ybGQuU3RvcmFnZS5wYXNzTHVja3lDb3VudC81O1xyXG4gICAgICAgIC8vIHRoaXMudHJpcGxlQnV0dG9uTm9kZS5hY3RpdmUgPSBXb3JsZC5TdG9yYWdlLnBhc3NMdWNreUNvdW50IDwgNTtcclxuICAgICAgICB0aGlzLmx1Y2t5QnV0dG9uTm9kZS5hY3RpdmUgPSAhdGhpcy50cmlwbGVCdXR0b25Ob2RlLmFjdGl2ZTtcclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLmludml0ZVNwcml0ZUZyYW1lO1xyXG4gICAgICAgIC8vIGlmIChXWEFEVmlkZW8uY2FuUGxheSgpKXtcclxuICAgICAgICAvLyAgICAgc3ByaXRlRnJhbWUgPSB0aGlzLnZpZGVvU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubHVja3lWaWRlb1Nwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FtZU92ZXJUYWtlKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkHZpZGVv44CRNSDlubjov5DlpKflpZYg44CQQ2xpY2vjgJFHYW1lT3ZlciBvbkdhbWVPdmVyVGFrZSBcIiwgZGF0YSlcclxuXHJcbiAgICAgICAgbGV0IG51bSA9IHBhcnNlSW50KGRhdGEpO1xyXG4gICAgICAgIGlmIChudW0gPT0gMSl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90YWtlR29sZE9uZSA+IDApe1xyXG4gICAgICAgICAgICAgICAgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgKz0gdGhpcy5fdGFrZUdvbGRPbmU7XHJcbiAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoJ1Nob3dUaXBzQ29tbWFuZCcsIGDph5HluIEgKyR7ZXh0LnNob3J0Rm9ybWF0KHRoaXMuX3Rha2VHb2xkT25lKX1gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoXCJMb2FkU2NlbmVDb21tYW5kXCIsIFwiSG9tZVNjZW5lXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25HYW1lT3ZlclRha2VEYWppYW5nKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25HYW1lT3ZlclRha2VEYWppYW5nKCl7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5fdmlkZW9TaWduPTVcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLnZpZGVvQWRfc2hvdygpXHJcbiAgICB9XHJcblxyXG4gICAgb25HYW1lT3ZlclRha2VEYWppYW5nRG8oKXtcclxuICAgICAgICBpZiAodGhpcy5sdWNreVByb2dyZXNzQmFyLnByb2dyZXNzID49IDEpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5uOi/kOWkp+Wlli5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXJMdWNreS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBleHQucmFuZG9tRWxlbWVudChbMTAsOSw4LDcsNiw1LDRdKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lT3Zlckx1Y2t5LnJ1bihudW0sICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb011bCA9IG51bTtcclxuICAgICAgICAgICAgICAgIC8vIFdvcmxkLlN0b3JhZ2UucGFzc0x1Y2t5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdvbGRDb3VudCA9IHRoaXMuX3Rha2VHb2xkT25lKnRoaXMuX3ZpZGVvTXVsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdvbGRDb3VudCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ICs9IGdvbGRDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoJ1Nob3dUaXBzQ29tbWFuZCcsIGDph5HluIEgKyR7ZXh0LnNob3J0Rm9ybWF0KGdvbGRDb3VudCl9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoXCJMb2FkU2NlbmVDb21tYW5kXCIsIFwiSG9tZVNjZW5lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ29sZENvdW50ID0gdGhpcy5fdGFrZUdvbGRPbmUqdGhpcy5fdmlkZW9NdWw7XHJcbiAgICAgICAgaWYgKGdvbGRDb3VudCA+IDApe1xyXG4gICAgICAgICAgICBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCArPSBnb2xkQ291bnQ7XHJcbiAgICAgICAgICAgIEZhY2FkZS5leGVjdXRlQ29tbWFuZCgnU2hvd1RpcHNDb21tYW5kJywgYOmHkeW4gSArJHtleHQuc2hvcnRGb3JtYXQoZ29sZENvdW50KX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoXCJMb2FkU2NlbmVDb21tYW5kXCIsIFwiSG9tZVNjZW5lXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==