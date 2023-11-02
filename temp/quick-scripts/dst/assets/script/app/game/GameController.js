
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFzQztBQUV0QywyREFBcUQ7QUFDckQsdUNBQW9DO0FBQ3BDLHlEQUFzRDtBQUN0RCxxRUFBa0U7QUFDbEUsNkRBQTBEO0FBQzFELHdEQUFxRDtBQUUvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQXNWQztRQXBWRyw0QkFBc0IsR0FBZ0IsSUFBSSxDQUFDO1FBRzNDLHVCQUFpQixHQUFnQixJQUFJLENBQUM7UUFHdEMscUJBQWUsR0FBVyxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFHekIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHcEIsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsb0JBQWMsR0FBRyxDQUFDLENBQUM7UUEyR25CLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBb0VuQixlQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxlQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWYsc0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBK0JyQixvQkFBYyxHQUFHLEtBQUssQ0FBQzs7SUE0Rm5DLENBQUM7SUE1U0csc0NBQWEsR0FBYixVQUFjLEtBQUssRUFBQyxJQUFJO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUUzQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsSUFBSSxVQUFVLEVBQUM7WUFDWCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsYUFBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxZQUFHLENBQUMsU0FBUyxFQUFDO1lBQ2QsUUFBUSxJQUFJLEVBQUUsQ0FBQztTQUNsQjtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkwsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzFCLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUscUJBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDSSxxQkFBUyxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMxQyxxQkFBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDM0IscUJBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDL0MscUJBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxLQUFLLENB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QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDVTtJQW5DWCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBc1ZsQztJQUFELHFCQUFDO0NBdFZELEFBc1ZDLENBdFYyQyxFQUFFLENBQUMsU0FBUyxHQXNWdkQ7a0JBdFZvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi9HYW1lUHJveHlcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuLi9lbnRpdGllcy9lbmVteS9FbmVteVwiO1xyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9leHRlbmQvRXh0ZW5kXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCB7U2hha2V9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL1NoYWtlXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQge011c2ljfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2F1ZGlvL011c2ljXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgICBtb3JlRW5lbXlUaXBzQW5pbWF0aW9uOmNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICAgIGJvc3NUaXBzQW5pbWF0aW9uOmNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdXBwbHlHdWlkZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzaGFrZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0b3BOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGVmdE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByaWdodE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdXBwbHlOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ3JleU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBibG9ja05vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByZWxpdmVOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZU92ZXJOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2hha2VEdXJhdGlvbiA9IDA7XHJcblxyXG4gICAgb25DbGlja1N1cHBseShldmVudCxkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkGNsaWNr44CRIEdhbWVDb250cm9sbGVyU3VwcGx5XCIpXHJcblxyXG4gICAgICAgIHRoaXMuc3VwcGx5Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBuZXdiaWVOb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIm5ld2JpZU5vZGVcIik7XHJcbiAgICAgICAgaWYgKG5ld2JpZU5vZGUpe1xyXG4gICAgICAgICAgICBuZXdiaWVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgV29ybGQuTXkubmV3Ymllcy5maW5pc2goXCJLaWxsRml2ZUVuZW15XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5RW50cnkoKXtcclxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvcE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRvcE5vZGUueSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQvMiArIDMwMDtcclxuICAgICAgICBsZXQgc3BlZWQgPSA3MDA7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy50b3BOb2RlLnkgLSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0LzI7XHJcbiAgICAgICAgaWYgKGV4dC5pc0lwaG9uZVgpe1xyXG4gICAgICAgICAgICBkaXN0YW5jZSArPSA2NjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnRvcE5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZUJ5KGRpc3RhbmNlL3NwZWVkLCBjYy52MigwLCAtZGlzdGFuY2UpKSkpO1xyXG4gICAgICAgIHRoaXMubGVmdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnROb2RlLnggPSAtY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoLzItMjAwO1xyXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sZWZ0Tm9kZS5ydW5BY3Rpb25Bd2FpdChjYy5tb3ZlVG8oTWF0aC5hYnMoLWNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yIC0gdGhpcy5sZWZ0Tm9kZS54KS9zcGVlZCwgY2MudjIoLWNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yLCB0aGlzLmxlZnROb2RlLnkpKSkpO1xyXG4gICAgICAgIHRoaXMucmlnaHROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yaWdodE5vZGUueCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yKzIwMDtcclxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucmlnaHROb2RlLnJ1bkFjdGlvbkF3YWl0KGNjLm1vdmVUbyhNYXRoLmFicyhjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgvMiAtIHRoaXMucmlnaHROb2RlLngpL3NwZWVkLCBjYy52MihjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgvMiwgdGhpcy5yaWdodE5vZGUueSkpKSlcclxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXM9PntcclxuICAgICAgICAgICAgR2FtZVByb3h5LmVtaXQoR2FtZVByb3h5LkV2ZW50LlN0YXJ0R2FtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5zdXBwbHlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ3JleU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdyZXlOb2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMucmVsaXZlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVPdmVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRvcE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sZWZ0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJpZ2h0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJsb2NrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihHYW1lUHJveHkuRXZlbnQuU3RhcnRHZW5FbmVteSwgdGhpcy5zdGFydEdlbmVyYXRpbmcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihHYW1lUHJveHkuRXZlbnQuU3RvcEdlbkVuZW15LCB0aGlzLnN0b3BHZW5lcmF0aW5nLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LktpbGxFbmVteSwgdGhpcy5vbktpbGxFbmVteSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5LaWxsUm9sZSwgdGhpcy5vbktpbGxSb2xlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LlNsb3dHYW1lLCB0aGlzLm9uU2xvd0dhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihHYW1lUHJveHkuRXZlbnQuUGF1c2VHYW1lLCB0aGlzLm9uUGF1c2VHYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LlNoYWtlU2NyZWVuLCB0aGlzLm9uU2hha2VTY3JlZW4sIHRoaXMpO1xyXG4gICAgICAgIEdhbWVQcm94eS5HYW1lU2NlbmUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdGhpcy5wbGF5RW50cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIEdhbWVQcm94eS5sZXZlbCA9IFdvcmxkLlN0b3JhZ2UuZ2FtZUxldmVsO1xyXG4gICAgICAgIEdhbWVQcm94eS5zbG93R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVQcm94eS5wYXVzZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wcmVEaXNwbGF5R3VuID0gTWF0aC5yYW5kb20oKSAqIDEwMCA+IDUwO1xyXG4gICAgICAgIEdhbWVQcm94eS5lbWl0KEdhbWVQcm94eS5FdmVudC5Jbml0R2FtZSk7XHJcbiAgICAgICAgdGhpcy5fcHJvcExpc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Qcm9wKS5maWx0ZXIodmFsdWUgPT4gdmFsdWVbJ2lkJ10gIT0gNyAmJiB2YWx1ZVsnaWQnXSAhPSA4ICYmIHZhbHVlWydpZCddICE9IDEwICYmICh2YWx1ZVsndW5sb2NrJ10gPT0gMCB8fCBXb3JsZC5NeS5wcm9wSW5mby5iZVVzaW5nKHZhbHVlWydpZCddKSkpLm1hcCh2YWx1ZSA9PiB2YWx1ZVsnaWQnXSk7XHJcbiAgICAgICAgdGhpcy5fZ3Vuc0xpc3QgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZVsnaWQnXSAhPSAxICYmIHZhbHVlWyd1bmxvY2snXSA8PSBXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCkubWFwKHZhbHVlID0+IHZhbHVlWydpZCddKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKEdhbWVQcm94eS5FdmVudC5TdGFydEdlbkVuZW15LCB0aGlzLnN0YXJ0R2VuZXJhdGluZywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihHYW1lUHJveHkuRXZlbnQuU3RvcEdlbkVuZW15LCB0aGlzLnN0b3BHZW5lcmF0aW5nLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKEdhbWVQcm94eS5FdmVudC5LaWxsRW5lbXksIHRoaXMub25LaWxsRW5lbXksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoR2FtZVByb3h5LkV2ZW50LktpbGxSb2xlLCB0aGlzLm9uS2lsbFJvbGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoR2FtZVByb3h5LkV2ZW50LlNsb3dHYW1lLCB0aGlzLm9uU2xvd0dhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoR2FtZVByb3h5LkV2ZW50LlBhdXNlR2FtZSwgdGhpcy5vblBhdXNlR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihHYW1lUHJveHkuRXZlbnQuU2hha2VTY3JlZW4sIHRoaXMub25TaGFrZVNjcmVlbiwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFrZVNjcmVlbihkdXJhdGlvbjpudW1iZXIsc3RyZW5ndGhfeDpudW1iZXIsc3RyZW5ndGhfeTpudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLl9zaGFrZUR1cmF0aW9uIDw9IGR1cmF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5fc2hha2VEdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnNoYWtlTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNoYWtlTm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hha2VOb2RlLnJ1bkFjdGlvbihTaGFrZS5jcmVhdGUoZHVyYXRpb24sIHN0cmVuZ3RoX3gsIHN0cmVuZ3RoX3kpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TbG93R2FtZShzbG93OmJvb2xlYW4pe1xyXG4gICAgICAgIC8vIHRoaXMudXBkYXRlR3JleSgpO1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXS5hbGxBY3RpdmVFbmVteSgpLmZvckVhY2godmFsdWUgPT4gdmFsdWUuZ2FtZVNsb3cgPSBzbG93KTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhdXNlR2FtZShwYXVzZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdyZXkoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHcmV5KG9wYWNpdHk6bnVtYmVyID0gMTkwKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZUdyZXk9PT5cIiwgR2FtZVByb3h5LnBhdXNlR2FtZSk7XHJcbiAgICAgICAgdGhpcy5ncmV5Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIGlmIChHYW1lUHJveHkucGF1c2VHYW1lIHx8IEdhbWVQcm94eS5zbG93R2FtZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JleU5vZGUucnVuQWN0aW9uKGNjLmZhZGVUbygwLjMsIG9wYWNpdHkpKTtcclxuICAgICAgICAgICAgLy8gY2MudHdlZW4odGhpcy5ncmV5Tm9kZSlcclxuICAgICAgICAgICAgLy8gICAgIC50bygwLjMsIHsgb3BhY2l0eTogb3BhY2l0eSB9KVxyXG4gICAgICAgICAgICAvLyAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdyZXlOb2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZW5FbmVteUNvdW50ID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQr+WKqOaAqueJqeeUn+aIkOiuoeWIklxyXG4gICAgICovXHJcbiAgICBzdGFydEdlbmVyYXRpbmcoKXtcclxuICAgICAgICBpZiAodGhpcy5fZ2VuZXJhdGluZylyZXR1cm47XHJcbiAgICAgICAgdGhpcy5fZ2VuZXJhdGluZyA9IHRydWU7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coR2FtZVByb3h5LmVuZW15TGlzdCwgXCJlbmVteUxpc3RcIik7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5raWxsQ291bnQgPCBHYW1lUHJveHkubGV2ZWxDb25maWcuYW1vdW50X3AxKXtcclxuICAgICAgICAgICAgLyoqIOesrOS4gOmYtuautSAwLjVz5Ye65LiA5Liq5oCq54mpICovXHJcbiAgICAgICAgICAgIC8qKiAwLjVz5Ye65LiA5Liq5oCq54mpICovXHJcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCk9PnRoaXMuX2dlbkVuZW15Q291bnQgKz0gMSksIGNjLmRlbGF5VGltZSgwLjUpKSwgR2FtZVByb3h5LmxldmVsQ29uZmlnLmRlbGltaXRfcDEpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydENEVGFzaygpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGFjdGlvbi5zZXRUYWcoMTAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8qKiDnrKzkuozpmLbmrrUgMC41c+S4gOasoeWHujPkuKogKi9cclxuICAgICAgICAgICAgLyoqIDAuNXPlh7rkuIDkuKrmgKrniakgKi9cclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLnJlcGVhdChjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYygoKT0+dGhpcy5fZ2VuRW5lbXlDb3VudCArPSAxKSwgY2MuZGVsYXlUaW1lKDAuNSkpLCBNYXRoLmZsb29yKEdhbWVQcm94eS5sZXZlbENvbmZpZy5kZWxpbWl0X3AxKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5lcmF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Q0RUYXNrKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgYWN0aW9uLnNldFRhZygxMDEwKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmgKrniannlJ/miJDorqHliJJcclxuICAgICAqICovXHJcbiAgICBzdG9wR2VuZXJhdGluZygpe1xyXG4gICAgICAgIGlmICghdGhpcy5fZ2VuZXJhdGluZylyZXR1cm47XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZygxMDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6h5pe25Lu75YqhICovXHJcbiAgICBzdGFydENEVGFzaygpe1xyXG4gICAgICAgIHRoaXMuc3RvcENEVGFzaygpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMTApLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAvKiog55Sf5oiQ5Lik5Y+q5oCq54mpICovXHJcbiAgICAgICAgICAgIHRoaXMuX2dlbkVuZW15Q291bnQgKz0gMjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydENEVGFzaygpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDEwNDEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5YGc5q2i6K6h5pe25Lu75YqhICovXHJcbiAgICBzdG9wQ0RUYXNrKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZygxMDQxKTtcclxuICAgIH1cclxuXHJcbiAgICBvbktpbGxSb2xlKCl7XHJcbiAgICAgICAgR2FtZVByb3h5LmlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgR2FtZVByb3h5LnBhdXNlR2FtZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5maXJzdEFpZEZsYWcpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbGl2ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbGl2ZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTXVzaWMucGxheVNGWChcInNvdW5kL21zY19yb2wwMDJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG92ZXI9PT7nrYnlvoXlpI3mtLtcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJvcExpc3QgPSBbMSwgMiwgMywgNCwgNSwgNiwgOSwgMTEsIDEyLCAxM107XHJcbiAgICBwcml2YXRlIF9ndW5zTGlzdCA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2Rpc3BsYXlQcm9wTGlzdCA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfZGlzcGxheUd1c0xpc3QgPSBbXTtcclxuXHJcbiAgICAvKiog5o6J5p6qICovXHJcbiAgICBwcml2YXRlIGRpc3BsYXlHdW4ocG9zaXRpb246Y2MuVmVjMil7XHJcbiAgICAgICAgbGV0IHByb3AgPSB3aW5kb3dbJ0dhbWVFbmVteXNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVHdW4oKTtcclxuICAgICAgICBsZXQgdGVzdExpc3QgPSB0aGlzLl9ndW5zTGlzdC5maWx0ZXIodmFsdWUgPT4gIXRoaXMuX2Rpc3BsYXlHdXNMaXN0LmluY2x1ZGVzKHZhbHVlKSk7XHJcbiAgICAgICAgaWYgKHRlc3RMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgdGVzdExpc3QgPSB0aGlzLl9ndW5zTGlzdDtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheUd1c0xpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkID0gZXh0LnJhbmRvbUVsZW1lbnQodGVzdExpc3QpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlHdXNMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgIHByb3AuaW5pdChpZCArIDEwMCk7XHJcbiAgICAgICAgcHJvcC5ub2RlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgcHJvcC5kaXNwbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaOiemBk+WFtyAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwbGF5UHJvcChwb3NpdGlvbjpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgdGVzdExpc3QgPSB0aGlzLl9wcm9wTGlzdC5maWx0ZXIodmFsdWUgPT4gIXRoaXMuX2Rpc3BsYXlQcm9wTGlzdC5pbmNsdWRlcyh2YWx1ZSkpO1xyXG4gICAgICAgIGlmICh0ZXN0TGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIHRlc3RMaXN0ID0gdGhpcy5fcHJvcExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlQcm9wTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWQgPSBleHQucmFuZG9tRWxlbWVudCh0ZXN0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVByb3BMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgIGxldCBwcm9wID0gd2luZG93WydHYW1lRW5lbXlzQ29udHJvbGxlciddLmdldEluYWN0aXZlUHJvcChpZCk7XHJcbiAgICAgICAgcHJvcC5ub2RlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgcHJvcC5kaXNwbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlRGlzcGxheUd1biA9IGZhbHNlO1xyXG5cclxuICAgIG9uS2lsbEVuZW15KGVuZW15OkVuZW15KXtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LmtpbGxDb3VudCUxMCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gZW5lbXkubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZURpc3BsYXlHdW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UHJvcChwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUd1bihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcHJlRGlzcGxheUd1biA9ICF0aGlzLl9wcmVEaXNwbGF5R3VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5raWxsQ291bnQgPT0gR2FtZVByb3h5LmxldmVsQ29uZmlnLmFtb3VudF9wMSAtIDMpe1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlHdW4oZW5lbXkubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoR2FtZVByb3h5LmtpbGxDb3VudCArIHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXS5hbGxBbGl2ZUVuZW15KCkubGVuZ3RoIDwgR2FtZVByb3h5LmxldmVsQ29uZmlnLmFtb3VudF9wMSl7XHJcbiAgICAgICAgICAgIC8v56ys5LiA6Zi25q61XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbkVuZW15Q291bnQgKz0gMjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydENEVGFzaygpO1xyXG4gICAgICAgIH1lbHNlIGlmIChHYW1lUHJveHkuZW5lbXlMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAvL+esrOS6jOmYtuautVxyXG4gICAgICAgICAgICB0aGlzLl9nZW5FbmVteUNvdW50ICs9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDRFRhc2soKTtcclxuICAgICAgICB9ZWxzZSBpZiAoR2FtZVByb3h5LmtpbGxDb3VudCA+PSBHYW1lUHJveHkubWF4RW5lbXlOdW0pIHtcclxuICAgICAgICAgICAgR2FtZVByb3h5LmlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgIEdhbWVQcm94eS5wYXVzZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgd2luLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ibG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5raWxsQ291bnQgPT0gNSl7XHJcbiAgICAgICAgICAgIGlmICghV29ybGQuTXkubmV3Ymllcy5zdGF0ZShcIktpbGxGaXZlRW5lbXlcIikpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld2JpZU5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgbmV3YmllTm9kZS5uYW1lID0gXCJuZXdiaWVOb2RlXCI7XHJcbiAgICAgICAgICAgICAgICBuZXdiaWVOb2RlLnBvc2l0aW9uID0gdGhpcy5zdXBwbHlHdWlkZU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKCkpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChuZXdiaWVOb2RlKTtcclxuICAgICAgICAgICAgICAgIC8qKiBndWlkZUNpcmNsZSAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IGd1aWRlQ2lyY2xlUHJlZmFiID0gY2MubG9hZGVyLmdldFJlcyhcInByZWZhYi9ndWlkZUNpcmNsZVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBndWlkZUNpcmNsZU5vZGUgPSBjYy5pbnN0YW50aWF0ZShndWlkZUNpcmNsZVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBndWlkZUNpcmNsZU5vZGUucG9zaXRpb24gPSBjYy52MigpO1xyXG4gICAgICAgICAgICAgICAgbmV3YmllTm9kZS5hZGRDaGlsZChndWlkZUNpcmNsZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLyoqIGd1aWRlU2tlICovXHJcbiAgICAgICAgICAgICAgICBsZXQgZ3VpZGVTa2VQcmVmYWIgPSBjYy5sb2FkZXIuZ2V0UmVzKFwicHJlZmFiL2d1aWRlU2tlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGd1aWRlU2tlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGd1aWRlU2tlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGd1aWRlU2tlTm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBuZXdiaWVOb2RlLmFkZENoaWxkKGd1aWRlU2tlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUHJveHkucGF1c2VHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JleU5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JleU5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdlbkVuZW15KCl7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5lbmVteUxpc3QubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiDliKTmlq3kuIrpmZAgKi9cclxuICAgICAgICAvKiog56ys5LiA6Zi25q61ICovXHJcbiAgICAgICAgbGV0IGFsaXZlQ291bnQgPSB3aW5kb3dbJ0dhbWVFbmVteXNDb250cm9sbGVyJ10uYWxsQWxpdmVFbmVteSgpLmxlbmd0aDtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LmtpbGxDb3VudCArIGFsaXZlQ291bnQgPD0gR2FtZVByb3h5LmxldmVsQ29uZmlnLmFtb3VudF9wMSl7XHJcbiAgICAgICAgICAgICBpZiAoYWxpdmVDb3VudCA+PSBHYW1lUHJveHkubGV2ZWxDb25maWcubGltaXRfcDEpe1xyXG4gICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhbGl2ZUNvdW50ID49IEdhbWVQcm94eS5sZXZlbENvbmZpZy5saW1pdF9wMil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93WydHYW1lRW5lbXlzQ29udHJvbGxlciddLmNyZWF0ZUVuZW15KEdhbWVQcm94eS5lbmVteUxpc3Quc2hpZnQoKSk7XHJcbiAgICAgICAgdGhpcy5fZ2VuRW5lbXlDb3VudC0tO1xyXG4gICAgICAgIC8vIHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXS5jcmVhdGVFbmVteSgzKTtcclxuICAgICAgICBpZiAoR2FtZVByb3h5Lm1heEVuZW15TnVtIC0gR2FtZVByb3h5LmVuZW15TGlzdC5sZW5ndGggID09PSBHYW1lUHJveHkubGV2ZWxDb25maWcuYW1vdW50X3AxKzEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVFbmVteVRpcHNBbmltYXRpb24ubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVFbmVteVRpcHNBbmltYXRpb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVFbmVteVRpcHNBbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5lbmVteUxpc3QubGVuZ3RoID09IEdhbWVQcm94eS5zZWNvbmRCb3NzTnVtIC0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9zc1RpcHNBbmltYXRpb24ubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLmJvc3NUaXBzQW5pbWF0aW9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ib3NzVGlwc0FuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLl9nZW5FbmVteUNvdW50ID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuRW5lbXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19