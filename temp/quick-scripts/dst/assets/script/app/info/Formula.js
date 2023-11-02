
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/info/Formula.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62f6aU/jHhCg7Y1stBnDERq', 'Formula');
// script/app/info/Formula.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Formula = void 0;
/** 公式模块 */
var Formula;
(function (Formula) {
    /** 金币 */
    var Gold = /** @class */ (function () {
        function Gold() {
        }
        /** 金币价值 */
        Gold.goldCost = function (lv, maxLv, cost) {
            if (lv > maxLv) {
                return cost + (lv - maxLv);
            }
            else {
                return cost;
            }
        };
        /** 日常收益 */
        Gold.dayGet = function (lv) {
            return Math.floor(lv * 1.8);
        };
        /** 升级消耗 */
        Gold.upgradeCost = function (lv) {
            return lv * 120;
        };
        return Gold;
    }());
    Formula.Gold = Gold;
})(Formula = exports.Formula || (exports.Formula = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2luZm8vRm9ybXVsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFdBQVc7QUFDWCxJQUFjLE9BQU8sQ0F1QnBCO0FBdkJELFdBQWMsT0FBTztJQUNqQixTQUFTO0lBQ1Q7UUFBQTtRQW1CQSxDQUFDO1FBbEJHLFdBQVc7UUFDRyxhQUFRLEdBQXRCLFVBQXVCLEVBQVMsRUFBRSxLQUFZLEVBQUUsSUFBVztZQUN2RCxJQUFJLEVBQUUsR0FBRyxLQUFLLEVBQUM7Z0JBQ1gsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUM7UUFFRCxXQUFXO1FBQ0csV0FBTSxHQUFwQixVQUFxQixFQUFTO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELFdBQVc7UUFDRyxnQkFBVyxHQUF6QixVQUEwQixFQUFTO1lBQy9CLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDO1FBQ0wsV0FBQztJQUFELENBbkJBLEFBbUJDLElBQUE7SUFuQlksWUFBSSxPQW1CaEIsQ0FBQTtBQUVMLENBQUMsRUF2QmEsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBdUJwQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKiog5YWs5byP5qih5Z2XICovXHJcbmV4cG9ydCBtb2R1bGUgRm9ybXVsYSB7XHJcbiAgICAvKiog6YeR5biBICovXHJcbiAgICBleHBvcnQgY2xhc3MgR29sZCB7XHJcbiAgICAgICAgLyoqIOmHkeW4geS7t+WAvCAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ29sZENvc3QobHY6bnVtYmVyLCBtYXhMdjpudW1iZXIs44CAY29zdDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAgICAgaWYgKGx2ID4gbWF4THYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvc3QgKyAobHYgLSBtYXhMdik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOaXpeW4uOaUtuebiiAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGF5R2V0KGx2Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihsdiAqIDEuOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog5Y2H57qn5raI6ICXICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB1cGdyYWRlQ29zdChsdjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAgICAgcmV0dXJuIGx2ICogMTIwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19