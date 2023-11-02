"use strict";
cc._RF.push(module, '5a011mWwutAHI4SKXF9o6cQ', 'ShowTipsCommand');
// script/app/tips/ShowTipsCommand.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Extend_1 = require("../../../framework/extend/Extend");
var View_1 = require("../../../framework/component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowTipsCommand = /** @class */ (function () {
    function ShowTipsCommand() {
    }
    ShowTipsCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.loader.loadRes('prefab/tips', cc.Prefab, function (error, resource) {
                            if (error == null) {
                                var node_1 = cc.instantiate(resource);
                                var titleLabel = node_1.getChildByName('title').getComponent(cc.RichText);
                                var string = args[0] || "您忘记传参数喽";
                                titleLabel.string = "<b><outline color=#1e1e1e width=3>" + string.replace(">", "》").replace("<", "《") + "</outline></b>";
                                if (cc.director.getScene()) {
                                    cc.director.getScene().addChild(node_1);
                                    node_1.getComponent(cc.Layout).updateLayout();
                                    node_1.position = cc.v2(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height);
                                    var duration = Extend_1.ext.isIphoneX ? 0.3 : 0.2;
                                    var y = Extend_1.ext.isIphoneX ? cc.view.getVisibleSize().height - node_1.height - View_1.default.IPHONEX_TOP_BLACK_HEIGHT : cc.view.getVisibleSize().height - node_1.height;
                                    node_1.runAction(cc.sequence(cc.moveTo(duration, cc.v2(cc.view.getVisibleSize().width / 2, y)), cc.delayTime(2), cc.moveTo(duration, cc.v2(cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height)), cc.callFunc(function () {
                                        node_1.destroy();
                                        resolve();
                                    })));
                                }
                            }
                            else {
                                console.error(error);
                            }
                        });
                    })];
            });
        });
    };
    ShowTipsCommand = __decorate([
        ccclass('ShowTipsCommand')
    ], ShowTipsCommand);
    return ShowTipsCommand;
}());
exports.default = ShowTipsCommand;

cc._RF.pop();