
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/bullet/BulletOfJianGuangSi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0d80OY65BAjLn62n5cq+8P', 'BulletOfJianGuangSi');
// script/app/entities/bullet/BulletOfJianGuangSi.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Bullet_1 = require("./Bullet");
var World_1 = require("../../info/World");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletOfJianGuangSi = /** @class */ (function (_super) {
    __extends(BulletOfJianGuangSi, _super);
    function BulletOfJianGuangSi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ske = null;
        return _this;
    }
    BulletOfJianGuangSi.prototype.init = function (id) {
        this.bulletId = id;
        var cfg = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop)[this.bulletId - 1];
        this.bThrought = cfg['pierce'] === 1;
        this.repel = cfg['repel'];
        this.stiff = cfg['stiff'];
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon)[0];
        this.hurt = Math.floor(config['hurt'] * World_1.World.My.armory.hurtMulOf(1)) * cfg['hurt'];
    };
    BulletOfJianGuangSi.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._ske = this.getComponent(sp.Skeleton);
        this._ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            _this.node.active = false;
        });
    };
    BulletOfJianGuangSi.prototype.onCollisionEnter = function (other, self) {
    };
    BulletOfJianGuangSi.prototype.execute = function () {
        var _this = this;
        this._ske.setAnimation(0, "614", false);
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            /** 对所有敌人造成伤害 */
            // console.log("对所有敌人造成伤害");
            window['GameEnemysController'].allAliveEnemy().forEach(function (value) { return value.hp -= _this.hurt; });
        })));
    };
    BulletOfJianGuangSi = __decorate([
        ccclass
    ], BulletOfJianGuangSi);
    return BulletOfJianGuangSi;
}(Bullet_1.default));
exports.default = BulletOfJianGuangSi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkppYW5HdWFuZ1NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBOEI7QUFFOUIsMENBQXVDO0FBQ3ZDLHdFQUFxRTtBQUNyRSxnRUFBNkQ7QUFFdkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBaUQsdUNBQU07SUFBdkQ7UUFBQSxxRUFxQ0M7UUFuQ1csVUFBSSxHQUFlLElBQUksQ0FBQzs7SUFtQ3BDLENBQUM7SUFoQ0csa0NBQUksR0FBSixVQUFLLEVBQVU7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLHlCQUFXLENBQUMsYUFBYSxDQUFDLGlDQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUdELG9DQUFNLEdBQU47UUFBQSxpQkFPQztRQU5HLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQUMsVUFBVSxFQUFFLFNBQVM7WUFDaEQsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsOENBQWdCLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxJQUFJO0lBQzVCLENBQUM7SUFFRCxxQ0FBTyxHQUFQO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3pELGdCQUFnQjtZQUNoQiw0QkFBNEI7WUFDNUIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFFLE9BQUEsS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXBDZ0IsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0FxQ3ZDO0lBQUQsMEJBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ2dELGdCQUFNLEdBcUN0RDtrQkFyQ29CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0T2ZKaWFuR3VhbmdTaSBleHRlbmRzIEJ1bGxldCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcblxyXG4gICAgaW5pdChpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRJZCA9IGlkO1xyXG4gICAgICAgIGxldCBjZmcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Qcm9wKVt0aGlzLmJ1bGxldElkLTFdO1xyXG4gICAgICAgIHRoaXMuYlRocm91Z2h0ID0gY2ZnWydwaWVyY2UnXSA9PT0gMTtcclxuICAgICAgICB0aGlzLnJlcGVsID0gY2ZnWydyZXBlbCddO1xyXG4gICAgICAgIHRoaXMuc3RpZmYgPSBjZmdbJ3N0aWZmJ107XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbilbMF07XHJcbiAgICAgICAgdGhpcy5odXJ0ID0gTWF0aC5mbG9vcihjb25maWdbJ2h1cnQnXSpXb3JsZC5NeS5hcm1vcnkuaHVydE11bE9mKDEpKSpjZmdbJ2h1cnQnXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuX3NrZSA9IHRoaXMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLl9za2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZik6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUoKXtcclxuICAgICAgICB0aGlzLl9za2Uuc2V0QW5pbWF0aW9uKDAsIFwiNjE0XCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgyKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgLyoqIOWvueaJgOacieaVjOS6uumAoOaIkOS8pOWusyAqL1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWvueaJgOacieaVjOS6uumAoOaIkOS8pOWus1wiKTtcclxuICAgICAgICAgICAgd2luZG93WydHYW1lRW5lbXlzQ29udHJvbGxlciddLmFsbEFsaXZlRW5lbXkoKS5mb3JFYWNoKHZhbHVlPT52YWx1ZS5ocCAtPSB0aGlzLmh1cnQpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuIl19