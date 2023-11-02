
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestSpineEvent extends cc.Component {



    start () {
        let ske = this.getComponent(sp.Skeleton);
        ske.setEventListener((trackEntry, event) => {
            let animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });
    }

    // update (dt) {}
}
