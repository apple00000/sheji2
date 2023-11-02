
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/audio/SwitchAudioCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvYXVkaW8vU3dpdGNoQXVkaW9Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQU9uRyxpQ0FBOEI7QUFDOUIsMENBQXFDO0FBRS9CLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7SUFpQkEsQ0FBQztJQWZTLG9DQUFPLEdBQWI7UUFBZSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOzt1Q0FBRSxPQUFPOzs7Z0JBQzNCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU0sT0FBTzs7OzRCQUN4QixJQUFJLEdBQUcsQ0FBQyxhQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ2pDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBQztnQ0FDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0NBQ3pCLElBQUksSUFBSSxJQUFJLGFBQUssQ0FBQyxZQUFZLEVBQUUsRUFBQztvQ0FDN0IsY0FBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDbkQ7NkJBQ0o7NEJBQ0QsYUFBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDekIsYUFBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7NEJBQ3JCLGFBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDcEIsT0FBTyxFQUFFLENBQUM7Ozt5QkFDYixDQUFDLEVBQUM7OztLQUNOO0lBaEJnQixrQkFBa0I7UUFEdEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO09BQ1Qsa0JBQWtCLENBaUJ0QztJQUFELHlCQUFDO0NBakJELEFBaUJDLElBQUE7a0JBakJvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQge0lDb21tYW5kfSBmcm9tIFwiLi4vZmFjYWRlL0lDb21tYW5kXCI7XHJcbmltcG9ydCB7TXVzaWN9IGZyb20gXCIuL011c2ljXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuLi9jb21wb25lbnQvVmlld1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzcyhcIlN3aXRjaEF1ZGlvQ29tbWFuZFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTd2l0Y2hBdWRpb0NvbW1hbmQgaW1wbGVtZW50cyBJQ29tbWFuZCB7XHJcblxyXG4gICAgYXN5bmMgZXhlY3V0ZSAoLi4uYXJncyk6UHJvbWlzZXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gIU11c2ljLmdldE11c2ljT3BlbigpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIiAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yID09IGNjLlRvZ2dsZSl7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gYXJnc1swXS5pc0NoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhZyAhPSBNdXNpYy5nZXRNdXNpY09wZW4oKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgVmlldy5leGVjdXRlQ2xpY2tTb3VuZENvbW1hbmQoYXJnc1swXSwgYXJnc1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTXVzaWMuc2V0TXVzaWNPcGVuKGZsYWcpO1xyXG4gICAgICAgICAgICBNdXNpYy5zZnhPcGVuID0gZmxhZztcclxuICAgICAgICAgICAgTXVzaWMucGVyc2lzdGVuY2UoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==