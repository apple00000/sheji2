
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/PropsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce3c5l6ZAlLkpyTmNdI0qJX', 'PropsController');
// script/app/home/PropsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TableViewMediator_1 = require("../../../framework/tableview/TableViewMediator");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropsController = /** @class */ (function (_super) {
    __extends(PropsController, _super);
    function PropsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableViewMediator = null;
        _this.detailNode = null;
        _this.detailLabel = null;
        return _this;
    }
    PropsController.prototype.start = function () {
        var _this = this;
        this.detailNode.on(cc.Node.EventType.TOUCH_START, function () {
            _this.detailNode.active = false;
        });
        this.tableViewMediator.datas = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop).filter(function (value) { return value['id'] != 7 && value['id'] != 8 && value['id'] != 10; }).sort(function (a, b) { return a['order'] - b['order']; });
    };
    __decorate([
        property(TableViewMediator_1.default)
    ], PropsController.prototype, "tableViewMediator", void 0);
    __decorate([
        property(cc.Node)
    ], PropsController.prototype, "detailNode", void 0);
    __decorate([
        property(cc.Label)
    ], PropsController.prototype, "detailLabel", void 0);
    PropsController = __decorate([
        ccclass
    ], PropsController);
    return PropsController;
}(cc.Component));
exports.default = PropsController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvUHJvcHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRkFBK0U7QUFDL0UscUVBQWtFO0FBQ2xFLDZEQUEwRDtBQUVwRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQW1CQztRQWhCRyx1QkFBaUIsR0FBcUIsSUFBSSxDQUFDO1FBRzNDLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQVVoQyxDQUFDO0lBUkcsK0JBQUssR0FBTDtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQzlDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBekQsQ0FBeUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDcE0sQ0FBQztJQWJEO1FBREMsUUFBUSxDQUFDLDJCQUFpQixDQUFDOzhEQUNlO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDUztJQVRYLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FtQm5DO0lBQUQsc0JBQUM7Q0FuQkQsQUFtQkMsQ0FuQjRDLEVBQUUsQ0FBQyxTQUFTLEdBbUJ4RDtrQkFuQm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFRhYmxlVmlld01lZGlhdG9yIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdGFibGV2aWV3L1RhYmxlVmlld01lZGlhdG9yXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wc0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShUYWJsZVZpZXdNZWRpYXRvcilcclxuICAgIHRhYmxlVmlld01lZGlhdG9yOlRhYmxlVmlld01lZGlhdG9yID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGRldGFpbE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgZGV0YWlsTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5kZXRhaWxOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50YWJsZVZpZXdNZWRpYXRvci5kYXRhcyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlByb3ApLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZVsnaWQnXSAhPSA3ICYmIHZhbHVlWydpZCddICE9IDggJiYgdmFsdWVbJ2lkJ10gIT0gMTApLnNvcnQoKGEsIGIpID0+IGFbJ29yZGVyJ10tYlsnb3JkZXInXSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=