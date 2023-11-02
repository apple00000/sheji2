"use strict";
cc._RF.push(module, '6fe32R8NilNCJIY/KYNM8S+', 'ShadowLayerController');
// script/app/home/ShadowLayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShadowLayerController = /** @class */ (function (_super) {
    __extends(ShadowLayerController, _super);
    function ShadowLayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shadowCamera = null;
        _this.sprite = null;
        return _this;
    }
    ShadowLayerController.prototype.onLoad = function () {
        /** 设置影子(角色和敌人) */
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.shadowCamera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;
        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color = cc.Color.BLACK;
        this.sprite.node.opacity = 100;
    };
    __decorate([
        property(cc.Camera)
    ], ShadowLayerController.prototype, "shadowCamera", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShadowLayerController.prototype, "sprite", void 0);
    ShadowLayerController = __decorate([
        ccclass
    ], ShadowLayerController);
    return ShadowLayerController;
}(cc.Component));
exports.default = ShadowLayerController;

cc._RF.pop();