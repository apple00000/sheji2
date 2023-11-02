
import PropBase from "./PropBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Guns extends PropBase {

    ske:sp.Skeleton = null;

    onLoad(){
        super.onLoad();
        this.ske = this.getComponent(sp.Skeleton);
    }


    init(id: number): void {
        super.init(id);
        this.ske.setSkin(("000"+(id-100)).substr(-3));
    }

    display(){
        this._on_off = false;
        this.node.active = true;
        this.ske.setAnimation(0, "gun_002", true);
        //倒计时
        if (this.cd > 0){
            this.node.runAction(cc.sequence(cc.delayTime(this.cd-5), cc.callFunc(()=>{
                this.ske.setAnimation(0, "gun", true);
            }), cc.blink(5, 25), cc.callFunc(()=>{
                this.node.active = false;
            })));
        }
    }
}
