"use strict";
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