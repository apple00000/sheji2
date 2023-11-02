"use strict";
cc._RF.push(module, '8fb7amgeJpKe4gJLebr3F9k', 'ccnodeAwait');
// framework/extend/ccnodeAwait.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
function runAction(actionOrActionArray, tag) {
    return __awaiter(this, void 0, Promise, function () {
        var self;
        return __generator(this, function (_a) {
            self = this;
            return [2 /*return*/, new Promise(function (resolve) {
                    var seq = cc.sequence(actionOrActionArray, cc.callFunc(function () {
                        resolve();
                    }));
                    if (tag) {
                        seq.setTag(tag);
                    }
                    self.runAction(seq);
                })];
        });
    });
}
function once(type, useCapture) {
    return __awaiter(this, void 0, Promise, function () {
        var self;
        return __generator(this, function (_a) {
            self = this;
            return [2 /*return*/, new Promise(function (resolve) {
                    self.once(type, function (event) {
                        resolve(event);
                    }, null, useCapture);
                })];
        });
    });
}
cc.Node.prototype.runActionAwait = runAction;
cc.Node.prototype.onceAwait = once;

cc._RF.pop();