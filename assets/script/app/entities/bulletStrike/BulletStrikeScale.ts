
import BulletStrike from "./BulletStrike";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletStrikeScale extends BulletStrike {
    init(id) {
    }


    strike() {
        this.node.rotation = Math.random()*360;
        this.node.scale = 0;
        this.node.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.callFunc(()=>{
            this.node.stopAllActions();
            this.node.active = false;
        })))
    }


}
