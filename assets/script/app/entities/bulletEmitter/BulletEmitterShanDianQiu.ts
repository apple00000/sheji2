
import BulletEmitter from "./BulletEmitter";
import GameBulletsController from "../../game/GameBulletsController";
import {World} from "../../info/World";

const magnify = 1;

export default class BulletEmitterShanDianQiu extends BulletEmitter {

    constructor(gameBulletsController:GameBulletsController){
        super(gameBulletsController);
        this._firingRange = 1000;
        this._interval = 0.45;
        this._speed = 300;
    }

    fire(start: cc.Vec2, dir: cc.Vec2) {
        this.bulletCount--;
        let bullet = this.gameBulletsController.getInactiveBullet(BulletEmitter.TYPES.ShanDianQiu);
        bullet.node.active = true;
        bullet.node.position = start/*.add(dir.mul((<cc.CircleCollider>bullet.collider).radius))*/;
        bullet.node.scale = magnify * World.My.armory.magnifyMul(bullet.bulletId);
        bullet.fly(dir, this._firingRange, this._speed);
    }
}

