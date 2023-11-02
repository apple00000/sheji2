"use strict";
cc._RF.push(module, '89858T6hXVPE6i2+IlNrBWF', 'GameExplosivesController');
// script/app/game/GameExplosivesController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Explosive_1 = require("../entities/explosive/Explosive");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameExplosivesController = /** @class */ (function (_super) {
    __extends(GameExplosivesController, _super);
    function GameExplosivesController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.explosiveLayer = null;
        _this._explosiveMap = new Map();
        return _this;
    }
    GameExplosivesController.prototype.genExplosive = function (id) {
        var prefabPath = 'prefab/entities/explosive/explosive' + id;
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        this.explosiveLayer.addChild(node);
        var explosive = node.getComponent(Explosive_1.default);
        explosive.init(id);
        var arr = this._explosiveMap.get(id);
        if (typeof arr == "undefined") {
            arr = [];
            this._explosiveMap.set(id, arr);
        }
        arr.push(explosive);
        node.active = false;
        return explosive;
    };
    GameExplosivesController.prototype.getInactiveExplosive = function (id) {
        var result = undefined;
        var arr = this._explosiveMap.get(id);
        if (typeof arr != 'undefined') {
            result = arr.find(function (value) { return value.node.active == false; });
        }
        if (typeof result == "undefined") {
            result = this.genExplosive(id);
        }
        return result;
    };
    __decorate([
        property(cc.Node)
    ], GameExplosivesController.prototype, "explosiveLayer", void 0);
    GameExplosivesController = __decorate([
        ccclass
    ], GameExplosivesController);
    return GameExplosivesController;
}(cc.Component));
exports.default = GameExplosivesController;

cc._RF.pop();