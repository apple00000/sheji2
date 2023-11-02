"use strict";
cc._RF.push(module, '1fe1d3cS4ZOUpBrBhZxt6l/', 'World');
// script/app/info/World.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
var LocalStorage_1 = require("../../../framework/persistence/LocalStorage");
var Network_1 = require("../network/Network");
var NetworkConfig_1 = require("../config/NetworkConfig");
var Armory_1 = require("./Armory");
var PropInfo_1 = require("./PropInfo");
var Newbies_1 = require("./Newbies");
var GameSupply_1 = require("../game/GameSupply");
var RecommendPropsController_1 = require("../home/RecommendPropsController");
var RecommendController_1 = require("../home/RecommendController");
var PropsItemController_1 = require("../home/PropsItemController");
var GameOver_1 = require("../game/GameOver");
var JackpotController_1 = require("../home/JackpotController");
var GameRelive_1 = require("../game/GameRelive");
var HomeController_1 = require("../home/HomeController");
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
var World;
(function (World) {
    /** 能量最高值 */
    World.POWER_MAX = 999;
    /** 金币最高等级 */
    World.GOLDLV_MAX = 999;
    /** 日常收益最高等级 */
    World.DAYEARN_MAX = 999;
    /** 分享上限 */
    World.SHARE_REWARD_MAX = 100;
    // 调用方法
    var gameSupply = new GameSupply_1.default();
    var recommendPropsController = new RecommendPropsController_1.default();
    var recommendController = new RecommendController_1.default();
    var propsItemController = new PropsItemController_1.default();
    var gameOver = new GameOver_1.default();
    var jackpotController = new JackpotController_1.default();
    var gameRelive = new GameRelive_1.default();
    var homeController = new HomeController_1.default();
    var My = /** @class */ (function () {
        function My() {
        }
        Object.defineProperty(My, "serverTime", {
            get: function () {
                var t = new Date().getTime();
                return this._serverTime + t - this._localTime;
            },
            set: function (value) {
                this._localTime = new Date().getTime();
                this._serverTime = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(My, "armory", {
            get: function () {
                if (!this._armory) {
                    this._armory = new Armory_1.default(JSON.parse(World.Storage.armory));
                }
                return this._armory;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(My, "propInfo", {
            get: function () {
                if (!this._propInfo) {
                    this._propInfo = new PropInfo_1.default(JSON.parse(World.Storage.props));
                }
                return this._propInfo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(My, "newbies", {
            get: function () {
                if (!this._newbies) {
                    this._newbies = new Newbies_1.default(JSON.parse(World.Storage.newbies));
                }
                return this._newbies;
            },
            enumerable: false,
            configurable: true
        });
        /** 玩家id */
        My.playerId = 0;
        /** 皮肤id */
        My.skinId = 1;
        /** 道具数量 */
        // public static diamond:number = 0;
        // /** 最高分 */
        // public static bestScore:number = 0;
        //
        // /** 当前关卡 */
        // public static level = 30;
        /** 本地时间 */
        My._localTime = 0;
        /** 服务器时间 */
        My._serverTime = 0;
        /** 武器库 */
        My._armory = null;
        /** 道具库 */
        My._propInfo = null;
        /** 新手引导 */
        My._newbies = null;
        return My;
    }());
    World.My = My;
    /** 更新Storage的key */
    World.updateStorageKeys = [];
    World.pushStorageKeys = [];
    /******************* 以下数据为客户端自己管理，初始值就是默认值 **********************/
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        Storage.init = function () {
            var _this = this;
            var updataKVData = LocalStorage_1.LocalStorage.getString("updateKVData");
            if (updataKVData != null && updataKVData != "") {
                World.updateStorageKeys = JSON.parse(updataKVData);
                World.updateStorageKeys.forEach(function (value) {
                    if (typeof _this["_" + value] == "number") {
                        _this["_" + value] = LocalStorage_1.LocalStorage.getNumber(value);
                    }
                    else if (typeof _this["_" + value] == "string") {
                        _this["_" + value] = LocalStorage_1.LocalStorage.getString(value);
                    }
                    else if (typeof _this["_" + value] == "boolean") {
                        _this["_" + value] = LocalStorage_1.LocalStorage.getBoolean(value);
                    }
                    else {
                        console.error("key=" + value + " type=" + typeof _this["_" + value]);
                    }
                });
            }
            // 测试
            gameSupply.onTest();
            this.initVideoAd();
        };
        // 初始化激励视频
        Storage.initVideoAd = function () {
            var _this = this;
            console.log("initVideoAd");
            this._videoAd = wx.createRewardedVideoAd({
                adUnitId: "adunit-82fe18506461f029"
            });
            this._videoAd.onError(function (res) {
                console.log("videoAd onError", res);
            });
            this._videoAd.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    _this.videoAd_do();
                }
                else {
                    // 关闭
                }
            });
        };
        // 展示激励视频
        Storage.videoAd_show = function () {
            var _this = this;
            console.log("videoAd_show");
            this._videoAd.show().catch(function () {
                // 失败重试
                _this._videoAd.load()
                    .then(function () { return _this._videoAd.show(); })
                    .catch(function (err) {
                    _this.videoAd_do();
                    console.log('激励视频 广告显示失败', err);
                });
            });
            this._videoAd.load();
        };
        // 视频处理事件
        Storage.videoAd_do = function () {
            console.log("videoAd_do:", this._videoSign);
            if (this._videoSign == 1) {
                cc.game.emit("video_1");
            }
            else if (this._videoSign == 2) {
                cc.game.emit("video_2");
            }
            else if (this._videoSign == 3) {
                cc.game.emit("video_3");
            }
            else if (this._videoSign == 4) {
                cc.game.emit("video_4");
            }
            else if (this._videoSign == 5) {
                cc.game.emit("video_5");
            }
            else if (this._videoSign == 6) {
                cc.game.emit("video_6");
            }
            else if (this._videoSign == 7) {
                cc.game.emit("video_7");
            }
            else if (this._videoSign == 8) {
                cc.game.emit("video_8");
            }
            this._videoSign = 0;
        };
        Storage.allKeys = function () {
            var keys = [];
            for (var key in Storage) {
                if (key.startsWith('_')) {
                    var k = key.substring(1);
                    keys.push(k);
                }
            }
            return keys;
        };
        Storage.updateKVData = function (key, value) {
            if (!World.updateStorageKeys.includes(key)) {
                World.updateStorageKeys.push(key);
            }
            if (typeof value == "number") {
                LocalStorage_1.LocalStorage.setNumber(key, value);
            }
            else if (typeof value == "boolean") {
                LocalStorage_1.LocalStorage.setBoolean(key, value);
            }
            else if (typeof value == "string") {
                LocalStorage_1.LocalStorage.setString(key, value);
            }
            LocalStorage_1.LocalStorage.setString("updateKVData", JSON.stringify(World.updateStorageKeys.concat(World.pushStorageKeys.filter(function (value1) { return !World.updateStorageKeys.includes(value1); }))));
            cc.find('Canvas').emit("UpdateStorage", key);
            if (NetworkConfig_1.NetworkConfig.connectServer) {
                this.modifyCount++;
                if (this.modifyCount > this.maxModify) {
                    this.modifyCount = 0;
                    Network_1.default.pushStorage();
                }
            }
        };
        Object.defineProperty(Storage, "gameLevel", {
            /** getter */
            get: function () {
                return this._gameLevel;
            },
            set: function (value) {
                if (this._gameLevel != value) {
                    this._gameLevel = value;
                    this.updateKVData("gameLevel", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "goldCount", {
            get: function () {
                return this._goldCount;
            },
            /**  setter  */
            set: function (value) {
                if (this._goldCount != value) {
                    this._goldCount = value;
                    this.updateKVData("goldCount", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "diamondCount", {
            get: function () {
                return this._diamondCount;
            },
            set: function (value) {
                if (this._diamondCount != value) {
                    this._diamondCount = value;
                    this.updateKVData("diamondCount", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "goldLv", {
            get: function () {
                return this._goldLv;
            },
            set: function (value) {
                if (this._goldLv != value) {
                    this._goldLv = value;
                    this.updateKVData("goldLv", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "dayEarnLv", {
            get: function () {
                return this._dayEarnLv;
            },
            set: function (value) {
                if (this._dayEarnLv != value) {
                    this._dayEarnLv = value;
                    this.updateKVData("dayEarnLv", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "power", {
            get: function () {
                return this._power;
            },
            set: function (value) {
                if (this._power != value) {
                    if (value > World.POWER_MAX) {
                        value = World.POWER_MAX;
                    }
                    this._power = value;
                    this.updateKVData("power", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "powerModifyTime", {
            get: function () {
                return this._powerModifyTime;
            },
            set: function (value) {
                if (this._powerModifyTime != value) {
                    this._powerModifyTime = value;
                    this.updateKVData("powerModifyTime", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "dayEarnTotalModifyTime", {
            get: function () {
                return this._dayEarnTotalModifyTime;
            },
            set: function (value) {
                if (this._dayEarnTotalModifyTime != value) {
                    this._dayEarnTotalModifyTime = value;
                    this.updateKVData("dayEarnTotalModifyTime", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "dayEarnExpireTime", {
            get: function () {
                return this._dayEarnExpireTime;
            },
            set: function (value) {
                if (this._dayEarnExpireTime != value) {
                    this._dayEarnExpireTime = value;
                    this.updateKVData("dayEarnExpireTime", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "dayEarnTotal", {
            get: function () {
                return this._dayEarnTotal;
            },
            set: function (value) {
                if (this._dayEarnTotal != value) {
                    this._dayEarnTotal = value;
                    this.dayEarnTotalModifyTime = World.My.serverTime;
                    this.updateKVData("dayEarnTotal", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "task", {
            get: function () {
                return this._task;
            },
            set: function (value) {
                if (this._task != value) {
                    this._task = value;
                    this.updateKVData("task", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "gameLucky", {
            get: function () {
                return this._gameLucky;
            },
            set: function (value) {
                if (this._gameLucky != value) {
                    this._gameLucky = value;
                    this.updateKVData("gameLucky", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "gameEnergy", {
            get: function () {
                return this._gameEnergy;
            },
            set: function (value) {
                if (this._gameEnergy != value) {
                    this._gameEnergy = value;
                    this.updateKVData("gameEnergy", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "shakeOpen", {
            get: function () {
                return this._shakeOpen;
            },
            set: function (value) {
                if (this._shakeOpen != value) {
                    this._shakeOpen = value;
                    this.updateKVData("shakeOpen", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "armory", {
            get: function () {
                return this._armory;
            },
            set: function (value) {
                if (this._armory != value) {
                    this._armory = value;
                    this.updateKVData("armory", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "HpLv", {
            get: function () {
                return this._HpLv;
            },
            set: function (value) {
                if (this._HpLv != value) {
                    this._HpLv = value;
                    this.updateKVData("HpLv", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "ADLv", {
            get: function () {
                return this._ADLv;
            },
            set: function (value) {
                if (this._ADLv != value) {
                    this._ADLv = value;
                    this.updateKVData("ADLv", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "passLuckyCount", {
            get: function () {
                return this._passLuckyCount;
            },
            set: function (value) {
                if (this._passLuckyCount != value) {
                    this._passLuckyCount = value;
                    this.updateKVData("passLuckyCount", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "props", {
            get: function () {
                return this._props;
            },
            set: function (value) {
                if (this._props != value) {
                    this._props = value;
                    this.updateKVData("props", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "newbies", {
            get: function () {
                return this._newbies;
            },
            set: function (value) {
                if (this._newbies != value) {
                    this._newbies = value;
                    this.updateKVData("newbies", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Storage, "unlockGun", {
            get: function () {
                return this._unlockGun;
            },
            set: function (value) {
                if (this._unlockGun != value) {
                    this._unlockGun = value;
                    this.updateKVData("unlockGun", value);
                }
            },
            enumerable: false,
            configurable: true
        });
        /** 关卡 */
        Storage._gameLevel = 1;
        /** 金币数量 */
        Storage._goldCount = 0;
        /** 钻石数量 */
        Storage._diamondCount = 0;
        /** 金币价值等级 */
        Storage._goldLv = 1;
        /** 日常收益等级 */
        Storage._dayEarnLv = 1;
        /** 体力 */
        Storage._power = 120;
        /** 体力结算时间 */
        Storage._powerModifyTime = 0;
        /** 日常收益结算时间　*/
        Storage._dayEarnTotalModifyTime = 0;
        /** 日常收益到期时间 */
        Storage._dayEarnExpireTime = 0;
        /** 日常总收益 */
        Storage._dayEarnTotal = 0;
        /** 任务 */
        Storage._task = "{}";
        /**　游戏中转盘数据 */
        Storage._gameLucky = "{\"time\":0,\"num\":0}";
        /** 游戏中的能量 */
        Storage._gameEnergy = 0;
        /** 震动开关 */
        Storage._shakeOpen = true;
        /** 新手引导开关 */
        Storage._newbies = "{}";
        Storage.modifyCount = 0;
        Storage.maxModify = 10;
        /** 生命力 */
        Storage._HpLv = 1;
        /** 战斗力 */
        Storage._ADLv = 1;
        /** 武器库 */
        Storage._armory = "{}";
        /** lucky进度条 */
        Storage._passLuckyCount = 0;
        /** 道具有效时间 */
        Storage._props = "{}";
        /** 解锁新枪(正数表示解锁新枪，负数表示已经解锁过的新枪，0表示初始状态) */
        Storage._unlockGun = 0;
        /* 激励视频 */
        Storage._videoAd = null;
        /* 视频事件标记 */
        Storage._videoSign = 0;
        return Storage;
    }());
    World.Storage = Storage;
})(World = exports.World || (exports.World = {}));

cc._RF.pop();