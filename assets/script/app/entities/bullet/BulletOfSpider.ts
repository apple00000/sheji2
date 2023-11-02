
import BulletOfEnemy from "./BulletOfEnemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletOfSpider extends BulletOfEnemy {

    ske:sp.Skeleton = null;


    init(id: number): void {
        super.init(id);
        this.bThrought = true;
        this.ske = this.getComponent(sp.Skeleton);
        this.ske.setCompleteListener(()=>{
            this.node.active = false;
        })
    }

    boom(){
        this.ske.setAnimation(0, "slow", false);
    }
}
