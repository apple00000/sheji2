"use strict";
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