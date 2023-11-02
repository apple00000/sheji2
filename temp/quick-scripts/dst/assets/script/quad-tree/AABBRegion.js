
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/quad-tree/AABBRegion.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcXVhZC10cmVlL0FBQkJSZWdpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQUEsT0FBTyxHQUFJLEVBQUUsQ0FBQyxVQUFVLFFBQWpCLENBQWtCO0FBR2hDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBU0M7UUFSRyxZQUFZO1FBQ1osV0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gsZUFBZTtRQUNmLFdBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUFLZixDQUFDO0lBSEcseUJBQUksR0FBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBUmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FTOUI7SUFBRCxpQkFBQztDQVRELEFBU0MsQ0FUdUMsRUFBRSxDQUFDLFNBQVMsR0FTbkQ7a0JBVG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBQUJCUmVnaW9uIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKiDlnKjnrKzlh6DlsYLkuK0gKi9cclxuICAgIGxldmVsID0gLTE7XHJcbiAgICAvKiog56ys5Yeg5LiqY2VsbOS4rSAqL1xyXG4gICAgaW5kZXggPSAtMTtcclxuXHJcbiAgICBhYWJiKCk6IGNjLlJlY3R7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==