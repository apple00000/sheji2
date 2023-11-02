
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfFangHuDun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6cb29kVNJHs4dOm8wuufsN', 'BulletOfFangHuDun');
// script/app/entities/bullet/BulletOfFangHuDun.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfFangHuDun = /** @class */ (function (_super) {
    __extends(BulletOfFangHuDun, _super);
    function BulletOfFangHuDun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        return _this;
    }
    BulletOfFangHuDun.prototype.strike = function (other, self) {
        this._ske.setAnimation(0, "transition", false);
    };
    BulletOfFangHuDun.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfFangHuDun.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.init(5);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            // console.log("=============>completeLis..", name);
            if (name == "start" || name == "transition") {
                _this._ske.setAnimation(0, "loops", false);
                if (!_this.node.getActionByTag(114)) {
                    var speedAction = cc.speed(cc.repeatForever(cc.rotateBy(1.25, 720)), 0);
                    speedAction.setTag(114);
                    _this.node.runAction(speedAction);
                    cc.tween(speedAction)
                        .to(1, { _speed: 1 }, { easing: 'sineIn' })
                        .start();
                }
            }
        });
        window['GameRoleController'].role.node.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.node.position = window['GameRoleController'].role.node.position;
        });
    };
    BulletOfFangHuDun.prototype.blink = function () {
        this.unblink();
        var action = cc.repeatForever(cc.sequence(cc.fadeTo(0.1, 0), cc.fadeTo(0.1, 255)));
        action.setTag(485);
        this.node.runAction(action);
    };
    BulletOfFangHuDun.prototype.unblink = function () {
        this.node.stopActionByTag(485);
        this.node.opacity = 255;
    };
    BulletOfFangHuDun.prototype.onDisable = function () {
        this.unblink();
        _super.prototype.onDisable.call(this);
        window['GameRoleController'].role.spaceCircleCollider.radius = 25;
    };
    BulletOfFangHuDun.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        window['GameRoleController'].role.spaceCircleCollider.radius = 80;
        this.node.position = window['GameRoleController'].role.node.position;
        this.node.stopAllActions();
        this._ske.setAnimation(0, "start", false);
    };
    /*update(dt:number){
        if (GameProxy.pauseGame)return;
        if (this.node.color.getR() < 255){
            this.node.color.setR(this.node.color.getR() + 1);
        }
        if (this.node.color.getG() < 255){
            this.node.color.setG(this.node.color.getG() + 1);
        }
        if (this.node.color.getB() < 255){
            this.node.color.setB(this.node.color.getB() + 1);
        }
        this._impenetrableDefenceCD -= dt;
        if (this._impenetrableDefenceCD <= 0){
            this.node.active = false;
        }
    }*/
    BulletOfFangHuDun.prototype.onCollisionStay = function (other, self) {
        this.strike(other, self);
    };
    BulletOfFangHuDun.prototype.collisionEnemy = function (other, self) {
        this.strike(other, self);
        var enemy = other.getComponent('Enemy');
        /** 僵硬 */
        if (this.stiff > 0) {
            enemy.doStiff(this.stiff);
        }
        /** 减速 */
        enemy.doSpeedcut();
        /** 击退效果 */
        this.doRepeal(enemy, this.repel);
        /** 飘血效果 */
        var damage = this.hurt;
        if (damage > 0) {
            enemy.hp -= damage;
        }
    };
    BulletOfFangHuDun.prototype.doRepeal = function (enemy, repel) {
        enemy.doRepel(enemy.node.position.sub(this.node.position).normalize(), repel);
    };
    BulletOfFangHuDun = __decorate([
        ccclass
    ], BulletOfFangHuDun);
    return BulletOfFangHuDun;
}(Bullet_1.default));
exports.default = BulletOfFangHuDun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkZhbmdIdUR1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQThCO0FBQzlCLDBDQUF1QztBQUN2Qyx3RUFBcUU7QUFDckUsZ0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFNO0lBQXJEO1FBQUEscUVBa0hDO1FBaEhXLFVBQUksR0FBZSxJQUFJLENBQUM7O0lBZ0hwQyxDQUFDO0lBN0dHLGtDQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsSUFBSTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQUEsaUJBc0JDO1FBckJHLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFDLFVBQVUsRUFBRSxTQUFTO1lBQ2hELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakUsb0RBQW9EO1lBQ3BELElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksWUFBWSxFQUFDO2dCQUN4QyxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQy9CLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDakMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7eUJBQ2hCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUM7eUJBQ3RDLEtBQUssRUFBRSxDQUFDO2lCQUNoQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxRSxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxtQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsaUJBQU0sU0FBUyxXQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFHSCwyQ0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxJQUFJO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFHUywwQ0FBYyxHQUF4QixVQUF5QixLQUFLLEVBQUUsSUFBSTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFDRCxTQUFTO1FBQ1QsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLFdBQVc7UUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsV0FBVztRQUNYLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQ1gsS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLEtBQUssRUFBRSxLQUFLO1FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQWpIZ0IsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0FrSHJDO0lBQUQsd0JBQUM7Q0FsSEQsQUFrSEMsQ0FsSDhDLGdCQUFNLEdBa0hwRDtrQkFsSG9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0T2ZGYW5nSHVEdW4gZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuICAgIHByaXZhdGUgX3NrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHN0cmlrZShvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NrZS5zZXRBbmltYXRpb24oMCwgXCJ0cmFuc2l0aW9uXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1bGxldElkID0gaWQ7XHJcbiAgICAgICAgbGV0IGNmZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlByb3ApW3RoaXMuYnVsbGV0SWQtMV07XHJcbiAgICAgICAgdGhpcy5iVGhyb3VnaHQgPSBjZmdbJ3BpZXJjZSddID09PSAxO1xyXG4gICAgICAgIHRoaXMucmVwZWwgPSBjZmdbJ3JlcGVsJ107XHJcbiAgICAgICAgdGhpcy5zdGlmZiA9IGNmZ1snc3RpZmYnXTtcclxuICAgICAgICBsZXQgY29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKVswXTtcclxuICAgICAgICB0aGlzLmh1cnQgPSBNYXRoLmZsb29yKGNvbmZpZ1snaHVydCddKldvcmxkLk15LmFybW9yeS5odXJ0TXVsT2YoMSkpKmNmZ1snaHVydCddO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLmluaXQoNSk7XHJcbiAgICAgICAgdGhpcy5fc2tlID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuX3NrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PmNvbXBsZXRlTGlzLi5cIiwgbmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwic3RhcnRcIiB8fCBuYW1lID09IFwidHJhbnNpdGlvblwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NrZS5zZXRBbmltYXRpb24oMCwgXCJsb29wc1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubm9kZS5nZXRBY3Rpb25CeVRhZygxMTQpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BlZWRBY3Rpb24gPSBjYy5zcGVlZChjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDEuMjUsIDcyMCkpLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZEFjdGlvbi5zZXRUYWcoMTE0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNwZWVkQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcGVlZEFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDEsIHtfc3BlZWQ6MX0sIHsgZWFzaW5nOiAnc2luZUluJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmxpbmsoKXtcclxuICAgICAgICB0aGlzLnVuYmxpbmsoKTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC4xLCAwKSwgY2MuZmFkZVRvKDAuMSwgMjU1KSkpO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoNDg1KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdW5ibGluaygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoNDg1KTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51bmJsaW5rKCk7XHJcbiAgICAgICAgc3VwZXIub25EaXNhYmxlKCk7XHJcbiAgICAgICAgd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzID0gODA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fc2tlLnNldEFuaW1hdGlvbigwLCBcInN0YXJ0XCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKnVwZGF0ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmIChHYW1lUHJveHkucGF1c2VHYW1lKXJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmNvbG9yLmdldFIoKSA8IDI1NSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvci5zZXRSKHRoaXMubm9kZS5jb2xvci5nZXRSKCkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jb2xvci5nZXRHKCkgPCAyNTUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3Iuc2V0Ryh0aGlzLm5vZGUuY29sb3IuZ2V0RygpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuY29sb3IuZ2V0QigpIDwgMjU1KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yLnNldEIodGhpcy5ub2RlLmNvbG9yLmdldEIoKSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pbXBlbmV0cmFibGVEZWZlbmNlQ0QgLT0gZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGVuZXRyYWJsZURlZmVuY2VDRCA8PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxuXHJcbiAgICBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICB0aGlzLnN0cmlrZShvdGhlciwgc2VsZik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBjb2xsaXNpb25FbmVteShvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RyaWtlKG90aGVyLCBzZWxmKTtcclxuICAgICAgICBsZXQgZW5lbXkgPSBvdGhlci5nZXRDb21wb25lbnQoJ0VuZW15Jyk7XHJcbiAgICAgICAgLyoqIOWDteehrCAqL1xyXG4gICAgICAgIGlmICh0aGlzLnN0aWZmID4gMCl7XHJcbiAgICAgICAgICAgIGVuZW15LmRvU3RpZmYodGhpcy5zdGlmZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiDlh4/pgJ8gKi9cclxuICAgICAgICBlbmVteS5kb1NwZWVkY3V0KCk7XHJcbiAgICAgICAgLyoqIOWHu+mAgOaViOaenCAqL1xyXG4gICAgICAgIHRoaXMuZG9SZXBlYWwoZW5lbXksIHRoaXMucmVwZWwpO1xyXG5cclxuICAgICAgICAvKiog6aOY6KGA5pWI5p6cICovXHJcbiAgICAgICAgbGV0IGRhbWFnZSA9IHRoaXMuaHVydDtcclxuICAgICAgICBpZiAoZGFtYWdlID4gMCl7XHJcbiAgICAgICAgICAgIGVuZW15LmhwIC09IGRhbWFnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9SZXBlYWwoZW5lbXksIHJlcGVsKTogdm9pZCB7XHJcbiAgICAgICAgZW5lbXkuZG9SZXBlbChlbmVteS5ub2RlLnBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLCByZXBlbCk7XHJcbiAgICB9XHJcbn1cclxuIl19