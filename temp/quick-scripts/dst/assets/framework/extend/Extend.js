
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/Extend.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL0V4dGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhDQUF5QztBQUV6QyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDekIsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUM7SUFDdkMsWUFBWSxHQUFHLElBQUksQ0FBQztDQUN2QjtBQUVELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixJQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBQztJQUN2QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksR0FBQyxJQUFJLENBQUM7Q0FDbEU7S0FBSztJQUNGLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQztDQUNsRTtBQUVELElBQWMsR0FBRyxDQW9JaEI7QUFwSUQsV0FBYyxHQUFHO0lBQ2IsU0FBZ0IsT0FBTyxDQUFDLElBQUk7UUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFDckIsQ0FBQyxHQUFHLE9BQU8sRUFDWCxLQUFLLEVBQ0wsT0FBTyxDQUFDO1FBRVosT0FBTSxDQUFDLEVBQUUsRUFBQztZQUNOLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUM7Z0JBQ3JELEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFD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QkFDRCxLQUFLLElBQUksT0FBTyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBckJlLGdCQUFZLGVBcUIzQixDQUFBO0FBQ0wsQ0FBQyxFQXBJYSxHQUFHLEdBQUgsV0FBRyxLQUFILFdBQUcsUUFvSWhCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmltcG9ydCBBY3Rpb25zIGZyb20gXCIuLi9hY3Rpb25zL0FjdGlvbnNcIjtcclxuXHJcbmxldCBfaXNMYW5kc2NhcGUgPSBmYWxzZTtcclxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gd2luZG93LmlubmVySGVpZ2h0KXtcclxuICAgIF9pc0xhbmRzY2FwZSA9IHRydWU7XHJcbn1cclxuXHJcbmxldCBfaXNJcGhvbmVYID0gZmFsc2U7XHJcbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IHdpbmRvdy5pbm5lckhlaWdodCl7XHJcbiAgICBfaXNJcGhvbmVYID0gd2luZG93LmlubmVyV2lkdGgvd2luZG93LmlubmVySGVpZ2h0ID09IDExMjUvMjQzNjtcclxufSBlbHNle1xyXG4gICAgX2lzSXBob25lWCA9IHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCA9PSAxMTI1LzI0MzY7XHJcbn1cclxuXHJcbmV4cG9ydCBtb2R1bGUgZXh0e1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNodWZmbGUoYUFycil7XHJcbiAgICAgICAgbGV0IGlMZW5ndGggPSBhQXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgaSA9IGlMZW5ndGgsXHJcbiAgICAgICAgICAgIG1UZW1wLFxyXG4gICAgICAgICAgICBpUmFuZG9tO1xyXG5cclxuICAgICAgICB3aGlsZShpLS0pe1xyXG4gICAgICAgICAgICBpZihpICE9PSAoaVJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGlMZW5ndGgpKSl7XHJcbiAgICAgICAgICAgICAgICBtVGVtcCA9IGFBcnJbaV07XHJcbiAgICAgICAgICAgICAgICBhQXJyW2ldID0gYUFycltpUmFuZG9tXTtcclxuICAgICAgICAgICAgICAgIGFBcnJbaVJhbmRvbV0gPSBtVGVtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUVsZW1lbnQoYUFycjpBcnJheSkge1xyXG4gICAgICAgIGlmIChhQXJyLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFBcnIubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gYUFycltpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9iaihuYW1lOlN0cmluZywgLi4uYXJncykge1xyXG4gICAgICAgIGxldCBvYmogPSBjYy5qcy5nZXRDbGFzc0J5TmFtZShuYW1lKTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYCR7bmFtZX0gbm90IGRlZmluZSBAY2NjbGFzcygke25hbWV9KWApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseShvYmosIC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqLnByb3RvdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBldmVyeU5vZGUocm9vdDpjYy5Ob2RlLCBmOihub2RlKT0+dm9pZCkge1xyXG4gICAgICAgIGYocm9vdCk7XHJcbiAgICAgICAgcm9vdC5jaGlsZHJlbi5mb3JFYWNoKHZhbHVlID0+IGV2ZXJ5Tm9kZSh2YWx1ZSwgZikpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjb25zdCBpc0xhbmRzY2FwZSA9IF9pc0xhbmRzY2FwZTtcclxuICAgIGV4cG9ydCBjb25zdCBpc0lwaG9uZVggPSBfaXNJcGhvbmVYO1xyXG5cclxuXHJcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gd3hDcmVhdGVJbWFnZVRvU3ByaXRlKHNwcml0ZSx1cmwpOlByb21pc2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBzcHJpdGUubm9kZTtcclxuICAgICAgICAgICAgbGV0IHNpemUgPSB7d2lkdGg6bm9kZS53aWR0aCAsIGhlaWdodDpub2RlLmhlaWdodH07XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IHd4LmNyZWF0ZUltYWdlKCk7XHJcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUgJiYgc3ByaXRlLm5vZGUgJiYgc3ByaXRlLm5vZGUuaXNWYWxpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuVGV4dHVyZTJEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5pbml0V2l0aEVsZW1lbnQoaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUuaGFuZGxlTG9hZGVkVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLndpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbjpudW1iZXIsIG1heDpudW1iZXIpIHtcclxuICAgICAgICBsZXQgZGlmZiA9IG1heCAtIG1pbjtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyAoTWF0aC5yYW5kb20oKSpkaWZmKjEwMCklKGRpZmYrMSkpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOS/ruWkjeW8leaTjueahGJ1Z++8jGNjLlJpY2hUZXh05pyJ5pe25YCZ6K6+572u5LqGc3RyaW5n5ZCO5Lya5a+86Ie05LiN5pi+56S655qE6Zeu6aKYICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2hvd1JpY2hUZXh0KHJpY2hUZXh0OmNjLlJpY2hUZXh0KSB7XHJcbiAgICAgICAgcmljaFRleHQubm9kZS5jaGlsZHJlbi5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlubbooYzmiafooYxwcm9taXNlICovXHJcbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uY3VycmVudEV4ZWN1dGUobGlzdDpBcnJheTxQcm9taXNlPikge1xyXG4gICAgICAgIGZvciAobGV0IHByb21pc2Ugb2YgbGlzdCl7XHJcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmK/lkKblkIzkuIDlpKkgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZTE6RGF0ZSwgZGF0ZTI6RGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBkYXRlMS5nZXRGdWxsWWVhcigpID09IGRhdGUyLmdldEZ1bGxZZWFyKCkgJiYgZGF0ZTEuZ2V0TW9udGgoKSA9PSBkYXRlMi5nZXRNb250aCgpICYmIGRhdGUxLmdldERhdGUoKSA9PSBkYXRlMi5nZXREYXRlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKiDovazmjaLmlbDlrZfkuLprIG0gYiB0Ki9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG9ydEZvcm1hdChudW06bnVtYmVyKTpzdHJpbmcge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIGxldCB0ID0gMTAwMCAqIDEwMDAgKiAxMDAwICogMTAwMDtcclxuICAgICAgICBsZXQgYiA9IDEwMDAgKiAxMDAwICogMTAwMDtcclxuICAgICAgICBsZXQgbSA9IDEwMDAgKiAxMDAwO1xyXG4gICAgICAgIGxldCBrID0gMTAwMDtcclxuICAgICAgICBpZiAobnVtID49IHQpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBNYXRoLmZsb29yKG51bS90KjEwKS8xMCArIFwiVFwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtID49IGIpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBNYXRoLmZsb29yKChudW0vYikqMTApLzEwICsgXCJCXCI7XHJcbiAgICAgICAgfWVsc2UgaWYgKG51bSA+PSBtKXtcclxuICAgICAgICAgICAgcmVzdWx0ID0gTWF0aC5mbG9vcigobnVtL20pKjEwKS8xMCArIFwiTVwiO1xyXG4gICAgICAgIH1lbHNlIGlmIChudW0gPj0gayl7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IE1hdGguZmxvb3IoKG51bS9rKSoxMCkvMTAgKyBcIktcIjtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IE1hdGguZmxvb3IobnVtKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBtb3ZlU2tlbGV0b24oc2tlOnNwLlNrZWxldG9uLCBzcmNZOm51bWJlciwgcmVhbFk6bnVtYmVyLCBkZWF5VGltZTpudW1iZXIsIG1vdmVUaW1lOm51bWJlciwgYm9uZU5hbWU6c3RyaW5nLCBib25lWTpudW1iZXIpIHtcclxuICAgICAgICBsZXQgc3ViWSA9IHJlYWxZIC0gc3JjWTtcclxuICAgICAgICBsZXQgc3BlZWQgPSBzdWJZL21vdmVUaW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PnNyY1k9XCIrc3JjWSwgXCJyZWFsWT1cIityZWFsWSwgXCJzdWJZPVwiK3N1YlksIFwic3BlZWQ9XCIrc3BlZWQsIFwieT1cIitza2UuZmluZEJvbmUoYm9uZU5hbWUpLnkpO1xyXG4gICAgICAgIHNrZS5maW5kQm9uZShib25lTmFtZSkueSA9IGJvbmVZO1xyXG4gICAgICAgIHNrZS5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoZGVheVRpbWUpLCBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICBsZXQgbW92ZVkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gQWN0aW9ucy51cGRhdGUoKGR0Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlTGVuID0gZHQqc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuenu+WKqOmqqOmqvHlcIiwgbW92ZUxlbiwgZHQsIHNwZWVkLCBtb3ZlWSwgc3ViWSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMobW92ZVkgKyBtb3ZlTGVuKSA+PSBNYXRoLmFicyhzdWJZKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tlLmZpbmRCb25lKGJvbmVOYW1lKS55ICs9IHN1YlkgLSBtb3ZlWTtcclxuICAgICAgICAgICAgICAgICAgICBza2Uubm9kZS5zdG9wQWN0aW9uQnlUYWcoMTAwMjApXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tlLmZpbmRCb25lKGJvbmVOYW1lKS55ICs9IG1vdmVMZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb3ZlWSArPSBtb3ZlTGVuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWN0aW9uLnNldFRhZygxMDAyMCk7XHJcbiAgICAgICAgICAgIHNrZS5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19