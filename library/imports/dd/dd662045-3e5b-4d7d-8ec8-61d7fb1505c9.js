"use strict";
cc._RF.push(module, 'dd662BFPltNfY7IYdf7FQXJ', 'AppConfig');
// script/app/config/AppConfig.ts

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
exports.AppConfig = void 0;
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.version = "1.0.0";
    AppConfig.gameName = "我是射击手";
    AppConfig.isDebug = true;
    AppConfig.GameID = "2";
    AppConfig.rankKey = "rank2";
    return AppConfig;
}());
exports.AppConfig = AppConfig;

cc._RF.pop();