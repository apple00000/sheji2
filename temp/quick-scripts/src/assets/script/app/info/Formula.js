"use strict";
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