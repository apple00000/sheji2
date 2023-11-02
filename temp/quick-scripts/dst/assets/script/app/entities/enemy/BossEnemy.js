
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/enemy/BossEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1cc1d82RVB7rbf8Gux/Hri', 'BossEnemy');
// script/app/entities/enemy/BossEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_1 = require("./Enemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossEnemy = /** @class */ (function (_super) {
    __extends(BossEnemy, _super);
    function BossEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpBar = null;
        return _this;
    }
    __decorate([
        property(cc.ProgressBar)
    ], BossEnemy.prototype, "hpBar", void 0);
    BossEnemy = __decorate([
        ccclass
    ], BossEnemy);
    return BossEnemy;
}(Enemy_1.default));
exports.default = BossEnemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2VuZW15L0Jvc3NFbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQTRCO0FBRXRCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFLO0lBQTVDO1FBQUEscUVBTUM7UUFIRyxXQUFLLEdBQW1CLElBQUksQ0FBQzs7SUFHakMsQ0FBQztJQUhHO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NENBQ0k7SUFIWixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBTTdCO0lBQUQsZ0JBQUM7Q0FORCxBQU1DLENBTnNDLGVBQUssR0FNM0M7a0JBTm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuXHJcbn1cclxuIl19