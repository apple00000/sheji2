"use strict";
cc._RF.push(module, 'b427fLK8OtPeZpFZCOu+9Mi', 'CloseViewCommand');
// framework/facade/CloseViewCommand.ts

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
var CloseViewCommand = /** @class */ (function () {
    function CloseViewCommand() {
    }
    CloseViewCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var node = args[0];
                        if (typeof node == "string") {
                            node = Facade_1.default.canvasNode.getChildByName(node);
                        }
                        if (node) {
                            node.destroy();
                        }
                        resolve();
                    })];
            });
        });
    };
    CloseViewCommand = __decorate([
        ccclass("CloseViewCommand")
    ], CloseViewCommand);
    return CloseViewCommand;
}());
exports.default = CloseViewCommand;

cc._RF.pop();