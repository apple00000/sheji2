
const {ccclass, menu} = cc._decorator;

@ccclass
@menu("自定义/PauseAllRunningActions")
export default class PauseAllRunningActions extends cc.Component {
    onLoad () {
        let list = cc.director.getActionManager().pauseAllRunningActions();
        this.onDestroy = ()=>{
            cc.director.getActionManager().resumeTargets(list);
        };
    }
}
