
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletHuoJianTong.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1a9acz1GRFM6HjLvTeZdOh', 'BulletHuoJianTong');
// script/app/entities/bullet/BulletHuoJianTong.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var World_1 = require("../../info/World");
var Music_1 = require("../../../../framework/audio/Music");
var ccclass = cc._decorator.ccclass;
var magnify = 1;
var BulletHuoJianTong = /** @class */ (function (_super) {
    __extends(BulletHuoJianTong, _super);
    function BulletHuoJianTong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletHuoJianTong.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletHuoJianTong.prototype.init = function (id) {
        this.bulletId = id;
    };
    BulletHuoJianTong.prototype.boom = function () {
        Music_1.Music.playSFX("sound/msc_g002");
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = magnify * World_1.World.My.armory.magnifyMul(explosiveHuoJianTong.bulletId);
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
    };
    BulletHuoJianTong.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)).easing(cc.easeQuadraticActionIn()), cc.callFunc(function () {
            _this.node.active = false;
            _this.boom();
        })));
    };
    BulletHuoJianTong.prototype.onCollisionEnter = function (other, self) {
        this.node.active = false;
        this.boom();
    };
    BulletHuoJianTong = __decorate([
        ccclass
    ], BulletHuoJianTong);
    return BulletHuoJianTong;
}(Bullet_1.default));
exports.default = BulletHuoJianTong;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRIdW9KaWFuVG9uZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQThCO0FBQzlCLDhEQUF5RDtBQUN6RCwwQ0FBdUM7QUFDdkMsMkRBQXdEO0FBRWpELElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBRWhDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUdsQjtJQUErQyxxQ0FBTTtJQUFyRDtRQUFBLHFFQXVDQztRQXBDVywrQkFBeUIsR0FBRyxJQUFJLENBQUM7O0lBb0M3QyxDQUFDO0lBakNHLGtDQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNJLGFBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoQyxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hELG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLGFBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDdkQsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUdELCtCQUFHLEdBQUgsVUFBSSxHQUFZLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQWpELGlCQU1DO1FBTEcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3pILEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUdELDRDQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsSUFBSTtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUF0Q2dCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBdUNyQztJQUFELHdCQUFDO0NBdkNELEFBdUNDLENBdkM4QyxnQkFBTSxHQXVDcEQ7a0JBdkNvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9GYWNhZGVcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3N9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IG1hZ25pZnkgPSAxO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0SHVvSmlhblRvbmcgZXh0ZW5kcyBCdWxsZXQge1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9nYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUV4cGxvc2l2ZXNDb250cm9sbGVyID0gRmFjYWRlLmZpbmRDb21wb25lbnQoXCJHYW1lU2NlbmVcIiwgXCJHYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRJZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGJvb20oKXtcclxuICAgICAgICBNdXNpYy5wbGF5U0ZYKFwic291bmQvbXNjX2cwMDJcIik7XHJcbiAgICAgICAgbGV0IGV4cGxvc2l2ZUh1b0ppYW5Ub25nID0gdGhpcy5fZ2FtZUV4cGxvc2l2ZXNDb250cm9sbGVyLmdldEluYWN0aXZlRXhwbG9zaXZlKDkpO1xyXG4gICAgICAgIGV4cGxvc2l2ZUh1b0ppYW5Ub25nLm5vZGUucG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgZXhwbG9zaXZlSHVvSmlhblRvbmcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGV4cGxvc2l2ZUh1b0ppYW5Ub25nLm5vZGUuc2NhbGUgPSBtYWduaWZ5ICogV29ybGQuTXkuYXJtb3J5Lm1hZ25pZnlNdWwoZXhwbG9zaXZlSHVvSmlhblRvbmcuYnVsbGV0SWQpO1xyXG4gICAgICAgIGV4cGxvc2l2ZUh1b0ppYW5Ub25nLm5vZGUucm90YXRpb24gPSBNYXRoLnJhbmRvbSgpKjM2MDtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ib29tKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZseShkaXI6IGNjLlZlYzIsIGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSA5MCAtIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKGRpci55LCBkaXIueCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KGRpc3RhbmNlL3NwZWVkLCBkaXIubXVsKGRpc3RhbmNlKSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25JbigpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJvb20oKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm9vbSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==