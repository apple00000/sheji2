
const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class BulletStrike extends cc.Component {

    abstract init(id);
    abstract strike();
}
