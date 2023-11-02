
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/SpacePartition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL1NwYWNlUGFydGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFBO0lBOEZBLENBQUM7dUJBOUZvQixjQUFjO0lBRXhCLDBCQUFXLEdBQWxCLFVBQW1CLFVBQXlCLEVBQUUsS0FBWSxFQUFFLE1BQWE7UUFDckUsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDbkYsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBQyxPQUFPLElBQUksQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0s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QyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxRQUFNLENBQUMsQ0FBQztnQkFDekMsT0FBTyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7U0FDM0I7UUFFRCxHQUFHO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUM7WUFDekIsSUFBSSxVQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUs7Z0JBQ3RELElBQUksWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqQyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFRLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7U0FDM0I7SUFDTCxDQUFDOztJQTdGZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQThGbEM7SUFBRCxxQkFBQztDQTlGRCxBQThGQyxJQUFBO2tCQTlGb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYWNlUGFydGl0aW9uICB7XHJcblxyXG4gICAgc3RhdGljIHJhbmRvbVNwYWNlKHBhcnRpdGlvbnM6QXJyYXk8Y2MuUmVjdD4sIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Y2MuUmVjdHtcclxuICAgICAgICBsZXQgYXJyID0gcGFydGl0aW9ucy5maWx0ZXIodmFsdWUgPT4gdmFsdWUud2lkdGggPiB3aWR0aCAmJiB2YWx1ZS5oZWlnaHQgPiBoZWlnaHQpO1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKXJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpJWFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHBhcnRpdGlvbiA9IGFycltpbmRleF07XHJcbiAgICAgICAgbGV0IHggPSBwYXJ0aXRpb24ueE1pbiArIE1hdGgucmFuZG9tKCkqKHBhcnRpdGlvbi53aWR0aCAtIHdpZHRoKTtcclxuICAgICAgICBsZXQgeSA9IHBhcnRpdGlvbi55TWluICsgTWF0aC5yYW5kb20oKSoocGFydGl0aW9uLmhlaWdodCAtIGhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBjYy5yZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAvKiog6Lef5a6D55u45Lqk55qE6KaB6YeN5paw5YiS5YiGICovXHJcbiAgICAgICAgdGhpcy5wYXJ0aXRpb25SZWN0KHBhcnRpdGlvbnMsIHJlc3VsdCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJhbmRvbVNwYWNlcyhwYXJ0aXRpb25zOkFycmF5PGNjLlJlY3Q+LCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGNvdW50Om51bWJlcik6QXJyYXk8Y2MuUmVjdD57XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gdGhpcy5yYW5kb21TcGFjZShwYXJ0aXRpb25zLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKHJlY3Qpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYXJ0aXRpb25SZWN0KG91dDpBcnJheTxjYy5SZWN0PiwgcmVjdDpjYy5SZWN0LCBtaW5XaWR0aDpudW1iZXIgPSAwLCBtaW5IZWlnaHQ6bnVtYmVyID0gMCl7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBvdXQuc3BsaWNlKDApO1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb24gPSBuZXcgY2MuUmVjdCgpO1xyXG4gICAgICAgICAgICB2YWx1ZS5pbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCByZWN0KTtcclxuICAgICAgICAgICAgaWYgKGludGVyc2VjdGlvbi53aWR0aCA+IDAgJiYgaW50ZXJzZWN0aW9uLmhlaWdodCA+IDApe1xyXG4gICAgICAgICAgICAgICAgU3BhY2VQYXJ0aXRpb24ucGFydGl0aW9uUmVjdHMob3V0LCB2YWx1ZSwgW3JlY3RdLCBtaW5XaWR0aCwgbWluSGVpZ2h0KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3V0LnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOagueaNruebuOS6pOaLhuWIhuefqeW9oiAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFydGl0aW9uUmVjdHMob3V0OkFycmF5PGNjLlJlY3Q+LCByZWN0OmNjLlJlY3QsIGludGVyc2VjdHM6QXJyYXk8Y2MuUmVjdD4sIG1pbldpZHRoOm51bWJlciwgbWluSGVpZ2h0Om51bWJlcil7XHJcbiAgICAgICAgaWYgKHJlY3Qud2lkdGggPCBtaW5XaWR0aCB8fCByZWN0LmhlaWdodCA8IG1pbkhlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGludGVyc2VjdHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAvL+W5suWHgOeahOepuumXtFxyXG4gICAgICAgICAgICBvdXQucHVzaChyZWN0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3V0UmVjdCA9IGludGVyc2VjdHMucG9wKCk7XHJcbiAgICAgICAgLy/lt6ZcclxuICAgICAgICBpZiAocmVjdC54TWluIDwgY3V0UmVjdC54TWluKXtcclxuICAgICAgICAgICAgbGV0IGxlZnRSZWN0ID0gY2MucmVjdChyZWN0LnhNaW4sIHJlY3QueU1pbiwgY3V0UmVjdC54TWluIC0gcmVjdC54TWluLCByZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGl0aW9uUmVjdHMob3V0LCBsZWZ0UmVjdCwgaW50ZXJzZWN0cy5maWx0ZXIodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5pbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBsZWZ0UmVjdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLndpZHRoID4gMCAmJiBpbnRlcnNlY3Rpb24uaGVpZ2h0ID4gMDtcclxuICAgICAgICAgICAgfSksIG1pbldpZHRoLCBtaW5IZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y+zXHJcbiAgICAgICAgaWYgKHJlY3QueE1heCA+IGN1dFJlY3QueE1heCl7XHJcbiAgICAgICAgICAgIGxldCByaWdodFJlY3QgPSBjYy5yZWN0KGN1dFJlY3QueE1heCwgcmVjdC55TWluLCByZWN0LnhNYXggLSBjdXRSZWN0LnhNYXgsIHJlY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aXRpb25SZWN0cyhvdXQsIHJpZ2h0UmVjdCwgaW50ZXJzZWN0cy5maWx0ZXIodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5pbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCByaWdodFJlY3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbi53aWR0aCA+IDAgJiYgaW50ZXJzZWN0aW9uLmhlaWdodCA+IDA7XHJcbiAgICAgICAgICAgIH0pLCBtaW5XaWR0aCwgbWluSGVpZ2h0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuIpcclxuICAgICAgICBpZiAocmVjdC55TWF4ID4gY3V0UmVjdC55TWF4KXtcclxuICAgICAgICAgICAgbGV0IHVwUmVjdCA9IGNjLnJlY3QocmVjdC54TWluLCBjdXRSZWN0LnlNYXgsIHJlY3Qud2lkdGgsIHJlY3QueU1heCAtIGN1dFJlY3QueU1heCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGl0aW9uUmVjdHMob3V0LCB1cFJlY3QsIGludGVyc2VjdHMuZmlsdGVyKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnRlcnNlY3Rpb24gPSBuZXcgY2MuUmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuaW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgdXBSZWN0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb24ud2lkdGggPiAwICYmIGludGVyc2VjdGlvbi5oZWlnaHQgPiAwO1xyXG4gICAgICAgICAgICB9KSwgbWluV2lkdGgsIG1pbkhlaWdodClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LiLXHJcbiAgICAgICAgaWYgKHJlY3QueU1pbiA8IGN1dFJlY3QueU1pbil7XHJcbiAgICAgICAgICAgIGxldCBkb3duUmVjdCA9IGNjLnJlY3QocmVjdC54TWluLCByZWN0LnlNaW4sIHJlY3Qud2lkdGgsIGN1dFJlY3QueU1pbiAtIHJlY3QueU1pbik7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGl0aW9uUmVjdHMob3V0LCBkb3duUmVjdCwgaW50ZXJzZWN0cy5maWx0ZXIodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5pbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBkb3duUmVjdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLndpZHRoID4gMCAmJiBpbnRlcnNlY3Rpb24uaGVpZ2h0ID4gMDtcclxuICAgICAgICAgICAgfSksIG1pbldpZHRoLCBtaW5IZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==