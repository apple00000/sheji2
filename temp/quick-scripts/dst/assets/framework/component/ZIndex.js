
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/ZIndex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1pJbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUE0QixFQUFFLENBQUMsVUFBVSxFQUF4QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWlCLENBQUM7QUFJaEQ7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFVQztRQVBHLFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBT2YsQ0FBQztJQUxHLHVCQUFNLEdBQU47UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBTkQ7UUFEQyxRQUFROzBDQUNFO0lBSE0sTUFBTTtRQUYxQixPQUFPO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQztPQUNFLE1BQU0sQ0FVMUI7SUFBRCxhQUFDO0NBVkQsQUFVQyxDQVZtQyxFQUFFLENBQUMsU0FBUyxHQVUvQztrQkFWb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHksIG1lbnV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi6Ieq5a6a5LmJL1pJbmRleFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaSW5kZXggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgekluZGV4ID0gMDtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnpJbmRleCAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuekluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=