"use strict";
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