"use strict";
cc._RF.push(module, 'f3f85MNlcZIA6Ym+TSEYYf+', 'GameUIController');
// script/app/game/GameUIController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("./GameProxy");
var Extend_1 = require("../../../framework/extend/Extend");
var Actions_1 = require("../../../framework/actions/Actions");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoldIconNodePos = null;
var GameUIController = /** @class */ (function (_super) {
    __extends(GameUIController, _super);
    function GameUIController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supplyIconNode = null;
        _this.lvLabels = [];
        _this.gameProgressBar = null;
        _this.gameProgressLabel = null;
        _this.goldLabel = null;
        _this.goldIconNode = null;
        _this.goldLayer = null;
        _this.gameOverNode = null;
        return _this;
        // update (dt) {}
    }
    GameUIController.prototype.getInactiveGoldIconNode = function () {
        var node = this.goldLayer.children.find(function (value) { return value.active == false; });
        if (node == null) {
            node = cc.instantiate(this.goldIconNode);
            node.active = false;
            this.goldLayer.addChild(node);
        }
        node.opacity = 255;
        node.scale = 0.7;
        return node;
    };
    GameUIController.prototype.updateGold = function () {
        this.goldLabel.string = Extend_1.ext.shortFormat(GameProxy_1.GameProxy.goldCount);
    };
    GameUIController.prototype.onLoad = function () {
        this.node.on(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
        this.node.on(GameProxy_1.GameProxy.Event.InitGame, this.onInitGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.StartGame, this.onStartGame, this);
        this.supplyIconNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.35, 0.91), cc.scaleTo(0.35, 1))));
    };
    GameUIController.prototype.onDestroy = function () {
        this.node.off(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
        this.node.off(GameProxy_1.GameProxy.Event.InitGame, this.onInitGame, this);
        this.node.off(GameProxy_1.GameProxy.Event.StartGame, this.onStartGame, this);
    };
    GameUIController.prototype.checkWin = function () {
        if (GameProxy_1.GameProxy.isOver && GameProxy_1.GameProxy.killCount >= GameProxy_1.GameProxy.maxEnemyNum && this.goldLayer.children.every(function (value) { return value.active == false; })) {
            console.log("金币飞完了，结算");
            this.gameOverNode.active = true;
        }
    };
    GameUIController.prototype.onKillEnemy = function (enemy) {
        var _this = this;
        // console.log("======onKillEnemy====>");
        /** 分配金币 */
        var totalGold = enemy.gold * GameProxy_1.GameProxy.goldMul;
        var sigleGold = Math.floor(totalGold / enemy.goldIconFell);
        var restGold = totalGold - sigleGold * enemy.goldIconFell;
        var addFlag = false;
        var moveSpeed = 1000;
        /** 飞金币 */
        var position = enemy.node.position.add(enemy.node.getParent().getParent().position);
        if (enemy.goldIconFell < 5) {
            /** 每一个延迟0.1秒执行 */
            /** 随机一个方向 */
            var sub = GoldIconNodePos.sub(position);
            var center = position.add(sub.mul(0.15));
            var p = sub.normalize().rotate(-90 * Math.PI / 180);
            // let duration = sub.mag()/moveSpeed;
            var duration = 0.65;
            var bLeft = (Math.random() * 100) % 2 === 1;
            var _loop_1 = function (i) {
                var left = i % 2 === 0 ? bLeft : !bLeft;
                var goldIcon = this_1.getInactiveGoldIconNode();
                goldIcon.position = position;
                goldIcon.active = true;
                goldIcon.runAction(cc.speed(cc.sequence(cc.delayTime(i * 0.1), cc.bezierTo(duration, [
                    center.add(p.mul(300 * (left ? -1 : 1))),
                    GoldIconNodePos,
                    GoldIconNodePos
                ]).easing(cc.easeCircleActionIn()), cc.callFunc(function () {
                    goldIcon.active = false;
                    //加金币
                    if (!addFlag) {
                        addFlag = true;
                        GameProxy_1.GameProxy.goldCount += sigleGold + restGold;
                    }
                    else {
                        GameProxy_1.GameProxy.goldCount += sigleGold;
                    }
                    _this.updateGold();
                    _this.checkWin();
                })), 1));
            };
            var this_1 = this;
            for (var i = 0; i < enemy.goldIconFell; i++) {
                _loop_1(i);
            }
        }
        else {
            // console.log("Actions.boom===>");
            /** 像转盘一样炸开 */
            var radius = 80;
            var num = enemy.goldIconFell;
            Actions_1.default.boom(function () {
                var node = _this.getInactiveGoldIconNode();
                node.active = true;
                return node;
            }, position, GoldIconNodePos, radius, num, moveSpeed, function () {
                if (!addFlag) {
                    addFlag = true;
                    GameProxy_1.GameProxy.goldCount += sigleGold + restGold;
                }
                else {
                    GameProxy_1.GameProxy.goldCount += sigleGold;
                }
                _this.updateGold();
                _this.checkWin();
            });
        }
        this.updateGameProgress();
    };
    GameUIController.prototype.onInitGame = function () {
        this.lvLabels.forEach(function (value, index) { return value.string = "<b><outline color=#1e1e1e width=3>" + (GameProxy_1.GameProxy.level - 1 + index) + "</outline></b>"; });
        if (GameProxy_1.GameProxy.level < 2) {
            this.lvLabels[0].node.getParent().active = false;
        }
        this.updateGameProgress();
        this.updateGold();
    };
    GameUIController.prototype.onStartGame = function () {
        GoldIconNodePos = this.goldLayer.convertToNodeSpaceAR(this.goldIconNode.convertToWorldSpaceAR(cc.v2()));
    };
    GameUIController.prototype.updateGameProgress = function () {
        this.gameProgressBar.progress = GameProxy_1.GameProxy.killCount / GameProxy_1.GameProxy.maxEnemyNum;
        this.gameProgressLabel.string = "\u5269\u4F59\u654C\u4EBA\uFF1A" + Math.ceil(100 * (GameProxy_1.GameProxy.maxEnemyNum - GameProxy_1.GameProxy.killCount) / GameProxy_1.GameProxy.maxEnemyNum) + "%";
    };
    __decorate([
        property(cc.Node)
    ], GameUIController.prototype, "supplyIconNode", void 0);
    __decorate([
        property(cc.RichText)
    ], GameUIController.prototype, "lvLabels", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], GameUIController.prototype, "gameProgressBar", void 0);
    __decorate([
        property(cc.Label)
    ], GameUIController.prototype, "gameProgressLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameUIController.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIController.prototype, "goldIconNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIController.prototype, "goldLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIController.prototype, "gameOverNode", void 0);
    GameUIController = __decorate([
        ccclass
    ], GameUIController);
    return GameUIController;
}(cc.Component));
exports.default = GameUIController;

cc._RF.pop();