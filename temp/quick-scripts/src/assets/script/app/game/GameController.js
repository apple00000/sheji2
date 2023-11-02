"use strict";
cc._RF.push(module, 'a2a30D950ZPwLVWttC/Wqyp', 'GameController');
// script/app/game/GameController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("./GameProxy");
var Extend_1 = require("../../../framework/extend/Extend");
var World_1 = require("../info/World");
var Shake_1 = require("../../../framework/extend/Shake");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Music_1 = require("../../../framework/audio/Music");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moreEnemyTipsAnimation = null;
        _this.bossTipsAnimation = null;
        _this.supplyGuideNode = null;
        _this.shakeNode = null;
        _this.topNode = null;
        _this.leftNode = null;
        _this.rightNode = null;
        _this.supplyNode = null;
        _this.greyNode = null;
        _this.blockNode = null;
        _this.reliveNode = null;
        _this.gameOverNode = null;
        _this._generating = false;
        _this._shakeDuration = 0;
        _this._genEnemyCount = 0;
        _this._propList = [1, 2, 3, 4, 5, 6, 9, 11, 12, 13];
        _this._gunsList = [];
        _this._displayPropList = [];
        _this._displayGusList = [];
        _this._preDisplayGun = false;
        return _this;
    }
    GameController.prototype.onClickSupply = function (event, data) {
        console.log("【click】 GameControllerSupply");
        this.supplyNode.active = true;
        var newbieNode = cc.director.getScene().getChildByName("newbieNode");
        if (newbieNode) {
            newbieNode.destroy();
            World_1.World.My.newbies.finish("KillFiveEnemy");
        }
    };
    GameController.prototype.playEntry = function () {
        var _this = this;
        var promises = [];
        this.topNode.active = true;
        this.topNode.y = cc.view.getVisibleSize().height / 2 + 300;
        var speed = 700;
        var distance = this.topNode.y - cc.view.getVisibleSize().height / 2;
        if (Extend_1.ext.isIphoneX) {
            distance += 66;
        }
        promises.push(this.topNode.runActionAwait(cc.moveBy(distance / speed, cc.v2(0, -distance))));
        this.leftNode.active = true;
        this.leftNode.x = -cc.view.getVisibleSize().width / 2 - 200;
        promises.push(this.leftNode.runActionAwait(cc.moveTo(Math.abs(-cc.view.getVisibleSize().width / 2 - this.leftNode.x) / speed, cc.v2(-cc.view.getVisibleSize().width / 2, this.leftNode.y))));
        this.rightNode.active = true;
        this.rightNode.x = cc.view.getVisibleSize().width / 2 + 200;
        promises.push(this.rightNode.runActionAwait(cc.moveTo(Math.abs(cc.view.getVisibleSize().width / 2 - this.rightNode.x) / speed, cc.v2(cc.view.getVisibleSize().width / 2, this.rightNode.y))));
        Promise.all(promises).then(function (res) {
            GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.StartGame);
            _this.blockNode.active = false;
        });
    };
    GameController.prototype.onLoad = function () {
        this.supplyNode.active = false;
        this.greyNode.active = true;
        this.greyNode.opacity = 0;
        this.reliveNode.active = false;
        this.gameOverNode.active = false;
        this.topNode.active = false;
        this.leftNode.active = false;
        this.rightNode.active = false;
        this.blockNode.active = true;
        this.node.on(GameProxy_1.GameProxy.Event.StartGenEnemy, this.startGenerating, this);
        this.node.on(GameProxy_1.GameProxy.Event.StopGenEnemy, this.stopGenerating, this);
        this.node.on(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
        this.node.on(GameProxy_1.GameProxy.Event.KillRole, this.onKillRole, this);
        this.node.on(GameProxy_1.GameProxy.Event.SlowGame, this.onSlowGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.PauseGame, this.onPauseGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.ShakeScreen, this.onShakeScreen, this);
        GameProxy_1.GameProxy.GameScene = this.node;
        this.playEntry();
    };
    GameController.prototype.start = function () {
        GameProxy_1.GameProxy.level = World_1.World.Storage.gameLevel;
        GameProxy_1.GameProxy.slowGame = false;
        GameProxy_1.GameProxy.pauseGame = false;
        this._preDisplayGun = Math.random() * 100 > 50;
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.InitGame);
        this._propList = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop).filter(function (value) { return value['id'] != 7 && value['id'] != 8 && value['id'] != 10 && (value['unlock'] == 0 || World_1.World.My.propInfo.beUsing(value['id'])); }).map(function (value) { return value['id']; });
        this._gunsList = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon).filter(function (value) { return value['id'] != 1 && value['unlock'] <= World_1.World.Storage.gameLevel; }).map(function (value) { return value['id']; });
    };
    GameController.prototype.onDestroy = function () {
        this.node.off(GameProxy_1.GameProxy.Event.StartGenEnemy, this.startGenerating, this);
        this.node.off(GameProxy_1.GameProxy.Event.StopGenEnemy, this.stopGenerating, this);
        this.node.off(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
        this.node.off(GameProxy_1.GameProxy.Event.KillRole, this.onKillRole, this);
        this.node.off(GameProxy_1.GameProxy.Event.SlowGame, this.onSlowGame, this);
        this.node.off(GameProxy_1.GameProxy.Event.PauseGame, this.onPauseGame, this);
        this.node.off(GameProxy_1.GameProxy.Event.ShakeScreen, this.onShakeScreen, this);
    };
    GameController.prototype.onShakeScreen = function (duration, strength_x, strength_y) {
        if (this._shakeDuration <= duration) {
            this._shakeDuration = duration;
            this.shakeNode.stopAllActions();
            this.shakeNode.position = cc.v2();
            this.shakeNode.runAction(Shake_1.Shake.create(duration, strength_x, strength_y));
        }
    };
    GameController.prototype.onSlowGame = function (slow) {
        // this.updateGrey();
        window['GameEnemysController'].allActiveEnemy().forEach(function (value) { return value.gameSlow = slow; });
    };
    GameController.prototype.onPauseGame = function (pause) {
        this.updateGrey();
    };
    GameController.prototype.updateGrey = function (opacity) {
        if (opacity === void 0) { opacity = 190; }
        console.log("updateGrey==>", GameProxy_1.GameProxy.pauseGame);
        this.greyNode.stopAllActions();
        if (GameProxy_1.GameProxy.pauseGame || GameProxy_1.GameProxy.slowGame) {
            this.greyNode.runAction(cc.fadeTo(0.3, opacity));
            // cc.tween(this.greyNode)
            //     .to(0.3, { opacity: opacity })
            //     .start();
        }
        else {
            this.greyNode.opacity = 0;
        }
    };
    /**
     * 启动怪物生成计划
     */
    GameController.prototype.startGenerating = function () {
        var _this = this;
        if (this._generating)
            return;
        this._generating = true;
        // console.log(GameProxy.enemyList, "enemyList");
        if (GameProxy_1.GameProxy.killCount < GameProxy_1.GameProxy.levelConfig.amount_p1) {
            /** 第一阶段 0.5s出一个怪物 */
            /** 0.5s出一个怪物 */
            var action = cc.sequence(cc.repeat(cc.sequence(cc.callFunc(function () { return _this._genEnemyCount += 1; }), cc.delayTime(0.5)), GameProxy_1.GameProxy.levelConfig.delimit_p1), cc.callFunc(function () {
                _this._generating = false;
                _this.startCDTask();
            }));
            action.setTag(1010);
            this.node.runAction(action);
        }
        else {
            /** 第二阶段 0.5s一次出3个 */
            /** 0.5s出一个怪物 */
            var action = cc.sequence(cc.repeat(cc.sequence(cc.callFunc(function () { return _this._genEnemyCount += 1; }), cc.delayTime(0.5)), Math.floor(GameProxy_1.GameProxy.levelConfig.delimit_p1)), cc.callFunc(function () {
                _this._generating = false;
                _this.startCDTask();
            }));
            action.setTag(1010);
            this.node.runAction(action);
        }
    };
    /**
     * 停止怪物生成计划
     * */
    GameController.prototype.stopGenerating = function () {
        if (!this._generating)
            return;
        this.node.stopActionByTag(1010);
    };
    /** 计时任务 */
    GameController.prototype.startCDTask = function () {
        var _this = this;
        this.stopCDTask();
        var action = cc.sequence(cc.delayTime(10), cc.callFunc(function () {
            /** 生成两只怪物 */
            _this._genEnemyCount += 2;
            _this.startCDTask();
        }));
        action.setTag(1041);
        this.node.runAction(action);
    };
    /** 停止计时任务 */
    GameController.prototype.stopCDTask = function () {
        this.node.stopActionByTag(1041);
    };
    GameController.prototype.onKillRole = function () {
        GameProxy_1.GameProxy.isOver = true;
        GameProxy_1.GameProxy.pauseGame = true;
        if (GameProxy_1.GameProxy.firstAidFlag) {
            this.reliveNode.active = true;
        }
        else {
            this.reliveNode.active = true;
        }
        Music_1.Music.playSFX("sound/msc_rol002");
        console.log("game over==>等待复活");
    };
    /** 掉枪 */
    GameController.prototype.displayGun = function (position) {
        var _this = this;
        var prop = window['GameEnemysController'].getInactiveGun();
        var testList = this._gunsList.filter(function (value) { return !_this._displayGusList.includes(value); });
        if (testList.length == 0) {
            testList = this._gunsList;
            this._displayGusList = [];
        }
        var id = Extend_1.ext.randomElement(testList);
        this._displayGusList.push(id);
        prop.init(id + 100);
        prop.node.position = position;
        prop.display();
    };
    /** 掉道具 */
    GameController.prototype.displayProp = function (position) {
        var _this = this;
        var testList = this._propList.filter(function (value) { return !_this._displayPropList.includes(value); });
        if (testList.length == 0) {
            testList = this._propList;
            this._displayPropList = [];
        }
        var id = Extend_1.ext.randomElement(testList);
        this._displayPropList.push(id);
        var prop = window['GameEnemysController'].getInactiveProp(id);
        prop.node.position = position;
        prop.display();
    };
    GameController.prototype.onKillEnemy = function (enemy) {
        if (GameProxy_1.GameProxy.killCount % 10 == 0) {
            var position = enemy.node.position;
            if (this._preDisplayGun) {
                this.displayProp(position);
            }
            else {
                this.displayGun(position);
            }
            this._preDisplayGun = !this._preDisplayGun;
        }
        if (GameProxy_1.GameProxy.killCount == GameProxy_1.GameProxy.levelConfig.amount_p1 - 3) {
            this.displayGun(enemy.node.position);
        }
        if (GameProxy_1.GameProxy.killCount + window['GameEnemysController'].allAliveEnemy().length < GameProxy_1.GameProxy.levelConfig.amount_p1) {
            //第一阶段
            this._genEnemyCount += 2;
            this.startCDTask();
        }
        else if (GameProxy_1.GameProxy.enemyList.length > 0) {
            //第二阶段
            this._genEnemyCount += 3;
            this.startCDTask();
        }
        else if (GameProxy_1.GameProxy.killCount >= GameProxy_1.GameProxy.maxEnemyNum) {
            GameProxy_1.GameProxy.isOver = true;
            GameProxy_1.GameProxy.pauseGame = true;
            console.log("game win.");
            this.blockNode.active = true;
        }
        if (GameProxy_1.GameProxy.killCount == 5) {
            if (!World_1.World.My.newbies.state("KillFiveEnemy")) {
                var newbieNode = new cc.Node();
                newbieNode.name = "newbieNode";
                newbieNode.position = this.supplyGuideNode.convertToWorldSpaceAR(cc.v2());
                cc.director.getScene().addChild(newbieNode);
                /** guideCircle */
                var guideCirclePrefab = cc.loader.getRes("prefab/guideCircle");
                var guideCircleNode = cc.instantiate(guideCirclePrefab);
                guideCircleNode.position = cc.v2();
                newbieNode.addChild(guideCircleNode);
                /** guideSke */
                var guideSkePrefab = cc.loader.getRes("prefab/guideSke");
                var guideSkeNode = cc.instantiate(guideSkePrefab);
                guideSkeNode.position = cc.v2();
                newbieNode.addChild(guideSkeNode);
                GameProxy_1.GameProxy.pauseGame = true;
                this.greyNode.stopAllActions();
                this.greyNode.opacity = 0;
            }
        }
    };
    GameController.prototype.genEnemy = function () {
        if (GameProxy_1.GameProxy.enemyList.length <= 0) {
            return;
        }
        /** 判断上限 */
        /** 第一阶段 */
        var aliveCount = window['GameEnemysController'].allAliveEnemy().length;
        if (GameProxy_1.GameProxy.killCount + aliveCount <= GameProxy_1.GameProxy.levelConfig.amount_p1) {
            if (aliveCount >= GameProxy_1.GameProxy.levelConfig.limit_p1) {
                return;
            }
        }
        else {
            if (aliveCount >= GameProxy_1.GameProxy.levelConfig.limit_p2) {
                return;
            }
        }
        window['GameEnemysController'].createEnemy(GameProxy_1.GameProxy.enemyList.shift());
        this._genEnemyCount--;
        // window['GameEnemysController'].createEnemy(3);
        if (GameProxy_1.GameProxy.maxEnemyNum - GameProxy_1.GameProxy.enemyList.length === GameProxy_1.GameProxy.levelConfig.amount_p1 + 1) {
            this.moreEnemyTipsAnimation.node.opacity = 255;
            this.moreEnemyTipsAnimation.node.active = true;
            this.moreEnemyTipsAnimation.play();
        }
        if (GameProxy_1.GameProxy.enemyList.length == GameProxy_1.GameProxy.secondBossNum - 1) {
            this.bossTipsAnimation.node.opacity = 255;
            this.bossTipsAnimation.node.active = true;
            this.bossTipsAnimation.play();
        }
    };
    GameController.prototype.update = function (dt) {
        if (this._genEnemyCount > 0) {
            this.genEnemy();
        }
    };
    __decorate([
        property(cc.Animation)
    ], GameController.prototype, "moreEnemyTipsAnimation", void 0);
    __decorate([
        property(cc.Animation)
    ], GameController.prototype, "bossTipsAnimation", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "supplyGuideNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "shakeNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "topNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "leftNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "rightNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "supplyNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "greyNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "blockNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "reliveNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameController.prototype, "gameOverNode", void 0);
    GameController = __decorate([
        ccclass
    ], GameController);
    return GameController;
}(cc.Component));
exports.default = GameController;

cc._RF.pop();