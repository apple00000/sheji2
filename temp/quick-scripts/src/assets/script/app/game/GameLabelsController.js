"use strict";
cc._RF.push(module, 'f7e2bT6UTxOj6t7XhqyjcZH', 'GameLabelsController');
// script/app/game/GameLabelsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLabelsController = /** @class */ (function (_super) {
    __extends(GameLabelsController, _super);
    function GameLabelsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelLayer = null;
        _this.templateLabel = null;
        return _this;
    }
    GameLabelsController.prototype.onLoad = function () {
        window['GameLabelsController'] = this;
    };
    GameLabelsController.prototype.genLabel = function () {
        var labelNode = cc.instantiate(this.templateLabel.node);
        labelNode.active = false;
        this.labelLayer.addChild(labelNode);
        return labelNode.getComponent(cc.Label);
    };
    GameLabelsController.prototype.getInactiveLabel = function () {
        var findNode = this.labelLayer.children.find(function (value) { return value.active == false && value.getComponent(cc.Label); });
        if (findNode) {
            return findNode.getComponent(cc.Label);
        }
        else {
            return this.genLabel();
        }
    };
    /** 飘字 */
    GameLabelsController.prototype.fly = function (str, pos) {
        var label = this.getInactiveLabel();
        label.node.active = true;
        label.string = str;
        label.node.position = pos;
        label.node.color = cc.Color.RED;
        label.node.scale = 0;
        label.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.fadeTo(0.1, 255), cc.moveBy(0.1, cc.v2(0, 10))), cc.delayTime(0.1), cc.spawn(cc.moveBy(0.3, cc.v2(0, 30)), cc.fadeTo(0.3, 100)), cc.callFunc(function () {
            label.node.active = false;
        })));
    };
    __decorate([
        property(cc.Node)
    ], GameLabelsController.prototype, "labelLayer", void 0);
    __decorate([
        property(cc.Label)
    ], GameLabelsController.prototype, "templateLabel", void 0);
    GameLabelsController = __decorate([
        ccclass
    ], GameLabelsController);
    return GameLabelsController;
}(cc.Component));
exports.default = GameLabelsController;

cc._RF.pop();