
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/enemy/SpiderEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2VuZW15L1NwaWRlckVuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyREFBd0Q7QUFDeEQsa0RBQStDO0FBQy9DLGlDQUE0QjtBQUV0QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBSztJQUE5QztRQUFBLHFFQWlEQztRQTlDRyxlQUFTLEdBQVcsSUFBSSxDQUFDOztJQThDN0IsQ0FBQztJQTVDRyxzQkFBSSw2QkFBSTthQUFSLFVBQVMsS0FBYztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO2dCQUNuQixJQUFJLFVBQVUsR0FBRztvQkFDYixJQUFJLENBQUMscUJBQVMsQ0FBQyxTQUFTLEVBQUM7d0JBQ3JCLGFBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztxQkFDcEM7b0JBQ0QscUZBQXFGO29CQUNyRix1QkFBdUI7b0JBQ3ZCLCtCQUErQjtvQkFDL0IsSUFBSTtnQkFDUixDQUFDLENBQUM7Z0JBQ0YsVUFBVSxFQUFFLENBQUM7YUFDaEI7UUFDTCxDQUFDOzs7T0FBQTtJQUdTLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFHRCw4QkFBUSxHQUFSO1FBQ0ksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsU0FBUztRQUNULElBQUksTUFBTSxHQUFtQixNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQTFDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNPO0lBSFIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWlEL0I7SUFBRCxrQkFBQztDQWpERCxBQWlEQyxDQWpEd0MsZUFBSyxHQWlEN0M7a0JBakRvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRPZlNwaWRlciBmcm9tIFwiLi4vYnVsbGV0L0J1bGxldE9mU3BpZGVyXCI7XHJcbmltcG9ydCB7TXVzaWN9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvYXVkaW8vTXVzaWNcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpZGVyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBibGlua05vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgc2V0IGJBY2ModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9iQWNjID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JBY2MgJiYgIXRoaXMuYmxpbmtOb2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYmxpbmtOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmxpbmtOb2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLmJsaW5rKDEsIDMpKSk7XHJcbiAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IDAuNTtcclxuICAgICAgICAgICAgbGV0IHJlcGVhdEZ1bmMgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFHYW1lUHJveHkucGF1c2VHYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBNdXNpYy5wbGF5U0ZYKFwic291bmQvbXNjX2VuMDAyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoZHVyYXRpb24pLCBjYy5jYWxsRnVuYyhyZXBlYXRGdW5jKSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGR1cmF0aW9uID4gMC4zKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkdXJhdGlvbiAtPSBkdXJhdGlvbi8xMDtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVwZWF0RnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGRvQXR0YWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHAgPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi54iG54K46JyY6Jub5q275o6JXCIpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHBsYXlEZWFkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkKCk7XHJcbiAgICAgICAgLyoqIOeIhueCuCAqL1xyXG4gICAgICAgIGxldCBidWxsZXQgPSA8QnVsbGV0T2ZTcGlkZXI+d2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXS5nZXRJbmFjdGl2ZUVuZW15QnVsbGV0KHRoaXMuX2VuZW15SUQpO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLnJvdGF0aW9uID0gdGhpcy5ub2RlLnJvdGF0aW9uO1xyXG4gICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0LmJvb20oKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuYmxpbmtOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ibGlua05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19