
import BulletStrike from "./BulletStrike";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletStrikeLightning extends BulletStrike {

    @property(cc.Node)
    spriteNode:cc.Node = null;


    init(id) {
    }


    strike() {

    }


}
