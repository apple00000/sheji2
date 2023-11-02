
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/Toast.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL1RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVcxQztJQUFBO0lBb0VBLENBQUM7SUFsRUcsa0NBQWtDO0lBQ25CLG1CQUFhLEdBQTVCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN0QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNwQixDQUFDLENBQUM7UUFFSCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRWMsb0JBQWMsR0FBN0IsVUFBOEIs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QUMsQ0FBQztJQUMxRyxDQUFDO0lBRWEsYUFBTyxHQUFyQixVQUFzQixNQUFrQjtRQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFuRWdCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FvRXpCO0lBQUQsWUFBQztDQXBFRCxBQW9FQyxJQUFBO2tCQXBFb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmludGVyZmFjZSBUb2FzdENvbmZpZyB7XHJcbiAgICB4PzpudW1iZXI7XHJcbiAgICB5PzpudW1iZXI7XHJcbiAgICBmb250U2l6ZT86bnVtYmVyO1xyXG4gICAgc3RyaW5nOnN0cmluZztcclxuICAgIGdyb3VwPzpzdHJpbmc7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvYXN0IHtcclxuXHJcbiAgICAvKiog6aOY5Yqo5pi+56S65pWI5p6cKOmAguWQiOaYvuekumxhYmVs5o+Q56S677yM57G75Ly8dG9hc3QpICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBmbHV0dGVyQWN0aW9uKCk6IGNjLkZpbml0ZVRpbWVBY3Rpb24ge1xyXG4gICAgICAgIGxldCBtb3ZlU2VxID0gY2Muc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBjYy5tb3ZlQnkoMC42LCBjYy52MigwLCAwKSksXHJcbiAgICAgICAgICAgIGNjLm1vdmVCeSgxLCBjYy52MigwLCA4NCkpXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGxldCBzY2FsZVNlcSA9IGNjLnNlcXVlbmNlKFtcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjEsIDEuMiksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4xLCAwLjgpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMSwgMSksXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGxldCBhbHBoYVNlcSA9IGNjLnNlcXVlbmNlKFtcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuOCwgMjU1KSxcclxuICAgICAgICAgICAgY2MuZmFkZVRvKDAuOCwgMCksXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGxldCBzcGF3biA9IGNjLnNwYXduKG1vdmVTZXEsIGFscGhhU2VxKTtcclxuICAgICAgICByZXR1cm4gc3Bhd247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUmljaFRleHQoY29uZmlnOlRvYXN0Q29uZmlnKXtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiT25seU9uZVRvYXN0Tm9kZVwiO1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICBpZiAoIW5vZGUpe1xyXG4gICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobm9kZSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgbm9kZS5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIG5vZGUuZ3JvdXAgPSBjb25maWcuZ3JvdXAgfHwgXCJ1aVwiO1xyXG4gICAgICAgIG5vZGUueCAgPSBjb25maWcueCB8fCBjYy52aXNpYmxlUmVjdC5jZW50ZXIueDtcclxuICAgICAgICBub2RlLnkgPSBjb25maWcueSB8fCBjYy52aXNpYmxlUmVjdC5jZW50ZXIueTtcclxuICAgICAgICBsZXQgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRDtcclxuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGNjLmxvYWRlci5nZXRSZXMoXCJmcmFtZV9meTAwNVwiLCBjYy5TcHJpdGVGcmFtZSk7XHJcblxyXG4gICAgICAgIGxldCByaWNoVGV4dE5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiUmljaFRleHROb2RlXCIpO1xyXG4gICAgICAgIGlmICghcmljaFRleHROb2RlKXtcclxuICAgICAgICAgICAgcmljaFRleHROb2RlID0gbmV3IGNjLk5vZGUoXCJSaWNoVGV4dE5vZGVcIik7XHJcbiAgICAgICAgICAgIG5vZGUuYWRkQ2hpbGQocmljaFRleHROb2RlKTtcclxuICAgICAgICAgICAgcmljaFRleHROb2RlLmFkZENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByaWNoVGV4dCA9IHJpY2hUZXh0Tm9kZS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgIHJpY2hUZXh0LmZvbnRTaXplID0gY29uZmlnLmZvbnRTaXplIHx8IDM4O1xyXG4gICAgICAgIHJpY2hUZXh0LnN0cmluZyA9IGNvbmZpZy5zdHJpbmc7XHJcbiAgICAgICAgcmljaFRleHQubGluZUhlaWdodCA9IHJpY2hUZXh0LmZvbnRTaXplICsgMTA7XHJcbiAgICAgICAgbm9kZS5zZXRDb250ZW50U2l6ZShyaWNoVGV4dC5ub2RlLndpZHRoICsgMzAsIHJpY2hUZXh0Lm5vZGUuaGVpZ2h0ICsgMjApO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZsdXR0ZXIoY29uZmlnOlRvYXN0Q29uZmlnKXtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuY3JlYXRlUmljaFRleHQoY29uZmlnKTtcclxuICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNiksIHRoaXMuZmx1dHRlckFjdGlvbigpLCBjYy5jYWxsRnVuYygoKT0+bm9kZS5kZXN0cm95KCkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmYWRlT3V0KGNvbmZpZzpUb2FzdENvbmZpZyl7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmNyZWF0ZVJpY2hUZXh0KGNvbmZpZyk7XHJcbiAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjgpLCBjYy5mYWRlVG8oMiwgODApLCBjYy5jYWxsRnVuYygoKT0+bm9kZS5kZXN0cm95KCkpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19