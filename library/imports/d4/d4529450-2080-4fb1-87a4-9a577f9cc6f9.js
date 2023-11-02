"use strict";
cc._RF.push(module, 'd4529RQIIBPsYekmld/nMb5', 'Armory');
// script/app/info/Armory.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("./World");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var EMITTER_POWER_LEVEL = "powerLv";
var EMITTER_FIRE_POWER_LEVEL = "firePowerLv";
// const POWER_MULS = [1,2,2,4,2,4,6,6,6,6,6];
var PAYLOAD_MULS = [1, 1, 10, 2, 5, 10, 1, 1, 1, 1, 1];
/** 试用加50级 */
var TRIAL_ADD = 50;
/** 武器库 */
var Armory = /** @class */ (function () {
    function Armory(map) {
        this._map = null;
        this._weaponUpCfg = null;
        this._bulletUpCfg = null;
        this._map = map;
        this._weaponUpCfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        this._bulletUpCfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.BulletUp);
    }
    /** 伤害加成 */
    Armory.prototype.hurtMulOf = function (emitter) {
        var baseMul = this._weaponUpCfg[World_1.World.Storage.ADLv - 1]['fight'];
        if (emitter == 1) {
            return baseMul;
        }
        var lv = this.levelOfEmitterPower(emitter);
        if (emitter == World_1.World.Storage.unlockGun) {
            lv += TRIAL_ADD;
            if (lv > this._weaponUpCfg.length) {
                lv = this._weaponUpCfg.length;
            }
        }
        return this._weaponUpCfg[lv - 1]['hurt_add'] * baseMul;
    };
    /** 弹容量累加 */
    Armory.prototype.payloadAddOf = function (emitter) {
        if (emitter == 1)
            return 0;
        var lv = this.levelOfEmitterFirePower(emitter);
        if (emitter == World_1.World.Storage.unlockGun) {
            lv += TRIAL_ADD;
            if (lv > this._weaponUpCfg.length) {
                lv = this._weaponUpCfg.length;
            }
        }
        return this._bulletUpCfg[lv - 1]["gun_" + ("000" + emitter).substr(-3)];
    };
    /** 发射频率加成 */
    Armory.prototype.freMulOf = function (emitter) {
        var index = 0;
        if (emitter == 1) {
            index = World_1.World.Storage.ADLv - 1;
        }
        else {
            var lv = this.levelOfEmitterFirePower(emitter);
            if (emitter == World_1.World.Storage.unlockGun) {
                lv += TRIAL_ADD;
                if (lv > this._weaponUpCfg.length) {
                    lv = this._weaponUpCfg.length;
                }
            }
            index = lv - 1;
        }
        return this._weaponUpCfg[index]['fre'];
    };
    /** 射程加成 */
    Armory.prototype.rangeMulOf = function (emitter) {
        if (emitter == 4 || emitter == 5) {
            var lv = this.levelOfEmitterPower(emitter);
            if (emitter == World_1.World.Storage.unlockGun) {
                lv += TRIAL_ADD;
                if (lv > this._weaponUpCfg.length) {
                    lv = this._weaponUpCfg.length;
                }
            }
            return this._weaponUpCfg[lv - 1]['range_add'];
        }
        else {
            return 1;
        }
    };
    /** 放大加成 */
    Armory.prototype.magnifyMul = function (emitter) {
        if (emitter == 2 || emitter == 9 || emitter == 10) {
            var lv = this.levelOfEmitterPower(emitter);
            if (emitter == World_1.World.Storage.unlockGun) {
                lv += TRIAL_ADD;
                if (lv > this._weaponUpCfg.length) {
                    lv = this._weaponUpCfg.length;
                }
            }
            return this._weaponUpCfg[lv - 1]['amp_add'];
        }
        else {
            return 1;
        }
    };
    /** 获取武器的威力加成 */
    Armory.prototype.levelOfEmitterPower = function (emitter) {
        var data = this._map[emitter];
        if (data) {
            return data[EMITTER_POWER_LEVEL];
        }
        else {
            return 1;
        }
    };
    /** 获取武器的火力加成 */
    Armory.prototype.levelOfEmitterFirePower = function (emitter) {
        var data = this._map[emitter];
        if (data) {
            return data[EMITTER_FIRE_POWER_LEVEL];
        }
        else {
            return 1;
        }
    };
    Armory.prototype.addLevelOfEmitterPower = function (emitter, add) {
        var data = this._map[emitter];
        if (!data) {
            data = {};
            data[EMITTER_POWER_LEVEL] = 1;
            data[EMITTER_FIRE_POWER_LEVEL] = 1;
            this._map[emitter] = data;
        }
        data[EMITTER_POWER_LEVEL] = data[EMITTER_POWER_LEVEL] + add;
        World_1.World.Storage.armory = this.toJson();
    };
    Armory.prototype.addLevelOfEmitterFirePower = function (emitter, add) {
        var data = this._map[emitter];
        if (!data) {
            data = {};
            data[EMITTER_POWER_LEVEL] = 1;
            data[EMITTER_FIRE_POWER_LEVEL] = 1;
            this._map[emitter] = data;
        }
        data[EMITTER_FIRE_POWER_LEVEL] = data[EMITTER_FIRE_POWER_LEVEL] + add;
        World_1.World.Storage.armory = this.toJson();
    };
    Armory.prototype.toJson = function () {
        return JSON.stringify(this._map);
    };
    return Armory;
}());
exports.default = Armory;

cc._RF.pop();