
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameUIController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVVJQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLDJEQUFxRDtBQUNyRCw4REFBeUQ7QUFHbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSSxlQUFlLEdBQVcsSUFBSSxDQUFDO0FBR25DO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBaUpDO1FBOUlHLG9CQUFjLEdBQVcsSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLHFCQUFlLEdBQWtCLElBQUksQ0FBQztRQUd0Qyx1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLGtCQUFZLEdBQVcsSUFBSSxDQUFDOztRQXdINUIsaUJBQWlCO0lBQ3JCLENBQUM7SUF2SFcsa0RBQXVCLEdBQS9CO1FBQ0ksSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUNoRixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUM7WUFDYixJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJ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QUMscUJBQVMsQ0FBQyxXQUFXLEdBQUcscUJBQVMsQ0FBQyxTQUFTLENBQUMsR0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxNQUFHLENBQUE7SUFDbkksQ0FBQztJQTNJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0RBQ087SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs2REFDYTtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ1U7SUF4QlgsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FpSnBDO0lBQUQsdUJBQUM7Q0FqSkQsQUFpSkMsQ0FqSjZDLEVBQUUsQ0FBQyxTQUFTLEdBaUp6RDtrQkFqSm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4vR2FtZVByb3h5XCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IEFjdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9hY3Rpb25zL0FjdGlvbnNcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxubGV0IEdvbGRJY29uTm9kZVBvczpjYy5WZWMyID0gbnVsbDtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc3VwcGx5SWNvbk5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbHZMYWJlbHM6IFtjYy5SaWNoVGV4dF0gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBnYW1lUHJvZ3Jlc3NCYXI6Y2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGdhbWVQcm9ncmVzc0xhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBnb2xkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ29sZEljb25Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ29sZExheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZU92ZXJOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgZ2V0SW5hY3RpdmVHb2xkSWNvbk5vZGUoKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlOmNjLk5vZGUgPSB0aGlzLmdvbGRMYXllci5jaGlsZHJlbi5maW5kKHZhbHVlID0+IHZhbHVlLmFjdGl2ZSA9PSBmYWxzZSk7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdvbGRJY29uTm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZExheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgbm9kZS5zY2FsZSA9IDAuNztcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHb2xkKCl7XHJcbiAgICAgICAgdGhpcy5nb2xkTGFiZWwuc3RyaW5nID0gZXh0LnNob3J0Rm9ybWF0KEdhbWVQcm94eS5nb2xkQ291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5LaWxsRW5lbXksIHRoaXMub25LaWxsRW5lbXksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihHYW1lUHJveHkuRXZlbnQuSW5pdEdhbWUsIHRoaXMub25Jbml0R2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5TdGFydEdhbWUsIHRoaXMub25TdGFydEdhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3VwcGx5SWNvbk5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjM1LCAwLjkxKSwgY2Muc2NhbGVUbygwLjM1LCAxKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKEdhbWVQcm94eS5FdmVudC5LaWxsRW5lbXksIHRoaXMub25LaWxsRW5lbXksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoR2FtZVByb3h5LkV2ZW50LkluaXRHYW1lLCB0aGlzLm9uSW5pdEdhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoR2FtZVByb3h5LkV2ZW50LlN0YXJ0R2FtZSwgdGhpcy5vblN0YXJ0R2FtZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tXaW4oKXtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LmlzT3ZlciAmJiBHYW1lUHJveHkua2lsbENvdW50ID49IEdhbWVQcm94eS5tYXhFbmVteU51bSAmJiB0aGlzLmdvbGRMYXllci5jaGlsZHJlbi5ldmVyeSh2YWx1ZSA9PiB2YWx1ZS5hY3RpdmUgPT0gZmFsc2UpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLph5HluIHpo57lrozkuobvvIznu5PnrpdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2lsbEVuZW15KGVuZW15KXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PW9uS2lsbEVuZW15PT09PT5cIik7XHJcbiAgICAgICAgLyoqIOWIhumFjemHkeW4gSAqL1xyXG4gICAgICAgIGxldCB0b3RhbEdvbGQgPSBlbmVteS5nb2xkICogR2FtZVByb3h5LmdvbGRNdWw7XHJcbiAgICAgICAgbGV0IHNpZ2xlR29sZCA9IE1hdGguZmxvb3IodG90YWxHb2xkL2VuZW15LmdvbGRJY29uRmVsbCk7XHJcbiAgICAgICAgbGV0IHJlc3RHb2xkID0gdG90YWxHb2xkIC0gc2lnbGVHb2xkICogZW5lbXkuZ29sZEljb25GZWxsO1xyXG4gICAgICAgIGxldCBhZGRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1vdmVTcGVlZCA9IDEwMDA7XHJcbiAgICAgICAgLyoqIOmjnumHkeW4gSAqL1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGVuZW15Lm5vZGUucG9zaXRpb24uYWRkKGVuZW15Lm5vZGUuZ2V0UGFyZW50KCkuZ2V0UGFyZW50KCkucG9zaXRpb24pO1xyXG4gICAgICAgIGlmIChlbmVteS5nb2xkSWNvbkZlbGwgPCA1KXtcclxuICAgICAgICAgICAgLyoqIOavj+S4gOS4quW7tui/nzAuMeenkuaJp+ihjCAqL1xyXG4gICAgICAgICAgICAvKiog6ZqP5py65LiA5Liq5pa55ZCRICovXHJcbiAgICAgICAgICAgIGxldCBzdWIgPSBHb2xkSWNvbk5vZGVQb3Muc3ViKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGNlbnRlciA9IHBvc2l0aW9uLmFkZChzdWIubXVsKDAuMTUpKTtcclxuICAgICAgICAgICAgbGV0IHAgPSBzdWIubm9ybWFsaXplKCkucm90YXRlKC05MCpNYXRoLlBJLzE4MCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBkdXJhdGlvbiA9IHN1Yi5tYWcoKS9tb3ZlU3BlZWQ7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IDAuNjU7XHJcbiAgICAgICAgICAgIGxldCBiTGVmdCA9IChNYXRoLnJhbmRvbSgpKjEwMCklMiA9PT0gMTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPGVuZW15LmdvbGRJY29uRmVsbDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gaSUyID09PSAwID8gYkxlZnQgOiAhYkxlZnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ29sZEljb24gPSB0aGlzLmdldEluYWN0aXZlR29sZEljb25Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb2xkSWNvbi5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgZ29sZEljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdvbGRJY29uLnJ1bkFjdGlvbihjYy5zcGVlZChjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoaSowLjEpLCBjYy5iZXppZXJUbyhkdXJhdGlvbiwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlci5hZGQocC5tdWwoMzAwKihsZWZ0Py0xOjEpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgR29sZEljb25Ob2RlUG9zLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvbGRJY29uTm9kZVBvc1xyXG4gICAgICAgICAgICAgICAgXSkuZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25JbigpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBnb2xkSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WKoOmHkeW4gVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWRkRmxhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lUHJveHkuZ29sZENvdW50ICs9IHNpZ2xlR29sZCArIHJlc3RHb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVQcm94eS5nb2xkQ291bnQgKz0gc2lnbGVHb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdvbGQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrV2luKCk7XHJcbiAgICAgICAgICAgICAgICB9KSksIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBY3Rpb25zLmJvb209PT0+XCIpO1xyXG4gICAgICAgICAgICAvKiog5YOP6L2s55uY5LiA5qC354K45byAICovXHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSA4MDtcclxuICAgICAgICAgICAgbGV0IG51bSA9IGVuZW15LmdvbGRJY29uRmVsbDtcclxuICAgICAgICAgICAgQWN0aW9ucy5ib29tKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0SW5hY3RpdmVHb2xkSWNvbk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9LCBwb3NpdGlvbiwgR29sZEljb25Ob2RlUG9zLCByYWRpdXMsIG51bSxtb3ZlU3BlZWQsICgpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFkZEZsYWcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQcm94eS5nb2xkQ291bnQgKz0gc2lnbGVHb2xkICsgcmVzdEdvbGQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVQcm94eS5nb2xkQ291bnQgKz0gc2lnbGVHb2xkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrV2luKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUdhbWVQcm9ncmVzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdEdhbWUoKXtcclxuICAgICAgICB0aGlzLmx2TGFiZWxzLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMxZTFlMWUgd2lkdGg9Mz4ke0dhbWVQcm94eS5sZXZlbC0xK2luZGV4fTwvb3V0bGluZT48L2I+YCk7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5sZXZlbCA8IDIpe1xyXG4gICAgICAgICAgICB0aGlzLmx2TGFiZWxzWzBdLm5vZGUuZ2V0UGFyZW50KCkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydEdhbWUoKXtcclxuICAgICAgICBHb2xkSWNvbk5vZGVQb3MgPSB0aGlzLmdvbGRMYXllci5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmdvbGRJY29uTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUdhbWVQcm9ncmVzcygpe1xyXG4gICAgICAgIHRoaXMuZ2FtZVByb2dyZXNzQmFyLnByb2dyZXNzID0gR2FtZVByb3h5LmtpbGxDb3VudCAvIEdhbWVQcm94eS5tYXhFbmVteU51bTtcclxuICAgICAgICB0aGlzLmdhbWVQcm9ncmVzc0xhYmVsLnN0cmluZyA9IGDliankvZnmlYzkurrvvJoke01hdGguY2VpbCgxMDAgKiAoR2FtZVByb3h5Lm1heEVuZW15TnVtIC0gR2FtZVByb3h5LmtpbGxDb3VudCkvR2FtZVByb3h5Lm1heEVuZW15TnVtKX0lYFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19