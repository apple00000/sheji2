
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/interceptor/TestInterceptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvVGVzdEludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUluRyxtRUFBZ0U7QUFDaEUsNkNBQTBDO0FBRXBDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDO0lBQTZDLG1DQUFzQjtJQUFuRTs7SUFzQkEsQ0FBQztJQXBCUyxvQ0FBVSxHQUFoQixVQUFpQixHQUFPO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7dUNBQUUsT0FBTzs7Z0JBQ3RDLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDdEIsVUFBVSxDQUFDOzRCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNiLENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUVLLG1DQUFTLEdBQWY7UUFBZ0IsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7dUNBQUUsT0FBTzs7Z0JBQzVCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDdEIsVUFBVSxDQUFDOzRCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDcEUseUJBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7NEJBQzVELHVFQUF1RTs0QkFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBVyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDYixDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFDTCxzQkFBQztBQUFELENBdEJBLEFBc0JDLENBdEI0QywrQ0FBc0IsR0FzQmxFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5cclxuXHJcbmltcG9ydCB7UG9zdENvbW1hbmRJbnRlcmNlcHRvcn0gZnJvbSBcIi4vUG9zdENvbW1hbmRJbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQge0ludGVyY2VwdG9yfSBmcm9tIFwiLi9JbnRlcmNlcHRvclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0SW50ZXJjZXB0b3IgZXh0ZW5kcyBQb3N0Q29tbWFuZEludGVyY2VwdG9yIHtcclxuXHJcbiAgICBhc3luYyBwb3N0SGFuZGxlKHJlczphbnksIC4uLmFyZ3MpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicG9zdEhhbmRsZVwiKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHByZUhhbmRsZSguLi5hcmdzKTpQcm9taXNle1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhJbnRlcmNlcHRvci5pbnRlcmNlcHRvcnNPZihcInRlc3QuVGVzdENvbW1hbmRcIiksIFwiPT09PVwiKTtcclxuICAgICAgICAgICAgICAgIEludGVyY2VwdG9yLnVucmVnaXN0ZXIoXCJ0ZXN0LlRlc3RDb21tYW5kXCIsIFRlc3RJbnRlcmNlcHRvcik7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnRlcmNlcHRvck1hbmFnZXIudW5yZWdpc3RlcihcInRlc3QuVGVzdENvbW1hbmRcIiwgVGVzdEludGVyY2VwdG9yMik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhJbnRlcmNlcHRvci5pbnRlcmNlcHRvcnNPZihcInRlc3QuVGVzdENvbW1hbmRcIiksIFwiPT09PTIyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19