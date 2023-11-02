
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/quad-tree/LooseQuadTreeCell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcXVhZC10cmVlL0xvb3NlUXVhZFRyZWVDZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFHNUM7SUFFSSwyQkFBWSxLQUFZLEVBQUUsS0FBWSxFQUFFLE1BQWMsRUFBRSxRQUFpQztRQUF6RixpQkFPQztRQUVELFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFXLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixXQUFNLEdBQXFCLElBQUksQ0FBQztRQUNoQywyQkFBMkI7UUFDM0IsYUFBUSxHQUE0QixJQUFJLENBQUM7UUFDekMsb0JBQW9CO1FBQ1osYUFBUSxHQUFxQixFQUFFLENBQUM7UUFFeEMsZUFBZTtRQUNQLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBbkJyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckgsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFnQkQsc0JBQUksMENBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFPO2FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsTUFBaUI7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLFNBQVMsR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckYsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsT0FBTyxJQUFJLEVBQUM7WUFDUixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBR0QscUNBQVMsR0FBVCxVQUFVLE1BQWlCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxFQUFDO1lBQ1IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELG9DQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsR0FBcUI7UUFDeEMsU0FBUztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDM0QsdUJBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDekIsR0FBRyxDQUFDLElBQUksT0FBUixHQUFHLEVBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTthQUM5QjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDdkIsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBQztvQkFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzdCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBM0VBLEFBMkVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFBQkJSZWdpb24gZnJvbSBcIi4vQUFCQlJlZ2lvblwiO1xyXG5pbXBvcnQgTG9vc2VRdWFkVHJlZSBmcm9tIFwiLi9Mb29zZVF1YWRUcmVlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vc2VRdWFkVHJlZUNlbGwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxldmVsOm51bWJlciwgaW5kZXg6bnVtYmVyLCBib3VuZHM6Y2MuUmVjdCwgY2hpbGRyZW46QXJyYXk8TG9vc2VRdWFkVHJlZUNlbGw+KXtcclxuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuYm91bmRzID0gYm91bmRzO1xyXG4gICAgICAgIHRoaXMubG9vc2VCb3VuZHMgPSBjYy5yZWN0KGJvdW5kcy54TWluLWJvdW5kcy53aWR0aC8yLCBib3VuZHMueU1pbi1ib3VuZHMuaGVpZ2h0LzIsIGJvdW5kcy53aWR0aCoyLCBib3VuZHMuaGVpZ2h0KjIpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2godmFsdWUgPT4gdmFsdWUucGFyZW50ID0gdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV2ZWwgPSAwO1xyXG4gICAgaW5kZXggPSAwO1xyXG4gICAgYm91bmRzOmNjLlJlY3QgPSBudWxsO1xyXG4gICAgbG9vc2VCb3VuZHM6Y2MuUmVjdCA9IG51bGw7XHJcbiAgICBwYXJlbnQ6TG9vc2VRdWFkVHJlZUNlbGwgPSBudWxsO1xyXG4gICAgLyoqIOi/memHjOaYr+agueaNrue0ouW8leadpeiuv+mXrueahO+8jOaJgOS7peS4jeiDvemTvuihqOe7k+aehCAqL1xyXG4gICAgY2hpbGRyZW46QXJyYXk8TG9vc2VRdWFkVHJlZUNlbGw+ID0gbnVsbDtcclxuICAgIC8qKiDov5nph4zlj6/kvJjljJbmiJDpk77ooajvvIznp7vpmaTmlrnkvr8gKi9cclxuICAgIHByaXZhdGUgX29iamVjdHM6QXJyYXk8QUFCQlJlZ2lvbj4gPSBbXTtcclxuXHJcbiAgICAvKiog5a2Q6IqC54K55a+56LGh55qE5pWw6YePICovXHJcbiAgICBwcml2YXRlIF9vYmplY3RDb3VudCA9IDA7XHJcblxyXG5cclxuICAgIGdldCBvYmplY3RDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3RDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb2JqZWN0cygpOiBBcnJheTxBQUJCUmVnaW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlT2JqZWN0KHJlZ2lvbjpBQUJCUmVnaW9uKXtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9vYmplY3RzLmluZGV4T2YocmVnaW9uKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlbW92ZSBub3QgZm91bmQgY2VsbD09PiBsZXZlbD1cIityZWdpb24ubGV2ZWwrXCIgaW5kZXg9XCIrcmVnaW9uLmluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vYmplY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgcmVnaW9uLmluZGV4ID0gLTE7XHJcbiAgICAgICAgcmVnaW9uLmxldmVsID0gLTE7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzO1xyXG4gICAgICAgIHdoaWxlIChjZWxsKXtcclxuICAgICAgICAgICAgY2VsbC5fb2JqZWN0Q291bnQtLTtcclxuICAgICAgICAgICAgY2VsbCA9IGNlbGwucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkT2JqZWN0KHJlZ2lvbjpBQUJCUmVnaW9uKXtcclxuICAgICAgICB0aGlzLl9vYmplY3RzLnB1c2gocmVnaW9uKTtcclxuICAgICAgICByZWdpb24uaW5kZXggPSB0aGlzLmluZGV4O1xyXG4gICAgICAgIHJlZ2lvbi5sZXZlbCA9IHRoaXMubGV2ZWw7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzO1xyXG4gICAgICAgIHdoaWxlIChjZWxsKXtcclxuICAgICAgICAgICAgY2VsbC5fb2JqZWN0Q291bnQrKztcclxuICAgICAgICAgICAgY2VsbCA9IGNlbGwucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXRyaWV2ZShyZWN0OmNjLlJlY3QsIG91dDpBcnJheTxBQUJCUmVnaW9uPil7XHJcbiAgICAgICAgLy/ku47moLnnu5PngrnlvoDkuIvmib5cclxuICAgICAgICBpZiAodGhpcy5fb2JqZWN0Q291bnQgPiAwICYmIHRoaXMubG9vc2VCb3VuZHMuaW50ZXJzZWN0cyhyZWN0KSl7XHJcbiAgICAgICAgICAgIExvb3NlUXVhZFRyZWUucmV0cmlldmVDb3VudCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb2JqZWN0cy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIG91dC5wdXNoKC4uLnRoaXMuX29iamVjdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuX29iamVjdENvdW50ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucmV0cmlldmUocmVjdCwgb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==