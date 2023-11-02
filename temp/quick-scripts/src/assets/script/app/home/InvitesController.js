"use strict";
cc._RF.push(module, '0e6831yPJtIjo1qDNuGnPS0', 'InvitesController');
// script/app/home/InvitesController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TableViewMediator_1 = require("../../../framework/tableview/TableViewMediator");
var NetworkConfig_1 = require("../config/NetworkConfig");
var Network_1 = require("../network/Network");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InvitesController = /** @class */ (function (_super) {
    __extends(InvitesController, _super);
    function InvitesController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableviewMediator = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    InvitesController.prototype.onLoad = function () {
        var _this = this;
        if (NetworkConfig_1.NetworkConfig.connectServer) {
            Network_1.default.getShareList("share1").then(function (list) {
                console.log(list, "share1===>");
                _this.tableviewMediator.datas = list;
            });
        }
    };
    __decorate([
        property(TableViewMediator_1.default)
    ], InvitesController.prototype, "tableviewMediator", void 0);
    InvitesController = __decorate([
        ccclass
    ], InvitesController);
    return InvitesController;
}(cc.Component));
exports.default = InvitesController;

cc._RF.pop();