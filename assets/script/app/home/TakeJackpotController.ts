
import Facade from "../../../framework/facade/Facade";
import {ext} from "../../../framework/extend/Extend";
import {World} from "../info/World";
import {Music} from "../../../framework/audio/Music";
import {NetworkConfig} from "../config/NetworkConfig";
import Network from "../network/Network";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TakeJackpotController extends cc.Component {

    @property(cc.Label)
    oneLabel: cc.Label = null;

    @property(cc.Label)
    threeLabel: cc.Label = null;

    @property(cc.Node)
    oneButtonNode:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.updateView();
        Facade.canvasNode.on('UpdateStorage', this.onUpdateStorage, this);
        // this.oneBackgroundSprite.setMaterial(0, this.oneBackgroundSprite.getMaterial(1));
        // this.oneBackgroundSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        // this.oneButtonNode.active = false;
        // this.scheduleOnce(()=>this.oneButtonNode.active = true, 3);
    }

    onDestroy(){
        Facade.canvasNode.off('UpdateStorage', this.onUpdateStorage, this);
    }

    onUpdateStorage(key:string){
        if (key == "dayEarnTotal"){
            this.updateView();
        }
    }

    updateView(){
        this.oneLabel.string = ext.shortFormat(World.Storage.dayEarnTotal);
        this.threeLabel.string = ext.shortFormat(World.Storage.dayEarnTotal*3);
    }

    onTakeIt(event, data){
        data = parseInt(data);
        if (data == 1){
            this.node.destroy();
            Facade.canvasNode.emit("TakeJackpot", 1);
        }else {
            /** 看广告 */
            this.node.destroy();
            Facade.canvasNode.emit("TakeJackpot", 3);
        }
    }

}
