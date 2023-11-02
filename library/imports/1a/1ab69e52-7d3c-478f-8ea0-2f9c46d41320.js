"use strict";
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