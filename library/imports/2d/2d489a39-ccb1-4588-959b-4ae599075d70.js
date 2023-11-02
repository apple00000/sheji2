"use strict";
cc._RF.push(module, '2d489o5zLFFiJWbSuWZB11w', 'cccollider');
// framework/extend/cccollider.ts

cc.Collider.prototype.onLoad = function () {
    // console.log("cc.Collider.onLoad");
    cc.director.getCollisionManager().initCollider(this);
};
cc.Collider.prototype.onDisable = function () {
    // console.log("cc.Collider.onDisable");
};
cc.Collider.prototype.onEnable = function () {
    // console.log("cc.Collider.onEnable");
};

cc._RF.pop();