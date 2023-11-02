
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfShouLei.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '083284vH5tL8raqVw3y/gbv', 'BulletOfShouLei');
// script/app/entities/bullet/BulletOfShouLei.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var GameProxy_1 = require("../../game/GameProxy");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfShouLei = /** @class */ (function (_super) {
    __extends(BulletOfShouLei, _super);
    function BulletOfShouLei() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        _this._bounds = cc.rect();
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletOfShouLei.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfShouLei.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
        var bgNode = cc.find('Canvas').getChildByName('GameScene').getChildByName('shakeNode').getChildByName('bg');
        this._bounds.x = -bgNode.width / 2;
        this._bounds.y = -bgNode.height / 2;
        this._bounds.width = bgNode.width;
        this._bounds.height = bgNode.height;
    };
    BulletOfShouLei.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletOfShouLei.prototype.move = function (dir) {
        var _this = this;
        if (this.node.x <= this._bounds.xMin || this.node.x >= this._bounds.xMax || this.node.y <= this._bounds.yMin || this.node.y >= this._bounds.yMax) {
            this.node.active = false;
            return;
        }
        this._ske.setAnimation(0, "animation", true);
        /** 计算终点 */
        var destPos = dir.mul(this._bounds.height + this._bounds.width);
        var intersections = [];
        if (dir.x > 0) {
            //右边界
            if (destPos.x >= this._bounds.xMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMax, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.x < 0) {
            //左边界
            if (destPos.x <= this._bounds.xMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMin, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        if (dir.y > 0) {
            //上边界
            if (destPos.y >= this._bounds.yMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMax), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.y < 0) {
            //上边界
            if (destPos.y <= this._bounds.yMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMin), point)) {
                    intersections.push(point);
                }
            }
        }
        if (intersections.length > 0) {
            // console.log("重新计算destPos===>intersections", intersections);
            /** 重新计算destPos */
            if (intersections.length == 1) {
                destPos = intersections[0];
            }
            else {
                /** 取距离怪物最近的那个点 */
                var p = intersections[0];
                var minDistance = p.sub(this.node.position).mag();
                for (var i = 1; i < intersections.length; i++) {
                    var mag = intersections[i].sub(this.node.position).mag();
                    if (mag < minDistance) {
                        p = intersections[i];
                        minDistance = mag;
                    }
                }
                destPos = p;
            }
        }
        var distance = destPos.sub(this.node.position).mag();
        var speed = 50;
        var action = cc.sequence(cc.moveTo(distance / speed, destPos), cc.callFunc(function () {
            _this.node.active = false;
        }));
        this.node.runAction(action);
    };
    BulletOfShouLei.prototype.onCollisionEnter = function (other, self) {
        /** 爆炸 */
        this.node.active = false;
        this.boom();
    };
    BulletOfShouLei.prototype.boom = function () {
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = 0.5;
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    BulletOfShouLei = __decorate([
        ccclass
    ], BulletOfShouLei);
    return BulletOfShouLei;
}(Bullet_1.default));
exports.default = BulletOfShouLei;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZlNob3VMZWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUE4QjtBQUM5Qiw4REFBeUQ7QUFDekQsa0RBQStDO0FBQy9DLDBDQUF1QztBQUN2Qyx3RUFBcUU7QUFDckUsZ0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTZDLG1DQUFNO0lBQW5EO1FBQUEscUVBNEhDO1FBMUhXLFVBQUksR0FBZSxJQUFJLENBQUM7UUFFeEIsYUFBTyxHQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QiwrQkFBeUIsR0FBRyxJQUFJLENBQUM7O0lBc0g3QyxDQUFDO0lBbkhHLGdDQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsSUFBSTtRQUNkLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsOEJBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUks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SSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN0QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDdkQsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIscUJBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQTNIZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQTRIbkM7SUFBRCxzQkFBQztDQTVIRCxBQTRIQyxDQTVINEMsZ0JBQU0sR0E0SGxEO2tCQTVIb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4uLy4uL2dhbWUvR2FtZVByb3h5XCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi8uLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPZlNob3VMZWkgZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuICAgIHByaXZhdGUgX3NrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfYm91bmRzOmNjLlJlY3QgPSBjYy5yZWN0KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZUV4cGxvc2l2ZXNDb250cm9sbGVyID0gbnVsbDtcclxuXHJcblxyXG4gICAgc3RyaWtlKG90aGVyLCBzZWxmKTogdm9pZCB7XHJcbiAgICAgICAgLy8gc3VwZXIuc3RyaWtlKG90aGVyLCBzZWxmKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1bGxldElkID0gaWQ7XHJcbiAgICAgICAgbGV0IGNmZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlByb3ApW3RoaXMuYnVsbGV0SWQtMV07XHJcbiAgICAgICAgdGhpcy5iVGhyb3VnaHQgPSBjZmdbJ3BpZXJjZSddID09PSAxO1xyXG4gICAgICAgIHRoaXMucmVwZWwgPSBjZmdbJ3JlcGVsJ107XHJcbiAgICAgICAgdGhpcy5zdGlmZiA9IGNmZ1snc3RpZmYnXTtcclxuICAgICAgICBsZXQgY29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKVswXTtcclxuICAgICAgICB0aGlzLmh1cnQgPSBNYXRoLmZsb29yKGNvbmZpZ1snaHVydCddKldvcmxkLk15LmFybW9yeS5odXJ0TXVsT2YoMSkpKmNmZ1snaHVydCddO1xyXG4gICAgICAgIGxldCBiZ05vZGUgPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDaGlsZEJ5TmFtZSgnR2FtZVNjZW5lJykuZ2V0Q2hpbGRCeU5hbWUoJ3NoYWtlTm9kZScpLmdldENoaWxkQnlOYW1lKCdiZycpO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy54ID0gLSBiZ05vZGUud2lkdGgvMjtcclxuICAgICAgICB0aGlzLl9ib3VuZHMueSA9IC0gYmdOb2RlLmhlaWdodC8yO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IGJnTm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gYmdOb2RlLmhlaWdodDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuX3NrZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9nYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXIgPSBGYWNhZGUuZmluZENvbXBvbmVudChcIkdhbWVTY2VuZVwiLCBcIkdhbWVFeHBsb3NpdmVzQ29udHJvbGxlclwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbW92ZShkaXI6IGNjLlZlYzIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPD0gdGhpcy5fYm91bmRzLnhNaW4gfHwgdGhpcy5ub2RlLnggPj0gdGhpcy5fYm91bmRzLnhNYXggfHwgdGhpcy5ub2RlLnkgPD0gdGhpcy5fYm91bmRzLnlNaW4gfHwgdGhpcy5ub2RlLnkgPj0gdGhpcy5fYm91bmRzLnlNYXgpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2tlLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKTtcclxuICAgICAgICAvKiog6K6h566X57uI54K5ICovXHJcbiAgICAgICAgbGV0IGRlc3RQb3MgPSBkaXIubXVsKHRoaXMuX2JvdW5kcy5oZWlnaHQrdGhpcy5fYm91bmRzLndpZHRoKTtcclxuICAgICAgICBsZXQgaW50ZXJzZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXIueCA+IDApe1xyXG4gICAgICAgICAgICAvL+WPs+i+ueeVjFxyXG4gICAgICAgICAgICBpZiAoZGVzdFBvcy54ID49IHRoaXMuX2JvdW5kcy54TWF4KXtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBpZihjYy5JbnRlcnNlY3Rpb24ucExpbmVJbnRlcnNlY3QodGhpcy5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNaW4pLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNYXgpLCBwb2ludCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbnMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZiAoZGlyLnggPCAwKSB7XHJcbiAgICAgICAgICAgIC8v5bem6L6555WMXHJcbiAgICAgICAgICAgIGlmIChkZXN0UG9zLnggPD0gdGhpcy5fYm91bmRzLnhNaW4pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIGlmKGNjLkludGVyc2VjdGlvbi5wTGluZUludGVyc2VjdCh0aGlzLm5vZGUucG9zaXRpb24sIGRlc3RQb3MsIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1pbiksIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1heCksIHBvaW50KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpci55ID4gMCl7XHJcbiAgICAgICAgICAgIC8v5LiK6L6555WMXHJcbiAgICAgICAgICAgIGlmIChkZXN0UG9zLnkgPj0gdGhpcy5fYm91bmRzLnlNYXgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIGlmKGNjLkludGVyc2VjdGlvbi5wTGluZUludGVyc2VjdCh0aGlzLm5vZGUucG9zaXRpb24sIGRlc3RQb3MsIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1heCksIGNjLnYyKHRoaXMuX2JvdW5kcy54TWF4LCB0aGlzLl9ib3VuZHMueU1heCksIHBvaW50KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmIChkaXIueSA8IDApe1xyXG4gICAgICAgICAgICAvL+S4iui+ueeVjFxyXG4gICAgICAgICAgICBpZiAoZGVzdFBvcy55IDw9IHRoaXMuX2JvdW5kcy55TWluKXtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBpZihjYy5JbnRlcnNlY3Rpb24ucExpbmVJbnRlcnNlY3QodGhpcy5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9ib3VuZHMueE1pbiwgdGhpcy5fYm91bmRzLnlNaW4pLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNaW4pLCBwb2ludCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbnMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumHjeaWsOiuoeeul2Rlc3RQb3M9PT0+aW50ZXJzZWN0aW9uc1wiLCBpbnRlcnNlY3Rpb25zKTtcclxuICAgICAgICAgICAgLyoqIOmHjeaWsOiuoeeul2Rlc3RQb3MgKi9cclxuICAgICAgICAgICAgaWYgKGludGVyc2VjdGlvbnMubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgZGVzdFBvcyA9IGludGVyc2VjdGlvbnNbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiog5Y+W6Led56a75oCq54mp5pyA6L+R55qE6YKj5Liq54K5ICovXHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9IGludGVyc2VjdGlvbnNbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSBwLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0xOyBpPGludGVyc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYWcgPSBpbnRlcnNlY3Rpb25zW2ldLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWcgPCBtaW5EaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBpbnRlcnNlY3Rpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IG1hZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZXN0UG9zID0gcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gZGVzdFBvcy5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICBsZXQgc3BlZWQgPSA1MDtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoY2MubW92ZVRvKGRpc3RhbmNlL3NwZWVkLCBkZXN0UG9zKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIC8qKiDniIbngrggKi9cclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ib29tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYm9vbSgpe1xyXG4gICAgICAgIGxldCBleHBsb3NpdmVIdW9KaWFuVG9uZyA9IHRoaXMuX2dhbWVFeHBsb3NpdmVzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUV4cGxvc2l2ZSg5KTtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ub2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGV4cGxvc2l2ZUh1b0ppYW5Ub25nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ub2RlLnNjYWxlID0gMC41O1xyXG4gICAgICAgIGV4cGxvc2l2ZUh1b0ppYW5Ub25nLm5vZGUucm90YXRpb24gPSBNYXRoLnJhbmRvbSgpKjM2MDtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ib29tKCk7XHJcbiAgICAgICAgR2FtZVByb3h5LmVtaXQoR2FtZVByb3h5LkV2ZW50LlNoYWtlU2NyZWVuLCAwLjA4LCAyLCAyKTtcclxuICAgIH1cclxufVxyXG4iXX0=