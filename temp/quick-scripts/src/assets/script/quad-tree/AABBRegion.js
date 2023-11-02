"use strict";
cc._RF.push(module, 'a6025pq4zRBAaeDsbWjyQrx', 'AABBRegion');
// script/quad-tree/AABBRegion.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var AABBRegion = /** @class */ (function (_super) {
    __extends(AABBRegion, _super);
    function AABBRegion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 在第几层中 */
        _this.level = -1;
        /** 第几个cell中 */
        _this.index = -1;
        return _this;
    }
    AABBRegion.prototype.aabb = function () {
        return this.node.getBoundingBox();
    };
    AABBRegion = __decorate([
        ccclass
    ], AABBRegion);
    return AABBRegion;
}(cc.Component));
exports.default = AABBRegion;

cc._RF.pop();