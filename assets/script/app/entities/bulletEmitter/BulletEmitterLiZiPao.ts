
import BulletEmitter from "./BulletEmitter";
import GameBulletsController from "../../game/GameBulletsController";

export default class BulletEmitterLiZiPao extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 500;
        this._interval = 0.5;
        this._speed = 800;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        this.bulletCount--;
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.LiZiPao);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    }

}

