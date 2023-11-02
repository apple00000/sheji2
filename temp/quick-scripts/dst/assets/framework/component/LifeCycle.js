
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/LifeCycle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7c48jInGlJw7oRhT15QWXk', 'LifeCycle');
// framework/component/LifeCycle.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LifeCycle = /** @class */ (function (_super) {
    __extends(LifeCycle, _super);
    function LifeCycle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LifeCycle_1 = LifeCycle;
    LifeCycle.prototype.addCall = function (lifeName, callFunc, callObj) {
        var thatCall = this[lifeName];
        this[lifeName] = function () {
            if (thatCall) {
                thatCall();
            }
            if (callObj) {
                callFunc.call(callObj);
            }
            else {
                callFunc();
            }
        };
    };
    LifeCycle.onDestroyFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onDestroy", function () {
            if (node.isValid) {
                node.destroy();
            }
        });
    };
    LifeCycle.onDisableFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onDisable", function () {
            node.active = false;
        });
    };
    LifeCycle.onEnableFollow = function (node, followNode) {
        var lifeCycle = followNode.addComponent(LifeCycle_1);
        lifeCycle.addCall("onEnable", function () {
            node.active = true;
        });
    };
    var LifeCycle_1;
    LifeCycle = LifeCycle_1 = __decorate([
        ccclass
    ], LifeCycle);
    return LifeCycle;
}(cc.Component));
exports.default = LifeCycle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L0xpZmVDeWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsaUZBQWlGO0FBQ2pGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsMkZBQTJGO0FBQzNGLG1HQUFtRzs7QUFFN0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBc0NBLENBQUM7a0JBdENvQixTQUFTO0lBRTFCLDJCQUFPLEdBQVAsVUFBUSxRQUFlLEVBQUUsUUFBaUIsRUFBRSxPQUFlO1FBQ3ZELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDYixJQUFJLFFBQVEsRUFBQztnQkFDVCxRQUFRLEVBQUUsQ0FBQzthQUNkO1lBQ0QsSUFBSSxPQUFPLEVBQUM7Z0JBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVNLHlCQUFlLEdBQXRCLFVBQXVCLElBQVksRUFBRSxVQUFrQjtRQUNuRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVMsQ0FBQyxDQUFDO1FBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDYixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5QkFBZSxHQUF0QixVQUF1QixJQUFZLEVBQUUsVUFBa0I7UUFDbkQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFTLENBQUMsQ0FBQztRQUNuRCxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3QkFBYyxHQUFyQixVQUFzQixJQUFZLEVBQUUsVUFBa0I7UUFDbEQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFTLENBQUMsQ0FBQztRQUNuRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBckNnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBc0M3QjtJQUFELGdCQUFDO0NBdENELEFBc0NDLENBdENzQyxFQUFFLENBQUMsU0FBUyxHQXNDbEQ7a0JBdENvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZmVDeWNsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgYWRkQ2FsbChsaWZlTmFtZTpTdHJpbmcsIGNhbGxGdW5jOkZ1bmN0aW9uLCBjYWxsT2JqPzpPYmplY3Qpe1xyXG4gICAgICAgIGxldCB0aGF0Q2FsbCA9IHRoaXNbbGlmZU5hbWVdO1xyXG4gICAgICAgIHRoaXNbbGlmZU5hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhhdENhbGwpe1xyXG4gICAgICAgICAgICAgICAgdGhhdENhbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FsbE9iail7XHJcbiAgICAgICAgICAgICAgICBjYWxsRnVuYy5jYWxsKGNhbGxPYmopO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgb25EZXN0cm95Rm9sbG93KG5vZGU6Y2MuTm9kZSwgZm9sbG93Tm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgbGlmZUN5Y2xlID0gZm9sbG93Tm9kZS5hZGRDb21wb25lbnQoTGlmZUN5Y2xlKTtcclxuICAgICAgICBsaWZlQ3ljbGUuYWRkQ2FsbChcIm9uRGVzdHJveVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmlzVmFsaWQpe1xyXG4gICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgb25EaXNhYmxlRm9sbG93KG5vZGU6Y2MuTm9kZSwgZm9sbG93Tm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgbGlmZUN5Y2xlID0gZm9sbG93Tm9kZS5hZGRDb21wb25lbnQoTGlmZUN5Y2xlKTtcclxuICAgICAgICBsaWZlQ3ljbGUuYWRkQ2FsbChcIm9uRGlzYWJsZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG9uRW5hYmxlRm9sbG93KG5vZGU6Y2MuTm9kZSwgZm9sbG93Tm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgbGlmZUN5Y2xlID0gZm9sbG93Tm9kZS5hZGRDb21wb25lbnQoTGlmZUN5Y2xlKTtcclxuICAgICAgICBsaWZlQ3ljbGUuYWRkQ2FsbChcIm9uRW5hYmxlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==