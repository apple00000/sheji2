
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/info/Newbies.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21af4u3ilxCeqEbsCgLln+k', 'Newbies');
// script/app/info/Newbies.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("./World");
var Newbies = /** @class */ (function () {
    function Newbies(map) {
        this._map = null;
        this._map = map;
    }
    Newbies.prototype.state = function (key) {
        var val = this._map[key];
        return !!val;
    };
    Newbies.prototype.finish = function (key) {
        this._map[key] = 1;
        World_1.World.Storage.newbies = this.toJson();
    };
    Newbies.prototype.toJson = function () {
        return JSON.stringify(this._map);
    };
    return Newbies;
}());
exports.default = Newbies;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2luZm8vTmV3Ymllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQThCO0FBRTlCO0lBQ0ksaUJBQVksR0FBRztRQUdQLFNBQUksR0FBb0IsSUFBSSxDQUFDO1FBRmpDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFHRCx1QkFBSyxHQUFMLFVBQU0sR0FBVTtRQUNaLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBVTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDO1FBQ3BCLGFBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsd0JBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuL1dvcmxkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdiaWVze1xyXG4gICAgY29uc3RydWN0b3IobWFwKXtcclxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9tYXA6W3N0cmluZywgbnVtYmVyXSA9IG51bGw7XHJcblxyXG4gICAgc3RhdGUoa2V5OnN0cmluZyk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgdmFsID0gdGhpcy5fbWFwW2tleV07XHJcbiAgICAgICAgcmV0dXJuICEhdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmlzaChrZXk6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9tYXBba2V5XSA9ICAxO1xyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UubmV3YmllcyA9IHRoaXMudG9Kc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9Kc29uKCl7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX21hcCk7XHJcbiAgICB9XHJcbn1cclxuIl19