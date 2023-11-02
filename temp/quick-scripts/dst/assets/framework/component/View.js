
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/View.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBR25HLDJDQUFxQztBQUNyQywyQ0FBc0M7QUFFaEMsSUFBQSxLQUE0QixFQUFFLENBQUMsVUFBVSxFQUF4QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWlCLENBQUM7QUFJaEQ7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFzSEM7UUEvR0csc0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBR3RCLG9CQUFjLEdBQWUsRUFBRSxDQUFDO1FBR2hDLG9CQUFjLEdBQWUsRUFBRSxDQUFDO1FBR2hDLGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBRzFCLG1CQUFhLEdBQUcsS0FBSyxDQUFDOztJQW1HMUIsQ0FBQzthQXRIb0IsSUFBSTtJQXFCckIscUJBQU0sR0FBTjtRQUNJLElBQUksWUFBRyxDQUFDLFNBQVMsRUFBQztZQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEdBQUcsSUFBSSxNQUFJLENBQUMsd0JBQXdCLEVBQTFDLENBQTBDLENBQUMsQ0FBQztTQUNwRjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDLFVBQVUsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsQ0FB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O0tBQzFDO0lBR0Q7O1NBRUs7SUFDRSw2QkFBd0IsR0FBL0IsVUFBZ0MsS0FBSyxFQUFFLElBQUk7UUFDdkMsSUFBSSxNQUFJLENBQUMsaUJBQWlCLEVBQUM7WUFDdkIsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsTUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RDtJQUNMLENBQUM7O0lBL0dNLHNCQUFpQixHQUFVLElBQUksQ0FBQztJQUVoQyw2QkFBd0IsR0FBRyxFQUFFLENBQUM7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxhQUFhLEVBQUMsQ0FBQztrREFDaEM7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxDQUFDO2dEQUNoRDtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLENBQUM7Z0RBQ25EO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsaUNBQWlDLEVBQUMsQ0FBQzs0Q0FDaEU7SUFHMUI7UUFEQyxRQUFROytDQUNhO0lBbkJMLElBQUk7UUFGeEIsT0FBTztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUM7T0FDSSxJQUFJLENBc0h4QjtJQUFELFdBQUM7Q0F0SEQsQUFzSEMsQ0F0SGlDLEVBQUUsQ0FBQyxTQUFTLEdBc0g3QztrQkF0SG9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5pbXBvcnQge2V4dH0gZnJvbSBcIi4uL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi4vZmFjYWRlL0ZhY2FkZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5LCBtZW51fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIuiHquWumuS5iS9WaWV3XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBjbGlja1NvdW5kQ29tbWFuZDpzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHN0YXRpYyBJUEhPTkVYX1RPUF9CTEFDS19IRUlHSFQgPSA2NjtcclxuXHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5ZCv5Yqo5ZG95LukXCIsIHRvb2x0aXA6XCLliqDovb3miJDlip/lkI7miafooYzlkK/liqjlkb3ku6RcIn0pXHJcbiAgICBzdGFydENvbW1hbmROYW1lID0gXCJcIjtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuV2lkZ2V0LCBkaXNwbGF5TmFtZTpcIumAgumFjUlwaG9uZVhcIiwgdG9vbHRpcDpcIndpZGdldC50b3AgKz0gNjZcIn0pXHJcbiAgICBhZGFwdGVySXBob25lWDpbY2MuV2lkZ2V0XSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5XaWRnZXQsIGRpc3BsYXlOYW1lOlwi57uR5a6aQ2FudmFzXCIsIHRvb2x0aXA6XCJ3aWRnZXQudGFyZ2V0PWNhbnZhc1wifSlcclxuICAgIHRhcmdldFRvQ2FudmFzOltjYy5XaWRnZXRdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsIGRpc3BsYXlOYW1lOlwi6K6+572u5bGP5bmV5aSn5bCPXCIsIHRvb2x0aXA6XCJub2RlLnNldENvbnRlbnRTaXplKHNjcmVlblNpemUpXCJ9KVxyXG4gICAgc2NyZWVuU2l6ZTpbY2MuTm9kZV0gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHJlbGVhc2VQcmVmYWIgPSBmYWxzZTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICBpZiAoZXh0LmlzSXBob25lWCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcklwaG9uZVguZm9yRWFjaCh2YWx1ZSA9PiB2YWx1ZS50b3AgKz0gVmlldy5JUEhPTkVYX1RPUF9CTEFDS19IRUlHSFQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhcmdldFRvQ2FudmFzLmZvckVhY2godmFsdWUgPT4gdmFsdWUudGFyZ2V0ID0gRmFjYWRlLmNhbnZhc05vZGUpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuU2l6ZS5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLnNldENvbnRlbnRTaXplKEZhY2FkZS5jYW52YXNOb2RlLmdldENvbnRlbnRTaXplKCkpKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRDb21tYW5kTmFtZSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKHRoaXMuc3RhcnRDb21tYW5kTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIGlmICh0aGlzLnJlbGVhc2VQcmVmYWIpe1xyXG4gICAgICAgICAgICBGYWNhZGUucmVsZWFzZVByZWZhYihcInByZWZhYi9cIit0aGlzLm5vZGUubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGRhdGEgY29tbWFuZE5hbWVcclxuICAgICAqICovXHJcbiAgIGFzeW5jIGNsb3NlVmlldyhldmVudCwgZGF0YSl7XHJcbiAgICAgICBpZih0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiICYmIGRhdGEgIT0gXCJcIil7XHJcbiAgICAgICAgICAgYXdhaXQgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKGRhdGEpO1xyXG4gICAgICAgfVxyXG4gICAgICAgYXdhaXQgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiQ2xvc2VWaWV3Q29tbWFuZFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGRhdGEgY29tbWFuZE5hbWVcclxuICAgICAqICovXHJcbiAgICBhc3luYyBjbG9zZVZpZXdXaXRoQ2xpY2tTb3VuZChldmVudCwgZGF0YSl7XHJcbiAgICAgICAgVmlldy5leGVjdXRlQ2xpY2tTb3VuZENvbW1hbmQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2VWaWV3KGV2ZW50LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBkYXRhIHByZWZhYk5hbWVcclxuICAgICAqICovXHJcbiAgICBhc3luYyBvcGVuVmlldyhldmVudCwgZGF0YSl7XHJcbiAgICAgICAgYXdhaXQgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiT3BlblZpZXdDb21tYW5kXCIsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGRhdGEgcHJlZmFiTmFtZVxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIG9wZW5WaWV3V2l0aENsaWNrU291bmQoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIFZpZXcuZXhlY3V0ZUNsaWNrU291bmRDb21tYW5kKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICBhd2FpdCB0aGlzLm9wZW5WaWV3KGV2ZW50LCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBkYXRhIHNjZW5lTmFtZVxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIGxvYWRTY2VuZShldmVudCwgZGF0YSl7XHJcbiAgICAgICAgYXdhaXQgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiTG9hZFNjZW5lQ29tbWFuZFwiLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBkYXRhIHNjZW5lTmFtZVxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIGxvYWRTY2VuZVdpdGhDbGlja1NvdW5kKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBWaWV3LmV4ZWN1dGVDbGlja1NvdW5kQ29tbWFuZChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgYXdhaXQgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiTG9hZFNjZW5lQ29tbWFuZFwiLCBkYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBjb21tYW5kTmFtZVxyXG4gICAgICogKi9cclxuICAgIGFzeW5jIGV4ZWN1dGVDb21tYW5kKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBhd2FpdCBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoZGF0YSwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGRhdGEgY29tbWFuZE5hbWVcclxuICAgICAqICovXHJcbiAgICBhc3luYyBleGVjdXRlQ29tbWFuZFdpdGhDbGlja1NvdW5kKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBWaWV3LmV4ZWN1dGVDbGlja1NvdW5kQ29tbWFuZChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjdXRlQ29tbWFuZChldmVudCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75oyJ6ZKu5pe25pKt5pS+5aOw6Z+zXHJcbiAgICAgKiAqL1xyXG4gICAgc3RhdGljIGV4ZWN1dGVDbGlja1NvdW5kQ29tbWFuZChldmVudCwgZGF0YSl7XHJcbiAgICAgICAgaWYgKFZpZXcuY2xpY2tTb3VuZENvbW1hbmQpe1xyXG4gICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoVmlldy5jbGlja1NvdW5kQ29tbWFuZCwgZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19