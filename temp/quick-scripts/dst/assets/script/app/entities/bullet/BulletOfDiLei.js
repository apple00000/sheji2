
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfDiLei.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea76fcmuIdJV6eQoHlSHVSh', 'BulletOfDiLei');
// script/app/entities/bullet/BulletOfDiLei.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var Facade_1 = require("../../../../framework/facade/Facade");
var GameProxy_1 = require("../../game/GameProxy");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var World_1 = require("../../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfDiLei = /** @class */ (function (_super) {
    __extends(BulletOfDiLei, _super);
    function BulletOfDiLei() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameExplosivesController = null;
        return _this;
    }
    BulletOfDiLei.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfDiLei.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfDiLei.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._gameExplosivesController = Facade_1.default.findComponent("GameScene", "GameExplosivesController");
    };
    BulletOfDiLei.prototype.onCollisionEnter = function (other, self) {
        /** 爆炸 */
        this.node.active = false;
        this.boom();
    };
    BulletOfDiLei.prototype.boom = function () {
        var explosiveHuoJianTong = this._gameExplosivesController.getInactiveExplosive(9);
        explosiveHuoJianTong.node.position = this.node.position;
        explosiveHuoJianTong.node.active = true;
        explosiveHuoJianTong.node.scale = 0.5;
        explosiveHuoJianTong.node.rotation = Math.random() * 360;
        explosiveHuoJianTong.boom();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.ShakeScreen, 0.08, 2, 2);
    };
    BulletOfDiLei = __decorate([
        ccclass
    ], BulletOfDiLei);
    return BulletOfDiLei;
}(Bullet_1.default));
exports.default = BulletOfDiLei;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkRpTGVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFDOUIsOERBQXlEO0FBQ3pELGtEQUErQztBQUMvQyx3RUFBcUU7QUFDckUsZ0VBQTZEO0FBQzdELDBDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQTBDQztRQXhDVywrQkFBeUIsR0FBRyxJQUFJLENBQUM7O0lBd0M3QyxDQUFDO0lBckNHLDhCQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsSUFBSTtRQUNkLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUdELDhCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBSUQsd0NBQWdCLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxJQUFJO1FBQ3hCLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw0QkFBSSxHQUFKO1FBQ0ksSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN0QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDdkQsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIscUJBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQXpDZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTBDakM7SUFBRCxvQkFBQztDQTFDRCxBQTBDQyxDQTFDMEMsZ0JBQU0sR0EwQ2hEO2tCQTFDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4uLy4uL2dhbWUvR2FtZVByb3h5XCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vLi4vaW5mby9Xb3JsZFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPZkRpTGVpIGV4dGVuZHMgQnVsbGV0IHtcclxuXHJcbiAgICBwcml2YXRlIF9nYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBzdHJpa2Uob3RoZXIsIHNlbGYpOiB2b2lkIHtcclxuICAgICAgICAvLyBzdXBlci5zdHJpa2Uob3RoZXIsIHNlbGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnVsbGV0SWQgPSBpZDtcclxuICAgICAgICBsZXQgY2ZnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuUHJvcClbdGhpcy5idWxsZXRJZC0xXTtcclxuICAgICAgICB0aGlzLmJUaHJvdWdodCA9IGNmZ1sncGllcmNlJ10gPT09IDE7XHJcbiAgICAgICAgdGhpcy5yZXBlbCA9IGNmZ1sncmVwZWwnXTtcclxuICAgICAgICB0aGlzLnN0aWZmID0gY2ZnWydzdGlmZiddO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pWzBdO1xyXG4gICAgICAgIHRoaXMuaHVydCA9IE1hdGguZmxvb3IoY29uZmlnWydodXJ0J10qV29ybGQuTXkuYXJtb3J5Lmh1cnRNdWxPZigxKSkqY2ZnWydodXJ0J107XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLl9nYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXIgPSBGYWNhZGUuZmluZENvbXBvbmVudChcIkdhbWVTY2VuZVwiLCBcIkdhbWVFeHBsb3NpdmVzQ29udHJvbGxlclwiKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpOiB2b2lkIHtcclxuICAgICAgICAvKiog54iG54K4ICovXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm9vbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJvb20oKXtcclxuICAgICAgICBsZXQgZXhwbG9zaXZlSHVvSmlhblRvbmcgPSB0aGlzLl9nYW1lRXhwbG9zaXZlc0NvbnRyb2xsZXIuZ2V0SW5hY3RpdmVFeHBsb3NpdmUoOSk7XHJcbiAgICAgICAgZXhwbG9zaXZlSHVvSmlhblRvbmcubm9kZS5wb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZXhwbG9zaXZlSHVvSmlhblRvbmcubm9kZS5zY2FsZSA9IDAuNTtcclxuICAgICAgICBleHBsb3NpdmVIdW9KaWFuVG9uZy5ub2RlLnJvdGF0aW9uID0gTWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgZXhwbG9zaXZlSHVvSmlhblRvbmcuYm9vbSgpO1xyXG4gICAgICAgIEdhbWVQcm94eS5lbWl0KEdhbWVQcm94eS5FdmVudC5TaGFrZVNjcmVlbiwgMC4wOCwgMiwgMik7XHJcbiAgICB9XHJcbn1cclxuIl19