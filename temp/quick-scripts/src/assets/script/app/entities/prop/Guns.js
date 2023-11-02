"use strict";
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