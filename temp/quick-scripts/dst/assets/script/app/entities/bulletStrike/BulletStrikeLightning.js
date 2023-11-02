
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bulletStrike/BulletStrikeLightning.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab684CB0vVLEKw8NZ+RRLXB', 'BulletStrikeLightning');
// script/app/entities/bulletStrike/BulletStrikeLightning.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletStrike_1 = require("./BulletStrike");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletStrikeLightning = /** @class */ (function (_super) {
    __extends(BulletStrikeLightning, _super);
    function BulletStrikeLightning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteNode = null;
        return _this;
    }
    BulletStrikeLightning.prototype.init = function (id) {
    };
    BulletStrikeLightning.prototype.strike = function () {
    };
    __decorate([
        property(cc.Node)
    ], BulletStrikeLightning.prototype, "spriteNode", void 0);
    BulletStrikeLightning = __decorate([
        ccclass
    ], BulletStrikeLightning);
    return BulletStrikeLightning;
}(BulletStrike_1.default));
exports.default = BulletStrikeLightning;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldFN0cmlrZS9CdWxsZXRTdHJpa2VMaWdodG5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUEwQztBQUVwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQWVDO1FBWkcsZ0JBQVUsR0FBVyxJQUFJLENBQUM7O0lBWTlCLENBQUM7SUFURyxvQ0FBSSxHQUFKLFVBQUssRUFBRTtJQUNQLENBQUM7SUFHRCxzQ0FBTSxHQUFOO0lBRUEsQ0FBQztJQVREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkRBQ1E7SUFIVCxxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQWV6QztJQUFELDRCQUFDO0NBZkQsQUFlQyxDQWZrRCxzQkFBWSxHQWU5RDtrQkFmb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRTdHJpa2UgZnJvbSBcIi4vQnVsbGV0U3RyaWtlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldFN0cmlrZUxpZ2h0bmluZyBleHRlbmRzIEJ1bGxldFN0cmlrZSB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzcHJpdGVOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBpbml0KGlkKSB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0cmlrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=