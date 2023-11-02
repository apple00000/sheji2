"use strict";
cc._RF.push(module, '5c07bd2qlBC57ZQMODENtUU', 'PropBase');
// script/app/entities/prop/PropBase.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropBase = /** @class */ (function (_super) {
    __extends(PropBase, _super);
    function PropBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        _this.cd = 12;
        _this.collider = null;
        /** 是否触发了 */
        _this._on_off = false;
        /** 是否被磁铁吸引 */
        _this._magnetic = false;
        _this.propID = -1;
        return _this;
    }
    Object.defineProperty(PropBase.prototype, "on_off", {
        get: function () {
            return this._on_off;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropBase.prototype, "magnetic", {
        get: function () {
            return this._magnetic;
        },
        set: function (value) {
            if (value != this._magnetic) {
                this._magnetic = value;
                if (this._magnetic) {
                    // console.log("磁力生效===>");
                    this.node.stopAllActions();
                    /** 撞向角色 */
                    this.moveToRole();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    PropBase.prototype.moveToRole = function () {
        var _this = this;
        var gameRoleController = window['GameRoleController'];
        var speed = 1000;
        var distance = this.node.position.sub(gameRoleController.role.node.position).mag();
        this.node.runAction(cc.sequence(cc.moveTo(distance / speed, gameRoleController.role.node.position).easing(cc.easeSineIn()), cc.callFunc(function () {
            _this.moveToRole();
        })));
    };
    PropBase.prototype.init = function (id) {
        this.propID = id;
    };
    PropBase.prototype.display = function () {
        var _this = this;
        this._on_off = false;
        this.node.active = true;
        //倒计时
        if (this.cd > 0) {
            this.node.runAction(cc.sequence(cc.delayTime(this.cd - 5), cc.blink(5, 25), cc.callFunc(function () {
                _this.node.active = false;
            })));
        }
    };
    PropBase.prototype.trigger = function () {
        this._on_off = true;
        this.node.stopAllActions();
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.PropTrigger, this);
        this.node.active = false;
    };
    PropBase.prototype.onLoad = function () {
        this.collider = this.getComponent(cc.Collider);
    };
    PropBase.prototype.onEnable = function () {
        /** 检测与角色的碰撞 */
        this._on_off = false;
        this._magnetic = false;
        window['GameEnemysController'].gameProps.push(this);
    };
    PropBase.prototype.onDisable = function () {
        this.node.stopAllActions();
        var gameEnemysController = window['GameEnemysController'];
        gameEnemysController.gameProps.splice(gameEnemysController.gameProps.indexOf(this), 1);
    };
    PropBase = __decorate([
        ccclass
    ], PropBase);
    return PropBase;
}(cc.Component));
exports.default = PropBase;

cc._RF.pop();