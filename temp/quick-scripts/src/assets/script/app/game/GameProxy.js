"use strict";
cc._RF.push(module, '9801fpOathEUp/24jFoCzlC', 'GameProxy');
// script/app/game/GameProxy.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameProxy = void 0;
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var Extend_1 = require("../../../framework/extend/Extend");
var World_1 = require("../info/World");
var ENEMY_HURT_MUL = 1;
var ENEMY_HP_MUL = 1;
var ENEMY_GOLD_MUL = 1;
var PASS_GOLD_MUL = 1;
var GameProxy = /** @class */ (function () {
    function GameProxy() {
    }
    GameProxy.emit = function (e) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.GameScene) {
            (_a = this.GameScene).emit.apply(_a, __spreadArrays([e], args));
        }
    };
    Object.defineProperty(GameProxy, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            var _a, _b;
            this._level = value;
            console.log("_level===>", this._level);
            var goldUpCfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
            var enemyUpCfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.EnemyUp);
            ENEMY_HURT_MUL = enemyUpCfg[this._level]['enemy_hurt'];
            ENEMY_HP_MUL = enemyUpCfg[this._level]['enemy_health'];
            ENEMY_GOLD_MUL = enemyUpCfg[this._level]['enemy_gold'] * goldUpCfg[World_1.World.Storage.goldLv - 1]['gvalue'];
            PASS_GOLD_MUL = enemyUpCfg[this._level]['clear_gold'];
            var levelConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Level);
            if (this._level <= levelConfig.length - 4) {
                this._levelConfig = levelConfig[this._level - 1];
            }
            else {
                /** 最后四关里随机一关 */
                this._levelConfig = levelConfig[levelConfig.length - 4 + Math.ceil(Math.random() * 100) % 4];
            }
            if (!this._levelConfig) {
                console.error("levelConfig error==>" + this._level);
            }
            /** 生成敌人列表 */
            var enemyArr1 = [], enemyArr2 = [];
            var maxEnemyId1 = 0, maxEnemyId2 = 0;
            var max1 = 0, max2 = 0;
            var enemyID = 1;
            while (typeof this._levelConfig["p1_enemy_" + enemyID] !== "undefined") {
                if (this._levelConfig["p1_enemy_" + enemyID] > 0) {
                    for (var i = 0; i < Math.floor(this._levelConfig["p1_enemy_" + enemyID] * this._levelConfig.amount_p1); i++) {
                        enemyArr1.push(enemyID);
                    }
                    if (this._levelConfig["p1_enemy_" + enemyID] > max1) {
                        max1 = this._levelConfig["p1_enemy_" + enemyID];
                        maxEnemyId1 = enemyID;
                    }
                }
                if (this._levelConfig["p2_enemy_" + enemyID] > 0) {
                    for (var i = 0; i < Math.floor(this._levelConfig["p2_enemy_" + enemyID] * this._levelConfig.amount_p2); i++) {
                        enemyArr2.push(enemyID);
                    }
                    if (this._levelConfig["p2_enemy_" + enemyID] > max2) {
                        max2 = this._levelConfig["p2_enemy_" + enemyID];
                        maxEnemyId2 = enemyID;
                    }
                }
                enemyID++;
            }
            this._levelConfig.amount_p1 = enemyArr1.length;
            this._levelConfig.amount_p2 = enemyArr2.length;
            /** 打乱顺序 */
            Extend_1.ext.shuffle(enemyArr1);
            Extend_1.ext.shuffle(enemyArr2);
            /** 得到敌人列表 */
            this._enemyList.length = 0;
            (_a = this._enemyList).push.apply(_a, enemyArr1);
            for (var i = 0; i < this._levelConfig.p1_boss_7; i++) {
                this._enemyList.push(7);
            }
            for (var i = 0; i < this._levelConfig.p1_boss_8; i++) {
                this._enemyList.push(8);
            }
            (_b = this._enemyList).push.apply(_b, enemyArr2);
            for (var i = 0; i < this._levelConfig.p2_boss_7; i++) {
                this._enemyList.push(7);
            }
            for (var i = 0; i < this._levelConfig.p2_boss_8; i++) {
                this._enemyList.push(8);
            }
            //初始化属性
            this.isOver = false;
            this.killCount = 0;
            this.goldCount = 0;
            this.secondBossNum = this._levelConfig.p2_boss_7 + this._levelConfig.p2_boss_8;
            this._maxEnemyNum = this._enemyList.length;
            this._slowGame = false;
            this._pauseGame = false;
            this.magnetic = false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameProxy, "levelConfig", {
        get: function () {
            return this._levelConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameProxy, "enemyList", {
        get: function () {
            return this._enemyList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameProxy, "pauseGame", {
        get: function () {
            return this._pauseGame;
        },
        set: function (value) {
            console.log("GameProxy===>pauseGame", value);
            if (this._pauseGame != value) {
                this._pauseGame = value;
                this.emit(this.Event.PauseGame, this._pauseGame);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameProxy, "slowGame", {
        get: function () {
            return this._slowGame;
        },
        set: function (value) {
            if (this._slowGame != value) {
                this._slowGame = value;
                this.emit(this.Event.SlowGame, this._slowGame);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameProxy, "maxEnemyNum", {
        get: function () {
            return this._maxEnemyNum;
        },
        enumerable: false,
        configurable: true
    });
    /** 敌人伤害公式 */
    GameProxy.enemyHurtMulOf = function (enemyId) {
        return ENEMY_HURT_MUL;
    };
    /** 敌人血量公式 */
    GameProxy.enemyHpMulOf = function (enemyId) {
        return ENEMY_HP_MUL;
    };
    /** 敌人金币产量公式 */
    GameProxy.enemyGoldMulOf = function (enemyId) {
        return ENEMY_GOLD_MUL;
    };
    /** 过关金币公式 */
    GameProxy.passGold = function () {
        return PASS_GOLD_MUL;
    };
    GameProxy.GameScene = null;
    GameProxy.Event = {
        StartGenEnemy: "StartGenEnemy",
        StopGenEnemy: "StopGenEnemy",
        KillEnemy: "KillEnemy",
        KillRole: "KillRole",
        PauseGame: "PauseGame",
        SlowGame: "SlowGame",
        InitGame: "InitGame",
        StartGame: "StartGame",
        ReliveGame: "ReliveGame",
        OverGame: "OverGame",
        UpdateBulletCount: "UpdateBulletCount",
        ShakeScreen: "ShakeScreen",
        PropCDZero: "PropCDZero",
        PropTrigger: "PropTrigger",
    };
    GameProxy.firstAidFlag = true;
    GameProxy.secondBossNum = 0;
    /** 关卡 */
    GameProxy._level = 0;
    /** 关卡配置 */
    GameProxy._levelConfig = null;
    /** 敌人列表 */
    GameProxy._enemyList = [];
    /** 预选枪支 */
    GameProxy.prepareGun = 0;
    /** 是否结束 */
    GameProxy.isOver = false;
    /** 杀敌数 */
    GameProxy.killCount = 0;
    /** 金币数 */
    GameProxy.goldCount = 0;
    /** 金币番倍 */
    GameProxy.goldMul = 1;
    /** 暂停 */
    GameProxy._pauseGame = false;
    /** 磁力道具 */
    GameProxy.magnetic = false;
    /** 变慢 */
    GameProxy._slowGame = false;
    /** 敌人总数 */
    GameProxy._maxEnemyNum = 0;
    return GameProxy;
}());
exports.GameProxy = GameProxy;

cc._RF.pop();