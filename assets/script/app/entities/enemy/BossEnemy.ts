
import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossEnemy extends Enemy {

    @property(cc.ProgressBar)
    hpBar: cc.ProgressBar = null;


}
