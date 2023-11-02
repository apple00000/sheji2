"use strict";
cc._RF.push(module, 'cad22+MNstHcIlfr5+qbGo1', 'TestRotation');
// script/test/TestRotation.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.sprite = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.camera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;
        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color = cc.Color.BLACK;
        this.sprite.node.opacity = 100;
        // this.node.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
    };
    __decorate([
        property(cc.Camera)
    ], NewClass.prototype, "camera", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "sprite", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();