"use strict";
cc._RF.push(module, '909590vl5dAK5p6FmzQ2dSn', 'Toast');
// framework/extend/Toast.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Toast = /** @class */ (function () {
    function Toast() {
    }
    /** 飘动显示效果(适合显示label提示，类似toast) */
    Toast.flutterAction = function () {
        var moveSeq = cc.sequence([
            cc.moveBy(0.6, cc.v2(0, 0)),
            cc.moveBy(1, cc.v2(0, 84))
        ]);
        var scaleSeq = cc.sequence([
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.1, 1),
        ]);
        var alphaSeq = cc.sequence([
            cc.fadeTo(0.8, 255),
            cc.fadeTo(0.8, 0),
        ]);
        var spawn = cc.spawn(moveSeq, alphaSeq);
        return spawn;
    };
    Toast.createRichText = function (config) {
        var name = "OnlyOneToastNode";
        var node = cc.director.getScene().getChildByName(name);
        if (!node) {
            node = new cc.Node(name);
            cc.director.getScene().addChild(node, 100);
        }
        node.scale = 1;
        node.rotation = 0;
        node.opacity = 255;
        node.group = config.group || "ui";
        node.x = config.x || cc.visibleRect.center.x;
        node.y = config.y || cc.visibleRect.center.y;
        var sprite = node.addComponent(cc.Sprite);
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = cc.loader.getRes("frame_fy005", cc.SpriteFrame);
        var richTextNode = node.getChildByName("RichTextNode");
        if (!richTextNode) {
            richTextNode = new cc.Node("RichTextNode");
            node.addChild(richTextNode);
            richTextNode.addComponent(cc.RichText);
        }
        var richText = richTextNode.getComponent(cc.RichText);
        richText.fontSize = config.fontSize || 38;
        richText.string = config.string;
        richText.lineHeight = richText.fontSize + 10;
        node.setContentSize(richText.node.width + 30, richText.node.height + 20);
        return node;
    };
    Toast.flutter = function (config) {
        var node = this.createRichText(config);
        node.stopAllActions();
        node.runAction(cc.sequence(cc.delayTime(0.6), this.flutterAction(), cc.callFunc(function () { return node.destroy(); })));
    };
    Toast.fadeOut = function (config) {
        var node = this.createRichText(config);
        node.stopAllActions();
        node.runAction(cc.sequence(cc.delayTime(0.8), cc.fadeTo(2, 80), cc.callFunc(function () { return node.destroy(); })));
    };
    Toast = __decorate([
        ccclass
    ], Toast);
    return Toast;
}());
exports.default = Toast;

cc._RF.pop();