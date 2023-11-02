import {LocalStorage} from "../../../framework/persistence/LocalStorage";
import Network from "../network/Network";
import {NetworkConfig} from "../config/NetworkConfig";
import Armory from "./Armory";
import PropInfo from "./PropInfo";
import Newbies from "./Newbies";

import GameSupply from "../game/GameSupply";
import RecommendPropsController from "../home/RecommendPropsController"
import RecommendController from "../home/RecommendController"
import PropsItemController from "../home/PropsItemController"
import GameOver from "../game/GameOver"
import JackpotController from "../home/JackpotController"
import GameRelive from "../game/GameRelive"
import HomeController from "../home/HomeController"

/*
    视频事件记录
    1、道具推荐 【click】RecommendPropsController Use
    2、道具使用 【click】PropsItemController Use
    3、装备推荐 【click】RecommendController Use
    4、装备补给 【click】GameSupply UseSupply
    5、幸运大奖 【Click】GameOver onGameOverTake
    6、多倍金币 【click】JackpotController _takeIt     3
    7、复活 【click】GameRelive Relive
    8、高爆武器开局  【click】HomeController WeaponStart  
*/

export module World {
    /** 能量最高值 */
    export const POWER_MAX = 999;
    /** 金币最高等级 */
    export const GOLDLV_MAX = 999;
    /** 日常收益最高等级 */
    export const DAYEARN_MAX = 999;

    /** 分享上限 */
    export const SHARE_REWARD_MAX = 100;



    // 调用方法
    const gameSupply = new GameSupply();
    const recommendPropsController = new RecommendPropsController();
    const recommendController = new RecommendController();
    const propsItemController = new PropsItemController();
    const gameOver = new GameOver();
    const jackpotController = new JackpotController();
    const gameRelive = new GameRelive();
    const homeController = new HomeController();

    export class My {
        /** 昵称 */
        public static nickName: string;
        /** 头像url */
        public static avatarUrl: string;
        /** 性别 0：未知、1：男、2：女  */
        public static gender: number;
        /** 省份 */
        public static province: string;
        /** 城市 */
        public static city: string;
        /** 国家 */
        public static country: string;

        /** openId */
        public static openId: string;
        /** 加入复活币 */
        public static todayAdd: number;

        /** 上次添加时间 */
        public static lastAddTime: number;

        /** 复活币数量 */
        public static rebirthCoins: number;

        /** 玩家id */
        public static playerId: number = 0;
        /** 皮肤id */
        public static skinId: number = 1;
        /** 道具数量 */
        // public static diamond:number = 0;

        // /** 最高分 */
        // public static bestScore:number = 0;
        //
        // /** 当前关卡 */
        // public static level = 30;

        /** 本地时间 */
        private static _localTime = 0;

        /** 服务器时间 */
        private static _serverTime = 0;

        static get serverTime(): number {
            let t = new Date().getTime();
            return this._serverTime + t - this._localTime;
        }

        static set serverTime(value: number) {
            this._localTime = new Date().getTime();
            this._serverTime = value;
        }

        /** 武器库 */
        private static _armory: Armory = null;

        static get armory(): Armory {
            if (!this._armory) {
                this._armory = new Armory(JSON.parse(World.Storage.armory));
            }
            return this._armory;
        }

        /** 道具库 */
        private static _propInfo: PropInfo = null;

        static get propInfo(): PropInfo {
            if (!this._propInfo) {
                this._propInfo = new PropInfo(JSON.parse(World.Storage.props));
            }
            return this._propInfo;
        }

        /** 新手引导 */
        private static _newbies: Newbies = null;
        static get newbies(): Newbies {
            if (!this._newbies) {
                this._newbies = new Newbies(JSON.parse(World.Storage.newbies));
            }
            return this._newbies;
        }
    }


    /** 更新Storage的key */
    export let updateStorageKeys = [];
    export let pushStorageKeys = [];

    /******************* 以下数据为客户端自己管理，初始值就是默认值 **********************/
    export class Storage {
        /** 关卡 */
        private static _gameLevel = 1;
        /** 金币数量 */
        private static _goldCount = 0;
        /** 钻石数量 */
        private static _diamondCount = 0;
        /** 金币价值等级 */
        private static _goldLv = 1;
        /** 日常收益等级 */
        private static _dayEarnLv = 1;


        /** 体力 */
        private static _power = 120;

        /** 体力结算时间 */
        private static _powerModifyTime = 0;


        /** 日常收益结算时间　*/
        private static _dayEarnTotalModifyTime = 0;

        /** 日常收益到期时间 */
        private static _dayEarnExpireTime = 0;

        /** 日常总收益 */
        private static _dayEarnTotal = 0;

        /** 任务 */
        private static _task = "{}";

