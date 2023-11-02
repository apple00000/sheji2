"use strict";
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