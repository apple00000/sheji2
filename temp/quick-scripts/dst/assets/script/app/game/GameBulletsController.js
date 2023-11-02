
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameBulletsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9d40q9ABdCG5owk3OPy0zK', 'GameBulletsController');
// script/app/game/GameBulletsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletStrike_1 = require("../entities/bulletStrike/BulletStrike");
var Bullet_1 = require("../entities/bullet/Bullet");
var GameProxy_1 = require("./GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameBulletsController = /** @class */ (function (_super) {
    __extends(GameBulletsController, _super);
    function GameBulletsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletLayer = null;
        _this.bulletStrikeLayer = null;
        _this.enemyBulletLayer = null;
        _this._bulletMap = new Map();
        _this._bulletStrikeMap = new Map();
        _this._enemyBulletMap = new Map();
        _this._propBulletMap = new Map();
        _this.roleBullets = [];
        _this.enemyBullets = [];
        return _this;
    }
    GameBulletsController.prototype.genBullet = function (id) {
        var prefabPath = 'prefab/entities/bullet/bullet' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.bulletLayer.addChild(node);
        var bullet = node.getComponent(Bullet_1.default);
        bullet.init(id);
        var arr = this._bulletMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._bulletMap.set(id, arr);
        }
        arr.push(bullet);
        node.active = false;
        return bullet;
    };
    GameBulletsController.prototype.getInactiveBullet = function (id) {
        var result = undefined;
        var arr = this._bulletMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genBullet(id);
        }
        return result;
    };
    GameBulletsController.prototype.genBulletStrike = function (id) {
        var prefabPath = 'prefab/entities/bullet/bullet' + id + "Strike";
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.bulletStrikeLayer.addChild(node);
        var bulletStrike = node.getComponent(BulletStrike_1.default);
        bulletStrike.init(id);
        var arr = this._bulletStrikeMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._bulletStrikeMap.set(id, arr);
        }
        arr.push(bulletStrike);
        node.active = false;
        return bulletStrike;
    };
    GameBulletsController.prototype.getInactiveBulletStrike = function (id) {
        var result = undefined;
        var arr = this._bulletStrikeMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genBulletStrike(id);
        }
        return result;
    };
    GameBulletsController.prototype.genEnemyBullet = function (id) {
        var prefabPath = 'prefab/entities/bullet/enemyBullet' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.enemyBulletLayer.addChild(node);
        var bullet = node.getComponent(Bullet_1.default);
        bullet.init(id);
        var arr = this._enemyBulletMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._enemyBulletMap.set(id, arr);
        }
        arr.push(bullet);
        node.active = false;
        return bullet;
    };
    GameBulletsController.prototype.getInactiveEnemyBullet = function (id) {
        var result = undefined;
        var arr = this._enemyBulletMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genEnemyBullet(id);
        }
        return result;
    };
    GameBulletsController.prototype.genPropBullet = function (id) {
        var prefabPath = 'prefab/entities/bullet/propBullet' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.bulletLayer.addChild(node);
        var bullet = node.getComponent(Bullet_1.default);
        bullet.init(id);
        var arr = this._propBulletMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._propBulletMap.set(id, arr);
        }
        arr.push(bullet);
        node.active = false;
        return bullet;
    };
    GameBulletsController.prototype.getInactivePropBullet = function (id) {
        var result = undefined;
        var arr = this._propBulletMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genPropBullet(id);
        }
        return result;
    };
    GameBulletsController.prototype.onLoad = function () {
        this.node.on(GameProxy_1.GameProxy.Event.PropTrigger, this.onPropTrigger, this);
        window['GameBulletsController'] = this;
    };
    GameBulletsController.prototype.onDestroy = function () {
        this.node.off(GameProxy_1.GameProxy.Event.PropTrigger, this.onPropTrigger, this);
    };
    GameBulletsController.prototype.onPropTrigger = function (prop) {
        var _this = this;
        switch (prop.propID) {
            case 1:
                {
                    /** 两个方向 360度 一遍转圈 一遍开炮 */
                    var firingRange_1 = 500;
                    var speed = 1000;
                    var bulletDuration_1 = firingRange_1 / speed;
                    var duration = 2;
                    var num = 20;
                    var onceTime = duration / num;
                    var onceDegree_1 = 360 / num;
                    var startPos_1 = cc.v2(prop.node.x, prop.node.y);
                    var _loop_1 = function (i) {
                        this_1.node.runAction(cc.sequence(cc.delayTime(i * onceTime), cc.callFunc(function () {
                            /** 发射火炮 */
                            var bullet = _this.getInactivePropBullet(1);
                            bullet.node.active = true;
                            bullet.node.rotation = i * onceDegree_1;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-bullet.node.rotation)).normalizeSelf();
                            bullet.node.position = startPos_1.add(dir.mul(60));
                            bullet.node.runAction(cc.sequence(cc.moveBy(bulletDuration_1, dir.mul(firingRange_1)).easing(cc.easeSineOut()), cc.callFunc(function () {
                                bullet.node.active = false;
                            })));
                            var bullet2 = _this.getInactivePropBullet(1);
                            bullet2.node.active = true;
                            bullet2.node.rotation = i * onceDegree_1 + 180;
                            var dir2 = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-bullet2.node.rotation)).normalizeSelf();
                            bullet2.node.position = startPos_1.add(dir2.mul(60));
                            bullet2.node.runAction(cc.sequence(cc.moveBy(bulletDuration_1, dir2.mul(firingRange_1)).easing(cc.easeSineOut()), cc.callFunc(function () {
                                bullet2.node.active = false;
                            })));
                        })));
                    };
                    var this_1 = this;
                    for (var i = 0; i < num; i++) {
                        _loop_1(i);
                    }
                }
                break;
            case 2:
                {
                    /** 全方位炸弹：依次弹出6颗手雷（顺时针） 炸弹各个方向滚动 撞到怪物后爆炸 */
                    var num_1 = 6;
                    var onceDegree_2 = 360 / 6;
                    var onceTime_1 = 0.05;
                    var moveLen_1 = 100;
                    var moveSpeed = 1000;
                    var moveDuration_1 = moveLen_1 / moveSpeed;
                    var startPos_2 = cc.v2(prop.node.x, prop.node.y);
                    var _loop_2 = function (i) {
                        this_2.node.runAction(cc.sequence(cc.delayTime(i * onceTime_1), cc.callFunc(function () {
                            var bullet = _this.getInactivePropBullet(2);
                            bullet.node.active = true;
                            var degree = 30 + i * onceDegree_2;
                            bullet.node.rotation = degree - 90;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-degree)).normalizeSelf();
                            bullet.node.position = startPos_2;
                            bullet.node.scale = 0;
                            bullet.node.runAction(cc.scaleTo(moveDuration_1, 1));
                            bullet.node.runAction(cc.sequence(cc.moveBy(moveDuration_1, dir.mul(moveLen_1)), cc.delayTime((num_1 - i - 1) * onceTime_1), cc.callFunc(function () {
                                bullet.move(dir);
                            })));
                        })));
                    };
                    var this_2 = this;
                    for (var i = 0; i < num_1; i++) {
                        _loop_2(i);
                    }
                }
                break;
            case 3:
                {
                    /** 发出12个地雷 怪物踩到就会爆炸 地雷持续20S */
                    var num = 6;
                    var onceDegree_3 = 360 / 6;
                    var onceTime = 0.05;
                    var moveLen_2 = 80;
                    var moveSpeed = 1000;
                    var moveDuration_2 = moveLen_2 / moveSpeed;
                    var time_1 = 20;
                    var startPos_3 = cc.v2(prop.node.x, prop.node.y);
                    var _loop_3 = function (i) {
                        this_3.node.runAction(cc.sequence(cc.delayTime(i * onceTime), cc.callFunc(function () {
                            var bullet = _this.getInactivePropBullet(3);
                            bullet.node.active = true;
                            var degree = 30 + i * onceDegree_3;
                            bullet.node.rotation = degree - 90;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-degree)).normalizeSelf();
                            bullet.node.position = startPos_3;
                            bullet.node.scale = 0;
                            bullet.node.runAction(cc.scaleTo(moveDuration_2, 1));
                            bullet.collider.enabled = false;
                            bullet.node.runAction(cc.sequence(cc.moveBy(moveDuration_2, dir.mul(moveLen_2)), cc.callFunc(function () {
                                bullet.collider.enabled = true;
                                bullet.node.runAction(cc.sequence(cc.delayTime(time_1), cc.callFunc(function () {
                                    bullet.node.active = false;
                                })));
                            })));
                        })));
                    };
                    var this_3 = this;
                    for (var i = 0; i < num; i++) {
                        _loop_3(i);
                    }
                    var _loop_4 = function (i) {
                        this_4.node.runAction(cc.sequence(cc.delayTime((i + num) * onceTime), cc.callFunc(function () {
                            var bullet = _this.getInactivePropBullet(3);
                            bullet.node.active = true;
                            var degree = 60 + i * onceDegree_3;
                            bullet.node.rotation = degree - 90;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-degree)).normalizeSelf();
                            bullet.node.position = startPos_3;
                            bullet.node.scale = 0;
                            bullet.node.runAction(cc.scaleTo(moveDuration_2, 1));
                            bullet.collider.enabled = false;
                            bullet.node.runAction(cc.sequence(cc.moveBy(moveDuration_2, dir.mul(moveLen_2 + 60)), cc.callFunc(function () {
                                bullet.collider.enabled = true;
                                bullet.node.runAction(cc.sequence(cc.delayTime(time_1), cc.callFunc(function () {
                                    bullet.node.active = false;
                                })));
                            })));
                        })));
                    };
                    var this_4 = this;
                    for (var i = 0; i < num; i++) {
                        _loop_4(i);
                    }
                }
                break;
            case 4:
                {
                    /** 播放见光死的动画 */
                    var bullet = this.getInactivePropBullet(4);
                    bullet.node.position = prop.node.position;
                    bullet.node.active = true;
                    bullet.execute();
                }
                break;
            case 6:
                {
                    /** 找最近的怪生成闪电 */
                    var list = window['GameEnemysController'].allAliveAndInScreenEnemy();
                    // console.log("list===>", list);
                    if (list.length > 0) {
                        var minDistance_1 = -1;
                        var enemy_1 = null;
                        list.forEach(function (value) {
                            var distance = prop.node.position.sub(value.node.position).mag();
                            if (minDistance_1 < 0 || distance < minDistance_1) {
                                minDistance_1 = distance;
                                enemy_1 = value;
                            }
                        });
                        /** 生成闪电 */
                        var bullet = this.getInactivePropBullet(6);
                        bullet.node.position = prop.node.position;
                        bullet.joint(enemy_1.node.position);
                    }
                }
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], GameBulletsController.prototype, "bulletLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameBulletsController.prototype, "bulletStrikeLayer", void 0);
    __decorate([
        property(cc.Node)
    ], GameBulletsController.prototype, "enemyBulletLayer", void 0);
    GameBulletsController = __decorate([
        ccclass
    ], GameBulletsController);
    return GameBulletsController;
}(cc.Component));
exports.default = GameBulletsController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUJ1bGxldHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRUFBaUU7QUFDakUsb0RBQStDO0FBQy9DLHlDQUFzQztBQU1oQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQTRTQztRQXpTRyxpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQix1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsc0JBQWdCLEdBQVcsSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFFOUMsc0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7UUFFMUQscUJBQWUsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUNuRCxvQkFBYyxHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBRTFELGlCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUMvQixrQkFBWSxHQUFpQixFQUFFLENBQUM7O0lBeVJwQyxDQUFDO0lBdFJXLHlDQUFTLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsSUFBSSxVQUFVLEdBQUcsK0JBQStCLEdBQUMsRUFBRSxDQUFDO1FBQ3BELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMs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Q0FBQyxLQUFLLENBQUMsT0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQXZTRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0VBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttRUFDYztJQVRmLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBNFN6QztJQUFELDRCQUFDO0NBNVNELEFBNFNDLENBNVNrRCxFQUFFLENBQUMsU0FBUyxHQTRTOUQ7a0JBNVNvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldFN0cmlrZSBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0U3RyaWtlL0J1bGxldFN0cmlrZVwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXQvQnVsbGV0XCI7XHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi9HYW1lUHJveHlcIjtcclxuaW1wb3J0IFByb3BCYXNlIGZyb20gXCIuLi9lbnRpdGllcy9wcm9wL1Byb3BCYXNlXCI7XHJcbmltcG9ydCBCdWxsZXRPZlNob3VMZWkgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZlNob3VMZWlcIjtcclxuaW1wb3J0IEJ1bGxldE9mSmlhbkd1YW5nU2kgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkppYW5HdWFuZ1NpXCI7XHJcbmltcG9ydCBCdWxsZXRPZkxpZ2h0aW5nIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXQvQnVsbGV0T2ZMaWdodGluZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQnVsbGV0c0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnVsbGV0TGF5ZXI6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidWxsZXRTdHJpa2VMYXllcjpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGVuZW15QnVsbGV0TGF5ZXI6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVsbGV0TWFwID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PEJ1bGxldD4+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVsbGV0U3RyaWtlTWFwID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PEJ1bGxldFN0cmlrZT4+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5lbXlCdWxsZXRNYXAgPSBuZXcgTWFwPG51bWJlciwgQXJyYXk8QnVsbGV0Pj4oKTtcclxuICAgIHByaXZhdGUgX3Byb3BCdWxsZXRNYXAgPSBuZXcgTWFwPG51bWJlciwgQXJyYXk8QnVsbGV0Pj4oKTtcclxuXHJcbiAgICByb2xlQnVsbGV0czpBcnJheTxCdWxsZXQ+ID0gW107XHJcbiAgICBlbmVteUJ1bGxldHM6QXJyYXk8QnVsbGV0PiA9IFtdO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGdlbkJ1bGxldChpZDpudW1iZXIpOkJ1bGxldHtcclxuICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldCcraWQ7XHJcbiAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGVudGl0eVByZWZhYik7XHJcbiAgICAgICAgdGhpcy5idWxsZXRMYXllci5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gPEJ1bGxldD5ub2RlLmdldENvbXBvbmVudChCdWxsZXQpO1xyXG4gICAgICAgIGJ1bGxldC5pbml0KGlkKTtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fYnVsbGV0TWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRNYXAuc2V0KGlkLCBhcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIucHVzaChidWxsZXQpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmFjdGl2ZUJ1bGxldChpZDpudW1iZXIpOkJ1bGxldHtcclxuICAgICAgICBsZXQgcmVzdWx0OkJ1bGxldCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fYnVsbGV0TWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgIT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhcnIuZmluZCh2YWx1ZSA9PiB2YWx1ZS5ub2RlLmFjdGl2ZSA9PSBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmdlbkJ1bGxldChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2VuQnVsbGV0U3RyaWtlKGlkOm51bWJlcik6QnVsbGV0U3RyaWtle1xyXG4gICAgICAgIGxldCBwcmVmYWJQYXRoID0gJ3ByZWZhYi9lbnRpdGllcy9idWxsZXQvYnVsbGV0JytpZCArIFwiU3RyaWtlXCI7XHJcbiAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGVudGl0eVByZWZhYik7XHJcbiAgICAgICAgdGhpcy5idWxsZXRTdHJpa2VMYXllci5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBsZXQgYnVsbGV0U3RyaWtlID0gPEJ1bGxldFN0cmlrZT5ub2RlLmdldENvbXBvbmVudChCdWxsZXRTdHJpa2UpO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5pbml0KGlkKTtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fYnVsbGV0U3RyaWtlTWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRTdHJpa2VNYXAuc2V0KGlkLCBhcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIucHVzaChidWxsZXRTdHJpa2UpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldFN0cmlrZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmFjdGl2ZUJ1bGxldFN0cmlrZShpZDpudW1iZXIpOkJ1bGxldFN0cmlrZXtcclxuICAgICAgICBsZXQgcmVzdWx0OkJ1bGxldFN0cmlrZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5fYnVsbGV0U3RyaWtlTWFwLmdldChpZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgIT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhcnIuZmluZCh2YWx1ZSA9PiB2YWx1ZS5ub2RlLmFjdGl2ZSA9PSBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmdlbkJ1bGxldFN0cmlrZShpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2VuRW5lbXlCdWxsZXQoaWQ6bnVtYmVyKTpCdWxsZXR7XHJcbiAgICAgICAgbGV0IHByZWZhYlBhdGggPSAncHJlZmFiL2VudGl0aWVzL2J1bGxldC9lbmVteUJ1bGxldCcraWQ7XHJcbiAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGVudGl0eVByZWZhYik7XHJcbiAgICAgICAgdGhpcy5lbmVteUJ1bGxldExheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGxldCBidWxsZXQgPSA8QnVsbGV0Pm5vZGUuZ2V0Q29tcG9uZW50KEJ1bGxldCk7XHJcbiAgICAgICAgYnVsbGV0LmluaXQoaWQpO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLl9lbmVteUJ1bGxldE1hcC5nZXQoaWQpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJyID09IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBhcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fZW5lbXlCdWxsZXRNYXAuc2V0KGlkLCBhcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIucHVzaChidWxsZXQpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmFjdGl2ZUVuZW15QnVsbGV0KGlkOm51bWJlcik6QnVsbGV0e1xyXG4gICAgICAgIGxldCByZXN1bHQ6QnVsbGV0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLl9lbmVteUJ1bGxldE1hcC5nZXQoaWQpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJyICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYXJyLmZpbmQodmFsdWUgPT4gdmFsdWUubm9kZS5hY3RpdmUgPT0gZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZW5FbmVteUJ1bGxldChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2VuUHJvcEJ1bGxldChpZDpudW1iZXIpOkJ1bGxldHtcclxuICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvYnVsbGV0L3Byb3BCdWxsZXQnK2lkO1xyXG4gICAgICAgIGxldCBlbnRpdHlQcmVmYWIgPSBjYy5sb2FkZXIuZ2V0UmVzKHByZWZhYlBhdGgsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShlbnRpdHlQcmVmYWIpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0TGF5ZXIuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IDxCdWxsZXQ+bm9kZS5nZXRDb21wb25lbnQoQnVsbGV0KTtcclxuICAgICAgICBidWxsZXQuaW5pdChpZCk7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuX3Byb3BCdWxsZXRNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyciA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgYXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3BCdWxsZXRNYXAuc2V0KGlkLCBhcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIucHVzaChidWxsZXQpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGJ1bGxldDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbmFjdGl2ZVByb3BCdWxsZXQoaWQ6bnVtYmVyKTpCdWxsZXR7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpCdWxsZXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuX3Byb3BCdWxsZXRNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyciAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyci5maW5kKHZhbHVlID0+IHZhbHVlLm5vZGUuYWN0aXZlID09IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2VuUHJvcEJ1bGxldChpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5Qcm9wVHJpZ2dlciwgdGhpcy5vblByb3BUcmlnZ2VyLCB0aGlzKTtcclxuICAgICAgICB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKEdhbWVQcm94eS5FdmVudC5Qcm9wVHJpZ2dlciwgdGhpcy5vblByb3BUcmlnZ2VyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblByb3BUcmlnZ2VyKHByb3A6UHJvcEJhc2Upe1xyXG4gICAgICAgIHN3aXRjaCAocHJvcC5wcm9wSUQpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIOS4pOS4quaWueWQkSAzNjDluqYg5LiA6YGN6L2s5ZyIIOS4gOmBjeW8gOeCriAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJpbmdSYW5nZSA9IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BlZWQgPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXREdXJhdGlvbiA9IGZpcmluZ1JhbmdlL3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbmNlVGltZSA9IGR1cmF0aW9uL251bTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb25jZURlZ3JlZSA9IDM2MC9udW07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2MudjIocHJvcC5ub2RlLngsIHByb3Aubm9kZS55KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxudW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKGkqb25jZVRpbWUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIOWPkeWwhOeBq+eCriAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuZ2V0SW5hY3RpdmVQcm9wQnVsbGV0KDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnJvdGF0aW9uID0gaSAqIG9uY2VEZWdyZWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMSkucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLWJ1bGxldC5ub2RlLnJvdGF0aW9uKSkubm9ybWFsaXplU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydFBvcy5hZGQoZGlyLm11bCg2MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShidWxsZXREdXJhdGlvbiwgZGlyLm11bChmaXJpbmdSYW5nZSkpLmVhc2luZyhjYy5lYXNlU2luZU91dCgpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldDIgPSB0aGlzLmdldEluYWN0aXZlUHJvcEJ1bGxldCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldDIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Mi5ub2RlLnJvdGF0aW9uID0gaSAqIG9uY2VEZWdyZWUgKyAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyMiA9IGNjLnYyKDAsIDEpLnJvdGF0ZVNlbGYoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC1idWxsZXQyLm5vZGUucm90YXRpb24pKS5ub3JtYWxpemVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQyLm5vZGUucG9zaXRpb24gPSBzdGFydFBvcy5hZGQoZGlyMi5tdWwoNjApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldDIubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KGJ1bGxldER1cmF0aW9uLCBkaXIyLm11bChmaXJpbmdSYW5nZSkpLmVhc2luZyhjYy5lYXNlU2luZU91dCgpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIOWFqOaWueS9jeeCuOW8ue+8muS+neasoeW8ueWHujbpopfmiYvpm7fvvIjpobrml7bpkojvvIkg54K45by55ZCE5Liq5pa55ZCR5rua5YqoIOaSnuWIsOaAqueJqeWQjueIhueCuCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbmNlRGVncmVlID0gMzYwLzY7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uY2VUaW1lID0gMC4wNTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZUxlbiA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZVNwZWVkID0gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZUR1cmF0aW9uID0gbW92ZUxlbi9tb3ZlU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2MudjIocHJvcC5ub2RlLngsIHByb3Aubm9kZS55KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShpKm9uY2VUaW1lKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXQgPSB0aGlzLmdldEluYWN0aXZlUHJvcEJ1bGxldCgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gMzArIGkgKiBvbmNlRGVncmVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucm90YXRpb24gPSBkZWdyZWUgLSA5MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXIgPSBjYy52MigwLCAxKS5yb3RhdGVTZWxmKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtZGVncmVlKSkubm9ybWFsaXplU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKG1vdmVEdXJhdGlvbiwgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShtb3ZlRHVyYXRpb24sIGRpci5tdWwobW92ZUxlbikpLCBjYy5kZWxheVRpbWUoKG51bS1pLTEpKm9uY2VUaW1lKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEJ1bGxldE9mU2hvdUxlaT5idWxsZXQpLm1vdmUoZGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiog5Y+R5Ye6MTLkuKrlnLDpm7cg5oCq54mp6Lip5Yiw5bCx5Lya54iG54K4IOWcsOmbt+aMgee7rTIwUyAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbmNlRGVncmVlID0gMzYwLzY7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9uY2VUaW1lID0gMC4wNTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZUxlbiA9IDgwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlU3BlZWQgPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlRHVyYXRpb24gPSBtb3ZlTGVuL21vdmVTcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZSA9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGNjLnYyKHByb3Aubm9kZS54LCBwcm9wLm5vZGUueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoaSpvbmNlVGltZSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nZXRJbmFjdGl2ZVByb3BCdWxsZXQoMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZ3JlZSA9IDMwKyBpICogb25jZURlZ3JlZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnJvdGF0aW9uID0gZGVncmVlIC0gOTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMSkucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLWRlZ3JlZSkpLm5vcm1hbGl6ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gc3RhcnRQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbyhtb3ZlRHVyYXRpb24sIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5jb2xsaWRlci5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KG1vdmVEdXJhdGlvbiwgZGlyLm11bChtb3ZlTGVuKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUodGltZSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoKGkrbnVtKSpvbmNlVGltZSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5nZXRJbmFjdGl2ZVByb3BCdWxsZXQoMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZ3JlZSA9IDYwICsgaSAqIG9uY2VEZWdyZWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5yb3RhdGlvbiA9IGRlZ3JlZSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKDAsIDEpLnJvdGF0ZVNlbGYoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC1kZWdyZWUpKS5ub3JtYWxpemVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5wb3NpdGlvbiA9IHN0YXJ0UG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNjYWxlVG8obW92ZUR1cmF0aW9uLCAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQuY29sbGlkZXIuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShtb3ZlRHVyYXRpb24sIGRpci5tdWwobW92ZUxlbis2MCkpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5jb2xsaWRlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKHRpbWUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKiDmkq3mlL7op4HlhYnmrbvnmoTliqjnlLsgKi9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0ID0gPEJ1bGxldE9mSmlhbkd1YW5nU2k+dGhpcy5nZXRJbmFjdGl2ZVByb3BCdWxsZXQoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBwcm9wLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiog5om+5pyA6L+R55qE5oCq55Sf5oiQ6Zeq55S1ICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB3aW5kb3dbJ0dhbWVFbmVteXNDb250cm9sbGVyJ10uYWxsQWxpdmVBbmRJblNjcmVlbkVuZW15KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJsaXN0PT09PlwiLCBsaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwcm9wLm5vZGUucG9zaXRpb24uc3ViKHZhbHVlLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbkRpc3RhbmNlIDwgMCB8fCBkaXN0YW5jZSA8IG1pbkRpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiog55Sf5oiQ6Zeq55S1ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWxsZXQgPSA8QnVsbGV0T2ZMaWdodGluZz50aGlzLmdldEluYWN0aXZlUHJvcEJ1bGxldCg2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBwcm9wLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5qb2ludChlbmVteS5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==