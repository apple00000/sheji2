
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameOverLucky.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43341ZZ4pdLh4MK2doeqynQ', 'GameOverLucky');
// script/app/game/GameOverLucky.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameOverLucky = /** @class */ (function (_super) {
    __extends(GameOverLucky, _super);
    function GameOverLucky() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.templateLabel = null;
        _this.mask = null;
        return _this;
    }
    GameOverLucky.prototype.run = function (num, callback) {
        var min = 3;
        var offsetY = 0;
        var height = this.mask.node.height / 2 + this.templateLabel.node.height / 2;
        // let height = this.mask.node.height;
        for (var i = 0; i < 1; i++) {
            for (var j = 10; j >= min; j--) {
                var node = cc.instantiate(this.templateLabel.node);
                node.getComponent(cc.Label).string = "x" + j;
                node.x = 0;
                node.y = offsetY;
                offsetY += height;
                this.contentNode.addChild(node);
            }
        }
        for (var j = 10; j >= num; j--) {
            var node = cc.instantiate(this.templateLabel.node);
            node.getComponent(cc.Label).string = "x" + j;
            node.x = 0;
            node.y = offsetY;
            offsetY += height;
            this.contentNode.addChild(node);
        }
        this.templateLabel.node.active = false;
        offsetY -= height;
        var duration = offsetY / 1250;
        console.log(duration, offsetY, this.mask.node.height);
        this.contentNode.runAction(cc.sequence(cc.moveTo(duration, cc.v2(0, -offsetY)).easing(cc.easeSineInOut()), cc.delayTime(1), cc.callFunc(function () {
            console.log("finish.");
            callback();
        })));
    };
    __decorate([
        property(cc.Node)
    ], GameOverLucky.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameOverLucky.prototype, "templateLabel", void 0);
    __decorate([
        property(cc.Mask)
    ], GameOverLucky.prototype, "mask", void 0);
    GameOverLucky = __decorate([
        ccclass
    ], GameOverLucky);
    return GameOverLucky;
}(cc.Component));
exports.default = GameOverLucky;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZU92ZXJMdWNreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUEyQ0M7UUF4Q0csaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsVUFBSSxHQUFZLElBQUksQ0FBQzs7SUFrQ3pCLENBQUM7SUFoQ0csMkJBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxRQUFpQjtRQUM5QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQ3hFLHNDQUFzQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQUksQ0FBRyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxJQUFJLE1BQU0sQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7U0FDSjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFJLENBQUcsQ0FBQztZQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxNQUFNLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFDbEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNwSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXZDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1k7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDRztJQVRKLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EyQ2pDO0lBQUQsb0JBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQzBDLEVBQUUsQ0FBQyxTQUFTLEdBMkN0RDtrQkEzQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3Zlckx1Y2t5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0ZW1wbGF0ZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk1hc2spXHJcbiAgICBtYXNrOiBjYy5NYXNrID0gbnVsbDtcclxuXHJcbiAgICBydW4obnVtOiBudW1iZXIsIGNhbGxiYWNrOigpPT52b2lkKSB7XHJcbiAgICAgICAgbGV0IG1pbiA9IDM7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSAwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLm1hc2subm9kZS5oZWlnaHQvMiArIHRoaXMudGVtcGxhdGVMYWJlbC5ub2RlLmhlaWdodC8yO1xyXG4gICAgICAgIC8vIGxldCBoZWlnaHQgPSB0aGlzLm1hc2subm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDEwOyBqID49IG1pbjsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGVtcGxhdGVMYWJlbC5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgeCR7an1gO1xyXG4gICAgICAgICAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICAgICAgICAgIG5vZGUueSA9IG9mZnNldFk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZICs9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDEwOyBqID49IG51bTsgai0tKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZW1wbGF0ZUxhYmVsLm5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYHgke2p9YDtcclxuICAgICAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICAgICAgbm9kZS55ID0gb2Zmc2V0WTtcclxuICAgICAgICAgICAgb2Zmc2V0WSArPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG9mZnNldFkgLT0gaGVpZ2h0O1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IG9mZnNldFkgLyAxMjUwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGR1cmF0aW9uLCBvZmZzZXRZLCB0aGlzLm1hc2subm9kZS5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbyhkdXJhdGlvbiwgY2MudjIoMCwgLW9mZnNldFkpKS5lYXNpbmcoY2MuZWFzZVNpbmVJbk91dCgpKSwgY2MuZGVsYXlUaW1lKDEpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmlzaC5cIik7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=