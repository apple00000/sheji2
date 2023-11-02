
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/Bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be6a0BnFzlAN4b+ds0fdb/L', 'Bullet');
// script/app/entities/bullet/Bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var World_1 = require("../../info/World");
var ccclass = cc._decorator.ccclass;
/**
 * 普通子弹，单纯的一个碰撞体，移动一段距离后消失
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletId = 0;
        _this.bThrought = false;
        _this.hurt = 0;
        _this.repel = 0;
        _this.stiff = 0;
        _this.moveDir = cc.v2();
        _this._collider = null;
        _this._contacts = [];
        return _this;
    }
    Object.defineProperty(Bullet.prototype, "contacts", {
        get: function () {
            return this._contacts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "collider", {
        get: function () {
            return this._collider;
        },
        enumerable: false,
        configurable: true
    });
    Bullet.prototype.onLoad = function () {
        var _this = this;
        this._collider = this.getComponent(cc.Collider);
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, function () {
            var dir = cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-_this.node.rotation));
            _this.moveDir.x = dir.x;
            _this.moveDir.y = dir.y;
        });
    };
    Bullet.prototype.init = function (id) {
        this.bulletId = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[this.bulletId % 100 - 1];
        this.bThrought = config['pierce'] === 1;
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(this.bulletId % 100));
        this.repel = config['repel'];
        this.stiff = config['stiff'];
    };
    /** 让子弹飞 */
    Bullet.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    Bullet.prototype.onEnable = function () {
        window['GameBulletsController'].roleBullets.push(this);
    };
    Bullet.prototype.onDisable = function () {
        this.node.stopAllActions();
        this._contacts.length = 0;
        var gameBulletsController = window['GameBulletsController'];
        gameBulletsController.roleBullets.splice(gameBulletsController.roleBullets.indexOf(this), 1);
    };
    Bullet.prototype.getStrikePos = function (other, self) {
        var otherAABB = other.world.aabb;
        var selfAABB = self.world.aabb;
        // console.log("otherAABB==>", otherAABB);
        // console.log("selfAABB==>", selfAABB);
        // console.log("===================");
        /** 方法一 */
        /** 取包围盒的面积做比较，决策碰撞点，播放碰撞动画
         * 1.怪物比子弹大很多时就在子弹的位置播放
         * 2.子弹比怪物大很多时在怪物的位置播放
         * 3.大小差不多时取中点(小于0.5倍则取中点)
         * */
        // let rate = 1.5;
        // let selfArea = self.world.aabb.width * self.world.aabb.height;
        // let otherArea = other.world.aabb.width * other.world.aabb.height;
        // let strikePos = cc.v2();
        // if (selfArea > otherArea){
        //     if (selfArea/otherArea > rate){
        //         /** 取other节点的位置 */
        //         strikePos = other.world.aabb.center;
        //     } else {
        //         /** 取中心点 */
        //     }
        // }else {
        //     if (otherArea/selfArea > rate){
        //         /** 取self节点的位置 */
        //     } else {
        //         /** 取中心点 */
        //     }
        // }
        /** 方法二 */
        /** 用aabb包围盒判断碰撞点 */
        // let selfDir = selfAABB.center.sub(self.world.preAabb.center).normalize();
        //虽然可以用子弹的移动方向与物体的点集做运算，计算出边界碰撞位置，但是子弹已经飞过了这个位置，再在其他位置播放击中效果更突兀.
        /** 水平方向 */
        var strikePos = cc.v2();
        if (selfAABB.xMin >= otherAABB.xMin && selfAABB.xMax <= otherAABB.xMax) {
            strikePos.x = selfAABB.center.x;
        }
        else if (selfAABB.xMax <= otherAABB.center.x && selfAABB.xMin < otherAABB.xMin) {
            strikePos.x = selfAABB.xMax;
        }
        else if (selfAABB.xMin >= otherAABB.center.x && selfAABB.xMax > otherAABB.xMax) {
            strikePos.x = selfAABB.xMin;
        }
        else {
            strikePos.x = otherAABB.center.x;
        }
        /** 垂直方向 */
        if (selfAABB.yMin >= otherAABB.yMin && selfAABB.yMax <= otherAABB.yMax) {
            strikePos.y = selfAABB.center.y;
        }
        else if (selfAABB.yMax <= otherAABB.center.y && selfAABB.yMin < otherAABB.yMin) {
            strikePos.y = selfAABB.yMax;
        }
        else if (selfAABB.yMin >= otherAABB.center.y && selfAABB.yMax > otherAABB.yMax) {
            strikePos.y = selfAABB.yMin;
        }
        else {
            strikePos.y = otherAABB.center.y;
        }
        return strikePos;
    };
    /** 创建strike */
    Bullet.prototype.strike = function (other, self) {
        var bulletStrike = window['GameBulletsController'].getInactiveBulletStrike(this.bulletId);
        bulletStrike.node.active = true;
        bulletStrike.node.position = this.getStrikePos(other, self);
        bulletStrike.node.rotation = this.node.rotation;
        bulletStrike.strike();
    };
    Bullet.prototype.doRepeal = function (enemy, repel) {
        enemy.doRepel(this.moveDir, repel);
    };
    /**
     * 当碰撞产生的时候调用
     *  */
    Bullet.prototype.collisionEnemy = function (other, self) {
        this.strike(other, self);
        var enemy = other.getComponent('Enemy');
        /** 僵硬 */
        if (this.stiff > 0) {
            enemy.doStiff(this.stiff);
        }
        /** 减速 */
        enemy.doSpeedcut();
        /** 击退效果 */
        var subRepel = this.repel - enemy.unrepel;
        // let subRepel = 10;
        if (subRepel > 0) {
            // console.log("击退效果……。");
            this.doRepeal(enemy, subRepel);
        }
        else if (enemy.enemyID < 7) {
            enemy.playBeatenBack();
        }
        /** 飘血效果 */
        var damage = this.hurt;
        if (damage > 0) {
            enemy.hp -= damage;
        }
    };
    /**
     * 碰撞处理
     * */
    Bullet.prototype.onCollisionEnter = function (other, self) {
        this.collisionEnemy(other, self);
        if (!this.bThrought) {
            this.node.active = false;
        }
        // console.log('子弹碰撞');
    };
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * */
    Bullet.prototype.onCollisionStay = function (other, self) {
    };
    /** 当碰撞结束后调用 */
    Bullet.prototype.onCollisionExit = function (other, self) {
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdFQUFxRTtBQUNyRSxnRUFBNkQ7QUFDN0QsMENBQXVDO0FBRWhDLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDOztHQUVHO0FBRUg7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFrTUM7UUFqTUcsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUViLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsVUFBSSxHQUFHLENBQUMsQ0FBQztRQUVULFdBQUssR0FBRyxDQUFDLENBQUM7UUFFVixXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRVYsYUFBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUVWLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFFM0IsZUFBUyxHQUFHLEVBQUUsQ0FBQzs7SUFtTDdCLENBQUM7SUFoTEcsc0JBQUksNEJBQVE7YUFBWjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRCQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFHRCx1QkFBTSxHQUFOO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFO1lBQzdDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENB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O0lBQ0wsZ0NBQWUsR0FBZixVQUFnQixLQUFLLEVBQUUsSUFBSTtJQUUzQixDQUFDO0lBRUQsZUFBZTtJQUNmLGdDQUFlLEdBQWYsVUFBZ0IsS0FBSyxFQUFFLElBQUk7SUFFM0IsQ0FBQztJQWhNZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWtNMUI7SUFBRCxhQUFDO0NBbE1ELEFBa01DLENBbE1tQyxFQUFFLENBQUMsU0FBUyxHQWtNL0M7a0JBbE1vQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuLyoqXHJcbiAqIOaZrumAmuWtkOW8ue+8jOWNlee6r+eahOS4gOS4queisOaSnuS9k++8jOenu+WKqOS4gOautei3neemu+WQjua2iOWksVxyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIGJ1bGxldElkID0gMDtcclxuXHJcbiAgICBiVGhyb3VnaHQgPSBmYWxzZTtcclxuXHJcbiAgICBodXJ0ID0gMDtcclxuXHJcbiAgICByZXBlbCA9IDA7XHJcblxyXG4gICAgc3RpZmYgPSAwO1xyXG5cclxuICAgIG1vdmVEaXIgPSBjYy52MigpO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbGxpZGVyOmNjLkNvbGxpZGVyID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2NvbnRhY3RzID0gW107XHJcblxyXG5cclxuICAgIGdldCBjb250YWN0cygpOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb2xsaWRlcigpOiBjYy5Db2xsaWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLl9jb2xsaWRlciA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCwgKCk9PntcclxuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKDAsIDEpLnJvdGF0ZShjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLXRoaXMubm9kZS5yb3RhdGlvbikpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIueCA9IGRpci54O1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIueSA9IGRpci55O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0KGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5idWxsZXRJZCA9IGlkO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pW3RoaXMuYnVsbGV0SWQlMTAwLTFdO1xyXG4gICAgICAgIHRoaXMuYlRocm91Z2h0ID0gY29uZmlnWydwaWVyY2UnXSA9PT0gMTtcclxuICAgICAgICB0aGlzLmh1cnQgPSBNYXRoLmZsb29yKGNvbmZpZ1snaHVydCddKldvcmxkLk15LmFybW9yeS5odXJ0TXVsT2YodGhpcy5idWxsZXRJZCUxMDApKTtcclxuICAgICAgICB0aGlzLnJlcGVsID0gY29uZmlnWydyZXBlbCddO1xyXG4gICAgICAgIHRoaXMuc3RpZmYgPSBjb25maWdbJ3N0aWZmJ107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiuqeWtkOW8uemjniAqL1xyXG4gICAgZmx5KGRpcjpjYy5WZWMyLCBkaXN0YW5jZTpudW1iZXIsIHNwZWVkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMihkaXIueSwgZGlyLngpKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShkaXN0YW5jZS9zcGVlZCwgZGlyLm11bChkaXN0YW5jZSkpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10ucm9sZUJ1bGxldHMucHVzaCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9jb250YWN0cy5sZW5ndGggPSAwO1xyXG4gICAgICAgIGxldCBnYW1lQnVsbGV0c0NvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddO1xyXG4gICAgICAgIGdhbWVCdWxsZXRzQ29udHJvbGxlci5yb2xlQnVsbGV0cy5zcGxpY2UoZ2FtZUJ1bGxldHNDb250cm9sbGVyLnJvbGVCdWxsZXRzLmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRTdHJpa2VQb3Mob3RoZXIsIHNlbGYpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IG90aGVyQUFCQiA9IG90aGVyLndvcmxkLmFhYmI7XHJcbiAgICAgICAgbGV0IHNlbGZBQUJCID0gc2VsZi53b3JsZC5hYWJiO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib3RoZXJBQUJCPT0+XCIsIG90aGVyQUFCQik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzZWxmQUFCQj09PlwiLCBzZWxmQUFCQik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09XCIpO1xyXG5cclxuICAgICAgICAvKiog5pa55rOV5LiAICovXHJcbiAgICAgICAgLyoqIOWPluWMheWbtOebkueahOmdouenr+WBmuavlOi+g++8jOWGs+etlueisOaSnueCue+8jOaSreaUvueisOaSnuWKqOeUu1xyXG4gICAgICAgICAqIDEu5oCq54mp5q+U5a2Q5by55aSn5b6I5aSa5pe25bCx5Zyo5a2Q5by555qE5L2N572u5pKt5pS+XHJcbiAgICAgICAgICogMi7lrZDlvLnmr5TmgKrnianlpKflvojlpJrml7blnKjmgKrniannmoTkvY3nva7mkq3mlL5cclxuICAgICAgICAgKiAzLuWkp+Wwj+W3ruS4jeWkmuaXtuWPluS4reeCuSjlsI/kuo4wLjXlgI3liJnlj5bkuK3ngrkpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICAvLyBsZXQgcmF0ZSA9IDEuNTtcclxuICAgICAgICAvLyBsZXQgc2VsZkFyZWEgPSBzZWxmLndvcmxkLmFhYmIud2lkdGggKiBzZWxmLndvcmxkLmFhYmIuaGVpZ2h0O1xyXG4gICAgICAgIC8vIGxldCBvdGhlckFyZWEgPSBvdGhlci53b3JsZC5hYWJiLndpZHRoICogb3RoZXIud29ybGQuYWFiYi5oZWlnaHQ7XHJcbiAgICAgICAgLy8gbGV0IHN0cmlrZVBvcyA9IGNjLnYyKCk7XHJcbiAgICAgICAgLy8gaWYgKHNlbGZBcmVhID4gb3RoZXJBcmVhKXtcclxuICAgICAgICAvLyAgICAgaWYgKHNlbGZBcmVhL290aGVyQXJlYSA+IHJhdGUpe1xyXG4gICAgICAgIC8vICAgICAgICAgLyoqIOWPlm90aGVy6IqC54K555qE5L2N572uICovXHJcbiAgICAgICAgLy8gICAgICAgICBzdHJpa2VQb3MgPSBvdGhlci53b3JsZC5hYWJiLmNlbnRlcjtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIC8qKiDlj5bkuK3lv4PngrkgKi9cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1lbHNlIHtcclxuICAgICAgICAvLyAgICAgaWYgKG90aGVyQXJlYS9zZWxmQXJlYSA+IHJhdGUpe1xyXG4gICAgICAgIC8vICAgICAgICAgLyoqIOWPlnNlbGboioLngrnnmoTkvY3nva4gKi9cclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIC8qKiDlj5bkuK3lv4PngrkgKi9cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvKiog5pa55rOV5LqMICovXHJcbiAgICAgICAgLyoqIOeUqGFhYmLljIXlm7Tnm5LliKTmlq3norDmkp7ngrkgKi9cclxuICAgICAgICAvLyBsZXQgc2VsZkRpciA9IHNlbGZBQUJCLmNlbnRlci5zdWIoc2VsZi53b3JsZC5wcmVBYWJiLmNlbnRlcikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgLy/omb3nhLblj6/ku6XnlKjlrZDlvLnnmoTnp7vliqjmlrnlkJHkuI7niankvZPnmoTngrnpm4blgZrov5DnrpfvvIzorqHnrpflh7rovrnnlYznorDmkp7kvY3nva7vvIzkvYbmmK/lrZDlvLnlt7Lnu4/po57ov4fkuobov5nkuKrkvY3nva7vvIzlho3lnKjlhbbku5bkvY3nva7mkq3mlL7lh7vkuK3mlYjmnpzmm7TnqoHlhYAuXHJcbiAgICAgICAgLyoqIOawtOW5s+aWueWQkSAqL1xyXG4gICAgICAgIGxldCBzdHJpa2VQb3MgPSBjYy52MigpO1xyXG4gICAgICAgIGlmIChzZWxmQUFCQi54TWluID49IG90aGVyQUFCQi54TWluICYmIHNlbGZBQUJCLnhNYXggPD0gb3RoZXJBQUJCLnhNYXgpe1xyXG4gICAgICAgICAgICBzdHJpa2VQb3MueCA9IHNlbGZBQUJCLmNlbnRlci54O1xyXG4gICAgICAgIH1lbHNlIGlmIChzZWxmQUFCQi54TWF4IDw9IG90aGVyQUFCQi5jZW50ZXIueCAmJiBzZWxmQUFCQi54TWluIDwgb3RoZXJBQUJCLnhNaW4pe1xyXG4gICAgICAgICAgICBzdHJpa2VQb3MueCA9IHNlbGZBQUJCLnhNYXg7XHJcbiAgICAgICAgfWVsc2UgaWYgKHNlbGZBQUJCLnhNaW4gPj0gb3RoZXJBQUJCLmNlbnRlci54ICYmIHNlbGZBQUJCLnhNYXggPiBvdGhlckFBQkIueE1heCl7XHJcbiAgICAgICAgICAgIHN0cmlrZVBvcy54ID0gc2VsZkFBQkIueE1pbjtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmlrZVBvcy54ID0gb3RoZXJBQUJCLmNlbnRlci54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOWeguebtOaWueWQkSAqL1xyXG4gICAgICAgIGlmIChzZWxmQUFCQi55TWluID49IG90aGVyQUFCQi55TWluICYmIHNlbGZBQUJCLnlNYXggPD0gb3RoZXJBQUJCLnlNYXgpe1xyXG4gICAgICAgICAgICBzdHJpa2VQb3MueSA9IHNlbGZBQUJCLmNlbnRlci55O1xyXG4gICAgICAgIH1lbHNlIGlmIChzZWxmQUFCQi55TWF4IDw9IG90aGVyQUFCQi5jZW50ZXIueSAmJiBzZWxmQUFCQi55TWluIDwgb3RoZXJBQUJCLnlNaW4pe1xyXG4gICAgICAgICAgICBzdHJpa2VQb3MueSA9IHNlbGZBQUJCLnlNYXg7XHJcbiAgICAgICAgfWVsc2UgaWYgKHNlbGZBQUJCLnlNaW4gPj0gb3RoZXJBQUJCLmNlbnRlci55ICYmIHNlbGZBQUJCLnlNYXggPiBvdGhlckFBQkIueU1heCl7XHJcbiAgICAgICAgICAgIHN0cmlrZVBvcy55ID0gc2VsZkFBQkIueU1pbjtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmlrZVBvcy55ID0gb3RoZXJBQUJCLmNlbnRlci55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0cmlrZVBvcztcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Yib5bu6c3RyaWtlICovXHJcbiAgICBzdHJpa2Uob3RoZXIsIHNlbGYpe1xyXG4gICAgICAgIGxldCBidWxsZXRTdHJpa2UgPSB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddLmdldEluYWN0aXZlQnVsbGV0U3RyaWtlKHRoaXMuYnVsbGV0SWQpO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucG9zaXRpb24gPSB0aGlzLmdldFN0cmlrZVBvcyhvdGhlciwgc2VsZik7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucm90YXRpb24gPSB0aGlzLm5vZGUucm90YXRpb247XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLnN0cmlrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvUmVwZWFsKGVuZW15LCByZXBlbCl7XHJcbiAgICAgICAgZW5lbXkuZG9SZXBlbCh0aGlzLm1vdmVEaXIsIHJlcGVsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+eisOaSnuS6p+eUn+eahOaXtuWAmeiwg+eUqFxyXG4gICAgICogICovXHJcbiAgICBwcm90ZWN0ZWQgY29sbGlzaW9uRW5lbXkob3RoZXIsIHNlbGYpe1xyXG4gICAgICAgIHRoaXMuc3RyaWtlKG90aGVyLCBzZWxmKTtcclxuICAgICAgICBsZXQgZW5lbXkgPSBvdGhlci5nZXRDb21wb25lbnQoJ0VuZW15Jyk7XHJcbiAgICAgICAgLyoqIOWDteehrCAqL1xyXG4gICAgICAgIGlmICh0aGlzLnN0aWZmID4gMCl7XHJcbiAgICAgICAgICAgIGVuZW15LmRvU3RpZmYodGhpcy5zdGlmZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiDlh4/pgJ8gKi9cclxuICAgICAgICBlbmVteS5kb1NwZWVkY3V0KCk7XHJcbiAgICAgICAgLyoqIOWHu+mAgOaViOaenCAqL1xyXG4gICAgICAgIGxldCBzdWJSZXBlbCA9IHRoaXMucmVwZWwgLSBlbmVteS51bnJlcGVsO1xyXG4gICAgICAgIC8vIGxldCBzdWJSZXBlbCA9IDEwO1xyXG4gICAgICAgIGlmIChzdWJSZXBlbCA+IDApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWHu+mAgOaViOaenOKApuKApuOAglwiKTtcclxuICAgICAgICAgICAgdGhpcy5kb1JlcGVhbChlbmVteSwgc3ViUmVwZWwpO1xyXG4gICAgICAgIH1lbHNlIGlmIChlbmVteS5lbmVteUlEIDwgNykge1xyXG4gICAgICAgICAgICBlbmVteS5wbGF5QmVhdGVuQmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOmjmOihgOaViOaenCAqL1xyXG4gICAgICAgIGxldCBkYW1hZ2UgPSB0aGlzLmh1cnQ7XHJcbiAgICAgICAgaWYgKGRhbWFnZSA+IDApe1xyXG4gICAgICAgICAgICBlbmVteS5ocCAtPSBkYW1hZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56Kw5pKe5aSE55CGXHJcbiAgICAgKiAqL1xyXG4gICAgb25Db2xsaXNpb25FbnRlciAob3RoZXIsIHNlbGYpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25FbmVteShvdGhlciwgc2VsZik7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5iVGhyb3VnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5a2Q5by556Kw5pKeJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPnorDmkp7kuqfnlJ/lkI7vvIznorDmkp7nu5PmnZ/liY3nmoTmg4XlhrXkuIvvvIzmr4/mrKHorqHnrpfnorDmkp7nu5PmnpzlkI7osIPnlKhcclxuICAgICAqICovXHJcbiAgICBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiog5b2T56Kw5pKe57uT5p2f5ZCO6LCD55SoICovXHJcbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXIsIHNlbGYpe1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=