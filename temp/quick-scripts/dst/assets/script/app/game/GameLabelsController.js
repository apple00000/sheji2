
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameLabelsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7e2bT6UTxOj6t7XhqyjcZH', 'GameLabelsController');
// script/app/game/GameLabelsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLabelsController = /** @class */ (function (_super) {
    __extends(GameLabelsController, _super);
    function GameLabelsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelLayer = null;
        _this.templateLabel = null;
        return _this;
    }
    GameLabelsController.prototype.onLoad = function () {
        window['GameLabelsController'] = this;
    };
    GameLabelsController.prototype.genLabel = function () {
        var labelNode = cc.instantiate(this.templateLabel.node);
        labelNode.active = false;
        this.labelLayer.addChild(labelNode);
        return labelNode.getComponent(cc.Label);
    };
    GameLabelsController.prototype.getInactiveLabel = function () {
        var findNode = this.labelLayer.children.find(function (value) { return value.active == false && value.getComponent(cc.Label); });
        if (findNode) {
            return findNode.getComponent(cc.Label);
        }
        else {
            return this.genLabel();
        }
    };
    /** 飘字 */
    GameLabelsController.prototype.fly = function (str, pos) {
        var label = this.getInactiveLabel();
        label.node.active = true;
        label.string = str;
        label.node.position = pos;
        label.node.color = cc.Color.RED;
        label.node.scale = 0;
        label.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.fadeTo(0.1, 255), cc.moveBy(0.1, cc.v2(0, 10))), cc.delayTime(0.1), cc.spawn(cc.moveBy(0.3, cc.v2(0, 30)), cc.fadeTo(0.3, 100)), cc.callFunc(function () {
            label.node.active = false;
        })));
    };
    __decorate([
        property(cc.Node)
    ], GameLabelsController.prototype, "labelLayer", void 0);
    __decorate([
        property(cc.Label)
    ], GameLabelsController.prototype, "templateLabel", void 0);
    GameLabelsController = __decorate([
        ccclass
    ], GameLabelsController);
    return GameLabelsController;
}(cc.Component));
exports.default = GameLabelsController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZUxhYmVsc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtELHdDQUFZO0lBQTlEO1FBQUEscUVBMENDO1FBdkNHLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQVksSUFBSSxDQUFDOztJQW9DbEMsQ0FBQztJQWxDRyxxQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzFDLENBQUM7SUFHTyx1Q0FBUSxHQUFoQjtRQUNJLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBckQsQ0FBcUQsQ0FBQyxDQUFDO1FBQzdHLElBQUksUUFBUSxFQUFDO1lBQ1QsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQzthQUFLO1lBQ0YsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNULGtDQUFHLEdBQUgsVUFBSSxHQUFVLEVBQUUsR0FBVztRQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRWhDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUMxTSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXRDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0RBQ1c7SUFOYixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQTBDeEM7SUFBRCwyQkFBQztDQTFDRCxBQTBDQyxDQTFDaUQsRUFBRSxDQUFDLFNBQVMsR0EwQzdEO2tCQTFDb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxhYmVsc0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFiZWxMYXllcjpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0ZW1wbGF0ZUxhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB3aW5kb3dbJ0dhbWVMYWJlbHNDb250cm9sbGVyJ10gPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdlbkxhYmVsKCk6Y2MuTGFiZWx7XHJcbiAgICAgICAgbGV0IGxhYmVsTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVtcGxhdGVMYWJlbC5ub2RlKTtcclxuICAgICAgICBsYWJlbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYWJlbExheWVyLmFkZENoaWxkKGxhYmVsTm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEluYWN0aXZlTGFiZWwoKTpjYy5MYWJlbHtcclxuICAgICAgICBsZXQgZmluZE5vZGUgPSB0aGlzLmxhYmVsTGF5ZXIuY2hpbGRyZW4uZmluZCh2YWx1ZSA9PiB2YWx1ZS5hY3RpdmUgPT0gZmFsc2UgJiYgdmFsdWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XHJcbiAgICAgICAgaWYgKGZpbmROb2RlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmROb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5MYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6aOY5a2XICovXHJcbiAgICBmbHkoc3RyOnN0cmluZywgcG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMuZ2V0SW5hY3RpdmVMYWJlbCgpO1xyXG4gICAgICAgIGxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBzdHI7XHJcbiAgICAgICAgbGFiZWwubm9kZS5wb3NpdGlvbiA9IHBvcztcclxuICAgICAgICBsYWJlbC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG5cclxuICAgICAgICBsYWJlbC5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICBsYWJlbC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zcGF3bihjYy5zY2FsZVRvKDAuMSwgMSksIGNjLmZhZGVUbygwLjEsIDI1NSksIGNjLm1vdmVCeSgwLjEsIGNjLnYyKDAsIDEwKSkpLCBjYy5kZWxheVRpbWUoMC4xKSwgY2Muc3Bhd24oY2MubW92ZUJ5KDAuMywgY2MudjIoMCwgMzApKSwgY2MuZmFkZVRvKDAuMywgMTAwKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIGxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=