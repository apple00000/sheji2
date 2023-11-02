
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/cccollider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL2NjY29sbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHO0lBQzNCLHFDQUFxQztJQUNyQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUVGLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRztJQUM5Qix3Q0FBd0M7QUFDNUMsQ0FBQyxDQUFDO0FBRUYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHO0lBQzdCLHVDQUF1QztBQUMzQyxDQUFDLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ29sbGlkZXIucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiY2MuQ29sbGlkZXIub25Mb2FkXCIpO1xyXG4gICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmluaXRDb2xsaWRlcih0aGlzKTtcclxufTtcclxuXHJcbmNjLkNvbGxpZGVyLnByb3RvdHlwZS5vbkRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNjLkNvbGxpZGVyLm9uRGlzYWJsZVwiKTtcclxufTtcclxuXHJcbmNjLkNvbGxpZGVyLnByb3RvdHlwZS5vbkVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiY2MuQ29sbGlkZXIub25FbmFibGVcIik7XHJcbn07Il19