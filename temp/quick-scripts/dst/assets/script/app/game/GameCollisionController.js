
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameCollisionController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUNvbGxpc2lvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLCtEQUEwRDtBQUcxRCx5Q0FBc0M7QUFJaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUVyQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFcEIsU0FBUyxjQUFjLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO0lBQy9ELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRXpCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDL0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUVuQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDakMsSUFBSSxFQUFFLEdBQUcs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Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCBMb29zZVF1YWRUcmVlIGZyb20gXCIuLi8uLi9xdWFkLXRyZWUvTG9vc2VRdWFkVHJlZVwiO1xyXG5pbXBvcnQgQUFCQlJlZ2lvbiBmcm9tIFwiLi4vLi4vcXVhZC10cmVlL0FBQkJSZWdpb25cIjtcclxuaW1wb3J0IEVuZW15QUFCQiBmcm9tIFwiLi4vZW50aXRpZXMvZW5lbXkvRW5lbXlBQUJCXCI7XHJcbmltcG9ydCB7R2FtZVByb3h5fSBmcm9tIFwiLi9HYW1lUHJveHlcIjtcclxuaW1wb3J0IEJ1bGxldE9mRW5lbXkgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkVuZW15XCI7XHJcbmltcG9ydCBQcm9wQmFzZSBmcm9tIFwiLi4vZW50aXRpZXMvcHJvcC9Qcm9wQmFzZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBtYXRoID0gY2MubWF0aDtcclxuXHJcbmxldCBfdmVjMiA9IGNjLnYyKCk7XHJcblxyXG5mdW5jdGlvbiBvYmJBcHBseU1hdHJpeCAocmVjdCwgbWF0NCwgb3V0X2JsLCBvdXRfdGwsIG91dF90ciwgb3V0X2JyKSB7XHJcbiAgICB2YXIgeCA9IHJlY3QueDtcclxuICAgIHZhciB5ID0gcmVjdC55O1xyXG4gICAgdmFyIHdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSByZWN0LmhlaWdodDtcclxuXHJcbiAgICB2YXIgbTAwID0gbWF0NC5tMCwgbTAxID0gbWF0NC5tMSwgbTA0ID0gbWF0NC5tNCwgbTA1ID0gbWF0NC5tNTtcclxuICAgIHZhciBtMTIgPSBtYXQ0Lm0xMiwgbTEzID0gbWF0NC5tMTM7XHJcblxyXG4gICAgdmFyIHR4ID0gbTAwICogeCArIG0wNCAqIHkgKyBtMTI7XHJcbiAgICB2YXIgdHkgPSBtMDEgKiB4ICsgbTA1ICogeSArIG0xMztcclxuICAgIHZhciB4YSA9IG0wMCAqIHdpZHRoO1xyXG4gICAgdmFyIHhiID0gbTAxICogd2lkdGg7XHJcbiAgICB2YXIgeWMgPSBtMDQgKiBoZWlnaHQ7XHJcbiAgICB2YXIgeWQgPSBtMDUgKiBoZWlnaHQ7XHJcblxyXG4gICAgb3V0X3RsLnggPSB0eDtcclxuICAgIG91dF90bC55ID0gdHk7XHJcbiAgICBvdXRfdHIueCA9IHhhICsgdHg7XHJcbiAgICBvdXRfdHIueSA9IHhiICsgdHk7XHJcbiAgICBvdXRfYmwueCA9IHljICsgdHg7XHJcbiAgICBvdXRfYmwueSA9IHlkICsgdHk7XHJcbiAgICBvdXRfYnIueCA9IHhhICsgeWMgKyB0eDtcclxuICAgIG91dF9ici55ID0geGIgKyB5ZCArIHR5O1xyXG59O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbGxpc2lvbkNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlbmVteUJ1bGxldExheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMb29zZVF1YWRUcmVlKVxyXG4gICAgbG9vc2VRdWFkVHJlZTpMb29zZVF1YWRUcmVlID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUNvbGxpc2lvbkNvbnRyb2xsZXInXSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVwZGF0ZUNvbGxpZGVyIChjb2xsaWRlcikge1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSBjb2xsaWRlci5vZmZzZXQ7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gY29sbGlkZXIud29ybGQ7XHJcbiAgICAgICAgbGV0IGFhYmIgPSB3b3JsZC5hYWJiO1xyXG5cclxuICAgICAgICBsZXQgbSA9IHdvcmxkLm1hdHJpeDtcclxuICAgICAgICBjb2xsaWRlci5ub2RlLmdldExvY2FsTWF0cml4KG0pO1xyXG5cclxuICAgICAgICBsZXQgcHJlQWFiYiA9IHdvcmxkLnByZUFhYmI7XHJcbiAgICAgICAgcHJlQWFiYi54ID0gYWFiYi54O1xyXG4gICAgICAgIHByZUFhYmIueSA9IGFhYmIueTtcclxuICAgICAgICBwcmVBYWJiLndpZHRoID0gYWFiYi53aWR0aDtcclxuICAgICAgICBwcmVBYWJiLmhlaWdodCA9IGFhYmIuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBjYy5Cb3hDb2xsaWRlcikge1xyXG4gICAgICAgICAgICBsZXQgc2l6ZSA9IGNvbGxpZGVyLnNpemU7XHJcblxyXG4gICAgICAgICAgICBhYWJiLnggPSBvZmZzZXQueCAtIHNpemUud2lkdGgvMjtcclxuICAgICAgICAgICAgYWFiYi55ID0gb2Zmc2V0LnkgLSBzaXplLmhlaWdodC8yO1xyXG4gICAgICAgICAgICBhYWJiLndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgYWFiYi5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGxldCB3cHMgPSB3b3JsZC5wb2ludHM7XHJcbiAgICAgICAgICAgIGxldCB3cDAgPSB3cHNbMF0sIHdwMSA9IHdwc1sxXSxcclxuICAgICAgICAgICAgICAgIHdwMiA9IHdwc1syXSwgd3AzID0gd3BzWzNdO1xyXG4gICAgICAgICAgICBvYmJBcHBseU1hdHJpeChhYWJiLCBtLCB3cDAsIHdwMSwgd3AyLCB3cDMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1pbnggPSBNYXRoLm1pbih3cDAueCwgd3AxLngsIHdwMi54LCB3cDMueCk7XHJcbiAgICAgICAgICAgIGxldCBtaW55ID0gTWF0aC5taW4od3AwLnksIHdwMS55LCB3cDIueSwgd3AzLnkpO1xyXG4gICAgICAgICAgICBsZXQgbWF4eCA9IE1hdGgubWF4KHdwMC54LCB3cDEueCwgd3AyLngsIHdwMy54KTtcclxuICAgICAgICAgICAgbGV0IG1heHkgPSBNYXRoLm1heCh3cDAueSwgd3AxLnksIHdwMi55LCB3cDMueSk7XHJcblxyXG4gICAgICAgICAgICBhYWJiLnggPSBtaW54O1xyXG4gICAgICAgICAgICBhYWJiLnkgPSBtaW55O1xyXG4gICAgICAgICAgICBhYWJiLndpZHRoID0gbWF4eCAtIG1pbng7XHJcbiAgICAgICAgICAgIGFhYmIuaGVpZ2h0ID0gbWF4eSAtIG1pbnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpIHtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdvcmxkIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIG1hdGguVmVjMi50cmFuc2Zvcm1NYXQ0KF92ZWMyLCBjb2xsaWRlci5vZmZzZXQsIG0pO1xyXG5cclxuICAgICAgICAgICAgd29ybGQucG9zaXRpb24ueCA9IF92ZWMyLng7XHJcbiAgICAgICAgICAgIHdvcmxkLnBvc2l0aW9uLnkgPSBfdmVjMi55O1xyXG5cclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHdvcmxkIHJhZGl1c1xyXG4gICAgICAgICAgICBsZXQgdGVtcHggPSBtLm0xMiwgdGVtcHkgPSBtLm0xMztcclxuICAgICAgICAgICAgbS5tMTIgPSBtLm0xMyA9IDA7XHJcblxyXG4gICAgICAgICAgICBfdmVjMi54ID0gY29sbGlkZXIucmFkaXVzO1xyXG4gICAgICAgICAgICBfdmVjMi55ID0gMDtcclxuXHJcbiAgICAgICAgICAgIG1hdGguVmVjMi50cmFuc2Zvcm1NYXQ0KF92ZWMyLCBfdmVjMiwgbSk7XHJcbiAgICAgICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KF92ZWMyLnggKiBfdmVjMi54ICsgX3ZlYzIueSAqIF92ZWMyLnkpO1xyXG5cclxuICAgICAgICAgICAgd29ybGQucmFkaXVzID0gZDtcclxuXHJcbiAgICAgICAgICAgIGFhYmIueCA9IHdvcmxkLnBvc2l0aW9uLnggLSBkO1xyXG4gICAgICAgICAgICBhYWJiLnkgPSB3b3JsZC5wb3NpdGlvbi55IC0gZDtcclxuICAgICAgICAgICAgYWFiYi53aWR0aCA9IGQgKiAyO1xyXG4gICAgICAgICAgICBhYWJiLmhlaWdodCA9IGQgKiAyO1xyXG5cclxuICAgICAgICAgICAgbS5tMTIgPSB0ZW1weDtcclxuICAgICAgICAgICAgbS5tMTMgPSB0ZW1weTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29sbGlkZXIgaW5zdGFuY2VvZiBjYy5Qb2x5Z29uQ29sbGlkZXIpIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50cyA9IGNvbGxpZGVyLnBvaW50cztcclxuICAgICAgICAgICAgbGV0IHdvcmxkUG9pbnRzID0gd29ybGQucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgd29ybGRQb2ludHMubGVuZ3RoID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBtaW54ID0gMWU2LCBtaW55ID0gMWU2LCBtYXh4ID0gLTFlNiwgbWF4eSA9IC0xZTY7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3b3JsZFBvaW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkUG9pbnRzW2ldID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfdmVjMi54ID0gcG9pbnRzW2ldLnggKyBvZmZzZXQueDtcclxuICAgICAgICAgICAgICAgIF92ZWMyLnkgPSBwb2ludHNbaV0ueSArIG9mZnNldC55O1xyXG5cclxuICAgICAgICAgICAgICAgIG1hdGguVmVjMi50cmFuc2Zvcm1NYXQ0KF92ZWMyLCBfdmVjMiwgbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBfdmVjMi54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBfdmVjMi55O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmxkUG9pbnRzW2ldLnggPSB4O1xyXG4gICAgICAgICAgICAgICAgd29ybGRQb2ludHNbaV0ueSA9IHk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHggPiBtYXh4KSBtYXh4ID0geDtcclxuICAgICAgICAgICAgICAgIGlmICh4IDwgbWlueCkgbWlueCA9IHg7XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA+IG1heHkpIG1heHkgPSB5O1xyXG4gICAgICAgICAgICAgICAgaWYgKHkgPCBtaW55KSBtaW55ID0geTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWFiYi54ID0gbWlueDtcclxuICAgICAgICAgICAgYWFiYi55ID0gbWlueTtcclxuICAgICAgICAgICAgYWFiYi53aWR0aCA9IG1heHggLSBtaW54O1xyXG4gICAgICAgICAgICBhYWJiLmhlaWdodCA9IG1heHkgLSBtaW55O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVDb2xsaWRlcnM6QXJyYXk8QUFCQlJlZ2lvbj4gPSBbXTtcclxuXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LnBhdXNlR2FtZSlyZXR1cm47XHJcbiAgICAgICAgdGhpcy5sb29zZVF1YWRUcmVlLnVwZGF0ZUFsbCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbGxpZGVycy5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLmJVcGRhdGVDb2xsaWRlciA9IGZhbHNlKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVDb2xsaWRlcnMubGVuZ3RoID0gMDtcclxuICAgICAgICBsZXQgZ2FtZUJ1bGxldHNDb250cm9sbGVyID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXTtcclxuICAgICAgICAvKiog5LiO5pWM5Lq655qE56Kw5pKeICovXHJcbiAgICAgICAgLyoqIOWtkOW8ueWSjOWFtuS7lueIhueCuOeJqSAqL1xyXG4gICAgICAgIGxldCBlbmVteUNvbnRhY3RzID0gZ2FtZUJ1bGxldHNDb250cm9sbGVyLnJvbGVCdWxsZXRzO1xyXG4gICAgICAgIGZvciAobGV0IGVuZW15Q29udGFjdCBvZiBlbmVteUNvbnRhY3RzKXtcclxuICAgICAgICAgICAgaWYgKGVuZW15Q29udGFjdC5jb2xsaWRlci5lbmFibGVkKXtcclxuICAgICAgICAgICAgICAgIEdhbWVDb2xsaXNpb25Db250cm9sbGVyLnVwZGF0ZUNvbGxpZGVyKGVuZW15Q29udGFjdC5jb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICAvKiog6I635Y+W5Y+v6IO95Y+R55Sf56Kw5pKe55qE5pWM5Lq6ICovXHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvb3NlUXVhZFRyZWUucmV0cmlldmUoZW5lbXlDb250YWN0LmNvbGxpZGVyLndvcmxkLmFhYmIsIGFycik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhYWJiUmVnaW9uIG9mIGFycil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZW15ID0gKDxFbmVteUFBQkI+YWFiYlJlZ2lvbikuZW5lbXk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhYWJiUmVnaW9uLmJVcGRhdGVDb2xsaWRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVDb2xsaXNpb25Db250cm9sbGVyLnVwZGF0ZUNvbGxpZGVyKGVuZW15LnNwYWNlQ2lyY2xlQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lQ29sbGlzaW9uQ29udHJvbGxlci51cGRhdGVDb2xsaWRlcihlbmVteS5kZWZlbmNlQm94Q29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhYWJiUmVnaW9uLmJVcGRhdGVDb2xsaWRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbGxpZGVycy5wdXNoKGFhYmJSZWdpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYkNvbnRhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5lbXlDb250YWN0LmNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiQ29udGFjdCA9IGNjLkludGVyc2VjdGlvbi5wb2x5Z29uQ2lyY2xlKGVuZW15LmRlZmVuY2VCb3hDb2xsaWRlci53b3JsZC5wb2ludHMsIGVuZW15Q29udGFjdC5jb2xsaWRlci53b3JsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiQ29udGFjdCA9IGNjLkludGVyc2VjdGlvbi5wb2x5Z29uUG9seWdvbihlbmVteS5kZWZlbmNlQm94Q29sbGlkZXIud29ybGQucG9pbnRzLCBlbmVteUNvbnRhY3QuY29sbGlkZXIud29ybGQucG9pbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJDb250YWN0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT7kuqfnlJ/kuobnorDmkp4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmVteUNvbnRhY3QuY29udGFjdHMuaW5jbHVkZXMoZW5lbXkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT5vbkNvbGxpc2lvbkVudGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlDb250YWN0LmNvbnRhY3RzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlDb250YWN0Lm9uQ29sbGlzaW9uRW50ZXIoZW5lbXkuZGVmZW5jZUJveENvbGxpZGVyLCBlbmVteUNvbnRhY3QuY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWVuZW15Q29udGFjdC5iVGhyb3VnaHQpYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT0+b25Db2xsaXNpb25TdGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlDb250YWN0Lm9uQ29sbGlzaW9uU3RheShlbmVteS5kZWZlbmNlQm94Q29sbGlkZXIsIGVuZW15Q29udGFjdC5jb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGVuZW15Q29udGFjdC5jb250YWN0cy5pbmRleE9mKGVuZW15KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlDb250YWN0LmNvbnRhY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVteUNvbnRhY3Qub25Db2xsaXNpb25FeGl0KGVuZW15LmRlZmVuY2VCb3hDb2xsaWRlciwgZW5lbXlDb250YWN0LmNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdhbWVSb2xlQ29udHJvbGxlciA9IHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ107XHJcblxyXG4gICAgICAgIC8qKiDkuI7op5LoibLnmoTnorDmkp4gKi9cclxuICAgICAgICBsZXQgYlJvbGVVcGRhdGVDb2xsaWRlciA9IGZhbHNlO1xyXG4gICAgICAgIC8qKiDmlYzkurrnmoTlrZDlvLkgKi9cclxuICAgICAgICBnYW1lQnVsbGV0c0NvbnRyb2xsZXIuZW5lbXlCdWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcclxuICAgICAgICAgICAgLyoqIOWFiOi/h+a7pOaOieS4gOS6m+avlOi+g+i/nOeahCAqL1xyXG4gICAgICAgICAgICBpZiAoYnVsbGV0Lm5vZGUucG9zaXRpb24uc3ViKGdhbWVSb2xlQ29udHJvbGxlci5yb2xlLm5vZGUucG9zaXRpb24pLm1hZygpIDwgTWF0aC5tYXgoYnVsbGV0Lm5vZGUud2lkdGgsIGJ1bGxldC5ub2RlLmhlaWdodCkgKyBnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyl7XHJcbiAgICAgICAgICAgICAgICAvKiog57K+5a+G5Yik5patICovXHJcbiAgICAgICAgICAgICAgICBHYW1lQ29sbGlzaW9uQ29udHJvbGxlci51cGRhdGVDb2xsaWRlcihidWxsZXQuY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFiUm9sZVVwZGF0ZUNvbGxpZGVyKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQ29sbGlzaW9uQ29udHJvbGxlci51cGRhdGVDb2xsaWRlcihnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8qKiDliKTmlq3lnIblvaLkuI7lpJrovrnlvaLnmoTnorDmkp4gKi9cclxuICAgICAgICAgICAgICAgIGxldCBiQ29udGFjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bGxldC5jb2xsaWRlciBpbnN0YW5jZW9mIGNjLkNpcmNsZUNvbGxpZGVyKXtcclxuICAgICAgICAgICAgICAgICAgICBiQ29udGFjdCA9IGNjLkludGVyc2VjdGlvbi5jaXJjbGVDaXJjbGUoYnVsbGV0LmNvbGxpZGVyLndvcmxkLCBnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLndvcmxkKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiQ29udGFjdCA9IGNjLkludGVyc2VjdGlvbi5wb2x5Z29uQ2lyY2xlKGJ1bGxldC5jb2xsaWRlci53b3JsZC5wb2ludHMsIGdhbWVSb2xlQ29udHJvbGxlci5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIud29ybGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJDb250YWN0KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PuS6p+eUn+S6hueisOaSni4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnVsbGV0LmNvbnRhY3RzLmluY2x1ZGVzKGdhbWVSb2xlQ29udHJvbGxlci5yb2xlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT5vbkNvbGxpc2lvbkVudGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQuY29udGFjdHMucHVzaChnYW1lUm9sZUNvbnRyb2xsZXIucm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5vbkNvbGxpc2lvbkVudGVyKGdhbWVSb2xlQ29udHJvbGxlci5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIsIGJ1bGxldC5jb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09Pm9uQ29sbGlzaW9uU3RheVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm9uQ29sbGlzaW9uU3RheShnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLCBidWxsZXQuY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBidWxsZXQuY29udGFjdHMuaW5kZXhPZihnYW1lUm9sZUNvbnRyb2xsZXIucm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQuY29udGFjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm9uQ29sbGlzaW9uRXhpdChnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLCBidWxsZXQuY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKiog6YGT5YW3ICovXHJcbiAgICAgICAgd2luZG93WydHYW1lRW5lbXlzQ29udHJvbGxlciddLmdhbWVQcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXByb3Aub25fb2ZmKXtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHByb3Aubm9kZS5wb3NpdGlvbi5zdWIoZ2FtZVJvbGVDb250cm9sbGVyLnJvbGUubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZVByb3h5Lm1hZ25ldGljICYmICFwcm9wLm1hZ25ldGljKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wLm1hZ25ldGljID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBNYXRoLm1heChwcm9wLm5vZGUud2lkdGgsIHByb3Aubm9kZS5oZWlnaHQpICsgZ2FtZVJvbGVDb250cm9sbGVyLnJvbGUuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKiDnsr7lr4bliKTmlq0gKi9cclxuICAgICAgICAgICAgICAgICAgICBHYW1lQ29sbGlzaW9uQ29udHJvbGxlci51cGRhdGVDb2xsaWRlcihwcm9wLmNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJSb2xlVXBkYXRlQ29sbGlkZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lQ29sbGlzaW9uQ29udHJvbGxlci51cGRhdGVDb2xsaWRlcihnYW1lUm9sZUNvbnRyb2xsZXIucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qKiDliKTmlq3lnIblvaLkuI7lpJrovrnlvaLnmoTnorDmkp4gKi9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYkNvbnRhY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcC5jb2xsaWRlciBpbnN0YW5jZW9mIGNjLkNpcmNsZUNvbGxpZGVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYkNvbnRhY3QgPSBjYy5JbnRlcnNlY3Rpb24uY2lyY2xlQ2lyY2xlKHByb3AuY29sbGlkZXIud29ybGQsIGdhbWVSb2xlQ29udHJvbGxlci5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIud29ybGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYkNvbnRhY3QgPSBjYy5JbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZShwcm9wLmNvbGxpZGVyLndvcmxkLnBvaW50cywgZ2FtZVJvbGVDb250cm9sbGVyLnJvbGUuc3BhY2VDaXJjbGVDb2xsaWRlci53b3JsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiQ29udGFjdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT0+5Lqn55Sf5LqG56Kw5pKeLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3AudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=