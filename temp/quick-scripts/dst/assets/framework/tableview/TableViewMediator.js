
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/tableview/TableViewMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvdGFibGV2aWV3L1RhYmxlVmlld01lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HOzs7OztNQUtNOztBQUVOLHlEQUFvRDtBQUU5QyxJQUFBLEtBQStFLEVBQUUsQ0FBQyxVQUFVLEVBQTNGLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFDLElBQUksVUFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLGNBQWMsb0JBQWlCLENBQUM7QUFPbkc7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUFtUUM7UUFqUUcsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBcUIsSUFBSSxDQUFDO1FBR2xDLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFHZCxrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUdqQixZQUFNLEdBQUcsQ0FBQyxDQUFDO1FBR1gsYUFBTyxHQUFHLENBQUMsQ0FBQztRQUdaLGdCQUFVLEdBQVcsS0FBSyxDQUFDO1FBR25CLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLFVBQUksR0FBa0IsRUFBRSxDQUFDO1FBRWpCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsWUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNwQix3QkFBd0I7UUFFaEIsdUJBQWlCLEdBQUcsS0FBSyxDQUFDOztJQWlPdEMsQ0FBQztJQS9OVywrQ0FBbUIsR0FBM0IsVUFBNEIsUUFBaUI7UUFDekMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUM7WUFDdkIsUUFBUSxFQUFFLENBQUM7U0FDZDthQUFLO1lBQ0Ys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QWlCLENBQUM7dURBQ007SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDO3dEQUNkO0lBR2Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDOzJEQUNYO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUMsQ0FBQztxREFDakI7SUFHWDtRQURDLFFBQVE7c0RBQ0c7SUFHWjtRQURDLFFBQVE7eURBQ2tCO0lBcEJWLGlCQUFpQjtRQUxyQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzdCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDL0IsZ0JBQWdCO1FBQ2hCLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztPQUNDLGlCQUFpQixDQW1RckM7SUFBRCx3QkFBQztDQW5RRCxBQW1RQyxDQW5ROEMsRUFBRSxDQUFDLFNBQVMsR0FtUTFEO2tCQW5Rb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8qKlxyXG4gKiDkvb/nlKhUYWJsZVZpZXfms6jmhI/kuovpobk6XHJcbiAqIDEu6K6+572ubWFzayDorr7nva7plJrngrkoMCwgMSkgIOa3u+WKoHdpZGdldOW5tuiuvue9rnRvcCBib3R0b20gbGVmdCByaWdodOmDveS4ujBcclxuICogMi7orr7nva5jb250ZW50IOiuvue9rumUmueCuSgwLCAxKSAg5re75Yqgd2lkZ2V05bm26K6+572udG9wIGxlZnQgcmlnaHTpg73kuLowXHJcbiAqIDMu6K6+572uaXRlbU5vZGUgIOiuvue9ruWkp+Wwjyh3LGgp44CA6K6+572u6ZSa54K5KDAsIDAuNSlcclxuICogKiovXHJcblxyXG5pbXBvcnQgQWJzdHJhY3RUYWJsZUl0ZW0gZnJvbSBcIi4vQWJzdHJhY3RUYWJsZUl0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eSxtZW51LCByZXF1aXJlQ29tcG9uZW50LCBkaXNhbGxvd011bHRpcGxlLCBleGVjdXRpb25PcmRlcn0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLoh6rlrprkuYkvVGFibGVWaWV3TWVkaWF0b3JcIilcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuU2Nyb2xsVmlldylcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQGV4ZWN1dGlvbk9yZGVyKC0xMClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVWaWV3TWVkaWF0b3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHNjcm9sbFZpZXc6Y2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KEFic3RyYWN0VGFibGVJdGVtKVxyXG4gICAgdGVtcGxhdGU6QWJzdHJhY3RUYWJsZUl0ZW0gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5JbnRlZ2VyfSlcclxuICAgIG1hcmdpblRvcCA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkludGVnZXJ9KVxyXG4gICAgbWFyZ2luQm90dG9tID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuSW50ZWdlcn0pXHJcbiAgICBtYXJnaW4gPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgdGVzdE51bSA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBpdGVtQWN0aW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpdGVtSGVpZ2h0ID0gMDtcclxuXHJcbiAgICBsaXN0OkFycmF5PGNjLk5vZGU+ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBmaXJzdEluZGV4ID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGZpcnN0SW5kZXhNYXggPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGFzID0gW107XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU5vZGVzRmluaXNoID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVOb2Rlc0xpc3RlbmVyKGxpc3RlbmVyOigpPT52b2lkKXtcclxuICAgICAgICBpZiAodGhpcy5jcmVhdGVOb2Rlc0ZpbmlzaCl7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub24oXCJDcmVhdGVOb2Rlc1N1Y2Nlc3NcIiwgKCk9PntcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YXMoKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YXModmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgLyoqIOiuoeeul+acgOWkp2ZpcnN0SW5kZXhNYXggKi9cclxuICAgICAgICB0aGlzLmNyZWF0ZU5vZGVzTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgbGV0IG51bSA9IE1hdGguY2VpbCgodGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgLSB0aGlzLm1hcmdpblRvcCAtIHRoaXMubWFyZ2luQm90dG9tICsgdGhpcy5tYXJnaW4pIC8gKHRoaXMuaXRlbUhlaWdodCt0aGlzLm1hcmdpbikpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0SW5kZXhNYXggPSB2YWx1ZS5sZW5ndGggLSBudW0gLSAxO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZpcnN0SW5kZXhNYXgsZGF0YXMubGVuZ3RoLCB0aGlzLmxpc3QubGVuZ3RoLCBudW0sIFwid3hTdWIgdGhpcy5maXJzdEluZGV4TWF4KioqKioqKioqKioqXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGF0YXMgPSB2YWx1ZS5zbGljZSgwKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5kYXRhcyA9IFsxLDIsMyw0LDUsNiw3LDgsOV07XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmhlaWdodCA9IHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20gKyB0aGlzLml0ZW1IZWlnaHQgKiB0aGlzLl9kYXRhcy5sZW5ndGggKyB0aGlzLm1hcmdpbiAqICh0aGlzLl9kYXRhcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKCh2YWx1ZTEsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTEueSA9IC10aGlzLm1hcmdpblRvcCAtIHZhbHVlMS5oZWlnaHQvMiAtIGluZGV4ICogKHZhbHVlMS5oZWlnaHQgKyB0aGlzLm1hcmdpbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5fZGF0YXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUFjdGlvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTm9kZSgpe1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZW1wbGF0ZS5ub2RlKTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXRlbUhlaWdodCA9IG5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnNjcm9sbFZpZXcuY29udGVudCk7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGROb2RlKGhlaWdodDpudW1iZXIpe1xyXG4gICAgICAgIGlmIChoZWlnaHQgPD0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnkgPSAtaGVpZ2h0IC0gdGhpcy5pdGVtSGVpZ2h0LzI7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgKz0gdGhpcy5pdGVtSGVpZ2h0ICsgdGhpcy5tYXJnaW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5vZGUoaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5jcmVhdGVOb2RlKCk7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IC1oZWlnaHQgLSB0aGlzLml0ZW1IZWlnaHQvMjtcclxuICAgICAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci50YXJnZXQgPSB0aGlzLm5vZGU7IC8v6L+Z5LiqIG5vZGUg6IqC54K55piv5L2g55qE5LqL5Lu25aSE55CG5Luj56CB57uE5Lu25omA5bGe55qE6IqC54K5XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSBcIlRhYmxlVmlld01lZGlhdG9yXCI7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJvblNjcm9sbEV2ZW50XCI7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsRXZlbnRzLnB1c2goZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNyZWF0ZU5vZGVzRmluaXNoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTm9kZXNGaW5pc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoXCJDcmVhdGVOb2Rlc1N1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICAvLyBsZXQgZXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICAvLyBldmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlOyAvL+i/meS4qiBub2RlIOiKgueCueaYr+S9oOeahOS6i+S7tuWkhOeQhuS7o+eggee7hOS7tuaJgOWxnueahOiKgueCuVxyXG4gICAgICAgIC8vIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSBcIlRhYmxlVmlld01lZGlhdG9yXCI7XHJcbiAgICAgICAgLy8gZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcIm9uU2Nyb2xsRXZlbnRcIjtcclxuICAgICAgICAvLyBldmVudEhhbmRsZXIuY3VzdG9tRXZlbnREYXRhID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsRXZlbnRzLnB1c2goZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAvLyBsZXQgaXRlbU5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRlbXBsYXRlLm5vZGUpO1xyXG4gICAgICAgIC8vIGl0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuaXRlbUhlaWdodCA9IGl0ZW1Ob2RlLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0O1xyXG4gICAgICAgIC8vIGxldCBpdGVtSGVpZ2h0SGFsZiA9IHRoaXMuaXRlbUhlaWdodC8yO1xyXG4gICAgICAgIC8vIC8qKiDorqHnrpflh7p2aWV36IO96KOF5LiL5aSa5bCR5LiqaXRlbSAqL1xyXG4gICAgICAgIC8vIGxldCB2aWV3U2l6ZSA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgLy8gbGV0IGNvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGxldCBoZWlnaHQgPSB0aGlzLm1hcmdpblRvcDtcclxuICAgICAgICAvLyB3aGlsZSAodHJ1ZSl7XHJcbiAgICAgICAgLy8gICAgIGlmIChoZWlnaHQgPiB2aWV3U2l6ZS5oZWlnaHQpe1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGl0ZW1Ob2RlKTtcclxuICAgICAgICAvLyAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICAvLyAgICAgbm9kZS55ID0gLWhlaWdodCAtIGl0ZW1IZWlnaHRIYWxmO1xyXG4gICAgICAgIC8vICAgICBub2RlLnNldFBhcmVudChjb250ZW50KTtcclxuICAgICAgICAvLyAgICAgdGhpcy5saXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgLy8gICAgIGhlaWdodCArPSB0aGlzLml0ZW1IZWlnaHQgKyB0aGlzLm1hcmdpbjtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJ3eCBzdWI9PT0+bm9kZS55XCIsIG5vZGUueSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gaXRlbU5vZGUueCA9IDA7XHJcbiAgICAgICAgLy8gaXRlbU5vZGUueSA9IC1oZWlnaHQgLSBpdGVtSGVpZ2h0SGFsZjtcclxuICAgICAgICAvLyBpdGVtTm9kZS5zZXRQYXJlbnQoY29udGVudCk7XHJcbiAgICAgICAgLy8gdGhpcy5saXN0LnB1c2goaXRlbU5vZGUpO1xyXG4gICAgICAgIHRoaXMuYWRkTm9kZSh0aGlzLm1hcmdpblRvcCk7XHJcblxyXG4gICAgICAgIC8qKiDlu7bov5/liKTmlq0gKi9cclxuICAgICAgICAvLyBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICBzZWxmLl9hZGp1c3RMaXN0KCk7XHJcbiAgICAgICAgLy8gfSwgMC4xKTtcclxuICAgICAgICBpZiAodGhpcy50ZXN0TnVtID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRlc3ROdW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0ZXN0LnB1c2goaSsxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFzID0gdGVzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2FkanVzdExpc3QoKXtcclxuICAgICAgICBsZXQgdmlld1NpemUgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGl0ZW1IZWlnaHRIYWxmID0gdGhpcy5pdGVtSGVpZ2h0LzI7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMubWFyZ2luVG9wICsgKHRoaXMuaXRlbUhlaWdodCArIHRoaXMubWFyZ2luKSAqIHRoaXMubGlzdC5sZW5ndGggIC0gdGhpcy5tYXJnaW47XHJcbiAgICAgICAgd2hpbGUgKGhlaWdodCA8IHZpZXdTaXplLmhlaWdodCArIHRoaXMuaXRlbUhlaWdodCl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZW1wbGF0ZS5ub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICAgICAgbm9kZS55ID0gLWhlaWdodCAtIGl0ZW1IZWlnaHRIYWxmO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudChjb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGhlaWdodCArPSB0aGlzLml0ZW1IZWlnaHQgKyB0aGlzLm1hcmdpbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFzLmxlbmd0aCA+PSB0aGlzLmxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubGlzdC5sZW5ndGgtMTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9dGhpcy5saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW0odmFsdWUsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZGF0YXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBNYXRoLmNlaWwoKHZpZXdTaXplLmhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b20gKyB0aGlzLm1hcmdpbikgLyAodGhpcy5pdGVtSGVpZ2h0K3RoaXMubWFyZ2luKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RJbmRleE1heCA9IHRoaXMuX2RhdGFzLmxlbmd0aCAtIG51bSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZURhdGEoKXtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5saXN0LnNsaWNlKDAsIE1hdGgubWluKHRoaXMuX2RhdGFzLmxlbmd0aCwgdGhpcy5saXN0Lmxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbXMoYXJyLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QWN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0LnNsaWNlKDAsIE1hdGgubWluKHRoaXMuX2RhdGFzLmxlbmd0aCwgdGhpcy5saXN0Lmxlbmd0aCkpLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5zY2FsZVggPSAwO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuYWN0aXZlKXtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMysoMC4wOCppbmRleCksIDEpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25Jbk91dCgpKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcCA9IHZhbHVlLmFkZENvbXBvbmVudChjYy5Db21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgY29tcFsnb25FbmFibGUnXSA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucnVuQWN0aW9uKGNjLnNjYWxlVG8oMC4zKygwLjA4KmluZGV4KSwgMSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluT3V0KCkpKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb21wWydvbkRpc2FibGUnXSA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtcyhhcnI6QXJyYXk8Y2MuTm9kZT4sIGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgYXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDApLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBhcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKG5vZGUsIHRoaXMuZmlyc3RJbmRleCtpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1zKGFyciwgaW5kZXgrMSk7XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0obm9kZTpjYy5Ob2RlLCBpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2RhdGFzW2luZGV4XTtcclxuICAgICAgICBsZXQgaXRlbU1lZGlhdG9yID0gbm9kZS5nZXRDb21wb25lbnQoQWJzdHJhY3RUYWJsZUl0ZW0pO1xyXG4gICAgICAgIGl0ZW1NZWRpYXRvci51cGFkdGVJdGVtKHZhbHVlLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNjcm9sbEV2ZW50KGV2ZW50KXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudCwgXCJldmVudFwiKTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xyXG4gICAgICAgIC8vIGxldCBjb250ZW50SGVpZ2h0ID0gY29udGVudC5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcclxuICAgICAgICBsZXQgdmlld0hlaWdodCA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0O1xyXG4gICAgICAgIC8qaWYgKCghdGhpcy5zY3JvbGxWaWV3LmlzQXV0b1Njcm9sbGluZygpICYmICF0aGlzLnNjcm9sbFZpZXcuaXNTY3JvbGxpbmcoKSkgfHwgY29udGVudC55IDwgMCB8fCBjb250ZW50LnkgPj0gY29udGVudEhlaWdodCAtIHZpZXdIZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZID0gY29udGVudC55O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRlbnRZLCBcImNvbnRlbnRZXCIpO1xyXG4gICAgICAgIC8qKiDliKTmlq3nrKwx5Liq5YWD57SgIOWSjCDlgJLmlbDnrKwx5Liq5YWD57Sg55qE5L2N572uICovXHJcbiAgICAgICAgLyoqIOS4iui+ueeVjCAqL1xyXG4gICAgICAgIGxldCBpdGVtSGVpZ2h0SGFsZiA9IHRoaXMuaXRlbUhlaWdodC8yO1xyXG5cclxuICAgICAgICAvKiog5aS05o+S5YWlICovXHJcbiAgICAgICAgd2hpbGUodGhpcy5maXJzdEluZGV4ID4gMCAmJiB0aGlzLmxpc3RbMF0ueSArIHRoaXMubWFyZ2luVG9wICsgaXRlbUhlaWdodEhhbGYgPCAtY29udGVudFkpe1xyXG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRoaXMubGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgbGFzdC55ID0gdGhpcy5saXN0WzBdLnkgKyB0aGlzLml0ZW1IZWlnaHQgKyB0aGlzLm1hcmdpbjtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnVuc2hpZnQobGFzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RJbmRleC0tO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PuWwvuenu+WktFwiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKGxhc3QsIHRoaXMuZmlyc3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog5bC+5o+S5YWlICovXHJcbiAgICAgICAgd2hpbGUodGhpcy5maXJzdEluZGV4IDwgdGhpcy5maXJzdEluZGV4TWF4ICYmIHRoaXMubGlzdFt0aGlzLmxpc3QubGVuZ3RoLTFdLnkgLSBpdGVtSGVpZ2h0SGFsZiAtIHRoaXMubWFyZ2luQm90dG9tID4gLWNvbnRlbnRZIC0gdmlld0hlaWdodCl7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdCA9IHRoaXMubGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICBmaXJzdC55ID0gdGhpcy5saXN0W3RoaXMubGlzdC5sZW5ndGgtMV0ueSAtIHRoaXMuaXRlbUhlaWdodCAtIHRoaXMubWFyZ2luO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QucHVzaChmaXJzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RJbmRleCsrO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PuWktOenu+WwvlwiLCB0aGlzLmxpc3RbdGhpcy5saXN0Lmxlbmd0aC0xXS55KTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtKGZpcnN0LCB0aGlzLmZpcnN0SW5kZXgrdGhpcy5saXN0Lmxlbmd0aC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19