"use strict";
cc._RF.push(module, 'bb6edVloYVAk6hnOKWOg07b', 'RecommendPropsController');
// script/app/home/RecommendPropsController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("../entities/role/Role");
var World_1 = require("../info/World");
var Extend_1 = require("../../../framework/extend/Extend");
var BulletOfJianGuangSi_1 = require("../entities/bullet/BulletOfJianGuangSi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/** 侯选列表 */
var candidateList = [3, 4, 5];
var RecommendPropsController = /** @class */ (function (_super) {
    __extends(RecommendPropsController, _super);
    function RecommendPropsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.role = null;
        _this.fangHuDunSke = null;
        _this.useNode = null;
        _this.noUseNode = null;
        /**
         * 道具id
         * */
        _this._propId = 0;
        return _this;
    }
    RecommendPropsController.prototype.onLoad = function () {
        var _this = this;
        this.fangHuDunSke.node.active = false;
        this.noUseNode.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.useNode.position = _this.noUseNode.position.add(cc.v2(0, 87));
        });
        var gameBulletsController = window['GameBulletsController'];
        gameBulletsController.bulletLayer.on(cc.Node.EventType.CHILD_ADDED, function (bulletNode) {
            bulletNode.group = "ui";
        });
        var list = candidateList.filter(function (value) { return !World_1.World.My.propInfo.beUsing(value); });
        if (list.length == 0) {
            list = candidateList;
        }
        this._propId = Extend_1.ext.randomElement(list);
        var prefabPath = 'prefab/entities/bullet/propBullet' + this._propId;
        cc.loader.loadRes(prefabPath, cc.Prefab, function (error, resource) {
            if (error == null) {
                _this.updateShown();
            }
        });
        cc.game.on("video_1", function () {
            _this.onClickUseDo();
        }, this);
    };
    RecommendPropsController.prototype.updateShown = function () {
        var _this = this;
        console.log("updateShown===>", this._propId);
        switch (this._propId) {
            case 3:
                {
                    /** 发出12个地雷 怪物踩到就会爆炸 地雷持续20S */
                    var num = 6;
                    var onceDegree_1 = 360 / 6;
                    var onceTime = 0.05;
                    var moveLen_1 = 80;
                    var moveSpeed = 1000;
                    var moveDuration_1 = moveLen_1 / moveSpeed;
                    var time_1 = 20;
                    var startPos_1 = cc.v2(this.role.node.x, this.role.node.y);
                    var _loop_1 = function (i) {
                        this_1.node.runAction(cc.sequence(cc.delayTime(i * onceTime), cc.callFunc(function () {
                            var bullet = window['GameBulletsController'].getInactivePropBullet(3);
                            bullet.node.active = true;
                            var degree = 30 + i * onceDegree_1;
                            bullet.node.rotation = degree - 90;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-degree)).normalizeSelf();
                            bullet.node.position = startPos_1;
                            bullet.node.scale = 0;
                            bullet.node.runAction(cc.scaleTo(moveDuration_1, 1));
                            bullet.collider.enabled = false;
                            bullet.node.runAction(cc.sequence(cc.moveBy(moveDuration_1, dir.mul(moveLen_1)), cc.callFunc(function () {
                                bullet.collider.enabled = true;
                                bullet.node.runAction(cc.sequence(cc.delayTime(time_1), cc.callFunc(function () {
                                    bullet.node.active = false;
                                })));
                            })));
                        })));
                    };
                    var this_1 = this;
                    for (var i = 0; i < num; i++) {
                        _loop_1(i);
                    }
                    var _loop_2 = function (i) {
                        this_2.node.runAction(cc.sequence(cc.delayTime((i + num) * onceTime), cc.callFunc(function () {
                            var bullet = window['GameBulletsController'].getInactivePropBullet(3);
                            bullet.node.active = true;
                            var degree = 60 + i * onceDegree_1;
                            bullet.node.rotation = degree - 90;
                            var dir = cc.v2(0, 1).rotateSelf(cc.misc.degreesToRadians(-degree)).normalizeSelf();
                            bullet.node.position = startPos_1;
                            bullet.node.scale = 0;
                            bullet.node.runAction(cc.scaleTo(moveDuration_1, 1));
                            bullet.collider.enabled = false;
                            bullet.node.runAction(cc.sequence(cc.moveBy(moveDuration_1, dir.mul(moveLen_1 + 60)), cc.callFunc(function () {
                                bullet.collider.enabled = true;
                                bullet.node.runAction(cc.sequence(cc.delayTime(time_1), cc.callFunc(function () {
                                    bullet.node.active = false;
                                })));
                            })));
                        })));
                    };
                    var this_2 = this;
                    for (var i = 0; i < num; i++) {
                        _loop_2(i);
                    }
                    this.node.runAction(cc.sequence(cc.delayTime(time_1 + 1), cc.callFunc(function () {
                        _this.updateShown();
                    })));
                }
                break;
            case 4:
                {
                    /** 播放见光死的动画 */
                    var bullet = window['GameBulletsController'].getInactivePropBullet(4);
                    bullet.node.position = this.role.node.position;
                    bullet.node.active = true;
                    bullet.getComponent(sp.Skeleton).setAnimation(0, "614", true);
                    bullet.getComponent(sp.Skeleton).setCompleteListener(function () { });
                    bullet.node.removeComponent(BulletOfJianGuangSi_1.default);
                }
                break;
            case 5:
                this.fangHuDunSke.node.active = true;
                this.fangHuDunSke.setAnimation(0, "start", false);
                this.fangHuDunSke.setCompleteListener(function (trackEntry, loopCount) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    // console.log("=============>completeLis..", name);
                    if (name == "start" || name == "transition") {
                        _this.fangHuDunSke.setAnimation(0, "loops", false);
                        if (!_this.node.getActionByTag(114)) {
                            var speedAction = cc.speed(cc.repeatForever(cc.rotateBy(1.25, 720)), 0);
                            speedAction.setTag(114);
                            _this.fangHuDunSke.node.runAction(speedAction);
                            cc.tween(speedAction)
                                .to(1, { _speed: 1 }, { easing: 'sineIn' })
                                .start();
                        }
                    }
                });
                break;
        }
    };
    RecommendPropsController.prototype.onClickUse = function (event, data) {
        console.log("【video】1 道具推荐【click】RecommendPropsController Use");
        World_1.World.Storage._videoSign = 1;
        World_1.World.Storage.videoAd_show();
    };
    RecommendPropsController.prototype.onClickUseDo = function () {
        World_1.World.My.propInfo.use(this._propId);
        this.node.destroy();
    };
    RecommendPropsController.prototype.onClickNoUse = function (event, data) {
        console.log("【click】RecommendPropsController NoUse");
        this.node.destroy();
    };
    __decorate([
        property(Role_1.default)
    ], RecommendPropsController.prototype, "role", void 0);
    __decorate([
        property(sp.Skeleton)
    ], RecommendPropsController.prototype, "fangHuDunSke", void 0);
    __decorate([
        property(cc.Node)
    ], RecommendPropsController.prototype, "useNode", void 0);
    __decorate([
        property(cc.Node)
    ], RecommendPropsController.prototype, "noUseNode", void 0);
    RecommendPropsController = __decorate([
        ccclass
    ], RecommendPropsController);
    return RecommendPropsController;
}(cc.Component));
exports.default = RecommendPropsController;

cc._RF.pop();