"use strict";
cc._RF.push(module, '579ceeOw5xKP6NamQb0EmS/', 'TableViewMediator');
// framework/tableview/TableViewMediator.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
/**
 * 使用TableView注意事项:
 * 1.设置mask 设置锚点(0, 1)  添加widget并设置top bottom left right都为0
 * 2.设置content 设置锚点(0, 1)  添加widget并设置top left right都为0
 * 3.设置itemNode  设置大小(w,h)　设置锚点(0, 0.5)
 * **/
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTableItem_1 = require("./AbstractTableItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple, executionOrder = _a.executionOrder;
var TableViewMediator = /** @class */ (function (_super) {
    __extends(TableViewMediator, _super);
    function TableViewMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.template = null;
        _this.marginTop = 0;
        _this.marginBottom = 0;
        _this.margin = 0;
        _this.testNum = 0;
        _this.itemAction = false;
        _this.itemHeight = 0;
        _this.list = [];
        _this.firstIndex = 0;
        _this.firstIndexMax = 0;
        _this._datas = [];
        // LIFE-CYCLE CALLBACKS:
        _this.createNodesFinish = false;
        return _this;
    }
    TableViewMediator.prototype.createNodesListener = function (listener) {
        if (this.createNodesFinish) {
            listener();
        }
        else {
            this.node.on("CreateNodesSuccess", function () {
                listener();
            });
        }
    };
    Object.defineProperty(TableViewMediator.prototype, "datas", {
        get: function () {
            return this._datas;
        },
        set: function (value) {
            var _this = this;
            /** 计算最大firstIndexMax */
            this.createNodesListener(function () {
                var num = Math.ceil((_this.scrollView.node.getContentSize().height - _this.marginTop - _this.marginBottom + _this.margin) / (_this.itemHeight + _this.margin));
                _this.firstIndexMax = value.length - num - 1;
                // console.log(this.firstIndexMax,datas.length, this.list.length, num, "wxSub this.firstIndexMax************");
                _this._datas = value.slice(0);
                // this.datas = [1,2,3,4,5,6,7,8,9];
                _this.scrollView.content.height = _this.marginTop + _this.marginBottom + _this.itemHeight * _this._datas.length + _this.margin * (_this._datas.length - 1);
                _this.firstIndex = 0;
                _this.scrollView.scrollToTop();
                _this.list.forEach(function (value1, index) {
                    value1.y = -_this.marginTop - value1.height / 2 - index * (value1.height + _this.margin);
                    if (index >= _this._datas.length) {
                        value1.active = false;
                    }
                });
                _this.updateData();
                if (_this.itemAction) {
                    _this.showAction();
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    TableViewMediator.prototype.createNode = function () {
        var node = cc.instantiate(this.template.node);
        node.active = false;
        this.itemHeight = node.getContentSize().height;
        node.x = 0;
        node.setParent(this.scrollView.content);
        this.list.push(node);
        return node;
    };
    TableViewMediator.prototype.addNode = function (height) {
        var _this = this;
        if (height <= this.scrollView.node.getContentSize().height) {
            this.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                var node = _this.createNode();
                node.y = -height - _this.itemHeight / 2;
                height += _this.itemHeight + _this.margin;
                _this.addNode(height);
            })));
        }
        else {
            var node = this.createNode();
            node.y = -height - this.itemHeight / 2;
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            eventHandler.component = "TableViewMediator";
            eventHandler.handler = "onScrollEvent";
            eventHandler.customEventData = "";
            this.scrollView.scrollEvents.push(eventHandler);
            if (!this.createNodesFinish) {
                this.createNodesFinish = true;
                this.node.emit("CreateNodesSuccess");
            }
        }
    };
    TableViewMediator.prototype.onLoad = function () {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        // let eventHandler = new cc.Component.EventHandler();
        // eventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        // eventHandler.component = "TableViewMediator";
        // eventHandler.handler = "onScrollEvent";
        // eventHandler.customEventData = "";
        // this.scrollView.scrollEvents.push(eventHandler);
        // let itemNode = cc.instantiate(this.template.node);
        // itemNode.active = false;
        // this.itemHeight = itemNode.getContentSize().height;
        // let itemHeightHalf = this.itemHeight/2;
        // /** 计算出view能装下多少个item */
        // let viewSize = this.scrollView.node.getContentSize();
        // let content = this.scrollView.content;
        //
        // let height = this.marginTop;
        // while (true){
        //     if (height > viewSize.height){
        //         break;
        //     }
        //
        //     let node = cc.instantiate(itemNode);
        //     node.x = 0;
        //     node.y = -height - itemHeightHalf;
        //     node.setParent(content);
        //     this.list.push(node);
        //     height += this.itemHeight + this.margin;
        //     // console.log("wx sub===>node.y", node.y);
        // }
        //
        // itemNode.x = 0;
        // itemNode.y = -height - itemHeightHalf;
        // itemNode.setParent(content);
        // this.list.push(itemNode);
        this.addNode(this.marginTop);
        /** 延迟判断 */
        // let self = this;
        // this.scheduleOnce(function () {
        //     self._adjustList();
        // }, 0.1);
        if (this.testNum > 0) {
            var test = [];
            for (var i = 0; i < this.testNum; i++) {
                test.push(i + 1);
            }
            this.datas = test;
        }
    };
    TableViewMediator.prototype._adjustList = function () {
        var viewSize = this.scrollView.node.getContentSize();
        var content = this.scrollView.content;
        var itemHeightHalf = this.itemHeight / 2;
        var height = this.marginTop + (this.itemHeight + this.margin) * this.list.length - this.margin;
        while (height < viewSize.height + this.itemHeight) {
            var node = cc.instantiate(this.template.node);
            node.active = false;
            node.x = 0;
            node.y = -height - itemHeightHalf;
            node.setParent(content);
            this.list.push(node);
            height += this.itemHeight + this.margin;
            if (this._datas.length >= this.list.length) {
                var index = this.list.length - 1;
                var value = this.list[index];
                value.active = true;
                this.updateItem(value, index);
            }
        }
        if (this._datas.length > 0) {
            var num = Math.ceil((viewSize.height - this.marginTop - this.marginBottom + this.margin) / (this.itemHeight + this.margin));
            this.firstIndexMax = this._datas.length - num - 1;
        }
    };
    TableViewMediator.prototype.updateData = function () {
        var arr = this.list.slice(0, Math.min(this._datas.length, this.list.length));
        this.updateItems(arr, 0);
    };
    TableViewMediator.prototype.showAction = function () {
        this.list.slice(0, Math.min(this._datas.length, this.list.length)).forEach(function (value, index) {
            value.scaleX = 0;
            if (value.active) {
                value.runAction(cc.scaleTo(0.3 + (0.08 * index), 1).easing(cc.easeCubicActionInOut()));
            }
            else {
                var comp_1 = value.addComponent(cc.Component);
                comp_1['onEnable'] = function () {
                    value.runAction(cc.scaleTo(0.3 + (0.08 * index), 1).easing(cc.easeCubicActionInOut()));
                };
                comp_1['onDisable'] = function () {
                    comp_1.destroy();
                };
            }
        });
    };
    TableViewMediator.prototype.updateItems = function (arr, index) {
        var _this = this;
        if (index < arr.length) {
            this.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                var node = arr[index];
                node.active = true;
                _this.updateItem(node, _this.firstIndex + index);
                _this.updateItems(arr, index + 1);
            })));
        }
    };
    TableViewMediator.prototype.updateItem = function (node, index) {
        var value = this._datas[index];
        var itemMediator = node.getComponent(AbstractTableItem_1.default);
        itemMediator.upadteItem(value, index);
    };
    TableViewMediator.prototype.onScrollEvent = function (event) {
        // console.log(event, "event");
        var content = this.scrollView.content;
        // let contentHeight = content.getContentSize().height;
        var viewHeight = this.scrollView.node.getContentSize().height;
        /*if ((!this.scrollView.isAutoScrolling() && !this.scrollView.isScrolling()) || content.y < 0 || content.y >= contentHeight - viewHeight){
            return;
        }*/
        var contentY = content.y;
        // console.log(contentY, "contentY");
        /** 判断第1个元素 和 倒数第1个元素的位置 */
        /** 上边界 */
        var itemHeightHalf = this.itemHeight / 2;
        /** 头插入 */
        while (this.firstIndex > 0 && this.list[0].y + this.marginTop + itemHeightHalf < -contentY) {
            var last = this.list.pop();
            last.y = this.list[0].y + this.itemHeight + this.margin;
            this.list.unshift(last);
            this.firstIndex--;
            // console.log("===========>尾移头");
            this.updateItem(last, this.firstIndex);
        }
        /** 尾插入 */
        while (this.firstIndex < this.firstIndexMax && this.list[this.list.length - 1].y - itemHeightHalf - this.marginBottom > -contentY - viewHeight) {
            var first = this.list.shift();
            first.y = this.list[this.list.length - 1].y - this.itemHeight - this.margin;
            this.list.push(first);
            this.firstIndex++;
            // console.log("===========>头移尾", this.list[this.list.length-1].y);
            this.updateItem(first, this.firstIndex + this.list.length - 1);
        }
    };
    __decorate([
        property(AbstractTableItem_1.default)
    ], TableViewMediator.prototype, "template", void 0);
    __decorate([
        property({ type: cc.Integer })
    ], TableViewMediator.prototype, "marginTop", void 0);
    __decorate([
        property({ type: cc.Integer })
    ], TableViewMediator.prototype, "marginBottom", void 0);
    __decorate([
        property({ type: cc.Integer })
    ], TableViewMediator.prototype, "margin", void 0);
    __decorate([
        property
    ], TableViewMediator.prototype, "testNum", void 0);
    __decorate([
        property
    ], TableViewMediator.prototype, "itemAction", void 0);
    TableViewMediator = __decorate([
        ccclass,
        menu("自定义/TableViewMediator"),
        requireComponent(cc.ScrollView),
        disallowMultiple,
        executionOrder(-10)
    ], TableViewMediator);
    return TableViewMediator;
}(cc.Component));
exports.default = TableViewMediator;

cc._RF.pop();