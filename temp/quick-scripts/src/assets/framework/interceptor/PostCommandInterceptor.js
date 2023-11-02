"use strict";
cc._RF.push(module, 'b1980TfB1xNpaZmm/jO2HzX', 'PostCommandInterceptor');
// framework/interceptor/PostCommandInterceptor.ts

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
exports.PostCommandInterceptor = void 0;
var PostCommandInterceptor = /** @class */ (function () {
    function PostCommandInterceptor() {
    }
    PostCommandInterceptor.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return resolve(true); })];
            });
        });
    };
    return PostCommandInterceptor;
}());
exports.PostCommandInterceptor = PostCommandInterceptor;

cc._RF.pop();