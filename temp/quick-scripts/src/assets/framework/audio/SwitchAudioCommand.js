"use strict";
cc._RF.push(module, '0d2e7m1GVBPX4D7BSHixkfQ', 'SwitchAudioCommand');
// framework/audio/SwitchAudioCommand.ts

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
var Music_1 = require("./Music");
var View_1 = require("../component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SwitchAudioCommand = /** @class */ (function () {
    function SwitchAudioCommand() {
    }
    SwitchAudioCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var flag;
                        return __generator(this, function (_a) {
                            flag = !Music_1.Music.getMusicOpen();
                            if (typeof args[0] == "object" && args[0].constructor == cc.Toggle) {
                                flag = args[0].isChecked;
                                if (flag != Music_1.Music.getMusicOpen()) {
                                    View_1.default.executeClickSoundCommand(args[0], args[1]);
                                }
                            }
                            Music_1.Music.setMusicOpen(flag);
                            Music_1.Music.sfxOpen = flag;
                            Music_1.Music.persistence();
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    SwitchAudioCommand = __decorate([
        ccclass("SwitchAudioCommand")
    ], SwitchAudioCommand);
    return SwitchAudioCommand;
}());
exports.default = SwitchAudioCommand;

cc._RF.pop();