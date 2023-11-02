
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/HomeController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66c32PpR9NFyZaVgsff9cCS', 'HomeController');
// script/app/home/HomeController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Extend_1 = require("../../../framework/extend/Extend");
var Facade_1 = require("../../../framework/facade/Facade");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var Enemy_1 = require("../entities/enemy/Enemy");
var Music_1 = require("../../../framework/audio/Music");
var MusicPaths_1 = require("../config/MusicPaths");
var World_1 = require("../info/World");
var Actions_1 = require("../../../framework/actions/Actions");
var GameProxy_1 = require("../game/GameProxy");
var WeaponLayerController_1 = require("./WeaponLayerController");
var BulletEmitter_1 = require("../entities/bulletEmitter/BulletEmitter");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OnceFlag = false;
var ShowCount = 0;
var HomeController = /** @class */ (function (_super) {
    __extends(HomeController, _super);
    function HomeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startGameNode = null;
        _this.weaponStartNode = null;
        _this.roleHeadNode = null;
        _this.enemyLayer = null;
        _this.doorSke = null;
        _this.bottomNode = null;
        _this.centerNode = null;
        _this.blockNode = null;
        _this.bottomLayers = [];
        _this.upIconNodes = [];
        _this.weaponLayerController = null;
        _this.propButtonNode = null;
        _this.fightButtonNode = null;
        _this.topNode = null;
        _this.rightNode = null;
        return _this;
    }
    HomeController.prototype.onDestroy = function () {
        OnceFlag = true;
    };
    // LIFE-CYCLE CALLBACKS:
    HomeController.prototype.onLoad = function () {
        var _this = this;
        GameProxy_1.GameProxy.firstAidFlag = true;
        this.weaponStartNode.active = true;
        this.weaponStartNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.35, 0.91), cc.scaleTo(0.35, 1))));
        this.weaponStartNode.active = false;
        this.topNode.y = cc.view.getVisibleSize().height / 2 + 250;
        this.rightNode.x = 289 + 200;
        this.bottomNode.y = -this.bottomNode.height / 2 - cc.view.getVisibleSize().height / 2;
        this.centerNode.x = -cc.view.getVisibleSize().width;
        this.blockNode.active = true;
        this.upIconNodes.forEach(function (value) {
            value.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(0, 15)), cc.moveBy(0.5, cc.v2(0, -15)))));
            value.active = false;
        });
        /** 生成敌人 */
        var arr = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.StartEnemy).slice(0);
        var action = cc.repeatForever(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
            if (arr.length > 0) {
                var item_1 = arr.shift();
                var id_1 = item_1['id'];
                var prefabPath = 'prefab/entities/enemy/enemy' + id_1;
                cc.loader.loadRes(prefabPath, cc.Prefab, function (error, resource) {
                    if (error == null) {
                        // console.log("id===>"+id);
                        var node = cc.instantiate(resource);
                        var enemy_1 = node.getComponent(Enemy_1.default);
                        enemy_1.onLoad = function () { };
                        enemy_1.start = function () { };
                        enemy_1.onEnable = function () { };
                        enemy_1.update = function () { };
                        _this.enemyLayer.addChild(node);
                        enemy_1.init(id_1);
                        enemy_1.stiff = true;
                        enemy_1.playWalk();
                        var startPos = cc.v2(item_1['cd_sx'], item_1['cd_sy']);
                        var endPos = cc.v2(item_1['cd_ex'], item_1['cd_ey']);
                        var sub = endPos.sub(startPos);
                        var rotation_1 = 90 - cc.misc.radiansToDegrees(Math.atan2(sub.y, sub.x));
                        var distance = sub.mag();
                        var speed = enemy_1.moveSpeed * 15;
                        var duration = distance / speed;
                        node.position = startPos;
                        node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
                            enemy_1.node.rotation = rotation_1;
                        }), cc.moveTo(duration, endPos), cc.callFunc(function () {
                            enemy_1.node.rotation = rotation_1 + 180;
                        }), cc.moveTo(duration, startPos))));
                    }
                });
            }
            else {
                _this.node.stopActionByTag(2583);
            }
        })));
        action.setTag(2583);
        this.node.runAction(action);
        this.showUpIcon();
        var bulletEmitterType = 2;
        var weaponConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon).filter(function (value) { return value['id'] != 1; }).sort((function (a, b) { return b['unlock'] - a['unlock']; }));
        for (var _i = 0, weaponConfig_1 = weaponConfig; _i < weaponConfig_1.length; _i++) {
            var item = weaponConfig_1[_i];
            if (World_1.World.Storage.gameLevel >= item['unlock']) {
                bulletEmitterType = item['id'];
                break;
            }
        }
        if (bulletEmitterType > 7) {
            bulletEmitterType = 7;
        }
        cc.loader.loadRes('prefab/entities/bullet/bullet' + bulletEmitterType);
        if (bulletEmitterType == BulletEmitter_1.default.TYPES.LiZiPao) {
            cc.loader.loadRes('prefab/entities/bullet/bullet108');
        }
        else if (bulletEmitterType == BulletEmitter_1.default.TYPES.HuoJianTong) {
            cc.loader.loadRes('prefab/entities/explosive/explosive9');
        }
        else if (bulletEmitterType == BulletEmitter_1.default.TYPES.JuJiQiang) {
            cc.loader.loadRes('prefab/entities/bullet/fire7');
        }
        cc.game.on("video_8", function () {
            _this.onClickWeaponStartDo();
        }, this);
    };
    HomeController.prototype.start = function () {
        this.openDoor();
    };
    HomeController.prototype.openDoor = function () {
        var _this = this;
        console.log("openDoor..");
        Music_1.Music.setBgm(MusicPaths_1.MusicPaths.HomeBg);
        var skeName = "animation";
        if (OnceFlag) {
            skeName = "opened";
        }
        else {
            Music_1.Music.playSFX("sound/msc_openDoor", 2);
        }
        this.doorSke.node.active = true;
        this.doorSke.setCompleteListener(function (trackEntry, loop) {
            _this.playEntry();
        });
        this.doorSke.setAnimation(0, skeName, false);
    };
    HomeController.prototype.playNodeAction = function (node) {
        node.stopAllActions();
        var cycleRotation = Actions_1.default.cycleAction(cc.rotateTo, 0, 0, 8, 360 / 2, 8, 0);
        var cycleScale = Actions_1.default.cycleAction(cc.scaleTo, 1, 1, 0.1, 1 / 0.8, 0, 0, 0.5);
        node.runAction(cycleRotation);
        node.runAction(cycleScale);
    };
    HomeController.prototype.playNodeActionStart = function () {
        var _this = this;
        this.startGameNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.35, 0.91), cc.scaleTo(0.35, 1))));
        this.schedule(function () {
            _this.playNodeAction(_this.propButtonNode);
        }, 3);
    };
    HomeController.prototype.playEntry = function () {
        var _this = this;
        console.log("playEntry...");
        var speed = 700;
        var promises = [];
        var distance = 250 + this.topNode.height / 2;
        if (Extend_1.ext.isIphoneX) {
            distance += 66;
        }
        promises.push(this.topNode.runActionAwait(cc.moveBy(distance / speed, cc.v2(0, -distance))));
        promises.push(this.rightNode.runActionAwait(cc.moveBy(200 / speed, cc.v2(-200, 0))));
        promises.push(this.bottomNode.runActionAwait(cc.moveBy(this.bottomNode.height / speed, cc.v2(0, this.bottomNode.height))));
        promises.push(this.centerNode.runActionAwait(cc.moveTo(cc.view.getVisibleSize().width / speed, cc.v2(0, 0))));
        Promise.all(promises).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var newbieNode, guideCirclePrefab, guideCircleNode, guideSkePrefab, guideSkeNode, show, unlocks, _i, unlocks_1, item;
            var _this = this;
            return __generator(this, function (_a) {
                this.playNodeActionStart();
                if (!World_1.World.My.newbies.state("FirstEntryHome")) {
                    newbieNode = new cc.Node();
                    newbieNode.name = "newbieNode";
                    newbieNode.position = this.startGameNode.convertToWorldSpaceAR(cc.v2());
                    cc.director.getScene().addChild(newbieNode);
                    guideCirclePrefab = cc.loader.getRes("prefab/guideCircle");
                    guideCircleNode = cc.instantiate(guideCirclePrefab);
                    guideCircleNode.position = cc.v2();
                    newbieNode.addChild(guideCircleNode);
                    guideSkePrefab = cc.loader.getRes("prefab/guideSke");
                    guideSkeNode = cc.instantiate(guideSkePrefab);
                    guideSkeNode.position = cc.v2();
                    newbieNode.addChild(guideSkeNode);
                }
                /*if (OnceFlag){
                    if (!World.My.newbies.state("FirstRoleUp")){
                        let newbieNode = new cc.Node();
                        newbieNode.name = "newbieNode";
                        newbieNode.position = this.roleHeadNode.convertToWorldSpaceAR(cc.v2());
                        cc.director.getScene().addChild(newbieNode);
                        /!** guideCircle *!/
                        let guideCirclePrefab = cc.loader.getRes("prefab/guideCircle");
                        let guideCircleNode = cc.instantiate(guideCirclePrefab);
                        guideCircleNode.position = cc.v2();
                        newbieNode.addChild(guideCircleNode);
                        /!** guideSke *!/
                        let guideSkePrefab = cc.loader.getRes("prefab/guideSke");
                        let guideSkeNode = cc.instantiate(guideSkePrefab);
                        guideSkeNode.position = cc.v2();
                        newbieNode.addChild(guideSkeNode);
                    }
                }*/
                this.blockNode.active = false;
                if (!cc.director.getScene().getChildByName("newbieNode")) {
                    if (!OnceFlag || ShowCount % 3 === 2) {
                        ShowCount = 0;
                        show = true;
                        unlocks = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Prop).filter(function (value) { return value['id'] != 7 && value['id'] != 8 && value['id'] != 10 && value['unlock'] != 0; });
                        for (_i = 0, unlocks_1 = unlocks; _i < unlocks_1.length; _i++) {
                            item = unlocks_1[_i];
                            if (World_1.World.My.propInfo.beUsing(item['id'])) {
                                show = false;
                                break;
                            }
                        }
                        if (show) {
                            this.blockNode.active = true;
                            this.node.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
                                Facade_1.default.executeCommand("OpenViewCommand", "prefab/recommendProps");
                                _this.blockNode.active = false;
                            })));
                        }
                    }
                    else {
                        ShowCount++;
                    }
                }
                return [2 /*return*/];
            });
        }); });
    };
    HomeController.prototype.playExit = function () {
        this.blockNode.active = true;
        var newbieNode = cc.director.getScene().getChildByName("newbieNode");
        if (newbieNode) {
            newbieNode.destroy();
            World_1.World.My.newbies.finish("FirstEntryHome");
        }
        Facade_1.default.executeCommand("LoadSceneCommand", "GameScene");
        /*let whiteNode = this.whiteNode;
        whiteNode.active = true;
        whiteNode.removeFromParent(false);
        cc.director.getScene().addChild(whiteNode);
        whiteNode.position = cc.visibleRect.center;
        whiteNode.opacity = 0;
        whiteNode.runAction(cc.sequence(cc.fadeTo(0.5, 255), cc.callFunc(()=>{
            Facade.executeCommand("LoadSceneCommand", "GameScene");
        }), cc.delayTime(0.2), cc.fadeTo(0.5, 0), cc.callFunc(()=>{
            whiteNode.destroy();
        })));*/
        /*let promises = [];
        let speed = 700;
        let distance = 250 + this.topNode.height/2;
        if(ext.isIphoneX){
            distance += 66;
        }
        let moveSpeed = 1200;
        for (let i=0; i<this.bottomLayers.length; i++){
            let node = this.bottomLayers[i];
            node.stopAllActions();
            promises.push(node.runActionAwait(cc.moveTo(Math.abs(node.y - node.height/2+ this.bottomNode.height/2)/moveSpeed, cc.v2(0, -node.height/2 + this.bottomNode.height/2))))
        }
        promises.push(this.topNode.runActionAwait(cc.moveBy(distance/speed, cc.v2(0, distance))));
        promises.push(this.bottomNode.runActionAwait(cc.moveBy(this.bottomNode.height/speed, cc.v2(0, -this.bottomNode.height))));
        promises.push(this.rightNode.runActionAwait(cc.moveBy(200/speed, cc.v2(200, 0))));
        promises.push(this.centerNode.runActionAwait(cc.moveTo(cc.view.getVisibleSize().width/speed, cc.v2(-cc.view.getVisibleSize().width, 0))));
        Promise.all(promises).then(res=>{
            this.node.runAction(cc.sequence(cc.scaleTo(1, 1/0.4), cc.callFunc(()=>{
                //切换场景
                Facade.executeCommand("LoadSceneCommand", "GameScene");
            })));
        });*/
    };
    HomeController.prototype.onToggleEvent = function (toggle, data) {
        var _this = this;
        data = parseInt(data);
        // console.log(toggle.node.name, toggle.isChecked);
        /** 其他对象关闭，然后再处理自己 */
        var moveSpeed = 1200;
        var promises = [];
        for (var i = 0; i < this.bottomLayers.length; i++) {
            var node_1 = this.bottomLayers[i];
            node_1.stopAllActions();
            if (i != data - 1) {
                promises.push(node_1.runActionAwait(cc.moveTo(Math.abs(node_1.y - node_1.height / 2 + this.bottomNode.height / 2) / moveSpeed, cc.v2(0, -node_1.height / 2 + this.bottomNode.height / 2))));
            }
        }
        var node = this.bottomLayers[data - 1];
        var destPos = cc.v2(0, -node.height / 2 + this.bottomNode.height / 2);
        if (toggle.isChecked) {
            destPos.y = node.height / 2 + this.bottomNode.height / 2;
            this.upIconNodes.forEach(function (value) { return value.active = false; });
        }
        if ((data == 2 && !toggle.isChecked) || data != 2) {
            this.startGameNode.active = true;
            this.weaponStartNode.active = false;
        }
        promises.push(node.runActionAwait(cc.moveTo(Math.abs(destPos.y - node.y) / moveSpeed, destPos)));
        Promise.all(promises).then(function (res) {
            console.log("finish.");
            if (!toggle.isChecked) {
                _this.showUpIcon();
            }
            else {
                if (data == 2) {
                    _this.startGameNode.active = false;
                    _this.weaponStartNode.active = true;
                }
            }
            if (data == 1) {
                var newbieNode_1 = cc.director.getScene().getChildByName("newbieNode");
                if (newbieNode_1) {
                    _this.blockNode.active = true;
                    newbieNode_1.getChildByName("guideSke").active = false;
                    newbieNode_1.runAction(cc.sequence(cc.moveTo(0.5, _this.fightButtonNode.convertToWorldSpaceAR(cc.v2())), cc.callFunc(function () {
                        _this.blockNode.active = false;
                        newbieNode_1.getChildByName("guideSke").active = true;
                    })));
                }
            }
        });
    };
    HomeController.prototype.showUpIcon = function () {
        this.upIconNodes.forEach(function (value) { return value.active = true; });
        var weaponConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon);
        var config = weaponConfig[0];
        var weaponUpConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp);
        var hpCanUp = World_1.World.Storage.HpLv < config['lv_limit'] && World_1.World.Storage.goldCount >= weaponUpConfig[World_1.World.Storage.HpLv - 1]['life_expend'];
        var adCanUp = World_1.World.Storage.ADLv < config['lv_limit'] && World_1.World.Storage.goldCount >= weaponUpConfig[World_1.World.Storage.ADLv - 1]['life_expend'];
        this.upIconNodes[0].active = hpCanUp || adCanUp;
        this.upIconNodes[1].active = false;
        for (var i = 1; i < weaponConfig.length; i++) {
            var cfg = weaponConfig[i];
            var bLock = World_1.World.Storage.gameLevel < cfg['unlock'];
            var firePowerLv = World_1.World.My.armory.levelOfEmitterFirePower(cfg['id']);
            var fireCanUp = firePowerLv < cfg['lv_limit'] && World_1.World.Storage.goldCount >= weaponUpConfig[firePowerLv - 1]['fire_expend'];
            var powerLv = World_1.World.My.armory.levelOfEmitterPower(cfg['id']);
            var powerCanUp = powerLv < cfg['lv_limit'] && World_1.World.Storage.goldCount >= weaponUpConfig[powerLv - 1]['power_expend'];
            if (!bLock && (fireCanUp || powerCanUp)) {
                this.upIconNodes[1].active = true;
                break;
            }
        }
        var goldUpConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.GoldUp);
        var goldCanUp = World_1.World.Storage.goldLv < goldUpConfig.length && World_1.World.Storage.goldCount >= goldUpConfig[World_1.World.Storage.goldLv - 1]['gvalue_expend'];
        var earnCanUp = World_1.World.Storage.dayEarnLv < goldUpConfig.length && World_1.World.Storage.goldCount >= goldUpConfig[World_1.World.Storage.dayEarnLv - 1]['on_hook_expend'];
        this.upIconNodes[2].active = goldCanUp || earnCanUp;
    };
    HomeController.prototype.onTouchBG = function (event, data) {
        if (!this.weaponStartNode.active) {
            var newbieNode = cc.director.getScene().getChildByName("newbieNode");
            if (newbieNode) {
                this.playExit();
            }
            else {
                Facade_1.default.executeCommand("OpenViewCommand", "prefab/recommend");
            }
        }
    };
    HomeController.prototype.onClickWeaponStart = function (event, data) {
        console.log("【video】8 高爆武器开局【click】HomeController WeaponStart");
        World_1.World.Storage._videoSign = 8;
        World_1.World.Storage.videoAd_show();
    };
    HomeController.prototype.onClickWeaponStartDo = function () {
        GameProxy_1.GameProxy.prepareGun = this.weaponLayerController.focusGunID();
        this.playExit();
    };
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "startGameNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "weaponStartNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "roleHeadNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "enemyLayer", void 0);
    __decorate([
        property(sp.Skeleton)
    ], HomeController.prototype, "doorSke", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "bottomNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "centerNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "blockNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "bottomLayers", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "upIconNodes", void 0);
    __decorate([
        property(WeaponLayerController_1.default)
    ], HomeController.prototype, "weaponLayerController", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "propButtonNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "fightButtonNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "topNode", void 0);
    __decorate([
        property(cc.Node)
    ], HomeController.prototype, "rightNode", void 0);
    HomeController = __decorate([
        ccclass
    ], HomeController);
    return HomeController;
}(cc.Component));
exports.default = HomeController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvSG9tZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJEQUFxRDtBQUNyRCwyREFBc0Q7QUFDdEQscUVBQWtFO0FBQ2xFLDZEQUEwRDtBQUMxRCxpREFBNEM7QUFDNUMsd0RBQXFEO0FBQ3JELG1EQUFnRDtBQUNoRCx1Q0FBb0M7QUFDcEMsOERBQXlEO0FBQ3pELCtDQUE0QztBQUM1QyxpRUFBNEQ7QUFDNUQseUVBQW9FO0FBRTlELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNyQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFHbEI7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUEwWUM7UUF4WUcsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IscUJBQWUsR0FBVyxJQUFJLENBQUM7UUFHL0Isa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFlLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBR3pCLGtCQUFZLEdBQWEsRUFBRSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsRUFBRSxDQUFDO1FBRzNCLDJCQUFxQixHQUF5QixJQUFJLENBQUM7UUFHbkQsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFHOUIscUJBQWUsR0FBVyxJQUFJLENBQUM7UUFHL0IsYUFBTyxHQUFXLElBQUksQ0FBQztRQUd2QixlQUFTLEdBQVcsSUFBSSxDQUFDOztJQThWN0IsQ0FBQztJQTNWRyxrQ0FBUyxHQUFUO1FBQ0ksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lB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UTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDUztJQUczQjtRQURDLFFBQVEsQ0FBQywrQkFBcUIsQ0FBQztpRUFDbUI7SUFHbkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNhO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztJQTVDUixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBMFlsQztJQUFELHFCQUFDO0NBMVlELEFBMFlDLENBMVkyQyxFQUFFLENBQUMsU0FBUyxHQTBZdkQ7a0JBMVlvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IEZhY2FkZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2ZhY2FkZS9GYWNhZGVcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtFeGNlbFRhYmxlTmFtZXN9IGZyb20gXCIuLi9jb25maWcvRXhjZWxUYWJsZU5hbWVzXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi4vZW50aXRpZXMvZW5lbXkvRW5lbXlcIjtcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5pbXBvcnQge011c2ljUGF0aHN9IGZyb20gXCIuLi9jb25maWcvTXVzaWNQYXRoc1wiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQgQWN0aW9ucyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2FjdGlvbnMvQWN0aW9uc1wiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4uL2dhbWUvR2FtZVByb3h5XCI7XHJcbmltcG9ydCBXZWFwb25MYXllckNvbnRyb2xsZXIgZnJvbSBcIi4vV2VhcG9uTGF5ZXJDb250cm9sbGVyXCI7XHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxubGV0IE9uY2VGbGFnID0gZmFsc2U7XHJcbmxldCBTaG93Q291bnQgPSAwO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdGFydEdhbWVOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgd2VhcG9uU3RhcnROb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcm9sZUhlYWROb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZW5lbXlMYXllcjpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBkb29yU2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJvdHRvbU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjZW50ZXJOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmxvY2tOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYm90dG9tTGF5ZXJzOltjYy5Ob2RlXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdXBJY29uTm9kZXM6W2NjLk5vZGVdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFdlYXBvbkxheWVyQ29udHJvbGxlcilcclxuICAgIHdlYXBvbkxheWVyQ29udHJvbGxlcjpXZWFwb25MYXllckNvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJvcEJ1dHRvbk5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmaWdodEJ1dHRvbk5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0b3BOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcmlnaHROb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBPbmNlRmxhZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4vLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lUHJveHkuZmlyc3RBaWRGbGFnID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvblN0YXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2VhcG9uU3RhcnROb2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zNSwgMC45MSksIGNjLnNjYWxlVG8oMC4zNSwgMSkpKSk7XHJcbiAgICAgICAgdGhpcy53ZWFwb25TdGFydE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b3BOb2RlLnkgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0LzIgKyAyNTA7XHJcbiAgICAgICAgdGhpcy5yaWdodE5vZGUueCA9IDI4OSArIDIwMDtcclxuICAgICAgICB0aGlzLmJvdHRvbU5vZGUueSA9IC10aGlzLmJvdHRvbU5vZGUuaGVpZ2h0LzIgLSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0LzI7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJOb2RlLnggID0gLWNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aDtcclxuICAgICAgICB0aGlzLmJsb2NrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBJY29uTm9kZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjUsIGNjLnYyKDAsIDE1KSksIGNjLm1vdmVCeSgwLjUsIGNjLnYyKDAsLTE1KSkpKSk7XHJcbiAgICAgICAgICAgIHZhbHVlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKiog55Sf5oiQ5pWM5Lq6ICovXHJcbiAgICAgICAgbGV0IGFyciA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlN0YXJ0RW5lbXkpLnNsaWNlKDApO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gYXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpdGVtWydpZCddO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZWZhYlBhdGggPSAncHJlZmFiL2VudGl0aWVzL2VuZW15L2VuZW15JytpZDtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHByZWZhYlBhdGgsIGNjLlByZWZhYiwgKGVycm9yLCByZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZD09PT5cIitpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSA8RW5lbXk+bm9kZS5nZXRDb21wb25lbnQoRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteS5vbkxvYWQgPSAoKT0+e307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15LnN0YXJ0ID0gKCk9Pnt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteS5vbkVuYWJsZSA9ICgpPT57fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkudXBkYXRlID0gKCk9Pnt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15TGF5ZXIuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15LmluaXQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteS5zdGlmZiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15LnBsYXlXYWxrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGNjLnYyKGl0ZW1bJ2NkX3N4J10sIGl0ZW1bJ2NkX3N5J10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjIoaXRlbVsnY2RfZXgnXSwgaXRlbVsnY2RfZXknXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdWIgPSBlbmRQb3Muc3ViKHN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdGF0aW9uID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMihzdWIueSwgc3ViLngpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gc3ViLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3BlZWQgPSBlbmVteS5tb3ZlU3BlZWQqMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGRpc3RhbmNlL3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gc3RhcnRQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15Lm5vZGUucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksY2MubW92ZVRvKGR1cmF0aW9uLCBlbmRQb3MpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkubm9kZS5yb3RhdGlvbiA9IHJvdGF0aW9uKzE4MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGNjLm1vdmVUbyhkdXJhdGlvbiwgc3RhcnRQb3MpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDI1ODMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDI1ODMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLnNob3dVcEljb24oKTtcclxuICAgICAgICBsZXQgYnVsbGV0RW1pdHRlclR5cGUgPSAyO1xyXG4gICAgICAgIGxldCB3ZWFwb25Db25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5XZWFwb24pLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZVsnaWQnXSAhPSAxKS5zb3J0KCgoYSwgYikgPT4gYlsndW5sb2NrJ10gLSBhWyd1bmxvY2snXSkpO1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygd2VhcG9uQ29uZmlnKXtcclxuICAgICAgICAgICAgaWYgKFdvcmxkLlN0b3JhZ2UuZ2FtZUxldmVsID49IGl0ZW1bJ3VubG9jayddKXtcclxuICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXJUeXBlID0gaXRlbVsnaWQnXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWxsZXRFbWl0dGVyVHlwZSA+IDcpe1xyXG4gICAgICAgICAgICBidWxsZXRFbWl0dGVyVHlwZSA9IDc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldCcrYnVsbGV0RW1pdHRlclR5cGUpXHJcbiAgICAgICAgaWYgKGJ1bGxldEVtaXR0ZXJUeXBlID09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuTGlaaVBhbyl7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2J1bGxldDEwOCcpXHJcbiAgICAgICAgfWVsc2UgaWYgKGJ1bGxldEVtaXR0ZXJUeXBlID09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuSHVvSmlhblRvbmcpe1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygncHJlZmFiL2VudGl0aWVzL2V4cGxvc2l2ZS9leHBsb3NpdmU5JylcclxuICAgICAgICB9ZWxzZSBpZiAoYnVsbGV0RW1pdHRlclR5cGUgPT0gQnVsbGV0RW1pdHRlci5UWVBFUy5KdUppUWlhbmcpe1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygncHJlZmFiL2VudGl0aWVzL2J1bGxldC9maXJlNycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy5nYW1lLm9uKFwidmlkZW9fOFwiLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja1dlYXBvblN0YXJ0RG8oKVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICB0aGlzLm9wZW5Eb29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRvb3IoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW5Eb29yLi5cIik7XHJcbiAgICAgICAgTXVzaWMuc2V0QmdtKE11c2ljUGF0aHMuSG9tZUJnKTtcclxuICAgICAgICBsZXQgc2tlTmFtZSA9IFwiYW5pbWF0aW9uXCI7XHJcbiAgICAgICAgaWYgKE9uY2VGbGFnKXtcclxuICAgICAgICAgICAgc2tlTmFtZSA9IFwib3BlbmVkXCI7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBNdXNpYy5wbGF5U0ZYKFwic291bmQvbXNjX29wZW5Eb29yXCIsIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRvb3JTa2Uubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZG9vclNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlFbnRyeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZG9vclNrZS5zZXRBbmltYXRpb24oMCwgc2tlTmFtZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheU5vZGVBY3Rpb24obm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgbGV0IGN5Y2xlUm90YXRpb24gPSBBY3Rpb25zLmN5Y2xlQWN0aW9uKGNjLnJvdGF0ZVRvLCAwLCAwLCA4LCAzNjAvMiwgOCwgMCk7XHJcbiAgICAgICAgbGV0IGN5Y2xlU2NhbGUgPSBBY3Rpb25zLmN5Y2xlQWN0aW9uKGNjLnNjYWxlVG8sIDEsIDEsIDAuMSwgMS8wLjgsIDAsIDAsIDAuNSk7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY3ljbGVSb3RhdGlvbik7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY3ljbGVTY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5Tm9kZUFjdGlvblN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5zdGFydEdhbWVOb2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4zNSwgMC45MSksIGNjLnNjYWxlVG8oMC4zNSwgMSkpKSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlOb2RlQWN0aW9uKHRoaXMucHJvcEJ1dHRvbk5vZGUpO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlFbnRyeSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheUVudHJ5Li4uXCIpO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IDcwMDtcclxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSAyNTAgKyB0aGlzLnRvcE5vZGUuaGVpZ2h0LzI7XHJcbiAgICAgICAgaWYoZXh0LmlzSXBob25lWCl7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlICs9IDY2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMudG9wTm9kZS5ydW5BY3Rpb25Bd2FpdChjYy5tb3ZlQnkoZGlzdGFuY2Uvc3BlZWQsIGNjLnYyKDAsIC1kaXN0YW5jZSkpKSk7XHJcblxyXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5yaWdodE5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZUJ5KDIwMC9zcGVlZCwgY2MudjIoLTIwMCwgMCkpKSk7XHJcblxyXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5ib3R0b21Ob2RlLnJ1bkFjdGlvbkF3YWl0KGNjLm1vdmVCeSh0aGlzLmJvdHRvbU5vZGUuaGVpZ2h0L3NwZWVkLCBjYy52MigwLCB0aGlzLmJvdHRvbU5vZGUuaGVpZ2h0KSkpKTtcclxuXHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmNlbnRlck5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZVRvKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC9zcGVlZCwgY2MudjIoMCwgMCkpKSk7XHJcblxyXG5cclxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihhc3luYyByZXM9PntcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZUFjdGlvblN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGlmICghV29ybGQuTXkubmV3Ymllcy5zdGF0ZShcIkZpcnN0RW50cnlIb21lXCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdiaWVOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUubmFtZSA9IFwibmV3YmllTm9kZVwiO1xyXG4gICAgICAgICAgICAgICAgbmV3YmllTm9kZS5wb3NpdGlvbiA9IHRoaXMuc3RhcnRHYW1lTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoKSk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5ld2JpZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLyoqIGd1aWRlQ2lyY2xlICovXHJcbiAgICAgICAgICAgICAgICBsZXQgZ3VpZGVDaXJjbGVQcmVmYWIgPSBjYy5sb2FkZXIuZ2V0UmVzKFwicHJlZmFiL2d1aWRlQ2lyY2xlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGd1aWRlQ2lyY2xlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGd1aWRlQ2lyY2xlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIGd1aWRlQ2lyY2xlTm9kZS5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBuZXdiaWVOb2RlLmFkZENoaWxkKGd1aWRlQ2lyY2xlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvKiogZ3VpZGVTa2UgKi9cclxuICAgICAgICAgICAgICAgIGxldCBndWlkZVNrZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZ3VpZGVTa2VcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3VpZGVTa2VOb2RlID0gY2MuaW5zdGFudGlhdGUoZ3VpZGVTa2VQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgZ3VpZGVTa2VOb2RlLnBvc2l0aW9uID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUuYWRkQ2hpbGQoZ3VpZGVTa2VOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmlmIChPbmNlRmxhZyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVdvcmxkLk15Lm5ld2JpZXMuc3RhdGUoXCJGaXJzdFJvbGVVcFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld2JpZU5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUubmFtZSA9IFwibmV3YmllTm9kZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUucG9zaXRpb24gPSB0aGlzLnJvbGVIZWFkTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5hZGRDaGlsZChuZXdiaWVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAvISoqIGd1aWRlQ2lyY2xlICohL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBndWlkZUNpcmNsZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZ3VpZGVDaXJjbGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGd1aWRlQ2lyY2xlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGd1aWRlQ2lyY2xlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZUNpcmNsZU5vZGUucG9zaXRpb24gPSBjYy52MigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUuYWRkQ2hpbGQoZ3VpZGVDaXJjbGVOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAvISoqIGd1aWRlU2tlICohL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBndWlkZVNrZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZ3VpZGVTa2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGd1aWRlU2tlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGd1aWRlU2tlUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZVNrZU5vZGUucG9zaXRpb24gPSBjYy52MigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUuYWRkQ2hpbGQoZ3VpZGVTa2VOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHRoaXMuYmxvY2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwibmV3YmllTm9kZVwiKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIU9uY2VGbGFnIHx8IFNob3dDb3VudCUzID09PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICBTaG93Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdW5sb2NrcyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLlByb3ApLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZVsnaWQnXSAhPSA3ICYmIHZhbHVlWydpZCddICE9IDggJiYgdmFsdWVbJ2lkJ10gIT0gMTAgJiYgdmFsdWVbJ3VubG9jayddICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB1bmxvY2tzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoV29ybGQuTXkucHJvcEluZm8uYmVVc2luZyhpdGVtWydpZCddKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuNSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoXCJPcGVuVmlld0NvbW1hbmRcIiwgXCJwcmVmYWIvcmVjb21tZW5kUHJvcHNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJsb2NrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2hvd0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5RXhpdCgpe1xyXG4gICAgICAgIHRoaXMuYmxvY2tOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IG5ld2JpZU5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwibmV3YmllTm9kZVwiKTtcclxuICAgICAgICBpZiAobmV3YmllTm9kZSl7XHJcbiAgICAgICAgICAgIG5ld2JpZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBXb3JsZC5NeS5uZXdiaWVzLmZpbmlzaChcIkZpcnN0RW50cnlIb21lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGYWNhZGUuZXhlY3V0ZUNvbW1hbmQoXCJMb2FkU2NlbmVDb21tYW5kXCIsIFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIC8qbGV0IHdoaXRlTm9kZSA9IHRoaXMud2hpdGVOb2RlO1xyXG4gICAgICAgIHdoaXRlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHdoaXRlTm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHdoaXRlTm9kZSk7XHJcbiAgICAgICAgd2hpdGVOb2RlLnBvc2l0aW9uID0gY2MudmlzaWJsZVJlY3QuY2VudGVyO1xyXG4gICAgICAgIHdoaXRlTm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB3aGl0ZU5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVUbygwLjUsIDI1NSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIEZhY2FkZS5leGVjdXRlQ29tbWFuZChcIkxvYWRTY2VuZUNvbW1hbmRcIiwgXCJHYW1lU2NlbmVcIik7XHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjIpLCBjYy5mYWRlVG8oMC41LCAwKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgd2hpdGVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KSkpOyovXHJcbiAgICAgICAgLypsZXQgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICBsZXQgc3BlZWQgPSA3MDA7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gMjUwICsgdGhpcy50b3BOb2RlLmhlaWdodC8yO1xyXG4gICAgICAgIGlmKGV4dC5pc0lwaG9uZVgpe1xyXG4gICAgICAgICAgICBkaXN0YW5jZSArPSA2NjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1vdmVTcGVlZCA9IDEyMDA7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuYm90dG9tTGF5ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmJvdHRvbUxheWVyc1tpXTtcclxuICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZVRvKE1hdGguYWJzKG5vZGUueSAtIG5vZGUuaGVpZ2h0LzIrIHRoaXMuYm90dG9tTm9kZS5oZWlnaHQvMikvbW92ZVNwZWVkLCBjYy52MigwLCAtbm9kZS5oZWlnaHQvMiArIHRoaXMuYm90dG9tTm9kZS5oZWlnaHQvMikpKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnRvcE5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZUJ5KGRpc3RhbmNlL3NwZWVkLCBjYy52MigwLCBkaXN0YW5jZSkpKSk7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmJvdHRvbU5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZUJ5KHRoaXMuYm90dG9tTm9kZS5oZWlnaHQvc3BlZWQsIGNjLnYyKDAsIC10aGlzLmJvdHRvbU5vZGUuaGVpZ2h0KSkpKTtcclxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucmlnaHROb2RlLnJ1bkFjdGlvbkF3YWl0KGNjLm1vdmVCeSgyMDAvc3BlZWQsIGNjLnYyKDIwMCwgMCkpKSk7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmNlbnRlck5vZGUucnVuQWN0aW9uQXdhaXQoY2MubW92ZVRvKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC9zcGVlZCwgY2MudjIoLWNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCwgMCkpKSk7XHJcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygxLCAxLzAuNCksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvL+WIh+aNouWcuuaZr1xyXG4gICAgICAgICAgICAgICAgRmFjYWRlLmV4ZWN1dGVDb21tYW5kKFwiTG9hZFNjZW5lQ29tbWFuZFwiLCBcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG9nZ2xlRXZlbnQodG9nZ2xlLCBkYXRhKXtcclxuICAgICAgICBkYXRhID0gcGFyc2VJbnQoZGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codG9nZ2xlLm5vZGUubmFtZSwgdG9nZ2xlLmlzQ2hlY2tlZCk7XHJcbiAgICAgICAgLyoqIOWFtuS7luWvueixoeWFs+mXre+8jOeEtuWQjuWGjeWkhOeQhuiHquW3sSAqL1xyXG4gICAgICAgIGxldCBtb3ZlU3BlZWQgPSAxMjAwO1xyXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmJvdHRvbUxheWVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ib3R0b21MYXllcnNbaV07XHJcbiAgICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgaWYgKGkgIT0gZGF0YSAtIDEpe1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChub2RlLnJ1bkFjdGlvbkF3YWl0KGNjLm1vdmVUbyhNYXRoLmFicyhub2RlLnkgLSBub2RlLmhlaWdodC8yKyB0aGlzLmJvdHRvbU5vZGUuaGVpZ2h0LzIpL21vdmVTcGVlZCwgY2MudjIoMCwgLW5vZGUuaGVpZ2h0LzIgKyB0aGlzLmJvdHRvbU5vZGUuaGVpZ2h0LzIpKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmJvdHRvbUxheWVyc1tkYXRhLTFdO1xyXG4gICAgICAgIGxldCBkZXN0UG9zID0gY2MudjIoMCwgLSBub2RlLmhlaWdodC8yKyB0aGlzLmJvdHRvbU5vZGUuaGVpZ2h0LzIpO1xyXG4gICAgICAgIGlmICh0b2dnbGUuaXNDaGVja2VkKXtcclxuICAgICAgICAgICAgZGVzdFBvcy55ID0gbm9kZS5oZWlnaHQvMiArIHRoaXMuYm90dG9tTm9kZS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgdGhpcy51cEljb25Ob2Rlcy5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChkYXRhID09IDIgJiYgIXRvZ2dsZS5pc0NoZWNrZWQpIHx8IGRhdGEgIT0gMil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvblN0YXJ0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChub2RlLnJ1bkFjdGlvbkF3YWl0KGNjLm1vdmVUbyhNYXRoLmFicyhkZXN0UG9zLnkgLSBub2RlLnkpL21vdmVTcGVlZCwgZGVzdFBvcykpKTtcclxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXM9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2guXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRvZ2dsZS5pc0NoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXBJY29uKCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYXBvblN0YXJ0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdiaWVOb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIm5ld2JpZU5vZGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3YmllTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdiaWVOb2RlLmdldENoaWxkQnlOYW1lKFwiZ3VpZGVTa2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3YmllTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuNSwgdGhpcy5maWdodEJ1dHRvbk5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKCkpKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld2JpZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJndWlkZVNrZVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1VwSWNvbigpe1xyXG4gICAgICAgIHRoaXMudXBJY29uTm9kZXMuZm9yRWFjaCh2YWx1ZSA9PiB2YWx1ZS5hY3RpdmUgPSB0cnVlKTtcclxuICAgICAgICBsZXQgd2VhcG9uQ29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gd2VhcG9uQ29uZmlnWzBdO1xyXG4gICAgICAgIGxldCB3ZWFwb25VcENvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKTtcclxuICAgICAgICBsZXQgaHBDYW5VcCA9IFdvcmxkLlN0b3JhZ2UuSHBMdiA8IGNvbmZpZ1snbHZfbGltaXQnXSAmJiBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCA+PSB3ZWFwb25VcENvbmZpZ1tXb3JsZC5TdG9yYWdlLkhwTHYtMV1bJ2xpZmVfZXhwZW5kJ107XHJcbiAgICAgICAgbGV0IGFkQ2FuVXAgPSBXb3JsZC5TdG9yYWdlLkFETHYgPCBjb25maWdbJ2x2X2xpbWl0J10gJiYgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gd2VhcG9uVXBDb25maWdbV29ybGQuU3RvcmFnZS5BREx2LTFdWydsaWZlX2V4cGVuZCddO1xyXG4gICAgICAgIHRoaXMudXBJY29uTm9kZXNbMF0uYWN0aXZlID0gaHBDYW5VcCB8fCBhZENhblVwO1xyXG5cclxuICAgICAgICB0aGlzLnVwSWNvbk5vZGVzWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaTx3ZWFwb25Db25maWcubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgY2ZnID0gd2VhcG9uQ29uZmlnW2ldO1xyXG4gICAgICAgICAgICBsZXQgYkxvY2sgPSBXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCA8IGNmZ1sndW5sb2NrJ107XHJcbiAgICAgICAgICAgIGxldCBmaXJlUG93ZXJMdiA9IFdvcmxkLk15LmFybW9yeS5sZXZlbE9mRW1pdHRlckZpcmVQb3dlcihjZmdbJ2lkJ10pO1xyXG4gICAgICAgICAgICBsZXQgZmlyZUNhblVwID0gZmlyZVBvd2VyTHYgPCBjZmdbJ2x2X2xpbWl0J10gJiYgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gd2VhcG9uVXBDb25maWdbZmlyZVBvd2VyTHYtMV1bJ2ZpcmVfZXhwZW5kJ107XHJcbiAgICAgICAgICAgIGxldCBwb3dlckx2ID0gV29ybGQuTXkuYXJtb3J5LmxldmVsT2ZFbWl0dGVyUG93ZXIoY2ZnWydpZCddKTtcclxuICAgICAgICAgICAgbGV0IHBvd2VyQ2FuVXAgPSBwb3dlckx2IDwgY2ZnWydsdl9saW1pdCddICYmIFdvcmxkLlN0b3JhZ2UuZ29sZENvdW50ID49IHdlYXBvblVwQ29uZmlnW3Bvd2VyTHYtMV1bJ3Bvd2VyX2V4cGVuZCddO1xyXG4gICAgICAgICAgICBpZiAoIWJMb2NrICYmIChmaXJlQ2FuVXAgfHwgcG93ZXJDYW5VcCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cEljb25Ob2Rlc1sxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBnb2xkVXBDb25maWcgPSBFeGNlbENvbmZpZy5nZXRFeGNlbFRhYmxlKEV4Y2VsVGFibGVOYW1lcy5Hb2xkVXApO1xyXG4gICAgICAgIGxldCBnb2xkQ2FuVXAgPSBXb3JsZC5TdG9yYWdlLmdvbGRMdiA8IGdvbGRVcENvbmZpZy5sZW5ndGggJiYgV29ybGQuU3RvcmFnZS5nb2xkQ291bnQgPj0gZ29sZFVwQ29uZmlnW1dvcmxkLlN0b3JhZ2UuZ29sZEx2LTFdWydndmFsdWVfZXhwZW5kJ107XHJcbiAgICAgICAgbGV0IGVhcm5DYW5VcCA9IFdvcmxkLlN0b3JhZ2UuZGF5RWFybkx2IDwgZ29sZFVwQ29uZmlnLmxlbmd0aCAmJiBXb3JsZC5TdG9yYWdlLmdvbGRDb3VudCA+PSBnb2xkVXBDb25maWdbV29ybGQuU3RvcmFnZS5kYXlFYXJuTHYtMV1bJ29uX2hvb2tfZXhwZW5kJ107XHJcbiAgICAgICAgdGhpcy51cEljb25Ob2Rlc1syXS5hY3RpdmUgPSBnb2xkQ2FuVXAgfHwgZWFybkNhblVwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hCRyhldmVudCwgZGF0YSl7XHJcbiAgICAgICAgaWYgKCF0aGlzLndlYXBvblN0YXJ0Tm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICBsZXQgbmV3YmllTm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJuZXdiaWVOb2RlXCIpO1xyXG4gICAgICAgICAgICBpZiAobmV3YmllTm9kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFeGl0KCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIEZhY2FkZS5leGVjdXRlQ29tbWFuZChcIk9wZW5WaWV3Q29tbWFuZFwiLCBcInByZWZhYi9yZWNvbW1lbmRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1dlYXBvblN0YXJ0KGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkHZpZGVv44CROCDpq5jniIbmrablmajlvIDlsYDjgJBjbGlja+OAkUhvbWVDb250cm9sbGVyIFdlYXBvblN0YXJ0XCIpXHJcblxyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UuX3ZpZGVvU2lnbj04XHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS52aWRlb0FkX3Nob3coKSBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrV2VhcG9uU3RhcnREbygpe1xyXG4gICAgICAgIEdhbWVQcm94eS5wcmVwYXJlR3VuID0gdGhpcy53ZWFwb25MYXllckNvbnRyb2xsZXIuZm9jdXNHdW5JRCgpO1xyXG4gICAgICAgIHRoaXMucGxheUV4aXQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=