
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/RecommendController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvUmVjb21tZW5kQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkZBQXNGO0FBQ3RGLDJGQUFzRjtBQUN0Rix5RkFBb0Y7QUFDcEYsdUZBQWtGO0FBQ2xGLHFGQUFnRjtBQUNoRiwrRkFBMEY7QUFDMUYsdUZBQWtGO0FBQ2xGLG1GQUE4RTtBQUM5RSwrRkFBMEY7QUFDMUYsK0ZBQTBGO0FBQzFGLHlFQUFvRTtBQUNwRSw4Q0FBeUM7QUFDekMsOERBQXlEO0FBQ3pELHFFQUFrRTtBQUNsRSw2REFBMEQ7QUFDMUQsdUNBQW9DO0FBQ3BDLDJEQUFzRDtBQUN0RCxtREFBOEM7QUFDOUMsK0NBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWlELHVDQUFZO0lBQTdEO1FBQUEscUVBbUtDO1FBaEtHLFVBQUksR0FBUSxJQUFJLENBQUM7UUFHakIsYUFBTyxHQUFXLElBQUksQ0FBQztRQUd2QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRWpCLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFFWixZQUFNLEdBQUcsQ0FBQyxDQUFDOztJQXNKdkIsQ0FBQztJQXBKRyxvQ0FBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUM7WUFDakIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ3ZCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCxtQ0FBSyxHQUFMO1FBQUEsaUJBeUhDO1FBeEhHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFO1lBQ2xELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FB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LENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsS0FBSyxFQUFFLElBQUk7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO1FBRS9DLGdCQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSx3QkFBYyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBL0pEO1FBREMsUUFBUSxDQUFDLGNBQUksQ0FBQztxREFDRTtJQUdqQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ087SUFUUixtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQW1LdkM7SUFBRCwwQkFBQztDQW5LRCxBQW1LQyxDQW5LZ0QsRUFBRSxDQUFDLFNBQVMsR0FtSzVEO2tCQW5Lb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBCdWxsZXRFbWl0dGVyU2hvdVFpYW5nIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJTaG91UWlhbmdcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJKdUppUWlhbmcgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckp1SmlRaWFuZ1wiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckppYVRlTGluIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJKaWFUZUxpblwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckppR3VhbmcgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckppR3VhbmdcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJIdW9ZYW4gZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckh1b1lhblwiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckh1b0ppYW5Ub25nIGZyb20gXCIuLi9lbnRpdGllcy9idWxsZXRFbWl0dGVyL0J1bGxldEVtaXR0ZXJIdW9KaWFuVG9uZ1wiO1xyXG5pbXBvcnQgQnVsbGV0RW1pdHRlckxpWmlQYW8gZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlckxpWmlQYW9cIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJQZW5aaSBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVyUGVuWmlcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJTYW5EYW5RaWFuZyBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVyU2FuRGFuUWlhbmdcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXJTaGFuRGlhblFpdSBmcm9tIFwiLi4vZW50aXRpZXMvYnVsbGV0RW1pdHRlci9CdWxsZXRFbWl0dGVyU2hhbkRpYW5RaXVcIjtcclxuaW1wb3J0IEJ1bGxldEVtaXR0ZXIgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldEVtaXR0ZXIvQnVsbGV0RW1pdHRlclwiO1xyXG5pbXBvcnQgUm9sZSBmcm9tIFwiLi4vZW50aXRpZXMvcm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBBY3Rpb25zIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvYWN0aW9ucy9BY3Rpb25zXCI7XHJcbmltcG9ydCB7RXhjZWxDb25maWd9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvY29uZmlnL0V4Y2VsQ29uZmlnXCI7XHJcbmltcG9ydCB7RXhjZWxUYWJsZU5hbWVzfSBmcm9tIFwiLi4vY29uZmlnL0V4Y2VsVGFibGVOYW1lc1wiO1xyXG5pbXBvcnQge1dvcmxkfSBmcm9tIFwiLi4vaW5mby9Xb3JsZFwiO1xyXG5pbXBvcnQgRmFjYWRlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZmFjYWRlL0ZhY2FkZVwiO1xyXG5pbXBvcnQgSG9tZUNvbnRyb2xsZXIgZnJvbSBcIi4vSG9tZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbW1lbmRDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoUm9sZSlcclxuICAgIHJvbGU6Um9sZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB1c2VOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbm9Vc2VOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2ZpcmVDRCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ3VuSWQgPSAxO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjYy5nYW1lLm9uKFwidmlkZW9fM1wiLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMub25DbGlja1VzZURvKClcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLm5vVXNlTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVzZU5vZGUucG9zaXRpb24gPSB0aGlzLm5vVXNlTm9kZS5wb3NpdGlvbi5hZGQoY2MudjIoMCwgODcpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZ2FtZUJ1bGxldHNDb250cm9sbGVyID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXTtcclxuICAgICAgICBnYW1lQnVsbGV0c0NvbnRyb2xsZXIuYnVsbGV0TGF5ZXIub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfQURERUQsIChidWxsZXROb2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgIGJ1bGxldE5vZGUuZ3JvdXAgPSBcInVpXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGJ1bGxldEVtaXR0ZXI6QnVsbGV0RW1pdHRlciA9IG51bGw7XHJcbiAgICAgICAgbGV0IGJ1bGxldEVtaXR0ZXJUeXBlID0gMjtcclxuICAgICAgICBsZXQgd2VhcG9uQ29uZmlnID0gRXhjZWxDb25maWcuZ2V0RXhjZWxUYWJsZShFeGNlbFRhYmxlTmFtZXMuV2VhcG9uKS5maWx0ZXIodmFsdWUgPT4gdmFsdWVbJ2lkJ10gIT0gMSkuc29ydCgoKGEsIGIpID0+IGJbJ3VubG9jayddIC0gYVsndW5sb2NrJ10pKTtcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHdlYXBvbkNvbmZpZyl7XHJcbiAgICAgICAgICAgIGlmIChXb3JsZC5TdG9yYWdlLmdhbWVMZXZlbCA+PSBpdGVtWyd1bmxvY2snXSl7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyVHlwZSA9IGl0ZW1bJ2lkJ107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVsbGV0RW1pdHRlclR5cGUgPiA3KXtcclxuICAgICAgICAgICAgYnVsbGV0RW1pdHRlclR5cGUgPSA3O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ndW5JZCA9IGJ1bGxldEVtaXR0ZXJUeXBlO1xyXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIHByb21pc2VzLnB1c2goY2MubG9hZGVyLmxvYWRSZXNBd2FpdCgncHJlZmFiL2VudGl0aWVzL2J1bGxldC9idWxsZXQnK2J1bGxldEVtaXR0ZXJUeXBlKSk7XHJcbiAgICAgICAgaWYgKGJ1bGxldEVtaXR0ZXJUeXBlID09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuTGlaaVBhbyl7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goY2MubG9hZGVyLmxvYWRSZXNBd2FpdCgncHJlZmFiL2VudGl0aWVzL2J1bGxldC9idWxsZXQxMDgnKSk7XHJcbiAgICAgICAgfWVsc2UgaWYgKGJ1bGxldEVtaXR0ZXJUeXBlID09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuSHVvSmlhblRvbmcpe1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoJ3ByZWZhYi9lbnRpdGllcy9leHBsb3NpdmUvZXhwbG9zaXZlOScpKTtcclxuICAgICAgICB9ZWxzZSBpZiAoYnVsbGV0RW1pdHRlclR5cGUgPT0gQnVsbGV0RW1pdHRlci5UWVBFUy5KdUppUWlhbmcpe1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGNjLmxvYWRlci5sb2FkUmVzQXdhaXQoJ3ByZWZhYi9lbnRpdGllcy9idWxsZXQvZmlyZTcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVsbGV0RW1pdHRlclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLlNob3VRaWFuZzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJTaG91UWlhbmcoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5QZW5aaTpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJQZW5aaShnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLkppYVRlTGluOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIgPSBuZXcgQnVsbGV0RW1pdHRlckppYVRlTGluKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuU2FuRGFuUWlhbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlciA9IG5ldyBCdWxsZXRFbWl0dGVyU2FuRGFuUWlhbmcoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5KdUppUWlhbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlciA9IG5ldyBCdWxsZXRFbWl0dGVySnVKaVFpYW5nKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuTGlaaVBhbzpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJMaVppUGFvKGdhbWVCdWxsZXRzQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1bGxldEVtaXR0ZXIuVFlQRVMuSHVvSmlhblRvbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlciA9IG5ldyBCdWxsZXRFbWl0dGVySHVvSmlhblRvbmcoZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVsbGV0RW1pdHRlci5UWVBFUy5TaGFuRGlhblFpdTpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJTaGFuRGlhblFpdShnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLkppR3Vhbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlciA9IG5ldyBCdWxsZXRFbWl0dGVySmlHdWFuZyhnYW1lQnVsbGV0c0NvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWxsZXRFbWl0dGVyLlRZUEVTLkh1b1lhbjpcclxuICAgICAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyID0gbmV3IEJ1bGxldEVtaXR0ZXJIdW9ZYW4oZ2FtZUJ1bGxldHNDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWxsZXRFbWl0dGVyLmluaXQoYnVsbGV0RW1pdHRlclR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoYnVsbGV0RW1pdHRlclR5cGUgPT0gQnVsbGV0RW1pdHRlci5UWVBFUy5KaUd1YW5nKXtcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQgPSBidWxsZXRFbWl0dGVyLmdhbWVCdWxsZXRzQ29udHJvbGxlci5nZXRJbmFjdGl2ZUJ1bGxldChCdWxsZXRFbWl0dGVyLlRZUEVTLkppR3VhbmcpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBza2UgPSBidWxsZXQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgIHNrZS5zZXRTdGFydExpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZihuYW1lID09PSBcImppZ3VhbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5jb2xsaWRlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBcInh1bmVuZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrZS5zZXRBbmltYXRpb24oMCwgXCJqaWd1YW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihuYW1lID09PSBcImppZ3VhbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIuYnVsbGV0Q291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlci5fYnVsbGV0SmlHdWFuZ1NrZSA9IHNrZTtcclxuICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIuX2J1bGxldEppR3VhbmcgPSBidWxsZXQ7XHJcbiAgICAgICAgICAgICAgICBidWxsZXRFbWl0dGVyLl9idWxsZXRKaUd1YW5nLm5vZGUucm90YXRpb24gPSB0aGlzLnJvbGUubm9kZS5yb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgIGJ1bGxldEVtaXR0ZXIuX2J1bGxldEppR3Vhbmcubm9kZS5wb3NpdGlvbiA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLmFkZChjYy52MigwLCAxKS5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC10aGlzLnJvbGUubm9kZS5yb3RhdGlvbikpLm5vcm1hbGl6ZSgpLm11bCh0aGlzLnJvbGUuZ3VuVG9wTm9kZS55ICsgMjApKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKDAsIDEwMDApLnN1Yih0aGlzLnJvbGUubm9kZS5wb3NpdGlvbikubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKEFjdGlvbnMudXBkYXRlKGR0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9maXJlQ0QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZUNEIC09IGR0O1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmVDRCA9IGJ1bGxldEVtaXR0ZXIuaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bGxldEVtaXR0ZXJUeXBlID09IEJ1bGxldEVtaXR0ZXIuVFlQRVMuSnVKaVFpYW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldFN0cmlrZVByZWZhYiA9IGNjLmxvYWRlci5nZXRSZXMoXCJwcmVmYWIvZW50aXRpZXMvYnVsbGV0L2ZpcmU3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0U3RyaWtlTm9kZSA9IGNjLmluc3RhbnRpYXRlKGJ1bGxldFN0cmlrZVByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVCdWxsZXRzQ29udHJvbGxlci5idWxsZXRMYXllci5hZGRDaGlsZChidWxsZXRTdHJpa2VOb2RlLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlTm9kZS5wb3NpdGlvbiA9IHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLmFkZChkaXIubXVsKHRoaXMucm9sZS5ndW5Ub3BOb2RlLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0U3RyaWtlTm9kZS5yb3RhdGlvbiA9IDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoZGlyLnksIGRpci54KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldFN0cmlrZU5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRTdHJpa2VOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChidWxsZXRFbWl0dGVyVHlwZSAhPT0gQnVsbGV0RW1pdHRlci5UWVBFUy5KaUd1YW5nICYmIGJ1bGxldEVtaXR0ZXJUeXBlICE9PSBCdWxsZXRFbWl0dGVyLlRZUEVTLlBlblppKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlLmZpcmVTcHJpdGUubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZS5maXJlU3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlLmZpcmVTcHJpdGUubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjA1LCAwLjUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlLmZpcmVTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0RW1pdHRlci5maXJlKHRoaXMucm9sZS5ub2RlLnBvc2l0aW9uLmFkZChkaXIubXVsKHRoaXMucm9sZS5ndW5Ub3BOb2RlLnkpKSwgZGlyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tVc2UoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQdmlkZW/jgJEzIOijheWkh+aOqOiNkOOAkGNsaWNr44CRUmVjb21tZW5kQ29udHJvbGxlciBVc2VcIilcclxuXHJcbiAgICAgICAgV29ybGQuU3RvcmFnZS5fdmlkZW9TaWduPTNcclxuICAgICAgICBXb3JsZC5TdG9yYWdlLnZpZGVvQWRfc2hvdygpICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tVc2VEbygpe1xyXG4gICAgICAgIEdhbWVQcm94eS5wcmVwYXJlR3VuID0gdGhpcy5fZ3VuSWQ7XHJcbiAgICAgICAgRmFjYWRlLmZpbmRDb21wb25lbnQoXCJIb21lU2NlbmVcIiwgSG9tZUNvbnRyb2xsZXIpLnBsYXlFeGl0KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrTm9Vc2UoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQY2xpY2vjgJFSZWNvbW1lbmRDb250cm9sbGVyIE5vVXNlXCIpXHJcblxyXG4gICAgICAgIEZhY2FkZS5maW5kQ29tcG9uZW50KFwiSG9tZVNjZW5lXCIsIEhvbWVDb250cm9sbGVyKS5wbGF5RXhpdCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19