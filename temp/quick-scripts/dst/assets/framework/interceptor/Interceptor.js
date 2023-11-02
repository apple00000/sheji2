
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/interceptor/Interceptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e5d01V2r2VHM5KPSwqwyJKc', 'Interceptor');
// framework/interceptor/Interceptor.ts

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
exports.Interceptor = void 0;
var map = new Map();
var Interceptor = /** @class */ (function () {
    function Interceptor() {
    }
    Interceptor.register = function (command, interceptor) {
        var constructor = null;
        if (typeof interceptor == "function") {
            constructor = interceptor;
        }
        else {
            constructor = interceptor.constructor;
        }
        var arr = this.interceptorsOf(command);
        if (arr.every(function (value) { return value.constructor != constructor; })) {
            if (typeof interceptor == "function") {
                arr.push(new interceptor());
            }
            else {
                arr.push(interceptor);
            }
        }
    };
    Interceptor.unregister = function (command, interceptor) {
        var arr = this.interceptorsOf(command);
        var constructor = null;
        if (typeof interceptor == "function") {
            constructor = interceptor;
        }
        else {
            constructor = interceptor.constructor;
        }
        var newArr = arr.filter(function (value) { return value.constructor != constructor; });
        map.set(command, newArr);
    };
    Interceptor.interceptorsOf = function (command) {
        var arr = map.get(command);
        if (typeof arr == "undefined") {
            arr = [];
            map.set(command, arr);
        }
        return arr;
    };
    return Interceptor;
}());
exports.Interceptor = Interceptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaW50ZXJjZXB0b3IvSW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7OztBQU9uRyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBc0MsQ0FBQztBQUV4RDtJQUFBO0lBMkNBLENBQUM7SUF2Q1Usb0JBQVEsR0FBZixVQUFnQixPQUFjLEVBQUUsV0FBZ0M7UUFDNUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxXQUFXLElBQUksVUFBVSxFQUFDO1lBQ2pDLFdBQVcsR0FBRyxXQUFXLENBQUE7U0FDNUI7YUFBSTtZQUNELFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsV0FBVyxJQUFJLFdBQVcsRUFBaEMsQ0FBZ0MsQ0FBQyxFQUFDO1lBQ3JELElBQUksT0FBTyxXQUFXLElBQUksVUFBVSxFQUFDO2dCQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQzthQUMvQjtpQkFBSztnQkFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBSU0sc0JBQVUsR0FBakIsVUFBa0IsT0FBYyxFQUFFLFdBQStCO1FBQzdELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxXQUFXLElBQUksVUFBVSxFQUFDO1lBQ2pDLFdBQVcsR0FBRyxXQUFXLENBQUE7U0FDNUI7YUFBSTtZQUNELFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxXQUFXLElBQUksV0FBVyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLDBCQUFjLEdBQXJCLFVBQXNCLE9BQWM7UUFDaEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBQztZQUMxQixHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCxrQkFBQztBQUFELENBM0NBLEFBMkNDLElBQUE7QUEzQ1ksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiQ29tbWFuZEludGVyY2VwdG9yLnRzXCIgLz5cclxuXHJcbmltcG9ydCB7SUNvbW1hbmRJbnRlcmNlcHRvcn0gZnJvbSBcIi4vQ29tbWFuZEludGVyY2VwdG9yXCI7XHJcblxyXG5sZXQgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PElDb21tYW5kSW50ZXJjZXB0b3I+PigpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludGVyY2VwdG9ye1xyXG5cclxuICAgIHN0YXRpYyByZWdpc3RlcjxUIGV4dGVuZHMgSUNvbW1hbmRJbnRlcmNlcHRvcj4oY29tbWFuZDpzdHJpbmcsIGludGVyY2VwdG9yOiB7cHJvdG90eXBlOiBUfSk7XHJcblxyXG4gICAgc3RhdGljIHJlZ2lzdGVyKGNvbW1hbmQ6c3RyaW5nLCBpbnRlcmNlcHRvcjogSUNvbW1hbmRJbnRlcmNlcHRvcil7XHJcbiAgICAgICAgbGV0IGNvbnN0cnVjdG9yID0gbnVsbDtcclxuICAgICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yID09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gaW50ZXJjZXB0b3JcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgPSBpbnRlcmNlcHRvci5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuaW50ZXJjZXB0b3JzT2YoY29tbWFuZCk7XHJcbiAgICAgICAgaWYgKGFyci5ldmVyeSh2YWx1ZSA9PiB2YWx1ZS5jb25zdHJ1Y3RvciAhPSBjb25zdHJ1Y3Rvcikpe1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yID09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuZXcgaW50ZXJjZXB0b3IoKSk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGludGVyY2VwdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdW5yZWdpc3RlcjxUIGV4dGVuZHMgSUNvbW1hbmRJbnRlcmNlcHRvcj4oY29tbWFuZDpzdHJpbmcsIGludGVyY2VwdG9yOiB7cHJvdG90eXBlOiBUfSk7XHJcblxyXG4gICAgc3RhdGljIHVucmVnaXN0ZXIoY29tbWFuZDpzdHJpbmcsIGludGVyY2VwdG9yOklDb21tYW5kSW50ZXJjZXB0b3Ipe1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmludGVyY2VwdG9yc09mKGNvbW1hbmQpO1xyXG4gICAgICAgIGxldCBjb25zdHJ1Y3RvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvciA9PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IGludGVyY2VwdG9yXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gaW50ZXJjZXB0b3IuY29uc3RydWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdBcnIgPSBhcnIuZmlsdGVyKHZhbHVlID0+IHZhbHVlLmNvbnN0cnVjdG9yICE9IGNvbnN0cnVjdG9yKTtcclxuICAgICAgICBtYXAuc2V0KGNvbW1hbmQsIG5ld0Fycik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGludGVyY2VwdG9yc09mKGNvbW1hbmQ6c3RyaW5nKTpbSUNvbW1hbmRJbnRlcmNlcHRvcl17XHJcbiAgICAgICAgbGV0IGFyciA9IG1hcC5nZXQoY29tbWFuZCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIGFyciA9IFtdO1xyXG4gICAgICAgICAgICBtYXAuc2V0KGNvbW1hbmQsIGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuIl19