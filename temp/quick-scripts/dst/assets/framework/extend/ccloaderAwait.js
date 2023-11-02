
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/ccloaderAwait.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e303ct+NQ1IDLF7WAIkdu7m', 'ccloaderAwait');
// framework/extend/ccloaderAwait.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
function getRes(url, type) {
    return __awaiter(this, void 0, Promise, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var res, res_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                res = cc.loader.getRes(url, type);
                                if (!(res == null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, loadRes(url, type).catch(function (err) {
                                        reject(err);
                                    })];
                            case 1:
                                res_1 = _a.sent();
                                resolve(res_1);
                                return [3 /*break*/, 3];
                            case 2:
                                resolve(res);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function loadRes() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _a;
                    (_a = cc.loader).loadRes.apply(_a, __spreadArrays(args, [function (err, res) {
                            if (err == null) {
                                resolve(res);
                            }
                            else {
                                reject(err);
                            }
                        }]));
                })];
        });
    });
}
function loadResArray() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _a;
                    (_a = cc.loader).loadResArray.apply(_a, __spreadArrays(args, [function (err, res) {
                            if (err == null) {
                                resolve(res);
                            }
                            else {
                                reject(err);
                            }
                        }]));
                })];
        });
    });
}
function loadResDir() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var _a;
                    (_a = cc.loader).loadResDir.apply(_a, __spreadArrays(args, [function (err, resource, urls) {
                            if (err == null) {
                                resolve([resource, urls]);
                            }
                            else {
                                reject(err);
                            }
                        }]));
                })];
        });
    });
}
function getFileNames(dir, type) {
    var urls = [];
    cc.loader._resources.getUuidArray(dir, type, urls);
    return urls;
}
cc.loader.getResAwait = getRes;
cc.loader.loadResAwait = loadRes;
cc.loader.loadResArrayAwait = loadResArray;
cc.loader.loadResDirAwait = loadResDir;
cc.loader.getFileNames = getFileNames;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL2NjbG9hZGVyQXdhaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFFbkcsU0FBZSxNQUFNLENBQUMsR0FBVyxFQUFFLElBQWU7bUNBQUUsT0FBTzs7O1lBQ3ZELHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7O2dDQUNqQyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3FDQUNuQyxDQUFBLEdBQUcsSUFBSSxJQUFJLENBQUEsRUFBWCx3QkFBVztnQ0FDQSxxQkFBTSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7d0NBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDaEIsQ0FBQyxDQUFDLEVBQUE7O2dDQUZFLFFBQU0sU0FFUjtnQ0FDRixPQUFPLENBQUMsS0FBRyxDQUFDLENBQUM7OztnQ0FFYixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O3FCQUVwQixDQUFDLEVBQUM7OztDQUNOO0FBRUQsU0FBZSxPQUFPO0lBQUMsY0FBTztTQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBUCx5QkFBTzs7bUNBQUUsT0FBTzs7WUFDbkMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7b0JBQy9CLENBQUEsS0FBQSxFQUFFLENBQUMsTUFBTSxDQUFBLENBQUMsT0FBTywwQkFBSSxJQUFJLEdBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRzs0QkFDekMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFDO2dDQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDaEI7aUNBQU07Z0NBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNmO3dCQUNMLENBQUMsSUFBRTtnQkFDUCxDQUFDLENBQUMsRUFBQzs7O0NBQ047QUFFRCxTQUFlLFlBQVk7SUFBQyxjQUFPO1NBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztRQUFQLHlCQUFPOzttQ0FBRSxPQUFPOztZQUN4QyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNOztvQkFDL0IsQ0FBQSxLQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUEsQ0FBQyxZQUFZLDBCQUFJLElBQUksR0FBRSxVQUFVLEdBQUcsRUFBRSxHQUFHOzRCQUM5QyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUM7Z0NBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNoQjtpQ0FBTTtnQ0FDSCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2Y7d0JBQ0wsQ0FBQyxJQUFFO2dCQUNQLENBQUMsQ0FBQyxFQUFDOzs7Q0FDTjtBQUVELFNBQWUsVUFBVTtJQUFDLGNBQU87U0FBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQVAseUJBQU87O21DQUFFLE9BQU87O1lBQ3RDLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O29CQUMvQixDQUFBLEtBQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQSxDQUFDLFVBQVUsMEJBQUksSUFBSSxHQUFFLFVBQVUsR0FBVSxFQUFFLFFBQWUsRUFBRSxJQUFjOzRCQUMvRSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUM7Z0NBQ1osT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NkJBQzdCO2lDQUFNO2dDQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDZjt3QkFDTCxDQUFDLElBQUU7Z0JBQ1AsQ0FBQyxDQUFDLEVBQUM7OztDQUNOO0FBR0QsU0FBUyxZQUFZLENBQUMsR0FBVSxFQUFFLElBQXFCO0lBQ25ELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDL0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0FBQ2pDLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO0FBQzNDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUN2QyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFJlcyh1cmw6IHN0cmluZywgdHlwZT86IEZ1bmN0aW9uKTpQcm9taXNle1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgcmVzID0gY2MubG9hZGVyLmdldFJlcyh1cmwsIHR5cGUpO1xyXG4gICAgICAgIGlmKHJlcyA9PSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGxvYWRSZXModXJsLCB0eXBlKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFJlcyguLi5hcmdzKTpQcm9taXNle1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyguLi5hcmdzLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICAgICAgaWYgKGVyciA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFJlc0FycmF5KC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkoLi4uYXJncywgZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRSZXNEaXIoLi4uYXJncyk6UHJvbWlzZXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoLi4uYXJncywgZnVuY3Rpb24gKGVycjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSwgdXJsczogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgaWYgKGVyciA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW3Jlc291cmNlLCB1cmxzXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGaWxlTmFtZXMoZGlyOnN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTpBcnJheTxzdHJpbmc+e1xyXG4gICAgbGV0IHVybHMgPSBbXTtcclxuICAgIGNjLmxvYWRlci5fcmVzb3VyY2VzLmdldFV1aWRBcnJheShkaXIsIHR5cGUsIHVybHMpO1xyXG4gICAgcmV0dXJuIHVybHM7XHJcbn1cclxuXHJcbmNjLmxvYWRlci5nZXRSZXNBd2FpdCA9IGdldFJlcztcclxuY2MubG9hZGVyLmxvYWRSZXNBd2FpdCA9IGxvYWRSZXM7XHJcbmNjLmxvYWRlci5sb2FkUmVzQXJyYXlBd2FpdCA9IGxvYWRSZXNBcnJheTtcclxuY2MubG9hZGVyLmxvYWRSZXNEaXJBd2FpdCA9IGxvYWRSZXNEaXI7XHJcbmNjLmxvYWRlci5nZXRGaWxlTmFtZXMgPSBnZXRGaWxlTmFtZXM7XHJcbiJdfQ==