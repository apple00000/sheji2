
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/CanvasMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '349a5CzWoFFmqjGbjcw5R0A', 'CanvasMediator');
// framework/component/CanvasMediator.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent;
var bLaunch = false;
var CanvasMediator = /** @class */ (function (_super) {
    __extends(CanvasMediator, _super);
    function CanvasMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scenePrefab = null;
        return _this;
    }
    CanvasMediator.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var node, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log(this);
                        Facade_1.default.canvasNode = this.node;
                        if (this.scenePrefab) {
                            node = cc.instantiate(this.scenePrefab);
                            node.setParent(this.node);
                        }
                        if (!!bLaunch) return [3 /*break*/, 2];
                        return [4 /*yield*/, Facade_1.default.executeCommand("StartupCommand")];
                    case 1:
                        result = (_a.sent())[0];
                        if (result) {
                            console.log("程序启动成功...");
                        }
                        else {
                            console.log("程序启动失败!!!");
                        }
                        bLaunch = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CanvasMediator.prototype.onDestroy = function () {
        Facade_1.default.canvasNode = null;
    };
    __decorate([
        property(cc.Prefab)
    ], CanvasMediator.prototype, "scenePrefab", void 0);
    CanvasMediator = __decorate([
        ccclass,
        menu("自定义/CanvasMediator"),
        requireComponent(cc.Canvas),
        executionOrder(-10)
    ], CanvasMediator);
    return CanvasMediator;
}(cc.Component));
exports.default = CanvasMediator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L0NhbnZhc01lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFaEMsSUFBQSxLQUE4RCxFQUFFLENBQUMsVUFBVSxFQUExRSxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxjQUFjLG9CQUFBLEVBQUUsZ0JBQWdCLHNCQUFpQixDQUFDO0FBRWxGLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztBQU9wQjtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQTJCQztRQXhCRyxpQkFBVyxHQUFhLElBQUksQ0FBQzs7SUF3QmpDLENBQUM7SUF0QlMsK0JBQU0sR0FBWjs7Ozs7O3dCQUNJLHFCQUFxQjt3QkFDckIsZ0JBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDOUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFDOzRCQUNiLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzdCOzZCQUNHLENBQUMsT0FBTyxFQUFSLHdCQUFRO3dCQUNPLHFCQUFNLGdCQUFNLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUE7O3dCQUF2RCxNQUFNLEdBQUksQ0FBQSxTQUE2QyxDQUFBLEdBQWpEO3dCQUNYLElBQUksTUFBTSxFQUFDOzRCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQzVCOzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQzVCO3dCQUNELE9BQU8sR0FBRyxJQUFJLENBQUM7Ozs7OztLQUV0QjtJQUVELGtDQUFTLEdBQVQ7UUFDSSxnQkFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQXRCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNTO0lBSFosY0FBYztRQUpsQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQzFCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDM0IsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDO09BQ0MsY0FBYyxDQTJCbEM7SUFBRCxxQkFBQztDQTNCRCxBQTJCQyxDQTNCMkMsRUFBRSxDQUFDLFNBQVMsR0EyQnZEO2tCQTNCb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGYWNhZGUgZnJvbSBcIi4uL2ZhY2FkZS9GYWNhZGVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSwgZXhlY3V0aW9uT3JkZXIsIHJlcXVpcmVDb21wb25lbnR9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmxldCBiTGF1bmNoID0gZmFsc2U7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLoh6rlrprkuYkvQ2FudmFzTWVkaWF0b3JcIilcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuQ2FudmFzKVxyXG5AZXhlY3V0aW9uT3JkZXIoLTEwKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNNZWRpYXRvciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHNjZW5lUHJlZmFiOmNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkICgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICBGYWNhZGUuY2FudmFzTm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBpZiAodGhpcy5zY2VuZVByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zY2VuZVByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYkxhdW5jaCl7XHJcbiAgICAgICAgICAgIGxldCBbcmVzdWx0XSA9IGF3YWl0IEZhY2FkZS5leGVjdXRlQ29tbWFuZChcIlN0YXJ0dXBDb21tYW5kXCIpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi56iL5bqP5ZCv5Yqo5oiQ5YqfLi4uXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnqIvluo/lkK/liqjlpLHotKUhISFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYkxhdW5jaCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIEZhY2FkZS5jYW52YXNOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19