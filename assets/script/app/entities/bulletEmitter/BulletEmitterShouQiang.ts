
import BulletEmitter from "./BulletEmitter";
import GameBulletsController from "../../game/GameBulletsController";



export default class BulletEmitterShouQiang extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 800;
        this._interval = 0.05;
        this._speed = 1500;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.ShouQiang);
        bullet.node.active = true;
        bullet.node.position = start;
        bullet.fly(dir, this._firingRange, this._speed);
    }
}
