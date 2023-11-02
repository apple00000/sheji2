
import {World} from "../info/World";
import {ext} from "../../../framework/extend/Extend";
import Facade from "../../../framework/facade/Facade";
import ExchangeController from "./ExchangeController";
import LoadingCommand from "./LoadingCommand";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopController extends cc.Component {

    @property(cc.RichText)
    goldLabel:cc.RichText = null;

    @property(cc.RichText)
    lvLabels: [cc.RichText] = [];

    init(){
        this.lvLabels.forEach((value, index) => value.string = `<b><outline color=#1e1e1e width=3>${World.Storage.gameLevel-1+index}</outline></b>`);
        if (World.Storage.gameLevel < 2){
            this.lvLabels[0].node.getParent().active = false;
        }
        this.updateView();
    }

    onLoad () {
        Facade.canvasNode.on("UpdateStorage", this.onUpdateStorageEvent, this);
        this.init();
    }

    onDestroy(){
        Facade.canvasNode.off("UpdateStorage", this.onUpdateStorageEvent, this);
    }

    onUpdateStorageEvent(key:string){
        if (key == "power"){
        } else if (key == "goldCount"){
            this.goldLabel.string = `<b><outline color=#1e1e1e width=3>${ext.shortFormat(World.Storage.goldCount)}</outline></b>`;
        } else if (key == "diamondCount"){
        }
    }

    updateView() {
        this.goldLabel.string = `<b><outline color=#1e1e1e width=3>${ext.shortFormat(World.Storage.goldCount)}</outline></b>`;
    }

    async onClickPlus(vent, data){
        console.log("【click】TopController Plus")

        data = parseInt(data);
        let [node] = await Facade.executeCommand("OpenViewCommand", "prefab/exchange");
        let exchangeController = node.getComponent("ExchangeController");
        exchangeController.type = data;
    }
}
