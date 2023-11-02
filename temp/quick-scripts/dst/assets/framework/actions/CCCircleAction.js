
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/actions/CCCircleAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'afdccsULkNP67nQoHfoJT7g', 'CCCircleAction');
// framework/actions/CCCircleAction.js

"use strict";

//creator from pabble 2018-11-12
cc.Circle = cc.Class({
  name: 'cc.Circle',
  "extends": cc.ActionInterval,

  /**
   * @param duration  时间
   * @param center  圆心点
   * @param r  半径
   * @param s  起点弧度
   * @param e  终点弧度
   * @param revert  是否顺时针(默认顺时针，逆时针传false)
   * */
  ctor: function ctor(duration, center, r, s, e, revert) {
    if (revert === void 0) {
      revert = false;
    }

    this._duration = duration;
    this._center = center;
    this._radius = r;
    this._startAngle = s;
    this._endAngle = e;
    this._dstartAngle = s % (2 * Math.PI);
    this._dendAngle = e % (2 * Math.PI);
    this._runTime = 0;
    this._direction = revert;

    if (this._direction) {
      if (this._dendAngle >= this._dstartAngle) {
        this._dstartAngle += 2 * Math.PI;
      }
    } else {
      if (this._dendAngle <= this._dstartAngle) {
        this._dendAngle += 2 * Math.PI;
      }
    }

    cc.Circle.prototype.initWithDuration.call(this, duration, center, r, s, e, revert);
  },
  initWithDuration: function initWithDuration(duration) {
    cc.ActionInterval.prototype.initWithDuration.call(this, duration);
    return true;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var a = (this._dendAngle - this._dstartAngle) * dt + this._dstartAngle;
      var x = this._center.x + this._radius * Math.sin(a);
      var y = this._center.y + this._radius * Math.cos(a);
      this.target.x = x;
      this.target.y = y;
    }
  },
  reverse: function reverse() {
    var action = new cc.Circle(this._duration, this._center, this._radius, this._endAngle, this._startAngle, !this._direction);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.Circle(this._duration, this._center, this._radius, this._startAngle, this._endAngle, this._direction);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});

