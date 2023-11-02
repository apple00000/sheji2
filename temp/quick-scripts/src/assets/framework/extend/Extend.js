"use strict";
cc._RF.push(module, 'c0c94cgM4FB+Lw7/1tJ4iEf', 'Extend');
// framework/extend/Extend.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.ext = void 0;
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Actions_1 = require("../actions/Actions");
var _isLandscape = false;
if (window.innerWidth > window.innerHeight) {
    _isLandscape = true;
}
var _isIphoneX = false;
if (window.innerWidth < window.innerHeight) {
    _isIphoneX = window.innerWidth / window.innerHeight == 1125 / 2436;
}
else {
    _isIphoneX = window.innerWidth / window.innerHeight == 1125 / 2436;
}
var ext;
(function (ext) {
    function shuffle(aArr) {
        var iLength = aArr.length, i = iLength, mTemp, iRandom;
        while (i--) {
            if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                mTemp = aArr[i];
                aArr[i] = aArr[iRandom];
                aArr[iRandom] = mTemp;
            }
        }
        return aArr;
    }
    ext.shuffle = shuffle;
    function randomElement(aArr) {
        if (aArr.length == 0) {
            return null;
        }
        var index = Math.floor(Math.random() * aArr.length);
        return aArr[index];
    }
    ext.randomElement = randomElement;
    function createObj(name) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var obj = cc.js.getClassByName(name);
        if (typeof obj == "undefined") {
            cc.error(name + " not define @ccclass(" + name + ")");
        }
        else if (typeof obj == "function") {
            (_a = obj.prototype.constructor).apply.apply(_a, __spreadArrays([obj], args));
            return obj.prototype;
        }
        return null;
    }
    ext.createObj = createObj;
    function everyNode(root, f) {
        f(root);
        root.children.forEach(function (value) { return everyNode(value, f); });
    }
    ext.everyNode = everyNode;
    ext.isLandscape = _isLandscape;
    ext.isIphoneX = _isIphoneX;
    function wxCreateImageToSprite(sprite, url) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var node = sprite.node;
                        var size = { width: node.width, height: node.height };
                        var image = wx.createImage();
                        image.onload = function () {
                            if (sprite && sprite.node && sprite.node.isValid) {
                                var texture = new cc.Texture2D();
                                texture.initWithElement(image);
                                texture.handleLoadedTexture();
                                sprite.spriteFrame = new cc.SpriteFrame(texture);
                                node.width = size.width;
                                node.height = size.height;
                                resolve();
                            }
                        };
                        image.src = url;
                    })];
            });
        });
    }
    ext.wxCreateImageToSprite = wxCreateImageToSprite;
    function randomInteger(min, max) {
        var diff = max - min;
        return Math.floor(min + (Math.random() * diff * 100) % (diff + 1));
    }
    ext.randomInteger = randomInteger;
    /** 修复引擎的bug，cc.RichText有时候设置了string后会导致不显示的问题 */
    function showRichText(richText) {
        richText.node.children.forEach(function (value) { return value.active = true; });
    }
    ext.showRichText = showRichText;
    /** 并行执行promise */
    function concurrentExecute(list) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, list_1, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, list_1 = list;
                        _a.label = 1;
                    case 1:
                        if (!(_i < list_1.length)) return [3 /*break*/, 4];
                        promise = list_1[_i];
                        return [4 /*yield*/, promise];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    ext.concurrentExecute = concurrentExecute;
    /** 是否同一天 */
    function isSameDay(date1, date2) {
        return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
    }
    ext.isSameDay = isSameDay;
    /** 转换数字为k m b t*/
    function shortFormat(num) {
        var result = "";
        var t = 1000 * 1000 * 1000 * 1000;
        var b = 1000 * 1000 * 1000;
        var m = 1000 * 1000;
        var k = 1000;
        if (num >= t) {
            result = Math.floor(num / t * 10) / 10 + "T";
        }
        else if (num >= b) {
            result = Math.floor((num / b) * 10) / 10 + "B";
        }
        else if (num >= m) {
            result = Math.floor((num / m) * 10) / 10 + "M";
        }
        else if (num >= k) {
            result = Math.floor((num / k) * 10) / 10 + "K";
        }
        else {
            result = Math.floor(num).toString();
        }
        return result;
    }
    ext.shortFormat = shortFormat;
    function moveSkeleton(ske, srcY, realY, deayTime, moveTime, boneName, boneY) {
        var subY = realY - srcY;
        var speed = subY / moveTime;
        // console.log("===>srcY="+srcY, "realY="+realY, "subY="+subY, "speed="+speed, "y="+ske.findBone(boneName).y);
        ske.findBone(boneName).y = boneY;
        ske.node.runAction(cc.sequence(cc.delayTime(deayTime), cc.callFunc(function () {
            var moveY = 0;
            var action = Actions_1.default.update(function (dt) {
                var moveLen = dt * speed;
                // console.log("移动骨骼y", moveLen, dt, speed, moveY, subY);
                if (Math.abs(moveY + moveLen) >= Math.abs(subY)) {
                    ske.findBone(boneName).y += subY - moveY;
                    ske.node.stopActionByTag(10020);
                }
                else {
                    ske.findBone(boneName).y += moveLen;
                }
                moveY += moveLen;
            });
            action.setTag(10020);
            ske.node.runAction(action);
        })));
    }
    ext.moveSkeleton = moveSkeleton;
})(ext = exports.ext || (exports.ext = {}));

cc._RF.pop();