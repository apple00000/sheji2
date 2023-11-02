"use strict";
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