
import Bullet from "../bullet/Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Explosive extends Bullet {

    abstract boom();
}