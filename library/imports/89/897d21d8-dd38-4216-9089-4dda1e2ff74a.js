"use strict";
cc._RF.push(module, '897d2HY3ThCFpCJTdoeL/dK', 'GameSupplyItem');
// script/app/game/GameSupplyItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTableItem_1 = require("../../../framework/tableview/AbstractTableItem");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameSupplyItem = /** @class */ (function (_super) {
    __extends(GameSupplyItem, _super);
    function GameSupplyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lockLabel = null;
        _this.bgSprite = null;
        _this.weaponSprite = null;
        _this.nameLabel = null;
        _this.bulletLabel = null;
        _this.numLabel = null;
        _this.weaponSpriteFrames = [];
        _this.bgSpriteFrames = [];
        _this._index = 0;
        _this._data = null;
        return _this;
    }
    GameSupplyItem_1 = GameSupplyItem;
    GameSupplyItem.prototype.upadteItem = function (data, index) {
        this._data = data;
        this._index = index;
        this.bgSprite.spriteFrame = this.bgSpriteFrames[GameSupplyItem_1.gameSupply.focus == index ? 1 : 0];
        this.weaponSprite.spriteFrame = this.weaponSpriteFrames[data['id'] - 1];
        this.nameLabel.string = data['gun_name'];
        this.numLabel.string = World_1.World.My.armory.payloadAddOf(data['id']) + "x3";
        this.lockLabel.string = data['unlock'] + "\u5173\u89E3\u9501";
        var bLock = World_1.World.Storage.gameLevel < data['unlock'];
        this.lockLabel.node.active = bLock;
        this.nameLabel.node.active = !bLock;
        this.weaponSprite.setMaterial(0, cc.Material.getBuiltinMaterial(bLock ? "2d-gray-sprite" : "2d-sprite"));
        this.weaponSprite.node.opacity = bLock ? 128 : 255;
    };
    GameSupplyItem.prototype.onClickButton = function (event, data) {
        console.log("【click】GameSupplyItem Button");
        if (World_1.World.Storage.gameLevel < this._data['unlock']) {
            return;
        }
        GameSupplyItem_1.gameSupply.focus = this._index;
    };
    var GameSupplyItem_1;
    GameSupplyItem.gameSupply = null;
    __decorate([
        property(cc.Label)
    ], GameSupplyItem.prototype, "lockLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameSupplyItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameSupplyItem.prototype, "weaponSprite", void 0);
    __decorate([
        property(cc.Label)
    ], GameSupplyItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameSupplyItem.prototype, "bulletLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameSupplyItem.prototype, "numLabel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameSupplyItem.prototype, "weaponSpriteFrames", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameSupplyItem.prototype, "bgSpriteFrames", void 0);
    GameSupplyItem = GameSupplyItem_1 = __decorate([
        ccclass
    ], GameSupplyItem);
    return GameSupplyItem;
}(AbstractTableItem_1.default));
exports.default = GameSupplyItem;

cc._RF.pop();