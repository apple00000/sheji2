
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/PropsItemController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd06a8YvgQJJG4ULGjMJqc1Z', 'PropsItemController');
// script/app/home/PropsItemController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTableItem_1 = require("../../../framework/tableview/AbstractTableItem");
var PropsController_1 = require("./PropsController");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropsItemController = /** @class */ (function (_super) {
    __extends(PropsItemController, _super);
    function PropsItemController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propsController = null;
        _this.bgFrameSprite = null;
        _this.iconSprite = null;
        _this.nameLabel = null;
        _this.useNode = null;
        _this.usingNode = null;
        _this.foreverNode = null;
        _this.cdLabel = null;
        _this.iconSpriteFrames = [];
        _this._data = null;
        _this._index = null;
        return _this;
    }
    PropsItemController.prototype.onLoad = function () {
        var _this = this;
        this.schedule(function () {
            if (_this.node.active && _this.usingNode.active && _this._data) {
                var id = _this._data['id'];
                if (World_1.World.My.propInfo.beUsing(id)) {
                    _this.updateCD();
                }
                else {
                    _this.foreverNode.active = false;
                    _this.useNode.active = true;
                    _this.usingNode.active = false;
                }
            }
        }, 0.99);
        cc.game.on("video_2", function () {
            _this.onClickUseDo();
        }, this);
    };
    PropsItemController.prototype.updateCD = function () {
        var cd = Math.floor((World_1.World.My.propInfo.expireTime(this._data['id']) - new Date().getTime()) / 1000);
        var min = Math.floor(cd / 60);
        var sec = cd % 60;
        this.cdLabel.string = "\u5269\u4F59\u8BA1\u65F6 " + (("000" + min).substr(-2) + ":" + ("000" + sec).substr(-2));
    };
    PropsItemController.prototype.upadteItem = function (data, index) {
        this._data = data;
        this._index = index;
        // console.log(data, index);
        var id = data['id'];
        this.iconSprite.spriteFrame = this.iconSpriteFrames[id - 1];
        this.nameLabel.string = data['prop_name'];
        if (data['unlock'] == 0) {
            this.foreverNode.active = true;
            this.useNode.active = false;
            this.usingNode.active = false;
        }
        else if (!World_1.World.My.propInfo.beUsing(id)) {
            this.foreverNode.active = false;
            this.useNode.active = true;
            this.usingNode.active = false;
        }
        else {
            this.foreverNode.active = false;
            this.useNode.active = false;
            this.usingNode.active = true;
            this.updateCD();
        }
    };
    PropsItemController.prototype.onClickDetail = function () {
        console.log("【click】PropsItemController Detail");
        this.propsController.detailLabel.string = this._data['description'];
        this.propsController.detailNode.active = true;
    };
    PropsItemController.prototype.onClickUse = function () {
        console.log("【video】2 道具使用 【click】PropsItemController Use");
        World_1.World.Storage._videoSign = 2;
        World_1.World.Storage.videoAd_show();
    };
    PropsItemController.prototype.onClickUseDo = function () {
        World_1.World.My.propInfo.use(this._data['id']);
        this.upadteItem(this._data, this._index);
    };
    __decorate([
        property(PropsController_1.default)
    ], PropsItemController.prototype, "propsController", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropsItemController.prototype, "bgFrameSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropsItemController.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], PropsItemController.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "useNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "usingNode", void 0);
    __decorate([
        property(cc.Node)
    ], PropsItemController.prototype, "foreverNode", void 0);
    __decorate([
        property(cc.Label)
    ], PropsItemController.prototype, "cdLabel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PropsItemController.prototype, "iconSpriteFrames", void 0);
    PropsItemController = __decorate([
        ccclass
    ], PropsItemController);
    return PropsItemController;
}(AbstractTableItem_1.default));
exports.default = PropsItemController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvUHJvcHNJdGVtQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0ZBQStFO0FBQy9FLHFEQUFnRDtBQUNoRCx1Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBaUQsdUNBQWlCO0lBQWxFO1FBQUEscUVBbUdDO1FBaEdHLHFCQUFlLEdBQW1CLElBQUksQ0FBQztRQUd2QyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLHNCQUFnQixHQUFvQixFQUFFLENBQUM7UUFFL0IsV0FBSyxHQUFHLElBQUksQ0FBQztRQUNiLFlBQU0sR0FBRyxJQUFJLENBQUM7O0lBcUUxQixDQUFDO0lBbkVHLG9DQUFNLEdBQU47UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssRUFBQztnQkFDeEQsSUFBSSxFQUFFLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxhQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUM7b0JBQzlCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbkI7cUJBQUs7b0JBQ0YsS0FBSSxDQUFDLFdBQVcsQ0FB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R2dELDJCQUFpQixHQW1HakU7a0JBbkdvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFic3RyYWN0VGFibGVJdGVtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvdGFibGV2aWV3L0Fic3RyYWN0VGFibGVJdGVtXCI7XHJcbmltcG9ydCBQcm9wc0NvbnRyb2xsZXIgZnJvbSBcIi4vUHJvcHNDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BzSXRlbUNvbnRyb2xsZXIgZXh0ZW5kcyBBYnN0cmFjdFRhYmxlSXRlbSB7XHJcblxyXG4gICAgQHByb3BlcnR5KFByb3BzQ29udHJvbGxlcilcclxuICAgIHByb3BzQ29udHJvbGxlcjpQcm9wc0NvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBiZ0ZyYW1lU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGljb25TcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBuYW1lTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdXNlTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHVzaW5nTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGZvcmV2ZXJOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGNkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGljb25TcHJpdGVGcmFtZXM6W2NjLlNwcml0ZUZyYW1lXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGEgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaW5kZXggPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUgJiYgdGhpcy51c2luZ05vZGUuYWN0aXZlICYmIHRoaXMuX2RhdGEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gdGhpcy5fZGF0YVsnaWQnXTtcclxuICAgICAgICAgICAgICAgIGlmIChXb3JsZC5NeS5wcm9wSW5mby5iZVVzaW5nKGlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDRCgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yZXZlck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2luZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAwLjk5KTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihcInZpZGVvXzJcIiwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tVc2VEbygpXHJcbiAgICAgICAgfSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNEKCl7XHJcbiAgICAgICAgbGV0IGNkID0gTWF0aC5mbG9vcigoV29ybGQuTXkucHJvcEluZm8uZXhwaXJlVGltZSh0aGlzLl9kYXRhWydpZCddKSAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpKS8xMDAwKTtcclxuICAgICAgICBsZXQgbWluID0gTWF0aC5mbG9vcihjZC82MCk7XHJcbiAgICAgICAgbGV0IHNlYyA9IGNkJTYwO1xyXG4gICAgICAgIHRoaXMuY2RMYWJlbC5zdHJpbmcgPSBg5Ymp5L2Z6K6h5pe2ICR7KFwiMDAwXCIrbWluKS5zdWJzdHIoLTIpK1wiOlwiKyhcIjAwMFwiK3NlYykuc3Vic3RyKC0yKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHVwYWR0ZUl0ZW0oZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSBpbmRleDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLCBpbmRleCk7XHJcbiAgICAgICAgbGV0IGlkID0gZGF0YVsnaWQnXTtcclxuICAgICAgICB0aGlzLmljb25TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25TcHJpdGVGcmFtZXNbaWQtMV07XHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gZGF0YVsncHJvcF9uYW1lJ107XHJcbiAgICAgICAgaWYgKGRhdGFbJ3VubG9jayddID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmZvcmV2ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51c2luZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFXb3JsZC5NeS5wcm9wSW5mby5iZVVzaW5nKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcmV2ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51c2luZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZvcmV2ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXNpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ0QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0RldGFpbCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFQcm9wc0l0ZW1Db250cm9sbGVyIERldGFpbFwiKVxyXG5cclxuICAgICAgICB0aGlzLnByb3BzQ29udHJvbGxlci5kZXRhaWxMYWJlbC5zdHJpbmcgPSB0aGlzLl9kYXRhWydkZXNjcmlwdGlvbiddO1xyXG4gICAgICAgIHRoaXMucHJvcHNDb250cm9sbGVyLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVXNlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJB2aWRlb+OAkTIg6YGT5YW35L2/55SoIOOAkGNsaWNr44CRUHJvcHNJdGVtQ29udHJvbGxlciBVc2VcIilcclxuXHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5fdmlkZW9TaWduPTJcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLnZpZGVvQWRfc2hvdygpIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tVc2VEbygpe1xyXG4gICAgICAgIFdvcmxkLk15LnByb3BJbmZvLnVzZSh0aGlzLl9kYXRhWydpZCddKTtcclxuICAgICAgICB0aGlzLnVwYWR0ZUl0ZW0odGhpcy5fZGF0YSwgdGhpcy5faW5kZXgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==