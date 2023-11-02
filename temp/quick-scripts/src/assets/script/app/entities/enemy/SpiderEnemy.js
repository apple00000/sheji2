"use strict";
cc._RF.push(module, '944dfHPyTJMzJibewidrYiK', 'SpiderEnemy');
// script/app/entities/enemy/SpiderEnemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Music_1 = require("../../../../framework/audio/Music");
var GameProxy_1 = require("../../game/GameProxy");
var Enemy_1 = require("./Enemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpiderEnemy = /** @class */ (function (_super) {
    __extends(SpiderEnemy, _super);
    function SpiderEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blinkNode = null;
        return _this;
    }
    Object.defineProperty(SpiderEnemy.prototype, "bAcc", {
        set: function (value) {
            this._bAcc = value;
            if (this._bAcc && !this.blinkNode.active) {
                this.blinkNode.active = true;
                this.blinkNode.runAction(cc.repeatForever(cc.blink(1, 3)));
                var duration = 0.5;
                var repeatFunc = function () {
                    if (!GameProxy_1.GameProxy.pauseGame) {
                        Music_1.Music.playSFX("sound/msc_en002");
                    }
                    // this.node.runAction(cc.sequence(cc.delayTime(duration), cc.callFunc(repeatFunc)));
                    // if (duration > 0.3){
                    //     duration -= duration/10;
                    // }
                };
                repeatFunc();
            }
        },
        enumerable: false,
        configurable: true
    });
    SpiderEnemy.prototype.doAttack = function () {
        this.hp = 0;
        console.log("爆炸蜘蛛死掉");
    };
    SpiderEnemy.prototype.playDead = function () {
        _super.prototype.playDead.call(this);
        /** 爆炸 */
        var bullet = window['GameBulletsController'].getInactiveEnemyBullet(this._enemyID);
        bullet.node.position = this.node.position;
        bullet.node.rotation = this.node.rotation;
        bullet.node.active = true;
        bullet.boom();
    };
    SpiderEnemy.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.blinkNode.stopAllActions();
        this.blinkNode.active = false;
    };
    __decorate([
        property(cc.Node)
    ], SpiderEnemy.prototype, "blinkNode", void 0);
    SpiderEnemy = __decorate([
        ccclass
    ], SpiderEnemy);
    return SpiderEnemy;
}(Enemy_1.default));
exports.default = SpiderEnemy;

cc._RF.pop();