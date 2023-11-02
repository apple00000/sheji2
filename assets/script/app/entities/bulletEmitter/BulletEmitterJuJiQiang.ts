
import BulletEmitter from "./BulletEmitter";
import GameBulletsController from "../../game/GameBulletsController";

export default class BulletEmitterJuJiQiang extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 2000;
        this._interval = 0.5;
        this._speed = 2000;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        this.bulletCount--;
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.JuJiQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    }
}

