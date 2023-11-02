
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestAngle extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, ()=>{
            let radians = cc.misc.degreesToRadians(-this.node.rotation);
            let dir = cc.v2(0, 1).rotate(radians);
            let angle = cc.v2(0, 1).angle(dir);
            console.log(`angle=${angle} rotation=${this.node.rotation} radians=${radians} dir.x=${dir.x} dir.y=${dir.y}`);
        });
        this.node.runAction(cc.rotateBy(3, 360));
    }

    // update (dt) {}
}
