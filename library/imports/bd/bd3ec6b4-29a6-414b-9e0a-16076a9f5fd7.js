"use strict";
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