
import AABBRegion from "../../../quad-tree/AABBRegion";

const {ccclass, disallowMultiple} = cc._decorator;

@ccclass
@disallowMultiple
export default class RoleAABB extends AABBRegion {

    private _radius = 0;

    onLoad(){
        this._radius = this.getComponent(cc.CircleCollider).radius;
    }

    aabb(): cc.Rect {
        let doubleRadius = this._radius * 2;
        return cc.rect(this.node.x - this._radius, this.node.y - this._radius, doubleRadius, doubleRadius);
    }
}
