"use strict";
cc._RF.push(module, '6b1ecDYFXlE36An3M1fJwDV', 'NodeEvent');
// framework/component/NodeEvent.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var NodeEventType;
(function (NodeEventType) {
    NodeEventType[NodeEventType["TOUCH_START"] = 0] = "TOUCH_START";
    NodeEventType[NodeEventType["TOUCH_MOVE"] = 1] = "TOUCH_MOVE";
    NodeEventType[NodeEventType["TOUCH_END"] = 2] = "TOUCH_END";
    NodeEventType[NodeEventType["TOUCH_CANCEL"] = 3] = "TOUCH_CANCEL";
    NodeEventType[NodeEventType["MOUSE_DOWN"] = 4] = "MOUSE_DOWN";
    NodeEventType[NodeEventType["MOUSE_MOVE"] = 5] = "MOUSE_MOVE";
    NodeEventType[NodeEventType["MOUSE_ENTER"] = 6] = "MOUSE_ENTER";
    NodeEventType[NodeEventType["MOUSE_LEAVE"] = 7] = "MOUSE_LEAVE";
    NodeEventType[NodeEventType["MOUSE_UP"] = 8] = "MOUSE_UP";
    NodeEventType[NodeEventType["MOUSE_WHEEL"] = 9] = "MOUSE_WHEEL";
    NodeEventType[NodeEventType["POSITION_CHANGED"] = 10] = "POSITION_CHANGED";
    NodeEventType[NodeEventType["ROTATION_CHANGED"] = 11] = "ROTATION_CHANGED";
    NodeEventType[NodeEventType["SCALE_CHANGED"] = 12] = "SCALE_CHANGED";
    NodeEventType[NodeEventType["SIZE_CHANGED"] = 13] = "SIZE_CHANGED";
    NodeEventType[NodeEventType["ANCHOR_CHANGED"] = 14] = "ANCHOR_CHANGED";
    NodeEventType[NodeEventType["CHILD_ADDED"] = 15] = "CHILD_ADDED";
    NodeEventType[NodeEventType["CHILD_REMOVED"] = 16] = "CHILD_REMOVED";
    NodeEventType[NodeEventType["CHILD_REORDER"] = 17] = "CHILD_REORDER";
    NodeEventType[NodeEventType["GROUP_CHANGED"] = 18] = "GROUP_CHANGED";
})(NodeEventType || (NodeEventType = {}));
var map = new Map();
map.set(NodeEventType.TOUCH_START, cc.Node.EventType.TOUCH_START);
map.set(NodeEventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_MOVE);
map.set(NodeEventType.TOUCH_END, cc.Node.EventType.TOUCH_END);
map.set(NodeEventType.TOUCH_CANCEL, cc.Node.EventType.TOUCH_CANCEL);
map.set(NodeEventType.MOUSE_DOWN, cc.Node.EventType.MOUSE_DOWN);
map.set(NodeEventType.MOUSE_MOVE, cc.Node.EventType.MOUSE_MOVE);
map.set(NodeEventType.MOUSE_ENTER, cc.Node.EventType.MOUSE_ENTER);
map.set(NodeEventType.MOUSE_LEAVE, cc.Node.EventType.MOUSE_LEAVE);
map.set(NodeEventType.MOUSE_UP, cc.Node.EventType.MOUSE_UP);
map.set(NodeEventType.MOUSE_WHEEL, cc.Node.EventType.MOUSE_WHEEL);
map.set(NodeEventType.POSITION_CHANGED, cc.Node.EventType.POSITION_CHANGED);
map.set(NodeEventType.SCALE_CHANGED, cc.Node.EventType.SCALE_CHANGED);
map.set(NodeEventType.ANCHOR_CHANGED, cc.Node.EventType.ANCHOR_CHANGED);
map.set(NodeEventType.CHILD_ADDED, cc.Node.EventType.CHILD_ADDED);
map.set(NodeEventType.CHILD_REMOVED, cc.Node.EventType.CHILD_REMOVED);
map.set(NodeEventType.CHILD_REORDER, cc.Node.EventType.CHILD_REORDER);
map.set(NodeEventType.GROUP_CHANGED, cc.Node.EventType.GROUP_CHANGED);
var NodeEvent = /** @class */ (function (_super) {
    __extends(NodeEvent, _super);
    function NodeEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.once = false;
        _this.eventType = NodeEventType.TOUCH_END;
        _this.eventHandlers = [];
        return _this;
    }
    NodeEvent.prototype.onLoad = function () {
        this.node.on(map.get(this.eventType), this.onNodeEvent, this);
    };
    NodeEvent.prototype.onNodeEvent = function (event) {
        cc.Component.EventHandler.emitEvents(this.eventHandlers, event);
        if (this.once) {
            this.offEvent();
            this.destroy();
        }
    };
    NodeEvent.prototype.offEvent = function () {
        this.node.off(map.get(this.eventType), this.onNodeEvent, this);
    };
    NodeEvent.prototype.onDestroy = function () {
        this.offEvent();
    };
    __decorate([
        property
    ], NodeEvent.prototype, "once", void 0);
    __decorate([
        property({ type: cc.Enum(NodeEventType), displayName: "事件类型" })
    ], NodeEvent.prototype, "eventType", void 0);
    __decorate([
        property({ type: cc.Component.EventHandler, displayName: "触发事件" })
    ], NodeEvent.prototype, "eventHandlers", void 0);
    NodeEvent = __decorate([
        ccclass,
        menu("自定义/NodeEvent")
    ], NodeEvent);
    return NodeEvent;
}(cc.Component));
exports.default = NodeEvent;

cc._RF.pop();