
import {Music} from "../../../framework/audio/Music";
import {World} from "../info/World";
import View from "../../../framework/component/View";
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingsController extends cc.Component {

    @property(cc.Toggle)
    soundToggle:cc.Toggle = null;

    @property(cc.Toggle)
    shakeToggle:cc.Toggle = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.soundToggle.isChecked = Music.getMusicOpen();
        this.shakeToggle.isChecked = World.Storage.shakeOpen;
        let sfxCheckEventHandler = new cc.Component.EventHandler();
        sfxCheckEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        sfxCheckEventHandler.component = "SettingsController";
        sfxCheckEventHandler.handler = "sfxToggleCallback";
        sfxCheckEventHandler.customEventData = "";

        this.soundToggle.checkEvents.push(sfxCheckEventHandler);


        let shakeCheckEventHandler = new cc.Component.EventHandler();
        shakeCheckEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        shakeCheckEventHandler.component = "SettingsController";
        shakeCheckEventHandler.handler = "shakeToggleCallback";
        shakeCheckEventHandler.customEventData = "";

        this.shakeToggle.checkEvents.push(shakeCheckEventHandler);
    }

    sfxToggleCallback(event, data){
        if (this.soundToggle.isChecked != Music.getMusicOpen()){
            View.executeClickSoundCommand(event, data);
            Music.setMusicOpen(!Music.getMusicOpen());
            Music.sfxOpen = Music.getMusicOpen();
            Music.persistence();
            // Facade.canvasNode.emit("SwitchMusic", Music.getMusicOpen());
        }
    }

    shakeToggleCallback(event, data){
        if (this.shakeToggle.isChecked != World.Storage.shakeOpen){
            View.executeClickSoundCommand(event, data);
            World.Storage.shakeOpen = !World.Storage.shakeOpen;
        }
    }
}
