
import {World} from "./World";

export default class Newbies{
    constructor(map){
        this._map = map;
    }
    private _map:[string, number] = null;

    state(key:string):boolean{
        let val = this._map[key];
        return !!val;
    }

    finish(key:string){
        this._map[key] =  1;
        World.Storage.newbies = this.toJson();
    }

    toJson(){
        return JSON.stringify(this._map);
    }
}
