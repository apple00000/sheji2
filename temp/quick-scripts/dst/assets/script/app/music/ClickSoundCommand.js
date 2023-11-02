
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/music/ClickSoundCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL211c2ljL0NsaWNrU291bmRDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUtuRyxtREFBZ0Q7QUFDaEQsd0RBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7SUFRQSxDQUFDO0lBTlMsbUNBQU8sR0FBYjtRQUFlLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O3VDQUFFLE9BQU87OztnQkFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIscUJBQXFCO2dCQUNyQixhQUFLLENBQUMsT0FBTyxDQUFDLHVCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7S0FDckM7SUFQZ0IsaUJBQWlCO1FBRHJDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztPQUNSLGlCQUFpQixDQVFyQztJQUFELHdCQUFDO0NBUkQsQUFRQyxJQUFBO2tCQVJvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5cclxuaW1wb3J0IHtJQ29tbWFuZH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvSUNvbW1hbmRcIjtcclxuaW1wb3J0IHtNdXNpY1BhdGhzfSBmcm9tIFwiLi4vY29uZmlnL011c2ljUGF0aHNcIjtcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzcyhcIkNsaWNrU291bmRDb21tYW5kXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWNrU291bmRDb21tYW5kIGltcGxlbWVudHMgSUNvbW1hbmQge1xyXG5cclxuICAgIGFzeW5jIGV4ZWN1dGUgKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgbGV0IGV2ZW50ID0gYXJnc1swXTtcclxuICAgICAgICBsZXQgZGF0YSA9IGFyZ3NbMV07XHJcbiAgICAgICAgLyoqIOi/memHjOWPr+S7peWBmuS4gOS6m+i/h+a7pOaIlueJueauiuWkhOeQhiAqL1xyXG4gICAgICAgIE11c2ljLnBsYXlTRlgoTXVzaWNQYXRocy5DbGlja1VJKTtcclxuICAgIH1cclxufVxyXG4iXX0=