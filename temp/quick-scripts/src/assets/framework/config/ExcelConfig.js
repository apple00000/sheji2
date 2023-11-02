"use strict";
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