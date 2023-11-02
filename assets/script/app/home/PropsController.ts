
import TableViewMediator from "../../../framework/tableview/TableViewMediator";
import {ExcelConfig} from "../../../framework/config/ExcelConfig";
import {ExcelTableNames} from "../config/ExcelTableNames";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropsController extends cc.Component {

    @property(TableViewMediator)
    tableViewMediator:TableViewMediator = null;

    @property(cc.Node)
    detailNode:cc.Node = null;

    @property(cc.Label)
    detailLabel:cc.Label = null;

    start(){
        this.detailNode.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.detailNode.active = false;
        });
        this.tableViewMediator.datas = ExcelConfig.getExcelTable(ExcelTableNames.Prop).filter(value => value['id'] != 7 && value['id'] != 8 && value['id'] != 10).sort((a, b) => a['order']-b['order']);
    }


}
