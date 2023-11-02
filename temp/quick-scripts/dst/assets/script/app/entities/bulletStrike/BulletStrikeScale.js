
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletStrike/BulletStrikeScale.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a91eflkUmlHFK31B+j3oPQW', 'BulletStrikeScale');
// script/app/entities/bulletStrike/BulletStrikeScale.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletStrike_1 = require("./BulletStrike");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletStrikeScale = /** @class */ (function (_super) {
    __extends(BulletStrikeScale, _super);
    function BulletStrikeScale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletStrikeScale.prototype.init = function (id) {
    };
    BulletStrikeScale.prototype.strike = function () {
        var _this = this;
        this.node.rotation = Math.random() * 360;
        this.node.scale = 0;
        this.node.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.callFunc(function () {
            _this.node.stopAllActions();
            _this.node.active = false;
        })));
    };
    BulletStrikeScale = __decorate([
        ccclass
    ], BulletStrikeScale);
    return BulletStrikeScale;
}(BulletStrike_1.default));
exports.default = BulletStrikeScale;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldFN0cmlrZS9CdWxsZXRTdHJpa2VTY2FsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQTBDO0FBRXBDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQStDLHFDQUFZO0lBQTNEOztJQWVBLENBQUM7SUFkRyxnQ0FBSSxHQUFKLFVBQUssRUFBRTtJQUNQLENBQUM7SUFHRCxrQ0FBTSxHQUFOO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDNUQsS0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQVpnQixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQWVyQztJQUFELHdCQUFDO0NBZkQsQUFlQyxDQWY4QyxzQkFBWSxHQWUxRDtrQkFmb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRTdHJpa2UgZnJvbSBcIi4vQnVsbGV0U3RyaWtlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldFN0cmlrZVNjYWxlIGV4dGVuZHMgQnVsbGV0U3RyaWtlIHtcclxuICAgIGluaXQoaWQpIHtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RyaWtlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkqMzYwO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMiwgMSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSkpKVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19