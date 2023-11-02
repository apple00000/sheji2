
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameEnemysController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6254chnxYNAb5mM5HqrGwAR', 'GameEnemysController');
// script/app/game/GameEnemysController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_1 = require("../entities/enemy/Enemy");
var SpacePartition_1 = require("../../../framework/extend/SpacePartition");
var GameProxy_1 = require("./GameProxy");
var PropBase_1 = require("../entities/prop/PropBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MAX_LOGIC_COUNT = 10;
var GameEnemysController = /** @class */ (function (_super) {
    __extends(GameEnemysController, _super);
    function GameEnemysController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propLayer = null;
        _this.enemyLayer = null;
        _this.enemyBloodLayer = null;
        _this.bgNode = null;
        _this._enemyCount = 0;
        _this.enemyLogicList = [];
        _this._enmeyMap = new Map();
        _this._enmeyBloodArray = [];
        _this._propMap = new Map();
        _this._gunsArr = [];
        _this.gameProps = [];
        _this._screenRect = cc.rect(0, 0, cc.visibleRect.width, cc.visibleRect.height);
        return _this;
    }
    Object.defineProperty(GameEnemysController.prototype, "enemyCount", {
        get: function () {
            return this._enemyCount;
        },
        set: function (value) {
            this._enemyCount = value;
        },
        enumerable: false,
        configurable: true
    });
    GameEnemysController.prototype.genEnemy = function (id) {
        var prefabPath = 'prefab/entities/enemy/enemy' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        node.active = false;
        this.enemyLayer.addChild(node);
        var enemy = node.getComponent(Enemy_1.default);
        enemy.init(id);
        var arr = this._enmeyMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._enmeyMap.set(id, arr);
        }
        arr.push(enemy);
        return enemy;
    };
    GameEnemysController.prototype.getInactiveEnemy = function (id) {
        var result = undefined;
        var arr = this._enmeyMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genEnemy(id);
        }
        return result;
    };
    GameEnemysController.prototype.genEnemyBloodNode = function () {
        var prefabPath = 'prefab/entities/blood/blood';
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        node.active = false;
        this.enemyBloodLayer.addChild(node);
        this._enmeyBloodArray.push(node);
        return node;
    };
    GameEnemysController.prototype.getInactiveEnemyBloodNode = function () {
        var result = this._enmeyBloodArray.find(function (value) { return value.active == false; });
        if (typeof result == "undefined") {
            result = this.genEnemyBloodNode();
        }
        return result;
    };
    GameEnemysController.prototype.genProp = function (id) {
        var prefabPath = 'prefab/entities/prop/prop' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        node.active = false;
        this.propLayer.addChild(node);
        var prop = node.getComponent(PropBase_1.default);
        prop.init(id);
        var arr = this._propMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._propMap.set(id, arr);
        }
        arr.push(prop);
        return prop;
    };
    GameEnemysController.prototype.getInactiveProp = function (id) {
        var result = undefined;
        var arr = this._propMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genProp(id);
        }
        return result;
    };
    GameEnemysController.prototype.getInactiveGun = function () {
        var result = this._gunsArr.find(function (value) { return value.node.active == false; });
        if (typeof result == "undefined") {
            var prefabPath = 'prefab/entities/prop/guns';
            var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
            var node = cc.instantiate(entityPrefab);
            this.propLayer.addChild(node);
            node.active = false;
            result = node.getComponent(PropBase_1.default);
            this._gunsArr.push(result);
        }
        return result;
    };
    GameEnemysController.prototype.onLoad = function () {
        this.node.on(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
        window['GameEnemysController'] = this;
    };
    GameEnemysController.prototype.onDestroy = function () {
        this.node.off(GameProxy_1.GameProxy.Event.KillEnemy, this.onKillEnemy, this);
    };
    GameEnemysController.prototype.allAliveAndInScreenEnemy = function () {
        var list = [];
        this._screenRect.x = -this.bgNode.x - cc.visibleRect.center.x;
        this._screenRect.y = -this.bgNode.y - cc.visibleRect.center.y;
        for (var _i = 0, _a = this.enemyLayer.children; _i < _a.length; _i++) {
            var node = _a[_i];
            var enemy = node.getComponent(Enemy_1.default);
            if (!enemy.node.active || enemy.hp <= 0 || enemy.node.x + enemy.spaceCircleCollider.radius <= this._screenRect.xMin || enemy.node.x - enemy.spaceCircleCollider.radius > this._screenRect.xMax || enemy.node.y + enemy.spaceCircleCollider.radius < this._screenRect.yMin || enemy.node.y - enemy.spaceCircleCollider.radius > this._screenRect.yMax) {
                continue;
            }
            list.push(enemy);
        }
        return list;
    };
    GameEnemysController.prototype.allAliveEnemy = function () {
        return this.enemyLayer.children.filter(function (value) { return value.active && value.getComponent(Enemy_1.default).hp > 0; }).map(function (value) { return value.getComponent(Enemy_1.default); });
    };
    GameEnemysController.prototype.allActiveEnemy = function () {
        return this.enemyLayer.children.filter(function (value) { return value.active; }).map(function (value) { return value.getComponent(Enemy_1.default); });
    };
    GameEnemysController.prototype.createEnemy = function (id) {
        // console.log("createEnemy==>", id);
        this.enemyCount++;
        //绑定
        //角色900范围内随机出现
        var x1 = Math.max(-this.bgNode.x - cc.visibleRect.center.x, -this.bgNode.width / 2);
        var y1 = Math.max(-this.bgNode.y - cc.visibleRect.center.y, -this.bgNode.height / 2);
        var w1 = Math.min(cc.visibleRect.width, this.bgNode.width / 2 - x1);
        var h1 = Math.min(cc.visibleRect.height, this.bgNode.height / 2 - y1);
        var screenRect = cc.rect(x1, y1, w1, h1);
        var range = 200;
        var x2 = Math.max(x1 - range, -this.bgNode.width / 2);
        var y2 = Math.max(y1 - range, -this.bgNode.height / 2);
        var w2 = Math.min(cc.visibleRect.width + range * 2, this.bgNode.width / 2 - x2);
        var h2 = Math.min(cc.visibleRect.height + range * 2, this.bgNode.height / 2 - y2);
        var rangeRect = cc.rect(x2, y2, w2, h2);
        var partitions = [rangeRect];
        SpacePartition_1.default.partitionRect(partitions, screenRect, 30, 30);
        // let partitions = [cc.rect(-this._bgNode.width/2, -this._bgNode.height/2, this._bgNode.width, this._bgNode.height)];
        // this.allActiveEnemy().forEach(value => {
        //     SpacePartition.partitionRect(partitions, value.enemyAABB.aabb());
        // });
        //
        // SpacePartition.partitionRect(partitions, this._gameRoleController.role.roleAABB.aabb());
        var enemy = this.getInactiveEnemy(id);
        var radius = enemy.getComponent(cc.CircleCollider).radius;
        var rect = SpacePartition_1.default.randomSpace(partitions, radius * 2, radius * 2);
        if (rect) {
            enemy.node.position = rect.center;
            enemy.node.active = true;
            this.enemyLogicList.push(enemy);
            window['GameCollisionController'].looseQuadTree.insert(enemy.enemyAABB);
        }
        else {
            console.error("没有空间了...", partitions);
        }
    };
    GameEnemysController.prototype.onKillEnemy = function (enemy) {
        this.enemyLogicList.splice(this.enemyLogicList.indexOf(enemy), 1);
        window['GameCollisionController'].looseQuadTree.remove(enemy.enemyAABB);
        this.enemyCount--;
    };
    GameEnemysController.prototype.lateUpdate = function () {
        var _a;
        if (GameProxy_1.GameProxy.pauseGame) {
            return;
        }
        /** 每次处理固定数量的敌人逻辑 */
        var preNum = 0;
        for (var _i = 0, _b = this.enemyLogicList; _i < _b.length; _i++) {
            var enemy = _b[_i];
            if (enemy.logicFlag) {
                preNum++;
                enemy.logicFlag = false;
            }
            else {
                break;
            }
        }
        (_a = this.enemyLogicList).push.apply(_a, this.enemyLogicList.splice(0, preNum));
        var count = Math.min(MAX_LOGIC_COUNT, this.enemyLogicList.length);
        for (var i = 0; i < count; i++) {
            this.enemyLogicList[i].logicFlag = true;
        }
    };
    __decorate([
        property(cc.Node)
    ], GameEnemysController.prototype, "propLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameEnemysController.prototype, "enemyLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameEnemysController.prototype, "enemyBloodLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameEnemysController.prototype, "bgNode", void 0);
    GameEnemysController = __decorate([
        ccclass
    ], GameEnemysController);
    return GameEnemysController;
}(cc.Component));
exports.default = GameEnemysController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUVuZW15c0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUM1QywyRUFBc0U7QUFDdEUseUNBQXNDO0FBQ3RDLHNEQUFpRDtBQUUzQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFHekI7SUFBa0Qsd0NBQVk7SUFBOUQ7UUFBQSxxRUE2TkM7UUExTkcsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixxQkFBZSxHQUFXLElBQUksQ0FBQztRQUcvQixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBRWQsaUJBQVcsR0FBRyxDQUFDLENBQUM7UUFFaEIsb0JBQWMsR0FBZ0IsRUFBRSxDQUFDO1FBV2pDLGVBQVMsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztRQUM1QyxzQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO1FBRXJDLGNBQVEsR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztRQUM5QyxjQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUV0QyxlQUFTLEdBQW1CLEVBQUUsQ0FBQztRQXFHdkIsaUJBQVcsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUF1RjdGLENBQUM7SUExTUcsc0JBQUksNENBQVU7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUpBO0lBY08sdUNBQVEsR0FB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Q0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdB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SUF6TkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aUVBQ2E7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDSTtJQVpMLG9CQUFvQjtRQUR4QyxPQUFPO09BQ2Esb0JBQW9CLENBNk54QztJQUFELDJCQUFDO0NBN05ELEFBNk5DLENBN05pRCxFQUFFLENBQUMsU0FBUyxHQTZON0Q7a0JBN05vQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW5lbXkgZnJvbSBcIi4uL2VudGl0aWVzL2VuZW15L0VuZW15XCI7XHJcbmltcG9ydCBTcGFjZVBhcnRpdGlvbiBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9TcGFjZVBhcnRpdGlvblwiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4vR2FtZVByb3h5XCI7XHJcbmltcG9ydCBQcm9wQmFzZSBmcm9tIFwiLi4vZW50aXRpZXMvcHJvcC9Qcm9wQmFzZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5sZXQgTUFYX0xPR0lDX0NPVU5UID0gMTA7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRW5lbXlzQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm9wTGF5ZXI6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlbmVteUxheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZW5lbXlCbG9vZExheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmdOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2VuZW15Q291bnQgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZW5lbXlMb2dpY0xpc3Q6QXJyYXk8RW5lbXk+ID0gW107XHJcblxyXG5cclxuICAgIGdldCBlbmVteUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZW15Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGVuZW15Q291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2VuZW15Q291bnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9lbm1leU1hcCA9IG5ldyBNYXA8bnVtYmVyLCBBcnJheTxFbmVteT4+KCk7XHJcbiAgICBwcml2YXRlIF9lbm1leUJsb29kQXJyYXk6QXJyYXk8Y2MuTm9kZT4gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9wTWFwID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PFByb3BCYXNlPj4oKTtcclxuICAgIHByaXZhdGUgX2d1bnNBcnI6QXJyYXk8UHJvcEJhc2U+ID0gW107XHJcblxyXG4gICAgZ2FtZVByb3BzOkFycmF5PFByb3BCYXNlPiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgZ2VuRW5lbXkoaWQ6bnVtYmVyKTpFbmVteXtcclxuICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvZW5lbXkvZW5lbXknK2lkO1xyXG4gICAgICAgIGxldCBlbnRpdHlQcmVmYWIgPSBjYy5sb2FkZXIuZ2V0UmVzKHByZWZhYlBhdGgsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShlbnRpdHlQcmVmYWIpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbmVteUxheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGxldCBlbmVteSA9IDxFbmVteT5ub2RlLmdldENvbXBvbmVudChFbmVteSk7XHJcbiAgICAgICAgZW5lbXkuaW5pdChpZCk7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuX2VubWV5TWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9lbm1leU1hcC5zZXQoaWQsIGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbmFjdGl2ZUVuZW15KGlkOm51bWJlcik6RW5lbXl7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpFbmVteSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fZW5tZXlNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyciAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyci5maW5kKHZhbHVlID0+IHZhbHVlLm5vZGUuYWN0aXZlID09IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2VuRW5lbXkoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2VuRW5lbXlCbG9vZE5vZGUoKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBwcmVmYWJQYXRoID0gJ3ByZWZhYi9lbnRpdGllcy9ibG9vZC9ibG9vZCc7XHJcbiAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGVudGl0eVByZWZhYik7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVuZW15Qmxvb2RMYXllci5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB0aGlzLl9lbm1leUJsb29kQXJyYXkucHVzaChub2RlKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEluYWN0aXZlRW5lbXlCbG9vZE5vZGUoKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCByZXN1bHQ6Y2MuTm9kZSA9IHRoaXMuX2VubWV5Qmxvb2RBcnJheS5maW5kKHZhbHVlID0+IHZhbHVlLmFjdGl2ZSA9PSBmYWxzZSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2VuRW5lbXlCbG9vZE5vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdlblByb3AoaWQ6bnVtYmVyKTpQcm9wQmFzZXtcclxuICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wJytpZDtcclxuICAgICAgICBsZXQgZW50aXR5UHJlZmFiID0gY2MubG9hZGVyLmdldFJlcyhwcmVmYWJQYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoZW50aXR5UHJlZmFiKTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvcExheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGxldCBwcm9wID0gPFByb3BCYXNlPm5vZGUuZ2V0Q29tcG9uZW50KFByb3BCYXNlKTtcclxuICAgICAgICBwcm9wLmluaXQoaWQpO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLl9wcm9wTWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9wTWFwLnNldChpZCwgYXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyLnB1c2gocHJvcCk7XHJcbiAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5hY3RpdmVQcm9wKGlkOm51bWJlcik6UHJvcEJhc2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpQcm9wQmFzZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fcHJvcE1hcC5nZXQoaWQpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJyICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYXJyLmZpbmQodmFsdWUgPT4gdmFsdWUubm9kZS5hY3RpdmUgPT0gZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZW5Qcm9wKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmFjdGl2ZUd1bigpOlByb3BCYXNle1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9ndW5zQXJyLmZpbmQodmFsdWUgPT4gdmFsdWUubm9kZS5hY3RpdmUgPT0gZmFsc2UpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvcHJvcC9ndW5zJztcclxuICAgICAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShlbnRpdHlQcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BMYXllci5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gPFByb3BCYXNlPm5vZGUuZ2V0Q29tcG9uZW50KFByb3BCYXNlKTtcclxuICAgICAgICAgICAgdGhpcy5fZ3Vuc0Fyci5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5LaWxsRW5lbXksIHRoaXMub25LaWxsRW5lbXksIHRoaXMpO1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihHYW1lUHJveHkuRXZlbnQuS2lsbEVuZW15LCB0aGlzLm9uS2lsbEVuZW15LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zY3JlZW5SZWN0OmNjLlJlY3QgPSBjYy5yZWN0KDAsIDAsIGNjLnZpc2libGVSZWN0LndpZHRoLCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xyXG4gICAgYWxsQWxpdmVBbmRJblNjcmVlbkVuZW15KCk6QXJyYXk8RW5lbXk+e1xyXG4gICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fc2NyZWVuUmVjdC54ID0gLXRoaXMuYmdOb2RlLnggLSBjYy52aXNpYmxlUmVjdC5jZW50ZXIueDtcclxuICAgICAgICB0aGlzLl9zY3JlZW5SZWN0LnkgPSAtdGhpcy5iZ05vZGUueSAtIGNjLnZpc2libGVSZWN0LmNlbnRlci55O1xyXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5lbmVteUxheWVyLmNoaWxkcmVuKXtcclxuICAgICAgICAgICAgbGV0IGVuZW15ID0gbm9kZS5nZXRDb21wb25lbnQoRW5lbXkpO1xyXG4gICAgICAgICAgICBpZiAoIWVuZW15Lm5vZGUuYWN0aXZlIHx8IGVuZW15LmhwIDw9IDAgfHwgZW5lbXkubm9kZS54ICsgZW5lbXkuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMgPD0gdGhpcy5fc2NyZWVuUmVjdC54TWluIHx8IGVuZW15Lm5vZGUueCAtIGVuZW15LnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzID4gdGhpcy5fc2NyZWVuUmVjdC54TWF4IHx8IGVuZW15Lm5vZGUueSArIGVuZW15LnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzIDwgdGhpcy5fc2NyZWVuUmVjdC55TWluIHx8IGVuZW15Lm5vZGUueSAtIGVuZW15LnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzID4gdGhpcy5fc2NyZWVuUmVjdC55TWF4KXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChlbmVteSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGFsbEFsaXZlRW5lbXkoKTpBcnJheTxFbmVteT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5lbXlMYXllci5jaGlsZHJlbi5maWx0ZXIodmFsdWUgPT4gdmFsdWUuYWN0aXZlICYmIHZhbHVlLmdldENvbXBvbmVudChFbmVteSkuaHAgPiAwKS5tYXAodmFsdWUgPT4gdmFsdWUuZ2V0Q29tcG9uZW50KEVuZW15KSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWxsQWN0aXZlRW5lbXkoKTpBcnJheTxFbmVteT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5lbXlMYXllci5jaGlsZHJlbi5maWx0ZXIodmFsdWUgPT4gdmFsdWUuYWN0aXZlKS5tYXAodmFsdWUgPT4gdmFsdWUuZ2V0Q29tcG9uZW50KEVuZW15KSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRW5lbXkoaWQ6bnVtYmVyKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNyZWF0ZUVuZW15PT0+XCIsIGlkKTtcclxuICAgICAgICB0aGlzLmVuZW15Q291bnQrKztcclxuICAgICAgICAvL+e7keWumlxyXG4gICAgICAgIC8v6KeS6ImyOTAw6IyD5Zu05YaF6ZqP5py65Ye6546wXHJcbiAgICAgICAgbGV0IHgxID0gTWF0aC5tYXgoLXRoaXMuYmdOb2RlLnggLSBjYy52aXNpYmxlUmVjdC5jZW50ZXIueCwgLXRoaXMuYmdOb2RlLndpZHRoLzIpO1xyXG4gICAgICAgIGxldCB5MSA9IE1hdGgubWF4KC10aGlzLmJnTm9kZS55IC0gY2MudmlzaWJsZVJlY3QuY2VudGVyLnksIC10aGlzLmJnTm9kZS5oZWlnaHQvMik7XHJcbiAgICAgICAgbGV0IHcxID0gTWF0aC5taW4oY2MudmlzaWJsZVJlY3Qud2lkdGgsIHRoaXMuYmdOb2RlLndpZHRoLzIgLSB4MSk7XHJcbiAgICAgICAgbGV0IGgxID0gTWF0aC5taW4oY2MudmlzaWJsZVJlY3QuaGVpZ2h0LCB0aGlzLmJnTm9kZS5oZWlnaHQvMiAtIHkxKTtcclxuICAgICAgICBsZXQgc2NyZWVuUmVjdCA9IGNjLnJlY3QoeDEsIHkxLCB3MSwgaDEpO1xyXG4gICAgICAgIGxldCByYW5nZSA9IDIwMDtcclxuICAgICAgICBsZXQgeDIgPSBNYXRoLm1heCh4MSAtIHJhbmdlLCAtdGhpcy5iZ05vZGUud2lkdGgvMik7XHJcbiAgICAgICAgbGV0IHkyID0gTWF0aC5tYXgoeTEgLSByYW5nZSwgLXRoaXMuYmdOb2RlLmhlaWdodC8yKTtcclxuICAgICAgICBsZXQgdzIgPSBNYXRoLm1pbihjYy52aXNpYmxlUmVjdC53aWR0aCArIHJhbmdlKjIsIHRoaXMuYmdOb2RlLndpZHRoLzIgLSB4Mik7XHJcbiAgICAgICAgbGV0IGgyID0gTWF0aC5taW4oY2MudmlzaWJsZVJlY3QuaGVpZ2h0ICsgcmFuZ2UqMiwgdGhpcy5iZ05vZGUuaGVpZ2h0LzIgLSB5Mik7XHJcbiAgICAgICAgbGV0IHJhbmdlUmVjdCA9IGNjLnJlY3QoeDIsIHkyLCB3MiwgaDIpO1xyXG4gICAgICAgIGxldCBwYXJ0aXRpb25zID0gW3JhbmdlUmVjdF07XHJcbiAgICAgICAgU3BhY2VQYXJ0aXRpb24ucGFydGl0aW9uUmVjdChwYXJ0aXRpb25zLCBzY3JlZW5SZWN0LCAzMCwgMzApO1xyXG4gICAgICAgIC8vIGxldCBwYXJ0aXRpb25zID0gW2NjLnJlY3QoLXRoaXMuX2JnTm9kZS53aWR0aC8yLCAtdGhpcy5fYmdOb2RlLmhlaWdodC8yLCB0aGlzLl9iZ05vZGUud2lkdGgsIHRoaXMuX2JnTm9kZS5oZWlnaHQpXTtcclxuICAgICAgICAvLyB0aGlzLmFsbEFjdGl2ZUVuZW15KCkuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIFNwYWNlUGFydGl0aW9uLnBhcnRpdGlvblJlY3QocGFydGl0aW9ucywgdmFsdWUuZW5lbXlBQUJCLmFhYmIoKSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTcGFjZVBhcnRpdGlvbi5wYXJ0aXRpb25SZWN0KHBhcnRpdGlvbnMsIHRoaXMuX2dhbWVSb2xlQ29udHJvbGxlci5yb2xlLnJvbGVBQUJCLmFhYmIoKSk7XHJcbiAgICAgICAgbGV0IGVuZW15ID0gdGhpcy5nZXRJbmFjdGl2ZUVuZW15KGlkKTtcclxuICAgICAgICBsZXQgcmFkaXVzID0gZW5lbXkuZ2V0Q29tcG9uZW50KGNjLkNpcmNsZUNvbGxpZGVyKS5yYWRpdXM7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBTcGFjZVBhcnRpdGlvbi5yYW5kb21TcGFjZShwYXJ0aXRpb25zLCByYWRpdXMqMiwgcmFkaXVzKjIpO1xyXG5cclxuICAgICAgICBpZiAocmVjdCl7XHJcbiAgICAgICAgICAgIGVuZW15Lm5vZGUucG9zaXRpb24gPSByZWN0LmNlbnRlcjtcclxuICAgICAgICAgICAgZW5lbXkubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15TG9naWNMaXN0LnB1c2goZW5lbXkpO1xyXG4gICAgICAgICAgICB3aW5kb3dbJ0dhbWVDb2xsaXNpb25Db250cm9sbGVyJ10ubG9vc2VRdWFkVHJlZS5pbnNlcnQoZW5lbXkuZW5lbXlBQUJCKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInnqbrpl7TkuoYuLi5cIiwgcGFydGl0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2lsbEVuZW15KGVuZW15OkVuZW15KXtcclxuICAgICAgICB0aGlzLmVuZW15TG9naWNMaXN0LnNwbGljZSh0aGlzLmVuZW15TG9naWNMaXN0LmluZGV4T2YoZW5lbXkpLCAxKTtcclxuICAgICAgICB3aW5kb3dbJ0dhbWVDb2xsaXNpb25Db250cm9sbGVyJ10ubG9vc2VRdWFkVHJlZS5yZW1vdmUoZW5lbXkuZW5lbXlBQUJCKTtcclxuICAgICAgICB0aGlzLmVuZW15Q291bnQtLTtcclxuICAgIH1cclxuXHJcbiAgICBsYXRlVXBkYXRlKCl7XHJcbiAgICAgICAgaWYgKEdhbWVQcm94eS5wYXVzZUdhbWUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiDmr4/mrKHlpITnkIblm7rlrprmlbDph4/nmoTmlYzkurrpgLvovpEgKi9cclxuICAgICAgICBsZXQgcHJlTnVtID0gMDtcclxuICAgICAgICBmb3IgKGxldCBlbmVteSBvZiB0aGlzLmVuZW15TG9naWNMaXN0KXtcclxuICAgICAgICAgICAgaWYgKGVuZW15LmxvZ2ljRmxhZyl7XHJcbiAgICAgICAgICAgICAgICBwcmVOdW0rKztcclxuICAgICAgICAgICAgICAgIGVuZW15LmxvZ2ljRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuZW15TG9naWNMaXN0LnB1c2goLi4udGhpcy5lbmVteUxvZ2ljTGlzdC5zcGxpY2UoMCwgcHJlTnVtKSk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gTWF0aC5taW4oTUFYX0xPR0lDX0NPVU5ULCB0aGlzLmVuZW15TG9naWNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPGNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15TG9naWNMaXN0W2ldLmxvZ2ljRmxhZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==