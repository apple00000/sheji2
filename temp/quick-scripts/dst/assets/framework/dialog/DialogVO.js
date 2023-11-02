
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/dialog/DialogVO.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1dd20ilzSlM9LWWZ+mi3S4D', 'DialogVO');
// framework/dialog/DialogVO.ts

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
exports.DialogVO = void 0;
var DialogVO = /** @class */ (function () {
    function DialogVO() {
        this.title = { string: "提示" };
        this.content = { string: "您还没有设置内容" };
        this.closeButtonNode = null;
        this.closeButtonSrpite = null;
        this.layoutOfLeftRight = null;
        /** 左边按钮 */
        this.leftButtonNode = { active: false };
        this.leftButtonSprite = null;
        this.layoutOfLeftButton = null;
        this.iconNodeOfLeftButton = { active: false };
        this.iconSpriteOfLeftButton = null;
        this.textNodeOfLeftButton = null;
        this.textOfLeftButton = { string: "取消" };
        /** 右边按钮 **/
        this.rightButtonNode = null;
        this.rightButtonSprite = null;
        this.layoutOfRightButton = null;
        this.iconNodeOfRightButton = { active: false };
        this.iconSpriteOfRightButton = null;
        this.textNodeOfRightButton = null;
        this.textOfRightButton = { string: "确认" };
    }
    DialogVO.colorString = function (str, color) {
        var colorValue = color || "##7c4800";
        return "<color=#7c4800>" + str + "</c>";
    };
    return DialogVO;
}());
exports.DialogVO = DialogVO;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZGlhbG9nL0RpYWxvZ1ZPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOzs7QUFFbkc7SUFBQTtRQUNJLFVBQUssR0FBVyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQztRQUU5QixZQUFPLEdBQVcsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLENBQUM7UUFFdEMsb0JBQWUsR0FBVSxJQUFJLENBQUM7UUFFOUIsc0JBQWlCLEdBQVUsSUFBSSxDQUFDO1FBRWhDLHNCQUFpQixHQUFVLElBQUksQ0FBQztRQUVoQyxXQUFXO1FBQ1gsbUJBQWMsR0FBVSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQztRQUV2QyxxQkFBZ0IsR0FBVSxJQUFJLENBQUM7UUFFL0IsdUJBQWtCLEdBQVUsSUFBSSxDQUFDO1FBRWpDLHlCQUFvQixHQUFVLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxDQUFDO1FBRTdDLDJCQUFzQixHQUFVLElBQUksQ0FBQztRQUVyQyx5QkFBb0IsR0FBVSxJQUFJLENBQUM7UUFFbkMscUJBQWdCLEdBQVUsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLENBQUM7UUFFeEMsWUFBWTtRQUNaLG9CQUFlLEdBQVUsSUFBSSxDQUFDO1FBRTlCLHNCQUFpQixHQUFVLElBQUksQ0FBQztRQUVoQyx3QkFBbUIsR0FBVSxJQUFJLENBQUM7UUFFbEMsMEJBQXFCLEdBQVUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLENBQUM7UUFFOUMsNEJBQXVCLEdBQVUsSUFBSSxDQUFDO1FBRXRDLDBCQUFxQixHQUFVLElBQUksQ0FBQztRQUVwQyxzQkFBaUIsR0FBVSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQztJQVE3QyxDQUFDO0lBTFUsb0JBQVcsR0FBbEIsVUFBbUIsR0FBVSxFQUFFLEtBQWE7UUFDeEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxJQUFJLFVBQVUsQ0FBQztRQUNyQyxPQUFPLG9CQUFrQixHQUFHLFNBQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUwsZUFBQztBQUFELENBL0NBLEFBK0NDLElBQUE7QUEvQ1ksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dWTyB7XHJcbiAgICB0aXRsZTogT2JqZWN0ID0ge3N0cmluZzpcIuaPkOekulwifTtcclxuXHJcbiAgICBjb250ZW50OiBPYmplY3QgPSB7c3RyaW5nOlwi5oKo6L+Y5rKh5pyJ6K6+572u5YaF5a65XCJ9O1xyXG5cclxuICAgIGNsb3NlQnV0dG9uTm9kZTpPYmplY3QgPSBudWxsO1xyXG5cclxuICAgIGNsb3NlQnV0dG9uU3JwaXRlOk9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgbGF5b3V0T2ZMZWZ0UmlnaHQ6T2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICAvKiog5bem6L655oyJ6ZKuICovXHJcbiAgICBsZWZ0QnV0dG9uTm9kZTpPYmplY3QgPSB7YWN0aXZlOmZhbHNlfTtcclxuXHJcbiAgICBsZWZ0QnV0dG9uU3ByaXRlOk9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgbGF5b3V0T2ZMZWZ0QnV0dG9uOk9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgaWNvbk5vZGVPZkxlZnRCdXR0b246T2JqZWN0ID0ge2FjdGl2ZTpmYWxzZX07XHJcblxyXG4gICAgaWNvblNwcml0ZU9mTGVmdEJ1dHRvbjpPYmplY3QgPSBudWxsO1xyXG5cclxuICAgIHRleHROb2RlT2ZMZWZ0QnV0dG9uOk9iamVjdCA9IG51bGw7XHJcblxyXG4gICAgdGV4dE9mTGVmdEJ1dHRvbjpPYmplY3QgPSB7c3RyaW5nOlwi5Y+W5raIXCJ9O1xyXG5cclxuICAgIC8qKiDlj7PovrnmjInpkq4gKiovXHJcbiAgICByaWdodEJ1dHRvbk5vZGU6T2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICByaWdodEJ1dHRvblNwcml0ZTpPYmplY3QgPSBudWxsO1xyXG5cclxuICAgIGxheW91dE9mUmlnaHRCdXR0b246T2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICBpY29uTm9kZU9mUmlnaHRCdXR0b246T2JqZWN0ID0ge2FjdGl2ZTpmYWxzZX07XHJcblxyXG4gICAgaWNvblNwcml0ZU9mUmlnaHRCdXR0b246T2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICB0ZXh0Tm9kZU9mUmlnaHRCdXR0b246T2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICB0ZXh0T2ZSaWdodEJ1dHRvbjpPYmplY3QgPSB7c3RyaW5nOlwi56Gu6K6kXCJ9O1xyXG5cclxuXHJcbiAgICBzdGF0aWMgY29sb3JTdHJpbmcoc3RyOnN0cmluZywgY29sb3I/OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIGxldCBjb2xvclZhbHVlID0gY29sb3IgfHwgXCIjIzdjNDgwMFwiO1xyXG4gICAgICAgIHJldHVybiBgPGNvbG9yPSM3YzQ4MDA+JHtzdHJ9PC9jPmA7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==