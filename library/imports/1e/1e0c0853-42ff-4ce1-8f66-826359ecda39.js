"use strict";
cc._RF.push(module, '1e0c0hTQv9M4Y9mgmNZ7No5', 'SpacePartition');
// framework/extend/SpacePartition.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpacePartition = /** @class */ (function () {
    function SpacePartition() {
    }
    SpacePartition_1 = SpacePartition;
    SpacePartition.randomSpace = function (partitions, width, height) {
        var arr = partitions.filter(function (value) { return value.width > width && value.height > height; });
        if (arr.length === 0)
            return null;
        var index = Math.floor(Math.random() * arr.length) % arr.length;
        var partition = arr[index];
        var x = partition.xMin + Math.random() * (partition.width - width);
        var y = partition.yMin + Math.random() * (partition.height - height);
        var result = cc.rect(x, y, width, height);
        /** 跟它相交的要重新划分 */
        this.partitionRect(partitions, result);
        return result;
    };
    SpacePartition.randomSpaces = function (partitions, width, height, count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            var rect = this.randomSpace(partitions, width, height);
            if (rect) {
                result.push(rect);
            }
            else {
                break;
            }
        }
        return result;
    };
    SpacePartition.partitionRect = function (out, rect, minWidth, minHeight) {
        if (minWidth === void 0) { minWidth = 0; }
        if (minHeight === void 0) { minHeight = 0; }
        var list = out.splice(0);
        list.forEach(function (value) {
            var intersection = new cc.Rect();
            value.intersection(intersection, rect);
            if (intersection.width > 0 && intersection.height > 0) {
                SpacePartition_1.partitionRects(out, value, [rect], minWidth, minHeight);
            }
            else {
                out.push(value);
            }
        });
    };
    /** 根据相交拆分矩形 */
    SpacePartition.partitionRects = function (out, rect, intersects, minWidth, minHeight) {
        if (rect.width < minWidth || rect.height < minHeight) {
            return;
        }
        if (intersects.length == 0) {
            //干净的空间
            out.push(rect);
            return;
        }
        var cutRect = intersects.pop();
        //左
        if (rect.xMin < cutRect.xMin) {
            var leftRect_1 = cc.rect(rect.xMin, rect.yMin, cutRect.xMin - rect.xMin, rect.height);
            this.partitionRects(out, leftRect_1, intersects.filter(function (value) {
                var intersection = new cc.Rect();
                value.intersection(intersection, leftRect_1);
                return intersection.width > 0 && intersection.height > 0;
            }), minWidth, minHeight);
        }
        //右
        if (rect.xMax > cutRect.xMax) {
            var rightRect_1 = cc.rect(cutRect.xMax, rect.yMin, rect.xMax - cutRect.xMax, rect.height);
            this.partitionRects(out, rightRect_1, intersects.filter(function (value) {
                var intersection = new cc.Rect();
                value.intersection(intersection, rightRect_1);
                return intersection.width > 0 && intersection.height > 0;
            }), minWidth, minHeight);
        }
        //上
        if (rect.yMax > cutRect.yMax) {
            var upRect_1 = cc.rect(rect.xMin, cutRect.yMax, rect.width, rect.yMax - cutRect.yMax);
            this.partitionRects(out, upRect_1, intersects.filter(function (value) {
                var intersection = new cc.Rect();
                value.intersection(intersection, upRect_1);
                return intersection.width > 0 && intersection.height > 0;
            }), minWidth, minHeight);
        }
        //下
        if (rect.yMin < cutRect.yMin) {
            var downRect_1 = cc.rect(rect.xMin, rect.yMin, rect.width, cutRect.yMin - rect.yMin);
            this.partitionRects(out, downRect_1, intersects.filter(function (value) {
                var intersection = new cc.Rect();
                value.intersection(intersection, downRect_1);
                return intersection.width > 0 && intersection.height > 0;
            }), minWidth, minHeight);
        }
    };
    var SpacePartition_1;
    SpacePartition = SpacePartition_1 = __decorate([
        ccclass
    ], SpacePartition);
    return SpacePartition;
}());
exports.default = SpacePartition;

cc._RF.pop();