        /**　游戏中转盘数据 */
        private static _gameLucky = "{\"time\":0,\"num\":0}";

        /** 游戏中的能量 */
        private static _gameEnergy = 0;
        /** 震动开关 */
        private static _shakeOpen = true;

        /** 新手引导开关 */
        private static _newbies = "{}";

        private static modifyCount = 0;
        private static maxModify = 10;

        /** 生命力 */
        private static _HpLv = 1;
        /** 战斗力 */
        private static _ADLv = 1;

        /** 武器库 */
        private static _armory = "{}";

        /** lucky进度条 */
        private static _passLuckyCount = 0;

        /** 道具有效时间 */
        private static _props = "{}";

        /** 解锁新枪(正数表示解锁新枪，负数表示已经解锁过的新枪，0表示初始状态) */
        private static _unlockGun = 0;

        /* 激励视频 */
        private static _videoAd = null;
    
        /* 视频事件标记 */
        public static _videoSign = 0;

        
        public static init() {
            let updataKVData = LocalStorage.getString("updateKVData");
            if (updataKVData != null && updataKVData != "") {
                updateStorageKeys = JSON.parse(updataKVData);
                updateStorageKeys.forEach(value => {
                    if (typeof this["_" + value] == "number") {
                        this["_" + value] = LocalStorage.getNumber(value);
                    } else if (typeof this["_" + value] == "string") {
                        this["_" + value] = LocalStorage.getString(value);
                    } else if (typeof this["_" + value] == "boolean") {
                        this["_" + value] = LocalStorage.getBoolean(value);
                    } else {
                        console.error(`key=${value} type=${typeof this["_" + value]}`);
                    }
                });
            }

            // 测试
            gameSupply.onTest()

            this.initVideoAd()
        }

        // 初始化激励视频
        public static initVideoAd() {
            console.log("initVideoAd")

            this._videoAd = wx.createRewardedVideoAd({
                adUnitId: "adunit-82fe18506461f029"
            })
            this._videoAd.onError(function(res){
                console.log("videoAd onError", res)
            })
    
            this._videoAd.onClose(res => {
                if (res && res.isEnded || res === undefined) {
                    this.videoAd_do()
                }else {
                    // 关闭
                }
            })
        }

        // 展示激励视频
        public static videoAd_show(){
            console.log("videoAd_show")
            this._videoAd.show().catch(() => {
                // 失败重试
                this._videoAd.load()
                .then(() => this._videoAd.show())
                .catch(err => {
                    this.videoAd_do()
                    console.log('激励视频 广告显示失败',err)
                })
            })

            this._videoAd.load()
        }

        // 视频处理事件
        public static videoAd_do(){
            console.log("videoAd_do:", this._videoSign)
            if (this._videoSign==1) {
                cc.game.emit("video_1");

            }else if (this._videoSign==2) {
                cc.game.emit("video_2");

            }else if (this._videoSign==3) {
                cc.game.emit("video_3");

            }else if (this._videoSign==4) {
                cc.game.emit("video_4");

            }else if (this._videoSign==5) {
                cc.game.emit("video_5");

            }else if (this._videoSign==6) {
                cc.game.emit("video_6");

            }else if (this._videoSign==7) {
                cc.game.emit("video_7");

            }else if (this._videoSign==8) {
                cc.game.emit("video_8");
            }

            this._videoSign=0
        }


        public static allKeys(): Array<string> {
            let keys = [];
            for (let key in Storage) {
                if (key.startsWith('_')) {
                    let k = key.substring(1);
                    keys.push(k);
                }
            }
            return keys;
        }


        private static updateKVData(key: string, value: any) {
            if (!updateStorageKeys.includes(key)) {
                updateStorageKeys.push(key);
            }
            if (typeof value == "number") {
                LocalStorage.setNumber(key, value);
            } else if (typeof value == "boolean") {
                LocalStorage.setBoolean(key, value);
            } else if (typeof value == "string") {
                LocalStorage.setString(key, value);
            }
            LocalStorage.setString("updateKVData", JSON.stringify(updateStorageKeys.concat(pushStorageKeys.filter(value1 => !updateStorageKeys.includes(value1)))));
            cc.find('Canvas').emit("UpdateStorage", key);
            if (NetworkConfig.connectServer) {
                this.modifyCount++;
                if (this.modifyCount > this.maxModify) {
                    this.modifyCount = 0;
                    Network.pushStorage();
                }
            }
        }


        /** getter */
        static get gameLevel(): number {
            return this._gameLevel;
        }

        static get goldCount(): number {
            return this._goldCount;
        }

        static get diamondCount(): number {
            return this._diamondCount;
        }


        static get goldLv(): number {
            return this._goldLv;
        }


        static get dayEarnLv(): number {
            return this._dayEarnLv;
        }


        static get power(): number {
            return this._power;
        }


