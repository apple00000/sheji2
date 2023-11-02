
import Bullet from "./Bullet";
import BulletStrikeLightning from "../bulletStrike/BulletStrikeLightning";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletHuoYan extends Bullet {

    onCollisionEnter(other, self) {
        super.onCollisionEnter(other, self);
        let action = cc.repeatForever(cc.sequence(cc.delayTime(0.3), cc.callFunc(()=>{
            super.onCollisionEnter(other, self);
        })));
        action.setTag(1388);
        other.node.stopActionByTag(1388);
        other.node.runAction(action);
    }

    onCollisionExit(other, self){
        other.node.stopActionByTag(1388);
    }


    strike(other, self): void {
        let gameBulletsController = window['GameBulletsController'];
        let bulletStrike = gameBulletsController.getInactiveBulletStrike(this.bulletId);
        bulletStrike.node.active = true;
        bulletStrike.node.position = cc.v2();
        bulletStrike.node.rotation = this.node.rotation;
        bulletStrike.node.setContentSize(other.node.getContentSize());
        bulletStrike.node.removeFromParent(false);
        bulletStrike.node.setParent(other.node);

        let spriteNode = (<BulletStrikeLightning>bulletStrike).spriteNode;
        bulletStrike.node.rotation = Math.random()*360;
        bulletStrike.node.runAction(cc.sequence(
            cc.repeat(
                cc.sequence(
                    cc.delayTime(0.05),
                    cc.callFunc(()=>{
                        spriteNode.active = !spriteNode.active;
                        // bulletStrike.node.rotation = Math.random()*360;
                    })
                ), 6),
            cc.callFunc(()=>{
                bulletStrike.node.stopAllActions();
                bulletStrike.node.active = false;
                bulletStrike.node.removeFromParent(false);
                bulletStrike.node.setParent(gameBulletsController.bulletLayer);
            })));
    }


    fly(dir: cc.Vec2, distance: number, speed: number): void {
        speed = 400;
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        let duration = distance/speed;
        this.node.runAction(cc.sequence(cc.moveBy(duration, dir.mul(distance)).easing(cc.easeSineOut()), cc.callFunc(()=>{
            this.node.active = false;
        })));
        this.node.scale = 0.3;
        this.node.opacity = 255;
        this.node.runAction(cc.spawn(cc.scaleTo(duration, distance/100), cc.fadeTo(duration, 50)));
    }
}