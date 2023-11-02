"use strict";
cc._RF.push(module, 'ec9e9EHzntFyYuA7kcVJd7f', 'LoadingCommand');
// script/app/home/LoadingCommand.ts

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
var Facade_1 = require("../../../framework/facade/Facade");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingCommand = /** @class */ (function () {
    function LoadingCommand() {
    }
    LoadingCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        console.log("LoadingCommand");
                        var list = [];
                        /** 初始化隔离层prefab */
                        list.push(ExcelConfig_1.ExcelConfig.loadAllExcel("data/"));
                        for (var i = 0; i < 8; i++) {
                            list.push(cc.loader.loadResAwait("prefab/entities/enemy/enemy" + (i + 1), cc.Prefab));
                        }
                        list.push(cc.loader.loadResAwait("prefab/guideCircle"));
                        list.push(cc.loader.loadResAwait("prefab/guideSke"));
                        list.push(Facade_1.default.initSeparationLayer("prefab/separationLayer"));
                        list.push(Facade_1.default.initTextTips("prefab/textTips"));
                        list.push(Facade_1.default.initTextTips("prefab/color"));
                        list.push(cc.loader.loadResAwait("frame_fy005", cc.SpriteFrame));
                        list.push(cc.loader.loadResDirAwait("sound/"));
                        /** 加载一些不是很紧急的资源 */
                        cc.loader.loadRes("prefab/exchange");
                        cc.loader.loadRes("prefab/friendRank");
                        cc.loader.loadRes("prefab/invites");
                        cc.loader.loadRes("prefab/props");
                        cc.loader.loadRes("prefab/roleSupply");
                        cc.loader.loadRes("prefab/settings");
                        cc.loader.loadRes("prefab/takeJackpot");
                        cc.loader.loadRes("prefab/tips");
                        cc.loader.loadRes("prefab/recommend");
                        Promise.all(list).then(function () {
                            console.log('加载完成...');
                            cc.sys.garbageCollect();
                            resolve();
                        }).catch(function (err) {
                            console.error(err);
                        });
                    })];
            });
        });
    };
    LoadingCommand = __decorate([
        ccclass("LoadingCommand")
    ], LoadingCommand);
    return LoadingCommand;
}());
exports.default = LoadingCommand;

cc._RF.pop();