        static get powerModifyTime(): number {
            return this._powerModifyTime;
        }

        static get dayEarnTotalModifyTime(): number {
            return this._dayEarnTotalModifyTime;
        }

        static get dayEarnExpireTime(): number {
            return this._dayEarnExpireTime;
        }

        static get dayEarnTotal(): number {
            return this._dayEarnTotal;
        }

        static get task(): string {
            return this._task;
        }

        static get gameLucky(): string {
            return this._gameLucky;
        }

        static get gameEnergy(): number {
            return this._gameEnergy;
        }


        static get shakeOpen(): boolean {
            return this._shakeOpen;
        }


        static get armory(): string {
            return this._armory;
        }


        static get HpLv(): number {
            return this._HpLv;
        }

        static get ADLv(): number {
            return this._ADLv;
        }


        static get passLuckyCount(): number {
            return this._passLuckyCount;
        }


        static get props(): string {
            return this._props;
        }


        static get newbies(): string {
            return this._newbies;
        }


        static get unlockGun(): number {
            return this._unlockGun;
        }

        /**  setter  */
        static set goldCount(value: number) {
            if (this._goldCount != value) {
                this._goldCount = value;
                this.updateKVData("goldCount", value);
            }
        }

        static set diamondCount(value: number) {
            if (this._diamondCount != value) {
                this._diamondCount = value;
                this.updateKVData("diamondCount", value);
            }
        }


        static set goldLv(value: number) {
            if (this._goldLv != value) {
                this._goldLv = value;
                this.updateKVData("goldLv", value);
            }
        }


        static set dayEarnLv(value: number) {
            if (this._dayEarnLv != value) {
                this._dayEarnLv = value;
                this.updateKVData("dayEarnLv", value);
            }
        }


        static set power(value: number) {
            if (this._power != value) {
                if (value > POWER_MAX) {
                    value = POWER_MAX;
                }
                this._power = value;
                this.updateKVData("power", value);
            }
        }


        static set powerModifyTime(value: number) {
            if (this._powerModifyTime != value) {
                this._powerModifyTime = value;
                this.updateKVData("powerModifyTime", value);
            }
        }

        static set dayEarnTotalModifyTime(value: number) {
            if (this._dayEarnTotalModifyTime != value) {
                this._dayEarnTotalModifyTime = value;
                this.updateKVData("dayEarnTotalModifyTime", value);
            }
        }

        static set dayEarnExpireTime(value: number) {
            if (this._dayEarnExpireTime != value) {
                this._dayEarnExpireTime = value;
                this.updateKVData("dayEarnExpireTime", value);
            }
        }

        static set dayEarnTotal(value: number) {
            if (this._dayEarnTotal != value) {
                this._dayEarnTotal = value;
                this.dayEarnTotalModifyTime = World.My.serverTime;
                this.updateKVData("dayEarnTotal", value);
            }
        }

        static set task(value: string) {
            if (this._task != value) {
                this._task = value;
                this.updateKVData("task", value);
            }
        }


        static set gameLucky(value: string) {
            if (this._gameLucky != value) {
                this._gameLucky = value;
                this.updateKVData("gameLucky", value);
            }
        }


        static set gameEnergy(value: number) {
            if (this._gameEnergy != value) {
                this._gameEnergy = value;
                this.updateKVData("gameEnergy", value);
            }
        }

        static set shakeOpen(value: boolean) {
            if (this._shakeOpen != value) {
                this._shakeOpen = value;
                this.updateKVData("shakeOpen", value);
            }
        }


        static set armory(value: string) {
            if (this._armory != value) {
                this._armory = value;
                this.updateKVData("armory", value);
            }
        }


        static set HpLv(value: number) {
            if (this._HpLv != value) {
                this._HpLv = value;
                this.updateKVData("HpLv", value);
            }
        }

        static set ADLv(value: number) {
            if (this._ADLv != value) {
                this._ADLv = value;
                this.updateKVData("ADLv", value);
            }
        }

        static set passLuckyCount(value: number) {
            if (this._passLuckyCount != value) {
                this._passLuckyCount = value;
                this.updateKVData("passLuckyCount", value);
            }
        }


        static set props(value: string) {
            if (this._props != value) {
                this._props = value;
                this.updateKVData("props", value);
            }
        }


        static set gameLevel(value: number) {
            if (this._gameLevel != value) {
                this._gameLevel = value;
                this.updateKVData("gameLevel", value);
            }
        }


        static set newbies(value: string) {
            if (this._newbies != value) {
                this._newbies = value;
                this.updateKVData("newbies", value);
            }
        }


        static set unlockGun(value: number) {
            if (this._unlockGun != value) {
                this._unlockGun = value;
                this.updateKVData("unlockGun", value);
            }
        }
    }
}

