
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Camera)
    camera:cc.Camera = null;

    @property(cc.Sprite)
    sprite:cc.Sprite = null;



    start () {
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.camera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;

        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color= cc.Color.BLACK;
        this.sprite.node.opacity = 100;

        // this.node.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
    }

    // update (dt) {}
}
