
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/TopController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60d27bwvCFAMqFkoQdcCoGl', 'TopController');
// script/app/home/TopController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var Extend_1 = require("../../../framework/extend/Extend");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TopController = /** @class */ (function (_super) {
    __extends(TopController, _super);
    function TopController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goldLabel = null;
        _this.lvLabels = [];
        return _this;
    }
    TopController.prototype.init = function () {
        this.lvLabels.forEach(function (value, index) { return value.string = "<b><outline color=#1e1e1e width=3>" + (World_1.World.Storage.gameLevel - 1 + index) + "</outline></b>"; });
        if (World_1.World.Storage.gameLevel < 2) {
            this.lvLabels[0].node.getParent().active = false;
        }
        this.updateView();
    };
    TopController.prototype.onLoad = function () {
        Facade_1.default.canvasNode.on("UpdateStorage", this.onUpdateStorageEvent, this);
        this.init();
    };
    TopController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off("UpdateStorage", this.onUpdateStorageEvent, this);
    };
    TopController.prototype.onUpdateStorageEvent = function (key) {
        if (key == "power") {
        }
        else if (key == "goldCount") {
            this.goldLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(World_1.World.Storage.goldCount) + "</outline></b>";
        }
        else if (key == "diamondCount") {
        }
    };
    TopController.prototype.updateView = function () {
        this.goldLabel.string = "<b><outline color=#1e1e1e width=3>" + Extend_1.ext.shortFormat(World_1.World.Storage.goldCount) + "</outline></b>";
    };
    TopController.prototype.onClickPlus = function (vent, data) {
        return __awaiter(this, void 0, void 0, function () {
            var node, exchangeController;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("【click】TopController Plus");
                        data = parseInt(data);
                        return [4 /*yield*/, Facade_1.default.executeCommand("OpenViewCommand", "prefab/exchange")];
                    case 1:
                        node = (_a.sent())[0];
                        exchangeController = node.getComponent("ExchangeController");
                        exchangeController.type = data;
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.RichText)
    ], TopController.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], TopController.prototype, "lvLabels", void 0);
    TopController = __decorate([
        ccclass
    ], TopController);
    return TopController;
}(cc.Component));
exports.default = TopController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvVG9wQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQW9DO0FBQ3BDLDJEQUFxRDtBQUNyRCwyREFBc0Q7QUFJaEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE2Q0M7UUExQ0csZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWtCLEVBQUUsQ0FBQzs7SUF1Q2pDLENBQUM7SUFyQ0csNEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEdBQUcsd0NBQXFDLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFDLENBQUMsR0FBQyxLQUFLLG9CQUFnQixFQUFuRyxDQUFtRyxDQUFDLENBQUM7UUFDN0ksSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNJLGdCQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLGdCQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw0Q0FBb0IsR0FBcEIsVUFBcUIsR0FBVTtRQUMzQixJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUM7U0FDbEI7YUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsdUNBQXFDLFlBQUcsQ0FBQyxXQUFXLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsbUJBQWdCLENBQUM7U0FDekg7YUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFjLEVBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHVDQUFxQyxZQUFHLENBQUMsV0FBVyxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLG1CQUFnQixDQUFDO0lBQzFILENBQUM7SUFFSyxtQ0FBVyxHQUFqQixVQUFrQixJQUFJLEVBQUUsSUFBSTs7Ozs7O3dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7d0JBRXhDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ1QscUJBQU0sZ0JBQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsRUFBQTs7d0JBQXpFLElBQUksR0FBSSxDQUFBLFNBQWlFLENBQUEsR0FBckU7d0JBQ0wsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUNqRSxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7OztLQUNsQztJQXpDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO29EQUNPO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7bURBQ087SUFOWixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkNqQztJQUFELG9CQUFDO0NBN0NELEFBNkNDLENBN0MwQyxFQUFFLENBQUMsU0FBUyxHQTZDdEQ7a0JBN0NvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9GYWNhZGVcIjtcclxuaW1wb3J0IEV4Y2hhbmdlQ29udHJvbGxlciBmcm9tIFwiLi9FeGNoYW5nZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IExvYWRpbmdDb21tYW5kIGZyb20gXCIuL0xvYWRpbmdDb21tYW5kXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcENvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGdvbGRMYWJlbDpjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgbHZMYWJlbHM6IFtjYy5SaWNoVGV4dF0gPSBbXTtcclxuXHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5sdkxhYmVscy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbC0xK2luZGV4fTwvb3V0bGluZT48L2I+YCk7XHJcbiAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZ2FtZUxldmVsIDwgMil7XHJcbiAgICAgICAgICAgIHRoaXMubHZMYWJlbHNbMF0ubm9kZS5nZXRQYXJlbnQoKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5vbihcIlVwZGF0ZVN0b3JhZ2VcIiwgdGhpcy5vblVwZGF0ZVN0b3JhZ2VFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUub2ZmKFwiVXBkYXRlU3RvcmFnZVwiLCB0aGlzLm9uVXBkYXRlU3RvcmFnZUV2ZW50LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZVN0b3JhZ2VFdmVudChrZXk6c3RyaW5nKXtcclxuICAgICAgICBpZiAoa2V5ID09IFwicG93ZXJcIil7XHJcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT0gXCJnb2xkQ291bnRcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZExhYmVsLnN0cmluZyA9IGA8Yj48b3V0bGluZSBjb2xvcj0jMWUxZTFlIHdpZHRoPTM+JHtleHQuc2hvcnRGb3JtYXQoV29ybGQuU3RvcmFnZS5nb2xkQ291bnQpfTwvb3V0bGluZT48L2I+YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PSBcImRpYW1vbmRDb3VudFwiKXtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmlldygpIHtcclxuICAgICAgICB0aGlzLmdvbGRMYWJlbC5zdHJpbmcgPSBgPGI+PG91dGxpbmUgY29sb3I9IzFlMWUxZSB3aWR0aD0zPiR7ZXh0LnNob3J0Rm9ybWF0KFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50KX08L291dGxpbmU+PC9iPmA7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25DbGlja1BsdXModmVudCwgZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJBjbGlja+OAkVRvcENvbnRyb2xsZXIgUGx1c1wiKVxyXG5cclxuICAgICAgICBkYXRhID0gcGFyc2VJbnQoZGF0YSk7XHJcbiAgICAgICAgbGV0IFtub2RlXSA9IGF3YWl0IEZhY2FkZS5leGVjdXRlQ29tbWFuZChcIk9wZW5WaWV3Q29tbWFuZFwiLCBcInByZWZhYi9leGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2VDb250cm9sbGVyID0gbm9kZS5nZXRDb21wb25lbnQoXCJFeGNoYW5nZUNvbnRyb2xsZXJcIik7XHJcbiAgICAgICAgZXhjaGFuZ2VDb250cm9sbGVyLnR5cGUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==