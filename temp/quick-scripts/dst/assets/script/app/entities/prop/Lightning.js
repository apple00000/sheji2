
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/prop/Lightning.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b12ccGunt9H9pBPDrPhutA1', 'Lightning');
// script/app/entities/prop/Lightning.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Lightning = /** @class */ (function (_super) {
    __extends(Lightning, _super);
    function Lightning() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 默认高度375 */
        _this.ske = null;
        _this.lightEnemys = [];
        return _this;
    }
    Lightning.prototype.onLoad = function () {
        var _this = this;
        this.ske.setCompleteListener(function (trackEntry, loopCount) {
            var name = trackEntry.animation ? trackEntry.animation.name : '';
            _this.node.active = false;
            /** 生成一个新的 */
            if (_this.lightEnemys.length < 6) {
            }
        });
    };
    Lightning.prototype.joint = function (enemy) {
        this.lightEnemys.push(enemy);
        var sub = enemy.node.position.sub(this.node.position);
        var distance = sub.mag();
        this.node.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(sub.y, sub.x));
        this.node.scaleY = distance / 375;
        this.node.active = true;
        this.ske.setAnimation(0, "animation", false);
    };
    __decorate([
        property(sp.Skeleton)
    ], Lightning.prototype, "ske", void 0);
    Lightning = __decorate([
        ccclass
    ], Lightning);
    return Lightning;
}(cc.Component));
exports.default = Lightning;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3Byb3AvTGlnaHRuaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTRCQztRQTFCRyxjQUFjO1FBRWQsU0FBRyxHQUFlLElBQUksQ0FBQztRQUVmLGlCQUFXLEdBQWdCLEVBQUUsQ0FBQzs7SUFzQjFDLENBQUM7SUFwQmEsMEJBQU0sR0FBaEI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBQyxVQUFVLEVBQUUsU0FBUztZQUMvQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixhQUFhO1lBQ2IsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7YUFFL0I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5QkFBSyxHQUFMLFVBQU0sS0FBVztRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBdkJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MENBQ0M7SUFKTixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNEI3QjtJQUFELGdCQUFDO0NBNUJELEFBNEJDLENBNUJzQyxFQUFFLENBQUMsU0FBUyxHQTRCbEQ7a0JBNUJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4uL2VuZW15L0VuZW15XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0bmluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqIOm7mOiupOmrmOW6pjM3NSAqL1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgc2tlOnNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGxpZ2h0RW5lbXlzOkFycmF5PEVuZW15PiA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5za2Uuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLyoqIOeUn+aIkOS4gOS4quaWsOeahCAqL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saWdodEVuZW15cy5sZW5ndGggPCA2KXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBqb2ludChlbmVteTpFbmVteSl7XHJcbiAgICAgICAgdGhpcy5saWdodEVuZW15cy5wdXNoKGVuZW15KTtcclxuICAgICAgICBsZXQgc3ViID0gZW5lbXkubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBzdWIubWFnKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gOTAgLSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMihzdWIueSwgc3ViLngpKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gZGlzdGFuY2UvMzc1O1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2tlLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19