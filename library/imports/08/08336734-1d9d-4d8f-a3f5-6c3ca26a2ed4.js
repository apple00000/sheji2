"use strict";
cc._RF.push(module, '08336c0HZ1Nj6P1bDyiai7U', 'TestAngle');
// script/test/TestAngle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestAngle = /** @class */ (function (_super) {
    __extends(TestAngle, _super);
    function TestAngle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TestAngle.prototype.start = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, function () {
            var radians = cc.misc.degreesToRadians(-_this.node.rotation);
            var dir = cc.v2(0, 1).rotate(radians);
            var angle = cc.v2(0, 1).angle(dir);
            console.log("angle=" + angle + " rotation=" + _this.node.rotation + " radians=" + radians + " dir.x=" + dir.x + " dir.y=" + dir.y);
        });
        this.node.runAction(cc.rotateBy(3, 360));
    };
    TestAngle = __decorate([
        ccclass
    ], TestAngle);
    return TestAngle;
}(cc.Component));
exports.default = TestAngle;

cc._RF.pop();