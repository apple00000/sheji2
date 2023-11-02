"use strict";
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