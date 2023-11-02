"use strict";
cc._RF.push(module, 'd06a8YvgQJJG4ULGjMJqc1Z', 'PropsItemController');
// script/app/home/PropsItemController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTableItem_1 = require("../../../framework/tableview/AbstractTableItem");
var PropsController_1 = require("./PropsController");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropsItemController = /** @class */ (function (_super) {
    __extends(PropsItemController, _super);
    function PropsItemController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propsController = null;
        _this.bgFrameSprite = null;
        _this.iconSprite = null;
        _this.nameLabel = null;
        _this.useNode = null;
        _this.usingNode = null;
        _this.foreverNode = null;
        _this.cdLabel = null;
        _this.iconSpriteFrames = [];
        _this._data = null;
        _this._index = null;
        return _this;
    }
    PropsItemController.prototype.onLoad = function () {
        var _this = this;
        this.schedule(function () {
            if (_this.node.active && _this.usingNode.active && _this._data) {
                var id = _this._data['id'];
                if (World_1.World.My.propInfo.beUsing(id)) {
                    _this.updateCD();
                }
                else {
                    _this.foreverNode.active = false;
                    _this.useNode.active = true;
                    _this.usingNode.active = false;
                }
            }
        }, 0.99);
        cc.game.on("video_2", function () {
            _this.onClickUseDo();
        }, this);
    };
    PropsItemController.prototype.updateCD = function () {
        var cd = Math.floor((World_1.World.My.propInfo.expireTime(this._data['id']) - new Date().getTime()) / 1000);
        var min = Math.floor(cd / 60);
        var sec = cd % 60;
        this.cdLabel.string = "\u5269\u4F59\u8BA1\u65F6 " + (("000" + min).substr(-2) + ":" + ("000" + sec).substr(-2));
    };
    PropsItemController.prototype.upadteItem = function (data, index) {
        this._data = data;
        this._index = index;
        // console.log(data, index);
        var id = data['id'];
        this.iconSprite.spriteFrame = this.iconSpriteFrames[id - 1];
        this.nameLabel.string = data['prop_name'];
        if (data['unlock'] == 0) {
            this.foreverNode.active = true;
            this.useNode.active = false;
            this.usingNode.active = false;
        }
        else if (!World_1.World.My.propInfo.beUsing(id)) {
            this.foreverNode.active = false;
            this.useNode.active = true;
            this.usingNode.active = false;
        }
        else {
            this.foreverNode.active = false;
            this.useNode.active = false;
            this.usingNode.active = true;
            this.updateCD();
        }
    };
    PropsItemController.prototype.onClickDetail = function () {
        console.log("【click】PropsItemController Detail");
        this.propsController.detailLabel.string = this._data['description'];
        this.propsController.detailNode.active = true;
    };
    PropsItemController.prototype.onClickUse = function () {
        console.log("【video】2 道具使用 【click】PropsItemController Use");
        World_1.World.Storage._videoSign = 2;
        World_1.World.Storage.videoAd_show();
    };
    PropsItemController.prototype.onClickUseDo = function () {
        World_1.World.My.propInfo.use(this._data['id']);
        this.upadteItem(this._data, this._index);
    };
    __decorate([
        property(PropsController_1.default)
    ], PropsItemController.prototype, "propsController", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropsItemController.prototype, "bgFrameSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropsItemController.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], PropsItemController.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "useNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "usingNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "foreverNode", void 0);
    __decorate([
        property(cc.Label)
    ], PropsItemController.prototype, "cdLabel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PropsItemController.prototype, "iconSpriteFrames", void 0);
    PropsItemController = __decorate([
        ccclass
    ], PropsItemController);
    return PropsItemController;
}(AbstractTableItem_1.default));
exports.default = PropsItemController;

cc._RF.pop();