"use strict";
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