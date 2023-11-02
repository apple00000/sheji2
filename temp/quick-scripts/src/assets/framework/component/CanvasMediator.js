"use strict";
cc._RF.push(module, '349a5CzWoFFmqjGbjcw5R0A', 'CanvasMediator');
// framework/component/CanvasMediator.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent;
var bLaunch = false;
var CanvasMediator = /** @class */ (function (_super) {
    __extends(CanvasMediator, _super);
    function CanvasMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scenePrefab = null;
        return _this;
    }
    CanvasMediator.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log(this);
                        Facade_1.default.canvasNode = this.node;
                        if (this.scenePrefab) {
                            node = cc.instantiate(this.scenePrefab);
                            node.setParent(this.node);
                        }
                        if (!!bLaunch) return [3 /*break*/, 2];
                        return [4 /*yield*/, Facade_1.default.executeCommand("StartupCommand")];
                    case 1:
                        result = (_a.sent())[0];
                        if (result) {
                            console.log("程序启动成功...");
                        }
                        else {
                            console.log("程序启动失败!!!");
                        }
                        bLaunch = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CanvasMediator.prototype.onDestroy = function () {
        Facade_1.default.canvasNode = null;
    };
    __decorate([
        property(cc.Prefab)
    ], CanvasMediator.prototype, "scenePrefab", void 0);
    CanvasMediator = __decorate([
        ccclass,
        menu("自定义/CanvasMediator"),
        requireComponent(cc.Canvas),
        executionOrder(-10)
    ], CanvasMediator);
    return CanvasMediator;
}(cc.Component));
exports.default = CanvasMediator;

cc._RF.pop();