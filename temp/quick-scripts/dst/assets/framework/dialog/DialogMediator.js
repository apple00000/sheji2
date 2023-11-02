
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/dialog/DialogMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab009p+inpJkbGNSmjoh5ux', 'DialogMediator');
// framework/dialog/DialogMediator.ts

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
var View_1 = require("../component/View");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogMediator = /** @class */ (function (_super) {
    __extends(DialogMediator, _super);
    function DialogMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.content = null;
        _this.closeButtonNode = null;
        _this.closeButtonSrpite = null;
        _this.layoutOfLeftRight = null;
        /** 左边按钮 */
        _this.leftButtonNode = null;
        _this.leftButtonSprite = null;
        _this.layoutOfLeftButton = null;
        _this.iconNodeOfLeftButton = null;
        _this.iconSpriteOfLeftButton = null;
        _this.textNodeOfLeftButton = null;
        _this.textOfLeftButton = null;
        /** 右边按钮 **/
        _this.rightButtonNode = null;
        _this.rightButtonSprite = null;
        _this.layoutOfRightButton = null;
        _this.iconNodeOfRightButton = null;
        _this.iconSpriteOfRightButton = null;
        _this.textNodeOfRightButton = null;
        _this.textOfRightButton = null;
        return _this;
    }
    DialogMediator.prototype.onClickLeft = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "left");
        this.node.destroy();
    };
    DialogMediator.prototype.onClickRight = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "right");
        this.node.destroy();
    };
    DialogMediator.prototype.onClickClose = function (event, data) {
        View_1.default.executeClickSoundCommand(event, data);
        this.node.emit("clickButton", "close");
        this.node.destroy();
    };
    DialogMediator.dialogPrefabName = null;
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "title", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "content", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "closeButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "closeButtonSrpite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfLeftRight", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "leftButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "leftButtonSprite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "iconNodeOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "iconSpriteOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "textNodeOfLeftButton", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "textOfLeftButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "rightButtonNode", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "rightButtonSprite", void 0);
    __decorate([
        property({ type: cc.Layout })
    ], DialogMediator.prototype, "layoutOfRightButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "iconNodeOfRightButton", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], DialogMediator.prototype, "iconSpriteOfRightButton", void 0);
    __decorate([
        property({ type: cc.Node })
    ], DialogMediator.prototype, "textNodeOfRightButton", void 0);
    __decorate([
        property({ type: cc.RichText })
    ], DialogMediator.prototype, "textOfRightButton", void 0);
    DialogMediator = __decorate([
        ccclass
    ], DialogMediator);
    return DialogMediator;
}(cc.Component));
exports.default = DialogMediator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZGlhbG9nL0RpYWxvZ01lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUduRywwQ0FBcUM7QUFFL0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFpRkM7UUE1RUcsV0FBSyxHQUFnQixJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFnQixJQUFJLENBQUM7UUFHNUIscUJBQWUsR0FBVyxJQUFJLENBQUM7UUFHL0IsdUJBQWlCLEdBQWEsSUFBSSxDQUFDO1FBR25DLHVCQUFpQixHQUFhLElBQUksQ0FBQztRQUVuQyxXQUFXO1FBRVgsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFHOUIsc0JBQWdCLEdBQWEsSUFBSSxDQUFDO1FBR2xDLHdCQUFrQixHQUFhLElBQUksQ0FBQztRQUdwQywwQkFBb0IsR0FBVyxJQUFJLENBQUM7UUFHcEMsNEJBQXNCLEdBQWEsSUFBSSxDQUFDO1FBR3hDLDBCQUFvQixHQUFXLElBQUksQ0FBQztRQUdwQyxzQkFBZ0IsR0FBZSxJQUFJLENBQUM7UUFFcEMsWUFBWTtRQUVaLHFCQUFlLEdBQVcsSUFBSSxDQUFDO1FBRy9CLHVCQUFpQixHQUFhLElBQUksQ0FBQztRQUduQyx5QkFBbUIsR0FBYSxJQUFJLENBQUM7UUFHckMsMkJBQXFCLEdBQVcsSUFBSSxDQUFDO1FBR3JDLDZCQUF1QixHQUFhLElBQUksQ0FBQztRQUd6QywyQkFBcUIsR0FBVyxJQUFJLENBQUM7UUFHckMsdUJBQWlCLEdBQWUsSUFBSSxDQUFDOztJQW9CekMsQ0FBQztJQWxCRyxvQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFFLElBQUk7UUFDbkIsY0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLEtBQUssRUFBRSxJQUFJO1FBQ3BCLGNBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxLQUFLLEVBQUUsSUFBSTtRQUNwQixjQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE3RU0sK0JBQWdCLEdBQVUsSUFBSSxDQUFDO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsQ0FBQztpREFDSDtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsUUFBUSxFQUFDLENBQUM7bURBQ0Q7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDOzJEQUNNO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs2REFDUTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7NkRBQ1E7SUFJbkM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDOzBEQUNLO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs0REFDTztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7OERBQ1M7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDO2dFQUNXO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQztrRUFDYTtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUM7Z0VBQ1c7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxDQUFDOzREQUNPO0lBSXBDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsQ0FBQzsyREFDTTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7NkRBQ1E7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDOytEQUNVO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsQ0FBQztpRUFDWTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7bUVBQ2M7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDO2lFQUNZO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsQ0FBQzs2REFDUTtJQTdEcEIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWlGbEM7SUFBRCxxQkFBQztDQWpGRCxBQWlGQyxDQWpGMkMsRUFBRSxDQUFDLFNBQVMsR0FpRnZEO2tCQWpGb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuXHJcbmltcG9ydCBWaWV3IGZyb20gXCIuLi9jb21wb25lbnQvVmlld1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2dNZWRpYXRvciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGljIGRpYWxvZ1ByZWZhYk5hbWU6c3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUmljaFRleHR9KVxyXG4gICAgdGl0bGU6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUmljaFRleHR9KVxyXG4gICAgY29udGVudDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlfSlcclxuICAgIGNsb3NlQnV0dG9uTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlfSlcclxuICAgIGNsb3NlQnV0dG9uU3JwaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxheW91dH0pXHJcbiAgICBsYXlvdXRPZkxlZnRSaWdodDpjYy5MYXlvdXQgPSBudWxsO1xyXG5cclxuICAgIC8qKiDlt6bovrnmjInpkq4gKi9cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlfSlcclxuICAgIGxlZnRCdXR0b25Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGV9KVxyXG4gICAgbGVmdEJ1dHRvblNwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYXlvdXR9KVxyXG4gICAgbGF5b3V0T2ZMZWZ0QnV0dG9uOmNjLkxheW91dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGV9KVxyXG4gICAgaWNvbk5vZGVPZkxlZnRCdXR0b246Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZX0pXHJcbiAgICBpY29uU3ByaXRlT2ZMZWZ0QnV0dG9uOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGV9KVxyXG4gICAgdGV4dE5vZGVPZkxlZnRCdXR0b246Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlJpY2hUZXh0fSlcclxuICAgIHRleHRPZkxlZnRCdXR0b246Y2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIC8qKiDlj7PovrnmjInpkq4gKiovXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZX0pXHJcbiAgICByaWdodEJ1dHRvbk5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZX0pXHJcbiAgICByaWdodEJ1dHRvblNwcml0ZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYXlvdXR9KVxyXG4gICAgbGF5b3V0T2ZSaWdodEJ1dHRvbjpjYy5MYXlvdXQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlfSlcclxuICAgIGljb25Ob2RlT2ZSaWdodEJ1dHRvbjpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlfSlcclxuICAgIGljb25TcHJpdGVPZlJpZ2h0QnV0dG9uOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGV9KVxyXG4gICAgdGV4dE5vZGVPZlJpZ2h0QnV0dG9uOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5SaWNoVGV4dH0pXHJcbiAgICB0ZXh0T2ZSaWdodEJ1dHRvbjpjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgb25DbGlja0xlZnQoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIFZpZXcuZXhlY3V0ZUNsaWNrU291bmRDb21tYW5kKGV2ZW50LCBkYXRhKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdChcImNsaWNrQnV0dG9uXCIsIFwibGVmdFwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tSaWdodChldmVudCwgZGF0YSl7XHJcbiAgICAgICAgVmlldy5leGVjdXRlQ2xpY2tTb3VuZENvbW1hbmQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFwiY2xpY2tCdXR0b25cIiwgXCJyaWdodFwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbG9zZShldmVudCwgZGF0YSl7XHJcbiAgICAgICAgVmlldy5leGVjdXRlQ2xpY2tTb3VuZENvbW1hbmQoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFwiY2xpY2tCdXR0b25cIiwgXCJjbG9zZVwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=