
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/test/TestRotation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cad22+MNstHcIlfr5+qbGo1', 'TestRotation');
// script/test/TestRotation.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.sprite = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        this.camera.targetTexture = texture;
        // texture['_premultiplyAlpha'] = true;
        this.sprite.spriteFrame = new cc.SpriteFrame(texture);
        // this.sprite.spriteFrame.srcBlendFactor = cc.macro.BlendFactor.ONE;
        // this.sprite.setState(cc.Sprite.State.GRAY);
        this.sprite.node.color = cc.Color.BLACK;
        this.sprite.node.opacity = 100;
        // this.node.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
    };
    __decorate([
        property(cc.Camera)
    ], NewClass.prototype, "camera", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "sprite", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdGVzdC9UZXN0Um90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBMEJDO1FBdkJHLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFhLElBQUksQ0FBQzs7UUFtQnhCLGlCQUFpQjtJQUNyQixDQUFDO0lBaEJHLHdCQUFLLEdBQUw7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQscUVBQXFFO1FBRXJFLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUUvQiw4REFBOEQ7SUFDbEUsQ0FBQztJQXBCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNJO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ0k7SUFOUCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBMEI1QjtJQUFELGVBQUM7Q0ExQkQsQUEwQkMsQ0ExQnFDLEVBQUUsQ0FBQyxTQUFTLEdBMEJqRDtrQkExQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkNhbWVyYSlcclxuICAgIGNhbWVyYTpjYy5DYW1lcmEgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBzcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgLy8gdGV4dHVyZVsnX3ByZW11bHRpcGx5QWxwaGEnXSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgLy8gdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlLnNldFN0YXRlKGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLmNvbG9yPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLm9wYWNpdHkgPSAxMDA7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgzLCAzNjApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=