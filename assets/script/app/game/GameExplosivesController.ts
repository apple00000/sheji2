
import Explosive from "../entities/explosive/Explosive";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameExplosivesController extends cc.Component {

    @property(cc.Node)
    explosiveLayer:cc.Node = null;

    private _explosiveMap = new Map<number, Array<Explosive>>();

    private genExplosive(id:number):Explosive{
        let prefabPath = 'prefab/entities/explosive/explosive'+id;
        let entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        let node = cc.instantiate(entityPrefab);
        this.explosiveLayer.addChild(node);
        let explosive = <Explosive>node.getComponent(Explosive);
        explosive.init(id);
        let arr = this._explosiveMap.get(id);
        if (typeof arr == "undefined"){
            arr = [];
            this._explosiveMap.set(id, arr);
        }
        arr.push(explosive);
        node.active = false;
        return explosive;
    }

    getInactiveExplosive(id:number):Explosive{
        let result:Explosive = undefined;
        let arr = this._explosiveMap.get(id);
        if (typeof arr != 'undefined'){
            result = arr.find(value => value.node.active == false);
        }
        if (typeof result == "undefined"){
            result = this.genExplosive(id);
        }
        return result;
    }
}
