
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/PreloadGameSceneCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf93bRhBi5KuIVrHFENupQS', 'PreloadGameSceneCommand');
// script/app/game/PreloadGameSceneCommand.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PreloadGameSceneCommand = /** @class */ (function () {
    function PreloadGameSceneCommand() {
    }
    PreloadGameSceneCommand.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            Promise.all([
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy1", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy2", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy3", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy4", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy5", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy6", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy7", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/enemy/enemy8", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet1", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet1Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet2", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet2Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet3", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet3Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet4", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet4Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet5", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet5Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet6", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet6Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet7", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet7Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet8", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet8Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet9", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet9Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet10", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet10Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet108", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/bullet108Strike", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/fire7", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/explosive/explosive9", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/enemyBullet1", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/enemyBullet2", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/enemyBullet3", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet1", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet2", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet3", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet4", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet5", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/bullet/propBullet6", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop1", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop2", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop3", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop4", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop5", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop6", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop9", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop10", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop11", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop12", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/prop13", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/guns", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/propState", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/prop/takeProp", cc.Prefab),
                                cc.loader.loadResAwait("prefab/entities/blood/blood", cc.Prefab),
                                cc.loader.loadResAwait("prefab/roleSupply", cc.Prefab),
                            ]).then(function (res) {
                                resolve();
                            }).catch(function (err) {
                                reject(err);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    PreloadGameSceneCommand = __decorate([
        ccclass("PreloadGameSceneCommand")
    ], PreloadGameSceneCommand);
    return PreloadGameSceneCommand;
}());
exports.default = PreloadGameSceneCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvUHJlbG9hZEdhbWVTY2VuZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUtNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7SUF1RUEsQ0FBQztJQXJFUyx5Q0FBTyxHQUFiO1FBQWUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7dUNBQUUsT0FBTzs7O2dCQUMzQixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFNLE9BQU8sRUFBRSxNQUFNOzs0QkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQ0FDUixFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQ0FBaUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNwRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMxRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNyRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMzRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN6RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN4RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN4RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN4RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUN2RSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUMvRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNoRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNoRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNoRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNoRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUM5RCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNuRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNsRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNoRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDOzZCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztnQ0FDUCxPQUFPLEVBQUUsQ0FBQzs0QkFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO2dDQUNSLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEIsQ0FBQyxDQUFDLENBQUM7Ozt5QkFDTixDQUFDLEVBQUM7OztLQUNOO0lBcEVnQix1QkFBdUI7UUFEM0MsT0FBTyxDQUFDLHlCQUF5QixDQUFDO09BQ2QsdUJBQXVCLENBdUUzQztJQUFELDhCQUFDO0NBdkVELEFBdUVDLElBQUE7a0JBdkVvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtJQ29tbWFuZH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvSUNvbW1hbmRcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHt3eEFwaX0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay93eEFwaS93eEFwaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzcyhcIlByZWxvYWRHYW1lU2NlbmVDb21tYW5kXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWRHYW1lU2NlbmVDb21tYW5kIGltcGxlbWVudHMgSUNvbW1hbmQge1xyXG5cclxuICAgIGFzeW5jIGV4ZWN1dGUgKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2VuZW15L2VuZW15MVwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9lbmVteS9lbmVteTJcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvZW5lbXkvZW5lbXkzXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2VuZW15L2VuZW15NFwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9lbmVteS9lbmVteTVcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvZW5lbXkvZW5lbXk2XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2VuZW15L2VuZW15N1wiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9lbmVteS9lbmVteThcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDFcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDFTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDJcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDJTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDNcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDNTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDRcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDRTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDVcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDVTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDZcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDZTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDdcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDdTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDhcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDhTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDlcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDlTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDEwXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2J1bGxldC9idWxsZXQxMFN0cmlrZVwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9idWxsZXQvYnVsbGV0MTA4XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2J1bGxldC9idWxsZXQxMDhTdHJpa2VcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2ZpcmU3XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2V4cGxvc2l2ZS9leHBsb3NpdmU5XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2J1bGxldC9lbmVteUJ1bGxldDFcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2VuZW15QnVsbGV0MlwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9idWxsZXQvZW5lbXlCdWxsZXQzXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2J1bGxldC9wcm9wQnVsbGV0MVwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9idWxsZXQvcHJvcEJ1bGxldDJcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L3Byb3BCdWxsZXQzXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL2J1bGxldC9wcm9wQnVsbGV0NFwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9idWxsZXQvcHJvcEJ1bGxldDVcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L3Byb3BCdWxsZXQ2XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL3Byb3AvcHJvcDFcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wMlwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9wcm9wL3Byb3AzXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL3Byb3AvcHJvcDRcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wNVwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBd2FpdChcInByZWZhYi9lbnRpdGllcy9wcm9wL3Byb3A2XCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL3Byb3AvcHJvcDlcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wMTBcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wMTFcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wMTJcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9wcm9wMTNcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvcHJvcC9ndW5zXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL3Byb3AvcHJvcFN0YXRlXCIsIGNjLlByZWZhYiksXHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KFwicHJlZmFiL2VudGl0aWVzL3Byb3AvdGFrZVByb3BcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvZW50aXRpZXMvYmxvb2QvYmxvb2RcIiwgY2MuUHJlZmFiKSxcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoXCJwcmVmYWIvcm9sZVN1cHBseVwiLCBjYy5QcmVmYWIpLFxyXG4gICAgICAgICAgICBdKS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==