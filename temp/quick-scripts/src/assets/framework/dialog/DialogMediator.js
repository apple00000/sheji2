"use strict";
cc._RF.push(module, 'ab009p+inpJkbGNSmjoh5ux', 'DialogMediator');
// framework/dialog/DialogMediator.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("../component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogMediator = /** @class */ (function (_super) {
    __extends(DialogMediator, _super);
    function DialogMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.content = null;
        _this.closeButtonNode = null;
        _this.closeButtonSrpite = null;
        _this.layoutOfLeftRight = null;
        /** 左边按钮 */
        _this.leftButtonNode = null;
        _this.leftButtonSprite = null;
        _this.layoutOfLeftButton = null;
        _this.iconNodeOfLeftButton = null;
        _this.iconSpriteOfLeftButton = null;
        _this.textNodeOfLeftButton = null;
        _this.textOfLeftButton = null;
        /** 右边按钮 **/
        _this.rightButtonNode = null;
        _this.rightButtonSprite = null;
        _this.layoutOfRightButton = null;
        _this.iconNodeOfRightButton = null;
        _this.iconSpriteOfRightButton = null;
        _this.textNodeOfRightButton = null;
        _this.textOfRightButton = null;
        return _this;
    }
    DialogMediator.prototype.onClickLeft = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "left");
        this.node.destroy();
    };
    DialogMediator.prototype.onClickRight = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "right");
        this.node.destroy();
    };
    DialogMediator.prototype.onClickClose = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "close");
        this.node.destroy();
    };
    DialogMediator.dialogPrefabName = null;
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "title", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "content", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "closeButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "closeButtonSrpite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfLeftRight", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "leftButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "leftButtonSprite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "iconNodeOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "iconSpriteOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "textNodeOfLeftButton", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "textOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "rightButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "rightButtonSprite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfRightButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "iconNodeOfRightButton", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "iconSpriteOfRightButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "textNodeOfRightButton", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "textOfRightButton", void 0);
    DialogMediator = __decorate([
        ccclass
    ], DialogMediator);
    return DialogMediator;
}(cc.Component));
exports.default = DialogMediator;

cc._RF.pop();