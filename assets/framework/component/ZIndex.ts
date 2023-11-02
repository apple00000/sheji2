
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("自定义/ZIndex")
export default class ZIndex extends cc.Component {

    @property
    zIndex = 0;

    onLoad () {
        if (this.zIndex != 0){
            this.node.zIndex = this.zIndex;
        }
    }
}
