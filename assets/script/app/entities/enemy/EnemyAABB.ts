
import AABBRegion from "../../../quad-tree/AABBRegion";
import Enemy from "./Enemy";

const {ccclass, disallowMultiple} = cc._decorator;

@ccclass
@disallowMultiple
export default class EnemyAABB extends AABBRegion {

    private _radius = 0;

    private _enemy:Enemy = null;


    get enemy(): Enemy {
        return this._enemy;
    }

    onLoad(){
        this._radius = this.getComponent(cc.CircleCollider).radius;
        this._enemy = this.getComponent(Enemy);
    }

    aabb(): cc.Rect {
        let doubleRadius = this._radius * 2;
        return cc.rect(this.node.x - this._radius, this.node.y - this._radius, doubleRadius, doubleRadius);
    }
}
