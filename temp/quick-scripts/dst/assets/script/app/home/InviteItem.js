
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/InviteItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '618ecW0IVZD/IS6hmiplscv', 'InviteItem');
// script/app/home/InviteItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTableItem_1 = require("../../../framework/tableview/AbstractTableItem");
var Extend_1 = require("../../../framework/extend/Extend");
var Network_1 = require("../network/Network");
var World_1 = require("../info/World");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rewardNum = 30;
var InviteItem = /** @class */ (function (_super) {
    __extends(InviteItem, _super);
    function InviteItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.idLabel = null;
        _this.iconSprite = null;
        _this.rewardLabel = null;
        _this.takenNode = null;
        _this.willTakeNode = null;
        _this.data = null;
        return _this;
    }
    InviteItem.prototype.upadteItem = function (data, index) {
        console.log(data, "share1===>upadteItem");
        this.data = data;
        this.idLabel.string = (index + 1).toString();
        this.rewardLabel.string = rewardNum.toString();
        Extend_1.ext.wxCreateImageToSprite(this.iconSprite, data['headUrl']);
        this.takenNode.active = data['receive'];
        this.willTakeNode.active = !this.takenNode.active;
    };
    InviteItem.prototype.onClickTakeReward = function (event, data) {
        var _this = this;
        console.log("【click】InviteItem TakeReward");
        if (this.data) {
            this.willTakeNode.getComponent(cc.Button).interactable = false;
            Network_1.default.takeShareReward("share1", this.data["playerId"]).then(function (res) {
                World_1.World.Storage.diamondCount += rewardNum;
                Facade_1.default.executeCommand('ShowTipsCommand', "\u94BB\u77F3 +" + rewardNum);
                _this.takenNode.active = true;
                _this.willTakeNode.active = !_this.takenNode.active;
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], InviteItem.prototype, "idLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], InviteItem.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], InviteItem.prototype, "rewardLabel", void 0);
    __decorate([
        property(cc.Node)
    ], InviteItem.prototype, "takenNode", void 0);
    __decorate([
        property(cc.Node)
    ], InviteItem.prototype, "willTakeNode", void 0);
    InviteItem = __decorate([
        ccclass
    ], InviteItem);
    return InviteItem;
}(AbstractTableItem_1.default));
exports.default = InviteItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvSW52aXRlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0ZBQStFO0FBQy9FLDJEQUFxRDtBQUNyRCw4Q0FBeUM7QUFDekMsdUNBQW9DO0FBQ3BDLDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFHckI7SUFBd0MsOEJBQWlCO0lBQXpEO1FBQUEscUVBMkNDO1FBeENHLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUdwQixVQUFJLEdBQUcsSUFBSSxDQUFDOztJQXlCeEIsQ0FBQztJQXZCRywrQkFBVSxHQUFWLFVBQVcsSUFBUyxFQUFFLEtBQWE7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0MsWUFBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDdEQsQ0FBQztJQUVELHNDQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUUsSUFBSTtRQUE3QixpQkFZQztRQVhHLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUUzQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUM7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMvRCxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7Z0JBQzdELGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQztnQkFDeEMsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsbUJBQU8sU0FBVyxDQUFDLENBQUM7Z0JBQzdELEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXZDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1U7SUFmWCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMkM5QjtJQUFELGlCQUFDO0NBM0NELEFBMkNDLENBM0N1QywyQkFBaUIsR0EyQ3hEO2tCQTNDb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQWJzdHJhY3RUYWJsZUl0ZW0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay90YWJsZXZpZXcvQWJzdHJhY3RUYWJsZUl0ZW1cIjtcclxuaW1wb3J0IHtleHR9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL0V4dGVuZFwiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmNvbnN0IHJld2FyZE51bSA9IDMwO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52aXRlSXRlbSBleHRlbmRzIEFic3RyYWN0VGFibGVJdGVtIHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBpZExhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaWNvblNwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHJld2FyZExhYmVsOmNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRha2VuTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHdpbGxUYWtlTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhID0gbnVsbDtcclxuXHJcbiAgICB1cGFkdGVJdGVtKGRhdGE6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEsIFwic2hhcmUxPT09PnVwYWR0ZUl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmlkTGFiZWwuc3RyaW5nID0gKGluZGV4KzEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSByZXdhcmROdW0udG9TdHJpbmcoKTtcclxuICAgICAgICBleHQud3hDcmVhdGVJbWFnZVRvU3ByaXRlKHRoaXMuaWNvblNwcml0ZSwgZGF0YVsnaGVhZFVybCddKTtcclxuICAgICAgICB0aGlzLnRha2VuTm9kZS5hY3RpdmUgPSBkYXRhWydyZWNlaXZlJ107XHJcbiAgICAgICAgdGhpcy53aWxsVGFrZU5vZGUuYWN0aXZlID0gIXRoaXMudGFrZW5Ob2RlLmFjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVGFrZVJld2FyZChldmVudCwgZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJBjbGlja+OAkUludml0ZUl0ZW0gVGFrZVJld2FyZFwiKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kYXRhKXtcclxuICAgICAgICAgICAgdGhpcy53aWxsVGFrZU5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIE5ldHdvcmsudGFrZVNoYXJlUmV3YXJkKFwic2hhcmUxXCIsIHRoaXMuZGF0YVtcInBsYXllcklkXCJdKS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgICAgICAgV29ybGQuU3RvcmFnZS5kaWFtb25kQ291bnQgKz0gcmV3YXJkTnVtO1xyXG4gICAgICAgICAgICAgICAgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKCdTaG93VGlwc0NvbW1hbmQnLCBg6ZK755+zICske3Jld2FyZE51bX1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFrZW5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbGxUYWtlTm9kZS5hY3RpdmUgPSAhdGhpcy50YWtlbk5vZGUuYWN0aXZlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19