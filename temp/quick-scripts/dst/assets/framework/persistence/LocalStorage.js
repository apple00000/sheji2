
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/persistence/LocalStorage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0eb5f782MZHjINkdZwIcuag', 'LocalStorage');
// framework/persistence/LocalStorage.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.get = function (key) {
        return cc.sys.localStorage.getItem(this.prefix + key);
    };
    LocalStorage.set = function (key, value) {
        cc.sys.localStorage.setItem(this.prefix + key, value);
    };
    LocalStorage.getNumber = function (key) {
        var val = this.get(key);
        if (val == null) {
            return null;
        }
        return parseInt(val);
    };
    LocalStorage.setNumber = function (key, value) {
        this.set(key, value);
    };
    LocalStorage.getBoolean = function (key) {
        var val = this.getNumber(key);
        return !!val;
    };
    LocalStorage.setBoolean = function (key, b) {
        var value = 0;
        if (b) {
            value = 1;
        }
        this.set(key, value);
    };
    LocalStorage.getString = function (key) {
        return this.get(key);
    };
    LocalStorage.setString = function (key, value) {
        this.set(key, value);
    };
    LocalStorage.getObject = function (key, obj) {
        var val = this.get(key);
        if (val) {
            obj.decode(JSON.parse(val));
            return obj;
        }
        return null;
    };
    LocalStorage.setObject = function (key, obj) {
        var value = obj.encode();
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.set(key, value);
    };
    LocalStorage.prefix = "";
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvcGVyc2lzdGVuY2UvTG9jYWxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtJQThEQSxDQUFDO0lBM0RrQixnQkFBRyxHQUFsQixVQUFtQixHQUFVO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVjLGdCQUFHLEdBQWxCLFVBQW1CLEdBQVUsRUFBRSxLQUFTO1FBQ3BDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sc0JBQVMsR0FBaEIsVUFBaUIsR0FBVTtRQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBQztZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sc0JBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFFLEtBQVk7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLHVCQUFVLEdBQWpCLFVBQWtCLEdBQVU7UUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUVNLHVCQUFVLEdBQWpCLFVBQWtCLEdBQVUsRUFBRSxDQUFTO1FBQ25DLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxFQUFDO1lBQ0YsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUdNLHNCQUFTLEdBQWhCLFVBQWlCLEdBQVU7UUFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxzQkFBUyxHQUFoQixVQUFpQixHQUFVLEVBQUUsS0FBWTtRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sc0JBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFFLEdBQWM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsRUFBQztZQUNKLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sc0JBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFFLEdBQWM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQTNETSxtQkFBTSxHQUFHLEVBQUUsQ0FBQztJQTZEdkIsbUJBQUM7Q0E5REQsQUE4REMsSUFBQTtBQTlEWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUNvbnZlcnRlcn0gZnJvbSBcIi4uL2NvbnZlcnRlci9JQ29udmVydGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIHtcclxuICAgIHN0YXRpYyBwcmVmaXggPSBcIlwiO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldChrZXk6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucHJlZml4ICsga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXQoa2V5OnN0cmluZywgdmFsdWU6YW55KXtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5wcmVmaXggKyBrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0TnVtYmVyKGtleTpzdHJpbmcpOm51bWJlcnxudWxse1xyXG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xyXG4gICAgICAgIGlmICh2YWwgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0TnVtYmVyKGtleTpzdHJpbmcsIHZhbHVlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEJvb2xlYW4oa2V5OnN0cmluZyk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgdmFsID0gdGhpcy5nZXROdW1iZXIoa2V5KTtcclxuICAgICAgICByZXR1cm4gISF2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldEJvb2xlYW4oa2V5OnN0cmluZywgYjpib29sZWFuKXtcclxuICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgIGlmIChiKXtcclxuICAgICAgICAgICAgdmFsdWUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhdGljIGdldFN0cmluZyhrZXk6c3RyaW5nKTpzdHJpbmd8bnVsbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0U3RyaW5nKGtleTpzdHJpbmcsIHZhbHVlOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldE9iamVjdChrZXk6c3RyaW5nLCBvYmo6SUNvbnZlcnRlcil7XHJcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHZhbCl7XHJcbiAgICAgICAgICAgIG9iai5kZWNvZGUoSlNPTi5wYXJzZSh2YWwpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldE9iamVjdChrZXk6c3RyaW5nLCBvYmo6SUNvbnZlcnRlcil7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gb2JqLmVuY29kZSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=