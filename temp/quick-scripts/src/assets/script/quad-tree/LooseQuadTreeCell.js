"use strict";
cc._RF.push(module, '87e35DEagBNP5N9xxZ6MiIk', 'LooseQuadTreeCell');
// script/quad-tree/LooseQuadTreeCell.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LooseQuadTree_1 = require("./LooseQuadTree");
var LooseQuadTreeCell = /** @class */ (function () {
    function LooseQuadTreeCell(level, index, bounds, children) {
        var _this = this;
        this.level = 0;
        this.index = 0;
        this.bounds = null;
        this.looseBounds = null;
        this.parent = null;
        /** 这里是根据索引来访问的，所以不能链表结构 */
        this.children = null;
        /** 这里可优化成链表，移除方便 */
        this._objects = [];
        /** 子节点对象的数量 */
        this._objectCount = 0;
        this.level = level;
        this.index = index;
        this.bounds = bounds;
        this.looseBounds = cc.rect(bounds.xMin - bounds.width / 2, bounds.yMin - bounds.height / 2, bounds.width * 2, bounds.height * 2);
        this.children = children;
        this.children.forEach(function (value) { return value.parent = _this; });
    }
    Object.defineProperty(LooseQuadTreeCell.prototype, "objectCount", {
        get: function () {
            return this._objectCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LooseQuadTreeCell.prototype, "objects", {
        get: function () {
            return this._objects;
        },
        enumerable: false,
        configurable: true
    });
    LooseQuadTreeCell.prototype.removeObject = function (region) {
        var index = this._objects.indexOf(region);
        if (index < 0) {
            console.error("remove not found cell==> level=" + region.level + " index=" + region.index);
            return;
        }
        this._objects.splice(index, 1);
        region.index = -1;
        region.level = -1;
        var cell = this;
        while (cell) {
            cell._objectCount--;
            cell = cell.parent;
        }
    };
    LooseQuadTreeCell.prototype.addObject = function (region) {
        this._objects.push(region);
        region.index = this.index;
        region.level = this.level;
        var cell = this;
        while (cell) {
            cell._objectCount++;
            cell = cell.parent;
        }
    };
    LooseQuadTreeCell.prototype.retrieve = function (rect, out) {
        //从根结点往下找
        if (this._objectCount > 0 && this.looseBounds.intersects(rect)) {
            LooseQuadTree_1.default.retrieveCount++;
            if (this._objects.length > 0) {
                out.push.apply(out, this._objects);
            }
            this.children.forEach(function (value) {
                if (value._objectCount > 0) {
                    value.retrieve(rect, out);
                }
            });
        }
    };
    return LooseQuadTreeCell;
}());
exports.default = LooseQuadTreeCell;

cc._RF.pop();