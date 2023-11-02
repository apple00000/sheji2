
const {ccclass, property} = cc._decorator;

@ccclass
export default class TestWait extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.getComponent('BehaviorTree').tick();
    }
}
