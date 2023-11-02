"use strict";
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