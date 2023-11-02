
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/enemy/Enemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ab695SfTxHj46gL5xG1BMg', 'Enemy');
// script/app/entities/enemy/Enemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EnemyAABB_1 = require("./EnemyAABB");
var ExcelTableNames_1 = require("../../config/ExcelTableNames");
var ExcelConfig_1 = require("../../../../framework/config/ExcelConfig");
var GameProxy_1 = require("../../game/GameProxy");
var Music_1 = require("../../../../framework/audio/Music");
var Extend_1 = require("../../../../framework/extend/Extend");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AttackDelayList = [0.4, 0.4, 0, 0.2, 0.3, 0.3, 0.3, 0.5];
var BASE_TIME_SCALE = 1.5;
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        _this.attackCD = 1;
        _this._gameSlow = false;
        _this._moveSpeed = 0;
        /** 速度的加成 */
        _this._speedAdd = 1;
        _this._bAcc = false;
        _this.accSpeed = 0;
        _this.foundRange = 0;
        _this.attackDistance = 100;
        _this.bulletSpeed = 0;
        _this.unrepel = 0;
        _this.maxHp = 0;
        /** 死后爆汁缩放 */
        _this.humorScale = 1;
        /** 金币数 */
        _this.gold = 0;
        /** 金币图标掉落 */
        _this.goldIconFell = 1;
        _this.speedcut = 0;
        /** 移动标志 */
        _this.moveFlag = false;
        /** 转向角色标志 */
        _this.lookAtRoleFlag = false;
        /** 攻击冷却中 */
        _this.attackCoolingFlag = false;
        /** 逻辑处理标志 */
        _this.logicFlag = false;
        /** 移动方向 */
        _this.moveDir = cc.v2();
        /** 僵硬 */
        _this._stiff = false;
        _this._hp = 0;
        _this.hurt = 0;
        _this.hierarchy = 0;
        /** 综合属性 */
        /** 敏捷度 */
        _this.agility = 0;
        _this._strikeCompleteTime = 0;
        _this._spaceCircleCollider = null;
        _this._defenceBoxCollider = null;
        _this._enemyAABB = null;
        _this._bounds = cc.rect();
        _this._enemyID = 0;
        _this.attackDelayTime = -1;
        return _this;
    }
    Object.defineProperty(Enemy.prototype, "gameSlow", {
        set: function (value) {
            this._gameSlow = value;
            var timeScale = BASE_TIME_SCALE;
            if (this._gameSlow) {
                timeScale *= 0.2;
            }
            this.ske.timeScale = timeScale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "speedAdd", {
        get: function () {
            return this._speedAdd;
        },
        set: function (value) {
            this._speedAdd = value;
            this.ske.timeScale = BASE_TIME_SCALE * value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "bAcc", {
        set: function (value) {
            this._bAcc = value;
            if (this._bAcc && this.enemyID > 3) {
                Music_1.Music.playSFX("sound/msc_en003", 0.6);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "moveSpeed", {
        get: function () {
            return this._moveSpeed * (this._bAcc ? this.accSpeed : 1) * this._speedAdd * (this._gameSlow ? 0.2 : 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "stiff", {
        get: function () {
            return this._stiff;
        },
        set: function (value) {
            this._stiff = value;
            this.playStand();
        },
        enumerable: false,
        configurable: true
    });
    Enemy.prototype.doStiff = function (stiff) {
        var _this = this;
        this.stiff = true;
        var action = cc.sequence(cc.delayTime(stiff), cc.callFunc(function () { return _this.stiff = false; }));
        action.setTag(1230);
        this.node.stopActionByTag(1230);
        this.node.runAction(action);
    };
    Enemy.prototype.doSpeedcut = function () {
        var _this = this;
        if (this.speedcut > 0) {
            this.speedAdd = 1 - this.speedcut;
            var action = cc.sequence(cc.delayTime(0.15), cc.callFunc(function () { return _this.speedAdd = 1; }));
            action.setTag(2510);
            this.node.stopActionByTag(2510);
            this.node.runAction(action);
        }
    };
    Enemy.prototype.doRepel = function (dir, repel) {
        var _this = this;
        this.playBeaten();
        /** 计算与边线线段的交点 */
        var delta = dir.mul(repel);
        var destPos = this.node.position.add(delta);
        var intersections = [];
        if (dir.x > 0) {
            //右边界
            if (destPos.x >= this._bounds.xMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMax, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.x < 0) {
            //左边界
            if (destPos.x <= this._bounds.xMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMin, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        if (dir.y > 0) {
            //上边界
            if (destPos.y >= this._bounds.yMax) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMax), cc.v2(this._bounds.xMax, this._bounds.yMax), point)) {
                    intersections.push(point);
                }
            }
        }
        else if (dir.y < 0) {
            //上边界
            if (destPos.y <= this._bounds.yMin) {
                var point = cc.v2();
                if (cc.Intersection.pLineIntersect(this.node.position, destPos, cc.v2(this._bounds.xMin, this._bounds.yMin), cc.v2(this._bounds.xMax, this._bounds.yMin), point)) {
                    intersections.push(point);
                }
            }
        }
        if (intersections.length > 0) {
            // console.log("重新计算destPos===>intersections", intersections);
            /** 重新计算destPos */
            if (intersections.length == 1) {
                destPos = intersections[0].addSelf(dir.neg(cc.v2()));
            }
            else {
                /** 取距离怪物最近的那个点 */
                var p = intersections[0];
                var minDistance = p.sub(this.node.position).mag();
                for (var i = 1; i < intersections.length; i++) {
                    var mag = intersections[i].sub(this.node.position).mag();
                    if (mag < minDistance) {
                        p = intersections[i];
                        minDistance = mag;
                    }
                }
                destPos = p.addSelf(dir.neg(cc.v2()));
            }
        }
        var distance = destPos.sub(this.node.position).mag();
        var speed = 800;
        var action = cc.sequence(cc.moveTo(distance / speed, destPos).easing(cc.easeCircleActionOut()), cc.callFunc(function () {
            _this.playBeatenBack();
        }));
        action.setTag(582);
        this.node.stopActionByTag(582);
        this.node.runAction(action);
    };
    Object.defineProperty(Enemy.prototype, "hp", {
        get: function () {
            return this._hp;
        },
        set: function (value) {
            var _this = this;
            if (this._hp <= 0)
                return;
            var damage = this._hp - value;
            window['GameLabelsController'].fly("-" + Extend_1.ext.shortFormat(damage), this.node.position.add(cc.v2(0, this.spaceCircleCollider.radius)));
            this.ske.node.color = this.ske.node.color.fromHEX("#D85959");
            this.ske.node.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(function () { return _this.ske.node.color = cc.Color.WHITE; })));
            this._hp = value;
            if (value <= 0) {
                GameProxy_1.GameProxy.killCount++;
                GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.KillEnemy, this);
                this.node.stopAllActions();
                this._stiff = true;
                this.playDead();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "strikeCompleteTime", {
        get: function () {
            return this._strikeCompleteTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "spaceCircleCollider", {
        get: function () {
            return this._spaceCircleCollider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "defenceBoxCollider", {
        get: function () {
            return this._defenceBoxCollider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "enemyAABB", {
        get: function () {
            return this._enemyAABB;
        },
        enumerable: false,
        configurable: true
    });
    Enemy.prototype.reset = function () {
        var _this = this;
        this._hp = this.maxHp;
        this.stiff = false;
        this.speedAdd = 1;
        this.gameSlow = GameProxy_1.GameProxy.slowGame;
        this._bAcc = false;
        if (GameProxy_1.GameProxy.maxEnemyNum - GameProxy_1.GameProxy.enemyList.length >= GameProxy_1.GameProxy.levelConfig.amount_p1 + 1) {
            this.bAcc = true;
        }
        this.ske.timeScale = BASE_TIME_SCALE;
        this.moveFlag = false;
        this.lookAtRoleFlag = false;
        this.attackCoolingFlag = false;
        this.logicFlag = false;
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, function () {
            _this.moveDir = cc.v2(0, 1).normalize().rotate(cc.misc.degreesToRadians(-_this.node.rotation));
        });
        /** 朝向角色 */
        var dir = window['GameRoleController'].role.node.position.sub(this.node.position);
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x));
        this.playStand();
    };
    Enemy.prototype.onEnable = function () {
        this.reset();
    };
    Enemy.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    Enemy.prototype.start = function () {
        var bgNode = this.node.getParent().getParent();
        this._bounds.x = -bgNode.width / 2 + this.spaceCircleCollider.radius;
        this._bounds.y = -bgNode.height / 2 + this.spaceCircleCollider.radius;
        this._bounds.width = bgNode.width - this.spaceCircleCollider.radius * 2;
        this._bounds.height = bgNode.height - this.spaceCircleCollider.radius * 2;
    };
    Enemy.prototype.onLoad = function () {
        var _this = this;
        this._spaceCircleCollider = this.getComponent(cc.CircleCollider);
        this._defenceBoxCollider = this.getComponent(cc.BoxCollider);
        this._enemyAABB = this.getComponent(EnemyAABB_1.default);
        this.ske.setMix("strike", "stand", 0.1);
        this.ske.setMix("walk", "strike", 0.1);
        this.ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "strike") {
                _this.playStand();
                _this._strikeCompleteTime = new Date().getTime();
                _this.attackCoolingFlag = true;
                _this.node.runAction(cc.sequence(cc.delayTime(_this.attackCD), cc.callFunc(function () {
                    _this.attackCoolingFlag = false;
                })));
            }
            else if (name == "beaten") {
                _this.playStand();
            }
            else if (name == "dead") {
                _this.showBlood();
                _this.node.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(function () {
                    _this.node.active = false;
                })));
            }
            else if (name == "stand") {
                _this.playWalk();
            }
        });
    };
    Enemy.prototype.showBlood = function () {
        var bloodNode = window['GameEnemysController'].getInactiveEnemyBloodNode();
        bloodNode.active = true;
        bloodNode.position = this.node.position;
        bloodNode.rotation = Math.random() * 360;
        bloodNode.scale = this.humorScale;
        bloodNode.opacity = 255;
        bloodNode.runAction(cc.sequence(cc.delayTime(1), cc.fadeTo(0.5, 60), cc.callFunc(function () {
            bloodNode.active = false;
        })));
    };
    Enemy.prototype.isInAttackRange = function () {
        var sub = window['GameRoleController'].role.node.position.sub(this.node.position);
        var distance = sub.mag();
        //并且打不到敌人
        if (distance < this.attackDistance + window['GameRoleController'].role.spaceCircleCollider.radius) {
            // console.log("===============>怪物可以攻击了");
            /** 根据攻击距离计算攻击夹角 */
            var attackRadian = Math.atan(window['GameRoleController'].role.spaceCircleCollider.radius / distance);
            if (sub.angle(cc.v2(0, 1).rotate(cc.misc.degreesToRadians(-this.node.rotation))) < attackRadian) {
                return true;
            }
        }
        return false;
    };
    Enemy.prototype.doAttack = function () {
        /** 判断攻击角度与距离，在一定范围内则判断为攻击成功 */
        if (this.isInAttackRange()) {
            Music_1.Music.playSFX("sound/msc_en003");
            window['GameRoleController'].hp -= this.hurt;
        }
    };
    Object.defineProperty(Enemy.prototype, "enemyID", {
        get: function () {
            return this._enemyID;
        },
        enumerable: false,
        configurable: true
    });
    Enemy.prototype.init = function (id) {
        this._enemyID = id;
        var config = ExcelConfig_1.ExcelConfig.getExcelTable(ExcelTableNames_1.ExcelTableNames.Enemy)[id - 1];
        this.unrepel = config['unrepel'];
        this._moveSpeed = config['move'];
        this.accSpeed = config['acc_s'];
        this.foundRange = config['found_rg'];
        this.agility = config['agility'];
        this.attackDistance = config['range'];
        this.attackCD = config['fre'];
        this.bulletSpeed = config['speed'];
        this.maxHp = this._hp = Math.floor(config['health'] * GameProxy_1.GameProxy.enemyHpMulOf(this._enemyID));
        this.hurt = Math.floor(config['hurt'] * GameProxy_1.GameProxy.enemyHurtMulOf(config['id']));
        this.hierarchy = config['hierarchy'];
        this.humorScale = config['humor'];
        this.gold = Math.floor(config['gold_pro'] * GameProxy_1.GameProxy.enemyGoldMulOf(this._enemyID));
        this.goldIconFell = config['gold_fell'];
        this.speedcut = config['speedcut'];
        this.node.zIndex = this.hierarchy;
        this.attackDelayTime = AttackDelayList[id - 1];
        if (id > AttackDelayList.length) {
            console.error("_enemyID > AttackDelayList.length");
        }
    };
    Enemy.prototype.setAnimation = function (trackIndex, name, loop) {
        this.ske.setAnimation(trackIndex, name, loop);
        this.moveFlag = name == "walk";
        this.lookAtRoleFlag = name != "strike";
    };
    Enemy.prototype.stopAttack = function () {
        this.node.stopActionByTag(1199);
    };
    Enemy.prototype.playStand = function () {
        this.setAnimation(0, "stand", true);
    };
    Enemy.prototype.playAttack = function () {
        var _this = this;
        if (this.attackDelayTime >= 0) {
            var action = cc.speed(cc.sequence(cc.delayTime(this.attackDelayTime), cc.callFunc(function () {
                if (!GameProxy_1.GameProxy.pauseGame) {
                    _this.doAttack();
                }
            })), 1);
            action.setTag(1199);
            this.node.runAction(action);
        }
        this.setAnimation(0, "strike", false);
    };
    Enemy.prototype.playWalk = function () {
        this.setAnimation(0, "walk", true);
    };
    Enemy.prototype.playDead = function () {
        this.stopAttack();
        this.ske.timeScale = BASE_TIME_SCALE;
        this.setAnimation(0, "dead", false);
    };
    Enemy.prototype.playBeaten = function () {
        this.stopAttack();
        // console.log("beaten2.....");
        this.setAnimation(0, "beaten2", false);
    };
    Enemy.prototype.playBeatenBack = function () {
        // console.log("beaten.....");
        this.setAnimation(0, "beaten", false);
    };
    Enemy.prototype.isAttacking = function () {
        return this.ske.animation == "strike";
    };
    Enemy.prototype.isBeating = function () {
        return this.ske.animation == "beaten2" || this.ske.animation == "beaten";
    };
    Enemy.prototype.isWalking = function () {
        return this.ske.animation == "walk";
    };
    Enemy.prototype.isStanding = function () {
        return this.ske.animation == "stand";
    };
    Enemy.prototype.isDead = function () {
        return this._hp <= 0;
    };
    Enemy.prototype.turnTo = function (dir) {
        var degree = (90 - cc.misc.radiansToDegrees(Math.atan2(dir.y, dir.x))) % 360;
        // console.log("de===>", degree);
        // console.log("dir===>x="+dir.x+" y="+dir.y);
        if (degree < 0) {
            degree += 360;
        }
        var enemyRotation = this.node.rotation % 360;
        if (enemyRotation < 0) {
            enemyRotation += 360;
        }
        var subDegree = Math.abs(degree - enemyRotation);
        // console.log("degree="+degree);
        // console.log("enemyRotation====>"+enemyRotation);
        var speed = this._moveSpeed * this.agility * (this._bAcc ? 0.5 : 1) * this._speedAdd * (this._gameSlow ? 0.2 : 1);
        if (subDegree > 0) {
            var rotation = 0;
            if (subDegree > 180) {
                rotation = Math.sign(enemyRotation - degree) * speed;
                if (Math.abs(rotation) > 360 - subDegree) {
                    rotation = Math.sign(rotation) * (360 - subDegree);
                }
            }
            else {
                rotation = Math.sign(degree - enemyRotation) * speed;
                if (Math.abs(rotation) > subDegree) {
                    rotation = Math.sign(rotation) * subDegree;
                }
            }
            enemyRotation += rotation;
        }
        this.node.rotation = enemyRotation;
    };
    Enemy.prototype.move = function () {
        // console.log("len===>", len);
        var len = this.moveSpeed;
        if (len <= 0)
            return false;
        /** 沿着当前方向移动 */
        var position = this.node.position.add(this.moveDir.mul(len));
        /** 判断与角色的碰撞 */
        // let toRoleDistance = position.sub(window['GameRoleController'].role.node.position).mag();
        // if (toRoleDistance < this.spaceCircleCollider.radius + window['GameRoleController'].role.spaceCircleCollider.radius){
        //     return false;
        // }
        /** 判断边界 */
        if (position.x > this._bounds.xMax || position.x < this._bounds.xMin || position.y > this._bounds.yMax || position.y < this._bounds.yMin) {
            return false;
        }
        if (!this._bAcc && this.foundRange > 0) {
            var toRoleDistance = position.sub(window['GameRoleController'].role.node.position).mag();
            this.bAcc = toRoleDistance - len < this.foundRange;
        }
        /** 判断怪物之间的碰撞 */
        // let arr = [];
        // this._gameCollisionController.looseQuadTree.retrieve(this.enemyAABB.aabb(),arr);
        //
        // for (let aabbRegion of arr){
        //     let enemy = aabbRegion.enemy;
        //     if (enemy !== this && enemy.node.position.sub(position).mag() < enemy.spaceCircleCollider.radius + enemy.spaceCircleCollider.radius){
        //         return false;
        //     }
        // }
        this.node.position = position;
        return true;
    };
    Enemy.prototype.update = function (dt) {
        if (GameProxy_1.GameProxy.pauseGame || this.stiff) {
            return;
        }
        /** 逻辑处理标志--优化策略为每一帧只处理固定数量的怪物逻辑 */
        if (this.logicFlag) {
            /** 是否可以攻击 */
            if ((this.isWalking() || this.isStanding()) && this.isInAttackRange()) {
                this.playAttack();
            }
            /** 旋转 */
            if (this.lookAtRoleFlag) {
                this.turnTo(window['GameRoleController'].role.node.position.sub(this.node.position).normalize());
            }
        }
        /** 移动 */
        if (this.moveFlag) {
            this.move();
        }
    };
    __decorate([
        property(sp.Skeleton)
    ], Enemy.prototype, "ske", void 0);
    Enemy = __decorate([
        ccclass
    ], Enemy);
    return Enemy;
}(cc.Component));
exports.default = Enemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL2VuZW15L0VuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBb0M7QUFDcEMsZ0VBQTZEO0FBQzdELHdFQUFxRTtBQUNyRSxrREFBK0M7QUFDL0MsMkRBQXdEO0FBQ3hELDhEQUF3RDtBQUVsRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUUvRCxJQUFNLGVBQWUsR0FBRyxHQUFHLENBQUM7QUFHNUI7SUFBbUMseUJBQVk7SUFBL0M7UUFBQSxxRUFnaUJDO1FBN2hCRyxTQUFHLEdBQWUsSUFBSSxDQUFDO1FBRXZCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFTCxlQUFTLEdBQUcsS0FBSyxDQUFDO1FBWWhCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLFlBQVk7UUFDRixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBV2QsV0FBSyxHQUFHLEtBQUssQ0FBQztRQVV4QixjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUVyQixpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosV0FBSyxHQUFHLENBQUMsQ0FBQztRQUVWLGFBQWE7UUFDYixnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUVmLFVBQVU7UUFDVixVQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsYUFBYTtRQUNiLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixXQUFXO1FB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c0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgRW5lbXlBQUJCIGZyb20gXCIuL0VuZW15QUFCQlwiO1xyXG5pbXBvcnQge0V4Y2VsVGFibGVOYW1lc30gZnJvbSBcIi4uLy4uL2NvbmZpZy9FeGNlbFRhYmxlTmFtZXNcIjtcclxuaW1wb3J0IHtFeGNlbENvbmZpZ30gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb25maWcvRXhjZWxDb25maWdcIjtcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5pbXBvcnQge011c2ljfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2F1ZGlvL011c2ljXCI7XHJcbmltcG9ydCB7ZXh0fSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2V4dGVuZC9FeHRlbmRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgQXR0YWNrRGVsYXlMaXN0ID0gWzAuNCwgMC40LCAwLCAwLjIsIDAuMywgMC4zLCAwLjMsIDAuNV07XHJcblxyXG5jb25zdCBCQVNFX1RJTUVfU0NBTEUgPSAxLjU7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgc2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBhdHRhY2tDRCA9IDE7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FtZVNsb3cgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgc2V0IGdhbWVTbG93KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZVNsb3cgPSB2YWx1ZTtcclxuICAgICAgICBsZXQgdGltZVNjYWxlID0gQkFTRV9USU1FX1NDQUxFO1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lU2xvdyl7XHJcbiAgICAgICAgICAgIHRpbWVTY2FsZSAqPSAwLjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tlLnRpbWVTY2FsZSA9IHRpbWVTY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX21vdmVTcGVlZCA9IDA7XHJcblxyXG4gICAgLyoqIOmAn+W6pueahOWKoOaIkCAqL1xyXG4gICAgcHJvdGVjdGVkIF9zcGVlZEFkZCA9IDE7XHJcblxyXG4gICAgZ2V0IHNwZWVkQWRkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkQWRkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzcGVlZEFkZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3BlZWRBZGQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNrZS50aW1lU2NhbGUgPSBCQVNFX1RJTUVfU0NBTEUqdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9iQWNjID0gZmFsc2U7XHJcblxyXG5cclxuICAgIHNldCBiQWNjKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYkFjYyA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9iQWNjICYmIHRoaXMuZW5lbXlJRCA+IDMpe1xyXG4gICAgICAgICAgICBNdXNpYy5wbGF5U0ZYKFwic291bmQvbXNjX2VuMDAzXCIsIDAuNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFjY1NwZWVkID0gMDtcclxuXHJcbiAgICBmb3VuZFJhbmdlID0gMDtcclxuXHJcbiAgICBhdHRhY2tEaXN0YW5jZSA9IDEwMDtcclxuXHJcbiAgICBidWxsZXRTcGVlZCA9IDA7XHJcblxyXG4gICAgdW5yZXBlbCA9IDA7XHJcblxyXG4gICAgbWF4SHAgPSAwO1xyXG5cclxuICAgIC8qKiDmrbvlkI7niIbmsYHnvKnmlL4gKi9cclxuICAgIGh1bW9yU2NhbGUgPSAxO1xyXG5cclxuICAgIC8qKiDph5HluIHmlbAgKi9cclxuICAgIGdvbGQgPSAwO1xyXG5cclxuICAgIC8qKiDph5HluIHlm77moIfmjonokL0gKi9cclxuICAgIGdvbGRJY29uRmVsbCA9IDE7XHJcblxyXG4gICAgc3BlZWRjdXQgPSAwO1xyXG5cclxuICAgIC8qKiDnp7vliqjmoIflv5cgKi9cclxuICAgIG1vdmVGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOi9rOWQkeinkuiJsuagh+W/lyAqL1xyXG4gICAgbG9va0F0Um9sZUZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAvKiog5pS75Ye75Ya35Y205LitICovXHJcbiAgICBhdHRhY2tDb29saW5nRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiDpgLvovpHlpITnkIbmoIflv5cgKi9cclxuICAgIGxvZ2ljRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiDnp7vliqjmlrnlkJEgKi9cclxuICAgIG1vdmVEaXIgPSBjYy52MigpO1xyXG5cclxuXHJcbiAgICBnZXQgbW92ZVNwZWVkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vdmVTcGVlZCoodGhpcy5fYkFjYz90aGlzLmFjY1NwZWVkOjEpICogdGhpcy5fc3BlZWRBZGQgKiAodGhpcy5fZ2FtZVNsb3c/MC4yOjEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlg7XnoawgKi9cclxuICAgIHByaXZhdGUgX3N0aWZmID0gZmFsc2U7XHJcblxyXG5cclxuICAgIGdldCBzdGlmZigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RpZmY7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHN0aWZmKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc3RpZmYgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnBsYXlTdGFuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvU3RpZmYoc3RpZmY6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnN0aWZmID0gdHJ1ZTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKHN0aWZmKSwgY2MuY2FsbEZ1bmMoKCk9PnRoaXMuc3RpZmYgPSBmYWxzZSkpO1xyXG4gICAgICAgIGFjdGlvbi5zZXRUYWcoMTIzMCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZygxMjMwKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9TcGVlZGN1dCgpe1xyXG4gICAgICAgIGlmICh0aGlzLnNwZWVkY3V0ID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWRBZGQgPSAxIC0gdGhpcy5zcGVlZGN1dDtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjE1KSwgY2MuY2FsbEZ1bmMoKCk9PnRoaXMuc3BlZWRBZGQgPSAxKSk7XHJcbiAgICAgICAgICAgIGFjdGlvbi5zZXRUYWcoMjUxMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoMjUxMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9SZXBlbChkaXI6Y2MuVmVjMiwgcmVwZWw6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnBsYXlCZWF0ZW4oKTtcclxuICAgICAgICAvKiog6K6h566X5LiO6L6557q/57q/5q6155qE5Lqk54K5ICovXHJcbiAgICAgICAgbGV0IGRlbHRhID0gZGlyLm11bChyZXBlbCk7XHJcbiAgICAgICAgbGV0IGRlc3RQb3MgPSB0aGlzLm5vZGUucG9zaXRpb24uYWRkKGRlbHRhKTtcclxuICAgICAgICBsZXQgaW50ZXJzZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmIChkaXIueCA+IDApe1xyXG4gICAgICAgICAgICAvL+WPs+i+ueeVjFxyXG4gICAgICAgICAgICBpZiAoZGVzdFBvcy54ID49IHRoaXMuX2JvdW5kcy54TWF4KXtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBpZihjYy5JbnRlcnNlY3Rpb24ucExpbmVJbnRlcnNlY3QodGhpcy5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNaW4pLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNYXgpLCBwb2ludCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbnMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZiAoZGlyLnggPCAwKSB7XHJcbiAgICAgICAgICAgIC8v5bem6L6555WMXHJcbiAgICAgICAgICAgIGlmIChkZXN0UG9zLnggPD0gdGhpcy5fYm91bmRzLnhNaW4pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIGlmKGNjLkludGVyc2VjdGlvbi5wTGluZUludGVyc2VjdCh0aGlzLm5vZGUucG9zaXRpb24sIGRlc3RQb3MsIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1pbiksIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1heCksIHBvaW50KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpci55ID4gMCl7XHJcbiAgICAgICAgICAgIC8v5LiK6L6555WMXHJcbiAgICAgICAgICAgIGlmIChkZXN0UG9zLnkgPj0gdGhpcy5fYm91bmRzLnlNYXgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gY2MudjIoKTtcclxuICAgICAgICAgICAgICAgIGlmKGNjLkludGVyc2VjdGlvbi5wTGluZUludGVyc2VjdCh0aGlzLm5vZGUucG9zaXRpb24sIGRlc3RQb3MsIGNjLnYyKHRoaXMuX2JvdW5kcy54TWluLCB0aGlzLl9ib3VuZHMueU1heCksIGNjLnYyKHRoaXMuX2JvdW5kcy54TWF4LCB0aGlzLl9ib3VuZHMueU1heCksIHBvaW50KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmIChkaXIueSA8IDApe1xyXG4gICAgICAgICAgICAvL+S4iui+ueeVjFxyXG4gICAgICAgICAgICBpZiAoZGVzdFBvcy55IDw9IHRoaXMuX2JvdW5kcy55TWluKXtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IGNjLnYyKCk7XHJcbiAgICAgICAgICAgICAgICBpZihjYy5JbnRlcnNlY3Rpb24ucExpbmVJbnRlcnNlY3QodGhpcy5ub2RlLnBvc2l0aW9uLCBkZXN0UG9zLCBjYy52Mih0aGlzLl9ib3VuZHMueE1pbiwgdGhpcy5fYm91bmRzLnlNaW4pLCBjYy52Mih0aGlzLl9ib3VuZHMueE1heCwgdGhpcy5fYm91bmRzLnlNaW4pLCBwb2ludCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbnMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumHjeaWsOiuoeeul2Rlc3RQb3M9PT0+aW50ZXJzZWN0aW9uc1wiLCBpbnRlcnNlY3Rpb25zKTtcclxuICAgICAgICAgICAgLyoqIOmHjeaWsOiuoeeul2Rlc3RQb3MgKi9cclxuICAgICAgICAgICAgaWYgKGludGVyc2VjdGlvbnMubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgZGVzdFBvcyA9IGludGVyc2VjdGlvbnNbMF0uYWRkU2VsZihkaXIubmVnKGNjLnYyKCkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8qKiDlj5bot53nprvmgKrnianmnIDov5HnmoTpgqPkuKrngrkgKi9cclxuICAgICAgICAgICAgICAgIGxldCBwID0gaW50ZXJzZWN0aW9uc1swXTtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IHAuc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTE7IGk8aW50ZXJzZWN0aW9ucy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hZyA9IGludGVyc2VjdGlvbnNbaV0uc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hZyA8IG1pbkRpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IGludGVyc2VjdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gbWFnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlc3RQb3MgPSBwLmFkZFNlbGYoZGlyLm5lZyhjYy52MigpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gZGVzdFBvcy5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5tYWcoKTtcclxuICAgICAgICBsZXQgc3BlZWQgPSA4MDA7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGNjLm1vdmVUbyhkaXN0YW5jZS9zcGVlZCwgZGVzdFBvcykuZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25PdXQoKSksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJlYXRlbkJhY2soKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgYWN0aW9uLnNldFRhZyg1ODIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWN0aW9uQnlUYWcoNTgyKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaHAgPSAwO1xyXG5cclxuICAgIGdldCBocCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaHAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9ocCA8PSAwKXJldHVybjtcclxuICAgICAgICBsZXQgZGFtYWdlID0gdGhpcy5faHAgLSB2YWx1ZTtcclxuICAgICAgICB3aW5kb3dbJ0dhbWVMYWJlbHNDb250cm9sbGVyJ10gLmZseShgLSR7ZXh0LnNob3J0Rm9ybWF0KGRhbWFnZSl9YCwgdGhpcy5ub2RlLnBvc2l0aW9uLmFkZChjYy52MigwLCB0aGlzLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzKSkpO1xyXG4gICAgICAgIHRoaXMuc2tlLm5vZGUuY29sb3IgPSB0aGlzLnNrZS5ub2RlLmNvbG9yLmZyb21IRVgoXCIjRDg1OTU5XCIpO1xyXG4gICAgICAgIHRoaXMuc2tlLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjA1KSwgY2MuY2FsbEZ1bmMoKCk9PnRoaXMuc2tlLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURSkpKTtcclxuICAgICAgICB0aGlzLl9ocCA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSA8PSAwKXtcclxuICAgICAgICAgICAgR2FtZVByb3h5LmtpbGxDb3VudCsrO1xyXG4gICAgICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuS2lsbEVuZW15LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0aWZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5RGVhZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBodXJ0ID0gMDtcclxuXHJcbiAgICBoaWVyYXJjaHkgPSAwO1xyXG5cclxuICAgIC8qKiDnu7zlkIjlsZ7mgKcgKi9cclxuXHJcbiAgICAvKiog5pWP5o235bqmICovXHJcbiAgICBhZ2lsaXR5ID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9zdHJpa2VDb21wbGV0ZVRpbWUgPSAwO1xyXG5cclxuXHJcbiAgICBnZXQgc3RyaWtlQ29tcGxldGVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmlrZUNvbXBsZXRlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zcGFjZUNpcmNsZUNvbGxpZGVyOmNjLkNpcmNsZUNvbGxpZGVyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kZWZlbmNlQm94Q29sbGlkZXI6Y2MuQm94Q29sbGlkZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBnZXQgc3BhY2VDaXJjbGVDb2xsaWRlcigpOiBjYy5DaXJjbGVDb2xsaWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwYWNlQ2lyY2xlQ29sbGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmVuY2VCb3hDb2xsaWRlcigpOiBjYy5Cb3hDb2xsaWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmVuY2VCb3hDb2xsaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9lbmVteUFBQkI6RW5lbXlBQUJCID0gbnVsbDtcclxuXHJcblxyXG4gICAgZ2V0IGVuZW15QUFCQigpOiBFbmVteUFBQkIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmVteUFBQkI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYm91bmRzID0gY2MucmVjdCgpO1xyXG5cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5faHAgPSB0aGlzLm1heEhwO1xyXG4gICAgICAgIHRoaXMuc3RpZmYgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkQWRkID0gMTtcclxuICAgICAgICB0aGlzLmdhbWVTbG93ID0gR2FtZVByb3h5LnNsb3dHYW1lO1xyXG4gICAgICAgIHRoaXMuX2JBY2MgPSBmYWxzZTtcclxuICAgICAgICBpZiAoR2FtZVByb3h5Lm1heEVuZW15TnVtIC0gR2FtZVByb3h5LmVuZW15TGlzdC5sZW5ndGggID49IEdhbWVQcm94eS5sZXZlbENvbmZpZy5hbW91bnRfcDErMSl7XHJcbiAgICAgICAgICAgIHRoaXMuYkFjYyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tlLnRpbWVTY2FsZSA9IEJBU0VfVElNRV9TQ0FMRTtcclxuICAgICAgICB0aGlzLm1vdmVGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb29rQXRSb2xlRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGluZ0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvZ2ljRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VELCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIgPSBjYy52MigwLCAxKS5ub3JtYWxpemUoKS5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC10aGlzLm5vZGUucm90YXRpb24pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKiog5pyd5ZCR6KeS6ImyICovXHJcbiAgICAgICAgbGV0IGRpciA9IHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ10ucm9sZS5ub2RlLnBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoZGlyLnksIGRpci54KSk7XHJcbiAgICAgICAgdGhpcy5wbGF5U3RhbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGxldCBiZ05vZGUgPSB0aGlzLm5vZGUuZ2V0UGFyZW50KCkuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzLnggPSAtYmdOb2RlLndpZHRoLzIgKyB0aGlzLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy55ID0gLWJnTm9kZS5oZWlnaHQvMiArIHRoaXMuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmRzLndpZHRoID0gYmdOb2RlLndpZHRoIC0gdGhpcy5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyoyO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBiZ05vZGUuaGVpZ2h0IC0gdGhpcy5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyoyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMuX3NwYWNlQ2lyY2xlQ29sbGlkZXIgPSB0aGlzLmdldENvbXBvbmVudChjYy5DaXJjbGVDb2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5fZGVmZW5jZUJveENvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuX2VuZW15QUFCQiA9IHRoaXMuZ2V0Q29tcG9uZW50KEVuZW15QUFCQik7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0TWl4KFwic3RyaWtlXCIsIFwic3RhbmRcIiwgMC4xKTtcclxuICAgICAgICB0aGlzLnNrZS5zZXRNaXgoXCJ3YWxrXCIsIFwic3RyaWtlXCIsIDAuMSk7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwic3RyaWtlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVN0YW5kKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJpa2VDb21wbGV0ZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrQ29vbGluZ0ZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUodGhpcy5hdHRhY2tDRCksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tDb29saW5nRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKG5hbWUgPT0gXCJiZWF0ZW5cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTdGFuZCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAobmFtZSA9PSBcImRlYWRcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCbG9vZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMCksIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKG5hbWUgPT0gXCJzdGFuZFwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVdhbGsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0Jsb29kKCl7XHJcbiAgICAgICAgbGV0IGJsb29kTm9kZSA9IHdpbmRvd1snR2FtZUVuZW15c0NvbnRyb2xsZXInXS5nZXRJbmFjdGl2ZUVuZW15Qmxvb2ROb2RlKCk7XHJcbiAgICAgICAgYmxvb2ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYmxvb2ROb2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGJsb29kTm9kZS5yb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkqMzYwO1xyXG4gICAgICAgIGJsb29kTm9kZS5zY2FsZSA9IHRoaXMuaHVtb3JTY2FsZTtcclxuICAgICAgICBibG9vZE5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBibG9vZE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgxKSwgY2MuZmFkZVRvKDAuNSwgNjApLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBibG9vZE5vZGUuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW5BdHRhY2tSYW5nZSgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IHN1YiA9IHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ10ucm9sZS5ub2RlLnBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHN1Yi5tYWcoKTtcclxuICAgICAgICAvL+W5tuS4lOaJk+S4jeWIsOaVjOS6ulxyXG5cclxuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLmF0dGFja0Rpc3RhbmNlICsgd2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT0+5oCq54mp5Y+v5Lul5pS75Ye75LqGXCIpO1xyXG4gICAgICAgICAgICAvKiog5qC55o2u5pS75Ye76Led56a76K6h566X5pS75Ye75aS56KeSICovXHJcbiAgICAgICAgICAgIGxldCBhdHRhY2tSYWRpYW4gPSBNYXRoLmF0YW4od2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzL2Rpc3RhbmNlKTtcclxuICAgICAgICAgICAgaWYgKHN1Yi5hbmdsZShjYy52MigwLCAxKS5yb3RhdGUoY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKC10aGlzLm5vZGUucm90YXRpb24pKSkgPCBhdHRhY2tSYWRpYW4pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb0F0dGFjaygpe1xyXG4gICAgICAgIC8qKiDliKTmlq3mlLvlh7vop5LluqbkuI7ot53nprvvvIzlnKjkuIDlrprojIPlm7TlhoXliJnliKTmlq3kuLrmlLvlh7vmiJDlip8gKi9cclxuICAgICAgICBpZiAodGhpcy5pc0luQXR0YWNrUmFuZ2UoKSl7XHJcbiAgICAgICAgICAgIE11c2ljLnBsYXlTRlgoXCJzb3VuZC9tc2NfZW4wMDNcIik7XHJcbiAgICAgICAgICAgIHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ10uaHAgLT0gdGhpcy5odXJ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2VuZW15SUQgPSAwO1xyXG5cclxuXHJcbiAgICBnZXQgZW5lbXlJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmVteUlEO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoaWQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9lbmVteUlEID0gaWQ7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEV4Y2VsQ29uZmlnLmdldEV4Y2VsVGFibGUoRXhjZWxUYWJsZU5hbWVzLkVuZW15KVtpZC0xXTtcclxuICAgICAgICB0aGlzLnVucmVwZWwgPSBjb25maWdbJ3VucmVwZWwnXTtcclxuICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSBjb25maWdbJ21vdmUnXTtcclxuICAgICAgICB0aGlzLmFjY1NwZWVkID0gY29uZmlnWydhY2NfcyddO1xyXG4gICAgICAgIHRoaXMuZm91bmRSYW5nZSA9IGNvbmZpZ1snZm91bmRfcmcnXTtcclxuICAgICAgICB0aGlzLmFnaWxpdHkgPSBjb25maWdbJ2FnaWxpdHknXTtcclxuICAgICAgICB0aGlzLmF0dGFja0Rpc3RhbmNlID0gY29uZmlnWydyYW5nZSddO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ0QgPSBjb25maWdbJ2ZyZSddO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0U3BlZWQgPSBjb25maWdbJ3NwZWVkJ107XHJcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuX2hwID0gTWF0aC5mbG9vcihjb25maWdbJ2hlYWx0aCddKkdhbWVQcm94eS5lbmVteUhwTXVsT2YodGhpcy5fZW5lbXlJRCkpO1xyXG4gICAgICAgIHRoaXMuaHVydCA9IE1hdGguZmxvb3IoY29uZmlnWydodXJ0J10gKiBHYW1lUHJveHkuZW5lbXlIdXJ0TXVsT2YoY29uZmlnWydpZCddKSk7XHJcbiAgICAgICAgdGhpcy5oaWVyYXJjaHkgPSBjb25maWdbJ2hpZXJhcmNoeSddO1xyXG4gICAgICAgIHRoaXMuaHVtb3JTY2FsZSA9IGNvbmZpZ1snaHVtb3InXTtcclxuICAgICAgICB0aGlzLmdvbGQgPSBNYXRoLmZsb29yKGNvbmZpZ1snZ29sZF9wcm8nXSAqIEdhbWVQcm94eS5lbmVteUdvbGRNdWxPZih0aGlzLl9lbmVteUlEKSk7XHJcbiAgICAgICAgdGhpcy5nb2xkSWNvbkZlbGwgPSBjb25maWdbJ2dvbGRfZmVsbCddO1xyXG4gICAgICAgIHRoaXMuc3BlZWRjdXQgPSBjb25maWdbJ3NwZWVkY3V0J107XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuaGllcmFyY2h5O1xyXG4gICAgICAgIHRoaXMuYXR0YWNrRGVsYXlUaW1lID0gQXR0YWNrRGVsYXlMaXN0W2lkLTFdO1xyXG4gICAgICAgIGlmIChpZCA+IEF0dGFja0RlbGF5TGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiX2VuZW15SUQgPiBBdHRhY2tEZWxheUxpc3QubGVuZ3RoXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0QW5pbWF0aW9uKHRyYWNrSW5kZXg6bnVtYmVyLCBuYW1lOnN0cmluZywgbG9vcDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24odHJhY2tJbmRleCwgbmFtZSwgbG9vcCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlRmxhZyA9ICBuYW1lID09IFwid2Fsa1wiO1xyXG4gICAgICAgIHRoaXMubG9va0F0Um9sZUZsYWcgPSBuYW1lICE9IFwic3RyaWtlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdHRhY2tEZWxheVRpbWUgPSAtMTtcclxuXHJcbiAgICBzdG9wQXR0YWNrKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBY3Rpb25CeVRhZygxMTk5KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5U3RhbmQoKXtcclxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigwLCBcInN0YW5kXCIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBdHRhY2soKXtcclxuICAgICAgICBpZiAodGhpcy5hdHRhY2tEZWxheVRpbWUgPj0gMCl7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5zcGVlZChjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUodGhpcy5hdHRhY2tEZWxheVRpbWUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKCFHYW1lUHJveHkucGF1c2VHYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSwgMSk7XHJcbiAgICAgICAgICAgIGFjdGlvbi5zZXRUYWcoMTE5OSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oMCwgXCJzdHJpa2VcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlXYWxrKCl7XHJcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oMCwgXCJ3YWxrXCIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlEZWFkKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wQXR0YWNrKCk7XHJcbiAgICAgICAgdGhpcy5za2UudGltZVNjYWxlID0gQkFTRV9USU1FX1NDQUxFO1xyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKDAsIFwiZGVhZFwiLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUJlYXRlbigpe1xyXG4gICAgICAgIHRoaXMuc3RvcEF0dGFjaygpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmVhdGVuMi4uLi4uXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKDAsIFwiYmVhdGVuMlwiLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUJlYXRlbkJhY2soKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJlYXRlbi4uLi4uXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKDAsIFwiYmVhdGVuXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0F0dGFja2luZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNrZS5hbmltYXRpb24gPT0gXCJzdHJpa2VcIjtcclxuICAgIH1cclxuXHJcbiAgICBpc0JlYXRpbmcoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2UuYW5pbWF0aW9uID09IFwiYmVhdGVuMlwiIHx8IHRoaXMuc2tlLmFuaW1hdGlvbiA9PSBcImJlYXRlblwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlzV2Fsa2luZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNrZS5hbmltYXRpb24gPT0gXCJ3YWxrXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTdGFuZGluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNrZS5hbmltYXRpb24gPT0gXCJzdGFuZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRGVhZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ocCA8PTA7XHJcbiAgICB9XHJcblxyXG4gICAgdHVyblRvKGRpcjpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgZGVncmVlID0gKDkwIC0gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoZGlyLnksIGRpci54KSkpJTM2MDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlPT09PlwiLCBkZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGlyPT09Png9XCIrZGlyLngrXCIgeT1cIitkaXIueSk7XHJcbiAgICAgICAgaWYgKGRlZ3JlZSA8IDApe1xyXG4gICAgICAgICAgICBkZWdyZWUgKz0gMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW5lbXlSb3RhdGlvbiA9IHRoaXMubm9kZS5yb3RhdGlvbiUzNjA7XHJcbiAgICAgICAgaWYgKGVuZW15Um90YXRpb24gPCAwKXtcclxuICAgICAgICAgICAgZW5lbXlSb3RhdGlvbiArPSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdWJEZWdyZWUgPSBNYXRoLmFicyhkZWdyZWUgLSBlbmVteVJvdGF0aW9uKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlZ3JlZT1cIitkZWdyZWUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZW5lbXlSb3RhdGlvbj09PT0+XCIrZW5lbXlSb3RhdGlvbik7XHJcbiAgICAgICAgbGV0IHNwZWVkID0gdGhpcy5fbW92ZVNwZWVkKnRoaXMuYWdpbGl0eSoodGhpcy5fYkFjYz8wLjU6MSkgKiB0aGlzLl9zcGVlZEFkZCAqICh0aGlzLl9nYW1lU2xvdz8wLjI6MSk7XHJcbiAgICAgICAgaWYgKHN1YkRlZ3JlZSA+IDApe1xyXG4gICAgICAgICAgICBsZXQgcm90YXRpb24gPSAwO1xyXG4gICAgICAgICAgICBpZiAoc3ViRGVncmVlID4gMTgwKXtcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gTWF0aC5zaWduKGVuZW15Um90YXRpb24gLSBkZWdyZWUpICogc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRpb24pID4gMzYwIC0gc3ViRGVncmVlKXtcclxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IE1hdGguc2lnbihyb3RhdGlvbikqKDM2MC1zdWJEZWdyZWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbiA9IE1hdGguc2lnbihkZWdyZWUgLSBlbmVteVJvdGF0aW9uKSAqIHNwZWVkO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0aW9uKSA+IHN1YkRlZ3JlZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb24gPSBNYXRoLnNpZ24ocm90YXRpb24pICogc3ViRGVncmVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuZW15Um90YXRpb24gKz0gcm90YXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IGVuZW15Um90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibGVuPT09PlwiLCBsZW4pO1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm1vdmVTcGVlZDtcclxuICAgICAgICBpZiAobGVuIDw9IDApcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8qKiDmsr/nnYDlvZPliY3mlrnlkJHnp7vliqggKi9cclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLm5vZGUucG9zaXRpb24uYWRkKHRoaXMubW92ZURpci5tdWwobGVuKSk7XHJcbiAgICAgICAgLyoqIOWIpOaWreS4juinkuiJsueahOeisOaSniAqL1xyXG4gICAgICAgIC8vIGxldCB0b1JvbGVEaXN0YW5jZSA9IHBvc2l0aW9uLnN1Yih3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddLnJvbGUubm9kZS5wb3NpdGlvbikubWFnKCk7XHJcbiAgICAgICAgLy8gaWYgKHRvUm9sZURpc3RhbmNlIDwgdGhpcy5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyArIHdpbmRvd1snR2FtZVJvbGVDb250cm9sbGVyJ10ucm9sZS5zcGFjZUNpcmNsZUNvbGxpZGVyLnJhZGl1cyl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8qKiDliKTmlq3ovrnnlYwgKi9cclxuICAgICAgICBpZiAocG9zaXRpb24ueCA+IHRoaXMuX2JvdW5kcy54TWF4IHx8IHBvc2l0aW9uLnggPCB0aGlzLl9ib3VuZHMueE1pbiB8fCBwb3NpdGlvbi55ID4gdGhpcy5fYm91bmRzLnlNYXggfHwgcG9zaXRpb24ueSA8IHRoaXMuX2JvdW5kcy55TWluKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9iQWNjICYmIHRoaXMuZm91bmRSYW5nZSA+IDApe1xyXG4gICAgICAgICAgICBsZXQgdG9Sb2xlRGlzdGFuY2UgPSBwb3NpdGlvbi5zdWIod2luZG93WydHYW1lUm9sZUNvbnRyb2xsZXInXS5yb2xlLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICB0aGlzLmJBY2MgPSB0b1JvbGVEaXN0YW5jZSAtIGxlbiA8IHRoaXMuZm91bmRSYW5nZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDliKTmlq3mgKrniankuYvpl7TnmoTnorDmkp4gKi9cclxuICAgICAgICAvLyBsZXQgYXJyID0gW107XHJcbiAgICAgICAgLy8gdGhpcy5fZ2FtZUNvbGxpc2lvbkNvbnRyb2xsZXIubG9vc2VRdWFkVHJlZS5yZXRyaWV2ZSh0aGlzLmVuZW15QUFCQi5hYWJiKCksYXJyKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGZvciAobGV0IGFhYmJSZWdpb24gb2YgYXJyKXtcclxuICAgICAgICAvLyAgICAgbGV0IGVuZW15ID0gYWFiYlJlZ2lvbi5lbmVteTtcclxuICAgICAgICAvLyAgICAgaWYgKGVuZW15ICE9PSB0aGlzICYmIGVuZW15Lm5vZGUucG9zaXRpb24uc3ViKHBvc2l0aW9uKS5tYWcoKSA8IGVuZW15LnNwYWNlQ2lyY2xlQ29sbGlkZXIucmFkaXVzICsgZW5lbXkuc3BhY2VDaXJjbGVDb2xsaWRlci5yYWRpdXMpe1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LnBhdXNlR2FtZSB8fCB0aGlzLnN0aWZmKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiog6YC76L6R5aSE55CG5qCH5b+XLS3kvJjljJbnrZbnlaXkuLrmr4/kuIDluKflj6rlpITnkIblm7rlrprmlbDph4/nmoTmgKrnianpgLvovpEgKi9cclxuICAgICAgICBpZiAodGhpcy5sb2dpY0ZsYWcpe1xyXG4gICAgICAgICAgICAvKiog5piv5ZCm5Y+v5Lul5pS75Ye7ICovXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5pc1dhbGtpbmcoKSB8fCB0aGlzLmlzU3RhbmRpbmcoKSkgJiYgdGhpcy5pc0luQXR0YWNrUmFuZ2UoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlBdHRhY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqIOaXi+i9rCAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb29rQXRSb2xlRmxhZyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm5Ubyh3aW5kb3dbJ0dhbWVSb2xlQ29udHJvbGxlciddLnJvbGUubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIOenu+WKqCAqL1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVGbGFnKXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==