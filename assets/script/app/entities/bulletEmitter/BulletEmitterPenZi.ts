
import BulletEmitter from "./BulletEmitter";
import GameBulletsController from "../../game/GameBulletsController";
import {World} from "../../info/World";

const magnify = 1;

export default class BulletEmitterPenZi extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 800;
        this._interval = 0.05;
        this._speed = 1500;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        this.bulletCount--;
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.PenZi);
        let ske = bullet.getComponent(sp.Skeleton);
        ske.setCompleteListener((trackEntry, loopCount) => {
            let name = trackEntry.animation ? trackEntry.animation.name : '';
            bullet.node.active = false;
        });
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.node.scale = magnify * World.My.armory.magnifyMul(bullet.bulletId);
        bullet.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        ske.setAnimation(0, "animation", false);
    }

}
