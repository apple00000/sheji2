import {IConverter} from "../converter/IConverter";

export class LocalStorage {
    static prefix = "";

    private static get(key:string){
        return cc.sys.localStorage.getItem(this.prefix + key);
    }

    private static set(key:string, value:any){
        cc.sys.localStorage.setItem(this.prefix + key, value);
    }

    static getNumber(key:string):number|null{
        let val = this.get(key);
        if (val == null){
            return null;
        }
        return parseInt(val);
    }

    static setNumber(key:string, value:number){
        this.set(key, value);
    }

    static getBoolean(key:string):boolean{
        let val = this.getNumber(key);
        return !!val;
    }

    static setBoolean(key:string, b:boolean){
        let value = 0;
        if (b){
            value = 1;
        }
        this.set(key, value);
    }


    static getString(key:string):string|null{
        return this.get(key);
    }

    static setString(key:string, value:string){
        this.set(key, value);
    }

    static getObject(key:string, obj:IConverter){
        let val = this.get(key);
        if (val){
            obj.decode(JSON.parse(val));
            return obj;
        }
        return null;
    }

    static setObject(key:string, obj:IConverter){
        let value = obj.encode();
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.set(key, value);
    }

}

