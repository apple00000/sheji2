
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletJiGuang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5191cP2MvJAj5S4Mn/Tj0r2', 'BulletJiGuang');
// script/app/entities/bullet/BulletJiGuang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletJiGuang = /** @class */ (function (_super) {
    __extends(BulletJiGuang, _super);
    function BulletJiGuang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletJiGuang.prototype.fly = function (dir, distance, speed) {
    };
    BulletJiGuang.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        _super.prototype.onCollisionEnter.call(this, other, self);
        var action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            _super.prototype.onCollisionEnter.call(_this, other, self);
        })));
        action.setTag(1333);
        other.node.stopActionByTag(1333);
        other.node.runAction(action);
    };
    BulletJiGuang.prototype.onCollisionExit = function (other, self) {
        other.node.stopActionByTag(1333);
    };
    BulletJiGuang = __decorate([
        ccclass
    ], BulletJiGuang);
    return BulletJiGuang;
}(Bullet_1.default));
exports.default = BulletJiGuang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRKaUd1YW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFDeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7O0lBb0JBLENBQUM7SUFqQkcsMkJBQUcsR0FBSCxVQUFJLEdBQVksRUFBRSxRQUFnQixFQUFFLEtBQWE7SUFDakQsQ0FBQztJQUdELHdDQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsSUFBSTtRQUE1QixpQkFRQztRQVBHLGlCQUFNLGdCQUFnQixZQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JFLGlCQUFNLGdCQUFnQixhQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxJQUFJO1FBQ3ZCLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFuQmdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FvQmpDO0lBQUQsb0JBQUM7Q0FwQkQsQUFvQkMsQ0FwQjBDLGdCQUFNLEdBb0JoRDtrQkFwQm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRKaUd1YW5nIGV4dGVuZHMgQnVsbGV0IHtcclxuXHJcblxyXG4gICAgZmx5KGRpcjogY2MuVmVjMiwgZGlzdGFuY2U6IG51bWJlciwgc3BlZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XHJcbiAgICAgICAgc3VwZXIub25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZik7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHN1cGVyLm9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgICAgYWN0aW9uLnNldFRhZygxMzMzKTtcclxuICAgICAgICBvdGhlci5ub2RlLnN0b3BBY3Rpb25CeVRhZygxMzMzKTtcclxuICAgICAgICBvdGhlci5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZil7XHJcbiAgICAgICAgb3RoZXIubm9kZS5zdG9wQWN0aW9uQnlUYWcoMTMzMyk7XHJcbiAgICB9XHJcbn1cclxuIl19