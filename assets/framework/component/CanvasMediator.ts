import Facade from "../facade/Facade";

const {ccclass, property, menu, executionOrder, requireComponent} = cc._decorator;

let bLaunch = false;


@ccclass
@menu("自定义/CanvasMediator")
@requireComponent(cc.Canvas)
@executionOrder(-10)
export default class CanvasMediator extends cc.Component {

    @property(cc.Prefab)
    scenePrefab:cc.Prefab = null;

    async onLoad () {
        // console.log(this);
        Facade.canvasNode = this.node;
        if (this.scenePrefab){
            let node = cc.instantiate(this.scenePrefab);
            node.setParent(this.node);
        }
        if (!bLaunch){
            let [result] = await Facade.executeCommand("StartupCommand");
            if (result){
                console.log("程序启动成功...");
            } else {
                console.log("程序启动失败!!!");
            }
            bLaunch = true;
        }
    }

    onDestroy(){
        Facade.canvasNode = null;
    }

}
