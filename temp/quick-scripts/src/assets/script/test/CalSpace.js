"use strict";
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