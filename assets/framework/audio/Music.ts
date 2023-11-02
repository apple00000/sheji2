// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



import {LocalStorage} from "../persistence/LocalStorage";

const {ccclass, property} = cc._decorator;

const musicCloseKey = "musicOpen";
const sfxCloseKey = "sfxOpen";

export class Music{

    /** 读取本地持久化－－初始化 */
    static init(){
        Music.setMusicOpen(!LocalStorage.getBoolean(musicCloseKey));
        Music.sfxOpen = !LocalStorage.getBoolean(sfxCloseKey);
        // cc.audioEngine.setMusicVolume(0.1);
        // cc.audioEngine.setEffectsVolume(0.1);
    }

    /** 本地持久化 */
    static persistence(){
        LocalStorage.setBoolean(musicCloseKey, !this._musicOpen);
        LocalStorage.setBoolean(sfxCloseKey, !this.sfxOpen);
    }

    /** 设置背景音乐音量 */
    private static _bgmVolume:number = 0.7;

    static setBgmVolume(val:number) {
        this._bgmVolume = val;
        this.updateVolue();
    }

    static getBgmVolume() {
        return this._bgmVolume;
    }

    private static updateVolue() {
        if (this.bgmAudioID > 0){
            cc.audioEngine.setVolume(this.bgmAudioID, this._bgmVolume);
        }
    }

    /** 设置音效音量 */
    static sfxVolume:number = 1;

    /** 背景音乐开关 */
    private static _musicOpen = true;
    static setMusicOpen(val:boolean){
        this._musicOpen = val;
        if (val){
            this.playBGM();
            this.updateVolue();
        } else {
            this.stopBGM();
        }
    }
    static getMusicOpen() {
        return this._musicOpen;
    }

    /** 音效开关 */
    static sfxOpen:boolean = true;

    /** 播放背景音乐 */
    private static _bgmPath = null;
    static async setBgm(val:string) {
        this._bgmPath = val;
        this.playBGM();
    }
    private static bgmAudioID:number = -1;


    static async playBGM(){
        // console.log("playBGM");
        if(this._musicOpen == true && this._bgmPath){
            let audioClip = await cc.loader.loadResAwait(this._bgmPath, cc.AudioClip);
            if(this.bgmAudioID >= 0){
                cc.audioEngine.stop(this.bgmAudioID);
            }
            this.bgmAudioID = cc.audioEngine.play(audioClip,true,this._bgmVolume);
        }
    }

    static stopBGM(){
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
    }

    /** 播放音效 */
    static async playSFX(name:string|cc.AudioClip, sfxVolume?:number){
        // console.log("playSFX===>", name);
        if(this.sfxOpen == true){
            let audioClip = null;
            if (typeof name == "string"){
                audioClip = await cc.loader.loadResAwait(name, cc.AudioClip);
            }else {
                audioClip = name;
            }
            return cc.audioEngine.play(audioClip,false,sfxVolume || this.sfxVolume);
        }
    }


    static pauseAll(){
        cc.audioEngine.pauseAll();
    }

    static resumeAll(){
        cc.audioEngine.resumeAll();
    }

    static stopAll(){
        cc.audioEngine.stopAll();
    }


}