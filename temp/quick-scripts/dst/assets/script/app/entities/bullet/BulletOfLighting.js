
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfLighting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a245PWUhJNNYI42/j5E9XP', 'BulletOfLighting');
// script/app/entities/bullet/BulletOfLighting.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Enemy_1 = require("../enemy/Enemy");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfLighting = /** @class */ (function (_super) {
    __extends(BulletOfLighting, _super);
    function BulletOfLighting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        _this._lightEnemys = [];
        return _this;
    }
    BulletOfLighting.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this._lightEnemys.length = 0;
    };
    BulletOfLighting.prototype.strike = function (other, self) {
        var gameBulletsController = window['GameBulletsController'];
        this._lightEnemys.push(other.getComponent(Enemy_1.default));
        var bulletStrike = gameBulletsController.getInactiveBulletStrike(10);
        bulletStrike.node.active = true;
        bulletStrike.node.position = cc.v2();
        bulletStrike.node.rotation = this.node.rotation;
        bulletStrike.node.setContentSize(other.node.getContentSize());
        bulletStrike.node.removeFromParent(false);
        bulletStrike.node.setParent(other.node);
        var spriteNode = bulletStrike.spriteNode;
        bulletStrike.node.rotation = Math.random() * 360;
        bulletStrike.node.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(0.05), cc.callFunc(function () {
            spriteNode.active = !spriteNode.active;
            // bulletStrike.node.rotation = Math.random()*360;
        })), 6), cc.callFunc(function () {
            bulletStrike.node.stopAllActions();
            bulletStrike.node.active = false;
            bulletStrike.node.removeFromParent(false);
            bulletStrike.node.setParent(gameBulletsController.bulletLayer);
        })));
    };
    BulletOfLighting.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfLighting.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var _a;
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            /** 寻找新的怪物攻击 */
            /** 找最近的怪生成闪电 */
            if (_this._lightEnemys.length > 0 && _this._lightEnemys.length < 6) {
                var list = window['GameEnemysController'].allAliveAndInScreenEnemy().filter(function (value) { return !_this._lightEnemys.includes(value); });
                if (list.length > 0) {
                    var minDistance_1 = -1;
                    var enemy_1 = null;
                    list.forEach(function (value) {
                        var distance = _this.node.position.sub(value.node.position).mag();
                        if (minDistance_1 < 0 || distance < minDistance_1) {
                            minDistance_1 = distance;
                            enemy_1 = value;
                        }
                    });
                    /** 生成闪电 */
                    var bullet = window['GameBulletsController'].getInactivePropBullet(6);
                    bullet.node.position = _this._lightEnemys[_this._lightEnemys.length - 1].node.position;
                    (_a = bullet._lightEnemys).push.apply(_a, _this._lightEnemys);
                    bullet.joint(enemy_1.node.position);
                }
            }
            _this.node.active = false;
        });
    };
    BulletOfLighting.prototype.joint = function (pos) {
        var sub = pos.sub(this.node.position);
        var distance = sub.mag();
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(sub.y, sub.x));
        this.node.scaleY = distance / 380;
        this.node.active = true;
        this._ske.setAnimation(0, "animation", false);
    };
    BulletOfLighting = __decorate([
        ccclass
    ], BulletOfLighting);
    return BulletOfLighting;
}(Bullet_1.default));
exports.default = BulletOfLighting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkxpZ2h0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFFOUIsd0NBQW1DO0FBQ25DLDBDQUF1QztBQUN2Qyx3RUFBcUU7QUFDckUsZ0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThDLG9DQUFNO0lBQXBEO1FBQUEscUVBMkZDO1FBekZXLFVBQUksR0FBZSxJQUFJLENBQUM7UUFFeEIsa0JBQVksR0FBZ0IsRUFBRSxDQUFDOztJQXVGM0MsQ0FBQztJQXBGRyxvQ0FBUyxHQUFUO1FBQ0ksaUJBQU0sU0FBUyxXQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sS0FBSyxFQUFFLElBQUk7UUFDZCxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsZUFBSyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJ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Q0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBSyxHQUFMLFVBQU0sR0FBVztRQUNiLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQTFGZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0EyRnBDO0lBQUQsdUJBQUM7Q0EzRkQsQUEyRkMsQ0EzRjZDLGdCQUFNLEdBMkZuRDtrQkEzRm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgQnVsbGV0U3RyaWtlTGlnaHRuaW5nIGZyb20gXCIuLi9idWxsZXRTdHJpa2UvQnVsbGV0U3RyaWtlTGlnaHRuaW5nXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi4vZW5lbXkvRW5lbXlcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtFeGNlbFRhYmxlTmFtZXN9IGZyb20gXCIuLi8uLi9jb25maWcvRXhjZWxUYWJsZU5hbWVzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldE9mTGlnaHRpbmcgZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuICAgIHByaXZhdGUgX3NrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlnaHRFbmVteXM6QXJyYXk8RW5lbXk+ID0gW107XHJcblxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLl9saWdodEVuZW15cy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0cmlrZShvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIGxldCBnYW1lQnVsbGV0c0NvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0RW5lbXlzLnB1c2gob3RoZXIuZ2V0Q29tcG9uZW50KEVuZW15KSk7XHJcbiAgICAgICAgbGV0IGJ1bGxldFN0cmlrZSA9IGdhbWVCdWxsZXRzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUJ1bGxldFN0cmlrZSgxMCk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucm90YXRpb24gPSB0aGlzLm5vZGUucm90YXRpb247XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc2V0Q29udGVudFNpemUob3RoZXIubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5zZXRQYXJlbnQob3RoZXIubm9kZSk7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVOb2RlID0gKDxCdWxsZXRTdHJpa2VMaWdodG5pbmc+YnVsbGV0U3RyaWtlKS5zcHJpdGVOb2RlO1xyXG4gICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLnJvdGF0aW9uID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5yZXBlYXQoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4wNSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5hY3RpdmUgPSAhc3ByaXRlTm9kZS5hY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1bGxldFN0cmlrZS5ub2RlLnJvdGF0aW9uID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICksIDYpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRTdHJpa2Uubm9kZS5zZXRQYXJlbnQoZ2FtZUJ1bGxldHNDb250cm9sbGVyLmJ1bGxldExheWVyKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1bGxldElkID0gaWQ7XHJcbiAgICAgICAgbGV0IGNmZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlByb3ApW3RoaXMuYnVsbGV0SWQtMV07XHJcbiAgICAgICAgdGhpcy5iVGhyb3VnaHQgPSBjZmdbJ3BpZXJjZSddID09PSAxO1xyXG4gICAgICAgIHRoaXMucmVwZWwgPSBjZmdbJ3JlcGVsJ107XHJcbiAgICAgICAgdGhpcy5zdGlmZiA9IGNmZ1snc3RpZmYnXTtcclxuICAgICAgICBsZXQgY29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKVswXTtcclxuICAgICAgICB0aGlzLmh1cnQgPSBNYXRoLmZsb29yKGNvbmZpZ1snaHVydCddKldvcmxkLk15LmFybW9yeS5odXJ0TXVsT2YoMSkpKmNmZ1snaHVydCddO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5fc2tlID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuX3NrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgLyoqIOWvu+aJvuaWsOeahOaAqueJqeaUu+WHuyAqL1xyXG4gICAgICAgICAgICAvKiog5om+5pyA6L+R55qE5oCq55Sf5oiQ6Zeq55S1ICovXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9saWdodEVuZW15cy5sZW5ndGggPiAwICYmIHRoaXMuX2xpZ2h0RW5lbXlzLmxlbmd0aCA8IDYpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB3aW5kb3dbJ0dhbWVFbmVteXNDb250cm9sbGVyJ10uYWxsQWxpdmVBbmRJblNjcmVlbkVuZW15KCkuZmlsdGVyKHZhbHVlID0+ICF0aGlzLl9saWdodEVuZW15cy5pbmNsdWRlcyh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZW15ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLm5vZGUucG9zaXRpb24uc3ViKHZhbHVlLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWluRGlzdGFuY2UgPCAwIHx8IGRpc3RhbmNlIDwgbWluRGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvKiog55Sf5oiQ6Zeq55S1ICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IDxCdWxsZXRPZkxpZ2h0aW5nPndpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVQcm9wQnVsbGV0KDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gdGhpcy5fbGlnaHRFbmVteXNbdGhpcy5fbGlnaHRFbmVteXMubGVuZ3RoLTFdLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Ll9saWdodEVuZW15cy5wdXNoKC4uLnRoaXMuX2xpZ2h0RW5lbXlzKTtcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuam9pbnQoZW5lbXkubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpvaW50KHBvczpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgc3ViID0gcG9zLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHN1Yi5tYWcoKTtcclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSA5MCAtIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKHN1Yi55LCBzdWIueCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSBkaXN0YW5jZS8zODA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2tlLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19