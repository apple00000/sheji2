
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/explosive/ExplosiveHuoJianTong.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2707dq5zzBBO4ixkxdjzf4B', 'ExplosiveHuoJianTong');
// script/app/entities/explosive/ExplosiveHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Explosive_1 = require("./Explosive");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExplosiveHuoJianTong = /** @class */ (function (_super) {
    __extends(ExplosiveHuoJianTong, _super);
    function ExplosiveHuoJianTong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._huojiantongSke = null;
        return _this;
    }
    ExplosiveHuoJianTong.prototype.init = function (id) {
        var _this = this;
        _super.prototype.init.call(this, id);
        this.bThrought = true;
        // this.hurt = 1;
        this._huojiantongSke = this.node.getComponent(sp.Skeleton);
        this._huojiantongSke.setCompleteListener(function (trackEntry, loopCount) {
            _this.node.active = false;
            /*let name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "perfect01" || name == "perfect02" || name == "great01" || name == "great02") {
            }*/
        });
    };
    ExplosiveHuoJianTong.prototype.boom = function () {
        this._huojiantongSke.setAnimation(0, "biubiu_009b", false);
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    ExplosiveHuoJianTong.prototype.doRepeal = function (enemy, repel) {
        enemy.doRepel(enemy.node.position.sub(this.node.position).normalize(), repel);
    };
    ExplosiveHuoJianTong = __decorate([
        ccclass
    ], ExplosiveHuoJianTong);
    return ExplosiveHuoJianTong;
}(Explosive_1.default));
exports.default = ExplosiveHuoJianTong;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2V4cGxvc2l2ZS9FeHBsb3NpdmVIdW9KaWFuVG9uZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQW9DO0FBQ3BDLGtEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrRCx3Q0FBUztJQUEzRDtRQUFBLHFFQTRCQztRQTFCVyxxQkFBZSxHQUFlLElBQUksQ0FBQzs7SUEwQi9DLENBQUM7SUF0QkcsbUNBQUksR0FBSixVQUFLLEVBQVU7UUFBZixpQkFXQztRQVZHLGlCQUFNLElBQUksWUFBQyxFQUFFLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFVBQUMsVUFBVSxFQUFFLFNBQVM7WUFDM0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3pCOztlQUVHO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QscUJBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHVDQUFRLEdBQVIsVUFBUyxLQUFLLEVBQUUsS0FBSztRQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUExQmdCLG9CQUFvQjtRQUR4QyxPQUFPO09BQ2Esb0JBQW9CLENBNEJ4QztJQUFELDJCQUFDO0NBNUJELEFBNEJDLENBNUJpRCxtQkFBUyxHQTRCMUQ7a0JBNUJvQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEV4cGxvc2l2ZSBmcm9tIFwiLi9FeHBsb3NpdmVcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBsb3NpdmVIdW9KaWFuVG9uZyBleHRlbmRzIEV4cGxvc2l2ZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaHVvamlhbnRvbmdTa2U6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdChpZCk7XHJcbiAgICAgICAgdGhpcy5iVGhyb3VnaHQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuaHVydCA9IDE7XHJcbiAgICAgICAgdGhpcy5faHVvamlhbnRvbmdTa2UgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9odW9qaWFudG9uZ1NrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvKmxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwicGVyZmVjdDAxXCIgfHwgbmFtZSA9PSBcInBlcmZlY3QwMlwiIHx8IG5hbWUgPT0gXCJncmVhdDAxXCIgfHwgbmFtZSA9PSBcImdyZWF0MDJcIikge1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBib29tKCkge1xyXG4gICAgICAgIHRoaXMuX2h1b2ppYW50b25nU2tlLnNldEFuaW1hdGlvbigwLCBcImJpdWJpdV8wMDliXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuU2hha2VTY3JlZW4sIDAuMDgsIDIsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvUmVwZWFsKGVuZW15LCByZXBlbCk6IHZvaWQge1xyXG4gICAgICAgIGVuZW15LmRvUmVwZWwoZW5lbXkubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemUoKSwgcmVwZWwpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=