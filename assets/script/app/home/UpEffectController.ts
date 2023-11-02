
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UpEffectController extends cc.Component {

    @property
    eventName = "";

    @property(sp.Skeleton)
    ske:sp.Skeleton = null;


    onShowEffect(){
        this.ske.node.active = true;
        this.ske.setAnimation(0, "vfxAll", false);
    }

    onLoad () {
        if (this.eventName !== ""){
            Facade.canvasNode.on(this.eventName, this.onShowEffect, this);
        }
        this.ske.setCompleteListener(()=>{
            if (cc.isValid(this) && cc.isValid(this.ske)){
                this.ske.node.active = false;
            }
        });
        this.ske.node.active = false;
    }

    onDestroy(){
        Facade.canvasNode.off(this.eventName, this.onShowEffect, this);
    }
}
