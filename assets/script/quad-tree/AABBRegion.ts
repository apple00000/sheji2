

const {ccclass} = cc._decorator;

@ccclass
export default class AABBRegion extends cc.Component {
    /** 在第几层中 */
    level = -1;
    /** 第几个cell中 */
    index = -1;

    aabb(): cc.Rect{
        return this.node.getBoundingBox();
    }
}
