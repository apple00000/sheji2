"use strict";
cc._RF.push(module, '422cbmXYSFCDaWW8A+EYdil', 'UIScale');
// framework/component/UIScale.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var UIScale = /** @class */ (function (_super) {
    __extends(UIScale, _super);
    function UIScale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fitScale = false;
        _this.fitPosition = true;
        return _this;
    }
    UIScale.prototype.start = function () {
        var heightScale = cc.view.getVisibleSize().height / cc.view.getDesignResolutionSize().height;
        var widthScale = cc.view.getVisibleSize().width / cc.view.getDesignResolutionSize().width;
        var addScale = Math.abs(heightScale - widthScale);
        if (this.fitScale) {
            this.node.setScale(this.node.scale + addScale);
        }
        if (this.fitPosition) {
            var worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            if (heightScale > widthScale) {
                var y = worldPos.y * (1 + addScale);
                this.node.y = this.node.convertToNodeSpaceAR(cc.v2(0, y)).y;
            }
            else {
                var x = worldPos.x * (1 + addScale);
                this.node.x = this.node.convertToNodeSpaceAR(cc.v2(x, 0)).x;
            }
        }
    };
    __decorate([
        property
    ], UIScale.prototype, "fitScale", void 0);
    __decorate([
        property
    ], UIScale.prototype, "fitPosition", void 0);
    UIScale = __decorate([
        ccclass,
        menu("自定义/UIScale")
    ], UIScale);
    return UIScale;
}(cc.Component));
exports.default = UIScale;

cc._RF.pop();