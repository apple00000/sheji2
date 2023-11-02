
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/converter/JsonConverter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ad4356PtNOWakao1ECJinM', 'JsonConverter');
// framework/converter/JsonConverter.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConverter = void 0;
var JsonConverter = /** @class */ (function () {
    function JsonConverter() {
    }
    JsonConverter.prototype.encode = function () {
        var json = {};
        for (var attr in this) {
            if (typeof this[attr] != "function") {
                json[attr] = this[attr];
            }
        }
        return json;
    };
    JsonConverter.prototype.decode = function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        for (var attr in this) {
            if (typeof this[attr] != "function") {
                if (typeof data[attr] == "undefined") {
                    throw this.constructor.name + ".decode data not found attr===>" + attr;
                }
                this[attr] = data[attr];
            }
        }
        return this;
    };
    return JsonConverter;
}());
exports.JsonConverter = JsonConverter;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29udmVydGVyL0pzb25Db252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7OztBQUluRztJQUFBO0lBMkJBLENBQUM7SUF6QkcsOEJBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLElBQVE7UUFDWCxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBQztZQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUVELEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFDO2dCQUNoQyxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtvQkFDbEMsTUFBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksdUNBQWtDLElBQU0sQ0FBQztpQkFDMUU7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQTNCWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHtJQ29udmVydGVyfSBmcm9tIFwiLi9JQ29udmVydGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNvbnZlcnRlciBpbXBsZW1lbnRzIElDb252ZXJ0ZXJ7XHJcblxyXG4gICAgZW5jb2RlKCl7XHJcbiAgICAgICAgbGV0IGpzb24gPSB7fTtcclxuICAgICAgICBmb3IobGV0IGF0dHIgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNbYXR0cl0gIT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICAgICAgICAgIGpzb25bYXR0cl0gPSB0aGlzW2F0dHJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIGRlY29kZShkYXRhOmFueSl7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgYXR0ciBpbiB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1thdHRyXSAhPSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2F0dHJdID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9LmRlY29kZSBkYXRhIG5vdCBmb3VuZCBhdHRyPT09PiR7YXR0cn1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpc1thdHRyXSA9IGRhdGFbYXR0cl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuIl19