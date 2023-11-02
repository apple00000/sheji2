"use strict";
cc._RF.push(module, 'ade4a+D8vBFtrWGh6gZ6Ugw', 'GameCollisionController');
// script/app/game/GameCollisionController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LooseQuadTree_1 = require("../../quad-tree/LooseQuadTree");
var GameProxy_1 = require("./GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var math = cc.math;
var _vec2 = cc.v2();
function obbApplyMatrix(rect, mat4, out_bl, out_tl, out_tr, out_br) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;
    var m00 = mat4.m0, m01 = mat4.m1, m04 = mat4.m4, m05 = mat4.m5;
    var m12 = mat4.m12, m13 = mat4.m13;
    var tx = m00 * x + m04 * y + m12;
    var ty = m01 * x + m05 * y + m13;
    var xa = m00 * width;
    var xb = m01 * width;
    var yc = m04 * height;
    var yd = m05 * height;
    out_tl.x = tx;
    out_tl.y = ty;
    out_tr.x = xa + tx;
    out_tr.y = xb + ty;
    out_bl.x = yc + tx;
    out_bl.y = yd + ty;
    out_br.x = xa + yc + tx;
    out_br.y = xb + yd + ty;
}
;
var GameCollisionController = /** @class */ (function (_super) {
    __extends(GameCollisionController, _super);
    function GameCollisionController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyBulletLayer = null;
        _this.looseQuadTree = null;
        _this._updateColliders = [];
        return _this;
    }
    GameCollisionController_1 = GameCollisionController;
    GameCollisionController.prototype.onLoad = function () {
        window['GameCollisionController'] = this;
    };
    GameCollisionController.updateCollider = function (collider) {
        var offset = collider.offset;
        var world = collider.world;
        var aabb = world.aabb;
        var m = world.matrix;
        collider.node.getLocalMatrix(m);
        var preAabb = world.preAabb;
        preAabb.x = aabb.x;
        preAabb.y = aabb.y;
        preAabb.width = aabb.width;
        preAabb.height = aabb.height;
        if (collider instanceof cc.BoxCollider) {
            var size = collider.size;
            aabb.x = offset.x - size.width / 2;
            aabb.y = offset.y - size.height / 2;
            aabb.width = size.width;
            aabb.height = size.height;
            var wps = world.points;
            var wp0 = wps[0], wp1 = wps[1], wp2 = wps[2], wp3 = wps[3];
            obbApplyMatrix(aabb, m, wp0, wp1, wp2, wp3);
            var minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
            var miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
            var maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
            var maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);
            aabb.x = minx;
            aabb.y = miny;
            aabb.width = maxx - minx;
            aabb.height = maxy - miny;
        }
        else if (collider instanceof cc.CircleCollider) {
            // calculate world position
            math.Vec2.transformMat4(_vec2, collider.offset, m);
            world.position.x = _vec2.x;
            world.position.y = _vec2.y;
            // calculate world radius
            var tempx = m.m12, tempy = m.m13;
            m.m12 = m.m13 = 0;
            _vec2.x = collider.radius;
            _vec2.y = 0;
            math.Vec2.transformMat4(_vec2, _vec2, m);
            var d = Math.sqrt(_vec2.x * _vec2.x + _vec2.y * _vec2.y);
            world.radius = d;
            aabb.x = world.position.x - d;
            aabb.y = world.position.y - d;
            aabb.width = d * 2;
            aabb.height = d * 2;
            m.m12 = tempx;
            m.m13 = tempy;
        }
        else if (collider instanceof cc.PolygonCollider) {
            var points = collider.points;
            var worldPoints = world.points;
            worldPoints.length = points.length;
            var minx = 1e6, miny = 1e6, maxx = -1e6, maxy = -1e6;
            for (var i = 0, l = points.length; i < l; i++) {
                if (!worldPoints[i]) {
                    worldPoints[i] = cc.v2();
                }
                _vec2.x = points[i].x + offset.x;
                _vec2.y = points[i].y + offset.y;
                math.Vec2.transformMat4(_vec2, _vec2, m);
                var x = _vec2.x;
                var y = _vec2.y;
                worldPoints[i].x = x;
                worldPoints[i].y = y;
                if (x > maxx)
                    maxx = x;
                if (x < minx)
                    minx = x;
                if (y > maxy)
                    maxy = y;
                if (y < miny)
                    miny = y;
            }
            aabb.x = minx;
            aabb.y = miny;
            aabb.width = maxx - minx;
            aabb.height = maxy - miny;
        }
    };
    GameCollisionController.prototype.update = function (dt) {
        if (GameProxy_1.GameProxy.pauseGame)
            return;
        this.looseQuadTree.updateAll();
        this._updateColliders.forEach(function (value) { return value.bUpdateCollider = false; });
        this._updateColliders.length = 0;
        var gameBulletsController = window['GameBulletsController'];
        /** 与敌人的碰撞 */
        /** 子弹和其他爆炸物 */
        var enemyContacts = gameBulletsController.roleBullets;
        for (var _i = 0, enemyContacts_1 = enemyContacts; _i < enemyContacts_1.length; _i++) {
            var enemyContact = enemyContacts_1[_i];
            if (enemyContact.collider.enabled) {
                GameCollisionController_1.updateCollider(enemyContact.collider);
                /** 获取可能发生碰撞的敌人 */
                var arr = [];
                this.looseQuadTree.retrieve(enemyContact.collider.world.aabb, arr);
                for (var _a = 0, arr_1 = arr; _a < arr_1.length; _a++) {
                    var aabbRegion = arr_1[_a];
                    var enemy = aabbRegion.enemy;
                    if (!aabbRegion.bUpdateCollider) {
                        GameCollisionController_1.updateCollider(enemy.spaceCircleCollider);
                        GameCollisionController_1.updateCollider(enemy.defenceBoxCollider);
                        aabbRegion.bUpdateCollider = true;
                        this._updateColliders.push(aabbRegion);
                    }
                    var bContact = false;
                    if (enemyContact.collider instanceof cc.CircleCollider) {
                        bContact = cc.Intersection.polygonCircle(enemy.defenceBoxCollider.world.points, enemyContact.collider.world);
                    }
                    else {
                        bContact = cc.Intersection.polygonPolygon(enemy.defenceBoxCollider.world.points, enemyContact.collider.world.points);
                    }
                    if (bContact) {
                        // console.log("========>产生了碰撞..");
                        if (!enemyContact.contacts.includes(enemy)) {
                            // console.log("=======>onCollisionEnter");
                            enemyContact.contacts.push(enemy);
                            enemyContact.onCollisionEnter(enemy.defenceBoxCollider, enemyContact.collider);
                            if (!enemyContact.bThrought)
                                break;
                        }
                        else {
                            // console.log("========>onCollisionStay");
                            enemyContact.onCollisionStay(enemy.defenceBoxCollider, enemyContact.collider);
                        }
                    }
                    else {
                        var index = enemyContact.contacts.indexOf(enemy);
                        if (index >= 0) {
                            enemyContact.contacts.splice(index, 1);
                            enemyContact.onCollisionExit(enemy.defenceBoxCollider, enemyContact.collider);
                        }
                    }
                }
            }
        }
        var gameRoleController = window['GameRoleController'];
        /** 与角色的碰撞 */
        var bRoleUpdateCollider = false;
        /** 敌人的子弹 */
        gameBulletsController.enemyBullets.forEach(function (bullet) {
            /** 先过滤掉一些比较远的 */
            if (bullet.node.position.sub(gameRoleController.role.node.position).mag() < Math.max(bullet.node.width, bullet.node.height) + gameRoleController.role.spaceCircleCollider.radius) {
                /** 精密判断 */
                GameCollisionController_1.updateCollider(bullet.collider);
                if (!bRoleUpdateCollider) {
                    GameCollisionController_1.updateCollider(gameRoleController.role.spaceCircleCollider);
                }
                /** 判断圆形与多边形的碰撞 */
                var bContact = false;
                if (bullet.collider instanceof cc.CircleCollider) {
                    bContact = cc.Intersection.circleCircle(bullet.collider.world, gameRoleController.role.spaceCircleCollider.world);
                }
                else {
                    bContact = cc.Intersection.polygonCircle(bullet.collider.world.points, gameRoleController.role.spaceCircleCollider.world);
                }
                if (bContact) {
                    // console.log("========>产生了碰撞..");
                    if (!bullet.contacts.includes(gameRoleController.role)) {
                        // console.log("=======>onCollisionEnter");
                        bullet.contacts.push(gameRoleController.role);
                        bullet.onCollisionEnter(gameRoleController.role.spaceCircleCollider, bullet.collider);
                    }
                    else {
                        // console.log("========>onCollisionStay");
                        bullet.onCollisionStay(gameRoleController.role.spaceCircleCollider, bullet.collider);
                    }
                }
                else {
                    var index = bullet.contacts.indexOf(gameRoleController.role);
                    if (index >= 0) {
                        bullet.contacts.splice(index, 1);
                        bullet.onCollisionExit(gameRoleController.role.spaceCircleCollider, bullet.collider);
                    }
                }
            }
        });
        /** 道具 */
        window['GameEnemysController'].gameProps.forEach(function (prop) {
            if (!prop.on_off) {
                var distance = prop.node.position.sub(gameRoleController.role.node.position).mag();
                if (GameProxy_1.GameProxy.magnetic && !prop.magnetic) {
                    if (distance < 100) {
                        prop.magnetic = true;
                    }
                }
                if (distance < Math.max(prop.node.width, prop.node.height) + gameRoleController.role.spaceCircleCollider.radius) {
                    /** 精密判断 */
                    GameCollisionController_1.updateCollider(prop.collider);
                    if (!bRoleUpdateCollider) {
                        GameCollisionController_1.updateCollider(gameRoleController.role.spaceCircleCollider);
                    }
                    /** 判断圆形与多边形的碰撞 */
                    var bContact = false;
                    if (prop.collider instanceof cc.CircleCollider) {
                        bContact = cc.Intersection.circleCircle(prop.collider.world, gameRoleController.role.spaceCircleCollider.world);
                    }
                    else {
                        bContact = cc.Intersection.polygonCircle(prop.collider.world.points, gameRoleController.role.spaceCircleCollider.world);
                    }
                    if (bContact) {
                        // console.log("========>产生了碰撞..");
                        prop.trigger();
                    }
                }
            }
        });
    };
    var GameCollisionController_1;
    __decorate([
        property(cc.Node)
    ], GameCollisionController.prototype, "enemyBulletLayer", void 0);
    __decorate([
        property(LooseQuadTree_1.default)
    ], GameCollisionController.prototype, "looseQuadTree", void 0);
    GameCollisionController = GameCollisionController_1 = __decorate([
        ccclass
    ], GameCollisionController);
    return GameCollisionController;
}(cc.Component));
exports.default = GameCollisionController;

cc._RF.pop();