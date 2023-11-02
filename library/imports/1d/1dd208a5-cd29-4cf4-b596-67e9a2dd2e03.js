"use strict";
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