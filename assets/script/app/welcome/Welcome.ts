
import Network from "../network/Network";
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Welcome extends cc.Component {

    @property(cc.Node)
    bgNode:cc.Node = null;

    onLoad () {
        console.log("xxx1")

        cc.warn = ()=>{};
        let promises = [];

        promises.push(Facade.executeCommand("LoadingCommand"));
        console.log("xxx2")
        promises.push(new Promise(resolve => {
            this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(()=>resolve())));
        }));
        console.log("xxx3")
        Promise.all(promises).then(()=>{
            cc.loader.loadRes("prefab/HomeScene", cc.Prefab, (error, resource) => {
                if (error == null){
                    let homeScene = cc.instantiate(resource);
                    Facade.canvasNode.addChild(homeScene);
                    this.bgNode.destroy();
                }else {
                    console.error(error);
                }
            });
        });
        console.log("xxx4")
    }
}
