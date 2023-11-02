
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/role/ImpenetrableDefence.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4cfaeeoywhMBKH2pNDKPKw0', 'ImpenetrableDefence');
// script/app/entities/role/ImpenetrableDefence.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ImpenetrableDefence = /** @class */ (function (_super) {
    __extends(ImpenetrableDefence, _super);
    function ImpenetrableDefence() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ske = null;
        _this.followNode = null;
        _this.rotateAction = null;
        //密不透风的防御(武术)
        _this._impenetrableDefenceCD = 0;
        _this._defenceCD = 0;
        return _this;
    }
    ImpenetrableDefence.prototype.onLoad = function () {
        var _this = this;
        this.followNode.on(cc.Node.EventType.POSITION_CHANGED, function () {
            _this.node.position = _this.followNode.position;
        });
        this.ske.setCompleteListener(function (trackEntry, loop) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            if (name == "start") {
                _this.ske.setAnimation(0, "loops", true);
                _this.rotateAction = cc.speed(cc.repeatForever(cc.rotateBy(0.45, 360)), 0);
                _this.rotateAction.setTag(140);
                _this.node.runAction(_this.rotateAction);
            }
            else if (name == "transition") {
                _this.ske.setAnimation(0, "loops", true);
            }
        });
    };
    ImpenetrableDefence.prototype.start = function () {
        this.node.position = this.followNode.position;
    };
    Object.defineProperty(ImpenetrableDefence.prototype, "impenetrableDefenceCD", {
        set: function (value) {
            this._impenetrableDefenceCD = value;
            if (!this.node.active) {
                this.node.active = true;
                this.node.stopAllActions();
                this.ske.setAnimation(0, "start", false);
            }
        },
        enumerable: false,
        configurable: true
    });
    ImpenetrableDefence.prototype.defence = function () {
        if (this.ske.animation == "loops") {
            // this.rotateAction.setSpeed(0);
            this.ske.setAnimation(0, "transition", false);
            // this._defenceCD = 0.5;
        }
    };
    ImpenetrableDefence.prototype.update = function (dt) {
        if (GameProxy_1.GameProxy.pauseGame)
            return;
        if (this.node.color.getR() < 255) {
            this.node.color.setR(this.node.color.getR() + 1);
        }
        if (this.node.color.getG() < 255) {
            this.node.color.setG(this.node.color.getG() + 1);
        }
        if (this.node.color.getB() < 255) {
            this.node.color.setB(this.node.color.getB() + 1);
        }
        if (this.ske.animation === "loops") {
            if (this._defenceCD > 0) {
                this._defenceCD -= dt;
            }
            else if (this.rotateAction.getSpeed() < 1) {
                var speed = this.rotateAction.getSpeed() + 0.01;
                if (speed > 1) {
                    speed = 1;
                }
                this.rotateAction.setSpeed(speed);
            }
        }
        this._impenetrableDefenceCD -= dt;
        if (this._impenetrableDefenceCD <= 0) {
            this.node.active = false;
        }
    };
    __decorate([
        property(sp.Skeleton)
    ], ImpenetrableDefence.prototype, "ske", void 0);
    __decorate([
        property(cc.Node)
    ], ImpenetrableDefence.prototype, "followNode", void 0);
    ImpenetrableDefence = __decorate([
        ccclass
    ], ImpenetrableDefence);
    return ImpenetrableDefence;
}(cc.Component));
exports.default = ImpenetrableDefence;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3JvbGUvSW1wZW5ldHJhYmxlRGVmZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQStDO0FBRXpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWlELHVDQUFZO0lBQTdEO1FBQUEscUVBa0ZDO1FBL0VHLFNBQUcsR0FBZSxJQUFJLENBQUM7UUFHdkIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFbEIsa0JBQVksR0FBRyxJQUFJLENBQUM7UUF3QmhDLGFBQWE7UUFDRCw0QkFBc0IsR0FBRyxDQUFDLENBQUM7UUFFM0IsZ0JBQVUsR0FBRyxDQUFDLENBQUM7O0lBK0MzQixDQUFDO0lBdkVhLG9DQUFNLEdBQWhCO1FBQUEsaUJBZUM7UUFkRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNuRCxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBQyxVQUFVLEVBQUUsSUFBSTtZQUMxQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pFLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBQztnQkFDaEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMxQztpQkFBSyxJQUFJLElBQUksSUFBSSxZQUFZLEVBQUM7Z0JBQzNCLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDbEQsQ0FBQztJQVFELHNCQUFJLHNEQUFxQjthQUF6QixVQUEwQixLQUFhO1lBQ25DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHFDQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLE9BQU8sRUFBQztZQUM5QixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5Qyx5QkFBeUI7U0FDNUI7SUFDTCxDQUFDO0lBRUQsb0NBQU0sR0FBTixVQUFPLEVBQVM7UUFDWixJQUFJLHFCQUFTLENBQUMsU0FBUztZQUFDLE9BQU87UUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBQztnQkFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7YUFDekI7aUJBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBQztnQkFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ2hELElBQUksS0FBSyxHQUFHLENBQUMsRUFBQztvQkFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7UUFDRCxJQUFJLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsRUFBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBOUVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0RBQ0M7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDUTtJQU5ULG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBa0Z2QztJQUFELDBCQUFDO0NBbEZELEFBa0ZDLENBbEZnRCxFQUFFLENBQUMsU0FBUyxHQWtGNUQ7a0JBbEZvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtHYW1lUHJveHl9IGZyb20gXCIuLi8uLi9nYW1lL0dhbWVQcm94eVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbXBlbmV0cmFibGVEZWZlbmNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBza2U6c3AuU2tlbGV0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZm9sbG93Tm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHJvdGF0ZUFjdGlvbiA9IG51bGw7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsICgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHRoaXMuZm9sbG93Tm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNrZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wKT0+e1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcInN0YXJ0XCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2Uuc2V0QW5pbWF0aW9uKDAsIFwibG9vcHNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZUFjdGlvbiA9IGNjLnNwZWVkKGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMC40NSwgMzYwKSksIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVBY3Rpb24uc2V0VGFnKDE0MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMucm90YXRlQWN0aW9uKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKG5hbWUgPT0gXCJ0cmFuc2l0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2Uuc2V0QW5pbWF0aW9uKDAsIFwibG9vcHNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHRoaXMuZm9sbG93Tm9kZS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbi8v5a+G5LiN6YCP6aOO55qE6Ziy5b6hKOatpuacrylcclxuICAgIHByaXZhdGUgX2ltcGVuZXRyYWJsZURlZmVuY2VDRCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVmZW5jZUNEID0gMDtcclxuXHJcblxyXG4gICAgc2V0IGltcGVuZXRyYWJsZURlZmVuY2VDRCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faW1wZW5ldHJhYmxlRGVmZW5jZUNEID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24oMCwgXCJzdGFydFwiLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlZmVuY2UoKXtcclxuICAgICAgICBpZiAodGhpcy5za2UuYW5pbWF0aW9uID09IFwibG9vcHNcIil7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucm90YXRlQWN0aW9uLnNldFNwZWVkKDApO1xyXG4gICAgICAgICAgICB0aGlzLnNrZS5zZXRBbmltYXRpb24oMCwgXCJ0cmFuc2l0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZGVmZW5jZUNEID0gMC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZiAoR2FtZVByb3h5LnBhdXNlR2FtZSlyZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jb2xvci5nZXRSKCkgPCAyNTUpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3Iuc2V0Uih0aGlzLm5vZGUuY29sb3IuZ2V0UigpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuY29sb3IuZ2V0RygpIDwgMjU1KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yLnNldEcodGhpcy5ub2RlLmNvbG9yLmdldEcoKSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmNvbG9yLmdldEIoKSA8IDI1NSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvci5zZXRCKHRoaXMubm9kZS5jb2xvci5nZXRCKCkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2tlLmFuaW1hdGlvbiA9PT0gXCJsb29wc1wiKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RlZmVuY2VDRCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmZW5jZUNEIC09IGR0O1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5yb3RhdGVBY3Rpb24uZ2V0U3BlZWQoKSA8IDEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwZWVkID0gdGhpcy5yb3RhdGVBY3Rpb24uZ2V0U3BlZWQoKSArIDAuMDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZUFjdGlvbi5zZXRTcGVlZChzcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW1wZW5ldHJhYmxlRGVmZW5jZUNEIC09IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBlbmV0cmFibGVEZWZlbmNlQ0QgPD0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19