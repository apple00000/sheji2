"use strict";
cc._RF.push(module, 'a2bbdzy4UJJ65VrnqbThiRb', 'View');
// framework/component/View.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var Extend_1 = require("../extend/Extend");
var Facade_1 = require("../facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startCommandName = "";
        _this.adapterIphoneX = [];
        _this.targetToCanvas = [];
        _this.screenSize = [];
        _this.releasePrefab = false;
        return _this;
    }
    View_1 = View;
    View.prototype.onLoad = function () {
        if (Extend_1.ext.isIphoneX) {
            this.adapterIphoneX.forEach(function (value) { return value.top += View_1.IPHONEX_TOP_BLACK_HEIGHT; });
        }
        this.targetToCanvas.forEach(function (value) { return value.target = Facade_1.default.canvasNode; });
        this.screenSize.forEach(function (value) { return value.setContentSize(Facade_1.default.canvasNode.getContentSize()); });
    };
    View.prototype.start = function () {
        if (this.startCommandName != "") {
            Facade_1.default.executeCommand(this.startCommandName);
        }
    };
    View.prototype.onDestroy = function () {
        if (this.releasePrefab) {
            Facade_1.default.releasePrefab("prefab/" + this.node.name);
        }
    };
    /**
     * @param data commandName
     * */
    View.prototype.closeView = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof data == "string" && data != "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Facade_1.default.executeCommand(data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Facade_1.default.executeCommand("CloseViewCommand", this.node)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data commandName
     * */
    View.prototype.closeViewWithClickSound = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        View_1.executeClickSoundCommand(event, data);
                        return [4 /*yield*/, this.closeView(event, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data prefabName
     * */
    View.prototype.openView = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Facade_1.default.executeCommand("OpenViewCommand", data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data prefabName
     * */
    View.prototype.openViewWithClickSound = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        View_1.executeClickSoundCommand(event, data);
                        return [4 /*yield*/, this.openView(event, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data sceneName
     * */
    View.prototype.loadScene = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Facade_1.default.executeCommand("LoadSceneCommand", data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data sceneName
     * */
    View.prototype.loadSceneWithClickSound = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        View_1.executeClickSoundCommand(event, data);
                        return [4 /*yield*/, Facade_1.default.executeCommand("LoadSceneCommand", data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data commandName
     * */
    View.prototype.executeCommand = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Facade_1.default.executeCommand(data, event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param data commandName
     * */
    View.prototype.executeCommandWithClickSound = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        View_1.executeClickSoundCommand(event, data);
                        return [4 /*yield*/, this.executeCommand(event, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击按钮时播放声音
     * */
    View.executeClickSoundCommand = function (event, data) {
        if (View_1.clickSoundCommand) {
            Facade_1.default.executeCommand(View_1.clickSoundCommand, event, data);
        }
    };
    var View_1;
    View.clickSoundCommand = null;
    View.IPHONEX_TOP_BLACK_HEIGHT = 66;
    __decorate([
        property({ displayName: "启动命令", tooltip: "加载成功后执行启动命令" })
    ], View.prototype, "startCommandName", void 0);
    __decorate([
        property({ type: cc.Widget, displayName: "适配IphoneX", tooltip: "widget.top += 66" })
    ], View.prototype, "adapterIphoneX", void 0);
    __decorate([
        property({ type: cc.Widget, displayName: "绑定Canvas", tooltip: "widget.target=canvas" })
    ], View.prototype, "targetToCanvas", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "设置屏幕大小", tooltip: "node.setContentSize(screenSize)" })
    ], View.prototype, "screenSize", void 0);
    __decorate([
        property
    ], View.prototype, "releasePrefab", void 0);
    View = View_1 = __decorate([
        ccclass,
        menu("自定义/View")
    ], View);
    return View;
}(cc.Component));
exports.default = View;

cc._RF.pop();