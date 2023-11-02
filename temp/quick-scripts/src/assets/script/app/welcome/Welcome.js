"use strict";
cc._RF.push(module, '9e3f6FMdypHP65fD2gjB7kj', 'Welcome');
// script/app/welcome/Welcome.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Facade_1 = require("../../../framework/facade/Facade");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Welcome = /** @class */ (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        return _this;
    }
    Welcome.prototype.onLoad = function () {
        var _this = this;
        console.log("xxx1");
        cc.warn = function () { };
        var promises = [];
        promises.push(Facade_1.default.executeCommand("LoadingCommand"));
        console.log("xxx2");
        promises.push(new Promise(function (resolve) {
            _this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () { return resolve(); })));
        }));
        console.log("xxx3");
        Promise.all(promises).then(function () {
            cc.loader.loadRes("prefab/HomeScene", cc.Prefab, function (error, resource) {
                if (error == null) {
                    var homeScene = cc.instantiate(resource);
                    Facade_1.default.canvasNode.addChild(homeScene);
                    _this.bgNode.destroy();
                }
                else {
                    console.error(error);
                }
            });
        });
        console.log("xxx4");
    };
    __decorate([
        property(cc.Node)
    ], Welcome.prototype, "bgNode", void 0);
    Welcome = __decorate([
        ccclass
    ], Welcome);
    return Welcome;
}(cc.Component));
exports.default = Welcome;

cc._RF.pop();