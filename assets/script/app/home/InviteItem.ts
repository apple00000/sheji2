
import AbstractTableItem from "../../../framework/tableview/AbstractTableItem";
import {ext} from "../../../framework/extend/Extend";
import Network from "../network/Network";
import {World} from "../info/World";
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

const rewardNum = 30;

@ccclass
export default class InviteItem extends AbstractTableItem {

    @property(cc.Label)
    idLabel:cc.Label = null;

    @property(cc.Sprite)
    iconSprite:cc.Sprite = null;

    @property(cc.Label)
    rewardLabel:cc.Label = null;

    @property(cc.Node)
    takenNode:cc.Node = null;

    @property(cc.Node)
    willTakeNode:cc.Node = null;


    private data = null;

    upadteItem(data: any, index: number) {
        console.log(data, "share1===>upadteItem");
        this.data = data;
        this.idLabel.string = (index+1).toString();
        this.rewardLabel.string = rewardNum.toString();
        ext.wxCreateImageToSprite(this.iconSprite, data['headUrl']);
        this.takenNode.active = data['receive'];
        this.willTakeNode.active = !this.takenNode.active;
    }

    onClickTakeReward(event, data){
        console.log("【click】InviteItem TakeReward")

        if (this.data){
            this.willTakeNode.getComponent(cc.Button).interactable = false;
            Network.takeShareReward("share1", this.data["playerId"]).then(res=>{
                World.Storage.diamondCount += rewardNum;
                Facade.executeCommand('ShowTipsCommand', `钻石 +${rewardNum}`);
                this.takenNode.active = true;
                this.willTakeNode.active = !this.takenNode.active;
            });
        }
    }
}
