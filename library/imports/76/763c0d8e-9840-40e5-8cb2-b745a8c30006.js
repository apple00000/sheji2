"use strict";
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