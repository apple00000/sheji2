
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/http/HttpProtocol.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce99fMxrOJCPI2VBILKV/GL', 'HttpProtocol');
// framework/http/HttpProtocol.ts

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
var HttpProtocol = /** @class */ (function () {
    function HttpProtocol() {
        this.uri = null;
        this.request = {};
        this.response = null;
    }
    HttpProtocol.prototype.getResponseStatus = function () {
        return this.response.status;
    };
    HttpProtocol.prototype.getResponseData = function () {
        return this.response.data;
    };
    HttpProtocol.prototype.getResponseMessage = function () {
        return this.response.message;
    };
    HttpProtocol.prototype.encode = function () {
        console.log(">>>>发发发发发发===" + this.uri, this.request);
        var result = null;
        if (typeof FormData == "function") {
            var data = new FormData();
            for (var attr in this.request) {
                if (typeof this.request[attr] != "function") {
                    data.append(attr, this.request[attr]);
                }
            }
            result = data;
        }
        else {
            // 不支持FormData的浏览器的处理
            var arr = [];
            var i = 0;
            for (var attr in this.request) {
                if (typeof this.request[attr] != "function") {
                    arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(this.request[attr]);
                    i++;
                }
            }
            result = arr.join("&");
        }
        return result;
    };
    HttpProtocol.prototype.decode = function (data) {
        this.response = JSON.parse(data);
        console.log("<<<<收收收收收收===" + this.uri, data);
        if (this.response.status != 0) {
            throw this.response;
        }
    };
    return HttpProtocol;
}());
exports.default = HttpProtocol;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvaHR0cC9IdHRwUHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBRW5HO0lBQUE7UUFDSSxRQUFHLEdBQVUsSUFBSSxDQUFDO1FBQ2xCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFVLElBQUksQ0FBQztJQWdEM0IsQ0FBQztJQTlDRyx3Q0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQseUNBQWtCLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzFCLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxFQUFDO29CQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO2FBQ0o7WUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO2FBQUs7WUFDRixxQkFBcUI7WUFDckIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUM7b0JBQ3hDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRixDQUFDLEVBQUUsQ0FBQztpQkFDUDthQUNKO1lBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLElBQVE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUMxQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwUHJvdG9jb2wge1xyXG4gICAgdXJpOnN0cmluZyA9IG51bGw7XHJcbiAgICByZXF1ZXN0Om9iamVjdCA9IHt9O1xyXG4gICAgcmVzcG9uc2U6b2JqZWN0ID0gbnVsbDtcclxuXHJcbiAgICBnZXRSZXNwb25zZVN0YXR1cygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5zdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVzcG9uc2VEYXRhPFQ+KCk6VHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlc3BvbnNlTWVzc2FnZSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuY29kZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiPj4+PuWPkeWPkeWPkeWPkeWPkeWPkT09PVwiK3RoaXMudXJpLCB0aGlzLnJlcXVlc3QpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmKHR5cGVvZiBGb3JtRGF0YSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBhdHRyIGluIHRoaXMucmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVlc3RbYXR0cl0gIT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZChhdHRyLHRoaXMucmVxdWVzdFthdHRyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ID0gZGF0YTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS4jeaUr+aMgUZvcm1EYXRh55qE5rWP6KeI5Zmo55qE5aSE55CGXHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGF0dHIgaW4gdGhpcy5yZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucmVxdWVzdFthdHRyXSAhPSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXSA9IGVuY29kZVVSSUNvbXBvbmVudChhdHRyKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucmVxdWVzdFthdHRyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGFyci5qb2luKFwiJlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjb2RlKGRhdGE6YW55KXtcclxuICAgICAgICB0aGlzLnJlc3BvbnNlID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIjw8PDzmlLbmlLbmlLbmlLbmlLbmlLY9PT1cIit0aGlzLnVyaSwgZGF0YSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2Uuc3RhdHVzICE9IDApe1xyXG4gICAgICAgICAgICB0aHJvdyB0aGlzLnJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=