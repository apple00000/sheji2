
import TableViewMediator from "../../../framework/tableview/TableViewMediator";
import {NetworkConfig} from "../config/NetworkConfig";
import Network from "../network/Network";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InvitesController extends cc.Component {

    @property(TableViewMediator)
    tableviewMediator:TableViewMediator = null;


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        if (NetworkConfig.connectServer){
            Network.getShareList("share1").then(list=>{
                console.log(list, "share1===>");
                this.tableviewMediator.datas = list;
            });
        }
    }

}
