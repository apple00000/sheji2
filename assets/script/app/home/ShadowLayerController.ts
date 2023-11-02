
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShadowLayerController extends cc.Component {

    @property(cc.Camera)
    shadowCamera:cc.Camera = null;

    @property(cc.Sprite)
    sprite:cc.Sprite = null;


    onLoad () {
        /** 设置影子(角色和敌人) */
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.shadowCamera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;
        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color= cc.Color.BLACK;
        this.sprite.node.opacity = 100;
    }
}
