
import Actions from "../actions/Actions";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("自定义/SwingEffect")
export default class SwingEffect extends cc.Component {

    @property({displayName:"开始角度"})
    startValue = 0;

    @property({displayName:"结束角度"})
    endValue = 0;

    @property({displayName:"角度差"})
    deltaValue = 8;

    @property({displayName:"速度"})
    speed = 360/2;

    @property({displayName:"摆动次数"})
    times = 8;

    @property({displayName:"衰减值"})
    damping = 0;

    @property({displayName:"周期性延时", textTips:"单摆到最高点时延时"})
    cycleDelay = 0;

    @property({displayName:"重复", textTips:"小于零表示repeatForever"})
    repeatNum = 0;

    @property({displayName:"重复延时", textTips:"重复次数不等于0时才有效"})
    repeatDelay = 0;

    onLoad () {
        let action = Actions.cycleAction(cc.rotateTo, this.startValue, this.endValue, this.deltaValue, this.speed, this.times, this.damping, this.cycleDelay);
        if (this.repeatNum > 0){
            action = cc.repeat(cc.sequence(action, cc.delayTime(this.repeatDelay)), this.repeatNum);
        } else if (this.repeatNum < 0){
            action = cc.repeatForever(cc.sequence(action, cc.delayTime(this.repeatDelay)));
        }
        this.node.runAction(action);
    }
}
