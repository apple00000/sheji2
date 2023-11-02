"use strict";
cc._RF.push(module, '5b330tmq8ZCMJpbBrEz7uMo', 'LooseQuadTree');
// script/quad-tree/LooseQuadTree.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LooseQuadTreeCell_1 = require("./LooseQuadTreeCell");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/** 松散四叉树的主要思想：
 *  可以考虑到在相交测试中，扩大包围盒总是保守的（这里的保守是指近似化不会做成错误结果）。如果把四叉／八叉树的正方／立方空间当作包围盒，那么扩大这些包围盒以容纳刚好在边界上相交的物体也是保守的
 *  1.将cell的区域放大一倍，保证分层后，每个物体必定被某个cell包含
 *  2.松散后，碰撞判断也是根节点往往下，判断testRect与cell的相交，如果相交则判断与其子节点相交的判断，否则就过滤掉其cell。
 *  3.放大测试区域不会有错误的结果，同时也解决了在特殊位置上的物体被放到父节点的问题。
 * **/
/** 以节点中心为正中心，以节点最大宽高为边长 */
var LooseQuadTree = /** @class */ (function (_super) {
    __extends(LooseQuadTree, _super);
    function LooseQuadTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minSideLength = 10;
        /** 按层划分cell，放到不同的网格中 */
        _this._grids = [];
        _this._graphic = null;
        return _this;
    }
    LooseQuadTree_1 = LooseQuadTree;
    /** 计算总层数，构造每一次的网格Grid，提前构造网络，虽然内存消耗大，但不用运行时动态创建和销毁cell，提高运行效率。 */
    LooseQuadTree.prototype.init = function () {
        /** 构造世界矩形 */
        var maxSide = Math.max(this.node.width, this.node.height);
        /** 计算层数 */
        var maxLevel = Math.ceil(Math.log2(maxSide / this.minSideLength));
        /** 构建所有网格 */
        var minX = -maxSide / 2;
        var maxY = maxSide / 2;
        /** 有maxLevel层 */
        var sideCount = Math.pow(2, maxLevel);
        for (var i = maxLevel - 1; i >= 0; i--) {
            this._grids[i] = [];
            sideCount = sideCount / 2;
            var cellLength = maxSide / sideCount;
            /** 构建每一层的网格 */
            for (var r = 0; r < sideCount; r++) {
                for (var c = 0; c < sideCount; c++) {
                    var rect = cc.rect(minX + cellLength * c, maxY - (r + 1) * cellLength, cellLength, cellLength);
                    var quads = [];
                    /** 构建四元子树 */
                    if (i < maxLevel - 1) {
                        /** 取两行两列 */
                        var nextSideCount = sideCount * 2;
                        for (var j = 0; j < 2; j++) {
                            for (var k = 0; k < 2; k++) {
                                quads.push(this._grids[i + 1][(r * 2 + j) * nextSideCount + c * 2 + k]);
                            }
                        }
                    }
                    var index = r * sideCount + c;
                    this._grids[i][index] = new LooseQuadTreeCell_1.default(i, index, rect, quads);
                }
            }
        }
    };
    LooseQuadTree.prototype.updateCell = function (cell) {
        var _this = this;
        if (cell.objectCount > 0) {
            cell.objects.forEach(function (value) { return _this.updateRegion(value); });
            cell.children.forEach(function (value) {
                if (value.objectCount > 0) {
                    _this.updateCell(value);
                }
            });
        }
    };
    /** 更新所有元素 */
    LooseQuadTree.prototype.updateAll = function () {
        this.updateCell(this._grids[0][0]);
    };
    /** 指定更新某一个元素 */
    LooseQuadTree.prototype.updateRegion = function (region) {
        if (region.level < 0 || region.index < 0) {
            console.error("remove fail==>level=" + region.level + " index=" + region.index);
            return false;
        }
        var rect = region.aabb();
        var root = this._grids[0][0];
        var level = region.level;
        //重新计算index
        var cellLength = this._grids[level][0].bounds.width;
        var sideCount = Math.pow(2, level);
        var col = Math.floor((rect.center.x - root.bounds.xMin) / cellLength);
        var row = Math.floor((root.bounds.yMax - rect.center.y) / cellLength);
        var index = row * sideCount + col;
        // console.log(index, region.index, index === region.index);
        if (index != region.index) {
            this._grids[region.level][region.index].removeObject(region);
            var cell = this._grids[level][index];
            cell.addObject(region);
        }
        return true;
    };
    LooseQuadTree.prototype.insert = function (region) {
        if (region.index >= 0 || region.level >= 0) {
            console.error("已经分配空间level=" + region.level + " index=" + region.index);
            return false;
        }
        var rect = region.aabb();
        var maxSide = Math.max(rect.width, rect.height);
        var root = this._grids[0][0];
        var rootSide = root.bounds.width;
        if (maxSide > rootSide) {
            console.error("region rect too big, can not insert it");
            return null;
        }
        var level = Math.floor(Math.log2(rootSide / maxSide));
        if (level > this._grids.length - 1) {
            level = this._grids.length - 1;
            console.warn('Maybe this item is too small, but we can add it to max level.', rootSide, maxSide, level, this._grids.length, region.node.name);
        }
        var cellLength = this._grids[level][0].bounds.width;
        var sideCount = Math.pow(2, level);
        var col = Math.floor((rect.center.x - root.bounds.xMin) / cellLength);
        var row = Math.floor((root.bounds.yMax - rect.center.y) / cellLength);
        var index = row * sideCount + col;
        // console.log("level="+level+" index="+index);
        var cell = this._grids[level][index];
        cell.addObject(region);
        // this._graphic.rect(rect.xMin, rect.yMin, rect.width, rect.height);
        // this._graphic.stroke();
        return true;
    };
    LooseQuadTree.prototype.remove = function (region) {
        if (region.level < 0 || region.index < 0) {
            console.error("remove fail==>level=" + region.level + " index=" + region.index);
            return false;
        }
        this._grids[region.level][region.index].removeObject(region);
        return true;
    };
    LooseQuadTree.prototype.retrieve = function (rect, out) {
        LooseQuadTree_1.retrieveCount = 0;
        this._grids[0][0].retrieve(rect, out);
        // console.log("LooseQuadTree==>", LooseQuadTree.retrieveCount, out);
    };
    LooseQuadTree.prototype.test = function (rect) {
        var graphic = this._graphic;
        graphic.clear();
        var arr = [];
        this.retrieve(rect, arr);
        arr.forEach(function (value) {
            var aabb = value.aabb();
            graphic.rect(aabb.xMin, aabb.yMin, aabb.width, aabb.height);
        });
        graphic.stroke();
    };
    LooseQuadTree.prototype.onLoad = function () {
        this.init();
        // console.log(this._grids);
        var node = new cc.Node();
        this.node.addChild(node);
        var graphic = node.addComponent(cc.Graphics);
        graphic.strokeColor = cc.Color.RED;
        graphic.lineWidth = 20;
        // this._grids.forEach(value => {
        //     value.forEach(value1 => {
        //         graphic.rect(value1.looseBounds.xMin, value1.looseBounds.yMin, value1.looseBounds.width, value1.looseBounds.height);
        //     });
        // });
        // graphic.stroke();
        // graphic.fill();
        node.zIndex = 100;
        this._graphic = graphic;
    };
    var LooseQuadTree_1;
    LooseQuadTree.retrieveCount = 0;
    __decorate([
        property({ tooltip: "最小物体边长" })
    ], LooseQuadTree.prototype, "minSideLength", void 0);
    LooseQuadTree = LooseQuadTree_1 = __decorate([
        ccclass
    ], LooseQuadTree);
    return LooseQuadTree;
}(cc.Component));
exports.default = LooseQuadTree;

cc._RF.pop();