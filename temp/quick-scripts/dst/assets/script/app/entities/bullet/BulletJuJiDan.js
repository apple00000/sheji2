
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletJuJiDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aabefjCqDVKqrglQB8l3ylo', 'BulletJuJiDan');
// script/app/entities/bullet/BulletJuJiDan.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletJuJiDan = /** @class */ (function (_super) {
    __extends(BulletJuJiDan, _super);
    function BulletJuJiDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletJuJiDan.prototype.fly = function (dir, distance, speed) {
        var _this = this;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance / speed, dir.mul(distance)).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    BulletJuJiDan = __decorate([
        ccclass
    ], BulletJuJiDan);
    return BulletJuJiDan;
}(Bullet_1.default));
exports.default = BulletJuJiDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRKdUppRGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7O0lBU0EsQ0FBQztJQU5HLDJCQUFHLEdBQUgsVUFBSSxHQUFZLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQWpELGlCQUtDO1FBSkcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3RILEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBUmdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FTakM7SUFBRCxvQkFBQztDQVRELEFBU0MsQ0FUMEMsZ0JBQU0sR0FTaEQ7a0JBVG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0SnVKaURhbiBleHRlbmRzIEJ1bGxldCB7XHJcblxyXG5cclxuICAgIGZseShkaXI6IGNjLlZlYzIsIGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUucm90YXRpb24gPSA5MCAtIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKGRpci55LCBkaXIueCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KGRpc3RhbmNlL3NwZWVkLCBkaXIubXVsKGRpc3RhbmNlKSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuIl19