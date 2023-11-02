
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/JackpotController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvSmFja3BvdENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFvQztBQUNwQyxxRUFBa0U7QUFDbEUsNkRBQTBEO0FBQzFELDJEQUFxRDtBQUNyRCx5REFBc0Q7QUFDdEQsOENBQXlDO0FBQ3pDLDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQStHQztRQTVHRyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBYSxJQUFJLENBQUM7O0lBbUc1QixDQUFDO0lBakdHLHdCQUF3QjtJQUV4QixrQ0FBTSxHQUFOO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDO1lBQ2pCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNwQixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNJLGdCQUFNLENBQUMsVUFBVSxD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UUFDSSxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7UUFDeEQsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsbUJBQU8sWUFBRyxDQUFDLFdBQVcsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO1FBQ2pHLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUMvQixhQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLGFBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztRQUN0RSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSw2QkFBYSxDQUFDLGFBQWEsRUFBQztZQUM1QixpQkFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQTNHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzBEQUNVO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNJO0lBWlAsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0ErR3JDO0lBQUQsd0JBQUM7Q0EvR0QsQUErR0MsQ0EvRzhDLEVBQUUsQ0FBQyxTQUFTLEdBK0cxRDtrQkEvR29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtleHR9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL0V4dGVuZFwiO1xyXG5pbXBvcnQge05ldHdvcmtDb25maWd9IGZyb20gXCIuLi9jb25maWcvTmV0d29ya0NvbmZpZ1wiO1xyXG5pbXBvcnQgTmV0d29yayBmcm9tIFwiLi4vbmV0d29yay9OZXR3b3JrXCI7XHJcbmltcG9ydCBGYWNhZGUgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9mYWNhZGUvRmFjYWRlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEphY2twb3RDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGdvbGRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRha2VMYWJlbDpjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIGJ1dHRvbjpjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdvbGRMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGFrZUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgRmFjYWRlLmNhbnZhc05vZGUub24oJ1Rha2VKYWNrcG90JywgdGhpcy5fdGFrZUl0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihcInZpZGVvXzZcIiwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnRha2VJdDNEbygpXHJcbiAgICAgICAgfSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZS5vZmYoJ1Rha2VKYWNrcG90JywgdGhpcy5fdGFrZUl0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZ29sZExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZGF5RWFyblRvdGFsTW9kaWZ5VGltZSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIFdvcmxkLlN0b3JhZ2UuZGF5RWFyblRvdGFsTW9kaWZ5VGltZSA9IFdvcmxkLk15LnNlcnZlclRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZGF5RWFybkV4cGlyZVRpbWUgID09IDApe1xyXG4gICAgICAgICAgICAgICAgV29ybGQuU3RvcmFnZS5kYXlFYXJuRXhwaXJlVGltZSA9IFdvcmxkLk15LnNlcnZlclRpbWUgKyAyNCo2MCo2MCoxMDAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXlFYXJuQ0QoKTtcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGF5RWFybkNEKCk7XHJcbiAgICAgICAgfSwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEYXlFYXJuQ0QoKXtcclxuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBXb3JsZC5NeS5zZXJ2ZXJUaW1lO1xyXG4gICAgICAgIGxldCBjZFRpbWUgPSAoV29ybGQuU3RvcmFnZS5kYXlFYXJuRXhwaXJlVGltZSAtIGN1cnJlbnRUaW1lKS8xMDAwO1xyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgaWYgKGNkVGltZSA+IDApe1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9ICgyNCo2MCo2MCoxMDAwIC0gY2RUaW1lKjEwMDApLygyNCo2MCo2MCoxMDAwKTtcclxuICAgICAgICAgICAgaWYgKHByb2dyZXNzID4gMSl7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IHByb2dyZXNzIDwgMTtcclxuICAgICAgICBsZXQgY2ZnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuR29sZFVwKTtcclxuICAgICAgICBsZXQgZGF5R2V0ID0gY2ZnW1dvcmxkLlN0b3JhZ2UuZGF5RWFybkx2LTFdWydvbl9ob29rJ107XHJcbiAgICAgICAgbGV0IGRpZmZUaW1lID0gKFdvcmxkLk15LnNlcnZlclRpbWUgLSBXb3JsZC5TdG9yYWdlLmRheUVhcm5Ub3RhbE1vZGlmeVRpbWUpLzEwMDA7XHJcbiAgICAgICAgbGV0IGFkZFRvdGFsID0gTWF0aC5mbG9vcihkaWZmVGltZS8zKSAqIGRheUdldDtcclxuICAgICAgICBpZiAoYWRkVG90YWwgPiAwKXtcclxuICAgICAgICAgICAgV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwgKz0gYWRkVG90YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ29sZExhYmVsLnN0cmluZyA9IGV4dC5zaG9ydEZvcm1hdChXb3JsZC5TdG9yYWdlLmRheUVhcm5Ub3RhbCk7XHJcbiAgICAgICAgdGhpcy5idXR0b24uaW50ZXJhY3RhYmxlID0gV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwgPiAwO1xyXG4gICAgICAgIHRoaXMudGFrZUxhYmVsLm5vZGUuYWN0aXZlID0gV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwgPiAwO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAoZGlmZlRpbWUlMykgLyAzO1xyXG4gICAgfVxyXG5cclxuICAgIF90YWtlSXQobnVtOm51bWJlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJB2aWRlb+OAkTYg5aSa5YCN6YeR5biB44CQY2xpY2vjgJFKYWNrcG90Q29udHJvbGxlciBfdGFrZUl0XCIsIG51bSlcclxuXHJcbiAgICAgICAgaWYgKG51bT09MSl7XHJcbiAgICAgICAgICAgIHRoaXMudGFrZUlkMSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudGFrZUl0MygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRha2VJZDEoKSB7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgKz0gV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwqMTtcclxuICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoJ1Nob3dUaXBzQ29tbWFuZCcsIGDph5HluIEgKyR7ZXh0LnNob3J0Rm9ybWF0KFdvcmxkLlN0b3JhZ2UuZGF5RWFyblRvdGFsKjEpfWApO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZGF5RWFyblRvdGFsID0gMDtcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLmRheUVhcm5FeHBpcmVUaW1lID0gV29ybGQuTXkuc2VydmVyVGltZSArIDI0KjYwKjYwKjEwMDA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXlFYXJuQ0QoKTtcclxuICAgICAgICBpZiAoTmV0d29ya0NvbmZpZy5jb25uZWN0U2VydmVyKXtcclxuICAgICAgICAgICAgTmV0d29yay5wdXNoU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0YWtlSXQzKCkge1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuX3ZpZGVvU2lnbj02XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS52aWRlb0FkX3Nob3coKSBcclxuICAgIH1cclxuXHJcbiAgICB0YWtlSXQzRG8oKXtcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCArPSBXb3JsZC5TdG9yYWdlLmRheUVhcm5Ub3RhbCozO1xyXG4gICAgICAgIEZhY2FkZS5leGVjdXRlQ29tbWFuZCgnU2hvd1RpcHNDb21tYW5kJywgYOmHkeW4gSArJHtleHQuc2hvcnRGb3JtYXQoV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwqMyl9YCk7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5kYXlFYXJuVG90YWwgPSAwO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuZGF5RWFybkV4cGlyZVRpbWUgPSBXb3JsZC5NeS5zZXJ2ZXJUaW1lICsgMjQqNjAqNjAqMTAwMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZURheUVhcm5DRCgpO1xyXG4gICAgICAgIGlmIChOZXR3b3JrQ29uZmlnLmNvbm5lY3RTZXJ2ZXIpe1xyXG4gICAgICAgICAgICBOZXR3b3JrLnB1c2hTdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==