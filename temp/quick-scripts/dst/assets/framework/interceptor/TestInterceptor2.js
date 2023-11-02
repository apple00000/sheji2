
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/interceptor/TestInterceptor2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvVGVzdEludGVyY2VwdG9yMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7O0FBS25HLG1FQUFnRTtBQUVoRTtJQUFzQyxvQ0FBc0I7SUFBNUQ7O0lBbUJBLENBQUM7SUFsQlMscUNBQVUsR0FBaEIsVUFBaUIsR0FBTztRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O3VDQUFFLE9BQU87O2dCQUN0QyxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87d0JBQ3RCLFVBQVUsQ0FBQzs0QkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7NEJBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNiLENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUVLLG9DQUFTLEdBQWY7UUFBZ0IsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7dUNBQUUsT0FBTzs7Z0JBQzVCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDdEIsVUFBVSxDQUFDOzRCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzs0QkFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2IsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUwsdUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxDQW5CcUMsK0NBQXNCLEdBbUIzRDtBQW5CWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG5cclxuXHJcbmltcG9ydCB7UG9zdENvbW1hbmRJbnRlcmNlcHRvcn0gZnJvbSBcIi4vUG9zdENvbW1hbmRJbnRlcmNlcHRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlc3RJbnRlcmNlcHRvcjIgZXh0ZW5kcyBQb3N0Q29tbWFuZEludGVyY2VwdG9yIHtcclxuICAgIGFzeW5jIHBvc3RIYW5kbGUocmVzOmFueSwgLi4uYXJncyk6UHJvbWlzZXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0SGFuZGxlICBUZXN0SW50ZXJjZXB0b3IyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcHJlSGFuZGxlKC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJlSGFuZGxlICBUZXN0SW50ZXJjZXB0b3IyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==