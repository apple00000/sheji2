
const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class AbstractTableItem extends cc.Component {

    abstract upadteItem(data:any, index:number);
}
