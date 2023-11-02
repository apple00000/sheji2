
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/role/RoleAABB.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '77d4amxHlhAAaN1LjD+GliJ', 'RoleAABB');
// script/app/entities/role/RoleAABB.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AABBRegion_1 = require("../../../quad-tree/AABBRegion");
var _a = cc._decorator, ccclass = _a.ccclass, disallowMultiple = _a.disallowMultiple;
var RoleAABB = /** @class */ (function (_super) {
    __extends(RoleAABB, _super);
    function RoleAABB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._radius = 0;
        return _this;
    }
    RoleAABB.prototype.onLoad = function () {
        this._radius = this.getComponent(cc.CircleCollider).radius;
    };
    RoleAABB.prototype.aabb = function () {
        var doubleRadius = this._radius * 2;
        return cc.rect(this.node.x - this._radius, this.node.y - this._radius, doubleRadius, doubleRadius);
    };
    RoleAABB = __decorate([
        ccclass,
        disallowMultiple
    ], RoleAABB);
    return RoleAABB;
}(AABBRegion_1.default));
exports.default = RoleAABB;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3JvbGUvUm9sZUFBQkIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDREQUF1RDtBQUVqRCxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQTFDLE9BQU8sYUFBQSxFQUFFLGdCQUFnQixzQkFBaUIsQ0FBQztBQUlsRDtJQUFzQyw0QkFBVTtJQUFoRDtRQUFBLHFFQVlDO1FBVlcsYUFBTyxHQUFHLENBQUMsQ0FBQzs7SUFVeEIsQ0FBQztJQVJHLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMvRCxDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFYZ0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsZ0JBQWdCO09BQ0ksUUFBUSxDQVk1QjtJQUFELGVBQUM7Q0FaRCxBQVlDLENBWnFDLG9CQUFVLEdBWS9DO2tCQVpvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBBQUJCUmVnaW9uIGZyb20gXCIuLi8uLi8uLi9xdWFkLXRyZWUvQUFCQlJlZ2lvblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIGRpc2FsbG93TXVsdGlwbGV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVBQUJCIGV4dGVuZHMgQUFCQlJlZ2lvbiB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmFkaXVzID0gMDtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLmdldENvbXBvbmVudChjYy5DaXJjbGVDb2xsaWRlcikucmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIGFhYmIoKTogY2MuUmVjdCB7XHJcbiAgICAgICAgbGV0IGRvdWJsZVJhZGl1cyA9IHRoaXMuX3JhZGl1cyAqIDI7XHJcbiAgICAgICAgcmV0dXJuIGNjLnJlY3QodGhpcy5ub2RlLnggLSB0aGlzLl9yYWRpdXMsIHRoaXMubm9kZS55IC0gdGhpcy5fcmFkaXVzLCBkb3VibGVSYWRpdXMsIGRvdWJsZVJhZGl1cyk7XHJcbiAgICB9XHJcbn1cclxuIl19