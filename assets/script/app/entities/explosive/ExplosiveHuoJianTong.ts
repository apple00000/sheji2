
import Explosive from "./Explosive";
import {GameProxy} from "../../game/GameProxy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExplosiveHuoJianTong extends Explosive {

    private _huojiantongSke:sp.Skeleton = null;



    init(id: number) {
        super.init(id);
        this.bThrought = true;
        // this.hurt = 1;
        this._huojiantongSke = this.node.getComponent(sp.Skeleton);
        this._huojiantongSke.setCompleteListener((trackEntry, loopCount) => {
            this.node.active = false;
            /*let name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "perfect01" || name == "perfect02" || name == "great01" || name == "great02") {
            }*/
        });
    }

    boom() {
        this._huojiantongSke.setAnimation(0, "biubiu_009b", false);
        GameProxy.emit(GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    }

    doRepeal(enemy, repel): void {
        enemy.doRepel(enemy.node.position.sub(this.node.position).normalize(), repel);
    }

}
