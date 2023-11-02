
import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletJuJiDan extends Bullet {


    fly(dir: cc.Vec2, distance: number, speed: number): void {
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.node.runAction(cc.sequence(cc.moveBy(distance/speed, dir.mul(distance)).easing(cc.easeCubicActionOut()), cc.callFunc(()=>{
            this.node.active = false;
        })));
    }
}
