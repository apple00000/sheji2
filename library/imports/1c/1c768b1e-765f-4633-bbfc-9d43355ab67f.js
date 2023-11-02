"use strict";
cc._RF.push(module, '1c768sedl9GM7v8nUM1WrZ/', 'TestWait');
// script/test/TestWait.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestWait = /** @class */ (function (_super) {
    __extends(TestWait, _super);
    function TestWait() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TestWait.prototype.start = function () {
    };
    TestWait.prototype.update = function (dt) {
        this.getComponent('BehaviorTree').tick();
    };
    TestWait = __decorate([
        ccclass
    ], TestWait);
    return TestWait;
}(cc.Component));
exports.default = TestWait;

cc._RF.pop();