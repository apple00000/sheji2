"use strict";
cc._RF.push(module, 'b27f8KHhAhEG5gWtv30iiyW', 'OpenViewCommand');
// framework/facade/OpenViewCommand.ts

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
var Facade_1 = require("./Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OpenViewCommand = /** @class */ (function () {
    function OpenViewCommand() {
    }
    OpenViewCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var prefabName, prefab, node;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    prefabName = args[0];
                                    if (!Facade_1.default.canvasNode.getChildByName(prefabName.substring(prefabName.lastIndexOf("/") + 1))) return [3 /*break*/, 1];
                                    console.error("\u6B64\u7A97\u53E3\u5DF2\u6253\u5F00===>" + prefabName, "或者是prefab根节点名称与其他prefab根节点名称冲突...规则：prefab名称要与该prefab根节点名称一致。");
                                    reject();
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, cc.loader.loadResAwait(prefabName, cc.Prefab)];
                                case 2:
                                    prefab = _a.sent();
                                    node = cc.instantiate(prefab);
                                    node.setParent(Facade_1.default.canvasNode);
                                    resolve(node);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    OpenViewCommand = __decorate([
        ccclass("OpenViewCommand")
    ], OpenViewCommand);
    return OpenViewCommand;
}());
exports.default = OpenViewCommand;

cc._RF.pop();