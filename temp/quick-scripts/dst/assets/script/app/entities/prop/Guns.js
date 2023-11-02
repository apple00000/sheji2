
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/prop/Guns.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '054bfjlEYREGJmkW9iT6Xlw', 'Guns');
// script/app/entities/prop/Guns.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PropBase_1 = require("./PropBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Guns = /** @class */ (function (_super) {
    __extends(Guns, _super);
    function Guns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        return _this;
    }
    Guns.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.ske = this.getComponent(sp.Skeleton);
    };
    Guns.prototype.init = function (id) {
        _super.prototype.init.call(this, id);
        this.ske.setSkin(("000" + (id - 100)).substr(-3));
    };
    Guns.prototype.display = function () {
        var _this = this;
        this._on_off = false;
        this.node.active = true;
        this.ske.setAnimation(0, "gun_002", true);
        //倒计时
        if (this.cd > 0) {
            this.node.runAction(cc.sequence(cc.delayTime(this.cd - 5), cc.callFunc(function () {
                _this.ske.setAnimation(0, "gun", true);
            }), cc.blink(5, 25), cc.callFunc(function () {
                _this.node.active = false;
            })));
        }
    };
    Guns = __decorate([
        ccclass
    ], Guns);
    return Guns;
}(PropBase_1.default));
exports.default = Guns;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3Byb3AvR3Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFRO0lBQTFDO1FBQUEscUVBNEJDO1FBMUJHLFNBQUcsR0FBZSxJQUFJLENBQUM7O0lBMEIzQixDQUFDO0lBeEJHLHFCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdELG1CQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsaUJBQU0sSUFBSSxZQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxzQkFBTyxHQUFQO1FBQUEsaUJBWUM7UUFYRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxLQUFLO1FBQ0wsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pFLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNSO0lBQ0wsQ0FBQztJQTNCZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQTRCeEI7SUFBRCxXQUFDO0NBNUJELEFBNEJDLENBNUJpQyxrQkFBUSxHQTRCekM7a0JBNUJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBQcm9wQmFzZSBmcm9tIFwiLi9Qcm9wQmFzZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdW5zIGV4dGVuZHMgUHJvcEJhc2Uge1xyXG5cclxuICAgIHNrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5za2UgPSB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2tlLnNldFNraW4oKFwiMDAwXCIrKGlkLTEwMCkpLnN1YnN0cigtMykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoKXtcclxuICAgICAgICB0aGlzLl9vbl9vZmYgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24oMCwgXCJndW5fMDAyXCIsIHRydWUpO1xyXG4gICAgICAgIC8v5YCS6K6h5pe2XHJcbiAgICAgICAgaWYgKHRoaXMuY2QgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUodGhpcy5jZC01KSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tlLnNldEFuaW1hdGlvbigwLCBcImd1blwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfSksIGNjLmJsaW5rKDUsIDI1KSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19