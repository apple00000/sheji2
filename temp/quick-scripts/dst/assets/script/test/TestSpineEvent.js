
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/test/TestSpineEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90c1f8f8DJO3rWorMFglZHA', 'TestSpineEvent');
// script/test/TestSpineEvent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestSpineEvent = /** @class */ (function (_super) {
    __extends(TestSpineEvent, _super);
    function TestSpineEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestSpineEvent.prototype.start = function () {
        var ske = this.getComponent(sp.Skeleton);
        ske.setEventListener(function (trackEntry, event) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });
    };
    TestSpineEvent = __decorate([
        ccclass
    ], TestSpineEvent);
    return TestSpineEvent;
}(cc.Component));
exports.default = TestSpineEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdGVzdC9UZXN0U3BpbmVFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7O0lBYUEsQ0FBQztJQVRHLDhCQUFLLEdBQUw7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBQyxVQUFVLEVBQUUsS0FBSztZQUNuQyxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUUsVUFBVSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5SyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFWZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWFsQztJQUFELHFCQUFDO0NBYkQsQUFhQyxDQWIyQyxFQUFFLENBQUMsU0FBUyxHQWF2RDtrQkFib0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RTcGluZUV2ZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBsZXQgc2tlID0gdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHNrZS5zZXRFdmVudExpc3RlbmVyKCh0cmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGV2ZW50OiAlcywgJXMsICVzLCAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGV2ZW50LmRhdGEubmFtZSwgZXZlbnQuaW50VmFsdWUsIGV2ZW50LmZsb2F0VmFsdWUsIGV2ZW50LnN0cmluZ1ZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==