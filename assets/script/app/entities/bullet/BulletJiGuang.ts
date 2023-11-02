
import Bullet from "./Bullet";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletJiGuang extends Bullet {


    fly(dir: cc.Vec2, distance: number, speed: number): void {
    }


    onCollisionEnter(other, self) {
        super.onCollisionEnter(other, self);
        let action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(()=>{
            super.onCollisionEnter(other, self);
        })));
        action.setTag(1333);
        other.node.stopActionByTag(1333);
        other.node.runAction(action);
    }

    onCollisionExit(other, self){
        other.node.stopActionByTag(1333);
    }
}
