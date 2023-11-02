
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/audio/Music.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvYXVkaW8vTXVzaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7OztBQUluRyw0REFBeUQ7QUFFbkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUU5QjtJQUFBO0lBNkdBLENBQUM7SUEzR0csbUJBQW1CO0lBQ1osVUFBSSxHQUFYO1FBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELHNDQUFzQztRQUN0Qyx3Q0FBd0M7SUFDNUMsQ0FBQztJQUVELFlBQVk7SUFDTCxpQkFBVyxHQUFsQjtRQUNJLDJCQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUtNLGtCQUFZLEdBQW5CLFVBQW9CLEdBQVU7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxrQkFBWSxHQUFuQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVB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QUFDO0lBRTVCLGFBQWE7SUFDRSxnQkFBVSxHQUFHLElBQUksQ0FBQztJQWNqQyxXQUFXO0lBQ0osYUFBTyxHQUFXLElBQUksQ0FBQztJQUU5QixhQUFhO0lBQ0UsY0FBUSxHQUFHLElBQUksQ0FBQztJQUtoQixnQkFBVSxHQUFVLENBQUMsQ0FBQyxDQUFDO0lBZ0QxQyxZQUFDO0NBN0dELEFBNkdDLElBQUE7QUE3R1ksc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5cclxuaW1wb3J0IHtMb2NhbFN0b3JhZ2V9IGZyb20gXCIuLi9wZXJzaXN0ZW5jZS9Mb2NhbFN0b3JhZ2VcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgbXVzaWNDbG9zZUtleSA9IFwibXVzaWNPcGVuXCI7XHJcbmNvbnN0IHNmeENsb3NlS2V5ID0gXCJzZnhPcGVuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVzaWN7XHJcblxyXG4gICAgLyoqIOivu+WPluacrOWcsOaMgeS5heWMlu+8je+8jeWIneWni+WMliAqL1xyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICBNdXNpYy5zZXRNdXNpY09wZW4oIUxvY2FsU3RvcmFnZS5nZXRCb29sZWFuKG11c2ljQ2xvc2VLZXkpKTtcclxuICAgICAgICBNdXNpYy5zZnhPcGVuID0gIUxvY2FsU3RvcmFnZS5nZXRCb29sZWFuKHNmeENsb3NlS2V5KTtcclxuICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgwLjEpO1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pys5Zyw5oyB5LmF5YyWICovXHJcbiAgICBzdGF0aWMgcGVyc2lzdGVuY2UoKXtcclxuICAgICAgICBMb2NhbFN0b3JhZ2Uuc2V0Qm9vbGVhbihtdXNpY0Nsb3NlS2V5LCAhdGhpcy5fbXVzaWNPcGVuKTtcclxuICAgICAgICBMb2NhbFN0b3JhZ2Uuc2V0Qm9vbGVhbihzZnhDbG9zZUtleSwgIXRoaXMuc2Z4T3Blbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiuvue9ruiDjOaZr+mfs+S5kOmfs+mHjyAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2JnbVZvbHVtZTpudW1iZXIgPSAwLjc7XHJcblxyXG4gICAgc3RhdGljIHNldEJnbVZvbHVtZSh2YWw6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYmdtVm9sdW1lID0gdmFsO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVm9sdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0QmdtVm9sdW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZ21Wb2x1bWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlVm9sdWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmdtQXVkaW9JRCA+IDApe1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUodGhpcy5iZ21BdWRpb0lELCB0aGlzLl9iZ21Wb2x1bWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6+572u6Z+z5pWI6Z+z6YePICovXHJcbiAgICBzdGF0aWMgc2Z4Vm9sdW1lOm51bWJlciA9IDE7XHJcblxyXG4gICAgLyoqIOiDjOaZr+mfs+S5kOW8gOWFsyAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX211c2ljT3BlbiA9IHRydWU7XHJcbiAgICBzdGF0aWMgc2V0TXVzaWNPcGVuKHZhbDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9tdXNpY09wZW4gPSB2YWw7XHJcbiAgICAgICAgaWYgKHZhbCl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJHTSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZvbHVlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQkdNKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldE11c2ljT3BlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbXVzaWNPcGVuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpn7PmlYjlvIDlhbMgKi9cclxuICAgIHN0YXRpYyBzZnhPcGVuOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKiDmkq3mlL7og4zmma/pn7PkuZAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9iZ21QYXRoID0gbnVsbDtcclxuICAgIHN0YXRpYyBhc3luYyBzZXRCZ20odmFsOnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2JnbVBhdGggPSB2YWw7XHJcbiAgICAgICAgdGhpcy5wbGF5QkdNKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBiZ21BdWRpb0lEOm51bWJlciA9IC0xO1xyXG5cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgcGxheUJHTSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGxheUJHTVwiKTtcclxuICAgICAgICBpZih0aGlzLl9tdXNpY09wZW4gPT0gdHJ1ZSAmJiB0aGlzLl9iZ21QYXRoKXtcclxuICAgICAgICAgICAgbGV0IGF1ZGlvQ2xpcCA9IGF3YWl0IGNjLmxvYWRlci5sb2FkUmVzQXdhaXQodGhpcy5fYmdtUGF0aCwgY2MuQXVkaW9DbGlwKTtcclxuICAgICAgICAgICAgaWYodGhpcy5iZ21BdWRpb0lEID49IDApe1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmJnbUF1ZGlvSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYmdtQXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9DbGlwLHRydWUsdGhpcy5fYmdtVm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHN0b3BCR00oKXtcclxuICAgICAgICBpZih0aGlzLmJnbUF1ZGlvSUQgPj0gMCl7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3AodGhpcy5iZ21BdWRpb0lEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaSreaUvumfs+aViCAqL1xyXG4gICAgc3RhdGljIGFzeW5jIHBsYXlTRlgobmFtZTpzdHJpbmd8Y2MuQXVkaW9DbGlwLCBzZnhWb2x1bWU/Om51bWJlcil7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwbGF5U0ZYPT09PlwiLCBuYW1lKTtcclxuICAgICAgICBpZih0aGlzLnNmeE9wZW4gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBhdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgICAgICBhdWRpb0NsaXAgPSBhd2FpdCBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KG5hbWUsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGF1ZGlvQ2xpcCA9IG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9DbGlwLGZhbHNlLHNmeFZvbHVtZSB8fCB0aGlzLnNmeFZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgcGF1c2VBbGwoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXN1bWVBbGwoKXtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3RvcEFsbCgpe1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG59Il19