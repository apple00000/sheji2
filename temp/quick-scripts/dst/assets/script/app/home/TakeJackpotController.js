
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/TakeJackpotController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '714fcJtcJtP9q86lkg3hnXM', 'TakeJackpotController');
// script/app/home/TakeJackpotController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var Extend_1 = require("../../../framework/extend/Extend");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TakeJackpotController = /** @class */ (function (_super) {
    __extends(TakeJackpotController, _super);
    function TakeJackpotController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.oneLabel = null;
        _this.threeLabel = null;
        _this.oneButtonNode = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    TakeJackpotController.prototype.onLoad = function () {
        this.updateView();
        Facade_1.default.canvasNode.on('UpdateStorage', this.onUpdateStorage, this);
        // this.oneBackgroundSprite.setMaterial(0, this.oneBackgroundSprite.getMaterial(1));
        // this.oneBackgroundSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        // this.oneButtonNode.active = false;
        // this.scheduleOnce(()=>this.oneButtonNode.active = true, 3);
    };
    TakeJackpotController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off('UpdateStorage', this.onUpdateStorage, this);
    };
    TakeJackpotController.prototype.onUpdateStorage = function (key) {
        if (key == "dayEarnTotal") {
            this.updateView();
        }
    };
    TakeJackpotController.prototype.updateView = function () {
        this.oneLabel.string = Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal);
        this.threeLabel.string = Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal * 3);
    };
    TakeJackpotController.prototype.onTakeIt = function (event, data) {
        data = parseInt(data);
        if (data == 1) {
            this.node.destroy();
            Facade_1.default.canvasNode.emit("TakeJackpot", 1);
        }
        else {
            /** 看广告 */
            this.node.destroy();
            Facade_1.default.canvasNode.emit("TakeJackpot", 3);
        }
    };
    __decorate([
        property(cc.Label)
    ], TakeJackpotController.prototype, "oneLabel", void 0);
    __decorate([
        property(cc.Label)
    ], TakeJackpotController.prototype, "threeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], TakeJackpotController.prototype, "oneButtonNode", void 0);
    TakeJackpotController = __decorate([
        ccclass
    ], TakeJackpotController);
    return TakeJackpotController;
}(cc.Component));
exports.default = TakeJackpotController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvVGFrZUphY2twb3RDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsMkRBQXFEO0FBQ3JELHVDQUFvQztBQUs5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQWlEQztRQTlDRyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQVcsSUFBSSxDQUFDOztJQXdDakMsQ0FBQztJQXRDRyx3QkFBd0I7SUFFeEIsc0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEUsb0ZBQW9GO1FBQ3BGLDZGQUE2RjtRQUM3RixxQ0FBcUM7UUFDckMsOERBQThEO0lBQ2xFLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0ksZ0JBQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLEdBQVU7UUFDdEIsSUFBSSxHQUFHLElBQUksY0FBYyxFQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsWUFBRyxDQUFDLFdBQVcsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFlBQUcsQ0FBQyxXQUFXLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxLQUFLLEVBQUUsSUFBSTtRQUNoQixJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxJQUFJLENBQUMsRUFBQztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QzthQUFLO1lBQ0YsVUFBVTtZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUE1Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZEQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0VBQ1c7SUFUWixxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQWlEekM7SUFBRCw0QkFBQztDQWpERCxBQWlEQyxDQWpEa0QsRUFBRSxDQUFDLFNBQVMsR0FpRDlEO2tCQWpEb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5pbXBvcnQge05ldHdvcmtDb25maWd9IGZyb20gXCIuLi9jb25maWcvTmV0d29ya0NvbmZpZ1wiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRha2VKYWNrcG90Q29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgb25lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0aHJlZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBvbmVCdXR0b25Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUub24oJ1VwZGF0ZVN0b3JhZ2UnLCB0aGlzLm9uVXBkYXRlU3RvcmFnZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5vbmVCYWNrZ3JvdW5kU3ByaXRlLnNldE1hdGVyaWFsKDAsIHRoaXMub25lQmFja2dyb3VuZFNwcml0ZS5nZXRNYXRlcmlhbCgxKSk7XHJcbiAgICAgICAgLy8gdGhpcy5vbmVCYWNrZ3JvdW5kU3ByaXRlLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyB0aGlzLm9uZUJ1dHRvbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCk9PnRoaXMub25lQnV0dG9uTm9kZS5hY3RpdmUgPSB0cnVlLCAzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5vZmYoJ1VwZGF0ZVN0b3JhZ2UnLCB0aGlzLm9uVXBkYXRlU3RvcmFnZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGVTdG9yYWdlKGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGlmIChrZXkgPT0gXCJkYXlFYXJuVG90YWxcIil7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5vbmVMYWJlbC5zdHJpbmcgPSBleHQuc2hvcnRGb3JtYXQoV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwpO1xyXG4gICAgICAgIHRoaXMudGhyZWVMYWJlbC5zdHJpbmcgPSBleHQuc2hvcnRGb3JtYXQoV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwqMyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UYWtlSXQoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGRhdGEgPSBwYXJzZUludChkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YSA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUuZW1pdChcIlRha2VKYWNrcG90XCIsIDEpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgLyoqIOeci+W5v+WRiiAqL1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5lbWl0KFwiVGFrZUphY2twb3RcIiwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=