
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfXuanFengHuoPao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e66bcwOmhtNi6ipYqY6Dey8', 'BulletOfXuanFengHuoPao');
// script/app/entities/bullet/BulletOfXuanFengHuoPao.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var World_1 = require("../../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfXuanFengHuoPao = /** @class */ (function (_super) {
    __extends(BulletOfXuanFengHuoPao, _super);
    function BulletOfXuanFengHuoPao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletOfXuanFengHuoPao.prototype.strike = function (other, self) {
        // super.strike(other, self);
    };
    BulletOfXuanFengHuoPao.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfXuanFengHuoPao = __decorate([
        ccclass
    ], BulletOfXuanFengHuoPao);
    return BulletOfXuanFengHuoPao;
}(Bullet_1.default));
exports.default = BulletOfXuanFengHuoPao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZlh1YW5GZW5nSHVvUGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFDOUIsd0VBQXFFO0FBQ3JFLGdFQUE2RDtBQUM3RCwwQ0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0QsMENBQU07SUFBMUQ7O0lBZ0JBLENBQUM7SUFiRyx1Q0FBTSxHQUFOLFVBQU8sS0FBSyxFQUFFLElBQUk7UUFDZCw2QkFBNkI7SUFDakMsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFmZ0Isc0JBQXNCO1FBRDFDLE9BQU87T0FDYSxzQkFBc0IsQ0FnQjFDO0lBQUQsNkJBQUM7Q0FoQkQsQUFnQkMsQ0FoQm1ELGdCQUFNLEdBZ0J6RDtrQkFoQm9CLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uLy4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0T2ZYdWFuRmVuZ0h1b1BhbyBleHRlbmRzIEJ1bGxldCB7XHJcblxyXG5cclxuICAgIHN0cmlrZShvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgICAgIC8vIHN1cGVyLnN0cmlrZShvdGhlciwgc2VsZik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRJZCA9IGlkO1xyXG4gICAgICAgIGxldCBjZmcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Qcm9wKVt0aGlzLmJ1bGxldElkLTFdO1xyXG4gICAgICAgIHRoaXMuYlRocm91Z2h0ID0gY2ZnWydwaWVyY2UnXSA9PT0gMTtcclxuICAgICAgICB0aGlzLnJlcGVsID0gY2ZnWydyZXBlbCddO1xyXG4gICAgICAgIHRoaXMuc3RpZmYgPSBjZmdbJ3N0aWZmJ107XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbilbMF07XHJcbiAgICAgICAgdGhpcy5odXJ0ID0gTWF0aC5mbG9vcihjb25maWdbJ2h1cnQnXSpXb3JsZC5NeS5hcm1vcnkuaHVydE11bE9mKDEpKSpjZmdbJ2h1cnQnXTtcclxuICAgIH1cclxufVxyXG4iXX0=