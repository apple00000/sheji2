
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameExplosivesController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89858T6hXVPE6i2+IlNrBWF', 'GameExplosivesController');
// script/app/game/GameExplosivesController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Explosive_1 = require("../entities/explosive/Explosive");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameExplosivesController = /** @class */ (function (_super) {
    __extends(GameExplosivesController, _super);
    function GameExplosivesController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.explosiveLayer = null;
        _this._explosiveMap = new Map();
        return _this;
    }
    GameExplosivesController.prototype.genExplosive = function (id) {
        var prefabPath = 'prefab/entities/explosive/explosive' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.explosiveLayer.addChild(node);
        var explosive = node.getComponent(Explosive_1.default);
        explosive.init(id);
        var arr = this._explosiveMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._explosiveMap.set(id, arr);
        }
        arr.push(explosive);
        node.active = false;
        return explosive;
    };
    GameExplosivesController.prototype.getInactiveExplosive = function (id) {
        var result = undefined;
        var arr = this._explosiveMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genExplosive(id);
        }
        return result;
    };
    __decorate([
        property(cc.Node)
    ], GameExplosivesController.prototype, "explosiveLayer", void 0);
    GameExplosivesController = __decorate([
        ccclass
    ], GameExplosivesController);
    return GameExplosivesController;
}(cc.Component));
exports.default = GameExplosivesController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUV4cGxvc2l2ZXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2REFBd0Q7QUFFbEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0QsNENBQVk7SUFBbEU7UUFBQSxxRUFtQ0M7UUFoQ0csb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFFdEIsbUJBQWEsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0FBQzs7SUE4QmhFLENBQUM7SUE1QlcsK0NBQVksR0FBcEIsVUFBcUIsRUFBUztRQUMxQixJQUFJLFVBQVUsR0FBRyxxQ0FBcUMsR0FBQyxFQUFFLENBQUM7UUFDMUQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO1FBQ3hELFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUM7WUFDMUIsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELHVEQUFvQixHQUFwQixVQUFxQixFQUFTO1FBQzFCLElBQUksTUFBTSxHQUFhLFNBQVMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBQztZQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxPQUFPLE1BQU0sSUFBSSxXQUFXLEVBQUM7WUFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBL0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0VBQ1k7SUFIYix3QkFBd0I7UUFENUMsT0FBTztPQUNhLHdCQUF3QixDQW1DNUM7SUFBRCwrQkFBQztDQW5DRCxBQW1DQyxDQW5DcUQsRUFBRSxDQUFDLFNBQVMsR0FtQ2pFO2tCQW5Db0Isd0JBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBFeHBsb3NpdmUgZnJvbSBcIi4uL2VudGl0aWVzL2V4cGxvc2l2ZS9FeHBsb3NpdmVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUV4cGxvc2l2ZXNDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGV4cGxvc2l2ZUxheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2V4cGxvc2l2ZU1hcCA9IG5ldyBNYXA8bnVtYmVyLCBBcnJheTxFeHBsb3NpdmU+PigpO1xyXG5cclxuICAgIHByaXZhdGUgZ2VuRXhwbG9zaXZlKGlkOm51bWJlcik6RXhwbG9zaXZle1xyXG4gICAgICAgIGxldCBwcmVmYWJQYXRoID0gJ3ByZWZhYi9lbnRpdGllcy9leHBsb3NpdmUvZXhwbG9zaXZlJytpZDtcclxuICAgICAgICBsZXQgZW50aXR5UHJlZmFiID0gY2MubG9hZGVyLmdldFJlcyhwcmVmYWJQYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoZW50aXR5UHJlZmFiKTtcclxuICAgICAgICB0aGlzLmV4cGxvc2l2ZUxheWVyLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGxldCBleHBsb3NpdmUgPSA8RXhwbG9zaXZlPm5vZGUuZ2V0Q29tcG9uZW50KEV4cGxvc2l2ZSk7XHJcbiAgICAgICAgZXhwbG9zaXZlLmluaXQoaWQpO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLl9leHBsb3NpdmVNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyciA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgYXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2V4cGxvc2l2ZU1hcC5zZXQoaWQsIGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5wdXNoKGV4cGxvc2l2ZSk7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gZXhwbG9zaXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEluYWN0aXZlRXhwbG9zaXZlKGlkOm51bWJlcik6RXhwbG9zaXZle1xyXG4gICAgICAgIGxldCByZXN1bHQ6RXhwbG9zaXZlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLl9leHBsb3NpdmVNYXAuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyciAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyci5maW5kKHZhbHVlID0+IHZhbHVlLm5vZGUuYWN0aXZlID09IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2VuRXhwbG9zaXZlKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG4iXX0=