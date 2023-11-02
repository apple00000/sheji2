
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/ccnodeAwait.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8fb7amgeJpKe4gJLebr3F9k', 'ccnodeAwait');
// framework/extend/ccnodeAwait.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
function runAction(actionOrActionArray, tag) {
    return __awaiter(this, void 0, Promise, function () {
        var self;
        return __generator(this, function (_a) {
            self = this;
            return [2 /*return*/, new Promise(function (resolve) {
                    var seq = cc.sequence(actionOrActionArray, cc.callFunc(function () {
                        resolve();
                    }));
                    if (tag) {
                        seq.setTag(tag);
                    }
                    self.runAction(seq);
                })];
        });
    });
}
function once(type, useCapture) {
    return __awaiter(this, void 0, Promise, function () {
        var self;
        return __generator(this, function (_a) {
            self = this;
            return [2 /*return*/, new Promise(function (resolve) {
                    self.once(type, function (event) {
                        resolve(event);
                    }, null, useCapture);
                })];
        });
    });
}
cc.Node.prototype.runActionAwait = runAction;
cc.Node.prototype.onceAwait = once;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL2Njbm9kZUF3YWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBRW5HLFNBQWUsU0FBUyxDQUFFLG1CQUE4RCxFQUFFLEdBQVc7bUNBQUUsT0FBTzs7O1lBQ3RHLElBQUksR0FBWSxJQUFJLENBQUM7WUFDekIsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUN0QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQ25ELE9BQU8sRUFBRSxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0osSUFBSSxHQUFHLEVBQUU7d0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLEVBQUM7OztDQUNOO0FBR0QsU0FBZSxJQUFJLENBQUMsSUFBWSxFQUFFLFVBQW9CO21DQUFFLE9BQU87OztZQUN2RCxJQUFJLEdBQVksSUFBSSxDQUFDO1lBQ3pCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTztvQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxLQUFLO3dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxFQUFDOzs7Q0FDTjtBQUVELEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDN0MsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcnVuQWN0aW9uIChhY3Rpb25PckFjdGlvbkFycmF5OiBjYy5GaW5pdGVUaW1lQWN0aW9ufGNjLkZpbml0ZVRpbWVBY3Rpb25bXSwgdGFnPzpOdW1iZXIpOlByb21pc2Uge1xyXG4gICAgbGV0IHNlbGYgPSA8Y2MuTm9kZT50aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShhY3Rpb25PckFjdGlvbkFycmF5LCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICBzZXEuc2V0VGFnKHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYucnVuQWN0aW9uKHNlcSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG9uY2UodHlwZTogc3RyaW5nLCB1c2VDYXB0dXJlPzogYm9vbGVhbik6UHJvbWlzZXtcclxuICAgIGxldCBzZWxmID0gPGNjLk5vZGU+dGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZWxmLm9uY2UodHlwZSwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZXZlbnQpO1xyXG4gICAgICAgIH0sIG51bGwsIHVzZUNhcHR1cmUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNjLk5vZGUucHJvdG90eXBlLnJ1bkFjdGlvbkF3YWl0ID0gcnVuQWN0aW9uO1xyXG5jYy5Ob2RlLnByb3RvdHlwZS5vbmNlQXdhaXQgPSBvbmNlOyJdfQ==