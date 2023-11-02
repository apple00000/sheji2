import TableViewMediator from "../../../framework/tableview/TableViewMediator";
import {ExcelConfig} from "../../../framework/config/ExcelConfig";
import {ExcelTableNames} from "../config/ExcelTableNames";
import {GameProxy} from "./GameProxy";
import GameSupplyItem from "./GameSupplyItem";
import {World} from "../info/World";

const {ccclass, property} = cc._decorator;

let OnceFlag = false;
@ccclass
export default class GameSupply extends cc.Component {

    @property(cc.Node)
    useGuideNode:cc.Node = null;

    @property(cc.Node)
    videoNode:cc.Node = null;

    @property(TableViewMediator)
    tableViewMediator:TableViewMediator = null;


    @property(cc.Node)
    noUseNode:cc.Node = null;

    private _focus = 0;


    get focus(): number {
        return this._focus;
    }

    set focus(value: number) {
        this._focus = value;
        this.tableViewMediator.updateData();
    }

    onLoad(){
        GameSupplyItem.gameSupply = this;
        /** 加载数据 */
        this.tableViewMediator.datas = ExcelConfig.getExcelTable(ExcelTableNames.Weapon).filter(value => value['id'] != 1).sort((a, b) =>a['order'] - b['order']);

        cc.game.on("video_4",()=>{
            this.onClickUseSupplyDo()
        },this);
    }


    protected onEnable(): void {
        if (OnceFlag){
            this.tableViewMediator.showAction();
        }
        OnceFlag = true;
        GameProxy.pauseGame = true;
        if (!World.My.newbies.state("FirstEntrySupply")){
            this.useGuideNode.x = 0;
            let newbieNode = new cc.Node();
            newbieNode.name = "newbieNode";
            newbieNode.position = this.useGuideNode.convertToWorldSpaceAR(cc.v2());
            cc.director.getScene().addChild(newbieNode);
            /** guideCircle */
            let guideCirclePrefab = cc.loader.getRes("prefab/guideCircle");
            let guideCircleNode = cc.instantiate(guideCirclePrefab);
            guideCircleNode.position = cc.v2();
            newbieNode.addChild(guideCircleNode);
            /** guideSke */
            let guideSkePrefab = cc.loader.getRes("prefab/guideSke");
            let guideSkeNode = cc.instantiate(guideSkePrefab);
            guideSkeNode.position = cc.v2();
            newbieNode.addChild(guideSkeNode);
            this.useGuideNode.x = 0;
            this.videoNode.active = false;
        }else {
            this.useGuideNode.x = 50;
            this.videoNode.active = true;
        }
        // this.noUseNode.active = false;
        // this.node.stopAllActions();
        // this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=>{
        //     this.noUseNode.active = true;
        // })));
    }

    onClickCloseSupply(){
        GameProxy.pauseGame = false;
        this.node.active = false;
    }

    onClickUseSupply(event, data){
        console.log("【video】4 装备补给【click】GameSupply UseSupply")
        
        World.Storage._videoSign=4
        World.Storage.videoAd_show() 
    }

    onClickUseSupplyDo(){
        let item = this.tableViewMediator.datas[this._focus];
        let gameRoleController = window['GameRoleController'];
        gameRoleController.bulletEmitter = item['id'];
        gameRoleController.bulletEmitterDelegate.payload = (World.My.armory.payloadAddOf(item['id'])) * 3;
        /** 设置弹容量 */
        this.onClickCloseSupply();
        let newbieNode = cc.director.getScene().getChildByName("newbieNode");
        if (newbieNode){
            newbieNode.destroy();
            World.My.newbies.finish("FirstEntrySupply");
        }
    }

    onTest(){
        console.log("gameSupply test")
    }
}
