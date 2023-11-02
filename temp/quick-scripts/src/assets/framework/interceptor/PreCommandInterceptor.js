"use strict";
cc._RF.push(module, 'a3b4dlTRDJMdKhqI+oAHol6', 'PreCommandInterceptor');
// framework/interceptor/PreCommandInterceptor.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCommandInterceptor = void 0;
var PreCommandInterceptor = /** @class */ (function () {
    function PreCommandInterceptor() {
    }
    PreCommandInterceptor.prototype.postHandle = function (res) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
            });
        });
    };
    return PreCommandInterceptor;
}());
exports.PreCommandInterceptor = PreCommandInterceptor;

cc._RF.pop();