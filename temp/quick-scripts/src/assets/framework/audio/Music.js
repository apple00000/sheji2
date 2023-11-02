"use strict";
cc._RF.push(module, '5ad67KpxH1DUaUccHBNSBaw', 'Music');
// framework/audio/Music.ts

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
exports.Music = void 0;
var LocalStorage_1 = require("../persistence/LocalStorage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var musicCloseKey = "musicOpen";
var sfxCloseKey = "sfxOpen";
var Music = /** @class */ (function () {
    function Music() {
    }
    /** 读取本地持久化－－初始化 */
    Music.init = function () {
        Music.setMusicOpen(!LocalStorage_1.LocalStorage.getBoolean(musicCloseKey));
        Music.sfxOpen = !LocalStorage_1.LocalStorage.getBoolean(sfxCloseKey);
        // cc.audioEngine.setMusicVolume(0.1);
        // cc.audioEngine.setEffectsVolume(0.1);
    };
    /** 本地持久化 */
    Music.persistence = function () {
        LocalStorage_1.LocalStorage.setBoolean(musicCloseKey, !this._musicOpen);
        LocalStorage_1.LocalStorage.setBoolean(sfxCloseKey, !this.sfxOpen);
    };
    Music.setBgmVolume = function (val) {
        this._bgmVolume = val;
        this.updateVolue();
    };
    Music.getBgmVolume = function () {
        return this._bgmVolume;
    };
    Music.updateVolue = function () {
        if (this.bgmAudioID > 0) {
            cc.audioEngine.setVolume(this.bgmAudioID, this._bgmVolume);
        }
    };
    Music.setMusicOpen = function (val) {
        this._musicOpen = val;
        if (val) {
            this.playBGM();
            this.updateVolue();
        }
        else {
            this.stopBGM();
        }
    };
    Music.getMusicOpen = function () {
        return this._musicOpen;
    };
    Music.setBgm = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._bgmPath = val;
                this.playBGM();
                return [2 /*return*/];
            });
        });
    };
    Music.playBGM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var audioClip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._musicOpen == true && this._bgmPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, cc.loader.loadResAwait(this._bgmPath, cc.AudioClip)];
                    case 1:
                        audioClip = _a.sent();
                        if (this.bgmAudioID >= 0) {
                            cc.audioEngine.stop(this.bgmAudioID);
                        }
                        this.bgmAudioID = cc.audioEngine.play(audioClip, true, this._bgmVolume);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Music.stopBGM = function () {
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
    };
    /** 播放音效 */
    Music.playSFX = function (name, sfxVolume) {
        return __awaiter(this, void 0, void 0, function () {
            var audioClip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.sfxOpen == true)) return [3 /*break*/, 4];
                        audioClip = null;
                        if (!(typeof name == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, cc.loader.loadResAwait(name, cc.AudioClip)];
                    case 1:
                        audioClip = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        audioClip = name;
                        _a.label = 3;
                    case 3: return [2 /*return*/, cc.audioEngine.play(audioClip, false, sfxVolume || this.sfxVolume)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Music.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    Music.resumeAll = function () {
        cc.audioEngine.resumeAll();
    };
    Music.stopAll = function () {
        cc.audioEngine.stopAll();
    };
    /** 设置背景音乐音量 */
    Music._bgmVolume = 0.7;
    /** 设置音效音量 */
    Music.sfxVolume = 1;
    /** 背景音乐开关 */
    Music._musicOpen = true;
    /** 音效开关 */
    Music.sfxOpen = true;
    /** 播放背景音乐 */
    Music._bgmPath = null;
    Music.bgmAudioID = -1;
    return Music;
}());
exports.Music = Music;

cc._RF.pop();