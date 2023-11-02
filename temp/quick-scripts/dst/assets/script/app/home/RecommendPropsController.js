
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/home/RecommendPropsController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2hvbWUvUmVjb21tZW5kUHJvcHNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFDekMsdUNBQW9DO0FBQ3BDLDJEQUFxRDtBQUNyRCw4RUFBeUU7QUFDbkUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsV0FBVztBQUNYLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUdoQztJQUFzRCw0Q0FBWTtJQUFsRTtRQUFBLHFFQTBKQztRQXZKRyxVQUFJLEdBQVEsSUFBSSxDQUFDO1FBR2pCLGtCQUFZLEdBQWUsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFXLElBQUksQ0FBQztRQUV6Qjs7YUFFSztRQUNHLGFBQU8sR0FBRyxDQUFDLENBQUM7O0lBeUl4QixDQUFDO0lBdklHLHlDQUFNLEdBQU47UUFBQSxpQkF5QkM7UUF4QkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsRCxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUkscUJBQXFCLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUQscUJBQXFCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFF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TCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsNkNBQVUsR0FBVixVQUFXLEtBQUssRUFBRSxJQUFJO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsQ0FBQTtRQUUvRCxhQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUE7UUFDMUIsYUFBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsK0NBQVksR0FBWjtRQUNJLGFBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsK0NBQVksR0FBWixVQUFhLEtBQUssRUFBRSxJQUFJO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUVwRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUF0SkQ7UUFEQyxRQUFRLENBQUMsY0FBSSxDQUFDOzBEQUNFO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0VBQ1U7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytEQUNPO0lBWlIsd0JBQXdCO1FBRDVDLE9BQU87T0FDYSx3QkFBd0IsQ0EwSjVDO0lBQUQsK0JBQUM7Q0ExSkQsQUEwSkMsQ0ExSnFELEVBQUUsQ0FBQyxTQUFTLEdBMEpqRTtrQkExSm9CLHdCQUF3QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgUm9sZSBmcm9tIFwiLi4vZW50aXRpZXMvcm9sZS9Sb2xlXCI7XHJcbmltcG9ydCB7V29ybGR9IGZyb20gXCIuLi9pbmZvL1dvcmxkXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuaW1wb3J0IEJ1bGxldE9mSmlhbkd1YW5nU2kgZnJvbSBcIi4uL2VudGl0aWVzL2J1bGxldC9CdWxsZXRPZkppYW5HdWFuZ1NpXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqIOS+r+mAieWIl+ihqCAqL1xyXG5jb25zdCBjYW5kaWRhdGVMaXN0ID0gWzMsIDQsIDVdO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb21tZW5kUHJvcHNDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoUm9sZSlcclxuICAgIHJvbGU6Um9sZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgZmFuZ0h1RHVuU2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHVzZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBub1VzZU5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgZPlhbdpZFxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgX3Byb3BJZCA9IDA7XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmZhbmdIdUR1blNrZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9Vc2VOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsICgpPT57XHJcbiAgICAgICAgICAgIHRoaXMudXNlTm9kZS5wb3NpdGlvbiA9IHRoaXMubm9Vc2VOb2RlLnBvc2l0aW9uLmFkZChjYy52MigwLCA4NykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBnYW1lQnVsbGV0c0NvbnRyb2xsZXIgPSB3aW5kb3dbJ0dhbWVCdWxsZXRzQ29udHJvbGxlciddO1xyXG4gICAgICAgIGdhbWVCdWxsZXRzQ29udHJvbGxlci5idWxsZXRMYXllci5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9BRERFRCwgKGJ1bGxldE5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgYnVsbGV0Tm9kZS5ncm91cCA9IFwidWlcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbGlzdCA9IGNhbmRpZGF0ZUxpc3QuZmlsdGVyKHZhbHVlID0+ICFXb3JsZC5NeS5wcm9wSW5mby5iZVVzaW5nKHZhbHVlKSk7XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBsaXN0ID0gY2FuZGlkYXRlTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcHJvcElkID0gZXh0LnJhbmRvbUVsZW1lbnQobGlzdCk7XHJcbiAgICAgICAgbGV0IHByZWZhYlBhdGggPSAncHJlZmFiL2VudGl0aWVzL2J1bGxldC9wcm9wQnVsbGV0Jyt0aGlzLl9wcm9wSWQ7XHJcblxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHByZWZhYlBhdGgsIGNjLlByZWZhYiwgKGVycm9yLCByZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihcInZpZGVvXzFcIiwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tVc2VEbygpXHJcbiAgICAgICAgfSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaG93bigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlU2hvd249PT0+XCIsIHRoaXMuX3Byb3BJZCk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9wcm9wSWQpe1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8qKiDlj5Hlh7oxMuS4quWcsOmbtyDmgKrnianouKnliLDlsLHkvJrniIbngrgg5Zyw6Zu35oyB57utMjBTICovXHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gNjtcclxuICAgICAgICAgICAgICAgIGxldCBvbmNlRGVncmVlID0gMzYwLzY7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25jZVRpbWUgPSAwLjA1O1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVMZW4gPSA4MDtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlU3BlZWQgPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVEdXJhdGlvbiA9IG1vdmVMZW4vbW92ZVNwZWVkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSAyMDtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IGNjLnYyKHRoaXMucm9sZS5ub2RlLngsIHRoaXMucm9sZS5ub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShpKm9uY2VUaW1lKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IHdpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVQcm9wQnVsbGV0KDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVncmVlID0gMzArIGkgKiBvbmNlRGVncmVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5yb3RhdGlvbiA9IGRlZ3JlZSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMSkucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLWRlZ3JlZSkpLm5vcm1hbGl6ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbyhtb3ZlRHVyYXRpb24sIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShtb3ZlRHVyYXRpb24sIGRpci5tdWwobW92ZUxlbikpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSh0aW1lKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKChpK251bSkqb25jZVRpbWUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVsbGV0ID0gd2luZG93WydHYW1lQnVsbGV0c0NvbnRyb2xsZXInXS5nZXRJbmFjdGl2ZVByb3BCdWxsZXQoMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWdyZWUgPSA2MCArIGkgKiBvbmNlRGVncmVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5yb3RhdGlvbiA9IGRlZ3JlZSAtIDkwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMSkucm90YXRlU2VsZihjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMoLWRlZ3JlZSkpLm5vcm1hbGl6ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSBzdGFydFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5ydW5BY3Rpb24oY2Muc2NhbGVUbyhtb3ZlRHVyYXRpb24sIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeShtb3ZlRHVyYXRpb24sIGRpci5tdWwobW92ZUxlbis2MCkpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0LmNvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSh0aW1lKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKHRpbWUrMSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTaG93bigpO1xyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLyoqIOaSreaUvuingeWFieatu+eahOWKqOeUuyAqL1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldCA9IDxCdWxsZXRPZkppYW5HdWFuZ1NpPndpbmRvd1snR2FtZUJ1bGxldHNDb250cm9sbGVyJ10uZ2V0SW5hY3RpdmVQcm9wQnVsbGV0KDQpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0Lm5vZGUucG9zaXRpb24gPSB0aGlzLnJvbGUubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCI2MTRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57fSk7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQubm9kZS5yZW1vdmVDb21wb25lbnQoQnVsbGV0T2ZKaWFuR3VhbmdTaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbmdIdUR1blNrZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbmdIdUR1blNrZS5zZXRBbmltYXRpb24oMCwgXCJzdGFydFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhbmdIdUR1blNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT5jb21wbGV0ZUxpcy4uXCIsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwic3RhcnRcIiB8fCBuYW1lID09IFwidHJhbnNpdGlvblwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYW5nSHVEdW5Ta2Uuc2V0QW5pbWF0aW9uKDAsIFwibG9vcHNcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubm9kZS5nZXRBY3Rpb25CeVRhZygxMTQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzcGVlZEFjdGlvbiA9IGNjLnNwZWVkKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS4yNSwgNzIwKSksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWRBY3Rpb24uc2V0VGFnKDExNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhbmdIdUR1blNrZS5ub2RlLnJ1bkFjdGlvbihzcGVlZEFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzcGVlZEFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMSwge19zcGVlZDoxfSwgeyBlYXNpbmc6ICdzaW5lSW4nfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tVc2UoZXZlbnQsIGRhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQdmlkZW/jgJExIOmBk+WFt+aOqOiNkOOAkGNsaWNr44CRUmVjb21tZW5kUHJvcHNDb250cm9sbGVyIFVzZVwiKVxyXG5cclxuICAgICAgICBXb3JsZC5TdG9yYWdlLl92aWRlb1NpZ249MVxyXG4gICAgICAgIFdvcmxkLlN0b3JhZ2UudmlkZW9BZF9zaG93KCkgXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1VzZURvKCkge1xyXG4gICAgICAgIFdvcmxkLk15LnByb3BJbmZvLnVzZSh0aGlzLl9wcm9wSWQpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja05vVXNlKGV2ZW50LCBkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkGNsaWNr44CRUmVjb21tZW5kUHJvcHNDb250cm9sbGVyIE5vVXNlXCIpXHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19