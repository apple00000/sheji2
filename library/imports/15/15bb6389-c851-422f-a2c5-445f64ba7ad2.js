"use strict";
cc._RF.push(module, '15bb6OJyFFCL6LFRF9kunrS', 'TestInterceptor');
// framework/interceptor/TestInterceptor.ts

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
var PostCommandInterceptor_1 = require("./PostCommandInterceptor");
var Interceptor_1 = require("./Interceptor");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestInterceptor = /** @class */ (function (_super) {
    __extends(TestInterceptor, _super);
    function TestInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestInterceptor.prototype.postHandle = function (res) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log("postHandle");
                            resolve(true);
                        }, 3000);
                    })];
            });
        });
    };
    TestInterceptor.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log(Interceptor_1.Interceptor.interceptorsOf("test.TestCommand"), "====");
                            Interceptor_1.Interceptor.unregister("test.TestCommand", TestInterceptor);
                            // InterceptorManager.unregister("test.TestCommand", TestInterceptor2);
                            console.log(Interceptor_1.Interceptor.interceptorsOf("test.TestCommand"), "====22");
                            resolve(true);
                        }, 3000);
                    })];
            });
        });
    };
    return TestInterceptor;
}(PostCommandInterceptor_1.PostCommandInterceptor));
exports.default = TestInterceptor;

cc._RF.pop();