
/** 公式模块 */
export module Formula {
    /** 金币 */
    export class Gold {
        /** 金币价值 */
        public static goldCost(lv:number, maxLv:number,　cost:number):number{
            if (lv > maxLv){
                return cost + (lv - maxLv);
            } else {
                return cost;
            }
        }

        /** 日常收益 */
        public static dayGet(lv:number):number{
            return Math.floor(lv * 1.8);
        }

        /** 升级消耗 */
        public static upgradeCost(lv:number):number{
            return lv * 120;
        }
    }

}