cc.circle = function (duration, center, r, s, e, revert) {
  return new cc.Circle(duration, center, r, s, e, revert);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvYWN0aW9ucy9DQ0NpcmNsZUFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNpcmNsZSIsIkNsYXNzIiwibmFtZSIsIkFjdGlvbkludGVydmFsIiwiY3RvciIsImR1cmF0aW9uIiwiY2VudGVyIiwiciIsInMiLCJlIiwicmV2ZXJ0IiwiX2R1cmF0aW9uIiwiX2NlbnRlciIsIl9yYWRpdXMiLCJfc3RhcnRBbmdsZSIsIl9lbmRBbmdsZSIsIl9kc3RhcnRBbmdsZSIsIk1hdGgiLCJQSSIsIl9kZW5kQW5nbGUiLCJfcnVuVGltZSIsIl9kaXJlY3Rpb24iLCJwcm90b3R5cGUiLCJpbml0V2l0aER1cmF0aW9uIiwiY2FsbCIsInN0YXJ0V2l0aFRhcmdldCIsInRhcmdldCIsInVwZGF0ZSIsImR0IiwiX2NvbXB1dGVFYXNlVGltZSIsImEiLCJ4Iiwic2luIiwieSIsImNvcyIsInJldmVyc2UiLCJhY3Rpb24iLCJfY2xvbmVEZWNvcmF0aW9uIiwiX3JldmVyc2VFYXNlTGlzdCIsImNsb25lIiwiY2lyY2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsTUFBSCxHQUFZRCxFQUFFLENBQUNFLEtBQUgsQ0FBUztFQUNqQkMsSUFBSSxFQUFHLFdBRFU7RUFFakIsV0FBVUgsRUFBRSxDQUFDSSxjQUZJOztFQUdqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lDLElBQUksRUFBQyxjQUFTQyxRQUFULEVBQWtCQyxNQUFsQixFQUF5QkMsQ0FBekIsRUFBMkJDLENBQTNCLEVBQTZCQyxDQUE3QixFQUErQkMsTUFBL0IsRUFBNEM7SUFBQSxJQUFiQSxNQUFhO01BQWJBLE1BQWEsR0FBTixLQUFNO0lBQUE7O0lBQzdDLEtBQUtDLFNBQUwsR0FBaUJOLFFBQWpCO0lBQ0EsS0FBS08sT0FBTCxHQUFlTixNQUFmO0lBQ0EsS0FBS08sT0FBTCxHQUFlTixDQUFmO0lBQ0EsS0FB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QUFsQyxFQUEwQyxLQUFLQyxPQUEvQyxFQUF1RCxLQUFLQyxXQUE1RCxFQUF3RSxLQUFLQyxTQUE3RSxFQUF1RixLQUFLTSxVQUE1RixDQUFiOztJQUNBLEtBQUtnQixnQkFBTCxDQUFzQkQsTUFBdEI7O0lBQ0EsS0FBS0UsZ0JBQUwsQ0FBc0JGLE1BQXRCOztJQUNBLE9BQU9BLE1BQVA7RUFDSDtBQTdEZ0IsQ0FBVCxDQUFaOztBQWdFQXJDLEVBQUUsQ0FBQ3lDLE1BQUgsR0FBWSxVQUFTbkMsUUFBVCxFQUFrQkMsTUFBbEIsRUFBeUJDLENBQXpCLEVBQTJCQyxDQUEzQixFQUE2QkMsQ0FBN0IsRUFBK0JDLE1BQS9CLEVBQXNDO0VBQzlDLE9BQU8sSUFBSVgsRUFBRSxDQUFDQyxNQUFQLENBQWNLLFFBQWQsRUFBdUJDLE1BQXZCLEVBQThCQyxDQUE5QixFQUFnQ0MsQ0FBaEMsRUFBa0NDLENBQWxDLEVBQW9DQyxNQUFwQyxDQUFQO0FBQ0gsQ0FGRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9jcmVhdG9yIGZyb20gcGFiYmxlIDIwMTgtMTEtMTJcclxuY2MuQ2lyY2xlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZSA6ICdjYy5DaXJjbGUnLFxyXG4gICAgZXh0ZW5kcyA6IGNjLkFjdGlvbkludGVydmFsLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24gIOaXtumXtFxyXG4gICAgICogQHBhcmFtIGNlbnRlciAg5ZyG5b+D54K5XHJcbiAgICAgKiBAcGFyYW0gciAg5Y2K5b6EXHJcbiAgICAgKiBAcGFyYW0gcyAg6LW354K55byn5bqmXHJcbiAgICAgKiBAcGFyYW0gZSAg57uI54K55byn5bqmXHJcbiAgICAgKiBAcGFyYW0gcmV2ZXJ0ICDmmK/lkKbpobrml7bpkogo6buY6K6k6aG65pe26ZKI77yM6YCG5pe26ZKI5LygZmFsc2UpXHJcbiAgICAgKiAqL1xyXG4gICAgY3RvcjpmdW5jdGlvbihkdXJhdGlvbixjZW50ZXIscixzLGUscmV2ZXJ0PWZhbHNlKXtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSByO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0QW5nbGUgPSBzO1xyXG4gICAgICAgIHRoaXMuX2VuZEFuZ2xlID0gZTtcclxuICAgICAgICB0aGlzLl9kc3RhcnRBbmdsZSA9IHMlICgyKk1hdGguUEkpXHJcbiAgICAgICAgdGhpcy5fZGVuZEFuZ2xlID0gZSUgKDIqTWF0aC5QSSlcclxuICAgICAgICB0aGlzLl9ydW5UaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSByZXZlcnRcclxuICAgICAgICBpZih0aGlzLl9kaXJlY3Rpb24pe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9kZW5kQW5nbGUgPj0gdGhpcy5fZHN0YXJ0QW5nbGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHN0YXJ0QW5nbGUrPTIqTWF0aC5QSVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fZGVuZEFuZ2xlIDw9IHRoaXMuX2RzdGFydEFuZ2xlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlbmRBbmdsZSs9MipNYXRoLlBJXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuQ2lyY2xlLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sY2VudGVyLHIscyxlLHJldmVydCk7XHRcclxuICAgIH0sXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uKGR1cmF0aW9uKXtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIHN0YXJ0V2l0aFRhcmdldCh0YXJnZXQpe1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMudGFyZ2V0KXtcclxuICAgICAgICAgICAgdmFyIGEgPSAodGhpcy5fZGVuZEFuZ2xlIC0gdGhpcy5fZHN0YXJ0QW5nbGUpICogKGR0KSArIHRoaXMuX2RzdGFydEFuZ2xlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuX2NlbnRlci54ICsgdGhpcy5fcmFkaXVzICogTWF0aC5zaW4oYSk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5fY2VudGVyLnkgKyB0aGlzLl9yYWRpdXMgKiBNYXRoLmNvcyhhKTtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQueCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnkgPSB5XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQ2lyY2xlKHRoaXMuX2R1cmF0aW9uLHRoaXMuX2NlbnRlcix0aGlzLl9yYWRpdXMsdGhpcy5fZW5kQW5nbGUsdGhpcy5fc3RhcnRBbmdsZSwhdGhpcy5fZGlyZWN0aW9uKVxyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkNpcmNsZSh0aGlzLl9kdXJhdGlvbix0aGlzLl9jZW50ZXIsdGhpcy5fcmFkaXVzLHRoaXMuX3N0YXJ0QW5nbGUsdGhpcy5fZW5kQW5nbGUsdGhpcy5fZGlyZWN0aW9uKVxyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9XHJcbn0pXHJcblxyXG5jYy5jaXJjbGUgPSBmdW5jdGlvbihkdXJhdGlvbixjZW50ZXIscixzLGUscmV2ZXJ0KXtcclxuICAgIHJldHVybiBuZXcgY2MuQ2lyY2xlKGR1cmF0aW9uLGNlbnRlcixyLHMsZSxyZXZlcnQpXHJcbn0iXX0=