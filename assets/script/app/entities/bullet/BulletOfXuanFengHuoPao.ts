
import Bullet from "./Bullet";
import {ExcelConfig} from "../../../../framework/config/ExcelConfig";
import {ExcelTableNames} from "../../config/ExcelTableNames";
import {World} from "../../info/World";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletOfXuanFengHuoPao extends Bullet {


    strike(other, self): void {
        // super.strike(other, self);
    }

    init(id: number): void {
        this.bulletId = id;
        let cfg = ExcelConfig.getExcelTable(ExcelTableNames.Prop)[this.bulletId-1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        let config = ExcelConfig.getExcelTable(ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt']*World.My.armory.hurtMulOf(1))*cfg['hurt'];
    }
}
