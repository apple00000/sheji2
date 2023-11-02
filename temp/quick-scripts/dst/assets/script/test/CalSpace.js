
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/test/CalSpace.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '311cdp+TxpBKIBw3eGfH3XZ', 'CalSpace');
// script/test/CalSpace.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SpacePartition_1 = require("../../framework/extend/SpacePartition");
var Enemy_1 = require("../app/entities/enemy/Enemy");
var LooseQuadTree_1 = require("../quad-tree/LooseQuadTree");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CalSpace = /** @class */ (function (_super) {
    __extends(CalSpace, _super);
    function CalSpace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityNode = null;
        _this.entityNode2 = null;
        _this.enemyLayer = null;
        _this.graphics = null;
        _this.touchNode = null;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this._rect = cc.rect(0, 0, 600, 800);
        return _this;
        // update (dt) {}
    }
    CalSpace.prototype.onTouchMove = function (event) {
        this.touchNode.position = this.touchNode.position.add(event.getDelta());
        this.getComponent(LooseQuadTree_1.default).test(cc.rect(this.touchNode.x - this.touchNode.width / 2, this.touchNode.y - this.touchNode.height / 2, this.touchNode.width, this.touchNode.height));
    };
    CalSpace.prototype.start = function () {
        var _this = this;
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //获取矩形内的敌人
        this._rect.width = this.node.width;
        this._rect.height = this.node.height;
        this._rect.origin = cc.v2(-this._rect.width / 2, -this._rect.height / 2);
        this.graphics.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height);
        // let list:Array<cc.Rect> = [];
        // this.enemyLayer.children.forEach(value => {
        //     let space = value.getComponent(EnemyAttributes).space;
        //     let rect = cc.rect();
        //     rect.width = rect.height = space.getRadius()*2;
        //     rect.origin = space.getWorldPos().sub(cc.v2(rect.width/2, rect.height/2));
        //     let intersection = new cc.Rect();
        //     this._rect.intersection(intersection, rect);
        //     if (intersection.width > 0 && intersection.height > 0){
        //         list.push(rect);
        //     }
        // });
        // console.log(list, "list");
        // //画list
        // list.forEach(value => this.graphics.rect(value.xMin, value.yMin, value.width, value.height));
        // //开始划分含有子矩形的矩形
        // let arr = this.partitionRect(this._rect, list);
        // console.log(arr, "arr");
        // //画arr
        // arr.forEach(value => this.graphics.rect(value.xMin, value.yMin, value.width, value.height));
        var startTime = new Date().getTime();
        var count = 1;
        var partitions = [this._rect];
        var radius = this.entityNode.getComponent(Enemy_1.default).spaceCircleCollider.radius;
        var arr = SpacePartition_1.default.randomSpaces(partitions, radius * 2, radius * 2, count);
        console.log("生成数量:" + arr.length + " 生成时间:" + (new Date().getTime() - startTime));
        // console.log(partitions, "====>");
        console.log(arr, "===>");
        arr.forEach(function (value) {
            var enmeyNode = cc.instantiate(_this.entityNode);
            enmeyNode.position = value.center;
            _this.enemyLayer.addChild(enmeyNode);
            _this.getComponent(LooseQuadTree_1.default).insert(enmeyNode.getComponent(Enemy_1.default).enemyAABB);
        });
        // partitions = this.randomEntity(partitions);
        // partitions.forEach(value => this.graphics.rect(value.xMin, value.yMin, value.width, value.height));
        this.schedule(function () {
            if (count < 10) {
                var startTime_1 = new Date().getTime();
                var rect = SpacePartition_1.default.randomSpace(partitions, radius * 2, radius * 2);
                if (rect) {
                    var enmeyNode = cc.instantiate(_this.entityNode2);
                    enmeyNode.position = rect.center;
                    _this.enemyLayer.addChild(enmeyNode);
                    _this.getComponent(LooseQuadTree_1.default).insert(enmeyNode.getComponent(Enemy_1.default).enemyAABB);
                    count++;
                    console.log("生成数量:" + count + " 生成时间:" + (new Date().getTime() - startTime_1));
                }
            }
        }, 0.11);
        this.graphics.stroke();
    };
    __decorate([
        property(cc.Node)
    ], CalSpace.prototype, "entityNode", void 0);
    __decorate([
        property(cc.Node)
    ], CalSpace.prototype, "entityNode2", void 0);
    __decorate([
        property(cc.Node)
    ], CalSpace.prototype, "enemyLayer", void 0);
    __decorate([
        property(cc.Graphics)
    ], CalSpace.prototype, "graphics", void 0);
    __decorate([
        property(cc.Node)
    ], CalSpace.prototype, "touchNode", void 0);
    CalSpace = __decorate([
        ccclass
    ], CalSpace);
    return CalSpace;
}(cc.Component));
exports.default = CalSpace;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdGVzdC9DYWxTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQW1FO0FBQ25FLHFEQUFnRDtBQUNoRCw0REFBdUQ7QUFFakQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE2RkM7UUExRkcsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0IsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFlLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLHdCQUF3QjtRQUV4QixlQUFlO1FBRWYsV0FBSyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7O1FBdUV4QyxpQkFBaUI7SUFDckIsQ0FBQztJQXRFRyw4QkFBVyxHQUFYLFVBQVksS0FBSztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFB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Q087SUFmUixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBNkY1QjtJQUFELGVBQUM7Q0E3RkQsQUE2RkMsQ0E3RnFDLEVBQUUsQ0FBQyxTQUFTLEdBNkZqRDtrQkE3Rm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFNwYWNlUGFydGl0aW9uIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXh0ZW5kL1NwYWNlUGFydGl0aW9uXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi4vYXBwL2VudGl0aWVzL2VuZW15L0VuZW15XCI7XHJcbmltcG9ydCBMb29zZVF1YWRUcmVlIGZyb20gXCIuLi9xdWFkLXRyZWUvTG9vc2VRdWFkVHJlZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxTcGFjZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlbnRpdHlOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZW50aXR5Tm9kZTI6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlbmVteUxheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5HcmFwaGljcylcclxuICAgIGdyYXBoaWNzOmNjLkdyYXBoaWNzID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRvdWNoTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBfcmVjdDpjYy5SZWN0ID0gY2MucmVjdCgwLCAwLCA2MDAsIDgwMCk7XHJcblxyXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpe1xyXG4gICAgICAgIHRoaXMudG91Y2hOb2RlLnBvc2l0aW9uID0gdGhpcy50b3VjaE5vZGUucG9zaXRpb24uYWRkKGV2ZW50LmdldERlbHRhKCkpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KExvb3NlUXVhZFRyZWUpLnRlc3QoY2MucmVjdCh0aGlzLnRvdWNoTm9kZS54LXRoaXMudG91Y2hOb2RlLndpZHRoLzIsIHRoaXMudG91Y2hOb2RlLnktdGhpcy50b3VjaE5vZGUuaGVpZ2h0LzIsIHRoaXMudG91Y2hOb2RlLndpZHRoLCB0aGlzLnRvdWNoTm9kZS5oZWlnaHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgLy/ojrflj5bnn6nlvaLlhoXnmoTmlYzkurpcclxuICAgICAgICB0aGlzLl9yZWN0LndpZHRoID0gdGhpcy5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3JlY3QuaGVpZ2h0ID0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9yZWN0Lm9yaWdpbiA9IGNjLnYyKC10aGlzLl9yZWN0LndpZHRoLzIsIC10aGlzLl9yZWN0LmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLnJlY3QodGhpcy5fcmVjdC54LCB0aGlzLl9yZWN0LnksIHRoaXMuX3JlY3Qud2lkdGgsIHRoaXMuX3JlY3QuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGxpc3Q6QXJyYXk8Y2MuUmVjdD4gPSBbXTtcclxuICAgICAgICAvLyB0aGlzLmVuZW15TGF5ZXIuY2hpbGRyZW4uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxldCBzcGFjZSA9IHZhbHVlLmdldENvbXBvbmVudChFbmVteUF0dHJpYnV0ZXMpLnNwYWNlO1xyXG4gICAgICAgIC8vICAgICBsZXQgcmVjdCA9IGNjLnJlY3QoKTtcclxuICAgICAgICAvLyAgICAgcmVjdC53aWR0aCA9IHJlY3QuaGVpZ2h0ID0gc3BhY2UuZ2V0UmFkaXVzKCkqMjtcclxuICAgICAgICAvLyAgICAgcmVjdC5vcmlnaW4gPSBzcGFjZS5nZXRXb3JsZFBvcygpLnN1YihjYy52MihyZWN0LndpZHRoLzIsIHJlY3QuaGVpZ2h0LzIpKTtcclxuICAgICAgICAvLyAgICAgbGV0IGludGVyc2VjdGlvbiA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3JlY3QuaW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgcmVjdCk7XHJcbiAgICAgICAgLy8gICAgIGlmIChpbnRlcnNlY3Rpb24ud2lkdGggPiAwICYmIGludGVyc2VjdGlvbi5oZWlnaHQgPiAwKXtcclxuICAgICAgICAvLyAgICAgICAgIGxpc3QucHVzaChyZWN0KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3QsIFwibGlzdFwiKTtcclxuICAgICAgICAvLyAvL+eUu2xpc3RcclxuICAgICAgICAvLyBsaXN0LmZvckVhY2godmFsdWUgPT4gdGhpcy5ncmFwaGljcy5yZWN0KHZhbHVlLnhNaW4sIHZhbHVlLnlNaW4sIHZhbHVlLndpZHRoLCB2YWx1ZS5oZWlnaHQpKTtcclxuICAgICAgICAvLyAvL+W8gOWni+WIkuWIhuWQq+acieWtkOefqeW9oueahOefqeW9olxyXG4gICAgICAgIC8vIGxldCBhcnIgPSB0aGlzLnBhcnRpdGlvblJlY3QodGhpcy5fcmVjdCwgbGlzdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJyLCBcImFyclwiKTtcclxuICAgICAgICAvLyAvL+eUu2FyclxyXG4gICAgICAgIC8vIGFyci5mb3JFYWNoKHZhbHVlID0+IHRoaXMuZ3JhcGhpY3MucmVjdCh2YWx1ZS54TWluLCB2YWx1ZS55TWluLCB2YWx1ZS53aWR0aCwgdmFsdWUuaGVpZ2h0KSk7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDE7XHJcbiAgICAgICAgbGV0IHBhcnRpdGlvbnMgPSBbdGhpcy5fcmVjdF07XHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuZW50aXR5Tm9kZS5nZXRDb21wb25lbnQoRW5lbXkpLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzO1xyXG4gICAgICAgIGxldCBhcnIgPSBTcGFjZVBhcnRpdGlvbi5yYW5kb21TcGFjZXMocGFydGl0aW9ucywgcmFkaXVzKjIsIHJhZGl1cyoyLCBjb3VudCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnlJ/miJDmlbDph486XCIrYXJyLmxlbmd0aCtcIiDnlJ/miJDml7bpl7Q6XCIrKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFydGl0aW9ucywgXCI9PT09PlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcnIsIFwiPT09PlwiKTtcclxuICAgICAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbm1leU5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVudGl0eU5vZGUpO1xyXG4gICAgICAgICAgICBlbm1leU5vZGUucG9zaXRpb24gPSB2YWx1ZS5jZW50ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlMYXllci5hZGRDaGlsZChlbm1leU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoTG9vc2VRdWFkVHJlZSkuaW5zZXJ0KGVubWV5Tm9kZS5nZXRDb21wb25lbnQoRW5lbXkpLmVuZW15QUFCQik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcGFydGl0aW9ucyA9IHRoaXMucmFuZG9tRW50aXR5KHBhcnRpdGlvbnMpO1xyXG4gICAgICAgIC8vIHBhcnRpdGlvbnMuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLmdyYXBoaWNzLnJlY3QodmFsdWUueE1pbiwgdmFsdWUueU1pbiwgdmFsdWUud2lkdGgsIHZhbHVlLmhlaWdodCkpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgaWYgKGNvdW50IDwgMTApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBTcGFjZVBhcnRpdGlvbi5yYW5kb21TcGFjZShwYXJ0aXRpb25zLCByYWRpdXMqMiwgcmFkaXVzKjIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbm1leU5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVudGl0eU5vZGUyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbm1leU5vZGUucG9zaXRpb24gPSByZWN0LmNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15TGF5ZXIuYWRkQ2hpbGQoZW5tZXlOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoTG9vc2VRdWFkVHJlZSkuaW5zZXJ0KGVubWV5Tm9kZS5nZXRDb21wb25lbnQoRW5lbXkpLmVuZW15QUFCQik7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUn+aIkOaVsOmHjzpcIitjb3VudCtcIiDnlJ/miJDml7bpl7Q6XCIrKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAwLjExKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==