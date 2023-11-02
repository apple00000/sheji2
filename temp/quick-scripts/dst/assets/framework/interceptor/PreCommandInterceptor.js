
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/interceptor/PreCommandInterceptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvUHJlQ29tbWFuZEludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0E7SUFBQTtJQU9BLENBQUM7SUFIUywwQ0FBVSxHQUFoQixVQUFpQixHQUFPO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7dUNBQUUsT0FBTzs7Z0JBQ3RDLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxFQUFFLEVBQVQsQ0FBUyxDQUFDLEVBQUM7OztLQUM1QztJQUNMLDRCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQcUIsc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCB7SUNvbW1hbmRJbnRlcmNlcHRvcn0gZnJvbSBcIi4vQ29tbWFuZEludGVyY2VwdG9yXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJlQ29tbWFuZEludGVyY2VwdG9yIGltcGxlbWVudHMgSUNvbW1hbmRJbnRlcmNlcHRvciB7XHJcblxyXG4gICAgYWJzdHJhY3QgYXN5bmMgcHJlSGFuZGxlKC4uLmFyZ3MpOlByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gICAgYXN5bmMgcG9zdEhhbmRsZShyZXM6YW55LCAuLi5hcmdzKTpQcm9taXNle1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUoKSk7XHJcbiAgICB9XHJcbn0iXX0=