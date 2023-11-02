
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXVFO0FBQ3ZFLHFFQUFrRTtBQUNsRSwyREFBcUQ7QUFDckQsdUNBQW9DO0FBRXBDLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztBQUd0QjtJQUFBO0lBaU5BLENBQUM7SUE5TFUsY0FBSSxHQUFYLFVBQVksQ0FBUTs7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOztRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDZixDQUFBLEtBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLElBQUksMkJBQUMsQ0FBQyxHQUFLLElBQUksR0FBRTtTQUNuQztJQUNMLENBQUM7SUFTRCxzQkFBVyxrQkFBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsS0FBYTs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksU0FBUyxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsSUFBSSxVQUFVLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRSxjQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RCxZQUFZLEdBQUcsVUFBVSxD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QVUsRUFBQyxZQUFZO1FBQ3ZCLFFBQVEsRUFBQyxVQUFVO1FBQ25CLGlCQUFpQixFQUFDLG1CQUFtQjtRQUNyQyxXQUFXLEVBQUMsYUFBYTtRQUN6QixVQUFVLEVBQUMsWUFBWTtRQUN2QixXQUFXLEVBQUMsYUFBYTtLQUM1QixDQUFDO0lBUUssc0JBQVksR0FBRyxJQUFJLENBQUM7SUFFcEIsdUJBQWEsR0FBRyxDQUFDLENBQUM7SUFFekIsU0FBUztJQUNNLGdCQUFNLEdBQUcsQ0FBQyxDQUFDO0lBeUYxQixXQUFXO0lBQ0ksc0JBQVksR0FBZSxJQUFJLENBQUM7SUFPL0MsV0FBVztJQUNJLG9CQUFVLEdBQWlCLEVBQUUsQ0FBQztJQU83QyxXQUFXO0lBQ0osb0JBQVUsR0FBRyxDQUFDLENBQUM7SUFFdEIsV0FBVztJQUNKLGdCQUFNLEdBQUcsS0FBSyxDQUFDO0lBRXRCLFVBQVU7SUFDSCxtQkFBUyxHQUFHLENBQUMsQ0FBQztJQUVyQixVQUFVO0lBQ0gsbUJBQVMsR0FBRyxDQUFDLENBQUM7SUFFckIsV0FBVztJQUNKLGlCQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLFNBQVM7SUFDTSxvQkFBVSxHQUFHLEtBQUssQ0FBQztJQUVsQyxXQUFXO0lBQ0osa0JBQVEsR0FBRyxLQUFLLENBQUM7SUFleEIsU0FBUztJQUNNLG1CQUFTLEdBQUcsS0FBSyxDQUFDO0lBYWpDLFdBQVc7SUFDSSxzQkFBWSxHQUFHLENBQUMsQ0FBQztJQXlCcEMsZ0JBQUM7Q0FqTkQsQUFpTkMsSUFBQTtBQWpOWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXhjZWxUYWJsZU5hbWVzLCBMZXZlbENvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtleHR9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL0V4dGVuZFwiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5cclxubGV0IEVORU1ZX0hVUlRfTVVMID0gMTtcclxubGV0IEVORU1ZX0hQX01VTCA9IDE7XHJcbmxldCBFTkVNWV9HT0xEX01VTCA9IDE7XHJcbmxldCBQQVNTX0dPTERfTVVMID0gMTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVByb3h5IHtcclxuICAgIHN0YXRpYyBHYW1lU2NlbmU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBzdGF0aWMgRXZlbnQgPSB7XHJcbiAgICAgICAgU3RhcnRHZW5FbmVteTpcIlN0YXJ0R2VuRW5lbXlcIixcclxuICAgICAgICBTdG9wR2VuRW5lbXk6XCJTdG9wR2VuRW5lbXlcIixcclxuICAgICAgICBLaWxsRW5lbXk6XCJLaWxsRW5lbXlcIixcclxuICAgICAgICBLaWxsUm9sZTpcIktpbGxSb2xlXCIsXHJcbiAgICAgICAgUGF1c2VHYW1lOlwiUGF1c2VHYW1lXCIsXHJcbiAgICAgICAgU2xvd0dhbWU6XCJTbG93R2FtZVwiLFxyXG4gICAgICAgIEluaXRHYW1lOlwiSW5pdEdhbWVcIixcclxuICAgICAgICBTdGFydEdhbWU6XCJTdGFydEdhbWVcIixcclxuICAgICAgICBSZWxpdmVHYW1lOlwiUmVsaXZlR2FtZVwiLFxyXG4gICAgICAgIE92ZXJHYW1lOlwiT3ZlckdhbWVcIixcclxuICAgICAgICBVcGRhdGVCdWxsZXRDb3VudDpcIlVwZGF0ZUJ1bGxldENvdW50XCIsXHJcbiAgICAgICAgU2hha2VTY3JlZW46XCJTaGFrZVNjcmVlblwiLFxyXG4gICAgICAgIFByb3BDRFplcm86XCJQcm9wQ0RaZXJvXCIsXHJcbiAgICAgICAgUHJvcFRyaWdnZXI6XCJQcm9wVHJpZ2dlclwiLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgZW1pdChlOnN0cmluZywgLi4uYXJncyl7XHJcbiAgICAgICAgaWYgKHRoaXMuR2FtZVNjZW5lKXtcclxuICAgICAgICAgICAgdGhpcy5HYW1lU2NlbmUuZW1pdChlLCAuLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZpcnN0QWlkRmxhZyA9IHRydWU7XHJcblxyXG4gICAgc3RhdGljIHNlY29uZEJvc3NOdW0gPSAwO1xyXG5cclxuICAgIC8qKiDlhbPljaEgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9sZXZlbCA9IDA7XHJcblxyXG4gICAgc3RhdGljIGdldCBsZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9sZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX2xldmVsPT09PlwiLCB0aGlzLl9sZXZlbCk7XHJcbiAgICAgICAgbGV0IGdvbGRVcENmZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLkdvbGRVcCk7XHJcbiAgICAgICAgbGV0IGVuZW15VXBDZmcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5FbmVteVVwKTtcclxuICAgICAgICBFTkVNWV9IVVJUX01VTCA9IGVuZW15VXBDZmdbdGhpcy5fbGV2ZWxdWydlbmVteV9odXJ0J107XHJcbiAgICAgICAgRU5FTVlfSFBfTVVMID0gZW5lbXlVcENmZ1t0aGlzLl9sZXZlbF1bJ2VuZW15X2hlYWx0aCddO1xyXG4gICAgICAgIEVORU1ZX0dPTERfTVVMID0gZW5lbXlVcENmZ1t0aGlzLl9sZXZlbF1bJ2VuZW15X2dvbGQnXSAqIGdvbGRVcENmZ1tXb3JsZC5TdG9yYWdlLmdvbGRMdi0xXVsnZ3ZhbHVlJ107XHJcbiAgICAgICAgUEFTU19HT0xEX01VTCA9IGVuZW15VXBDZmdbdGhpcy5fbGV2ZWxdWydjbGVhcl9nb2xkJ107XHJcbiAgICAgICAgbGV0IGxldmVsQ29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuTGV2ZWwpO1xyXG4gICAgICAgIGlmICh0aGlzLl9sZXZlbCA8PSBsZXZlbENvbmZpZy5sZW5ndGggLSA0KXtcclxuICAgICAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZ1t0aGlzLl9sZXZlbC0xXTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8qKiDmnIDlkI7lm5vlhbPph4zpmo/mnLrkuIDlhbMgKi9cclxuICAgICAgICAgICAgdGhpcy5fbGV2ZWxDb25maWcgPSBsZXZlbENvbmZpZ1tsZXZlbENvbmZpZy5sZW5ndGggLSA0ICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTAwKSU0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sZXZlbENvbmZpZyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsZXZlbENvbmZpZyBlcnJvcj09PlwiK3RoaXMuX2xldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIOeUn+aIkOaVjOS6uuWIl+ihqCAqL1xyXG4gICAgICAgIGxldCBlbmVteUFycjEgPSBbXSwgZW5lbXlBcnIyID0gW107XHJcbiAgICAgICAgbGV0IG1heEVuZW15SWQxID0gMCwgbWF4RW5lbXlJZDIgPSAwO1xyXG4gICAgICAgIGxldCBtYXgxID0gMCwgbWF4MiA9IDA7XHJcbiAgICAgICAgbGV0IGVuZW15SUQgPSAxO1xyXG4gICAgICAgIHdoaWxlICh0eXBlb2YgdGhpcy5fbGV2ZWxDb25maWdbYHAxX2VuZW15XyR7ZW5lbXlJRH1gXSAhPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sZXZlbENvbmZpZ1tgcDFfZW5lbXlfJHtlbmVteUlEfWBdID4gMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8TWF0aC5mbG9vcih0aGlzLl9sZXZlbENvbmZpZ1tgcDFfZW5lbXlfJHtlbmVteUlEfWBdICogdGhpcy5fbGV2ZWxDb25maWcuYW1vdW50X3AxKTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBlbmVteUFycjEucHVzaChlbmVteUlEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sZXZlbENvbmZpZ1tgcDFfZW5lbXlfJHtlbmVteUlEfWBdID4gbWF4MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4MSA9IHRoaXMuX2xldmVsQ29uZmlnW2BwMV9lbmVteV8ke2VuZW15SUR9YF07XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RW5lbXlJZDEgPSBlbmVteUlEO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGV2ZWxDb25maWdbYHAyX2VuZW15XyR7ZW5lbXlJRH1gXSA+IDApe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPE1hdGguZmxvb3IodGhpcy5fbGV2ZWxDb25maWdbYHAyX2VuZW15XyR7ZW5lbXlJRH1gXSAqIHRoaXMuX2xldmVsQ29uZmlnLmFtb3VudF9wMik7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5lbXlBcnIyLnB1c2goZW5lbXlJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGV2ZWxDb25maWdbYHAyX2VuZW15XyR7ZW5lbXlJRH1gXSA+IG1heDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1heDIgPSB0aGlzLl9sZXZlbENvbmZpZ1tgcDJfZW5lbXlfJHtlbmVteUlEfWBdO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEVuZW15SWQyID0gZW5lbXlJRDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbmVteUlEKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sZXZlbENvbmZpZy5hbW91bnRfcDEgPSBlbmVteUFycjEubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX2xldmVsQ29uZmlnLmFtb3VudF9wMiA9IGVuZW15QXJyMi5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8qKiDmiZPkubHpobrluo8gKi9cclxuICAgICAgICBleHQuc2h1ZmZsZShlbmVteUFycjEpO1xyXG4gICAgICAgIGV4dC5zaHVmZmxlKGVuZW15QXJyMik7XHJcblxyXG4gICAgICAgIC8qKiDlvpfliLDmlYzkurrliJfooaggKi9cclxuICAgICAgICB0aGlzLl9lbmVteUxpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9lbmVteUxpc3QucHVzaCguLi5lbmVteUFycjEpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLl9sZXZlbENvbmZpZy5wMV9ib3NzXzc7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZW15TGlzdC5wdXNoKDcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8dGhpcy5fbGV2ZWxDb25maWcucDFfYm9zc184OyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVteUxpc3QucHVzaCg4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZW15TGlzdC5wdXNoKC4uLmVuZW15QXJyMik7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuX2xldmVsQ29uZmlnLnAyX2Jvc3NfNzsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5fZW5lbXlMaXN0LnB1c2goNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLl9sZXZlbENvbmZpZy5wMl9ib3NzXzg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZW15TGlzdC5wdXNoKDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJblsZ7mgKdcclxuICAgICAgICB0aGlzLmlzT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2lsbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmdvbGRDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRCb3NzTnVtID0gdGhpcy5fbGV2ZWxDb25maWcucDJfYm9zc183ICsgdGhpcy5fbGV2ZWxDb25maWcucDJfYm9zc184O1xyXG4gICAgICAgIHRoaXMuX21heEVuZW15TnVtID0gdGhpcy5fZW5lbXlMaXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9zbG93R2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BhdXNlR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFnbmV0aWMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5YWz5Y2h6YWN572uICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbGV2ZWxDb25maWc6TGV2ZWxDb25maWcgPSBudWxsO1xyXG5cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGxldmVsQ29uZmlnKCk6IExldmVsQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaVjOS6uuWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2VuZW15TGlzdDpBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG5cclxuICAgIHN0YXRpYyBnZXQgZW5lbXlMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmVteUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmihOmAieaequaUryAqL1xyXG4gICAgc3RhdGljIHByZXBhcmVHdW4gPSAwO1xyXG5cclxuICAgIC8qKiDmmK/lkKbnu5PmnZ8gKi9cclxuICAgIHN0YXRpYyBpc092ZXIgPSBmYWxzZTtcclxuXHJcbiAgICAvKiog5p2A5pWM5pWwICovXHJcbiAgICBzdGF0aWMga2lsbENvdW50ID0gMDtcclxuXHJcbiAgICAvKiog6YeR5biB5pWwICovXHJcbiAgICBzdGF0aWMgZ29sZENvdW50ID0gMDtcclxuXHJcbiAgICAvKiog6YeR5biB55Wq5YCNICovXHJcbiAgICBzdGF0aWMgZ29sZE11bCA9IDE7XHJcblxyXG4gICAgLyoqIOaaguWBnCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BhdXNlR2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiDno4HlipvpgZPlhbcgKi9cclxuICAgIHN0YXRpYyBtYWduZXRpYyA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBzdGF0aWMgZ2V0IHBhdXNlR2FtZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF1c2VHYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXQgcGF1c2VHYW1lKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHYW1lUHJveHk9PT0+cGF1c2VHYW1lXCIsIHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5fcGF1c2VHYW1lICE9IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5fcGF1c2VHYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCh0aGlzLkV2ZW50LlBhdXNlR2FtZSwgdGhpcy5fcGF1c2VHYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWPmOaFoiAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Nsb3dHYW1lID0gZmFsc2U7XHJcblxyXG4gICAgc3RhdGljIGdldCBzbG93R2FtZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2xvd0dhbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldCBzbG93R2FtZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9zbG93R2FtZSAhPSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nsb3dHYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCh0aGlzLkV2ZW50LlNsb3dHYW1lLCB0aGlzLl9zbG93R2FtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmlYzkurrmgLvmlbAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9tYXhFbmVteU51bSA9IDA7XHJcblxyXG4gICAgc3RhdGljIGdldCBtYXhFbmVteU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhFbmVteU51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pWM5Lq65Lyk5a6z5YWs5byPICovXHJcbiAgICBzdGF0aWMgZW5lbXlIdXJ0TXVsT2YoZW5lbXlJZDpudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiBFTkVNWV9IVVJUX01VTDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pWM5Lq66KGA6YeP5YWs5byPICovXHJcbiAgICBzdGF0aWMgZW5lbXlIcE11bE9mKGVuZW15SWQ6bnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gRU5FTVlfSFBfTVVMO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmlYzkurrph5HluIHkuqfph4/lhazlvI8gKi9cclxuICAgIHN0YXRpYyBlbmVteUdvbGRNdWxPZihlbmVteUlkOm51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIEVORU1ZX0dPTERfTVVMO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDov4flhbPph5HluIHlhazlvI8gKi9cclxuICAgIHN0YXRpYyBwYXNzR29sZCgpe1xyXG4gICAgICAgIHJldHVybiBQQVNTX0dPTERfTVVMO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==