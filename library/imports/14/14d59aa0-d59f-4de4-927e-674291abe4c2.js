"use strict";
cc._RF.push(module, '14d59qg1Z9N5JJ+Z0KRq+TC', 'RecommendController');
// script/app/home/RecommendController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BulletEmitterShouQiang_1 = require("../entities/bulletEmitter/BulletEmitterShouQiang");
var BulletEmitterJuJiQiang_1 = require("../entities/bulletEmitter/BulletEmitterJuJiQiang");
var BulletEmitterJiaTeLin_1 = require("../entities/bulletEmitter/BulletEmitterJiaTeLin");
var BulletEmitterJiGuang_1 = require("../entities/bulletEmitter/BulletEmitterJiGuang");
var BulletEmitterHuoYan_1 = require("../entities/bulletEmitter/BulletEmitterHuoYan");
var BulletEmitterHuoJianTong_1 = require("../entities/bulletEmitter/BulletEmitterHuoJianTong");
var BulletEmitterLiZiPao_1 = require("../entities/bulletEmitter/BulletEmitterLiZiPao");
var BulletEmitterPenZi_1 = require("../entities/bulletEmitter/BulletEmitterPenZi");
var BulletEmitterSanDanQiang_1 = require("../entities/bulletEmitter/BulletEmitterSanDanQiang");
var BulletEmitterShanDianQiu_1 = require("../entities/bulletEmitter/BulletEmitterShanDianQiu");
var BulletEmitter_1 = require("../entities/bulletEmitter/BulletEmitter");
var Role_1 = require("../entities/role/Role");
var Actions_1 = require("../../../framework/actions/Actions");
var ExcelConfig_1 = require("../../../framework/config/ExcelConfig");
var ExcelTableNames_1 = require("../config/ExcelTableNames");
var World_1 = require("../info/World");
var Facade_1 = require("../../../framework/facade/Facade");
var HomeController_1 = require("./HomeController");
var GameProxy_1 = require("../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecommendController = /** @class */ (function (_super) {
    __extends(RecommendController, _super);
    function RecommendController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.role = null;
        _this.useNode = null;
        _this.noUseNode = null;
        _this._fireCD = 0;
        _this._gunId = 1;
        return _this;
    }
    RecommendController.prototype.onLoad = function () {
        var _this = this;
        cc.game.on("video_3", function () {
            _this.onClickUseDo();
        }, this);
    };
    RecommendController.prototype.start = function () {
        var _this = this;
        this.noUseNode.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.useNode.position = _this.noUseNode.position.add(cc.v2(0, 87));
        });
        var gameBulletsController = window['GameBulletsController'];
        gameBulletsController.bulletLayer.on(cc.Node.EventType.CHILD_ADDED, function (bulletNode) {
            bulletNode.group = "ui";
        });
        var bulletEmitter = null;
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
        this._gunId = bulletEmitterType;
        var promises = [];
        promises.push(cc.loader.loadResAwait('prefab/entities/bullet/bullet' + bulletEmitterType));
        if (bulletEmitterType == BulletEmitter_1.default.TYPES.LiZiPao) {
            promises.push(cc.loader.loadResAwait('prefab/entities/bullet/bullet108'));
        }
        else if (bulletEmitterType == BulletEmitter_1.default.TYPES.HuoJianTong) {
            promises.push(cc.loader.loadResAwait('prefab/entities/explosive/explosive9'));
        }
        else if (bulletEmitterType == BulletEmitter_1.default.TYPES.JuJiQiang) {
            promises.push(cc.loader.loadResAwait('prefab/entities/bullet/fire7'));
        }
        Promise.all(promises).then(function () {
            switch (bulletEmitterType) {
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
            bulletEmitter.init(bulletEmitterType);
            if (bulletEmitterType == BulletEmitter_1.default.TYPES.JiGuang) {
                var bullet_1 = bulletEmitter.gameBulletsController.getInactiveBullet(BulletEmitter_1.default.TYPES.JiGuang);
                bullet_1.collider.enabled = false;
                var ske_1 = bullet_1.getComponent(sp.Skeleton);
                ske_1.setStartListener(function (trackEntry, loopCount) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === "jiguang") {
                        bullet_1.collider.enabled = true;
                    }
                });
                ske_1.setCompleteListener(function (trackEntry, loopCount) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === "xuneng") {
                        ske_1.setAnimation(0, "jiguang", false);
                    }
                    else if (name === "jiguang") {
                        bulletEmitter.bulletCount--;
                        bullet_1.collider.enabled = false;
                        bullet_1.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                            if (!bullet_1.collider.enabled) {
                                bullet_1.node.active = false;
                            }
                        })));
                    }
                });
                bulletEmitter._bulletJiGuangSke = ske_1;
                bulletEmitter._bulletJiGuang = bullet_1;
                bulletEmitter._bulletJiGuang.node.rotation = _this.role.node.rotation;
                bulletEmitter._bulletJiGuang.node.position = _this.role.node.position.add(cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-_this.role.node.rotation)).normalize().mul(_this.role.gunTopNode.y + 20));
            }
            var dir = cc.v2(0, 1000).sub(_this.role.node.position).normalize();
            _this.node.runAction(Actions_1.default.update(function (dt) {
                if (_this._fireCD > 0) {
                    _this._fireCD -= dt;
                }
                else {
                    _this._fireCD = bulletEmitter.interval;
                    if (bulletEmitterType == BulletEmitter_1.default.TYPES.JuJiQiang) {
                        var bulletStrikePrefab = cc.loader.getRes("prefab/entities/bullet/fire7");
                        var bulletStrikeNode_1 = cc.instantiate(bulletStrikePrefab);
                        gameBulletsController.bulletLayer.addChild(bulletStrikeNode_1, 0);
                        bulletStrikeNode_1.position = _this.role.node.position.add(dir.mul(_this.role.gunTopNode.y));
                        bulletStrikeNode_1.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
                        bulletStrikeNode_1.getComponent(sp.Skeleton).setCompleteListener(function () {
                            bulletStrikeNode_1.destroy();
                        });
                    }
                    else if (bulletEmitterType !== BulletEmitter_1.default.TYPES.JiGuang && bulletEmitterType !== BulletEmitter_1.default.TYPES.PenZi) {
                        _this.role.fireSprite.node.scale = 1;
                        _this.role.fireSprite.node.active = true;
                        _this.role.fireSprite.node.runAction(cc.sequence(cc.scaleTo(0.05, 0.5), cc.callFunc(function () {
                            _this.role.fireSprite.node.active = false;
                        })));
                    }
                    bulletEmitter.fire(_this.role.node.position.add(dir.mul(_this.role.gunTopNode.y)), dir);
                }
            }));
        });
    };
    RecommendController.prototype.onClickUse = function (event, data) {
        console.log("【video】3 装备推荐【click】RecommendController Use");
        World_1.World.Storage._videoSign = 3;
        World_1.World.Storage.videoAd_show();
    };
    RecommendController.prototype.onClickUseDo = function () {
        GameProxy_1.GameProxy.prepareGun = this._gunId;
        Facade_1.default.findComponent("HomeScene", HomeController_1.default).playExit();
        this.node.destroy();
    };
    RecommendController.prototype.onClickNoUse = function (event, data) {
        console.log("【click】RecommendController NoUse");
        Facade_1.default.findComponent("HomeScene", HomeController_1.default).playExit();
        this.node.destroy();
    };
    __decorate([
        property(Role_1.default)
    ], RecommendController.prototype, "role", void 0);
    __decorate([
        property(cc.Node)
    ], RecommendController.prototype, "useNode", void 0);
    __decorate([
        property(cc.Node)
    ], RecommendController.prototype, "noUseNode", void 0);
    RecommendController = __decorate([
        ccclass
    ], RecommendController);
    return RecommendController;
}(cc.Component));
exports.default = RecommendController;

cc._RF.pop();