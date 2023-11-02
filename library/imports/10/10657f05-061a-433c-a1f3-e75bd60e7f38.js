"use strict";
cc._RF.push(module, '106578FBhpDPKHz51vWDn84', 'TestInterceptor2');
// framework/interceptor/TestInterceptor2.ts

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
exports.TestInterceptor2 = void 0;
var PostCommandInterceptor_1 = require("./PostCommandInterceptor");
var TestInterceptor2 = /** @class */ (function (_super) {
    __extends(TestInterceptor2, _super);
    function TestInterceptor2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestInterceptor2.prototype.postHandle = function (res) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log("postHandle  TestInterceptor2");
                            resolve(true);
                        }, 3000);
                    })];
            });
        });
    };
    TestInterceptor2.prototype.preHandle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log("preHandle  TestInterceptor2");
                            resolve(true);
                        }, 3000);
                    })];
            });
        });
    };
    return TestInterceptor2;
}(PostCommandInterceptor_1.PostCommandInterceptor));
exports.TestInterceptor2 = TestInterceptor2;

cc._RF.pop();