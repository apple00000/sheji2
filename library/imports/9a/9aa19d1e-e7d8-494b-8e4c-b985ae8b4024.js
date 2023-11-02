"use strict";
cc._RF.push(module, '9aa190e59hJS45MuYWui0Ak', 'HttpOption');
// framework/http/HttpOption.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpOption = void 0;
var HttpOption = /** @class */ (function () {
    function HttpOption() {
        this.host = null;
        this.port = null;
        this.timeout = null;
        this.cookieKey = null;
        this.headers = new Map();
    }
    return HttpOption;
}());
exports.HttpOption = HttpOption;

cc._RF.pop();