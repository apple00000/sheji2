
import GameBulletsController from "../../game/GameBulletsController";
import BulletEmitter from "./BulletEmitter";



export default class BulletEmitterHuoJianTong extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 1000;
        this._interval = 0.5;
        this._speed = 600;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        this.bulletCount--;
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.HuoJianTong);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    }
}
