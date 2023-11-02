"use strict";
cc._RF.push(module, '20d59hobkVP7p8yXkmyYW5w', 'BulletEmitter');
// script/app/entities/bulletEmitter/BulletEmitter.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var GameProxy_1 = require("../../game/GameProxy");
var World_1 = require("../../info/World");
/**
 * 子弹发射器只负责发射子弹
 * 控制一次发射的子弹个数及每一颗子弹的发射
 */
var BulletEmitter = /** @class */ (function () {
    function BulletEmitter(gameBulletsController) {
        this._gameBulletsController = null;
        /** 射程 */
        this._firingRange = 0;
        /** 发射间隔 */
        this._interval = 0;
        /** 子弹的速度 */
        this._speed = 0;
        /** 弹容量 */
        this._payload = 0;
        /** 剩余弹量 */
        this._bulletCount = 0;
        this._bulletEmitterID = 0;
        this._gameBulletsController = gameBulletsController;
    }
    Object.defineProperty(BulletEmitter.prototype, "firingRange", {
        get: function () {
            return this._firingRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        set: function (value) {
            this._payload = value;
            this.bulletCount = this._payload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BulletEmitter.prototype, "bulletCount", {
        get: function () {
            return this._bulletCount;
        },
        set: function (value) {
            this._bulletCount = value;
            GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.UpdateBulletCount);
        },
        enumerable: false,
        configurable: true
    });
    /** 是否子弹用尽 */
    BulletEmitter.prototype.isUseUp = function () {
        return this._payload != 0 && this._bulletCount < 1;
    };
    Object.defineProperty(BulletEmitter.prototype, "gameBulletsController", {
        get: function () {
            return this._gameBulletsController;
        },
        enumerable: false,
        configurable: true
    });
    BulletEmitter.prototype.init = function (id) {
        this._bulletEmitterID = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[this._bulletEmitterID - 1];
        this._speed = config['speed'];
        this._firingRange = config['range'] * World_1.World.My.armory.rangeMulOf(this._bulletEmitterID);
        this._interval = config['fre'] * World_1.World.My.armory.freMulOf(this._bulletEmitterID);
        this.payload = World_1.World.My.armory.payloadAddOf(this._bulletEmitterID);
        console.log('payload===>', this._payload);
    };
    BulletEmitter.prototype.onEnter = function () { };
    BulletEmitter.prototype.onExit = function () { };
    BulletEmitter.TYPES = {
        ShouQiang: 1,
        PenZi: 2,
        JiaTeLin: 3,
        SanDanQiang: 4,
        HuoYan: 5,
        JiGuang: 6,
        JuJiQiang: 7,
        LiZiPao: 8,
        HuoJianTong: 9,
        ShanDianQiu: 10,
    };
    return BulletEmitter;
}());
exports.default = BulletEmitter;

cc._RF.pop();