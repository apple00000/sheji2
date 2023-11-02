
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/enemy/EnemyAABB.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2fd84qgTxlNla8RAGPr2aOb', 'EnemyAABB');
// script/app/entities/enemy/EnemyAABB.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AABBRegion_1 = require("../../../quad-tree/AABBRegion");
var Enemy_1 = require("./Enemy");
var _a = cc._decorator, ccclass = _a.ccclass, disallowMultiple = _a.disallowMultiple;
var EnemyAABB = /** @class */ (function (_super) {
    __extends(EnemyAABB, _super);
    function EnemyAABB() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._radius = 0;
        _this._enemy = null;
        return _this;
    }
    Object.defineProperty(EnemyAABB.prototype, "enemy", {
        get: function () {
            return this._enemy;
        },
        enumerable: false,
        configurable: true
    });
    EnemyAABB.prototype.onLoad = function () {
        this._radius = this.getComponent(cc.CircleCollider).radius;
        this._enemy = this.getComponent(Enemy_1.default);
    };
    EnemyAABB.prototype.aabb = function () {
        var doubleRadius = this._radius * 2;
        return cc.rect(this.node.x - this._radius, this.node.y - this._radius, doubleRadius, doubleRadius);
    };
    EnemyAABB = __decorate([
        ccclass,
        disallowMultiple
    ], EnemyAABB);
    return EnemyAABB;
}(AABBRegion_1.default));
exports.default = EnemyAABB;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2VuZW15L0VuZW15QUFCQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNERBQXVEO0FBQ3ZELGlDQUE0QjtBQUV0QixJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQTFDLE9BQU8sYUFBQSxFQUFFLGdCQUFnQixzQkFBaUIsQ0FBQztBQUlsRDtJQUF1Qyw2QkFBVTtJQUFqRDtRQUFBLHFFQW9CQztRQWxCVyxhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosWUFBTSxHQUFTLElBQUksQ0FBQzs7SUFnQmhDLENBQUM7SUFiRyxzQkFBSSw0QkFBSzthQUFUO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsd0JBQUksR0FBSjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFuQmdCLFNBQVM7UUFGN0IsT0FBTztRQUNQLGdCQUFnQjtPQUNJLFNBQVMsQ0FvQjdCO0lBQUQsZ0JBQUM7Q0FwQkQsQUFvQkMsQ0FwQnNDLG9CQUFVLEdBb0JoRDtrQkFwQm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFBQkJSZWdpb24gZnJvbSBcIi4uLy4uLy4uL3F1YWQtdHJlZS9BQUJCUmVnaW9uXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9FbmVteVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIGRpc2FsbG93TXVsdGlwbGV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15QUFCQiBleHRlbmRzIEFBQkJSZWdpb24ge1xyXG5cclxuICAgIHByaXZhdGUgX3JhZGl1cyA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5lbXk6RW5lbXkgPSBudWxsO1xyXG5cclxuXHJcbiAgICBnZXQgZW5lbXkoKTogRW5lbXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmVteTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSB0aGlzLmdldENvbXBvbmVudChjYy5DaXJjbGVDb2xsaWRlcikucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX2VuZW15ID0gdGhpcy5nZXRDb21wb25lbnQoRW5lbXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFhYmIoKTogY2MuUmVjdCB7XHJcbiAgICAgICAgbGV0IGRvdWJsZVJhZGl1cyA9IHRoaXMuX3JhZGl1cyAqIDI7XHJcbiAgICAgICAgcmV0dXJuIGNjLnJlY3QodGhpcy5ub2RlLnggLSB0aGlzLl9yYWRpdXMsIHRoaXMubm9kZS55IC0gdGhpcy5fcmFkaXVzLCBkb3VibGVSYWRpdXMsIGRvdWJsZVJhZGl1cyk7XHJcbiAgICB9XHJcbn1cclxuIl19