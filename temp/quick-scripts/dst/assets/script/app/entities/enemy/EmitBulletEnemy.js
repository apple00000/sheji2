
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/enemy/EmitBulletEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d8e2MjyvlLOoCyuh6N0alo', 'EmitBulletEnemy');
// script/app/entities/enemy/EmitBulletEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Music_1 = require("../../../../framework/audio/Music");
var Enemy_1 = require("./Enemy");
var ccclass = cc._decorator.ccclass;
var EmitBulletEnemy = /** @class */ (function (_super) {
    __extends(EmitBulletEnemy, _super);
    function EmitBulletEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmitBulletEnemy.prototype.doAttack = function () {
        Music_1.Music.playSFX("sound/msc_en001");
        var bullet = window['GameBulletsController'].getInactiveEnemyBullet(this._enemyID);
        bullet.node.active = true;
        bullet.node.position = this.node.position;
        bullet.node.rotation = this.node.rotation;
        var dir = cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-bullet.node.rotation)).normalizeSelf();
        bullet.node.runAction(cc.sequence(cc.moveBy(this.attackDistance / this.bulletSpeed, dir.mul(this.attackDistance)), cc.callFunc(function () {
            bullet.node.active = false;
        })));
    };
    EmitBulletEnemy = __decorate([
        ccclass
    ], EmitBulletEnemy);
    return EmitBulletEnemy;
}(Enemy_1.default));
exports.default = EmitBulletEnemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2VuZW15L0VtaXRCdWxsZXRFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQXdEO0FBQ3hELGlDQUE0QjtBQUVyQixJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUdoQztJQUE2QyxtQ0FBSztJQUFsRDs7SUFhQSxDQUFDO0lBWGEsa0NBQVEsR0FBbEI7UUFDSSxhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5RixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN6SCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQVpnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBYW5DO0lBQUQsc0JBQUM7Q0FiRCxBQWFDLENBYjRDLGVBQUssR0FhakQ7a0JBYm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0QnVsbGV0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIGRvQXR0YWNrKCk6IHZvaWQge1xyXG4gICAgICAgIE11c2ljLnBsYXlTRlgoXCJzb3VuZC9tc2NfZW4wMDFcIik7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IHdpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVFbmVteUJ1bGxldCh0aGlzLl9lbmVteUlEKTtcclxuICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnJvdGF0aW9uID0gdGhpcy5ub2RlLnJvdGF0aW9uO1xyXG4gICAgICAgIGxldCBkaXIgPSBjYy52MigwLCAxKS5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC1idWxsZXQubm9kZS5yb3RhdGlvbikpLm5vcm1hbGl6ZVNlbGYoKTtcclxuICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KHRoaXMuYXR0YWNrRGlzdGFuY2UvdGhpcy5idWxsZXRTcGVlZCwgZGlyLm11bCh0aGlzLmF0dGFja0Rpc3RhbmNlKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuIl19