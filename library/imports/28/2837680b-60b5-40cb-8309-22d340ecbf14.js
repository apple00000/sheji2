"use strict";
cc._RF.push(module, '28376gLYLVAy4MJItNA7L8U', 'ZIndex');
// framework/component/ZIndex.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var ZIndex = /** @class */ (function (_super) {
    __extends(ZIndex, _super);
    function ZIndex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zIndex = 0;
        return _this;
    }
    ZIndex.prototype.onLoad = function () {
        if (this.zIndex != 0) {
            this.node.zIndex = this.zIndex;
        }
    };
    __decorate([
        property
    ], ZIndex.prototype, "zIndex", void 0);
    ZIndex = __decorate([
        ccclass,
        menu("自定义/ZIndex")
    ], ZIndex);
    return ZIndex;
}(cc.Component));
exports.default = ZIndex;

cc._RF.pop();