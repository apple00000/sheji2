
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/app/entities/prop/PropStateController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad6c7iO+p1G1qYI4btYwplX', 'PropStateController');
// script/app/entities/prop/PropStateController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var CDTimer_1 = require("../../../../framework/component/CDTimer");
var GameProxy_1 = require("../../game/GameProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropStateController = /** @class */ (function (_super) {
    __extends(PropStateController, _super);
    function PropStateController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteFrames = [];
        _this.sprite = null;
        _this.prgressBar = null;
        _this.cdTimer = null;
        _this.propID = 0;
        return _this;
    }
    PropStateController.prototype.onEnable = function () {
        this.sprite.node.active = false;
        this.prgressBar.node.active = false;
    };
    PropStateController.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    PropStateController.prototype.init = function (id) {
        this.propID = id;
        var spriteFrameIndex = 0;
        var cd = 0;
        switch (id) {
            case 5:
                spriteFrameIndex = 0;
                cd = 15;
                break;
            case 9:
                spriteFrameIndex = 1;
                cd = 12;
                break;
            case 10:
                spriteFrameIndex = 2;
                cd = 12;
                break;
            case 12:
                spriteFrameIndex = 3;
                cd = 20;
                break;
            case 13:
                spriteFrameIndex = 4;
                cd = 10;
                break;
        }
        this.sprite.spriteFrame = this.spriteFrames[spriteFrameIndex];
        this.cdTimer.cd = cd;
        this.cdTimer.reset();
        this.prgressBar.progress = 1;
        this.cdTimer.pause = true;
        this.node.scale = 1;
        this.sprite.node.active = true;
        this.prgressBar.node.active = true;
    };
    PropStateController.prototype.onProgressEvent = function (progress) {
        this.prgressBar.progress = 1 - progress;
    };
    PropStateController.prototype.onZeroEvent = function () {
        var _this = this;
        GameProxy_1.GameProxy.emit(GameProxy_1.GameProxy.Event.PropCDZero, this.propID);
        this.node.runAction(cc.sequence(cc.scaleTo(0.15, 0), cc.callFunc(function () {
            _this.node.active = false;
        })));
    };
    __decorate([
        property(cc.SpriteFrame)
    ], PropStateController.prototype, "spriteFrames", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropStateController.prototype, "sprite", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], PropStateController.prototype, "prgressBar", void 0);
    __decorate([
        property(CDTimer_1.default)
    ], PropStateController.prototype, "cdTimer", void 0);
    PropStateController = __decorate([
        ccclass
    ], PropStateController);
    return PropStateController;
}(cc.Component));
exports.default = PropStateController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYXBwL2VudGl0aWVzL3Byb3AvUHJvcFN0YXRlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUVBQThEO0FBQzlELGtEQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQXVFQztRQXBFRyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFHcEMsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFHakMsYUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixZQUFNLEdBQUcsQ0FBQyxDQUFDOztJQXlEZixDQUFDO0lBdkRHLHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVELHVDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssRUFBUztRQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFDO1lBQ1AsS0FBSyxDQUFDO2dCQUNGLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNO1lBQ1YsS0FBSyxFQUFFO2dCQUNILGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNO1lBQ1YsS0FBSyxFQUFFO2dCQUNILGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNO1lBQ1YsS0FBSyxFQUFFO2dCQUNILGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDckIsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNO1NBQ2I7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw2Q0FBZSxHQUFmLFVBQWdCLFFBQWU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUM1QyxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUFBLGlCQUtDO1FBSkcscUJBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDN0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFuRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs2REFDVztJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNJO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkRBQ1E7SUFHakM7UUFEQyxRQUFRLENBQUMsaUJBQU8sQ0FBQzt3REFDSztJQVpOLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBdUV2QztJQUFELDBCQUFDO0NBdkVELEFBdUVDLENBdkVnRCxFQUFFLENBQUMsU0FBUyxHQXVFNUQ7a0JBdkVvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IENEVGltZXIgZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9jb21wb25lbnQvQ0RUaW1lclwiO1xyXG5pbXBvcnQge0dhbWVQcm94eX0gZnJvbSBcIi4uLy4uL2dhbWUvR2FtZVByb3h5XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BTdGF0ZUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHNwcml0ZUZyYW1lczogW2NjLlNwcml0ZUZyYW1lXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBzcHJpdGU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcmdyZXNzQmFyOmNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoQ0RUaW1lcilcclxuICAgIGNkVGltZXI6Q0RUaW1lciA9IG51bGw7XHJcblxyXG4gICAgcHJvcElEID0gMDtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuc3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmdyZXNzQmFyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucHJvcElEID0gaWQ7XHJcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBjZCA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChpZCl7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgY2QgPSAxNTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZUluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIGNkID0gMTI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lSW5kZXggPSAyO1xyXG4gICAgICAgICAgICAgICAgY2QgPSAxMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWVJbmRleCA9IDM7XHJcbiAgICAgICAgICAgICAgICBjZCA9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZUluZGV4ID0gNDtcclxuICAgICAgICAgICAgICAgIGNkID0gMTA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lc1tzcHJpdGVGcmFtZUluZGV4XTtcclxuICAgICAgICB0aGlzLmNkVGltZXIuY2QgPSBjZDtcclxuICAgICAgICB0aGlzLmNkVGltZXIucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnByZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuY2RUaW1lci5wYXVzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wcmdyZXNzQmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblByb2dyZXNzRXZlbnQocHJvZ3Jlc3M6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnByZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAxIC0gcHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgb25aZXJvRXZlbnQoKXtcclxuICAgICAgICBHYW1lUHJveHkuZW1pdChHYW1lUHJveHkuRXZlbnQuUHJvcENEWmVybywgdGhpcy5wcm9wSUQpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjE1LCAwKSwgY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuIl19