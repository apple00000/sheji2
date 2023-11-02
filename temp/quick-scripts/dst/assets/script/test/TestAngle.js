
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/test/TestAngle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdGVzdC9UZXN0QW5nbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EOztJQWlCQSxDQUFDO0lBZkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix5QkFBSyxHQUFMO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBUyxLQUFLLGtCQUFhLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxpQkFBWSxPQUFPLGVBQVUsR0FBRyxDQUFDLENBQUMsZUFBVSxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUM7UUFDbEgsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFkZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWlCN0I7SUFBRCxnQkFBQztDQWpCRCxBQWlCQyxDQWpCc0MsRUFBRSxDQUFDLFNBQVMsR0FpQmxEO2tCQWpCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RBbmdsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VELCAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgcmFkaWFucyA9IGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtdGhpcy5ub2RlLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKDAsIDEpLnJvdGF0ZShyYWRpYW5zKTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gY2MudjIoMCwgMSkuYW5nbGUoZGlyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGFuZ2xlPSR7YW5nbGV9IHJvdGF0aW9uPSR7dGhpcy5ub2RlLnJvdGF0aW9ufSByYWRpYW5zPSR7cmFkaWFuc30gZGlyLng9JHtkaXIueH0gZGlyLnk9JHtkaXIueX1gKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnJvdGF0ZUJ5KDMsIDM2MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19