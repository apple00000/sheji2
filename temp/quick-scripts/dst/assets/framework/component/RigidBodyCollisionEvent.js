
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/component/RigidBodyCollisionEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd3eca0KaZBS54KFgdqn1/X', 'RigidBodyCollisionEvent');
// framework/component/RigidBodyCollisionEvent.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var RigidBodyCollisionType;
(function (RigidBodyCollisionType) {
    RigidBodyCollisionType[RigidBodyCollisionType["onBeginContact"] = 0] = "onBeginContact";
    RigidBodyCollisionType[RigidBodyCollisionType["onEndContact"] = 1] = "onEndContact";
    RigidBodyCollisionType[RigidBodyCollisionType["onPreSolve"] = 2] = "onPreSolve";
    RigidBodyCollisionType[RigidBodyCollisionType["onPostSolve"] = 3] = "onPostSolve";
})(RigidBodyCollisionType || (RigidBodyCollisionType = {}));
var map = new Map();
map.set(RigidBodyCollisionType.onBeginContact, "onBeginContact");
map.set(RigidBodyCollisionType.onEndContact, "onEndContact");
map.set(RigidBodyCollisionType.onPreSolve, "onPreSolve");
map.set(RigidBodyCollisionType.onPostSolve, "onPostSolve");
var RigidBodyCollisionEvent = /** @class */ (function (_super) {
    __extends(RigidBodyCollisionEvent, _super);
    function RigidBodyCollisionEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collisionType = RigidBodyCollisionType.onBeginContact;
        _this.eventHandlers = [];
        return _this;
    }
    RigidBodyCollisionEvent.prototype.onLoad = function () {
        var _this = this;
        this[map.get(this.collisionType)] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    (_a = cc.Component.EventHandler).emitEvents.apply(_a, __spreadArrays([this.eventHandlers], args));
                    return [2 /*return*/];
                });
            });
        };
    };
    __decorate([
        property({ type: cc.Enum(RigidBodyCollisionType), displayName: "刚体碰撞类型" })
    ], RigidBodyCollisionEvent.prototype, "collisionType", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "触发事件" })
    ], RigidBodyCollisionEvent.prototype, "eventHandlers", void 0);
    RigidBodyCollisionEvent = __decorate([
        ccclass,
        menu("自定义/RigidBodyCollisionEvent")
    ], RigidBodyCollisionEvent);
    return RigidBodyCollisionEvent;
}(cc.Component));
exports.default = RigidBodyCollisionEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvY29tcG9uZW50L1JpZ2lkQm9keUNvbGxpc2lvbkV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOztBQUc3RixJQUFBLEtBQTRCLEVBQUUsQ0FBQyxVQUFVLEVBQXhDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBaUIsQ0FBQztBQUVoRCxJQUFLLHNCQUtKO0FBTEQsV0FBSyxzQkFBc0I7SUFDdkIsdUZBQWMsQ0FBQTtJQUNkLG1GQUFZLENBQUE7SUFDWiwrRUFBVSxDQUFBO0lBQ1YsaUZBQVcsQ0FBQTtBQUNmLENBQUMsRUFMSSxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBSzFCO0FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM3RCxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN6RCxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUszRDtJQUFxRCwyQ0FBWTtJQUFqRTtRQUFBLHFFQWNDO1FBWEcsbUJBQWEsR0FBMEIsc0JBQXNCLENBQUMsY0FBYyxDQUFDO1FBRzdFLG1CQUFhLEdBQStCLEVBQUUsQ0FBQzs7SUFRbkQsQ0FBQztJQU5HLHdDQUFNLEdBQU47UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHO1lBQU8sY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLHlCQUFPOzs7OztvQkFDOUMsQ0FBQSxLQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBLENBQUMsVUFBVSwyQkFBQyxJQUFJLENBQUMsYUFBYSxHQUFLLElBQUksR0FBRTs7OztTQUNyRSxDQUFBO0lBQ0wsQ0FBQztJQVREO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxXQUFXLEVBQUMsUUFBUSxFQUFDLENBQUM7a0VBQ007SUFHN0U7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDO2tFQUNoQjtJQU45Qix1QkFBdUI7UUFGM0MsT0FBTztRQUNQLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztPQUNmLHVCQUF1QixDQWMzQztJQUFELDhCQUFDO0NBZEQsQUFjQyxDQWRvRCxFQUFFLENBQUMsU0FBUyxHQWNoRTtrQkFkb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5LCBtZW51fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFJpZ2lkQm9keUNvbGxpc2lvblR5cGV7XHJcbiAgICBvbkJlZ2luQ29udGFjdCxcclxuICAgIG9uRW5kQ29udGFjdCxcclxuICAgIG9uUHJlU29sdmUsXHJcbiAgICBvblBvc3RTb2x2ZSxcclxufVxyXG5cclxubGV0IG1hcCA9IG5ldyBNYXA8UmlnaWRCb2R5Q29sbGlzaW9uVHlwZSwgc3RyaW5nPigpO1xyXG5tYXAuc2V0KFJpZ2lkQm9keUNvbGxpc2lvblR5cGUub25CZWdpbkNvbnRhY3QsIFwib25CZWdpbkNvbnRhY3RcIik7XHJcbm1hcC5zZXQoUmlnaWRCb2R5Q29sbGlzaW9uVHlwZS5vbkVuZENvbnRhY3QsIFwib25FbmRDb250YWN0XCIpO1xyXG5tYXAuc2V0KFJpZ2lkQm9keUNvbGxpc2lvblR5cGUub25QcmVTb2x2ZSwgXCJvblByZVNvbHZlXCIpO1xyXG5tYXAuc2V0KFJpZ2lkQm9keUNvbGxpc2lvblR5cGUub25Qb3N0U29sdmUsIFwib25Qb3N0U29sdmVcIik7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLoh6rlrprkuYkvUmlnaWRCb2R5Q29sbGlzaW9uRXZlbnRcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmlnaWRCb2R5Q29sbGlzaW9uRXZlbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKFJpZ2lkQm9keUNvbGxpc2lvblR5cGUpLCBkaXNwbGF5TmFtZTpcIuWImuS9k+eisOaSnuexu+Wei1wifSlcclxuICAgIGNvbGxpc2lvblR5cGU6UmlnaWRCb2R5Q29sbGlzaW9uVHlwZSA9IFJpZ2lkQm9keUNvbGxpc2lvblR5cGUub25CZWdpbkNvbnRhY3Q7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsIGRpc3BsYXlOYW1lOlwi6Kem5Y+R5LqL5Lu2XCJ9KVxyXG4gICAgZXZlbnRIYW5kbGVyczpbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0gPSBbXTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzW21hcC5nZXQodGhpcy5jb2xsaXNpb25UeXBlKV0gPSBhc3luYyAoLi4uYXJncyk9PntcclxuICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuZXZlbnRIYW5kbGVycywgLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=