"use strict";
cc._RF.push(module, '1d21aRvW3dDg4Q92XfCz8Of', 'ShowDialogCommand');
// framework/dialog/ShowDialogCommand.ts

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
var Facade_1 = require("../facade/Facade");
var LifeCycle_1 = require("../component/LifeCycle");
var DialogMediator_1 = require("./DialogMediator");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowDialogCommand = /** @class */ (function () {
    function ShowDialogCommand() {
    }
    ShowDialogCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var separationLayer, prefab, node, obj, mediator, key, attr, res, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    separationLayer = Facade_1.default.addSeparationLayer(args[1], args[2]);
                                    return [4 /*yield*/, cc.loader.loadResAwait(DialogMediator_1.default.dialogPrefabName, cc.Prefab)];
                                case 1:
                                    prefab = _a.sent();
                                    node = cc.instantiate(prefab);
                                    node.setParent(Facade_1.default.canvasNode);
                                    LifeCycle_1.default.onDestroyFollow(separationLayer, node);
                                    obj = args[0];
                                    mediator = node.getComponent(DialogMediator_1.default);
                                    for (key in obj) {
                                        if (obj[key] != null && typeof obj[key] != "function") {
                                            for (attr in obj[key]) {
                                                mediator[key][attr] = obj[key][attr];
                                            }
                                        }
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, node.onceAwait("clickButton")];
                                case 3:
                                    res = _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ShowDialogCommand = __decorate([
        ccclass("ShowDialogCommand")
    ], ShowDialogCommand);
    return ShowDialogCommand;
}());
exports.default = ShowDialogCommand;

cc._RF.pop();