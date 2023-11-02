
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/info/Task.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '763c02OmEBA5Yyyt0WowwAG', 'Task');
// script/app/info/Task.ts

Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = require("./World");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Task = /** @class */ (function () {
    function Task() {
    }
    Task.initCurrentLvData = function () {
        this._taskItemsOfCurrentLv = this._taskProxy.list.map(function (value) { return ({ id: value.id, num: 0, take: false }); });
    };
    Task.mergeCurrentLvData = function () {
        var _this = this;
        console.log("mergeCurrentLvData==>");
        console.log(this._taskItemsOfCurrentLv, "this._taskItemsOfCurrentLv");
        var update = false;
        this._taskItemsOfCurrentLv.forEach(function (value, index) {
            var line = ExcelConfig_1.ExcelConfig.getExcelLine(ExcelTableNames_1.ExcelTableNames.task, "id", value.id);
            if (value.num > 0 && _this._taskProxy.list[index].num < line['num']) {
                _this._taskProxy.list[index].num += value.num;
                if (_this._taskProxy.list[index].num >= line['num']) {
                    _this._taskProxy.list[index].num = line['num'];
                }
                update = true;
            }
        });
        if (update) {
            this.write();
        }
    };
    Task.write = function () {
        World_1.World.Storage.task = JSON.stringify(this._taskProxy);
    };
    Task.addNum = function (taskId, num) {
        console.log("======>addNum", taskId, num);
        var find = this._taskItemsOfCurrentLv.find(function (value) { return value.id == taskId; });
        if (find) {
            find.num += num;
        }
        console.log(this._taskItemsOfCurrentLv, "----");
    };
    /** 任务只增不减 */
    /** 击碎靶子 */
    Task.killEnemy = function () {
        this.addNum(1, 1);
    };
    /** 击碎幸运转盘 */
    Task.killLuckyEnemy = function () {
        this.addNum(2, 1);
    };
    /** 触发疯狂模式 */
    Task.triggerCrazy = function () {
        this.addNum(3, 1);
    };
    /** 打败Boss */
    Task.killBoss = function () {
        this.addNum(4, 1);
    };
    /** 使用道具 */
    Task.useTool = function () {
        this.addNum(5, 1);
    };
    Task.init = function () {
        console.log("Task.initBullet===>");
        /** 初始每日任务表 */
        var task = JSON.parse(World_1.World.Storage.task);
        if (!task || !task.expireTime || task.expireTime <= World_1.World.My.serverTime) {
            /** 更新任务 */
            task = {};
            /** 计算今天的时分秒 */
            var date = new Date(World_1.World.My.serverTime);
            console.log(date.getFullYear() + "\u5E74" + date.getMonth() + "\u6708" + date.getDay() + "\u65E5" + date.getHours() + "\u65F6" + date.getMinutes() + "\u5206" + date.getSeconds() + "\u79D2" + date.getMilliseconds() + "\u6BEB\u79D2");
            var cd = 24 * 60 * 60 - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds());
            var h = Math.floor(cd / 3600);
            var m = Math.floor((cd - h * 3600) / 60);
            var s = cd % 60;
            console.log(h + "\u65F6" + m + "\u5206" + s + "\u79D2-----------");
            task.expireTime = World_1.World.My.serverTime + cd * 1000 - date.getMilliseconds();
            task.box = false;
            task.list = [];
            /** 随机三个任务 */
            var taskDatas = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.task).filter(function (value) { return value['type'] == 1; });
            for (var i = 0; i < 3; i++) {
                var index = Math.floor(Math.random() * 100) % taskDatas.length;
                var item = taskDatas[index];
                console.log(index, item['id'], "=====");
                task.list.push({ id: parseInt(item['id']), num: 0, take: false });
                taskDatas.splice(index, 1);
            }
            World_1.World.Storage.task = JSON.stringify(task);
        }
        else if (task && !task.list) {
            this._taskProxy.list = [];
            for (var key in this._taskProxy) {
                if (key != 'expireTime' && key != 'box' && key != 'list') {
                    var id = parseInt(key);
                    var num = this._taskProxy[key];
                    var line = ExcelConfig_1.ExcelConfig.getExcelLine(ExcelTableNames_1.ExcelTableNames.task, "id", id);
                    if (line['num']) {
                        var take = num >= line['num'];
                        this._taskProxy.list.push({ id: id, num: num, take: take });
                    }
                }
            }
        }
        this._taskProxy = task;
        this.initCurrentLvData();
    };
    Object.defineProperty(Task, "taskProxy", {
        get: function () {
            return this._taskProxy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task, "taskItemsOfCurrentLv", {
        get: function () {
            return this._taskItemsOfCurrentLv;
        },
        enumerable: false,
        configurable: true
    });
    Task = __decorate([
        ccclass
    ], Task);
    return Task;
}());
exports.default = Task;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2luZm8vVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQThCO0FBQzlCLDZEQUEwRDtBQUMxRCxxRUFBa0U7QUFFNUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFjMUM7SUFBQTtJQThIQSxDQUFDO0lBMUhrQixzQkFBaUIsR0FBaEM7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBZSxFQUFDLEVBQUUsRUFBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFBLEVBQS9DLENBQStDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRU8sdUJBQWtCLEdBQTFCO1FBQUEsaUJBaUJDO1FBaEJHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUs7WUFDNUMsSUFBSSxJQUFJLEdBQUcseUJBQVcsQ0FBQyxZQUFZLENBQUMsaUNBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7Z0JBQy9ELEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUM3QyxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7b0JBQy9DLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pEO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVNLFVBQUssR0FBWjtRQUNJLGFBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFJYyxXQUFNLEdBQXJCLFVBQXNCLE1BQWEsRUFBRSxHQUFVO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUN4RSxJQUFJLElBQUksRUFBQztZQUNMLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGFBQWE7SUFFYixXQUFXO0lBQ0csY0FBUyxHQUF2QjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhO0lBQ0MsbUJBQWMsR0FBNUI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYTtJQUNDLGlCQUFZLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWE7SUFDQyxhQUFRLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFdBQVc7SUFDRyxZQUFPLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUdhLFNBQUksR0FBbEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsY0FBYztRQUNkLElBQUksSUFBSSxHQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLGFBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDO1lBQ3BFLFdBQVc7WUFDWCxJQUFJLEdBQWMsRUFBRSxDQUFDO1lBQ3JCLGVBQWU7WUFDZixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsY0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFLGNBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxpQkFBSSxDQUFDLENBQUM7WUFDbEssSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxFQUFFLENBQUM7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFJLENBQUMsY0FBSSxDQUFDLGNBQUksQ0FBQyxzQkFBYyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6RSxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLGFBQWE7WUFDYixJQUFJLFNBQVMsR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUNwRyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNuQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUMzRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQzdELFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsYUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QzthQUFLLElBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDMUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFDO2dCQUM1QixJQUFJLEdBQUcsSUFBSSxZQUFZLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFDO29CQUNyRCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9CLElBQUksSUFBSSxHQUFHLHlCQUFXLENBQUMsWUFBWSxDQUFDLGlDQUFlLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUM7d0JBQ1osSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDSjthQUNKO1NBQ0o7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBR0Qsc0JBQVcsaUJBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyw0QkFBb0I7YUFBL0I7WUFDSSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQTdIZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQThIeEI7SUFBRCxXQUFDO0NBOUhELEFBOEhDLElBQUE7a0JBOUhvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuL1dvcmxkXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhc2tJdGVtUHJveHkge1xyXG4gICAgaWQ6bnVtYmVyO1xyXG4gICAgbnVtOm51bWJlcjtcclxuICAgIHRha2U6Ym9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFRhc2tQcm94eSB7XHJcbiAgICBsaXN0OkFycmF5PFRhc2tJdGVtUHJveHk+O1xyXG4gICAgZXhwaXJlVGltZTpudW1iZXI7XHJcbiAgICBib3g6Ym9vbGVhbjtcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Rhc2tJdGVtc09mQ3VycmVudEx2OkFycmF5PFRhc2tJdGVtUHJveHk+O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluaXRDdXJyZW50THZEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5fdGFza0l0ZW1zT2ZDdXJyZW50THYgPSB0aGlzLl90YXNrUHJveHkubGlzdC5tYXAodmFsdWUgPT4gPFRhc2tJdGVtUHJveHk+e2lkOnZhbHVlLmlkLCBudW06MCwgdGFrZTpmYWxzZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyAgbWVyZ2VDdXJyZW50THZEYXRhKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtZXJnZUN1cnJlbnRMdkRhdGE9PT5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdGFza0l0ZW1zT2ZDdXJyZW50THYsIFwidGhpcy5fdGFza0l0ZW1zT2ZDdXJyZW50THZcIik7XHJcbiAgICAgICAgbGV0IHVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Rhc2tJdGVtc09mQ3VycmVudEx2LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGluZSA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsTGluZShFeGNlbFRhYmxlTmFtZXMudGFzaywgXCJpZFwiLCB2YWx1ZS5pZCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5udW0gPiAwICYmIHRoaXMuX3Rhc2tQcm94eS5saXN0W2luZGV4XS5udW0gPCBsaW5lWydudW0nXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrUHJveHkubGlzdFtpbmRleF0ubnVtICs9IHZhbHVlLm51bTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90YXNrUHJveHkubGlzdFtpbmRleF0ubnVtID49IGxpbmVbJ251bSddKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXNrUHJveHkubGlzdFtpbmRleF0ubnVtID0gbGluZVsnbnVtJ107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHVwZGF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHdyaXRlKCl7XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS50YXNrID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fdGFza1Byb3h5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfdGFza1Byb3h5OlRhc2tQcm94eTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhZGROdW0odGFza0lkOm51bWJlciwgbnVtOm51bWJlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT0+YWRkTnVtXCIsIHRhc2tJZCwgbnVtKTtcclxuICAgICAgICBsZXQgZmluZCA9IHRoaXMuX3Rhc2tJdGVtc09mQ3VycmVudEx2LmZpbmQodmFsdWUgPT4gdmFsdWUuaWQgPT0gdGFza0lkKTtcclxuICAgICAgICBpZiAoZmluZCl7XHJcbiAgICAgICAgICAgIGZpbmQubnVtICs9IG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdGFza0l0ZW1zT2ZDdXJyZW50THYsIFwiLS0tLVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Lu75Yqh5Y+q5aKe5LiN5YePICovXHJcblxyXG4gICAgLyoqIOWHu+eijumdtuWtkCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBraWxsRW5lbXkoKXtcclxuICAgICAgICB0aGlzLmFkZE51bSgxLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Ye756KO5bm46L+Q6L2s55uYICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGtpbGxMdWNreUVuZW15KCl7XHJcbiAgICAgICAgdGhpcy5hZGROdW0oMiwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOinpuWPkeeWr+eLguaooeW8jyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmlnZ2VyQ3JhenkoKXtcclxuICAgICAgICB0aGlzLmFkZE51bSgzLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5omT6LSlQm9zcyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBraWxsQm9zcygpe1xyXG4gICAgICAgIHRoaXMuYWRkTnVtKDQsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDkvb/nlKjpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdXNlVG9vbCgpe1xyXG4gICAgICAgIHRoaXMuYWRkTnVtKDUsIDEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2suaW5pdEJ1bGxldD09PT5cIik7XHJcbiAgICAgICAgLyoqIOWIneWni+avj+aXpeS7u+WKoeihqCAqL1xyXG4gICAgICAgIGxldCB0YXNrID0gPFRhc2tQcm94eT5KU09OLnBhcnNlKFdvcmxkLlN0b3JhZ2UudGFzayk7XHJcbiAgICAgICAgaWYgKCF0YXNrIHx8ICF0YXNrLmV4cGlyZVRpbWUgfHwgdGFzay5leHBpcmVUaW1lIDw9IFdvcmxkLk15LnNlcnZlclRpbWUpe1xyXG4gICAgICAgICAgICAvKiog5pu05paw5Lu75YqhICovXHJcbiAgICAgICAgICAgIHRhc2sgPSA8VGFza1Byb3h5Pnt9O1xyXG4gICAgICAgICAgICAvKiog6K6h566X5LuK5aSp55qE5pe25YiG56eSICovXHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoV29ybGQuTXkuc2VydmVyVGltZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2RhdGUuZ2V0RnVsbFllYXIoKX3lubQke2RhdGUuZ2V0TW9udGgoKX3mnIgke2RhdGUuZ2V0RGF5KCl95pelJHtkYXRlLmdldEhvdXJzKCl95pe2JHtkYXRlLmdldE1pbnV0ZXMoKX3liIYke2RhdGUuZ2V0U2Vjb25kcygpfeenkiR7ZGF0ZS5nZXRNaWxsaXNlY29uZHMoKX3mr6vnp5JgKTtcclxuICAgICAgICAgICAgbGV0IGNkID0gMjQqNjAqNjAgLSAoZGF0ZS5nZXRIb3VycygpKjYwKjYwICsgZGF0ZS5nZXRNaW51dGVzKCkqNjAgKyBkYXRlLmdldFNlY29uZHMoKSk7XHJcbiAgICAgICAgICAgIGxldCBoID0gTWF0aC5mbG9vcihjZC8zNjAwKTtcclxuICAgICAgICAgICAgbGV0IG0gPSBNYXRoLmZsb29yKChjZC1oKjM2MDApLzYwKTtcclxuICAgICAgICAgICAgbGV0IHMgPSBjZCU2MDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aH3ml7Yke2195YiGJHtzfeenki0tLS0tLS0tLS0tYCk7XHJcbiAgICAgICAgICAgIHRhc2suZXhwaXJlVGltZSA9IFdvcmxkLk15LnNlcnZlclRpbWUgKyBjZCoxMDAwIC0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcclxuICAgICAgICAgICAgdGFzay5ib3ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGFzay5saXN0ID0gW107XHJcbiAgICAgICAgICAgIC8qKiDpmo/mnLrkuInkuKrku7vliqEgKi9cclxuICAgICAgICAgICAgbGV0IHRhc2tEYXRhcyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLnRhc2spLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZVsndHlwZSddID09IDEpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8MzsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDApJXRhc2tEYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRhc2tEYXRhc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleCwgaXRlbVsnaWQnXSwgXCI9PT09PVwiKTtcclxuICAgICAgICAgICAgICAgIHRhc2subGlzdC5wdXNoKHtpZDpwYXJzZUludChpdGVtWydpZCddKSwgbnVtOjAsIHRha2U6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIHRhc2tEYXRhcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFdvcmxkLlN0b3JhZ2UudGFzayA9IEpTT04uc3RyaW5naWZ5KHRhc2spO1xyXG4gICAgICAgIH1lbHNlIGlmKHRhc2sgJiYgIXRhc2subGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl90YXNrUHJveHkubGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fdGFza1Byb3h5KXtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gJ2V4cGlyZVRpbWUnICYmIGtleSAhPSAnYm94JyAmJiBrZXkgIT0gJ2xpc3QnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBwYXJzZUludChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSB0aGlzLl90YXNrUHJveHlba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsTGluZShFeGNlbFRhYmxlTmFtZXMudGFzaywgXCJpZFwiLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVbJ251bSddKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRha2UgPSBudW0gPj0gbGluZVsnbnVtJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2tQcm94eS5saXN0LnB1c2goe2lkOmlkLCBudW06bnVtLCB0YWtlOnRha2V9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGFza1Byb3h5ID0gdGFzaztcclxuXHJcbiAgICAgICAgdGhpcy5pbml0Q3VycmVudEx2RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgZ2V0IHRhc2tQcm94eSgpOiBUYXNrUHJveHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrUHJveHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBnZXQgdGFza0l0ZW1zT2ZDdXJyZW50THYoKTogQXJyYXk8VGFza0l0ZW1Qcm94eT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrSXRlbXNPZkN1cnJlbnRMdjtcclxuICAgIH1cclxufVxyXG4iXX0=