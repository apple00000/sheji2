
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/InvitesController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvSW52aXRlc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9GQUErRTtBQUMvRSx5REFBc0Q7QUFDdEQsOENBQXlDO0FBRW5DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBZ0JDO1FBYkcsdUJBQWlCLEdBQXFCLElBQUksQ0FBQzs7SUFhL0MsQ0FBQztJQVZHLHdCQUF3QjtJQUN4QixrQ0FBTSxHQUFOO1FBQUEsaUJBT0M7UUFORyxJQUFJLDZCQUFhLENBQUMsYUFBYSxFQUFDO1lBQzVCLGlCQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQVhEO1FBREMsUUFBUSxDQUFDLDJCQUFpQixDQUFDO2dFQUNlO0lBSDFCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBZ0JyQztJQUFELHdCQUFDO0NBaEJELEFBZ0JDLENBaEI4QyxFQUFFLENBQUMsU0FBUyxHQWdCMUQ7a0JBaEJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFRhYmxlVmlld01lZGlhdG9yIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdGFibGV2aWV3L1RhYmxlVmlld01lZGlhdG9yXCI7XHJcbmltcG9ydCB7TmV0d29ya0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9OZXR3b3JrQ29uZmlnXCI7XHJcbmltcG9ydCBOZXR3b3JrIGZyb20gXCIuLi9uZXR3b3JrL05ldHdvcmtcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52aXRlc0NvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShUYWJsZVZpZXdNZWRpYXRvcilcclxuICAgIHRhYmxldmlld01lZGlhdG9yOlRhYmxlVmlld01lZGlhdG9yID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGlmIChOZXR3b3JrQ29uZmlnLmNvbm5lY3RTZXJ2ZXIpe1xyXG4gICAgICAgICAgICBOZXR3b3JrLmdldFNoYXJlTGlzdChcInNoYXJlMVwiKS50aGVuKGxpc3Q9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3QsIFwic2hhcmUxPT09PlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFibGV2aWV3TWVkaWF0b3IuZGF0YXMgPSBsaXN0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==