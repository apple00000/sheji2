"use strict";
cc._RF.push(module, '4df4e9sTVZId7fiAYzaOydn', 'JackpotController');
// script/app/home/JackpotController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("../info/World");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Extend_1 = require("../../../framework/extend/Extend");
var NetworkConfig_1 = require("../config/NetworkConfig");
var Network_1 = require("../network/Network");
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JackpotController = /** @class */ (function (_super) {
    __extends(JackpotController, _super);
    function JackpotController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        _this.goldLabel = null;
        _this.takeLabel = null;
        _this.button = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    JackpotController.prototype.onLoad = function () {
        var _this = this;
        this.progressBar.node.active = false;
        this.goldLabel.node.active = false;
        this.takeLabel.node.active = false;
        Facade_1.default.canvasNode.on('TakeJackpot', this._takeIt, this);
        this.init();
        cc.game.on("video_6", function () {
            _this.takeIt3Do();
        }, this);
    };
    JackpotController.prototype.onDestroy = function () {
        Facade_1.default.canvasNode.off('TakeJackpot', this._takeIt, this);
    };
    JackpotController.prototype.init = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.goldLabel.node.active = true;
            if (World_1.World.Storage.dayEarnTotalModifyTime == 0) {
                World_1.World.Storage.dayEarnTotalModifyTime = World_1.World.My.serverTime;
            }
            if (World_1.World.Storage.dayEarnExpireTime == 0) {
                World_1.World.Storage.dayEarnExpireTime = World_1.World.My.serverTime + 24 * 60 * 60 * 1000;
            }
            _this.schedule(function () {
                _this.updateDayEarnCD();
            }, 0);
            _this.updateDayEarnCD();
        }, 0.1);
    };
    JackpotController.prototype.updateDayEarnCD = function () {
        var currentTime = World_1.World.My.serverTime;
        var cdTime = (World_1.World.Storage.dayEarnExpireTime - currentTime) / 1000;
        var progress = 0;
        if (cdTime > 0) {
            progress = (24 * 60 * 60 * 1000 - cdTime * 1000) / (24 * 60 * 60 * 1000);
            if (progress > 1) {
                progress = 1;
            }
        }
        else {
            progress = 1;
        }
        this.progressBar.node.active = progress < 1;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        var dayGet = cfg[World_1.World.Storage.dayEarnLv - 1]['on_hook'];
        var diffTime = (World_1.World.My.serverTime - World_1.World.Storage.dayEarnTotalModifyTime) / 1000;
        var addTotal = Math.floor(diffTime / 3) * dayGet;
        if (addTotal > 0) {
            World_1.World.Storage.dayEarnTotal += addTotal;
        }
        this.goldLabel.string = Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal);
        this.button.interactable = World_1.World.Storage.dayEarnTotal > 0;
        this.takeLabel.node.active = World_1.World.Storage.dayEarnTotal > 0;
        this.progressBar.progress = (diffTime % 3) / 3;
    };
    JackpotController.prototype._takeIt = function (num) {
        console.log("【video】6 多倍金币【click】JackpotController _takeIt", num);
        if (num == 1) {
            this.takeId1();
        }
        else {
            this.takeIt3();
        }
    };
    JackpotController.prototype.takeId1 = function () {
        World_1.World.Storage.goldCount += World_1.World.Storage.dayEarnTotal * 1;
        Facade_1.default.executeCommand('ShowTipsCommand', "\u91D1\u5E01 +" + Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal * 1));
        World_1.World.Storage.dayEarnTotal = 0;
        World_1.World.Storage.dayEarnExpireTime = World_1.World.My.serverTime + 24 * 60 * 60 * 1000;
        this.updateDayEarnCD();
        if (NetworkConfig_1.NetworkConfig.connectServer) {
            Network_1.default.pushStorage();
        }
    };
    JackpotController.prototype.takeIt3 = function () {
        World_1.World.Storage._videoSign = 6;
        World_1.World.Storage.videoAd_show();
    };
    JackpotController.prototype.takeIt3Do = function () {
        World_1.World.Storage.goldCount += World_1.World.Storage.dayEarnTotal * 3;
        Facade_1.default.executeCommand('ShowTipsCommand', "\u91D1\u5E01 +" + Extend_1.ext.shortFormat(World_1.World.Storage.dayEarnTotal * 3));
        World_1.World.Storage.dayEarnTotal = 0;
        World_1.World.Storage.dayEarnExpireTime = World_1.World.My.serverTime + 24 * 60 * 60 * 1000;
        this.updateDayEarnCD();
        if (NetworkConfig_1.NetworkConfig.connectServer) {
            Network_1.default.pushStorage();
        }
    };
    __decorate([
        property(cc.ProgressBar)
    ], JackpotController.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Label)
    ], JackpotController.prototype, "goldLabel", void 0);
    __decorate([
        property(cc.Label)
    ], JackpotController.prototype, "takeLabel", void 0);
    __decorate([
        property(cc.Button)
    ], JackpotController.prototype, "button", void 0);
    JackpotController = __decorate([
        ccclass
    ], JackpotController);
    return JackpotController;
}(cc.Component));
exports.default = JackpotController;

cc._RF.pop();