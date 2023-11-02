
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/ccIntersection.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '23610RKHSVPp7YUZOd5FJeH', 'ccIntersection');
// framework/extend/ccIntersection.ts

/**
 * 求线段相交的交点坐标
 * */
cc.Intersection.pLineIntersect = function (a, b, c, d, retP) {
    if ((a.x === b.x && a.y === b.y) || (c.x === d.x && c.y === d.y)) {
        return false;
    }
    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if (area_abc * area_abd >= 0) {
        return false;
    }
    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
        return false;
    }
    //计算交点坐标
    var t = area_cda / (area_abd - area_abc);
    var dx = t * (b.x - a.x), dy = t * (b.y - a.y);
    retP.x = a.x + dx;
    retP.y = a.y + dy;
    return true;
};
/**
 * 求线段与圆之间的交点坐标
 * */
cc.Intersection.pLineCircle = function (point1, point2, circle, out) {
    var t;
    var dx = point2.x - point1.x;
    var dy = point2.y - point1.y;
    var a = dx * dx + dy * dy;
    var b = 2 * (dx * (point1.x - circle.position.x) + dy * (point1.y - circle.position.y));
    var c = (point1.x - circle.position.x) * (point1.x - circle.position.x) + (point1.y - circle.position.y) * (point1.y - circle.position.y) - circle.radius * circle.radius;
    var determinate = b * b - 4 * a * c;
    if ((a <= 0.0000001) || (determinate < -0.0000001)) {
        // No real solutions.
        return false;
    }
    if (determinate < 0.0000001 && determinate > -0.0000001) {
        // One solution.
        t = -b / (2 * a);
        out.push(cc.v2(point1.x + t * dx, point1.y + t * dy));
        return true;
    }
    // Two solutions.
    t = ((-b + Math.sqrt(determinate)) / (2 * a));
    out.push(cc.v2(point1.x + t * dx, point1.y + t * dy));
    t = ((-b - Math.sqrt(determinate)) / (2 * a));
    out.push(cc.v2(point1.x + t * dx, point1.y + t * dy));
    return true;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL2NjSW50ZXJzZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztLQUVLO0FBQ0wsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFTLEVBQUMsQ0FBUyxFQUFDLENBQVMsRUFBQyxDQUFTLEVBQUUsSUFBWTtJQUM1RixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzlELE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsZUFBZTtJQUNmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckUsZUFBZTtJQUNmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckUsNENBQTRDO0lBQzVDLElBQUssUUFBUSxHQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUc7UUFDeEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxlQUFlO0lBQ2YsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxlQUFlO0lBQ2YsNENBQTRDO0lBQzVDLElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFFO0lBQy9DLElBQU0sUUFBUSxHQUFHLFFBQVEsSUFBSSxDQUFDLEVBQUc7UUFDN0IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUUsUUFBUSxHQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQzFDLElBQUksRUFBRSxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixFQUFFLEdBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGOztLQUVLO0FBQ0wsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsVUFBVSxNQUFjLEVBQUUsTUFBYyxFQUFFLE1BQTBDLEVBQUUsR0FBa0I7SUFDbEksSUFBSSxDQUFDLENBQUM7SUFFTixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0IsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRTdCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBRTFLLElBQUksV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUNsRDtRQUNJLHFCQUFxQjtRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksV0FBVyxHQUFHLFNBQVMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxTQUFTLEVBQ3ZEO1FBQ0ksZ0JBQWdCO1FBQ2hCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELGlCQUFpQjtJQUNqQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0RCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIOaxgue6v+auteebuOS6pOeahOS6pOeCueWdkOagh1xyXG4gKiAqL1xyXG5jYy5JbnRlcnNlY3Rpb24ucExpbmVJbnRlcnNlY3QgPSBmdW5jdGlvbiAoYTpjYy5WZWMyLGI6Y2MuVmVjMixjOmNjLlZlYzIsZDpjYy5WZWMyLCByZXRQOmNjLlZlYzIpIHtcclxuICAgIGlmICgoYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkpIHx8IChjLnggPT09IGQueCAmJiBjLnkgPT09IGQueSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyDkuInop5LlvaJhYmMg6Z2i56ev55qEMuWAjVxyXG4gICAgdmFyIGFyZWFfYWJjID0gKGEueCAtIGMueCkgKiAoYi55IC0gYy55KSAtIChhLnkgLSBjLnkpICogKGIueCAtIGMueCk7XHJcblxyXG4gICAgLy8g5LiJ6KeS5b2iYWJkIOmdouenr+eahDLlgI1cclxuICAgIHZhciBhcmVhX2FiZCA9IChhLnggLSBkLngpICogKGIueSAtIGQueSkgLSAoYS55IC0gZC55KSAqIChiLnggLSBkLngpO1xyXG5cclxuICAgIC8vIOmdouenr+espuWPt+ebuOWQjOWImeS4pOeCueWcqOe6v+auteWQjOS+pyzkuI3nm7jkuqQgKOWvueeCueWcqOe6v+auteS4iueahOaDheWGtSzmnKzkvovlvZPkvZzkuI3nm7jkuqTlpITnkIYpO1xyXG4gICAgaWYgKCBhcmVhX2FiYyphcmVhX2FiZD49MCApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiJ6KeS5b2iY2RhIOmdouenr+eahDLlgI1cclxuICAgIHZhciBhcmVhX2NkYSA9IChjLnggLSBhLngpICogKGQueSAtIGEueSkgLSAoYy55IC0gYS55KSAqIChkLnggLSBhLngpO1xyXG4gICAgLy8g5LiJ6KeS5b2iY2RiIOmdouenr+eahDLlgI1cclxuICAgIC8vIOazqOaEjzog6L+Z6YeM5pyJ5LiA5Liq5bCP5LyY5YyWLuS4jemcgOimgeWGjeeUqOWFrOW8j+iuoeeul+mdouenryzogIzmmK/pgJrov4flt7Lnn6XnmoTkuInkuKrpnaLnp6/liqDlh4/lvpflh7ouXHJcbiAgICB2YXIgYXJlYV9jZGIgPSBhcmVhX2NkYSArIGFyZWFfYWJjIC0gYXJlYV9hYmQgO1xyXG4gICAgaWYgKCAgYXJlYV9jZGEgKiBhcmVhX2NkYiA+PSAwICkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+S6pOeCueWdkOagh1xyXG4gICAgdmFyIHQgPSBhcmVhX2NkYSAvICggYXJlYV9hYmQtIGFyZWFfYWJjICk7XHJcbiAgICB2YXIgZHg9IHQqKGIueCAtIGEueCksXHJcbiAgICAgICAgZHk9IHQqKGIueSAtIGEueSk7XHJcbiAgICByZXRQLnggPSBhLnggKyBkeDtcclxuICAgIHJldFAueSA9IGEueSArIGR5O1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICog5rGC57q/5q615LiO5ZyG5LmL6Ze055qE5Lqk54K55Z2Q5qCHXHJcbiAqICovXHJcbmNjLkludGVyc2VjdGlvbi5wTGluZUNpcmNsZSA9IGZ1bmN0aW9uIChwb2ludDE6Y2MuVmVjMiwgcG9pbnQyOmNjLlZlYzIsIGNpcmNsZTp7cG9zaXRpb246IGNjLlZlYzIsIHJhZGl1czogbnVtYmVyfSwgb3V0OkFycmF5PGNjLlZlYzI+KTpib29sZWFuIHtcclxuICAgIGxldCB0O1xyXG5cclxuICAgIGxldCBkeCA9IHBvaW50Mi54IC0gcG9pbnQxLng7XHJcbiAgICBsZXQgZHkgPSBwb2ludDIueSAtIHBvaW50MS55O1xyXG5cclxuICAgIGxldCBhID0gZHggKiBkeCArIGR5ICogZHk7XHJcbiAgICBsZXQgYiA9IDIgKiAoZHggKiAocG9pbnQxLnggLSBjaXJjbGUucG9zaXRpb24ueCkgKyBkeSAqIChwb2ludDEueSAtIGNpcmNsZS5wb3NpdGlvbi55KSk7XHJcbiAgICBsZXQgYyA9IChwb2ludDEueCAtIGNpcmNsZS5wb3NpdGlvbi54KSAqIChwb2ludDEueCAtIGNpcmNsZS5wb3NpdGlvbi54KSArIChwb2ludDEueSAtIGNpcmNsZS5wb3NpdGlvbi55KSAqIChwb2ludDEueSAtIGNpcmNsZS5wb3NpdGlvbi55KSAtIGNpcmNsZS5yYWRpdXMgKiBjaXJjbGUucmFkaXVzO1xyXG5cclxuICAgIGxldCBkZXRlcm1pbmF0ZSA9IGIgKiBiIC0gNCAqIGEgKiBjO1xyXG4gICAgaWYgKChhIDw9IDAuMDAwMDAwMSkgfHwgKGRldGVybWluYXRlIDwgLTAuMDAwMDAwMSkpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gTm8gcmVhbCBzb2x1dGlvbnMuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRldGVybWluYXRlIDwgMC4wMDAwMDAxICYmIGRldGVybWluYXRlID4gLTAuMDAwMDAwMSlcclxuICAgIHtcclxuICAgICAgICAvLyBPbmUgc29sdXRpb24uXHJcbiAgICAgICAgdCA9IC1iIC8gKDIgKiBhKTtcclxuICAgICAgICBvdXQucHVzaChjYy52Mihwb2ludDEueCArIHQgKiBkeCwgcG9pbnQxLnkgKyB0ICogZHkpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUd28gc29sdXRpb25zLlxyXG4gICAgdCA9ICgoLWIgKyBNYXRoLnNxcnQoZGV0ZXJtaW5hdGUpKSAvICgyICogYSkpO1xyXG4gICAgb3V0LnB1c2goY2MudjIocG9pbnQxLnggKyB0ICogZHgsIHBvaW50MS55ICsgdCAqIGR5KSk7XHJcbiAgICB0ID0gKCgtYiAtIE1hdGguc3FydChkZXRlcm1pbmF0ZSkpIC8gKDIgKiBhKSk7XHJcbiAgICBvdXQucHVzaChjYy52Mihwb2ludDEueCArIHQgKiBkeCwgcG9pbnQxLnkgKyB0ICogZHkpKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG4iXX0=