
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/quad-tree/LooseQuadTree.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcXVhZC10cmVlL0xvb3NlUXVhZFRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUFvRDtBQUc5QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQzs7Ozs7TUFLTTtBQUNOLDJCQUEyQjtBQUczQjtJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTRLQztRQXpLRyxtQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQix3QkFBd0I7UUFDaEIsWUFBTSxHQUFvQyxFQUFFLENBQUM7UUFnSXJELGNBQVEsR0FBZSxJQUFJLENBQUM7O0lBc0NoQyxDQUFDO3NCQTVLb0IsYUFBYTtJQVE5QixrRUFBa0U7SUFDMUQsNEJBQUksR0FBWjtRQUNJLGFBQWE7UUFDYixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsV0FBVztRQUNYLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsYUFBYTtRQUNiLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFpQjtRQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMs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QUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3pCLFdBQVc7UUFDWCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDdEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDbEMsNERBQTREO1FBQzVELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQztJ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ekIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN2QixpQ0FBaUM7UUFDakMsZ0NBQWdDO1FBQ2hDLCtIQUErSDtRQUMvSCxVQUFVO1FBQ1YsTUFBTTtRQUNOLG9CQUFvQjtRQUVwQixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQzs7SUFuQ00sMkJBQWEsR0FBRyxDQUFDLENBQUM7SUFySXpCO1FBREMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxDQUFDO3dEQUNYO0lBSEYsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTRLakM7SUFBRCxvQkFBQztDQTVLRCxBQTRLQyxDQTVLMEMsRUFBRSxDQUFDLFNBQVMsR0E0S3REO2tCQTVLb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTG9vc2VRdWFkVHJlZUNlbGwgZnJvbSBcIi4vTG9vc2VRdWFkVHJlZUNlbGxcIjtcclxuaW1wb3J0IEFBQkJSZWdpb24gZnJvbSBcIi4vQUFCQlJlZ2lvblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKiog5p2+5pWj5Zub5Y+J5qCR55qE5Li76KaB5oCd5oOz77yaXHJcbiAqICDlj6/ku6XogIPomZHliLDlnKjnm7jkuqTmtYvor5XkuK3vvIzmianlpKfljIXlm7Tnm5LmgLvmmK/kv53lrojnmoTvvIjov5nph4znmoTkv53lrojmmK/mjIfov5HkvLzljJbkuI3kvJrlgZrmiJDplJnor6/nu5PmnpzvvInjgILlpoLmnpzmiorlm5vlj4nvvI/lhavlj4nmoJHnmoTmraPmlrnvvI/nq4vmlrnnqbrpl7TlvZPkvZzljIXlm7Tnm5LvvIzpgqPkuYjmianlpKfov5nkupvljIXlm7Tnm5Lku6XlrrnnurPliJrlpb3lnKjovrnnlYzkuIrnm7jkuqTnmoTniankvZPkuZ/mmK/kv53lrojnmoRcclxuICogIDEu5bCGY2VsbOeahOWMuuWfn+aUvuWkp+S4gOWAje+8jOS/neivgeWIhuWxguWQju+8jOavj+S4queJqeS9k+W/heWumuiiq+afkOS4qmNlbGzljIXlkKtcclxuICogIDIu5p2+5pWj5ZCO77yM56Kw5pKe5Yik5pat5Lmf5piv5qC56IqC54K55b6A5b6A5LiL77yM5Yik5patdGVzdFJlY3TkuI5jZWxs55qE55u45Lqk77yM5aaC5p6c55u45Lqk5YiZ5Yik5pat5LiO5YW25a2Q6IqC54K555u45Lqk55qE5Yik5pat77yM5ZCm5YiZ5bCx6L+H5ruk5o6J5YW2Y2VsbOOAglxyXG4gKiAgMy7mlL7lpKfmtYvor5XljLrln5/kuI3kvJrmnInplJnor6/nmoTnu5PmnpzvvIzlkIzml7bkuZ/op6PlhrPkuoblnKjnibnmrorkvY3nva7kuIrnmoTniankvZPooqvmlL7liLDniLboioLngrnnmoTpl67popjjgIJcclxuICogKiovXHJcbi8qKiDku6XoioLngrnkuK3lv4PkuLrmraPkuK3lv4PvvIzku6XoioLngrnmnIDlpKflrr3pq5jkuLrovrnplb8gKi9cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3NlUXVhZFRyZWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dG9vbHRpcDogXCLmnIDlsI/niankvZPovrnplb9cIn0pXHJcbiAgICBtaW5TaWRlTGVuZ3RoID0gMTA7XHJcblxyXG4gICAgLyoqIOaMieWxguWIkuWIhmNlbGzvvIzmlL7liLDkuI3lkIznmoTnvZHmoLzkuK0gKi9cclxuICAgIHByaXZhdGUgX2dyaWRzOiBBcnJheTxBcnJheTxMb29zZVF1YWRUcmVlQ2VsbD4+ID0gW107XHJcblxyXG4gICAgLyoqIOiuoeeul+aAu+WxguaVsO+8jOaehOmAoOavj+S4gOasoeeahOe9keagvEdyaWTvvIzmj5DliY3mnoTpgKDnvZHnu5zvvIzomb3nhLblhoXlrZjmtojogJflpKfvvIzkvYbkuI3nlKjov5DooYzml7bliqjmgIHliJvlu7rlkozplIDmr4FjZWxs77yM5o+Q6auY6L+Q6KGM5pWI546H44CCICovXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgLyoqIOaehOmAoOS4lueVjOefqeW9oiAqL1xyXG4gICAgICAgIGxldCBtYXhTaWRlID0gTWF0aC5tYXgodGhpcy5ub2RlLndpZHRoLCB0aGlzLm5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAvKiog6K6h566X5bGC5pWwICovXHJcbiAgICAgICAgbGV0IG1heExldmVsID0gTWF0aC5jZWlsKE1hdGgubG9nMihtYXhTaWRlIC8gdGhpcy5taW5TaWRlTGVuZ3RoKSk7XHJcbiAgICAgICAgLyoqIOaehOW7uuaJgOaciee9keagvCAqL1xyXG4gICAgICAgIGxldCBtaW5YID0gLW1heFNpZGUgLyAyO1xyXG4gICAgICAgIGxldCBtYXhZID0gbWF4U2lkZS8yO1xyXG4gICAgICAgIC8qKiDmnIltYXhMZXZlbOWxgiAqL1xyXG4gICAgICAgIGxldCBzaWRlQ291bnQgPSBNYXRoLnBvdygyLCBtYXhMZXZlbCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1heExldmVsLTE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyaWRzW2ldID0gW107XHJcbiAgICAgICAgICAgIHNpZGVDb3VudCA9IHNpZGVDb3VudC8yO1xyXG4gICAgICAgICAgICBsZXQgY2VsbExlbmd0aCA9IG1heFNpZGUgLyBzaWRlQ291bnQ7XHJcbiAgICAgICAgICAgIC8qKiDmnoTlu7rmr4/kuIDlsYLnmoTnvZHmoLwgKi9cclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBzaWRlQ291bnQ7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBzaWRlQ291bnQ7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWN0ID0gY2MucmVjdChtaW5YICsgY2VsbExlbmd0aCAqIGMsIG1heFkgLSAocisxKSAqIGNlbGxMZW5ndGgsIGNlbGxMZW5ndGgsIGNlbGxMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBxdWFkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKiDmnoTlu7rlm5vlhYPlrZDmoJEgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IG1heExldmVsLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiog5Y+W5Lik6KGM5Lik5YiXICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0U2lkZUNvdW50ID0gc2lkZUNvdW50KjI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajwyOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaz0wOyBrPDI7IGsrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhZHMucHVzaCh0aGlzLl9ncmlkc1tpKzFdWyhyKjIraikqbmV4dFNpZGVDb3VudCArIGMqMitrXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gciAqIHNpZGVDb3VudCArIGM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JpZHNbaV1baW5kZXhdID0gbmV3IExvb3NlUXVhZFRyZWVDZWxsKGksIGluZGV4LCByZWN0LCBxdWFkcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVDZWxsKGNlbGw6TG9vc2VRdWFkVHJlZUNlbGwpe1xyXG4gICAgICAgIGlmIChjZWxsLm9iamVjdENvdW50ID4gMCl7XHJcbiAgICAgICAgICAgIGNlbGwub2JqZWN0cy5mb3JFYWNoKHZhbHVlID0+IHRoaXMudXBkYXRlUmVnaW9uKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIGNlbGwuY2hpbGRyZW4uZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUub2JqZWN0Q291bnQgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNlbGwodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOabtOaWsOaJgOacieWFg+e0oCAqL1xyXG4gICAgdXBkYXRlQWxsKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDZWxsKHRoaXMuX2dyaWRzWzBdWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5oyH5a6a5pu05paw5p+Q5LiA5Liq5YWD57SgICovXHJcbiAgICB1cGRhdGVSZWdpb24ocmVnaW9uOkFBQkJSZWdpb24pOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHJlZ2lvbi5sZXZlbCA8IDAgfHwgcmVnaW9uLmluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZW1vdmUgZmFpbD09PmxldmVsPVwiK3JlZ2lvbi5sZXZlbCtcIiBpbmRleD1cIityZWdpb24uaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWN0ID0gcmVnaW9uLmFhYmIoKTtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX2dyaWRzWzBdWzBdO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IHJlZ2lvbi5sZXZlbDtcclxuICAgICAgICAvL+mHjeaWsOiuoeeul2luZGV4XHJcbiAgICAgICAgbGV0IGNlbGxMZW5ndGggPSB0aGlzLl9ncmlkc1tsZXZlbF1bMF0uYm91bmRzLndpZHRoO1xyXG4gICAgICAgIGxldCBzaWRlQ291bnQgPSBNYXRoLnBvdygyLCBsZXZlbCk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoKHJlY3QuY2VudGVyLnggLSByb290LmJvdW5kcy54TWluKSAvIGNlbGxMZW5ndGgpO1xyXG4gICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKChyb290LmJvdW5kcy55TWF4IC0gcmVjdC5jZW50ZXIueSkgLyBjZWxsTGVuZ3RoKTtcclxuICAgICAgICBsZXQgaW5kZXggPSByb3cgKiBzaWRlQ291bnQgKyBjb2w7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgsIHJlZ2lvbi5pbmRleCwgaW5kZXggPT09IHJlZ2lvbi5pbmRleCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHJlZ2lvbi5pbmRleCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyaWRzW3JlZ2lvbi5sZXZlbF1bcmVnaW9uLmluZGV4XS5yZW1vdmVPYmplY3QocmVnaW9uKTtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9ncmlkc1tsZXZlbF1baW5kZXhdO1xyXG4gICAgICAgICAgICBjZWxsLmFkZE9iamVjdChyZWdpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnQocmVnaW9uOkFBQkJSZWdpb24pOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHJlZ2lvbi5pbmRleCA+PSAwIHx8IHJlZ2lvbi5sZXZlbCA+PSAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuW3sue7j+WIhumFjeepuumXtGxldmVsPVwiK3JlZ2lvbi5sZXZlbCtcIiBpbmRleD1cIityZWdpb24uaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWN0ID0gcmVnaW9uLmFhYmIoKTtcclxuICAgICAgICBsZXQgbWF4U2lkZSA9IE1hdGgubWF4KHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuX2dyaWRzWzBdWzBdO1xyXG4gICAgICAgIGxldCByb290U2lkZSA9IHJvb3QuYm91bmRzLndpZHRoO1xyXG4gICAgICAgIGlmIChtYXhTaWRlID4gcm9vdFNpZGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVnaW9uIHJlY3QgdG9vIGJpZywgY2FuIG5vdCBpbnNlcnQgaXRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGV2ZWwgPSBNYXRoLmZsb29yKE1hdGgubG9nMihyb290U2lkZS9tYXhTaWRlKSk7XHJcbiAgICAgICAgaWYgKGxldmVsID4gdGhpcy5fZ3JpZHMubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICAgIGxldmVsID0gdGhpcy5fZ3JpZHMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdNYXliZSB0aGlzIGl0ZW0gaXMgdG9vIHNtYWxsLCBidXQgd2UgY2FuIGFkZCBpdCB0byBtYXggbGV2ZWwuJywgcm9vdFNpZGUsIG1heFNpZGUsIGxldmVsLCB0aGlzLl9ncmlkcy5sZW5ndGgsIHJlZ2lvbi5ub2RlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNlbGxMZW5ndGggPSB0aGlzLl9ncmlkc1tsZXZlbF1bMF0uYm91bmRzLndpZHRoO1xyXG4gICAgICAgIGxldCBzaWRlQ291bnQgPSBNYXRoLnBvdygyLCBsZXZlbCk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoKHJlY3QuY2VudGVyLnggLSByb290LmJvdW5kcy54TWluKSAvIGNlbGxMZW5ndGgpO1xyXG4gICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKChyb290LmJvdW5kcy55TWF4IC0gcmVjdC5jZW50ZXIueSkgLyBjZWxsTGVuZ3RoKTtcclxuICAgICAgICBsZXQgaW5kZXggPSByb3cgKiBzaWRlQ291bnQgKyBjb2w7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsZXZlbD1cIitsZXZlbCtcIiBpbmRleD1cIitpbmRleCk7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9ncmlkc1tsZXZlbF1baW5kZXhdO1xyXG4gICAgICAgIGNlbGwuYWRkT2JqZWN0KHJlZ2lvbik7XHJcbiAgICAgICAgLy8gdGhpcy5fZ3JhcGhpYy5yZWN0KHJlY3QueE1pbiwgcmVjdC55TWluLCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XHJcbiAgICAgICAgLy8gdGhpcy5fZ3JhcGhpYy5zdHJva2UoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUocmVnaW9uOkFBQkJSZWdpb24pOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHJlZ2lvbi5sZXZlbCA8IDAgfHwgcmVnaW9uLmluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZW1vdmUgZmFpbD09PmxldmVsPVwiK3JlZ2lvbi5sZXZlbCtcIiBpbmRleD1cIityZWdpb24uaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2dyaWRzW3JlZ2lvbi5sZXZlbF1bcmVnaW9uLmluZGV4XS5yZW1vdmVPYmplY3QocmVnaW9uKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0cmlldmUocmVjdDpjYy5SZWN0LCBvdXQ6QXJyYXk8QUFCQlJlZ2lvbj4pe1xyXG4gICAgICAgIExvb3NlUXVhZFRyZWUucmV0cmlldmVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ3JpZHNbMF1bMF0ucmV0cmlldmUocmVjdCwgb3V0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkxvb3NlUXVhZFRyZWU9PT5cIiwgTG9vc2VRdWFkVHJlZS5yZXRyaWV2ZUNvdW50LCBvdXQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfZ3JhcGhpYzpjYy5HcmFwaGljcyA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIHJldHJpZXZlQ291bnQgPSAwO1xyXG4gICAgdGVzdChyZWN0OmNjLlJlY3Qpe1xyXG4gICAgICAgIGxldCBncmFwaGljID0gdGhpcy5fZ3JhcGhpYztcclxuICAgICAgICBncmFwaGljLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICB0aGlzLnJldHJpZXZlKHJlY3QsIGFycik7XHJcblxyXG4gICAgICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgbGV0IGFhYmIgPSB2YWx1ZS5hYWJiKCk7XHJcbiAgICAgICAgICAgIGdyYXBoaWMucmVjdChhYWJiLnhNaW4sIGFhYmIueU1pbiwgYWFiYi53aWR0aCwgYWFiYi5oZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdyYXBoaWMuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9ncmlkcyk7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBsZXQgZ3JhcGhpYyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBncmFwaGljLnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgIGdyYXBoaWMubGluZVdpZHRoID0gMjA7XHJcbiAgICAgICAgLy8gdGhpcy5fZ3JpZHMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHZhbHVlLmZvckVhY2godmFsdWUxID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGdyYXBoaWMucmVjdCh2YWx1ZTEubG9vc2VCb3VuZHMueE1pbiwgdmFsdWUxLmxvb3NlQm91bmRzLnlNaW4sIHZhbHVlMS5sb29zZUJvdW5kcy53aWR0aCwgdmFsdWUxLmxvb3NlQm91bmRzLmhlaWdodCk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGdyYXBoaWMuc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIC8vIGdyYXBoaWMuZmlsbCgpO1xyXG4gICAgICAgIG5vZGUuekluZGV4ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuX2dyYXBoaWMgPSBncmFwaGljO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==