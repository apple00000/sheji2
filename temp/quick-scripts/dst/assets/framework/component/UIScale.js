
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/UIScale.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1VJU2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBRTdGLElBQUEsS0FBNEIsRUFBRSxDQUFDLFVBQVUsRUFBeEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFpQixDQUFDO0FBSWhEO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBNEJDO1FBekJHLGNBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsaUJBQVcsR0FBRyxJQUFJLENBQUM7O0lBc0J2QixDQUFDO0lBcEJHLHVCQUFLLEdBQUw7UUFDSSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsTUFBTSxDQUFDO1FBQzNGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFFeEYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDakIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksV0FBVyxHQUFHLFVBQVUsRUFBQztnQkFDekIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRDtpQkFBSztnQkFDRixJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1NBQ0o7SUFDTCxDQUFDO0lBeEJEO1FBREMsUUFBUTs2Q0FDUTtJQUdqQjtRQURDLFFBQVE7Z0RBQ1U7SUFORixPQUFPO1FBRjNCLE9BQU87UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDO09BQ0MsT0FBTyxDQTRCM0I7SUFBRCxjQUFDO0NBNUJELEFBNEJDLENBNUJvQyxFQUFFLENBQUMsU0FBUyxHQTRCaEQ7a0JBNUJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHksIG1lbnV9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi6Ieq5a6a5LmJL1VJU2NhbGVcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTY2FsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBmaXRTY2FsZSA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZml0UG9zaXRpb24gPSB0cnVlO1xyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBsZXQgaGVpZ2h0U2NhbGUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0L2NjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpZHRoU2NhbGUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgvY2Mudmlldy5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLndpZHRoO1xyXG5cclxuICAgICAgICBsZXQgYWRkU2NhbGUgPSBNYXRoLmFicyhoZWlnaHRTY2FsZSAtIHdpZHRoU2NhbGUpO1xyXG4gICAgICAgIGlmICh0aGlzLmZpdFNjYWxlKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKHRoaXMubm9kZS5zY2FsZSArIGFkZFNjYWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpdFBvc2l0aW9uKXtcclxuICAgICAgICAgICAgbGV0IHdvcmxkUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgIGlmIChoZWlnaHRTY2FsZSA+IHdpZHRoU2NhbGUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSB3b3JsZFBvcy55ICogKDErYWRkU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoMCwgeSkpLnk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gd29ybGRQb3MueCAqICgxICsgYWRkU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoeCwgMCkpLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19