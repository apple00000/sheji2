
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/ShadowLayerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6fe32R8NilNCJIY/KYNM8S+', 'ShadowLayerController');
// script/app/home/ShadowLayerController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShadowLayerController = /** @class */ (function (_super) {
    __extends(ShadowLayerController, _super);
    function ShadowLayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shadowCamera = null;
        _this.sprite = null;
        return _this;
    }
    ShadowLayerController.prototype.onLoad = function () {
        /** 设置影子(角色和敌人) */
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.shadowCamera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;
        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color = cc.Color.BLACK;
        this.sprite.node.opacity = 100;
    };
    __decorate([
        property(cc.Camera)
    ], ShadowLayerController.prototype, "shadowCamera", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShadowLayerController.prototype, "sprite", void 0);
    ShadowLayerController = __decorate([
        ccclass
    ], ShadowLayerController);
    return ShadowLayerController;
}(cc.Component));
exports.default = ShadowLayerController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvU2hhZG93TGF5ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQXFCQztRQWxCRyxrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixZQUFNLEdBQWEsSUFBSSxDQUFDOztJQWU1QixDQUFDO0lBWkcsc0NBQU0sR0FBTjtRQUNJLGtCQUFrQjtRQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzFDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQscUVBQXFFO1FBQ3JFLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUNuQyxDQUFDO0lBakJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0RBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDSTtJQU5QLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBcUJ6QztJQUFELDRCQUFDO0NBckJELEFBcUJDLENBckJrRCxFQUFFLENBQUMsU0FBUyxHQXFCOUQ7a0JBckJvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dMYXllckNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXHJcbiAgICBzaGFkb3dDYW1lcmE6Y2MuQ2FtZXJhID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgc3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLyoqIOiuvue9ruW9seWtkCjop5LoibLlkozmlYzkuropICovXHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuUmVuZGVyVGV4dHVyZSgpO1xyXG4gICAgICAgIHRleHR1cmUuaW5pdFdpdGhTaXplKGNjLnZpc2libGVSZWN0LndpZHRoLCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93Q2FtZXJhLnRhcmdldFRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIC8vIHRleHR1cmVbJ19wcmVtdWx0aXBseUFscGhhJ10gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lLnNyY0JsZW5kRmFjdG9yID0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlLnNldFN0YXRlKGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLmNvbG9yPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLm9wYWNpdHkgPSAxMDA7XHJcbiAgICB9XHJcbn1cclxuIl19