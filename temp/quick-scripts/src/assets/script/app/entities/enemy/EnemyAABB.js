"use strict";
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