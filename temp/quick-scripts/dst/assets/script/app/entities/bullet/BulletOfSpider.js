
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfSpider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3c259gWcuxDorUu2dpLcxFV', 'BulletOfSpider');
// script/app/entities/bullet/BulletOfSpider.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletOfEnemy_1 = require("./BulletOfEnemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfSpider = /** @class */ (function (_super) {
    __extends(BulletOfSpider, _super);
    function BulletOfSpider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        return _this;
    }
    BulletOfSpider.prototype.init = function (id) {
        var _this = this;
        _super.prototype.init.call(this, id);
        this.bThrought = true;
        this.ske = this.getComponent(sp.Skeleton);
        this.ske.setCompleteListener(function () {
            _this.node.active = false;
        });
    };
    BulletOfSpider.prototype.boom = function () {
        this.ske.setAnimation(0, "slow", false);
    };
    BulletOfSpider = __decorate([
        ccclass
    ], BulletOfSpider);
    return BulletOfSpider;
}(BulletOfEnemy_1.default));
exports.default = BulletOfSpider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZlNwaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFhO0lBQXpEO1FBQUEscUVBaUJDO1FBZkcsU0FBRyxHQUFlLElBQUksQ0FBQzs7SUFlM0IsQ0FBQztJQVpHLDZCQUFJLEdBQUosVUFBSyxFQUFVO1FBQWYsaUJBT0M7UUFORyxpQkFBTSxJQUFJLFlBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7WUFDekIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFoQmdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpQmxDO0lBQUQscUJBQUM7Q0FqQkQsQUFpQkMsQ0FqQjJDLHVCQUFhLEdBaUJ4RDtrQkFqQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldE9mRW5lbXkgZnJvbSBcIi4vQnVsbGV0T2ZFbmVteVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPZlNwaWRlciBleHRlbmRzIEJ1bGxldE9mRW5lbXkge1xyXG5cclxuICAgIHNrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIGluaXQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQoaWQpO1xyXG4gICAgICAgIHRoaXMuYlRocm91Z2h0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNrZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGJvb20oKXtcclxuICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24oMCwgXCJzbG93XCIsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=