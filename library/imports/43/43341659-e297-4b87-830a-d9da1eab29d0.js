"use strict";
cc._RF.push(module, '43341ZZ4pdLh4MK2doeqynQ', 'GameOverLucky');
// script/app/game/GameOverLucky.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameOverLucky = /** @class */ (function (_super) {
    __extends(GameOverLucky, _super);
    function GameOverLucky() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.templateLabel = null;
        _this.mask = null;
        return _this;
    }
    GameOverLucky.prototype.run = function (num, callback) {
        var min = 3;
        var offsetY = 0;
        var height = this.mask.node.height / 2 + this.templateLabel.node.height / 2;
        // let height = this.mask.node.height;
        for (var i = 0; i < 1; i++) {
            for (var j = 10; j >= min; j--) {
                var node = cc.instantiate(this.templateLabel.node);
                node.getComponent(cc.Label).string = "x" + j;
                node.x = 0;
                node.y = offsetY;
                offsetY += height;
                this.contentNode.addChild(node);
            }
        }
        for (var j = 10; j >= num; j--) {
            var node = cc.instantiate(this.templateLabel.node);
            node.getComponent(cc.Label).string = "x" + j;
            node.x = 0;
            node.y = offsetY;
            offsetY += height;
            this.contentNode.addChild(node);
        }
        this.templateLabel.node.active = false;
        offsetY -= height;
        var duration = offsetY / 1250;
        console.log(duration, offsetY, this.mask.node.height);
        this.contentNode.runAction(cc.sequence(cc.moveTo(duration, cc.v2(0, -offsetY)).easing(cc.easeSineInOut()), cc.delayTime(1), cc.callFunc(function () {
            console.log("finish.");
            callback();
        })));
    };
    __decorate([
        property(cc.Node)
    ], GameOverLucky.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameOverLucky.prototype, "templateLabel", void 0);
    __decorate([
        property(cc.Mask)
    ], GameOverLucky.prototype, "mask", void 0);
    GameOverLucky = __decorate([
        ccclass
    ], GameOverLucky);
    return GameOverLucky;
}(cc.Component));
exports.default = GameOverLucky;

cc._RF.pop();