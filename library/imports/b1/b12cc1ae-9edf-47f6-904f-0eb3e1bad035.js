"use strict";
cc._RF.push(module, 'b12ccGunt9H9pBPDrPhutA1', 'Lightning');
// script/app/entities/prop/Lightning.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Lightning = /** @class */ (function (_super) {
    __extends(Lightning, _super);
    function Lightning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 默认高度375 */
        _this.ske = null;
        _this.lightEnemys = [];
        return _this;
    }
    Lightning.prototype.onLoad = function () {
        var _this = this;
        this.ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            _this.node.active = false;
            /** 生成一个新的 */
            if (_this.lightEnemys.length < 6) {
            }
        });
    };
    Lightning.prototype.joint = function (enemy) {
        this.lightEnemys.push(enemy);
        var sub = enemy.node.position.sub(this.node.position);
        var distance = sub.mag();
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(sub.y, sub.x));
        this.node.scaleY = distance / 375;
        this.node.active = true;
        this.ske.setAnimation(0, "animation", false);
    };
    __decorate([
        property(sp.Skeleton)
    ], Lightning.prototype, "ske", void 0);
    Lightning = __decorate([
        ccclass
    ], Lightning);
    return Lightning;
}(cc.Component));
exports.default = Lightning;

cc._RF.pop();