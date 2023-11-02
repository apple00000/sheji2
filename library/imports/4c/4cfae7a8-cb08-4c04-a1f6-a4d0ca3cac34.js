"use strict";
cc._RF.push(module, '4cfaeeoywhMBKH2pNDKPKw0', 'ImpenetrableDefence');
// script/app/entities/role/ImpenetrableDefence.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ImpenetrableDefence = /** @class */ (function (_super) {
    __extends(ImpenetrableDefence, _super);
    function ImpenetrableDefence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        _this.followNode = null;
        _this.rotateAction = null;
        //密不透风的防御(武术)
        _this._impenetrableDefenceCD = 0;
        _this._defenceCD = 0;
        return _this;
    }
    ImpenetrableDefence.prototype.onLoad = function () {
        var _this = this;
        this.followNode.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.node.position = _this.followNode.position;
        });
        this.ske.setCompleteListener(function (trackEntry, loop) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "start") {
                _this.ske.setAnimation(0, "loops", true);
                _this.rotateAction = cc.speed(cc.repeatForever(cc.rotateBy(0.45, 360)), 0);
                _this.rotateAction.setTag(140);
                _this.node.runAction(_this.rotateAction);
            }
            else if (name == "transition") {
                _this.ske.setAnimation(0, "loops", true);
            }
        });
    };
    ImpenetrableDefence.prototype.start = function () {
        this.node.position = this.followNode.position;
    };
    Object.defineProperty(ImpenetrableDefence.prototype, "impenetrableDefenceCD", {
        set: function (value) {
            this._impenetrableDefenceCD = value;
            if (!this.node.active) {
                this.node.active = true;
                this.node.stopAllActions();
                this.ske.setAnimation(0, "start", false);
            }
        },
        enumerable: false,
        configurable: true
    });
    ImpenetrableDefence.prototype.defence = function () {
        if (this.ske.animation == "loops") {
            // this.rotateAction.setSpeed(0);
            this.ske.setAnimation(0, "transition", false);
            // this._defenceCD = 0.5;
        }
    };
    ImpenetrableDefence.prototype.update = function (dt) {
        if (GameProxy_1.GameProxy.pauseGame)
            return;
        if (this.node.color.getR() < 255) {
            this.node.color.setR(this.node.color.getR() + 1);
        }
        if (this.node.color.getG() < 255) {
            this.node.color.setG(this.node.color.getG() + 1);
        }
        if (this.node.color.getB() < 255) {
            this.node.color.setB(this.node.color.getB() + 1);
        }
        if (this.ske.animation === "loops") {
            if (this._defenceCD > 0) {
                this._defenceCD -= dt;
            }
            else if (this.rotateAction.getSpeed() < 1) {
                var speed = this.rotateAction.getSpeed() + 0.01;
                if (speed > 1) {
                    speed = 1;
                }
                this.rotateAction.setSpeed(speed);
            }
        }
        this._impenetrableDefenceCD -= dt;
        if (this._impenetrableDefenceCD <= 0) {
            this.node.active = false;
        }
    };
    __decorate([
        property(sp.Skeleton)
    ], ImpenetrableDefence.prototype, "ske", void 0);
    __decorate([
        property(cc.Node)
    ], ImpenetrableDefence.prototype, "followNode", void 0);
    ImpenetrableDefence = __decorate([
        ccclass
    ], ImpenetrableDefence);
    return ImpenetrableDefence;
}(cc.Component));
exports.default = ImpenetrableDefence;

cc._RF.pop();