
const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleSupply extends cc.Component {

    @property(sp.Skeleton)
    ske:sp.Skeleton = null;

    roleNode:cc.Node = null;


    onLoad () {
        this.ske.setCompleteListener(()=>{
            this.node.destroy();
        });
    }

    setSupply(id:number,roleNode:cc.Node){
        this.roleNode = roleNode;
        this.roleNode.on(cc.Node.EventType.POSITION_CHANGED, this.onFollowRole, this);
        let skinName = "prop_"+("0000000000"+id).substr(-3);
        this.ske.setSkin(skinName);
        this.ske.setAnimation(0, "supplyLong", false);
    }

    onFollowRole(){
        this.node.position = this.roleNode.position;
    }

    onDestroy(){
        if (this.roleNode){
            this.roleNode.off(cc.Node.EventType.POSITION_CHANGED, this.onFollowRole, this);
        }
    }
}
