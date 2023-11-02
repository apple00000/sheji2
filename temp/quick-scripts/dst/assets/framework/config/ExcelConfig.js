
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/config/ExcelConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0859agupcZJ8aoG/BCnvbwF', 'ExcelConfig');
// framework/config/ExcelConfig.ts

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
exports.ExcelConfig = void 0;
function data2Json(str) {
    var d = str;
    //转换数据
    //第二排是key 把key提出来
    var keys = d.splice(0, 1);
    var temp1 = [];
    for (var i in keys[0]) {
        temp1[i] = keys[0][i];
    }
    //合并的数据
    var newData = [];
    for (var i in d) {
        var temp2 = d[i];
        newData[i] = {};
        for (var j in temp2) {
            var key = temp1[j];
            var val = null;
            val = temp2[j];
            newData[i][key] = val;
        }
    }
    return newData;
}
var excelTables = new Map();
var ExcelConfig = /** @class */ (function () {
    function ExcelConfig() {
    }
    ExcelConfig.loadAllExcel = function (excelDir, progressCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, objects, urls, i, json;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, cc.loader.loadResDirAwait(excelDir, progressCallback)];
                    case 1:
                        _a = _b.sent(), objects = _a[0], urls = _a[1];
                        for (i = 0; i < objects.length; i++) {
                            json = objects[i];
                            if (typeof objects[i].json != "undefined") {
                                json = objects[i].json;
                            }
                            excelTables.set(urls[i], data2Json(json));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExcelConfig.loadExcel = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var object, json, dataArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cc.loader.loadResAwait(filePath)];
                    case 1:
                        object = _a.sent();
                        json = object;
                        if (typeof object.json != "undefined") {
                            json = object.json;
                        }
                        dataArr = data2Json(json);
                        excelTables.set(filePath, dataArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExcelConfig.getExcelTable = function (filePath) {
        return excelTables.get(filePath);
    };
    ExcelConfig.getExcelLine = function (filePath, key, findValue) {
        var array = this.getExcelTable(filePath);
        for (var index in array) {
            if (array[index][key] == findValue) {
                return array[index];
            }
        }
        return null;
    };
    return ExcelConfig;
}());
exports.ExcelConfig = ExcelConfig;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOzs7QUFJbkcsU0FBUyxTQUFTLENBQUMsR0FBUztJQUN4QixJQUFJLENBQUMsR0FBVSxHQUFHLENBQUM7SUFDbkIsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixLQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztRQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTztJQUNQLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztRQUNYLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFDO1lBQ2YsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztZQUNmLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO0tBQ0o7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7QUFFM0M7SUFBQTtJQW1DQSxDQUFDO0lBbENnQix3QkFBWSxHQUF6QixVQUEwQixRQUFlLEVBQUUsZ0JBQWtGOzs7Ozs0QkFDbkcscUJBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEVBQUE7O3dCQUE3RSxLQUFrQixTQUEyRCxFQUE1RSxPQUFPLFFBQUEsRUFBRSxJQUFJLFFBQUE7d0JBQ2xCLEtBQVMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzs0QkFDNUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdEIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFDO2dDQUN0QyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs2QkFDMUI7NEJBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQzdDOzs7OztLQUNKO0lBRVkscUJBQVMsR0FBdEIsVUFBdUIsUUFBZTs7Ozs7NEJBQ3JCLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBL0MsTUFBTSxHQUFHLFNBQXNDO3dCQUMvQyxJQUFJLEdBQUcsTUFBTSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksSUFBSSxXQUFXLEVBQUM7NEJBQ2xDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3lCQUN0Qjt3QkFDRyxPQUFPLEdBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM3QixXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7S0FDdEM7SUFFTSx5QkFBYSxHQUFwQixVQUFxQixRQUFlO1FBQ2hDLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sd0JBQVksR0FBbkIsVUFBb0IsUUFBZSxFQUFFLEdBQVUsRUFBRSxTQUFhO1FBQzFELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUM7WUFDcEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxFQUFDO2dCQUMvQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsSUFBQTtBQW5DWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkYXRhMkpzb24oc3RyOkFycmF5KXtcclxuICAgIGxldCBkOkFycmF5ID0gIHN0cjtcclxuICAgIC8v6L2s5o2i5pWw5o2uXHJcbiAgICAvL+esrOS6jOaOkuaYr2tleSDmioprZXnmj5Dlh7rmnaVcclxuICAgIGxldCBrZXlzID0gZC5zcGxpY2UoMCwxKTtcclxuICAgIGxldCB0ZW1wMSA9IFtdO1xyXG4gICAgZm9yKGxldCBpIGluIGtleXNbMF0pe1xyXG4gICAgICAgIHRlbXAxW2ldID0ga2V5c1swXVtpXTtcclxuICAgIH1cclxuICAgIC8v5ZCI5bm255qE5pWw5o2uXHJcbiAgICBsZXQgbmV3RGF0YSA9IFtdO1xyXG4gICAgZm9yKGxldCBpIGluIGQpe1xyXG4gICAgICAgIGxldCB0ZW1wMiA9IGRbaV07XHJcbiAgICAgICAgbmV3RGF0YVtpXSA9IHt9O1xyXG4gICAgICAgIGZvcihsZXQgaiBpbiB0ZW1wMil7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSB0ZW1wMVtqXTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhbCA9IHRlbXAyW2pdO1xyXG4gICAgICAgICAgICBuZXdEYXRhW2ldW2tleV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0RhdGE7XHJcbn1cclxuXHJcbmxldCBleGNlbFRhYmxlcyA9IG5ldyBNYXA8U3RyaW5nLCBBcnJheT4oKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeGNlbENvbmZpZ3tcclxuICAgIHN0YXRpYyBhc3luYyBsb2FkQWxsRXhjZWwoZXhjZWxEaXI6c3RyaW5nLCBwcm9ncmVzc0NhbGxiYWNrPzogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkKXtcclxuICAgICAgICBsZXQgW29iamVjdHMsIHVybHNdID0gYXdhaXQgY2MubG9hZGVyLmxvYWRSZXNEaXJBd2FpdChleGNlbERpciwgcHJvZ3Jlc3NDYWxsYmFjayk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPG9iamVjdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQganNvbiA9IG9iamVjdHNbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0c1tpXS5qc29uICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICAgICAganNvbiA9IG9iamVjdHNbaV0uanNvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleGNlbFRhYmxlcy5zZXQodXJsc1tpXSwgZGF0YTJKc29uKGpzb24pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGxvYWRFeGNlbChmaWxlUGF0aDpTdHJpbmcpe1xyXG4gICAgICAgIGxldCBvYmplY3QgPSBhd2FpdCBjYy5sb2FkZXIubG9hZFJlc0F3YWl0KGZpbGVQYXRoKTtcclxuICAgICAgICBsZXQganNvbiA9IG9iamVjdDtcclxuICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5qc29uICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICBqc29uID0gb2JqZWN0Lmpzb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhQXJyID1kYXRhMkpzb24oanNvbik7XHJcbiAgICAgICAgZXhjZWxUYWJsZXMuc2V0KGZpbGVQYXRoLCBkYXRhQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0RXhjZWxUYWJsZShmaWxlUGF0aDpzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZXhjZWxUYWJsZXMuZ2V0KGZpbGVQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0RXhjZWxMaW5lKGZpbGVQYXRoOlN0cmluZywga2V5OlN0cmluZywgZmluZFZhbHVlOmFueSk6T2JqZWN0e1xyXG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMuZ2V0RXhjZWxUYWJsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gYXJyYXkpe1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbaW5kZXhdW2tleV0gPT0gZmluZFZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19