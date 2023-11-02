
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/info/World.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2luZm8vV29ybGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBeUU7QUFDekUsOENBQXlDO0FBQ3pDLHlEQUFzRDtBQUN0RCxtQ0FBOEI7QUFDOUIsdUNBQWtDO0FBQ2xDLHFDQUFnQztBQUVoQyxpREFBNEM7QUFDNUMsNkVBQXVFO0FBQ3ZFLG1FQUE2RDtBQUM3RCxtRUFBNkQ7QUFDN0QsNkNBQXVDO0FBQ3ZDLCtEQUF5RDtBQUN6RCxpREFBMkM7QUFDM0MseURBQW1EO0FBRW5EOzs7Ozs7Ozs7O0VBVUU7QUFFRixJQUFjLEtBQUssQ0F5akJsQjtBQXpqQkQsV0FBYyxLQUFLO0lBQ2YsWUFBWTtJQUNDLGVBQVMsR0FBRyxHQUFHLENBQUM7SUFDN0IsYUFBYTtJQUNBLGdCQUFVLEdBQUcsR0FBRyxDQUFDO0lBQzlCLGVBQWU7SUFDRixpQkFBVyxHQUFHLEdBQUcsQ0FBQztJQUUvQixXQUFXO0lBQ0Usc0JBQWdCLEdBQUcsR0FBRyxDQUFDO0lBSXBDLE9BQU87SUFDUCxJQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztJQUNwQyxJQUFNLHdCQUF3QixHQUFHLElBQUksa0NBQXdCLEVBQUUsQ0FBQztJQUNoRSxJQUFNLG1CQUFtQixHQUFHLElBQUksNkJBQW1CLEVBQUUsQ0FBQztJQUN0RCxJQUFNLG1CQUFtQixHQUFHLElBQUksNkJBQW1CLEVBQUUsQ0FBQztJQUN0RCxJQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFRLEVBQUUsQ0FBQztJQUNoQyxJQUFNLGlCQUFpQixHQUFHLElBQUksMkJBQWlCLEVBQUUsQ0FBQztJQUNsRCxJQUFNLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztJQUNwQyxJQUFNLGNBQWMsR0FBRyxJQUFJLHdCQUFjLEVBQUUsQ0FBQztJQUU1QztRQUFBO1FBa0ZBLENBQUM7UUF0Q0csc0JBQVcsZ0JBQVU7aUJBQXJCO2dCQUNJLElB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QUcsQ0FBQyxDQUFDO1FBR3BDLGVBQWU7UUFDQSwrQkFBdUIsR0FBRyxDQUFDLENBQUM7UUFFM0MsZUFBZTtRQUNBLDBCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV0QyxZQUFZO1FBQ0cscUJBQWEsR0FBRyxDQUFDLENBQUM7UUFFakMsU0FBUztRQUNNLGFBQUssR0FBRyxJQUFJLENBQUM7UUFFNUIsY0FBYztRQUNDLGtCQUFVLEdBQUcsd0JBQXdCLENBQUM7UUFFckQsYUFBYTtRQUNFLG1CQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLFdBQVc7UUFDSSxrQkFBVSxHQUFHLElBQUksQ0FBQztRQUVqQyxhQUFhO1FBQ0UsZ0JBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsbUJBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsaUJBQVMsR0FBRyxFQUFFLENBQUM7UUFFOUIsVUFBVTtRQUNLLGFBQUssR0FBRyxDQUFDLENBQUM7UUFDekIsVUFBVTtRQUNLLGFBQUssR0FBRyxDQUFDLENBQUM7UUFFekIsVUFBVTtRQUNLLGVBQU8sR0FBRyxJQUFJLENBQUM7UUFFOUIsZUFBZTtRQUNBLHVCQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLGFBQWE7UUFDRSxjQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTdCLDBDQUEwQztRQUMzQixrQkFBVSxHQUFHLENBQUMsQ0FBQztRQUU5QixVQUFVO1FBQ0ssZ0JBQVEsR0FBRyxJQUFJLENBQUM7UUFFL0IsWUFBWTtRQUNFLGtCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBb1lqQyxjQUFDO0tBdmNELEFBdWNDLElBQUE7SUF2Y1ksYUFBTyxVQXVjbkIsQ0FBQTtBQUNMLENBQUMsRUF6akJhLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQXlqQmxCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhbFN0b3JhZ2V9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcGVyc2lzdGVuY2UvTG9jYWxTdG9yYWdlXCI7XHJcbmltcG9ydCBOZXR3b3JrIGZyb20gXCIuLi9uZXR3b3JrL05ldHdvcmtcIjtcclxuaW1wb3J0IHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vY29uZmlnL05ldHdvcmtDb25maWdcIjtcclxuaW1wb3J0IEFybW9yeSBmcm9tIFwiLi9Bcm1vcnlcIjtcclxuaW1wb3J0IFByb3BJbmZvIGZyb20gXCIuL1Byb3BJbmZvXCI7XHJcbmltcG9ydCBOZXdiaWVzIGZyb20gXCIuL05ld2JpZXNcIjtcclxuXHJcbmltcG9ydCBHYW1lU3VwcGx5IGZyb20gXCIuLi9nYW1lL0dhbWVTdXBwbHlcIjtcclxuaW1wb3J0IFJlY29tbWVuZFByb3BzQ29udHJvbGxlciBmcm9tIFwiLi4vaG9tZS9SZWNvbW1lbmRQcm9wc0NvbnRyb2xsZXJcIlxyXG5pbXBvcnQgUmVjb21tZW5kQ29udHJvbGxlciBmcm9tIFwiLi4vaG9tZS9SZWNvbW1lbmRDb250cm9sbGVyXCJcclxuaW1wb3J0IFByb3BzSXRlbUNvbnRyb2xsZXIgZnJvbSBcIi4uL2hvbWUvUHJvcHNJdGVtQ29udHJvbGxlclwiXHJcbmltcG9ydCBHYW1lT3ZlciBmcm9tIFwiLi4vZ2FtZS9HYW1lT3ZlclwiXHJcbmltcG9ydCBKYWNrcG90Q29udHJvbGxlciBmcm9tIFwiLi4vaG9tZS9KYWNrcG90Q29udHJvbGxlclwiXHJcbmltcG9ydCBHYW1lUmVsaXZlIGZyb20gXCIuLi9nYW1lL0dhbWVSZWxpdmVcIlxyXG5pbXBvcnQgSG9tZUNvbnRyb2xsZXIgZnJvbSBcIi4uL2hvbWUvSG9tZUNvbnRyb2xsZXJcIlxyXG5cclxuLypcclxuICAgIOinhumikeS6i+S7tuiusOW9lVxyXG4gICAgMeOAgemBk+WFt+aOqOiNkCDjgJBjbGlja+OAkVJlY29tbWVuZFByb3BzQ29udHJvbGxlciBVc2VcclxuICAgIDLjgIHpgZPlhbfkvb/nlKgg44CQY2xpY2vjgJFQcm9wc0l0ZW1Db250cm9sbGVyIFVzZVxyXG4gICAgM+OAgeijheWkh+aOqOiNkCDjgJBjbGlja+OAkVJlY29tbWVuZENvbnRyb2xsZXIgVXNlXHJcbiAgICA044CB6KOF5aSH6KGl57uZIOOAkGNsaWNr44CRR2FtZVN1cHBseSBVc2VTdXBwbHlcclxuICAgIDXjgIHlubjov5DlpKflpZYg44CQQ2xpY2vjgJFHYW1lT3ZlciBvbkdhbWVPdmVyVGFrZVxyXG4gICAgNuOAgeWkmuWAjemHkeW4gSDjgJBjbGlja+OAkUphY2twb3RDb250cm9sbGVyIF90YWtlSXQgICAgIDNcclxuICAgIDfjgIHlpI3mtLsg44CQY2xpY2vjgJFHYW1lUmVsaXZlIFJlbGl2ZVxyXG4gICAgOOOAgemrmOeIhuatpuWZqOW8gOWxgCAg44CQY2xpY2vjgJFIb21lQ29udHJvbGxlciBXZWFwb25TdGFydCAgXHJcbiovXHJcblxyXG5leHBvcnQgbW9kdWxlIFdvcmxkIHtcclxuICAgIC8qKiDog73ph4/mnIDpq5jlgLwgKi9cclxuICAgIGV4cG9ydCBjb25zdCBQT1dFUl9NQVggPSA5OTk7XHJcbiAgICAvKiog6YeR5biB5pyA6auY562J57qnICovXHJcbiAgICBleHBvcnQgY29uc3QgR09MRExWX01BWCA9IDk5OTtcclxuICAgIC8qKiDml6XluLjmlLbnm4rmnIDpq5jnrYnnuqcgKi9cclxuICAgIGV4cG9ydCBjb25zdCBEQVlFQVJOX01BWCA9IDk5OTtcclxuXHJcbiAgICAvKiog5YiG5Lqr5LiK6ZmQICovXHJcbiAgICBleHBvcnQgY29uc3QgU0hBUkVfUkVXQVJEX01BWCA9IDEwMDtcclxuXHJcblxyXG5cclxuICAgIC8vIOiwg+eUqOaWueazlVxyXG4gICAgY29uc3QgZ2FtZVN1cHBseSA9IG5ldyBHYW1lU3VwcGx5KCk7XHJcbiAgICBjb25zdCByZWNvbW1lbmRQcm9wc0NvbnRyb2xsZXIgPSBuZXcgUmVjb21tZW5kUHJvcHNDb250cm9sbGVyKCk7XHJcbiAgICBjb25zdCByZWNvbW1lbmRDb250cm9sbGVyID0gbmV3IFJlY29tbWVuZENvbnRyb2xsZXIoKTtcclxuICAgIGNvbnN0IHByb3BzSXRlbUNvbnRyb2xsZXIgPSBuZXcgUHJvcHNJdGVtQ29udHJvbGxlcigpO1xyXG4gICAgY29uc3QgZ2FtZU92ZXIgPSBuZXcgR2FtZU92ZXIoKTtcclxuICAgIGNvbnN0IGphY2twb3RDb250cm9sbGVyID0gbmV3IEphY2twb3RDb250cm9sbGVyKCk7XHJcbiAgICBjb25zdCBnYW1lUmVsaXZlID0gbmV3IEdhbWVSZWxpdmUoKTtcclxuICAgIGNvbnN0IGhvbWVDb250cm9sbGVyID0gbmV3IEhvbWVDb250cm9sbGVyKCk7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE15IHtcclxuICAgICAgICAvKiog5pi156ewICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBuaWNrTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIC8qKiDlpLTlg491cmwgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGF2YXRhclVybDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiDmgKfliKsgMO+8muacquefpeOAgTHvvJrnlLfjgIEy77ya5aWzICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2VuZGVyOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIOecgeS7vSAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcHJvdmluY2U6IHN0cmluZztcclxuICAgICAgICAvKiog5Z+O5biCICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjaXR5OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIOWbveWutiAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY291bnRyeTogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogb3BlbklkICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvcGVuSWQ6IHN0cmluZztcclxuICAgICAgICAvKiog5Yqg5YWl5aSN5rS75biBICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB0b2RheUFkZDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiog5LiK5qyh5re75Yqg5pe26Ze0ICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsYXN0QWRkVGltZTogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiog5aSN5rS75biB5pWw6YePICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWJpcnRoQ29pbnM6IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqIOeOqeWutmlkICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBwbGF5ZXJJZDogbnVtYmVyID0gMDtcclxuICAgICAgICAvKiog55qu6IKkaWQgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNraW5JZDogbnVtYmVyID0gMTtcclxuICAgICAgICAvKiog6YGT5YW35pWw6YePICovXHJcbiAgICAgICAgLy8gcHVibGljIHN0YXRpYyBkaWFtb25kOm51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIC8qKiDmnIDpq5jliIYgKi9cclxuICAgICAgICAvLyBwdWJsaWMgc3RhdGljIGJlc3RTY29yZTpudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gLyoqIOW9k+WJjeWFs+WNoSAqL1xyXG4gICAgICAgIC8vIHB1YmxpYyBzdGF0aWMgbGV2ZWwgPSAzMDtcclxuXHJcbiAgICAgICAgLyoqIOacrOWcsOaXtumXtCAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9sb2NhbFRpbWUgPSAwO1xyXG5cclxuICAgICAgICAvKiog5pyN5Yqh5Zmo5pe26Ze0ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX3NlcnZlclRpbWUgPSAwO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IHNlcnZlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlclRpbWUgKyB0IC0gdGhpcy5fbG9jYWxUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBzZXJ2ZXJUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlcnZlclRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDmrablmajlupMgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfYXJtb3J5OiBBcm1vcnkgPSBudWxsO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGFybW9yeSgpOiBBcm1vcnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2FybW9yeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtb3J5ID0gbmV3IEFybW9yeShKU09OLnBhcnNlKFdvcmxkLlN0b3JhZ2UuYXJtb3J5KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FybW9yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDpgZPlhbflupMgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfcHJvcEluZm86IFByb3BJbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBwcm9wSW5mbygpOiBQcm9wSW5mbyB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcHJvcEluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb3BJbmZvID0gbmV3IFByb3BJbmZvKEpTT04ucGFyc2UoV29ybGQuU3RvcmFnZS5wcm9wcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9wSW5mbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDmlrDmiYvlvJXlr7wgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbmV3YmllczogTmV3YmllcyA9IG51bGw7XHJcbiAgICAgICAgc3RhdGljIGdldCBuZXdiaWVzKCk6IE5ld2JpZXMge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25ld2JpZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25ld2JpZXMgPSBuZXcgTmV3YmllcyhKU09OLnBhcnNlKFdvcmxkLlN0b3JhZ2UubmV3YmllcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZXdiaWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqIOabtOaWsFN0b3JhZ2XnmoRrZXkgKi9cclxuICAgIGV4cG9ydCBsZXQgdXBkYXRlU3RvcmFnZUtleXMgPSBbXTtcclxuICAgIGV4cG9ydCBsZXQgcHVzaFN0b3JhZ2VLZXlzID0gW107XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKiog5Lul5LiL5pWw5o2u5Li65a6i5oi356uv6Ieq5bex566h55CG77yM5Yid5aeL5YC85bCx5piv6buY6K6k5YC8ICoqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcmFnZSB7XHJcbiAgICAgICAgLyoqIOWFs+WNoSAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9nYW1lTGV2ZWwgPSAxO1xyXG4gICAgICAgIC8qKiDph5HluIHmlbDph48gKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ29sZENvdW50ID0gMDtcclxuICAgICAgICAvKiog6ZK755+z5pWw6YePICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2RpYW1vbmRDb3VudCA9IDA7XHJcbiAgICAgICAgLyoqIOmHkeW4geS7t+WAvOetiee6pyAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9nb2xkTHYgPSAxO1xyXG4gICAgICAgIC8qKiDml6XluLjmlLbnm4rnrYnnuqcgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZGF5RWFybkx2ID0gMTtcclxuXHJcblxyXG4gICAgICAgIC8qKiDkvZPlipsgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfcG93ZXIgPSAxMjA7XHJcblxyXG4gICAgICAgIC8qKiDkvZPlipvnu5Pnrpfml7bpl7QgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfcG93ZXJNb2RpZnlUaW1lID0gMDtcclxuXHJcblxyXG4gICAgICAgIC8qKiDml6XluLjmlLbnm4rnu5Pnrpfml7bpl7TjgIAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9kYXlFYXJuVG90YWxNb2RpZnlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgLyoqIOaXpeW4uOaUtuebiuWIsOacn+aXtumXtCAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9kYXlFYXJuRXhwaXJlVGltZSA9IDA7XHJcblxyXG4gICAgICAgIC8qKiDml6XluLjmgLvmlLbnm4ogKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZGF5RWFyblRvdGFsID0gMDtcclxuXHJcbiAgICAgICAgLyoqIOS7u+WKoSAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF90YXNrID0gXCJ7fVwiO1xyXG5cclxuICAgICAgICAvKirjgIDmuLjmiI/kuK3ovaznm5jmlbDmja4gKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ2FtZUx1Y2t5ID0gXCJ7XFxcInRpbWVcXFwiOjAsXFxcIm51bVxcXCI6MH1cIjtcclxuXHJcbiAgICAgICAgLyoqIOa4uOaIj+S4reeahOiDvemHjyAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9nYW1lRW5lcmd5ID0gMDtcclxuICAgICAgICAvKiog6ZyH5Yqo5byA5YWzICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX3NoYWtlT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qKiDmlrDmiYvlvJXlr7zlvIDlhbMgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbmV3YmllcyA9IFwie31cIjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbW9kaWZ5Q291bnQgPSAwO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1heE1vZGlmeSA9IDEwO1xyXG5cclxuICAgICAgICAvKiog55Sf5ZG95YqbICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX0hwTHYgPSAxO1xyXG4gICAgICAgIC8qKiDmiJjmlpflipsgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfQURMdiA9IDE7XHJcblxyXG4gICAgICAgIC8qKiDmrablmajlupMgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfYXJtb3J5ID0gXCJ7fVwiO1xyXG5cclxuICAgICAgICAvKiogbHVja3nov5vluqbmnaEgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfcGFzc0x1Y2t5Q291bnQgPSAwO1xyXG5cclxuICAgICAgICAvKiog6YGT5YW35pyJ5pWI5pe26Ze0ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BzID0gXCJ7fVwiO1xyXG5cclxuICAgICAgICAvKiog6Kej6ZSB5paw5p6qKOato+aVsOihqOekuuino+mUgeaWsOaequ+8jOi0n+aVsOihqOekuuW3sue7j+ino+mUgei/h+eahOaWsOaequ+8jDDooajnpLrliJ3lp4vnirbmgIEpICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX3VubG9ja0d1biA9IDA7XHJcblxyXG4gICAgICAgIC8qIOa/gOWKseinhumikSAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF92aWRlb0FkID0gbnVsbDtcclxuICAgIFxyXG4gICAgICAgIC8qIOinhumikeS6i+S7tuagh+iusCAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgX3ZpZGVvU2lnbiA9IDA7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IHVwZGF0YUtWRGF0YSA9IExvY2FsU3RvcmFnZS5nZXRTdHJpbmcoXCJ1cGRhdGVLVkRhdGFcIik7XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGFLVkRhdGEgIT0gbnVsbCAmJiB1cGRhdGFLVkRhdGEgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RvcmFnZUtleXMgPSBKU09OLnBhcnNlKHVwZGF0YUtWRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdG9yYWdlS2V5cy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNbXCJfXCIgKyB2YWx1ZV0gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW1wiX1wiICsgdmFsdWVdID0gTG9jYWxTdG9yYWdlLmdldE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpc1tcIl9cIiArIHZhbHVlXSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbXCJfXCIgKyB2YWx1ZV0gPSBMb2NhbFN0b3JhZ2UuZ2V0U3RyaW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzW1wiX1wiICsgdmFsdWVdID09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbXCJfXCIgKyB2YWx1ZV0gPSBMb2NhbFN0b3JhZ2UuZ2V0Qm9vbGVhbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihga2V5PSR7dmFsdWV9IHR5cGU9JHt0eXBlb2YgdGhpc1tcIl9cIiArIHZhbHVlXX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5rWL6K+VXHJcbiAgICAgICAgICAgIGdhbWVTdXBwbHkub25UZXN0KClcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpZGVvQWQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5r+A5Yqx6KeG6aKRXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbml0VmlkZW9BZCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbml0VmlkZW9BZFwiKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9BZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogXCJhZHVuaXQtODJmZTE4NTA2NDYxZjAyOVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25FcnJvcihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlb0FkIG9uRXJyb3JcIiwgcmVzKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9BZF9kbygpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5YWz6ZetXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlsZXnpLrmv4DlirHop4bpopFcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZpZGVvQWRfc2hvdygpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZGVvQWRfc2hvd1wiKVxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvQWQubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl92aWRlb0FkLnNob3coKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9BZF9kbygpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrmmL7npLrlpLHotKUnLGVycilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0FkLmxvYWQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6KeG6aKR5aSE55CG5LqL5Lu2XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2aWRlb0FkX2RvKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlkZW9BZF9kbzpcIiwgdGhpcy5fdmlkZW9TaWduKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9TaWduPT0xKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJ2aWRlb18xXCIpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuX3ZpZGVvU2lnbj09Mikge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwidmlkZW9fMlwiKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLl92aWRlb1NpZ249PTMpIHtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcInZpZGVvXzNcIik7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5fdmlkZW9TaWduPT00KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJ2aWRlb180XCIpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuX3ZpZGVvU2lnbj09NSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwidmlkZW9fNVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLl92aWRlb1NpZ249PTYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChcInZpZGVvXzZcIik7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5fdmlkZW9TaWduPT03KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoXCJ2aWRlb183XCIpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuX3ZpZGVvU2lnbj09OCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KFwidmlkZW9fOFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9TaWduPTBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFsbEtleXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ18nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrID0ga2V5LnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlS1ZEYXRhKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICghdXBkYXRlU3RvcmFnZUtleXMuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RvcmFnZUtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgTG9jYWxTdG9yYWdlLnNldE51bWJlcihrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIExvY2FsU3RvcmFnZS5zZXRCb29sZWFuKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBMb2NhbFN0b3JhZ2Uuc2V0U3RyaW5nKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZS5zZXRTdHJpbmcoXCJ1cGRhdGVLVkRhdGFcIiwgSlNPTi5zdHJpbmdpZnkodXBkYXRlU3RvcmFnZUtleXMuY29uY2F0KHB1c2hTdG9yYWdlS2V5cy5maWx0ZXIodmFsdWUxID0+ICF1cGRhdGVTdG9yYWdlS2V5cy5pbmNsdWRlcyh2YWx1ZTEpKSkpKTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZW1pdChcIlVwZGF0ZVN0b3JhZ2VcIiwga2V5KTtcclxuICAgICAgICAgICAgaWYgKE5ldHdvcmtDb25maWcuY29ubmVjdFNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RpZnlDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kaWZ5Q291bnQgPiB0aGlzLm1heE1vZGlmeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZ5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIE5ldHdvcmsucHVzaFN0b3JhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKiBnZXR0ZXIgKi9cclxuICAgICAgICBzdGF0aWMgZ2V0IGdhbWVMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUxldmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBnb2xkQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dvbGRDb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgZGlhbW9uZENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaWFtb25kQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBnb2xkTHYoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dvbGRMdjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGRheUVhcm5MdigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF5RWFybkx2O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgcG93ZXIoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvd2VyO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgcG93ZXJNb2RpZnlUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb3dlck1vZGlmeVRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGRheUVhcm5Ub3RhbE1vZGlmeVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RheUVhcm5Ub3RhbE1vZGlmeVRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGRheUVhcm5FeHBpcmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXlFYXJuRXhwaXJlVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgZGF5RWFyblRvdGFsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXlFYXJuVG90YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IHRhc2soKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Rhc2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IGdhbWVMdWNreSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUx1Y2t5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBnYW1lRW5lcmd5KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nYW1lRW5lcmd5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgc2hha2VPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hha2VPcGVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgYXJtb3J5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcm1vcnk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBIcEx2KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9IcEx2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBBREx2KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BREx2O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgcGFzc0x1Y2t5Q291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bhc3NMdWNreUNvdW50O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgcHJvcHMoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgbmV3YmllcygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmV3YmllcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IHVubG9ja0d1bigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5sb2NrR3VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqICBzZXR0ZXIgICovXHJcbiAgICAgICAgc3RhdGljIHNldCBnb2xkQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ29sZENvdW50ICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nb2xkQ291bnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZ29sZENvdW50XCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBkaWFtb25kQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGlhbW9uZENvdW50ICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWFtb25kQ291bnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZGlhbW9uZENvdW50XCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBzZXQgZ29sZEx2KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dvbGRMdiAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ29sZEx2ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUtWRGF0YShcImdvbGRMdlwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IGRheUVhcm5Mdih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXlFYXJuTHYgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RheUVhcm5MdiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJkYXlFYXJuTHZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBwb3dlcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3dlciAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gUE9XRVJfTUFYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBQT1dFUl9NQVg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3dlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJwb3dlclwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IHBvd2VyTW9kaWZ5VGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3dlck1vZGlmeVRpbWUgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvd2VyTW9kaWZ5VGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJwb3dlck1vZGlmeVRpbWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IGRheUVhcm5Ub3RhbE1vZGlmeVRpbWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF5RWFyblRvdGFsTW9kaWZ5VGltZSAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF5RWFyblRvdGFsTW9kaWZ5VGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJkYXlFYXJuVG90YWxNb2RpZnlUaW1lXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBkYXlFYXJuRXhwaXJlVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXlFYXJuRXhwaXJlVGltZSAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF5RWFybkV4cGlyZVRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZGF5RWFybkV4cGlyZVRpbWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IGRheUVhcm5Ub3RhbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXlFYXJuVG90YWwgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RheUVhcm5Ub3RhbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXlFYXJuVG90YWxNb2RpZnlUaW1lID0gV29ybGQuTXkuc2VydmVyVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZGF5RWFyblRvdGFsXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCB0YXNrKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rhc2sgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2sgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwidGFza1wiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IGdhbWVMdWNreSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lTHVja3kgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVMdWNreSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJnYW1lTHVja3lcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBnYW1lRW5lcmd5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dhbWVFbmVyZ3kgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVFbmVyZ3kgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZ2FtZUVuZXJneVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBzZXQgc2hha2VPcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaGFrZU9wZW4gIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoYWtlT3BlbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJzaGFrZU9wZW5cIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBhcm1vcnkodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJtb3J5ICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1vcnkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiYXJtb3J5XCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBzZXQgSHBMdih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9IcEx2ICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IcEx2ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUtWRGF0YShcIkhwTHZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IEFETHYodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fQURMdiAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fQURMdiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVLVkRhdGEoXCJBREx2XCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBwYXNzTHVja3lDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXNzTHVja3lDb3VudCAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFzc0x1Y2t5Q291bnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwicGFzc0x1Y2t5Q291bnRcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBwcm9wcyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcm9wcyAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvcHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwicHJvcHNcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCBnYW1lTGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2FtZUxldmVsICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lTGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwiZ2FtZUxldmVsXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0YXRpYyBzZXQgbmV3Ymllcyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXdiaWVzICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXdiaWVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUtWRGF0YShcIm5ld2JpZXNcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIHNldCB1bmxvY2tHdW4odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdW5sb2NrR3VuICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bmxvY2tHdW4gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlS1ZEYXRhKFwidW5sb2NrR3VuXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19