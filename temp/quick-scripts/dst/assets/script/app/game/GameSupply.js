
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameSupply.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fa532I+751DgZh0kt4K3xve', 'GameSupply');
// script/app/game/GameSupply.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TableViewMediator_1 = require("../../../framework/tableview/TableViewMediator");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var GameProxy_1 = require("./GameProxy");
var GameSupplyItem_1 = require("./GameSupplyItem");
var World_1 = require("../info/World");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OnceFlag = false;
var GameSupply = /** @class */ (function (_super) {
    __extends(GameSupply, _super);
    function GameSupply() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.useGuideNode = null;
        _this.videoNode = null;
        _this.tableViewMediator = null;
        _this.noUseNode = null;
        _this._focus = 0;
        return _this;
    }
    Object.defineProperty(GameSupply.prototype, "focus", {
        get: function () {
            return this._focus;
        },
        set: function (value) {
            this._focus = value;
            this.tableViewMediator.updateData();
        },
        enumerable: false,
        configurable: true
    });
    GameSupply.prototype.onLoad = function () {
        var _this = this;
        GameSupplyItem_1.default.gameSupply = this;
        /** 加载数据 */
        this.tableViewMediator.datas = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon).filter(function (value) { return value['id'] != 1; }).sort(function (a, b) { return a['order'] - b['order']; });
        cc.game.on("video_4", function () {
            _this.onClickUseSupplyDo();
        }, this);
    };
    GameSupply.prototype.onEnable = function () {
        if (OnceFlag) {
            this.tableViewMediator.showAction();
        }
        OnceFlag = true;
        GameProxy_1.GameProxy.pauseGame = true;
        if (!World_1.World.My.newbies.state("FirstEntrySupply")) {
            this.useGuideNode.x = 0;
            var newbieNode = new cc.Node();
            newbieNode.name = "newbieNode";
            newbieNode.position = this.useGuideNode.convertToWorldSpaceAR(cc.v2());
            cc.director.getScene().addChild(newbieNode);
            /** guideCircle */
            var guideCirclePrefab = cc.loader.getRes("prefab/guideCircle");
            var guideCircleNode = cc.instantiate(guideCirclePrefab);
            guideCircleNode.position = cc.v2();
            newbieNode.addChild(guideCircleNode);
            /** guideSke */
            var guideSkePrefab = cc.loader.getRes("prefab/guideSke");
            var guideSkeNode = cc.instantiate(guideSkePrefab);
            guideSkeNode.position = cc.v2();
            newbieNode.addChild(guideSkeNode);
            this.useGuideNode.x = 0;
            this.videoNode.active = false;
        }
        else {
            this.useGuideNode.x = 50;
            this.videoNode.active = true;
        }
        // this.noUseNode.active = false;
        // this.node.stopAllActions();
        // this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=>{
        //     this.noUseNode.active = true;
        // })));
    };
    GameSupply.prototype.onClickCloseSupply = function () {
        GameProxy_1.GameProxy.pauseGame = false;
        this.node.active = false;
    };
    GameSupply.prototype.onClickUseSupply = function (event, data) {
        console.log("【video】4 装备补给【click】GameSupply UseSupply");
        World_1.World.Storage._videoSign = 4;
        World_1.World.Storage.videoAd_show();
    };
    GameSupply.prototype.onClickUseSupplyDo = function () {
        var item = this.tableViewMediator.datas[this._focus];
        var gameRoleController = window['GameRoleController'];
        gameRoleController.bulletEmitter = item['id'];
        gameRoleController.bulletEmitterDelegate.payload = (World_1.World.My.armory.payloadAddOf(item['id'])) * 3;
        /** 设置弹容量 */
        this.onClickCloseSupply();
        var newbieNode = cc.director.getScene().getChildByName("newbieNode");
        if (newbieNode) {
            newbieNode.destroy();
            World_1.World.My.newbies.finish("FirstEntrySupply");
        }
    };
    GameSupply.prototype.onTest = function () {
        console.log("gameSupply test");
    };
    __decorate([
        property(cc.Node)
    ], GameSupply.prototype, "useGuideNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameSupply.prototype, "videoNode", void 0);
    __decorate([
        property(TableViewMediator_1.default)
    ], GameSupply.prototype, "tableViewMediator", void 0);
    __decorate([
        property(cc.Node)
    ], GameSupply.prototype, "noUseNode", void 0);
    GameSupply = __decorate([
        ccclass
    ], GameSupply);
    return GameSupply;
}(cc.Component));
exports.default = GameSupply;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVN1cHBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQStFO0FBQy9FLHFFQUFrRTtBQUNsRSw2REFBMEQ7QUFDMUQseUNBQXNDO0FBQ3RDLG1EQUE4QztBQUM5Qyx1Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBRXJCO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBc0dDO1FBbkdHLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFHekIsdUJBQWlCLEdBQXFCLElBQUksQ0FBQztRQUkzQyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpCLFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBdUZ2QixDQUFDO0lBcEZHLHNCQUFJLDZCQUFLO2FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O09BTEE7SUFPRCwyQkFBTSxHQUFOO1FBQUEsaUJBUUM7UUFQRyx3QkFBYyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDakMsV0FBVztRQUNYLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsaUNBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxF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dXJjZXNDb250ZW50IjpbImltcG9ydCBUYWJsZVZpZXdNZWRpYXRvciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3RhYmxldmlldy9UYWJsZVZpZXdNZWRpYXRvclwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuL0dhbWVQcm94eVwiO1xyXG5pbXBvcnQgR2FtZVN1cHBseUl0ZW0gZnJvbSBcIi4vR2FtZVN1cHBseUl0ZW1cIjtcclxuaW1wb3J0IHtXb3JsZH0gZnJvbSBcIi4uL2luZm8vV29ybGRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxubGV0IE9uY2VGbGFnID0gZmFsc2U7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdXBwbHkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdXNlR3VpZGVOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdmlkZW9Ob2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShUYWJsZVZpZXdNZWRpYXRvcilcclxuICAgIHRhYmxlVmlld01lZGlhdG9yOlRhYmxlVmlld01lZGlhdG9yID0gbnVsbDtcclxuXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBub1VzZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9jdXMgPSAwO1xyXG5cclxuXHJcbiAgICBnZXQgZm9jdXMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZvY3VzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9mb2N1cyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGFibGVWaWV3TWVkaWF0b3IudXBkYXRlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIEdhbWVTdXBwbHlJdGVtLmdhbWVTdXBwbHkgPSB0aGlzO1xyXG4gICAgICAgIC8qKiDliqDovb3mlbDmja4gKi9cclxuICAgICAgICB0aGlzLnRhYmxlVmlld01lZGlhdG9yLmRhdGFzID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKS5maWx0ZXIodmFsdWUgPT4gdmFsdWVbJ2lkJ10gIT0gMSkuc29ydCgoYSwgYikgPT5hWydvcmRlciddIC0gYlsnb3JkZXInXSk7XHJcblxyXG4gICAgICAgIGNjLmdhbWUub24oXCJ2aWRlb180XCIsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrVXNlU3VwcGx5RG8oKVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoT25jZUZsYWcpe1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlVmlld01lZGlhdG9yLnNob3dBY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT25jZUZsYWcgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVQcm94eS5wYXVzZUdhbWUgPSB0cnVlO1xyXG4gICAgICAgIGlmICghV29ybGQuTXkubmV3Ymllcy5zdGF0ZShcIkZpcnN0RW50cnlTdXBwbHlcIikpe1xyXG4gICAgICAgICAgICB0aGlzLnVzZUd1aWRlTm9kZS54ID0gMDtcclxuICAgICAgICAgICAgbGV0IG5ld2JpZU5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBuZXdiaWVOb2RlLm5hbWUgPSBcIm5ld2JpZU5vZGVcIjtcclxuICAgICAgICAgICAgbmV3YmllTm9kZS5wb3NpdGlvbiA9IHRoaXMudXNlR3VpZGVOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigpKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChuZXdiaWVOb2RlKTtcclxuICAgICAgICAgICAgLyoqIGd1aWRlQ2lyY2xlICovXHJcbiAgICAgICAgICAgIGxldCBndWlkZUNpcmNsZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZ3VpZGVDaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGxldCBndWlkZUNpcmNsZU5vZGUgPSBjYy5pbnN0YW50aWF0ZShndWlkZUNpcmNsZVByZWZhYik7XHJcbiAgICAgICAgICAgIGd1aWRlQ2lyY2xlTm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgIG5ld2JpZU5vZGUuYWRkQ2hpbGQoZ3VpZGVDaXJjbGVOb2RlKTtcclxuICAgICAgICAgICAgLyoqIGd1aWRlU2tlICovXHJcbiAgICAgICAgICAgIGxldCBndWlkZVNrZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZ3VpZGVTa2VcIik7XHJcbiAgICAgICAgICAgIGxldCBndWlkZVNrZU5vZGUgPSBjYy5pbnN0YW50aWF0ZShndWlkZVNrZVByZWZhYik7XHJcbiAgICAgICAgICAgIGd1aWRlU2tlTm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgIG5ld2JpZU5vZGUuYWRkQ2hpbGQoZ3VpZGVTa2VOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy51c2VHdWlkZU5vZGUueCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51c2VHdWlkZU5vZGUueCA9IDUwO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLm5vVXNlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgzKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5ub1VzZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbG9zZVN1cHBseSgpe1xyXG4gICAgICAgIEdhbWVQcm94eS5wYXVzZUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1VzZVN1cHBseShldmVudCwgZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLjgJB2aWRlb+OAkTQg6KOF5aSH6KGl57uZ44CQY2xpY2vjgJFHYW1lU3VwcGx5IFVzZVN1cHBseVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuX3ZpZGVvU2lnbj00XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS52aWRlb0FkX3Nob3coKSBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVXNlU3VwcGx5RG8oKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMudGFibGVWaWV3TWVkaWF0b3IuZGF0YXNbdGhpcy5fZm9jdXNdO1xyXG4gICAgICAgIGxldCBnYW1lUm9sZUNvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddO1xyXG4gICAgICAgIGdhbWVSb2xlQ29udHJvbGxlci5idWxsZXRFbWl0dGVyID0gaXRlbVsnaWQnXTtcclxuICAgICAgICBnYW1lUm9sZUNvbnRyb2xsZXIuYnVsbGV0RW1pdHRlckRlbGVnYXRlLnBheWxvYWQgPSAoV29ybGQuTXkuYXJtb3J5LnBheWxvYWRBZGRPZihpdGVtWydpZCddKSkgKiAzO1xyXG4gICAgICAgIC8qKiDorr7nva7lvLnlrrnph48gKi9cclxuICAgICAgICB0aGlzLm9uQ2xpY2tDbG9zZVN1cHBseSgpO1xyXG4gICAgICAgIGxldCBuZXdiaWVOb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIm5ld2JpZU5vZGVcIik7XHJcbiAgICAgICAgaWYgKG5ld2JpZU5vZGUpe1xyXG4gICAgICAgICAgICBuZXdiaWVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgV29ybGQuTXkubmV3Ymllcy5maW5pc2goXCJGaXJzdEVudHJ5U3VwcGx5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblRlc3QoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVTdXBwbHkgdGVzdFwiKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==