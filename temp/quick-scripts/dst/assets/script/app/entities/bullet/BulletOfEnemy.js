
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be01bjDEqJBnot/Ow1MalHA', 'BulletOfEnemy');
// script/app/entities/bullet/BulletOfEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfEnemy = /** @class */ (function (_super) {
    __extends(BulletOfEnemy, _super);
    function BulletOfEnemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletOfEnemy.prototype.init = function (id) {
        this.bulletId = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Enemy)[id % 100 - 1];
        this.bThrought = false;
        this.hurt = Math.floor(config['hurt'] * GameProxy_1.GameProxy.enemyHurtMulOf(config['id']));
        this.repel = 0;
        this.stiff = 0;
    };
    BulletOfEnemy.prototype.onEnable = function () {
        window['GameBulletsController'].enemyBullets.push(this);
    };
    BulletOfEnemy.prototype.onDisable = function () {
        this.node.stopAllActions();
        this._contacts.length = 0;
        var gameBulletsController = window['GameBulletsController'];
        gameBulletsController.enemyBullets.splice(gameBulletsController.enemyBullets.indexOf(this), 1);
    };
    BulletOfEnemy.prototype.onCollisionEnter = function (other, self) {
        console.log("角色被子弹击中");
        window['GameRoleController'].hp -= this.hurt;
        if (!this.bThrought) {
            this.node.active = false;
        }
    };
    BulletOfEnemy.prototype.onCollisionStay = function (other, self) {
        // super.onCollisionStay(other, self);
    };
    BulletOfEnemy.prototype.onCollisionExit = function (other, self) {
        // super.onCollisionExit(other, self);
    };
    BulletOfEnemy = __decorate([
        ccclass
    ], BulletOfEnemy);
    return BulletOfEnemy;
}(Bullet_1.default));
exports.default = BulletOfEnemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkVuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFDOUIsZ0VBQTZEO0FBQzdELHdFQUFxRTtBQUNyRSxrREFBK0M7QUFFekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7O0lBc0NBLENBQUM7SUFuQ0csNEJBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM1RCxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsSUFBSTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxJQUFJO1FBQ3ZCLHNDQUFzQztJQUMxQyxDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixLQUFLLEVBQUUsSUFBSTtRQUN2QixzQ0FBc0M7SUFDMUMsQ0FBQztJQXJDZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXNDakM7SUFBRCxvQkFBQztDQXRDRCxBQXNDQyxDQXRDMEMsZ0JBQU0sR0FzQ2hEO2tCQXRDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPZkVuZW15IGV4dGVuZHMgQnVsbGV0IHtcclxuXHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRJZCA9IGlkO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5FbmVteSlbaWQlMTAwLTFdO1xyXG4gICAgICAgIHRoaXMuYlRocm91Z2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5odXJ0ID0gTWF0aC5mbG9vcihjb25maWdbJ2h1cnQnXSAqIEdhbWVQcm94eS5lbmVteUh1cnRNdWxPZihjb25maWdbJ2lkJ10pKTtcclxuICAgICAgICB0aGlzLnJlcGVsID0gMDtcclxuICAgICAgICB0aGlzLnN0aWZmID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZW5lbXlCdWxsZXRzLnB1c2godGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5fY29udGFjdHMubGVuZ3RoID0gMDtcclxuICAgICAgICBsZXQgZ2FtZUJ1bGxldHNDb250cm9sbGVyID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXTtcclxuICAgICAgICBnYW1lQnVsbGV0c0NvbnRyb2xsZXIuZW5lbXlCdWxsZXRzLnNwbGljZShnYW1lQnVsbGV0c0NvbnRyb2xsZXIuZW5lbXlCdWxsZXRzLmluZGV4T2YodGhpcyksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuinkuiJsuiiq+WtkOW8ueWHu+S4rVwiKTtcclxuICAgICAgICB3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddLmhwIC09IHRoaXMuaHVydDtcclxuICAgICAgICBpZiAoIXRoaXMuYlRocm91Z2h0KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICAvLyBzdXBlci5vbkNvbGxpc2lvblN0YXkob3RoZXIsIHNlbGYpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZikge1xyXG4gICAgICAgIC8vIHN1cGVyLm9uQ29sbGlzaW9uRXhpdChvdGhlciwgc2VsZik7XHJcbiAgICB9XHJcbn1cclxuIl19