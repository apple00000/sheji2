
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/game/GameRoleController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2dhbWUvR2FtZVJvbGVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsK0ZBQTBGO0FBQzFGLCtGQUEwRjtBQUMxRiwyRkFBc0Y7QUFDdEYsK0ZBQTBGO0FBQzFGLDhDQUFzRDtBQUN0RCw4REFBeUQ7QUFDekQsdUZBQWtGO0FBQ2xGLHVGQUFrRjtBQUNsRix5RkFBb0Y7QUFDcEYsMkZBQXNGO0FBQ3RGLHFGQUFnRjtBQUdoRix5RUFBb0U7QUFDcEUsbUZBQThFO0FBQzlFLHlDQUFzQztBQUN0QyxpREFBNEM7QUFDNUMsMEVBQXFFO0FBRXJFLDRFQUF1RTtBQUN2RSx3REFBcUQ7QUFDckQsdUNBQW9DO0FBQ3BDLHFFQUFrRTtBQUNsRSw2REFBMEQ7QUFDMUQsbURBQThDO0FBQzlDLDJEQUFxRDtBQUUvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsaURBQUssQ0FBQTtJQUNMLG1EQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRCxJQUFZLGFBSVg7QUFKRCxXQUFZLGFBQWE7SUFDckIsaURBQVEsQ0FBQTtJQUNSLG1EQUFTLENBQUE7SUFDVCwrQ0FBTyxDQUFBO0FBQ1gsQ0FBQyxFQUpXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBSXhCO0FBRUQsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRXhCLElBQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFD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LENBQUMsMkJBQWlCLENBQUM7bUVBQ2lCO0lBM0U1QixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQSt4QnRDO0lBQUQseUJBQUM7Q0EveEJELEFBK3hCQyxDQS94QitDLEVBQUUsQ0FBQyxTQUFTLEdBK3hCM0Q7a0JBL3hCb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgQnVsbGV0RW1pdHRlclNoYW5EaWFuUWl1IGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJTaGFuRGlhblFpdVwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckh1b0ppYW5Ub25nIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJIdW9KaWFuVG9uZ1wiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlclNob3VRaWFuZyBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVyU2hvdVFpYW5nXCI7XHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyU2FuRGFuUWlhbmcgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclNhbkRhblFpYW5nXCI7XHJcbmltcG9ydCBSb2xlLCB7U3BlZWRUeXBlfSBmcm9tIFwiLi4vZW50aXRpZXMvcm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBBY3Rpb25zIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvYWN0aW9ucy9BY3Rpb25zXCI7XHJcbmltcG9ydCBCdWxsZXRFbWl0dGVySmlHdWFuZyBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVySmlHdWFuZ1wiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckxpWmlQYW8gZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckxpWmlQYW9cIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJKaWFUZUxpbiBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVySmlhVGVMaW5cIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJKdUppUWlhbmcgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckp1SmlRaWFuZ1wiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckh1b1lhbiBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVySHVvWWFuXCI7XHJcbmltcG9ydCBBQUJCUmVnaW9uIGZyb20gXCIuLi8uLi9xdWFkLXRyZWUvQUFCQlJlZ2lvblwiO1xyXG5pbXBvcnQgRW5lbXlBQUJCIGZyb20gXCIuLi9lbnRpdGllcy9lbmVteS9FbmVteUFBQkJcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXIgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlclBlblppIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJQZW5aaVwiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4vR2FtZVByb3h5XCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi4vZW50aXRpZXMvZW5lbXkvRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldE9mRmFuZ0h1RHVuIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXQvQnVsbGV0T2ZGYW5nSHVEdW5cIjtcclxuaW1wb3J0IFByb3BCYXNlIGZyb20gXCIuLi9lbnRpdGllcy9wcm9wL1Byb3BCYXNlXCI7XHJcbmltcG9ydCBQcm9wU3RhdGVDb250cm9sbGVyIGZyb20gXCIuLi9lbnRpdGllcy9wcm9wL1Byb3BTdGF0ZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtNdXNpY30gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9hdWRpby9NdXNpY1wiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQge0V4Y2VsQ29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2NvbmZpZy9FeGNlbENvbmZpZ1wiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gXCIuL0dhbWVDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gSm95c3RpY2tUeXBlIHtcclxuICAgIEZJWEVELFxyXG4gICAgRk9MTE9XLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBEaXJlY3Rpb25UeXBle1xyXG4gICAgRk9VUiA9IDQsXHJcbiAgICBFSUdIVCA9IDgsXHJcbiAgICBBTEwgPSAwLFxyXG59XHJcblxyXG5jb25zdCBSSU5HX09QQUNJVFkgPSA4MDtcclxuXHJcbmNvbnN0IEVtaXR0ZXJTZnhWb2x1bWVzID0gWzAuMzMsIDAuOCwgMC44LCAwLjQ1LCAxLCAyLCAxLCAwLjYsIDEsIDIsIDEsIDEsIDFdO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVJvbGVDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGd1aWRlTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ1bGxldFN0cmlrZUxheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcm9wU3RhdGVQcmVmYWI6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByb3BTdGF0ZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRha2VQcm9wTGF5ZXI6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBiZUF0dGFja1NrZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgd2VhcG9uU2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwYXlsb2FkTGFiZWw6Y2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGF5bG9hZEJhcnM6W2NjLk5vZGVdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgaHBQcm9ncmVzc0JhcjpjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBocEJhck5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZ0xheWVyOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLCB0b29sdGlwOlwi5pGH5p2G5pON57q154K5XCJ9KVxyXG4gICAgZG90OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLCB0b29sdGlwOlwi5pGH5p2G6IOM5pmv6IqC54K5XCJ9KVxyXG4gICAgcmluZzpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShKb3lzdGlja1R5cGUpLCB0b29sdGlwOlwi6Kem5pG457G75Z6LXCJ9KVxyXG4gICAgam95c3RpY2tUeXBlOkpveXN0aWNrVHlwZSA9IEpveXN0aWNrVHlwZS5GSVhFRDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShEaXJlY3Rpb25UeXBlKSwgdG9vbHRpcDpcIuaWueWQkeexu+Wei1wifSlcclxuICAgIGRpcmVjdGlvblR5cGU6RGlyZWN0aW9uVHlwZSA9IERpcmVjdGlvblR5cGUuQUxMO1xyXG5cclxuICAgIHByaXZhdGUgX3JhZGl1cyA9IDA7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX3Rha2VQcm9wczpBcnJheTxjYy5Ob2RlPiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgZ2VuVGFrZVByb3BOb2RlKCk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgcHJlZmFiUGF0aCA9ICdwcmVmYWIvZW50aXRpZXMvcHJvcC90YWtlUHJvcCc7XHJcbiAgICAgICAgbGV0IGVudGl0eVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMocHJlZmFiUGF0aCwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGVudGl0eVByZWZhYik7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRha2VQcm9wTGF5ZXIuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgdGhpcy5fdGFrZVByb3BzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJbmFjdGl2ZVRha2VQcm9wTm9kZSgpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpjYy5Ob2RlID0gdGhpcy5fdGFrZVByb3BzLmZpbmQodmFsdWUgPT4gdmFsdWUuYWN0aXZlID09IGZhbHNlKTtcclxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZW5UYWtlUHJvcE5vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoUm9sZSlcclxuICAgIHJvbGU6Um9sZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KEJ1bGxldE9mRmFuZ0h1RHVuKVxyXG4gICAgaW1wZW5ldHJhYmxlRGVmZW5jZTpCdWxsZXRPZkZhbmdIdUR1biA9IG51bGw7XHJcblxyXG4gICAgbWF4SHAgPSAxMDAwO1xyXG5cclxuICAgIHByaXZhdGUgX2hwID0gMDtcclxuXHJcblxyXG4gICAgZ2V0IGhwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBocCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW1wZW5ldHJhYmxlRGVmZW5jZS5ub2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIC8v5YeP6YCfXHJcbiAgICAgICAgICAgIHRoaXMuaW1wZW5ldHJhYmxlRGVmZW5jZS5zdHJpa2UobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2hwIDw9IDApcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYW1hZ2UgPSB0aGlzLl9ocCAtIHZhbHVlO1xyXG4gICAgICAgIHdpbmRvd1snR2FtZUxhYmVsc0NvbnRyb2xsZXInXSAuZmx5KGAtJHtleHQuc2hvcnRGb3JtYXQoZGFtYWdlKX1gLCB0aGlzLnJvbGUubm9kZS5wb3NpdGlvbi5hZGQoY2MudjIoMCwgdGhpcy5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzKSkpO1xyXG4gICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IDApe1xyXG4gICAgICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuS2lsbFJvbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmJlQXR0YWNrU2tlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJlQXR0YWNrU2tlLnNldEFuaW1hdGlvbigwLCBcImNyYXp5XCIsIGZhbHNlKTtcclxuICAgICAgICBNdXNpYy5wbGF5U0ZYKFwic291bmQvbXNjX3JvbDAwMVwiKTtcclxuICAgICAgICB0aGlzLmhwQmFyTm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICB0aGlzLnJvbGUuc3ByaXRlTm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDAuMiksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaHBCYXJOb2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgIHRoaXMucm9sZS5zcHJpdGVOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoOTAxKTtcclxuICAgICAgICB0aGlzLnJvbGUubm9kZS5zdG9wQWN0aW9uQnlUYWcoOTAxKTtcclxuICAgICAgICB0aGlzLnJvbGUubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBodWlYdWUoYWRkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5faHAgKz0gYWRkO1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA+IHRoaXMubWF4SHApe1xyXG4gICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMubWF4SHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlSHBQcm9ncmVzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhwUHJvZ3Jlc3MoKXtcclxuICAgICAgICB0aGlzLmhwUHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLl9ocCAvIHRoaXMubWF4SHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVsbGV0RW1pdHRlcjpudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBnZXQgYnVsbGV0RW1pdHRlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWxsZXRFbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBidWxsZXRFbWl0dGVyKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0RW1pdHRlciAhPSAwKXtcclxuICAgICAgICAgICAgTXVzaWMucGxheVNGWChcInNvdW5kL21zY19yb2wwMDNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRFbWl0dGVyICE9IHZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5fYnVsbGV0RW1pdHRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZ2FtZUJ1bGxldHNDb250cm9sbGVyID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldEVtaXR0ZXI6QnVsbGV0RW1pdHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fYnVsbGV0RW1pdHRlcil7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuU2hvdVFpYW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlclNob3VRaWFuZyhnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLlBlblppOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlclBlblppKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlhVGVMaW46XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlciA9IG5ldyBCdWxsZXRFbWl0dGVySmlhVGVMaW4oZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5TYW5EYW5RaWFuZzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJTYW5EYW5RaWFuZyhnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLkp1SmlRaWFuZzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJKdUppUWlhbmcoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5MaVppUGFvOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlckxpWmlQYW8oZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5IdW9KaWFuVG9uZzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJIdW9KaWFuVG9uZyhnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLlNoYW5EaWFuUWl1OlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlclNoYW5EaWFuUWl1KGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlHdWFuZzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJKaUd1YW5nKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuSHVvWWFuOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlckh1b1lhbihnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0RW1pdHRlckRlbGVnYXRlID0gYnVsbGV0RW1pdHRlcjtcclxuICAgICAgICAgICAgYnVsbGV0RW1pdHRlci5pbml0KHRoaXMuX2J1bGxldEVtaXR0ZXIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLndlYXBvblNrZS5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgLy8gdGhpcy53ZWFwb25Ta2Uubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjM1LCAwLjU1KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvblNrZS5zZXRTa2luKChcIjAwMFwiK3RoaXMuX2J1bGxldEVtaXR0ZXIpLnN1YnN0cigtMykpO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvblNrZS5zZXRBbmltYXRpb24oMCwgXCJndW5fMDAyXCIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVsbGV0RW1pdHRlckRlbGVnYXRlOkJ1bGxldEVtaXR0ZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBnZXQgYnVsbGV0RW1pdHRlckRlbGVnYXRlKCk6IEJ1bGxldEVtaXR0ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWxsZXRFbWl0dGVyRGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJ1bGxldEVtaXR0ZXJEZWxlZ2F0ZSh2YWx1ZTogQnVsbGV0RW1pdHRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRFbWl0dGVyRGVsZWdhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9idWxsZXRFbWl0dGVyRGVsZWdhdGUub25FeGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5vbkVudGVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgX3RvdWNoSWQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYk1vdmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2RpciA9IGNjLnYyKCk7XHJcblxyXG5cclxuICAgIHNldCB0b3VjaElkKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90b3VjaElkID0gdmFsdWU7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3RvdWNoSWQgPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgIEdhbWVQcm94eS5zbG93R2FtZSA9IHRydWU7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgR2FtZVByb3h5LnNsb3dHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZpcmVDRCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfYmdCb3VuZHMgPSBjYy5yZWN0KCk7XHJcbiAgICBwcml2YXRlIF9yb2xlQm91bmRzID0gY2MucmVjdCgpO1xyXG5cclxuXHJcbiAgICBnZXQgZGlyKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJNb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iTW92ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMucmluZy53aWR0aC8yO1xyXG4gICAgICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PSBKb3lzdGlja1R5cGUuRk9MTE9XKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmluZy5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5kb3Qub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9sZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMub25Sb2xlUG9zaXRpb25DaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LlBhdXNlR2FtZSwgdGhpcy5vblBhdXNlR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5Jbml0R2FtZSwgdGhpcy5vbkluaXRHYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LlN0YXJ0R2FtZSwgdGhpcy5vblN0YXJ0R2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5SZWxpdmVHYW1lLCB0aGlzLm9uUmVsaXZlR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKEdhbWVQcm94eS5FdmVudC5VcGRhdGVCdWxsZXRDb3VudCwgdGhpcy5vblVwZGF0ZUJ1bGxldENvdW50LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oR2FtZVByb3h5LkV2ZW50LlByb3BUcmlnZ2VyLCB0aGlzLm9uUHJvcFRyaWdnZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihHYW1lUHJveHkuRXZlbnQuUHJvcENEWmVybywgdGhpcy5vblByb3BDRFplcm8sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmVBdHRhY2tTa2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIHRoaXMuYmVBdHRhY2tTa2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJlQXR0YWNrU2tlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZUF0dGFja1NrZS5ub2RlLnNjYWxlWSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQvMTMzNDtcclxuICAgICAgICB0aGlzLndlYXBvblNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+e1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSAnZ3VuXzAwMicpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb25Ta2Uuc2V0QW5pbWF0aW9uKDAsIFwiZ3VuXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ10gPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlQnVsbGV0Q291bnQoKXtcclxuICAgICAgICBsZXQgc3RyID0gYHgke3RoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5idWxsZXRDb3VudH1gO1xyXG4gICAgICAgIGlmICh0aGlzLl9idWxsZXRFbWl0dGVyID09IDEpe1xyXG4gICAgICAgICAgICBzdHIgPSAn4oieJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXlsb2FkTGFiZWwuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgIGxldCBudW0gPSB0aGlzLnBheWxvYWRCYXJzLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5fYnVsbGV0RW1pdHRlckRlbGVnYXRlLnBheWxvYWQgPiAwKXtcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5jZWlsKHRoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5idWxsZXRDb3VudC90aGlzLl9idWxsZXRFbWl0dGVyRGVsZWdhdGUucGF5bG9hZCp0aGlzLnBheWxvYWRCYXJzLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGF5bG9hZEJhcnMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZS5hY3RpdmUgPSBpbmRleCA8IG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QYXVzZUdhbWUocGF1c2U6Ym9vbGVhbil7XHJcbiAgICAgICAgaWYgKHBhdXNlKXtcclxuICAgICAgICAgICAgdGhpcy50b3VjaElkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYk1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kb3Quc2V0UG9zaXRpb24odGhpcy5yaW5nLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qb3lzdGlja1R5cGUgPT0gSm95c3RpY2tUeXBlLkZPTExPVykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaW5nLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3Qub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0R2FtZSgpe1xyXG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLl9ocCA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvblVwKVtXb3JsZC5TdG9yYWdlLkhwTHYtMV1bJ2xpZmUnXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLnNldEltcGVuZXRyYWJsZURlZmVuY2VDRCgzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJbXBlbmV0cmFibGVEZWZlbmNlQ0QoY2Q6bnVtYmVyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNldEltcGVuZXRyYWJsZURlZmVuY2VDRD09PlwiLCBjZCk7XHJcbiAgICAgICAgdGhpcy5pbXBlbmV0cmFibGVEZWZlbmNlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmltcGVuZXRyYWJsZURlZmVuY2UudW5ibGluaygpO1xyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoY2QtMSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaW1wZW5ldHJhYmxlRGVmZW5jZS5ibGluaygpO1xyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaW1wZW5ldHJhYmxlRGVmZW5jZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKDg4OSk7XHJcbiAgICAgICAgdGhpcy5yb2xlLm5vZGUuc3RvcEFjdGlvbkJ5VGFnKDg4OSk7XHJcbiAgICAgICAgdGhpcy5yb2xlLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydEdhbWUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uU3RhcnRHYW1lPT09PlwiLCBHYW1lUHJveHkucGF1c2VHYW1lKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIGlmICghV29ybGQuTXkubmV3Ymllcy5zdGF0ZShcIkZpcnN0RW50cnlHYW1lXCIpKXtcclxuICAgICAgICAgICAgdGhpcy5ndWlkZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KEdhbWVDb250cm9sbGVyKS5zdGFydEdlbmVyYXRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWxpdmVHYW1lKCl7XHJcbiAgICAgICAgdGhpcy5vbkluaXRHYW1lKCk7XHJcbiAgICAgICAgbGV0IHdlYXBvbkNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLldlYXBvbikuZmlsdGVyKHZhbHVlID0+IHZhbHVlWydpZCddICE9IDEpLnNvcnQoKChhLCBiKSA9PiBiWyd1bmxvY2snXSAtIGFbJ3VubG9jayddKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB3ZWFwb25Db25maWcpe1xyXG4gICAgICAgICAgICBpZiAoR2FtZVByb3h5LmxldmVsID49IGl0ZW1bJ3VubG9jayddKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0RW1pdHRlciA9IGl0ZW1bJ2lkJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5wYXlsb2FkID0gdGhpcy5idWxsZXRFbWl0dGVyRGVsZWdhdGUucGF5bG9hZCAqIDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJvbGVQb3NpdGlvbkNoYW5nZWQoKXtcclxuICAgICAgICB0aGlzLmhwUHJvZ3Jlc3NCYXIubm9kZS5wb3NpdGlvbiA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuX3Rha2VQcm9wcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5wb3NpdGlvbiA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Qcm9wVHJpZ2dlcihwcm9wOlByb3BCYXNlKSB7XHJcbiAgICAgICAgbGV0IHRha2VQcm9wTm9kZSA9IHRoaXMuZ2V0SW5hY3RpdmVUYWtlUHJvcE5vZGUoKTtcclxuICAgICAgICB0YWtlUHJvcE5vZGUucG9zaXRpb24gPSB0aGlzLnJvbGUubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0YWtlUHJvcE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0YWtlUHJvcE5vZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgIHRha2VQcm9wTm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRha2VQcm9wTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjMsIDQpLCBjYy5mYWRlVG8oMC4zLCA4MCksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRha2VQcm9wTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgICAgIGxldCBwcm9wSUQgPSBwcm9wLnByb3BJRDtcclxuICAgICAgICBsZXQgcHJvcE1vdmUgPSAoY2FsbGJhY2s/OigpPT52b2lkKT0+e1xyXG4gICAgICAgICAgICBsZXQgcHJvcEJhc2VOb2RlID0gY2MuaW5zdGFudGlhdGUocHJvcC5ub2RlKTtcclxuICAgICAgICAgICAgcHJvcEJhc2VOb2RlLnBvc2l0aW9uID0gdGhpcy5wcm9wU3RhdGVOb2RlLmdldFBhcmVudCgpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHByb3Aubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BTdGF0ZU5vZGUuZ2V0UGFyZW50KCkuYWRkQ2hpbGQocHJvcEJhc2VOb2RlKTtcclxuICAgICAgICAgICAgLyoqIOmjnuWIsOeKtuaAgeagj+eahOS9jee9riAqL1xyXG4gICAgICAgICAgICBsZXQgZmx5RHVyYXRpb24gPSAwLjM7XHJcbiAgICAgICAgICAgIGxldCBwcm9wU3RhdGVOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcm9wU3RhdGVQcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BTdGF0ZU5vZGUuYWRkQ2hpbGQocHJvcFN0YXRlTm9kZSk7XHJcbiAgICAgICAgICAgIHByb3BTdGF0ZU5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBwcm9wU3RhdGVOb2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKGZseUR1cmF0aW9uLCAxKSk7XHJcbiAgICAgICAgICAgIHByb3BCYXNlTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKGZseUR1cmF0aW9uLCB0aGlzLnByb3BTdGF0ZU5vZGUucG9zaXRpb24uYWRkKGNjLnYyKDAsIC03OC8yKSkpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wU3RhdGVOb2RlLmNoaWxkcmVuLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wU3RhdGVDb25yb2xsZXIgPSB2YWx1ZS5nZXRDb21wb25lbnQoUHJvcFN0YXRlQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BTdGF0ZUNvbnJvbGxlci5wcm9wSUQgPT0gcHJvcElEICYmIHZhbHVlICE9IHByb3BTdGF0ZU5vZGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wU3RhdGVDb25yb2xsZXIuY2RUaW1lci5wYXVzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BTdGF0ZUNvbnJvbGxlci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BTdGF0ZUNvbnJvbGxlciA9IHByb3BTdGF0ZU5vZGUuZ2V0Q29tcG9uZW50KFByb3BTdGF0ZUNvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgcHJvcFN0YXRlQ29ucm9sbGVyLmluaXQocHJvcElEKTtcclxuICAgICAgICAgICAgICAgIHByb3BTdGF0ZUNvbnJvbGxlci5jZFRpbWVyLnBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcm9wQmFzZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3dpdGNoIChwcm9wSUQpIHtcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbXBlbmV0cmFibGVEZWZlbmNlQ0QoMTArMC4zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlLmFkZFN1cHBseShwcm9wSUQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odWlYdWUoTWF0aC5mbG9vcih0aGlzLm1heEhwKjAuMykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZS5hZGRTdXBwbHkocHJvcElEKTtcclxuICAgICAgICAgICAgICAgIHByb3BNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGUuYWNjU3BlZWQgPSAxLjU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHByb3BNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZS5hZGRTdXBwbHkocHJvcElEKTtcclxuICAgICAgICAgICAgICAgIHByb3BNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lUHJveHkuZ29sZE11bCA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMzpcclxuICAgICAgICAgICAgICAgIEdhbWVQcm94eS5tYWduZXRpYyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwcm9wTW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTAyOlxyXG4gICAgICAgICAgICBjYXNlIDEwMzpcclxuICAgICAgICAgICAgY2FzZSAxMDQ6XHJcbiAgICAgICAgICAgIGNhc2UgMTA1OlxyXG4gICAgICAgICAgICBjYXNlIDEwNjpcclxuICAgICAgICAgICAgY2FzZSAxMDc6XHJcbiAgICAgICAgICAgIGNhc2UgMTA4OlxyXG4gICAgICAgICAgICBjYXNlIDEwOTpcclxuICAgICAgICAgICAgY2FzZSAxMTA6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idWxsZXRFbWl0dGVyID09IHByb3BJRCAtIDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRFbWl0dGVyRGVsZWdhdGUuYnVsbGV0Q291bnQgPSB0aGlzLmJ1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5wYXlsb2FkO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0RW1pdHRlciA9IHByb3BJRCAtIDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblByb3BDRFplcm8oaWQ6bnVtYmVyKXtcclxuICAgICAgICBzd2l0Y2ggKGlkKXtcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbXBlbmV0cmFibGVEZWZlbmNlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlLmFjY1NwZWVkID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICBHYW1lUHJveHkuZ29sZE11bCA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMzpcclxuICAgICAgICAgICAgICAgIEdhbWVQcm94eS5tYWduZXRpYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JnTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NjcmVlblJlY3Q6Y2MuUmVjdCA9IGNjLnJlY3QoMCwgMCwgY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XHJcblxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICBsZXQgYmdOb2RlID0gdGhpcy5yb2xlLm5vZGUuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5fYmdOb2RlID0gYmdOb2RlO1xyXG4gICAgICAgIHRoaXMuX3JvbGVCb3VuZHMueCA9IC1iZ05vZGUud2lkdGgvMiArIHRoaXMucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cztcclxuICAgICAgICB0aGlzLl9yb2xlQm91bmRzLnkgPSAtYmdOb2RlLmhlaWdodC8yICsgdGhpcy5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX3JvbGVCb3VuZHMud2lkdGggPSBiZ05vZGUud2lkdGggLSB0aGlzLnJvbGUuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMqMjtcclxuICAgICAgICB0aGlzLl9yb2xlQm91bmRzLmhlaWdodCA9IGJnTm9kZS5oZWlnaHQgLSB0aGlzLnJvbGUuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMqMjtcclxuXHJcbiAgICAgICAgdGhpcy5fYmdCb3VuZHMueCA9IC10aGlzLmJnTGF5ZXIud2lkdGgvMiArIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aC8yO1xyXG4gICAgICAgIHRoaXMuX2JnQm91bmRzLnkgPSAtdGhpcy5iZ0xheWVyLmhlaWdodC8yICsgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodC8yO1xyXG4gICAgICAgIHRoaXMuX2JnQm91bmRzLndpZHRoID0gdGhpcy5iZ0xheWVyLndpZHRoIC0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2JnQm91bmRzLmhlaWdodCA9IHRoaXMuYmdMYXllci5oZWlnaHQgLSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0O1xyXG5cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fcm9sZUJvdW5kcywgXCJ0aGlzLl9yb2xlQm91bmRzPT09PlwiKTtcclxuICAgICAgICAvLyBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gYmdOb2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBncmFwaGljID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIC8vIGdyYXBoaWMuc3Ryb2tlQ29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgLy8gZ3JhcGhpYy5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgIC8vIGdyYXBoaWMucmVjdCgtYmdOb2RlLndpZHRoLzIsIC1iZ05vZGUuaGVpZ2h0LzIsIGJnTm9kZS53aWR0aCwgYmdOb2RlLmhlaWdodCk7XHJcbiAgICAgICAgLy8gZ3JhcGhpYy5zdHJva2UoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGdyYXBoaWMgPSB0aGlzLnJvbGUubm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgIC8vIGdyYXBoaWMuc3Ryb2tlQ29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgLy8gZ3JhcGhpYy5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIC8vIGdyYXBoaWMuY2lyY2xlKHRoaXMucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLm9mZnNldC54LCB0aGlzLnJvbGUuc3BhY2VDaXJjbGVDb2xsaWRlci5vZmZzZXQueSwgdGhpcy5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzKTtcclxuICAgICAgICAvLyBncmFwaGljLnN0cm9rZSgpO1xyXG4gICAgICAgIC8qKiDnp7vliqjmjqfliLYgKi9cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKEFjdGlvbnMudXBkYXRlKGR0PT57XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDop5LoibLnp7vliqhcclxuICAgICAgICAgICAgICog5pyJ5o6n5Yi255qE5oOF5Ya15LiL5omN6IO956e75YqoXHJcbiAgICAgICAgICAgICAqIOWwj+S6jui+ueeVjOWGheaJjeiDveenu+WKqFxyXG4gICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICBsZXQgcm9sZU1vdmVMZW4gPSB0aGlzLnJvbGUuc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iTW92ZSAmJiAhR2FtZVByb3h5LnBhdXNlR2FtZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsdGFQb3MgPSB0aGlzLl9kaXIubXVsKHJvbGVNb3ZlTGVuKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZXN0UG9zID0gdGhpcy5yb2xlLm5vZGUucG9zaXRpb24uYWRkKGRlbHRhUG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyOkFycmF5PEFBQkJSZWdpb24+ID0gW107XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ0dhbWVDb2xsaXNpb25Db250cm9sbGVyJ10ubG9vc2VRdWFkVHJlZS5yZXRyaWV2ZSh0aGlzLnJvbGUucm9sZUFBQkIuYWFiYigpLGFycik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGFhYmJSZWdpb24gb2YgYXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXkgPSAoPEVuZW15QUFCQj5hYWJiUmVnaW9uKS5lbmVteTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5lbXkubm9kZS5wb3NpdGlvbi5zdWIoZGVzdFBvcykubWFnKCkgPCBlbmVteS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyArIHRoaXMucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZsYWcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0UG9zLnggPiB0aGlzLl9yb2xlQm91bmRzLnhNYXggfHwgZGVzdFBvcy54IDwgdGhpcy5fcm9sZUJvdW5kcy54TWluIHx8IGRlc3RQb3MueSA+IHRoaXMuX3JvbGVCb3VuZHMueU1heCB8fCBkZXN0UG9zLnkgPCB0aGlzLl9yb2xlQm91bmRzLnlNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGUubm9kZS5wb3NpdGlvbiA9IGRlc3RQb3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKmlmIChkZWx0YVBvcy54ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RQb3MueCA+IHRoaXMuX3JvbGVCb3VuZHMueE1heCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RQb3MueCA9IHRoaXMuX3JvbGVCb3VuZHMueE1heDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoZGVsdGFQb3MueCA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0UG9zLnggPCB0aGlzLl9yb2xlQm91bmRzLnhNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0UG9zLnggPSB0aGlzLl9yb2xlQm91bmRzLnhNaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWx0YVBvcy55ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RQb3MueSA+IHRoaXMuX3JvbGVCb3VuZHMueU1heCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RQb3MueSA9IHRoaXMuX3JvbGVCb3VuZHMueU1heDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoZGVsdGFQb3MueSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0UG9zLnkgPCB0aGlzLl9yb2xlQm91bmRzLnlNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0UG9zLnkgPSB0aGlzLl9yb2xlQm91bmRzLnlNaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSovXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxldCBpbnRlcnNlY3Rpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyAvKiog5rGC57q/5q615LiO6L6557q/55qE5Lqk54K5ICovXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFQb3MueCA+IDAgJiYgZGVzdFBvcy54ID4gdGhpcy5fcm9sZUJvdW5kcy54TWF4KXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+S4juWPs+i+ueeVjOeahOS6pOeCuVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoY2MuSW50ZXJzZWN0aW9uLnBMaW5lSW50ZXJzZWN0KHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9yb2xlQm91bmRzLnhNYXgsIHRoaXMuX3JvbGVCb3VuZHMueU1pbiksIGNjLnYyKHRoaXMuX3JvbGVCb3VuZHMueE1heCwgdGhpcy5fcm9sZUJvdW5kcy55TWF4KSwgcG9pbnQpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFQb3MueCA8IDAgJiYgZGVzdFBvcy54IDwgdGhpcy5fcm9sZUJvdW5kcy54TWluKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+S4juW3pui+ueeVjOeahOS6pOeCuVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoY2MuSW50ZXJzZWN0aW9uLnBMaW5lSW50ZXJzZWN0KHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9yb2xlQm91bmRzLnhNaW4sIHRoaXMuX3JvbGVCb3VuZHMueU1pbiksIGNjLnYyKHRoaXMuX3JvbGVCb3VuZHMueE1pbiwgdGhpcy5fcm9sZUJvdW5kcy55TWF4KSwgcG9pbnQpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFQb3MueSA+IDAgJiYgZGVzdFBvcy55ID4gdGhpcy5fcm9sZUJvdW5kcy55TWF4KXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+S4juS4iui+ueeVjOeahOS6pOeCuVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoY2MuSW50ZXJzZWN0aW9uLnBMaW5lSW50ZXJzZWN0KHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9yb2xlQm91bmRzLnhNaW4sIHRoaXMuX3JvbGVCb3VuZHMueU1heCksIGNjLnYyKHRoaXMuX3JvbGVCb3VuZHMueE1heCwgdGhpcy5fcm9sZUJvdW5kcy55TWF4KSwgcG9pbnQpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFQb3MueSA8IDAgJiYgZGVzdFBvcy55IDwgdGhpcy5fcm9sZUJvdW5kcy55TWluKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+S4juS4i+i+ueeVjOeahOS6pOeCuVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYoY2MuSW50ZXJzZWN0aW9uLnBMaW5lSW50ZXJzZWN0KHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9yb2xlQm91bmRzLnhNaW4sIHRoaXMuX3JvbGVCb3VuZHMueU1pbiksIGNjLnYyKHRoaXMuX3JvbGVCb3VuZHMueE1heCwgdGhpcy5fcm9sZUJvdW5kcy55TWluKSwgcG9pbnQpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqIOaxgue6v+auteS4juWchueahOS6pOeCuSAqL1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZW5lbXkgPSB2YWx1ZS5nZXRDb21wb25lbnQoRW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIGNjLkludGVyc2VjdGlvbi5wTGluZUNpcmNsZSh0aGlzLnJvbGUubm9kZS5wb3NpdGlvbiwgZGVzdFBvcywge3Bvc2l0aW9uOmVuZW15Lm5vZGUucG9zaXRpb24sIHJhZGl1czplbmVteS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1c30sIGludGVyc2VjdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBkb3VibGVSYWRpdXMgPSBlbmVteS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyArIHRoaXMucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cztcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnBvaW50TGluZURpc3RhbmNlKGVuZW15Lm5vZGUucG9zaXRpb24sIHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCB0cnVlKSA8IGRvdWJsZVJhZGl1cyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiO5oCq54mp55u45Lqk77yM5rGC5pyA5bCP56e75Yqo6Led56a7XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvKiog6Led56a7ICovXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBjZW50ZXJTdWIgPSBlbmVteS5ub2RlLnBvc2l0aW9uLnN1Yih0aGlzLnJvbGUubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBjZW50ZXJMZW4gPSBjZW50ZXJTdWIubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChjZW50ZXJMZW4gPiBkb3VibGVSYWRpdXMpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLyoqIOaxguWkueinkiAqL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHJhZGlhbnMgPSBkZXN0UG9zLmFuZ2xlKGNlbnRlclN1Yik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAocmFkaWFucyA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8qKiDmsYLlnoLnur8gKi9cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgdkxlbiA9IGNlbnRlckxlbiAqIE1hdGguc2luKHJhZGlhbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICh2TGVuIDwgZG91YmxlUmFkaXVzKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVMZW4gPSBNYXRoLnNxcnQoZG91YmxlUmFkaXVzKmRvdWJsZVJhZGl1cyAtIHZMZW4qdkxlbik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBoTGVuID0gY2VudGVyTGVuICogTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbnMucHVzaCh0aGlzLm5vZGUucG9zaXRpb24uYWRkKHRoaXMuX2Rpci5tdWwoaExlbiAtIHNpZGVMZW4pKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb25zLnB1c2godGhpcy5ub2RlLnBvc2l0aW9uLmFkZCh0aGlzLl9kaXIubXVsKGNlbnRlckxlbiAtIGRvdWJsZVJhZGl1cykpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGludGVyc2VjdGlvbnMsIFwiaW50ZXJzZWN0aW9ucy4uXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHQgPSBjYy52MigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnJvbGUubm9kZS5wb3NpdGlvbiA9IGludGVyc2VjdGlvbnNbMF0uYWRkU2VsZih0aGlzLl9kaXIubmVnKHQpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8qKiDmsYLot53nprtyb2xl5pyA6L+R55qE6YKj5LiqICovXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBwID0gaW50ZXJzZWN0aW9uc1swXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gcC5zdWIodGhpcy5yb2xlLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpPTE7IGk8aW50ZXJzZWN0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbWFnID0gaW50ZXJzZWN0aW9uc1tpXS5zdWIodGhpcy5yb2xlLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKG1hZyA8IG1pbkRpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBwID0gaW50ZXJzZWN0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IG1hZztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgdCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uID0gcC5hZGRTZWxmKHRoaXMuX2Rpci5uZWcodCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5yb2xlLm5vZGUucG9zaXRpb24gPSBkZXN0UG9zO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Zyw5Zu+55qE56e75YqoXHJcbiAgICAgICAgICAgICAqIC0t5a6D55qE56e75Yqo6YCf5bqm5q+U6KeS6Imy6KaB5oWi5LiA54K5XHJcbiAgICAgICAgICAgICAqIC0t6KaB5L+d6K+B6KeS6Imy55qE54K55Zyo5bGP5bmV5Lit5b+DXHJcbiAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIGxldCBzdWIgPSBjYy52MigtdGhpcy5yb2xlLm5vZGUueCwgLXRoaXMucm9sZS5ub2RlLnkpLnN1YihiZ05vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgbWFnID0gc3ViLm1hZygpO1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsaXplID0gc3ViLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBpZiAobWFnID4gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BlZWQgPSByb2xlTW92ZUxlbioobWFnPjUwPzE6NS82KTtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gc3BlZWQqbm9ybWFsaXplLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHNwZWVkKm5vcm1hbGl6ZS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgpID4gTWF0aC5hYnMoc3ViLngpKXtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gc3ViLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoeSkgPiBNYXRoLmFicyhzdWIueSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBzdWIueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBkZXN0WCA9IGJnTm9kZS54ICsgeDtcclxuICAgICAgICAgICAgICAgIGxldCBkZXN0WSA9IGJnTm9kZS55ICsgeTtcclxuICAgICAgICAgICAgICAgIGlmIChkZXN0WCA8IHRoaXMuX2JnQm91bmRzLnhNaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc3RYID0gdGhpcy5fYmdCb3VuZHMueE1pbjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVzdFggPiB0aGlzLl9iZ0JvdW5kcy54TWF4KXtcclxuICAgICAgICAgICAgICAgICAgICBkZXN0WCA9IHRoaXMuX2JnQm91bmRzLnhNYXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVzdFkgPCB0aGlzLl9iZ0JvdW5kcy55TWluKXtcclxuICAgICAgICAgICAgICAgICAgICBkZXN0WSA9IHRoaXMuX2JnQm91bmRzLnlNaW47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlc3RZID4gdGhpcy5fYmdCb3VuZHMueU1heCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdFkgPSB0aGlzLl9iZ0JvdW5kcy55TWF4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYmdOb2RlLnggPSBkZXN0WDtcclxuICAgICAgICAgICAgICAgIGJnTm9kZS55ID0gZGVzdFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgbGV0IGdhbWVFbmVteXNDb250cm9sbGVyID0gd2luZG93WydHYW1lRW5lbXlzQ29udHJvbGxlciddO1xyXG4gICAgICAgIGlmIChHYW1lUHJveHkucHJlcGFyZUd1biA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldEVtaXR0ZXIgPSBHYW1lUHJveHkucHJlcGFyZUd1bjtcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRFbWl0dGVyRGVsZWdhdGUucGF5bG9hZCA9IHRoaXMuYnVsbGV0RW1pdHRlckRlbGVnYXRlLnBheWxvYWQgKiAzO1xyXG4gICAgICAgICAgICBHYW1lUHJveHkucHJlcGFyZUd1biA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRFbWl0dGVyID0gQnVsbGV0RW1pdHRlci5UWVBFUy5TaG91UWlhbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiDlj5HlsITmjqfliLYgKi9cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKEFjdGlvbnMudXBkYXRlKGR0ID0+IHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQcm94eS5wYXVzZUdhbWUgfHwgR2FtZVByb3h5LnNsb3dHYW1lKXJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpcmVDRCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZUNEIC09IGR0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKiDmib7liLDnprvop5LluqbmnIDov5HnmoTmlYzkurogKi9cclxuICAgICAgICAgICAgbGV0IGVuZW15Tm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IG1pblN1YiA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IHRoaXMuYnVsbGV0RW1pdHRlckRlbGVnYXRlLmZpcmluZ1JhbmdlO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtaW5EaXN0YW5jZSwgXCJtaW5EaXN0YW5jZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fc2NyZWVuUmVjdC54ID0gLXRoaXMuX2JnTm9kZS54IC0gY2MudmlzaWJsZVJlY3QuY2VudGVyLng7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlblJlY3QueSA9IC10aGlzLl9iZ05vZGUueSAtIGNjLnZpc2libGVSZWN0LmNlbnRlci55O1xyXG4gICAgICAgICAgICBsZXQgcm9sZVBvcyA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBnYW1lRW5lbXlzQ29udHJvbGxlci5lbmVteUxheWVyLmNoaWxkcmVuLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmFjdGl2ZSAmJiB2YWx1ZS5nZXRDb21wb25lbnQoRW5lbXkpLmhwID4gMCAmJiB0aGlzLl9zY3JlZW5SZWN0LmNvbnRhaW5zKHZhbHVlLnBvc2l0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1YiA9IHZhbHVlLnBvc2l0aW9uLnN1Yihyb2xlUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFnID0gc3ViLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWcgPCBtaW5EaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblN1YiA9IHN1YjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBtYWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15Tm9kZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChlbmVteU5vZGUpe1xyXG4gICAgICAgICAgICAgICAgLyoqIOi9rOWQkeaVjOS6uiAqL1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXJuVG8obWluU3ViKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9maXJlQ0QgPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIOagueaNruaUu+WHu+i3neemu+iuoeeul+aUu+WHu+WkueinkiAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRhY2tSYWRpYW4gPSBNYXRoLmF0YW4oZW5lbXlOb2RlLmdldENvbXBvbmVudChFbmVteSkuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMvbWluRGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW5TdWIuYW5nbGUoY2MudjIoMCwgMSkucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtdGhpcy5yb2xlLm5vZGUucm90YXRpb24pKSkgPCBhdHRhY2tSYWRpYW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogZmlyZSAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlQ0QgPSB0aGlzLmJ1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpciA9IGVuZW15Tm9kZS5wb3NpdGlvbi5zdWIocm9sZVBvcykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXIueCA9PSAwICYmIGRpci55ID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyID0gY2MudjIoMCwgMSkubm9ybWFsaXplKCkucm90YXRlKGNjLm1pc2MuZGVncmVlc1RvUmFkaWFucygtdGhpcy5yb2xlLm5vZGUucm90YXRpb24pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fYnVsbGV0RW1pdHRlciA9PSBCdWxsZXRFbWl0dGVyLlRZUEVTLkp1SmlRaWFuZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0U3RyaWtlUHJlZmFiID0gY2MubG9hZGVyLmdldFJlcyhcInByZWZhYi9lbnRpdGllcy9idWxsZXQvZmlyZTdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0U3RyaWtlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFN0cmlrZVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldFN0cmlrZUxheWVyLmFkZENoaWxkKGJ1bGxldFN0cmlrZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlTm9kZS5wb3NpdGlvbiA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLmFkZChkaXIubXVsKHRoaXMucm9sZS5ndW5Ub3BOb2RlLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZU5vZGUucm90YXRpb24gPSA5MCAtIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKGRpci55LCBkaXIueCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlTm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRTdHJpa2VOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2J1bGxldEVtaXR0ZXIgIT09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuSmlHdWFuZyAmJiB0aGlzLl9idWxsZXRFbWl0dGVyICE9PSBCdWxsZXRFbWl0dGVyLlRZUEVTLlBlblppKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZS5maXJlU3ByaXRlLm5vZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlLmZpcmVTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlLmZpcmVTcHJpdGUubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjA1LCAwLjUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZS5maXJlU3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5maXJlKHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLmFkZChkaXIubXVsKHRoaXMucm9sZS5ndW5Ub3BOb2RlLnkpKSwgZGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9ICdzb3VuZC9tc2NfZycrKCBcIjAwMDAwMDAwMDAwMDAwMDBcIiArIHRoaXMuX2J1bGxldEVtaXR0ZXIgKS5zdWJzdHIoIC0zICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE11c2ljLnBsYXlTRlgoc3RyLCBFbWl0dGVyU2Z4Vm9sdW1lc1t0aGlzLl9idWxsZXRFbWl0dGVyLTFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2J1bGxldEVtaXR0ZXJEZWxlZ2F0ZS5pc1VzZVVwKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWxsZXRFbWl0dGVyID0gQnVsbGV0RW1pdHRlci5UWVBFUy5TaG91UWlhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkpXHJcbiAgICB9XHJcblxyXG4gICAgdHVyblRvKGRpcjpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgZGVncmVlID0gKDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoZGlyLnksIGRpci54KSkpJTM2MDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlPT09PlwiLCBkZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGlyPT09Png9XCIrZGlyLngrXCIgeT1cIitkaXIueSk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZSA8IDApe1xyXG4gICAgICAgICAgICBkZWdyZWUgKz0gMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW5lbXlSb3RhdGlvbiA9IHRoaXMucm9sZS5ub2RlLnJvdGF0aW9uJTM2MDtcclxuICAgICAgICBpZiAoZW5lbXlSb3RhdGlvbiA8IDApe1xyXG4gICAgICAgICAgICBlbmVteVJvdGF0aW9uICs9IDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN1YkRlZ3JlZSA9IE1hdGguYWJzKGRlZ3JlZSAtIGVuZW15Um90YXRpb24pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVncmVlPVwiK2RlZ3JlZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJlbmVteVJvdGF0aW9uPT09PT5cIitlbmVteVJvdGF0aW9uKTtcclxuICAgICAgICBpZiAoc3ViRGVncmVlID4gMCl7XHJcbiAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzdWJEZWdyZWUgPiAxODApe1xyXG4gICAgICAgICAgICAgICAgcm90YXRpb24gPSBNYXRoLnNpZ24oZW5lbXlSb3RhdGlvbiAtIGRlZ3JlZSkgKiAxMDtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGlvbikgPiAzNjAgLSBzdWJEZWdyZWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gTWF0aC5zaWduKHJvdGF0aW9uKSooMzYwLXN1YkRlZ3JlZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gTWF0aC5zaWduKGRlZ3JlZSAtIGVuZW15Um90YXRpb24pICogMTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRpb24pID4gc3ViRGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IE1hdGguc2lnbihyb3RhdGlvbikgKiBzdWJEZWdyZWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5lbXlSb3RhdGlvbiArPSByb3RhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb2xlLm5vZGUucm90YXRpb24gPSBlbmVteVJvdGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hTdGFydChldmVudDpjYy5FdmVudC5FdmVudFRvdWNoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uVG91Y2hTdGFydD09PT5cIiwgdGhpcy5fdG91Y2hJZCwgR2FtZVByb3h5LnBhdXNlR2FtZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoSWQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2JNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmluZy5vcGFjaXR5ID0gUklOR19PUEFDSVRZO1xyXG4gICAgICAgICAgICB0aGlzLmRvdC5vcGFjaXR5ID0gUklOR19PUEFDSVRZO1xyXG4gICAgICAgICAgICAvLyDmm7TmlLnmkYfmnYbnmoTkvY3nva5cclxuICAgICAgICAgICAgdGhpcy5yaW5nLnNldFBvc2l0aW9uKGV2ZW50LmdldExvY2F0aW9uKCkuc3ViKGNjLnZpc2libGVSZWN0LmNlbnRlcikpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50OmNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Ub3VjaE1vdmU9PT0+XCIsIHRoaXMuX3RvdWNoSWQsIEdhbWVQcm94eS5wYXVzZUdhbWUpO1xyXG4gICAgICAgIGlmICghR2FtZVByb3h5LnBhdXNlR2FtZSAmJiBldmVudC5nZXRJRCgpID09IHRoaXMuX3RvdWNoSWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9iTW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmd1aWRlTm9kZS5hY3RpdmUgJiYgdGhpcy5kb3QucG9zaXRpb24ubWFnKCkgPiAzMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmd1aWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFdvcmxkLk15Lm5ld2JpZXMuZmluaXNoKFwiRmlyc3RFbnRyeUdhbWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChHYW1lQ29udHJvbGxlcikuc3RhcnRHZW5lcmF0aW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmRvdC5wb3NpdGlvbi5hZGQoZXZlbnQuZ2V0RGVsdGEoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHBvcy5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgaWYgKHBvcy5tYWcoKSA+PSB0aGlzLl9yYWRpdXMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3QucG9zaXRpb24gPSB0aGlzLl9kaXIubXVsKHRoaXMuX3JhZGl1cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGUuc3BlZWRUeXBlID0gU3BlZWRUeXBlLkZBU1Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpbmcucG9zaXRpb24gPSBldmVudC5nZXRMb2NhdGlvbigpLnN1YihjYy52aXNpYmxlUmVjdC5jZW50ZXIpLnN1Yih0aGlzLmRvdC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG90LnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlLnNwZWVkVHlwZSA9IFNwZWVkVHlwZS5OT1JNQUw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaEVuZChldmVudDpjYy5FdmVudC5FdmVudFRvdWNoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uVG91Y2hFbmQ9PT0+XCIsIHRoaXMuX3RvdWNoSWQsIEdhbWVQcm94eS5wYXVzZUdhbWUpO1xyXG4gICAgICAgIGlmICghR2FtZVByb3h5LnBhdXNlR2FtZSAmJiBldmVudC5nZXRJRCgpID09IHRoaXMuX3RvdWNoSWQpe1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9iTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbih0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PSBKb3lzdGlja1R5cGUuRk9MTE9XKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpbmcub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvdC5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLnJvbGUuc3BlZWRUeXBlID0gU3BlZWRUeXBlLlNUT1A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=