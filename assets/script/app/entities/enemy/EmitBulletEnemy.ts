
import {Music} from "../../../../framework/audio/Music";
import Enemy from "./Enemy";

const {ccclass} = cc._decorator;

@ccclass
export default class EmitBulletEnemy extends Enemy {

    protected doAttack(): void {
        Music.playSFX("sound/msc_en001");
        let bullet = window['GameBulletsController'].getInactiveEnemyBullet(this._enemyID);
        bullet.node.active = true;
        bullet.node.position = this.node.position;
        bullet.node.rotation = this.node.rotation;
        let dir = cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-bullet.node.rotation)).normalizeSelf();
        bullet.node.runAction(cc.sequence(cc.moveBy(this.attackDistance/this.bulletSpeed, dir.mul(this.attackDistance)), cc.callFunc(()=>{
            bullet.node.active = false;
        })));
    }
}
