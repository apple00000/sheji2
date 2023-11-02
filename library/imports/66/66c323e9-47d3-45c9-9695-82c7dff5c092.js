"use strict";
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