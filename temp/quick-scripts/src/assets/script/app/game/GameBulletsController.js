"use strict";
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