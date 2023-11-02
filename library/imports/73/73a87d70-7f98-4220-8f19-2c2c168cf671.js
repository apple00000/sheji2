"use strict";
cc._RF.push(module, '73a871wf5hCII8ZLCwWjPZx', 'ClickSoundCommand');
// script/app/music/ClickSoundCommand.ts

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
var MusicPaths_1 = require("../config/MusicPaths");
var Music_1 = require("../../../framework/audio/Music");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ClickSoundCommand = /** @class */ (function () {
    function ClickSoundCommand() {
    }
    ClickSoundCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var event, data;
            return __generator(this, function (_a) {
                event = args[0];
                data = args[1];
                /** 这里可以做一些过滤或特殊处理 */
                Music_1.Music.playSFX(MusicPaths_1.MusicPaths.ClickUI);
                return [2 /*return*/];
            });
        });
    };
    ClickSoundCommand = __decorate([
        ccclass("ClickSoundCommand")
    ], ClickSoundCommand);
    return ClickSoundCommand;
}());
exports.default = ClickSoundCommand;

cc._RF.pop();