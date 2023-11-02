"use strict";
cc._RF.push(module, '9b462XreAtDoJefQPMuD8lR', 'Actions');
// framework/actions/Actions.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var Actions = /** @class */ (function () {
    function Actions() {
    }
    /** 向下移动 */
    Actions.downward = function (speed, height) {
        return cc.moveBy(height / speed, cc.v2(0, -height));
    };
    /** 向上移动 */
    Actions.upward = function (speed, height) {
        return cc.moveBy(height / speed, cc.v2(0, height));
    };
    /** 周期性动作 */
    Actions.cycleAction = function (action, startValue, endValue, deltaValue, speed, times, damping, cycleDelay) {
        if (damping === void 0) { damping = 0; }
        if (cycleDelay === void 0) { cycleDelay = 0; }
        var deltaValue_abs = Math.abs(deltaValue);
        var actions = [];
        actions.push(action(deltaValue_abs / speed, startValue + deltaValue));
        if (cycleDelay > 0) {
            actions.push(cc.delayTime(cycleDelay));
        }
        for (var i = 0; i < times; i++) {
            var newDeltaRotation = deltaValue_abs - (i * damping);
            var duation = newDeltaRotation * 2 / speed;
            var rotation = newDeltaRotation;
            if (deltaValue > 0) {
                if (i % 2 == 0) {
                    rotation = -rotation;
                }
            }
            else {
                if (i % 2 == 1) {
                    rotation = -rotation;
                }
            }
            actions.push(action(duation, startValue + rotation));
            if (cycleDelay > 0 && i % 2 == 1) {
                actions.push(cc.delayTime(cycleDelay));
            }
        }
        var lastValue = deltaValue_abs - (times - 1) * damping;
        if (deltaValue > 0) {
            if (times % 2 == 0) {
                lastValue = -lastValue;
            }
        }
        else {
            if (times % 2 == 1) {
                lastValue = -lastValue;
            }
        }
        actions.push(action(Math.abs(endValue - (startValue + lastValue)) / speed, endValue));
        return cc.sequence(actions);
    };
    /** 延迟执行 */
    Actions.delayTimeCall = function (delay, call) {
        return cc.sequence(cc.delayTime(delay), cc.callFunc(call));
    };
    /** 循环任务 */
    Actions.scheduleCall = function (interval, call) {
        if (typeof call == "function") {
            return cc.repeatForever(cc.sequence(cc.delayTime(interval), cc.callFunc(call)));
        }
        else {
            return cc.repeatForever(cc.sequence(cc.delayTime(interval), call));
        }
    };
    /** 每一帧执行 */
    Actions.update = function (call) {
        return this.scheduleCall(0, function () {
            call(cc.director.getDeltaTime());
        });
    };
    /** 高亮显示动作（先放大再缩小,适合更换字体时调用） */
    Actions.highlightAction = function (maxScaleCall) {
        var call = function () {
            if (maxScaleCall)
                maxScaleCall();
        };
        var seq = cc.sequence([
            cc.scaleTo(0.1, 1.4),
            cc.callFunc(call),
            cc.scaleTo(0.07, 0.8),
            cc.scaleTo(0.07, 1.1),
            cc.scaleTo(0.07, 0.9),
            cc.scaleTo(0.07, 1),
        ]);
        return seq;
    };
    /** 飘动显示效果(适合显示label提示，类似toast) */
    Actions.flutterAction = function () {
        var moveSeq = cc.sequence([
            cc.moveBy(0.6, cc.v2(0, 0)),
            cc.moveBy(1, cc.v2(0, 84))
        ]);
        var scaleSeq = cc.sequence([
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.1, 1),
        ]);
        var alphaSeq = cc.sequence([
            cc.fadeTo(0.8, 255),
            cc.fadeTo(0.8, 0),
        ]);
        var spawn = cc.spawn(moveSeq, scaleSeq, alphaSeq);
        return spawn;
    };
    /**
     * 圆运动
     * @param {Number} duration
     * @param {cc.Node|cc.p} dot 圆心点坐标或者node
     * @param {Number}   半径 如果为负数, 反时钟方向
     * @param {Number}  旋转角度
     * @returns {cc.CardinalSplineTo}
     */
    Actions.circleBy = function (duration, dot, r, angle) {
        var dp = angle || 20, dpr = 360 / dp, ary = [];
        r = r || 20;
        if (r < 0)
            dpr = -dpr;
        r = Math.abs(r);
        var rad = Math.PI / 180;
        for (var i = 0; i < dp; i++) {
            ary.push(cc.v2(Math.sin(dpr * i * rad) * r + dot.x, Math.cos(dpr * i * rad) * r + dot.y));
        }
        ary.push(ary);
        return cc.cardinalSplineTo(duration, ary, 0);
    };
    ;
    /**
     * 伪3D的翻转动作
     * @param {number} duration
     * @param {number} skewY
     * @return {cc.FiniteTimeAction}
     */
    Actions.flipXAction = function (duration, skewY) {
        if (duration === void 0) { duration = 0.5; }
        if (skewY === void 0) { skewY = 10; }
        var speed = duration / 38;
        var scale = cc.sequence(cc.scaleTo(speed * 9, 0.1, 1), cc.scaleTo(speed * 2, -0.1, 1), cc.scaleTo(speed * 8, -0.9, 1), cc.scaleTo(speed * 8, -0.1, 1), cc.scaleTo(speed * 2, 0.1, 1), cc.scaleTo(speed * 9, 1, 1));
        var skew = cc.sequence(cc.skewTo(speed * 9, 0, -skewY), cc.skewTo(speed * 2, 0, -skewY), cc.skewTo(speed * 8, 0, 0), cc.skewTo(speed * 8, 0, skewY), cc.skewTo(speed * 2, 0, skewY), cc.skewTo(speed * 9, 0, 0));
        return cc.spawn(scale, skew);
    };
    /**
     * 炸出金币的效果
     * @param {cc.Node} prefabNode
     * @param {cc.Node} parent
     * @param {cc.Vec2} startPos
     * @param {cc.Vec2} endPos
     * @param {number} radius
     * @param {number} num
     * @param {number} moveSpeed
     */
    Actions.boom = function (createNode, startPos, endPos, radius, num, moveSpeed, callback) {
        if (moveSpeed === void 0) { moveSpeed = 2000; }
        var list = [];
        var promise = [];
        var _loop_1 = function (i) {
            promise.push(new Promise(function (resolve, reject) {
                var node = createNode();
                node.position = startPos;
                list.push(node);
                /** 炸开动作 */
                var angle = i * 360 / num - 45;
                // node.rotation = 45+angle;
                /** 计算向量 */
                var normal = cc.v2(1, 1).rotateSelf(-angle * Math.PI / 180);
                var position = normal.mul(radius);
                var boomSpeed = 500;
                node.runAction(cc.sequence(cc.moveBy(radius / boomSpeed, position).easing(cc.easeExponentialOut()), cc.callFunc(function () {
                    /** 移动 */
                    resolve();
                })));
                // node.runAction(cc.repeatForever(Actions.flipXAction(i%2==0?1:0.9)));
                // node.getComponent(cc.Animation).play(null, i%2==0?0:0.2);
            }));
        };
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
        Promise.all(promise).then(function (res) {
            /** 分成两部分 */
            var halfNum = Math.floor(num / 2);
            var _loop_2 = function (i) {
                var node = list[i];
                var sub = endPos.sub(node.position);
                var moveTime = sub.mag() / moveSpeed;
                var center = node.position.add(sub.mul(0.5));
                var p = sub.normalize().rotate(-90 * Math.PI / 180);
                var toAction = cc.bezierTo(moveTime, [
                    center.add(p.mul(200)),
                    endPos,
                    endPos
                ]);
                node.runAction(cc.sequence(cc.delayTime(i * 0.08), cc.spawn(toAction.easing(cc.easeSineOut()), cc.scaleTo(moveTime, 0.5), cc.fadeTo(moveTime, 80)), cc.callFunc(function () {
                    node.active = false;
                    if (callback) {
                        callback();
                    }
                })));
            };
            for (var i = 0; i < halfNum; i++) {
                _loop_2(i);
            }
            var _loop_3 = function (i) {
                var node = list[list.length - 1 - i];
                var sub = endPos.sub(node.position);
                var moveTime = sub.mag() / moveSpeed;
                var center = node.position.add(sub.mul(0.5));
                var p = sub.normalize().rotate(-90 * Math.PI / 180);
                var toAction = cc.bezierTo(moveTime, [
                    center.add(p.mul(-200)),
                    endPos,
                    endPos
                ]);
                node.runAction(cc.sequence(cc.delayTime(i * 0.08), cc.spawn(toAction.easing(cc.easeSineOut()), cc.scaleTo(moveTime, 0.5), cc.fadeTo(moveTime, 80)), cc.callFunc(function () {
                    node.active = false;
                    if (callback) {
                        callback();
                    }
                })));
            };
            for (var i = 0; i < list.length - halfNum; i++) {
                _loop_3(i);
            }
        });
    };
    return Actions;
}());
exports.default = Actions;

cc._RF.pop();