"use strict";
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