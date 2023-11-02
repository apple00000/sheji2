"use strict";
cc._RF.push(module, '6a436jVTaVMhK6DmWGm6kzl', 'GameRoleController');
// script/app/game/GameRoleController.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionType = exports.JoystickType = void 0;
var BulletEmitterShanDianQiu_1 = require("../entities/bulletEmitter/BulletEmitterShanDianQiu");
var BulletEmitterHuoJianTong_1 = require("../entities/bulletEmitter/BulletEmitterHuoJianTong");
var BulletEmitterShouQiang_1 = require("../entities/bulletEmitter/BulletEmitterShouQiang");
var BulletEmitterSanDanQiang_1 = require("../entities/bulletEmitter/BulletEmitterSanDanQiang");
var Role_1 = require("../entities/role/Role");
var Actions_1 = require("../../../framework/actions/Actions");
var BulletEmitterJiGuang_1 = require("../entities/bulletEmitter/BulletEmitterJiGuang");
var BulletEmitterLiZiPao_1 = require("../entities/bulletEmitter/BulletEmitterLiZiPao");
var BulletEmitterJiaTeLin_1 = require("../entities/bulletEmitter/BulletEmitterJiaTeLin");
var BulletEmitterJuJiQiang_1 = require("../entities/bulletEmitter/BulletEmitterJuJiQiang");
var BulletEmitterHuoYan_1 = require("../entities/bulletEmitter/BulletEmitterHuoYan");
var BulletEmitter_1 = require("../entities/bulletEmitter/BulletEmitter");
var BulletEmitterPenZi_1 = require("../entities/bulletEmitter/BulletEmitterPenZi");
var GameProxy_1 = require("./GameProxy");
var Enemy_1 = require("../entities/enemy/Enemy");
var BulletOfFangHuDun_1 = require("../entities/bullet/BulletOfFangHuDun");
var PropStateController_1 = require("../entities/prop/PropStateController");
var Music_1 = require("../../../framework/audio/Music");
var World_1 = require("../info/World");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var GameController_1 = require("./GameController");
var Extend_1 = require("../../../framework/extend/Extend");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JoystickType;
(function (JoystickType) {
    JoystickType[JoystickType["FIXED"] = 0] = "FIXED";
    JoystickType[JoystickType["FOLLOW"] = 1] = "FOLLOW";
})(JoystickType = exports.JoystickType || (exports.JoystickType = {}));
var DirectionType;
(function (DirectionType) {
    DirectionType[DirectionType["FOUR"] = 4] = "FOUR";
    DirectionType[DirectionType["EIGHT"] = 8] = "EIGHT";
    DirectionType[DirectionType["ALL"] = 0] = "ALL";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
var RING_OPACITY = 80;
var EmitterSfxVolumes = [0.33, 0.8, 0.8, 0.45, 1, 2, 1, 0.6, 1, 2, 1, 1, 1];
var GameRoleController = /** @class */ (function (_super) {
    __extends(GameRoleController, _super);
    function GameRoleController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guideNode = null;
        _this.bulletStrikeLayer = null;
        _this.propStatePrefab = null;
        _this.propStateNode = null;
        _this.takePropLayer = null;
        _this.beAttackSke = null;
        _this.weaponSke = null;
        _this.payloadLabel = null;
        _this.payloadBars = [];
        _this.hpProgressBar = null;
        _this.hpBarNode = null;
        _this.bgLayer = null;
        _this.dot = null;
        _this.ring = null;
        _this.joystickType = JoystickType.FIXED;
        _this.directionType = DirectionType.ALL;
        _this._radius = 0;
        _this._takeProps = [];
        _this.role = null;
        _this.impenetrableDefence = null;
        _this.maxHp = 1000;
        _this._hp = 0;
        _this._bulletEmitter = 0;
        _this._bulletEmitterDelegate = null;
        _this._touchId = null;
        _this._bMove = false;
        _this._dir = cc.v2();
        _this._fireCD = 0;
        _this._bgBounds = cc.rect();
        _this._roleBounds = cc.rect();
        _this._bgNode = null;
        _this._screenRect = cc.rect(0, 0, cc.visibleRect.width, cc.visibleRect.height);
        return _this;
    }
    GameRoleController.prototype.genTakePropNode = function () {
        var prefabPath = 'prefab/entities/prop/takeProp';
        var entityPrefab = cc.loader.getRes(prefabPath, cc.Prefab);
        var node = cc.instantiate(entityPrefab);
        node.active = false;
        this.takePropLayer.addChild(node);
        this._takeProps.push(node);
        return node;
    };
    GameRoleController.prototype.getInactiveTakePropNode = function () {
        var result = this._takeProps.find(function (value) { return value.active == false; });
        if (typeof result == "undefined") {
            result = this.genTakePropNode();
        }
        return result;
    };
    Object.defineProperty(GameRoleController.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        set: function (value) {
            var _this = this;
            if (this.impenetrableDefence.node.active) {
                //减速
                this.impenetrableDefence.strike(null, null);
                return;
            }
            if (this._hp <= 0)
                return;
            var damage = this._hp - value;
            window['GameLabelsController'].fly("-" + Extend_1.ext.shortFormat(damage), this.role.node.position.add(cc.v2(0, this.role.spaceCircleCollider.radius)));
            this._hp = value;
            if (value <= 0) {
                GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.KillRole);
            }
            this.updateHpProgress();
            this.beAttackSke.node.active = true;
            this.beAttackSke.setAnimation(0, "crazy", false);
            Music_1.Music.playSFX("sound/msc_rol001");
            this.hpBarNode.color = cc.Color.RED;
            this.role.spriteNode.color = cc.Color.RED;
            var action = cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                _this.hpBarNode.color = cc.Color.GREEN;
                _this.role.spriteNode.color = cc.Color.WHITE;
            }));
            action.setTag(901);
            this.role.node.stopActionByTag(901);
            this.role.node.runAction(action);
        },
        enumerable: false,
        configurable: true
    });
    GameRoleController.prototype.huiXue = function (add) {
        this._hp += add;
        if (this._hp > this.maxHp) {
            this._hp = this.maxHp;
        }
        this.updateHpProgress();
    };
    GameRoleController.prototype.updateHpProgress = function () {
        this.hpProgressBar.progress = this._hp / this.maxHp;
    };
    Object.defineProperty(GameRoleController.prototype, "bulletEmitter", {
        get: function () {
            return this._bulletEmitter;
        },
        set: function (value) {
            if (this._bulletEmitter != 0) {
                Music_1.Music.playSFX("sound/msc_rol003");
            }
            if (this._bulletEmitter != value) {
                this._bulletEmitter = value;
                var gameBulletsController = window['GameBulletsController'];
                var bulletEmitter = null;
                switch (this._bulletEmitter) {
                    case BulletEmitter_1.default.TYPES.ShouQiang:
                        bulletEmitter = new BulletEmitterShouQiang_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.PenZi:
                        bulletEmitter = new BulletEmitterPenZi_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.JiaTeLin:
                        bulletEmitter = new BulletEmitterJiaTeLin_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.SanDanQiang:
                        bulletEmitter = new BulletEmitterSanDanQiang_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.JuJiQiang:
                        bulletEmitter = new BulletEmitterJuJiQiang_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.LiZiPao:
                        bulletEmitter = new BulletEmitterLiZiPao_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.HuoJianTong:
                        bulletEmitter = new BulletEmitterHuoJianTong_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.ShanDianQiu:
                        bulletEmitter = new BulletEmitterShanDianQiu_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.JiGuang:
                        bulletEmitter = new BulletEmitterJiGuang_1.default(gameBulletsController);
                        break;
                    case BulletEmitter_1.default.TYPES.HuoYan:
                        bulletEmitter = new BulletEmitterHuoYan_1.default(gameBulletsController);
                        break;
                }
                this.bulletEmitterDelegate = bulletEmitter;
                bulletEmitter.init(this._bulletEmitter);
                // this.weaponSke.node.scale = 0;
                // this.weaponSke.node.runAction(cc.scaleTo(0.35, 0.55).easing(cc.easeBackOut()));
                this.weaponSke.setSkin(("000" + this._bulletEmitter).substr(-3));
                this.weaponSke.setAnimation(0, "gun_002", false);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameRoleController.prototype, "bulletEmitterDelegate", {
        get: function () {
            return this._bulletEmitterDelegate;
        },
        set: function (value) {
            if (this._bulletEmitterDelegate) {
                this._bulletEmitterDelegate.onExit();
            }
            this._bulletEmitterDelegate = value;
            this._bulletEmitterDelegate.onEnter();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameRoleController.prototype, "touchId", {
        set: function (value) {
            this._touchId = value;
            // if (this._touchId == null){
            //     GameProxy.slowGame = true;
            // } else {
            //     GameProxy.slowGame = false;
            // }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameRoleController.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameRoleController.prototype, "bMove", {
        get: function () {
            return this._bMove;
        },
        enumerable: false,
        configurable: true
    });
    GameRoleController.prototype.onLoad = function () {
        var _this = this;
        this._radius = this.ring.width / 2;
        if (this.joystickType == JoystickType.FOLLOW) {
            this.ring.opacity = 0;
            this.dot.opacity = 0;
        }
        this.role.node.on(cc.Node.EventType.POSITION_CHANGED, this.onRolePositionChanged, this);
        this.node.on(GameProxy_1.GameProxy.Event.PauseGame, this.onPauseGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.InitGame, this.onInitGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.StartGame, this.onStartGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.ReliveGame, this.onReliveGame, this);
        this.node.on(GameProxy_1.GameProxy.Event.UpdateBulletCount, this.onUpdateBulletCount, this);
        this.node.on(GameProxy_1.GameProxy.Event.PropTrigger, this.onPropTrigger, this);
        this.node.on(GameProxy_1.GameProxy.Event.PropCDZero, this.onPropCDZero, this);
        this.beAttackSke.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            _this.beAttackSke.node.active = false;
        });
        this.beAttackSke.node.active = false;
        this.beAttackSke.node.scaleY = cc.view.getVisibleSize().height / 1334;
        this.weaponSke.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == 'gun_002') {
                _this.weaponSke.setAnimation(0, "gun", false);
            }
        });
        window['GameRoleController'] = this;
    };
    GameRoleController.prototype.onUpdateBulletCount = function () {
        var str = "x" + this._bulletEmitterDelegate.bulletCount;
        if (this._bulletEmitter == 1) {
            str = '∞';
        }
        this.payloadLabel.string = str;
        var num = this.payloadBars.length;
        if (this._bulletEmitterDelegate.payload > 0) {
            num = Math.ceil(this._bulletEmitterDelegate.bulletCount / this._bulletEmitterDelegate.payload * this.payloadBars.length);
        }
        this.payloadBars.forEach(function (value, index) { return value.active = index < num; });
    };
    GameRoleController.prototype.onPauseGame = function (pause) {
        if (pause) {
            this.touchId = null;
            this._bMove = false;
            this.dot.setPosition(this.ring.getPosition());
            if (this.joystickType == JoystickType.FOLLOW) {
                this.ring.opacity = 0;
                this.dot.opacity = 0;
            }
        }
    };
    GameRoleController.prototype.onInitGame = function () {
        this.maxHp = this._hp = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.WeaponUp)[World_1.World.Storage.HpLv - 1]['life'];
        this.updateHpProgress();
        this.setImpenetrableDefenceCD(3);
    };
    GameRoleController.prototype.setImpenetrableDefenceCD = function (cd) {
        var _this = this;
        console.log("setImpenetrableDefenceCD==>", cd);
        this.impenetrableDefence.node.active = true;
        this.impenetrableDefence.unblink();
        var action = cc.sequence(cc.delayTime(cd - 1), cc.callFunc(function () {
            _this.impenetrableDefence.blink();
        }), cc.delayTime(1), cc.callFunc(function () {
            _this.impenetrableDefence.node.active = false;
        }));
        action.setTag(889);
        this.role.node.stopActionByTag(889);
        this.role.node.runAction(action);
    };
    GameRoleController.prototype.onStartGame = function () {
        console.log("onStartGame===>", GameProxy_1.GameProxy.pauseGame);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        if (!World_1.World.My.newbies.state("FirstEntryGame")) {
            this.guideNode.active = true;
        }
        else {
            this.getComponent(GameController_1.default).startGenerating();
        }
    };
    GameRoleController.prototype.onReliveGame = function () {
        this.onInitGame();
        var weaponConfig = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Weapon).filter(function (value) { return value['id'] != 1; }).sort((function (a, b) { return b['unlock'] - a['unlock']; }));
        for (var _i = 0, weaponConfig_1 = weaponConfig; _i < weaponConfig_1.length; _i++) {
            var item = weaponConfig_1[_i];
            if (GameProxy_1.GameProxy.level >= item['unlock']) {
                this.bulletEmitter = item['id'];
                this.bulletEmitterDelegate.payload = this.bulletEmitterDelegate.payload * 3;
                break;
            }
        }
    };
    GameRoleController.prototype.onRolePositionChanged = function () {
        var _this = this;
        this.hpProgressBar.node.position = this.role.node.position;
        this._takeProps.forEach(function (value) {
            if (value.active) {
                value.position = _this.role.node.position;
            }
        });
    };
    GameRoleController.prototype.onPropTrigger = function (prop) {
        var _this = this;
        var takePropNode = this.getInactiveTakePropNode();
        takePropNode.position = this.role.node.position;
        takePropNode.active = true;
        takePropNode.scale = 1;
        takePropNode.opacity = 255;
        takePropNode.runAction(cc.sequence(cc.scaleTo(0.3, 4), cc.fadeTo(0.3, 80), cc.callFunc(function () {
            takePropNode.active = false;
        })));
        var propID = prop.propID;
        var propMove = function (callback) {
            var propBaseNode = cc.instantiate(prop.node);
            propBaseNode.position = _this.propStateNode.getParent().convertToNodeSpaceAR(prop.node.convertToWorldSpaceAR(cc.v2()));
            _this.propStateNode.getParent().addChild(propBaseNode);
            /** 飞到状态栏的位置 */
            var flyDuration = 0.3;
            var propStateNode = cc.instantiate(_this.propStatePrefab);
            _this.propStateNode.addChild(propStateNode);
            propStateNode.scale = 0;
            propStateNode.runAction(cc.scaleTo(flyDuration, 1));
            propBaseNode.runAction(cc.sequence(cc.moveTo(flyDuration, _this.propStateNode.position.add(cc.v2(0, -78 / 2))), cc.callFunc(function () {
                _this.propStateNode.children.forEach(function (value) {
                    var propStateConroller = value.getComponent(PropStateController_1.default);
                    if (propStateConroller.propID == propID && value != propStateNode) {
                        propStateConroller.cdTimer.pause = true;
                        propStateConroller.node.active = false;
                    }
                });
                var propStateConroller = propStateNode.getComponent(PropStateController_1.default);
                propStateConroller.init(propID);
                propStateConroller.cdTimer.pause = false;
                propBaseNode.destroy();
                if (callback) {
                    callback();
                }
            })));
        };
        switch (propID) {
            case 5:
                this.setImpenetrableDefenceCD(10 + 0.3);
                break;
            case 11:
                this.role.addSupply(propID);
                this.huiXue(Math.floor(this.maxHp * 0.3));
                break;
            case 9:
                this.role.addSupply(propID);
                propMove();
                this.role.accSpeed = 1.5;
                break;
            case 10:
                propMove();
                break;
            case 12:
                this.role.addSupply(propID);
                propMove();
                GameProxy_1.GameProxy.goldMul = 2;
                break;
            case 13:
                GameProxy_1.GameProxy.magnetic = true;
                propMove();
                break;
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
                if (this.bulletEmitter == propID - 100) {
                    this.bulletEmitterDelegate.bulletCount = this.bulletEmitterDelegate.payload;
                }
                else {
                    this.bulletEmitter = propID - 100;
                }
                break;
        }
    };
    GameRoleController.prototype.onPropCDZero = function (id) {
        switch (id) {
            case 5:
                this.impenetrableDefence.node.active = false;
                break;
            case 9:
                this.role.accSpeed = 1;
                break;
            case 10:
                break;
            case 12:
                GameProxy_1.GameProxy.goldMul = 1;
                break;
            case 13:
                GameProxy_1.GameProxy.magnetic = false;
                break;
        }
    };
    GameRoleController.prototype.start = function () {
        var _this = this;
        var bgNode = this.role.node.getParent();
        this._bgNode = bgNode;
        this._roleBounds.x = -bgNode.width / 2 + this.role.spaceCircleCollider.radius;
        this._roleBounds.y = -bgNode.height / 2 + this.role.spaceCircleCollider.radius;
        this._roleBounds.width = bgNode.width - this.role.spaceCircleCollider.radius * 2;
        this._roleBounds.height = bgNode.height - this.role.spaceCircleCollider.radius * 2;
        this._bgBounds.x = -this.bgLayer.width / 2 + cc.view.getVisibleSize().width / 2;
        this._bgBounds.y = -this.bgLayer.height / 2 + cc.view.getVisibleSize().height / 2;
        this._bgBounds.width = this.bgLayer.width - cc.view.getVisibleSize().width;
        this._bgBounds.height = this.bgLayer.height - cc.view.getVisibleSize().height;
        // console.log(this._roleBounds, "this._roleBounds===>");
        // let node = new cc.Node();
        // bgNode.addChild(node);
        // let graphic = node.addComponent(cc.Graphics);
        // graphic.strokeColor = cc.Color.RED;
        // graphic.lineWidth = 5;
        // graphic.rect(-bgNode.width/2, -bgNode.height/2, bgNode.width, bgNode.height);
        // graphic.stroke();
        //
        // graphic = this.role.node.addComponent(cc.Graphics);
        // graphic.strokeColor = cc.Color.RED;
        // graphic.lineWidth = 3;
        // graphic.circle(this.role.spaceCircleCollider.offset.x, this.role.spaceCircleCollider.offset.y, this.role.spaceCircleCollider.radius);
        // graphic.stroke();
        /** 移动控制 */
        this.node.runAction(Actions_1.default.update(function (dt) {
            /**
             * 角色移动
             * 有控制的情况下才能移动
             * 小于边界内才能移动
             * */
            var roleMoveLen = _this.role.speed * dt;
            if (_this._bMove && !GameProxy_1.GameProxy.pauseGame) {
                var deltaPos = _this._dir.mul(roleMoveLen);
                var destPos = _this.role.node.position.add(deltaPos);
                var arr = [];
                window['GameCollisionController'].looseQuadTree.retrieve(_this.role.roleAABB.aabb(), arr);
                var flag = false;
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var aabbRegion = arr_1[_i];
                    var enemy = aabbRegion.enemy;
                    if (enemy.node.position.sub(destPos).mag() < enemy.spaceCircleCollider.radius + _this.role.spaceCircleCollider.radius) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    if (destPos.x > _this._roleBounds.xMax || destPos.x < _this._roleBounds.xMin || destPos.y > _this._roleBounds.yMax || destPos.y < _this._roleBounds.yMin) {
                        flag = true;
                    }
                }
                if (!flag) {
                    _this.role.node.position = destPos;
                }
                /*if (deltaPos.x > 0){
                    if (destPos.x > this._roleBounds.xMax){
                        destPos.x = this._roleBounds.xMax;
                    }
                }else if (deltaPos.x < 0){
                    if (destPos.x < this._roleBounds.xMin){
                        destPos.x = this._roleBounds.xMin;
                    }
                }

                if (deltaPos.y > 0){
                    if (destPos.y > this._roleBounds.yMax){
                        destPos.y = this._roleBounds.yMax;
                    }
                }else if (deltaPos.y < 0){
                    if (destPos.y < this._roleBounds.yMin){
                        destPos.y = this._roleBounds.yMin;
                    }
                }*/
                // let intersections = [];
                // /** 求线段与边线的交点 */
                // if (deltaPos.x > 0 && destPos.x > this._roleBounds.xMax){
                //     //与右边界的交点
                //     let point = cc.v2();
                //     if(cc.Intersection.pLineIntersect(this.role.node.position, destPos, cc.v2(this._roleBounds.xMax, this._roleBounds.yMin), cc.v2(this._roleBounds.xMax, this._roleBounds.yMax), point)){
                //         intersections.push(point);
                //     }
                // }
                // if (deltaPos.x < 0 && destPos.x < this._roleBounds.xMin){
                //     //与左边界的交点
                //     let point = cc.v2();
                //     if(cc.Intersection.pLineIntersect(this.role.node.position, destPos, cc.v2(this._roleBounds.xMin, this._roleBounds.yMin), cc.v2(this._roleBounds.xMin, this._roleBounds.yMax), point)){
                //         intersections.push(point);
                //     }
                // }
                // if (deltaPos.y > 0 && destPos.y > this._roleBounds.yMax){
                //     //与上边界的交点
                //     let point = cc.v2();
                //     if(cc.Intersection.pLineIntersect(this.role.node.position, destPos, cc.v2(this._roleBounds.xMin, this._roleBounds.yMax), cc.v2(this._roleBounds.xMax, this._roleBounds.yMax), point)){
                //         intersections.push(point);
                //     }
                // }
                // if (deltaPos.y < 0 && destPos.y < this._roleBounds.yMin){
                //     //与下边界的交点
                //     let point = cc.v2();
                //     if(cc.Intersection.pLineIntersect(this.role.node.position, destPos, cc.v2(this._roleBounds.xMin, this._roleBounds.yMin), cc.v2(this._roleBounds.xMax, this._roleBounds.yMin), point)){
                //         intersections.push(point);
                //     }
                // }
                /** 求线段与圆的交点 */
                // arr.forEach(value => {
                //     let enemy = value.getComponent(Enemy);
                //     // cc.Intersection.pLineCircle(this.role.node.position, destPos, {position:enemy.node.position, radius:enemy.spaceCircleCollider.radius}, intersections);
                //     let doubleRadius = enemy.spaceCircleCollider.radius + this.role.spaceCircleCollider.radius;
                //     if (cc.Intersection.pointLineDistance(enemy.node.position, this.role.node.position, destPos, true) < doubleRadius){
                //         console.log("与怪物相交，求最小移动距离");
                //         /** 距离 */
                //         let centerSub = enemy.node.position.sub(this.role.node.position);
                //         let centerLen = centerSub.mag();
                //         if (centerLen > doubleRadius){
                //             /** 求夹角 */
                //             let radians = destPos.angle(centerSub);
                //             if (radians > 0){
                //                 /** 求垂线 */
                //                 let vLen = centerLen * Math.sin(radians);
                //                 if (vLen < doubleRadius){
                //                     let sideLen = Math.sqrt(doubleRadius*doubleRadius - vLen*vLen);
                //                     let hLen = centerLen * Math.cos(radians);
                //                     intersections.push(this.node.position.add(this._dir.mul(hLen - sideLen)));
                //                 }
                //             } else {
                //                 intersections.push(this.node.position.add(this._dir.mul(centerLen - doubleRadius)));
                //             }
                //         }
                //     }
                // });
                // if (intersections.length > 0){
                //     console.log(intersections, "intersections..");
                //     if (intersections.length == 1){
                //         let t = cc.v2();
                //         this.role.node.position = intersections[0].addSelf(this._dir.neg(t));
                //     }else {
                //         /** 求距离role最近的那个 */
                //         let p = intersections[0];
                //         let minDistance = p.sub(this.role.node.position).mag();
                //         for (let i=1; i<intersections.length; i++){
                //             let mag = intersections[i].sub(this.role.node.position).mag();
                //             if (mag < minDistance){
                //                 p = intersections[i];
                //                 minDistance = mag;
                //             }
                //         }
                //         let t = cc.v2();
                //         this.role.node.position = p.addSelf(this._dir.neg(t));
                //     }
                // } else {
                //     this.role.node.position = destPos;
                // }
            }
            /**
             * 地图的移动
             * --它的移动速度比角色要慢一点
             * --要保证角色的点在屏幕中心
             * */
            var sub = cc.v2(-_this.role.node.x, -_this.role.node.y).sub(bgNode.position);
            var mag = sub.mag();
            var normalize = sub.normalize();
            if (mag > 0) {
                var speed = roleMoveLen * (mag > 50 ? 1 : 5 / 6);
                var x = speed * normalize.x;
                var y = speed * normalize.y;
                if (Math.abs(x) > Math.abs(sub.x)) {
                    x = sub.x;
                }
                if (Math.abs(y) > Math.abs(sub.y)) {
                    y = sub.y;
                }
                var destX = bgNode.x + x;
                var destY = bgNode.y + y;
                if (destX < _this._bgBounds.xMin) {
                    destX = _this._bgBounds.xMin;
                }
                else if (destX > _this._bgBounds.xMax) {
                    destX = _this._bgBounds.xMax;
                }
                if (destY < _this._bgBounds.yMin) {
                    destY = _this._bgBounds.yMin;
                }
                else if (destY > _this._bgBounds.yMax) {
                    destY = _this._bgBounds.yMax;
                }
                bgNode.x = destX;
                bgNode.y = destY;
            }
        }));
        var gameEnemysController = window['GameEnemysController'];
        if (GameProxy_1.GameProxy.prepareGun > 0) {
            this.bulletEmitter = GameProxy_1.GameProxy.prepareGun;
            this.bulletEmitterDelegate.payload = this.bulletEmitterDelegate.payload * 3;
            GameProxy_1.GameProxy.prepareGun = 0;
        }
        else {
            this.bulletEmitter = BulletEmitter_1.default.TYPES.ShouQiang;
        }
        /** 发射控制 */
        this.node.runAction(Actions_1.default.update(function (dt) {
            if (GameProxy_1.GameProxy.pauseGame || GameProxy_1.GameProxy.slowGame)
                return;
            if (_this._fireCD > 0) {
                _this._fireCD -= dt;
            }
            /** 找到离角度最近的敌人 */
            var enemyNode = null;
            var minSub = null;
            var minDistance = _this.bulletEmitterDelegate.firingRange;
            // console.log(minDistance, "minDistance");
            _this._screenRect.x = -_this._bgNode.x - cc.visibleRect.center.x;
            _this._screenRect.y = -_this._bgNode.y - cc.visibleRect.center.y;
            var rolePos = _this.role.node.position;
            gameEnemysController.enemyLayer.children.forEach(function (value) {
                if (value.active && value.getComponent(Enemy_1.default).hp > 0 && _this._screenRect.contains(value.position)) {
                    var sub = value.position.sub(rolePos);
                    var mag = sub.mag();
                    if (mag < minDistance) {
                        minSub = sub;
                        minDistance = mag;
                        enemyNode = value;
                    }
                }
            });
            if (enemyNode) {
                /** 转向敌人 */
                _this.turnTo(minSub);
                if (_this._fireCD <= 0) {
                    /** 根据攻击距离计算攻击夹角 */
                    var attackRadian = Math.atan(enemyNode.getComponent(Enemy_1.default).spaceCircleCollider.radius / minDistance);
                    if (minSub.angle(cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-_this.role.node.rotation))) < attackRadian) {
                        /** fire */
                        _this._fireCD = _this.bulletEmitterDelegate.interval;
                        var dir = enemyNode.position.sub(rolePos).normalize();
                        if (dir.x == 0 && dir.y == 0) {
                            dir = cc.v2(0, 1).normalize().rotate(cc.misc.degreesToRadians(-_this.role.node.rotation));
                        }
                        if (_this._bulletEmitter == BulletEmitter_1.default.TYPES.JuJiQiang) {
                            var bulletStrikePrefab = cc.loader.getRes("prefab/entities/bullet/fire7");
                            var bulletStrikeNode_1 = cc.instantiate(bulletStrikePrefab);
                            _this.bulletStrikeLayer.addChild(bulletStrikeNode_1);
                            bulletStrikeNode_1.position = _this.role.node.position.add(dir.mul(_this.role.gunTopNode.y));
                            bulletStrikeNode_1.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
                            bulletStrikeNode_1.getComponent(sp.Skeleton).setCompleteListener(function () {
                                bulletStrikeNode_1.destroy();
                            });
                        }
                        else if (_this._bulletEmitter !== BulletEmitter_1.default.TYPES.JiGuang && _this._bulletEmitter !== BulletEmitter_1.default.TYPES.PenZi) {
                            _this.role.fireSprite.node.scale = 1;
                            _this.role.fireSprite.node.active = true;
                            _this.role.fireSprite.node.runAction(cc.sequence(cc.scaleTo(0.05, 0.5), cc.callFunc(function () {
                                _this.role.fireSprite.node.active = false;
                            })));
                        }
                        _this._bulletEmitterDelegate.fire(_this.role.node.position.add(dir.mul(_this.role.gunTopNode.y)), dir);
                        var str = 'sound/msc_g' + ("0000000000000000" + _this._bulletEmitter).substr(-3);
                        Music_1.Music.playSFX(str, EmitterSfxVolumes[_this._bulletEmitter - 1]);
                        if (_this._bulletEmitterDelegate.isUseUp()) {
                            _this.bulletEmitter = BulletEmitter_1.default.TYPES.ShouQiang;
                        }
                    }
                }
            }
        }));
    };
    GameRoleController.prototype.turnTo = function (dir) {
        var degree = (90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x))) % 360;
        // console.log("de===>", degree);
        // console.log("dir===>x="+dir.x+" y="+dir.y);
        if (degree < 0) {
            degree += 360;
        }
        var enemyRotation = this.role.node.rotation % 360;
        if (enemyRotation < 0) {
            enemyRotation += 360;
        }
        var subDegree = Math.abs(degree - enemyRotation);
        // console.log("degree="+degree);
        // console.log("enemyRotation====>"+enemyRotation);
        if (subDegree > 0) {
            var rotation = 0;
            if (subDegree > 180) {
                rotation = Math.sign(enemyRotation - degree) * 10;
                if (Math.abs(rotation) > 360 - subDegree) {
                    rotation = Math.sign(rotation) * (360 - subDegree);
                }
            }
            else {
                rotation = Math.sign(degree - enemyRotation) * 10;
                if (Math.abs(rotation) > subDegree) {
                    rotation = Math.sign(rotation) * subDegree;
                }
            }
            enemyRotation += rotation;
        }
        this.role.node.rotation = enemyRotation;
    };
    GameRoleController.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    };
    GameRoleController.prototype.onTouchStart = function (event) {
        // console.log("onTouchStart===>", this._touchId, GameProxy.pauseGame);
        if (this._touchId == null) {
            this.touchId = event.getID();
            this._bMove = false;
            this.ring.opacity = RING_OPACITY;
            this.dot.opacity = RING_OPACITY;
            // 更改摇杆的位置
            this.ring.setPosition(event.getLocation().sub(cc.visibleRect.center));
            this.dot.setPosition(cc.v2(0, 0));
        }
    };
    GameRoleController.prototype.onTouchMove = function (event) {
        // console.log("onTouchMove===>", this._touchId, GameProxy.pauseGame);
        if (!GameProxy_1.GameProxy.pauseGame && event.getID() == this._touchId) {
            this._bMove = true;
            if (this.guideNode.active && this.dot.position.mag() > 30) {
                this.guideNode.active = false;
                World_1.World.My.newbies.finish("FirstEntryGame");
                this.getComponent(GameController_1.default).startGenerating();
            }
            var pos = this.dot.position.add(event.getDelta());
            this._dir = pos.normalize();
            if (pos.mag() >= this._radius) {
                this.dot.position = this._dir.mul(this._radius);
                this.role.speedType = Role_1.SpeedType.FAST;
                this.ring.position = event.getLocation().sub(cc.visibleRect.center).sub(this.dot.position);
            }
            else {
                this.dot.position = pos;
                this.role.speedType = Role_1.SpeedType.NORMAL;
            }
        }
    };
    GameRoleController.prototype.onTouchEnd = function (event) {
        // console.log("onTouchEnd===>", this._touchId, GameProxy.pauseGame);
        if (!GameProxy_1.GameProxy.pauseGame && event.getID() == this._touchId) {
            this.touchId = null;
            this._bMove = false;
            this.dot.setPosition(this.ring.getPosition());
            if (this.joystickType == JoystickType.FOLLOW) {
                this.ring.opacity = 0;
                this.dot.opacity = 0;
            }
            // this.role.speedType = SpeedType.STOP;
        }
    };
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "guideNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "bulletStrikeLayer", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameRoleController.prototype, "propStatePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "propStateNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "takePropLayer", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameRoleController.prototype, "beAttackSke", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GameRoleController.prototype, "weaponSke", void 0);
    __decorate([
        property(cc.Label)
    ], GameRoleController.prototype, "payloadLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "payloadBars", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], GameRoleController.prototype, "hpProgressBar", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "hpBarNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRoleController.prototype, "bgLayer", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "摇杆操纵点" })
    ], GameRoleController.prototype, "dot", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "摇杆背景节点" })
    ], GameRoleController.prototype, "ring", void 0);
    __decorate([
        property({ type: cc.Enum(JoystickType), tooltip: "触摸类型" })
    ], GameRoleController.prototype, "joystickType", void 0);
    __decorate([
        property({ type: cc.Enum(DirectionType), tooltip: "方向类型" })
    ], GameRoleController.prototype, "directionType", void 0);
    __decorate([
        property(Role_1.default)
    ], GameRoleController.prototype, "role", void 0);
    __decorate([
        property(BulletOfFangHuDun_1.default)
    ], GameRoleController.prototype, "impenetrableDefence", void 0);
    GameRoleController = __decorate([
        ccclass
    ], GameRoleController);
    return GameRoleController;
}(cc.Component));
exports.default = GameRoleController;

cc._RF.pop();