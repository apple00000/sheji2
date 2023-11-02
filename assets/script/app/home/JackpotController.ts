
import {World} from "../info/World";
import {ExcelConfig} from "../../../framework/config/ExcelConfig";
import {ExcelTableNames} from "../config/ExcelTableNames";
import {ext} from "../../../framework/extend/Extend";
import {NetworkConfig} from "../config/NetworkConfig";
import Network from "../network/Network";
import Facade from "../../../framework/facade/Facade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JackpotController extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    takeLabel:cc.Label = null;

    @property(cc.Button)
    button:cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad(){
        this.progressBar.node.active = false;
        this.goldLabel.node.active = false;
        this.takeLabel.node.active = false;
        Facade.canvasNode.on('TakeJackpot', this._takeIt, this);
        this.init();

        cc.game.on("video_6",()=>{
            this.takeIt3Do()
        },this);
    }

    onDestroy(){
        Facade.canvasNode.off('TakeJackpot', this._takeIt, this);
    }


    init(){
        this.scheduleOnce(()=>{
            this.goldLabel.node.active = true;
            if (World.Storage.dayEarnTotalModifyTime == 0){
                World.Storage.dayEarnTotalModifyTime = World.My.serverTime;
            }
            if (World.Storage.dayEarnExpireTime  == 0){
                World.Storage.dayEarnExpireTime = World.My.serverTime + 24*60*60*1000;
            }
            this.schedule(() => {
                this.updateDayEarnCD();
            }, 0);
            this.updateDayEarnCD();
        }, 0.1);
    }

    updateDayEarnCD(){
        let currentTime = World.My.serverTime;
        let cdTime = (World.Storage.dayEarnExpireTime - currentTime)/1000;
        let progress = 0;
        if (cdTime > 0){
            progress = (24*60*60*1000 - cdTime*1000)/(24*60*60*1000);
            if (progress > 1){
                progress = 1;
            }
        }else {
            progress = 1;
        }
        this.progressBar.node.active = progress < 1;
        let cfg = ExcelConfig.getExcelTable(ExcelTableNames.GoldUp);
        let dayGet = cfg[World.Storage.dayEarnLv-1]['on_hook'];
        let diffTime = (World.My.serverTime - World.Storage.dayEarnTotalModifyTime)/1000;
        let addTotal = Math.floor(diffTime/3) * dayGet;
        if (addTotal > 0){
            World.Storage.dayEarnTotal += addTotal;
        }
        this.goldLabel.string = ext.shortFormat(World.Storage.dayEarnTotal);
        this.button.interactable = World.Storage.dayEarnTotal > 0;
        this.takeLabel.node.active = World.Storage.dayEarnTotal > 0;
        this.progressBar.progress = (diffTime%3) / 3;
    }

    _takeIt(num:number){
        console.log("【video】6 多倍金币【click】JackpotController _takeIt", num)

        if (num==1){
            this.takeId1()
        }else{
            this.takeIt3()
        }
    }

    takeId1() {
        World.Storage.goldCount += World.Storage.dayEarnTotal*1;
        Facade.executeCommand('ShowTipsCommand', `金币 +${ext.shortFormat(World.Storage.dayEarnTotal*1)}`);
        World.Storage.dayEarnTotal = 0;
        World.Storage.dayEarnExpireTime = World.My.serverTime + 24*60*60*1000;
        this.updateDayEarnCD();
        if (NetworkConfig.connectServer){
            Network.pushStorage();
        }
    }

    takeIt3() {
        World.Storage._videoSign=6
        World.Storage.videoAd_show() 
    }

    takeIt3Do(){
        World.Storage.goldCount += World.Storage.dayEarnTotal*3;
        Facade.executeCommand('ShowTipsCommand', `金币 +${ext.shortFormat(World.Storage.dayEarnTotal*3)}`);
        World.Storage.dayEarnTotal = 0;
        World.Storage.dayEarnExpireTime = World.My.serverTime + 24*60*60*1000;
        this.updateDayEarnCD();
        if (NetworkConfig.connectServer){
            Network.pushStorage();
        }
    }
}
