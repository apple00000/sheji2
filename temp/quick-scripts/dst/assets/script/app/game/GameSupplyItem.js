
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameSupplyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVN1cHBseUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUErRTtBQUUvRSx1Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQWlCO0lBQTdEO1FBQUEscUVBc0RDO1FBakRHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsd0JBQWtCLEdBQW9CLEVBQUUsQ0FBQztRQUd6QyxvQkFBYyxHQUFvQixFQUFFLENBQUM7UUFFN0IsWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFdBQUssR0FBRyxJQUFJLENBQUM7O0lBeUJ6QixDQUFDO3VCQXREb0IsY0FBYztJQStCL0IsbUNBQVUsR0FBVixVQUFXLElBQVMsRUFBRSxLQUFhO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBTSxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQUksQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUFLLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsZ0JBQWdCLENBQUEsQ0FBQyxDQUFBLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQSxDQUFDLENBQUEsR0FBRyxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUM7SUFDbkQsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxLQUFLLEVBQUUsSUFBSTtRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFFM0MsSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDO1lBQy9DLE9BQU87U0FDVjtRQUNELGdCQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xELENBQUM7O0lBbkRNLHlCQUFVLEdBQWMsSUFBSSxDQUFDO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDTTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7OERBQ2dCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MERBQ1k7SUExQnBCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FzRGxDO0lBQUQscUJBQUM7Q0F0REQsQUFzREMsQ0F0RDJDLDJCQUFpQixHQXNENUQ7a0JBdERvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFic3RyYWN0VGFibGVJdGVtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdGFibGV2aWV3L0Fic3RyYWN0VGFibGVJdGVtXCI7XHJcbmltcG9ydCBHYW1lU3VwcGx5IGZyb20gXCIuL0dhbWVTdXBwbHlcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN1cHBseUl0ZW0gZXh0ZW5kcyBBYnN0cmFjdFRhYmxlSXRlbSB7XHJcblxyXG4gICAgc3RhdGljIGdhbWVTdXBwbHk6R2FtZVN1cHBseSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbG9ja0xhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgYmdTcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgd2VhcG9uU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIG5hbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGJ1bGxldExhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBudW1MYWJlbDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgd2VhcG9uU3ByaXRlRnJhbWVzOltjYy5TcHJpdGVGcmFtZV0gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBiZ1Nwcml0ZUZyYW1lczpbY2MuU3ByaXRlRnJhbWVdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5kZXggPSAwO1xyXG4gICAgcHJpdmF0ZSBfZGF0YSA9IG51bGw7XHJcblxyXG4gICAgdXBhZHRlSXRlbShkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuYmdTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJnU3ByaXRlRnJhbWVzW0dhbWVTdXBwbHlJdGVtLmdhbWVTdXBwbHkuZm9jdXMgPT0gaW5kZXg/MTowXTtcclxuICAgICAgICB0aGlzLndlYXBvblNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMud2VhcG9uU3ByaXRlRnJhbWVzW2RhdGFbJ2lkJ10tMV07XHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gZGF0YVsnZ3VuX25hbWUnXTtcclxuICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IGAke1dvcmxkLk15LmFybW9yeS5wYXlsb2FkQWRkT2YoZGF0YVsnaWQnXSl9eDNgO1xyXG4gICAgICAgIHRoaXMubG9ja0xhYmVsLnN0cmluZyA9IGAke2RhdGFbJ3VubG9jayddfeWFs+ino+mUgWA7XHJcbiAgICAgICAgbGV0IGJMb2NrID0gV29ybGQuU3RvcmFnZS5nYW1lTGV2ZWwgPCBkYXRhWyd1bmxvY2snXTtcclxuICAgICAgICB0aGlzLmxvY2tMYWJlbC5ub2RlLmFjdGl2ZSA9IGJMb2NrO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsLm5vZGUuYWN0aXZlID0gIWJMb2NrO1xyXG4gICAgICAgIHRoaXMud2VhcG9uU3ByaXRlLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChiTG9jaz9cIjJkLWdyYXktc3ByaXRlXCI6XCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIHRoaXMud2VhcG9uU3ByaXRlLm5vZGUub3BhY2l0eSA9IGJMb2NrPzEyODoyNTU7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J1dHRvbihldmVudCwgZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJBjbGlja+OAkUdhbWVTdXBwbHlJdGVtIEJ1dHRvblwiKVxyXG5cclxuICAgICAgICBpZiAoV29ybGQuU3RvcmFnZS5nYW1lTGV2ZWwgPCB0aGlzLl9kYXRhWyd1bmxvY2snXSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZVN1cHBseUl0ZW0uZ2FtZVN1cHBseS5mb2N1cyA9IHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==