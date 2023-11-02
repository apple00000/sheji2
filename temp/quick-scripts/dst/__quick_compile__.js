
(function () {
var scripts = [{"deps":{"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":1,"./assets/script/quad-tree/LooseQuadTree":2,"./assets/script/test/TestAngle":3,"./assets/script/quad-tree/AABBRegion":4,"./assets/script/test/CalSpace":5,"./assets/script/test/TestSpineEvent":6,"./assets/script/test/TestWait":7,"./assets/script/test/TestRotation":8,"./assets/script/app/StartupCommand":9,"./assets/script/quad-tree/LooseQuadTreeCell":10,"./assets/script/app/entities/bullet/BulletHuoYan":11,"./assets/framework/actions/EllipseBy":12,"./assets/resources/prefab/mainnode novis/maincall":13,"./assets/framework/audio/Music":14,"./assets/framework/component/CanvasMediator":15,"./assets/framework/config/ExcelConfig":16,"./assets/framework/dialog/DialogVO":17,"./assets/framework/converter/JsonConverter":18,"./assets/framework/extend/Shake":19,"./assets/framework/facade/Facade":20,"./assets/framework/http/HttpProtocol":21,"./assets/framework/interceptor/Interceptor":22,"./assets/framework/type/KVData":23,"./assets/framework/tableview/AbstractTableItem":24,"./assets/framework/persistence/LocalStorage":25,"./assets/script/app/config/ExcelTableNames":26,"./assets/script/app/game/GameBulletsController":27,"./assets/script/app/home/HomeController":28,"./assets/script/app/info/Formula":29,"./assets/script/app/network/Network":30,"./assets/script/app/music/ClickSoundCommand":31,"./assets/script/app/welcome/Welcome":32,"./assets/script/app/interceptor/LoadSceneIntercetor":33,"./assets/script/app/tips/ShowTipsCommand":34,"./assets/script/app/entities/bulletEmitter/BulletEmitterHuoJianTong":35,"./assets/script/app/entities/bulletStrike/BulletStrikeLightning":36,"./assets/script/app/entities/prop/PropBase":37,"./assets/script/app/entities/enemy/EmitBulletEnemy":38,"./assets/script/app/entities/explosive/ExplosiveHuoJianTong":39,"./assets/script/app/entities/role/Role":40,"./assets/framework/actions/Actions":41,"./assets/framework/component/DragonBoneMediator":42,"./assets/framework/component/SwingEffect":43,"./assets/framework/component/RigidBodyCollisionEvent":44,"./assets/framework/component/PauseAllRunningActions":45,"./assets/framework/component/View":46,"./assets/framework/component/ZIndex":47,"./assets/framework/component/CDTimer":48,"./assets/framework/component/LifeCycle":49,"./assets/framework/audio/SwitchAudioCommand":50,"./assets/framework/dialog/ShowDialogCommand":51,"./assets/framework/component/ZoomEffect":52,"./assets/framework/converter/IConverter":53,"./assets/framework/extend/cccollider":54,"./assets/framework/extend/SpacePartition":55,"./assets/framework/component/UIScale":56,"./assets/framework/extend/ccloaderAwait":57,"./assets/framework/dialog/DialogMediator":58,"./assets/framework/extend/ccIntersection":59,"./assets/framework/extend/Extend":60,"./assets/framework/facade/OpenViewCommand":61,"./assets/framework/facade/LoadSceneCommand":62,"./assets/framework/http/HttpOption":63,"./assets/framework/facade/CloseViewCommand":64,"./assets/framework/http/HttpClient":65,"./assets/framework/extend/bigNumber":66,"./assets/framework/interceptor/PostCommandInterceptor":67,"./assets/framework/extend/Toast":68,"./assets/framework/interceptor/PreCommandInterceptor":69,"./assets/framework/interceptor/TestInterceptor":70,"./assets/framework/interceptor/TestInterceptor2":71,"./assets/framework/facade/ICommand":72,"./assets/framework/actions/CCCircleAction":73,"./assets/framework/component/NodeEvent":74,"./assets/script/app/config/InviteConfig":75,"./assets/framework/interceptor/CommandInterceptor":76,"./assets/script/app/config/MusicPaths":77,"./assets/script/app/config/GroupConfig":78,"./assets/script/app/config/ResConfig":79,"./assets/script/app/config/LocalStorageKeys":80,"./assets/script/app/game/GameEnemysController":81,"./assets/script/app/game/GameExplosivesController":82,"./assets/script/app/game/GameLabelsController":83,"./assets/script/app/game/GameOver":84,"./assets/script/app/game/GameProxy":85,"./assets/script/app/config/NetworkConfig":86,"./assets/script/app/config/AppConfig":87,"./assets/script/app/game/GameRelive":88,"./assets/script/app/game/GameSupply":89,"./assets/script/app/game/GameSupplyItem":90,"./assets/script/app/game/GameCollisionController":91,"./assets/script/app/game/GameRoleController":92,"./assets/script/app/game/PreloadGameSceneCommand":93,"./assets/script/app/game/GameController":94,"./assets/framework/extend/ccnodeAwait":95,"./assets/script/app/game/GameUIController":96,"./assets/script/app/home/LoadingCommand":97,"./assets/script/app/home/JackpotController":98,"./assets/script/app/home/InviteItem":99,"./assets/script/app/home/PropsItemController":100,"./assets/script/app/home/InvitesController":101,"./assets/script/app/home/RecommendController":102,"./assets/script/app/home/PropsController":103,"./assets/script/app/home/ExchangeController":104,"./assets/script/app/home/RecommendPropsController":105,"./assets/script/app/home/ShadowLayerController":106,"./assets/script/app/home/RoleLayerController":107,"./assets/script/app/home/TakeJackpotController":108,"./assets/script/app/game/GameOverLucky":109,"./assets/script/app/home/UpEffectController":110,"./assets/script/app/home/EarningsLayerController":111,"./assets/script/app/info/Task":112,"./assets/script/app/home/WeaponLayerController":113,"./assets/script/app/info/Newbies":114,"./assets/script/app/info/PropInfo":115,"./assets/script/app/info/Armory":116,"./assets/script/app/info/World":117,"./assets/script/app/home/TopController":118,"./assets/script/app/interceptor/OpenViewInterceptor":119,"./assets/script/app/home/SettingsController":120,"./assets/script/app/game/FirstAidController":121,"./assets/script/app/interceptor/CloseViewInterceptor":122,"./assets/script/app/entities/bullet/BulletJiGuang":123,"./assets/script/app/entities/bullet/BulletJuJiDan":124,"./assets/script/app/entities/bullet/BulletLiZiPao":125,"./assets/framework/tableview/TableViewMediator":126,"./assets/script/app/entities/bullet/BulletOfSpider":127,"./assets/script/app/entities/bullet/BulletOfDiLei":128,"./assets/script/app/entities/bullet/BulletOfXuanFengHuoPao":129,"./assets/script/app/entities/bullet/BulletOfJianGuangSi":130,"./assets/script/app/entities/bullet/BulletOfLighting":131,"./assets/script/app/entities/bullet/BulletOfFangHuDun":132,"./assets/script/app/entities/bullet/BulletOfEnemy":133,"./assets/script/app/entities/bullet/BulletOfShouLei":134,"./assets/script/app/entities/bullet/BulletShanDianQiu":135,"./assets/script/app/entities/bulletEmitter/BulletEmitterJiGuang":136,"./assets/script/app/entities/bulletEmitter/BulletEmitterPenZi":137,"./assets/script/app/entities/bulletEmitter/BulletEmitterJuJiQiang":138,"./assets/script/app/entities/bulletEmitter/BulletEmitterShouQiang":139,"./assets/script/app/entities/bulletEmitter/BulletEmitterSanDanQiang":140,"./assets/script/app/entities/bulletEmitter/BulletEmitterShanDianQiu":141,"./assets/script/app/entities/bulletStrike/BulletStrikeScale":142,"./assets/script/app/entities/bulletEmitter/BulletEmitterHuoYan":143,"./assets/script/app/entities/bulletEmitter/BulletEmitter":144,"./assets/script/app/entities/bulletEmitter/BulletEmitterLiZiPao":145,"./assets/script/app/entities/bulletEmitter/BulletEmitterJiaTeLin":146,"./assets/script/app/entities/bulletStrike/BulletStrike":147,"./assets/script/app/entities/enemy/SpiderEnemy":148,"./assets/script/app/entities/enemy/EnemyAABB":149,"./assets/script/app/entities/enemy/Enemy":150,"./assets/script/app/entities/prop/Lightning":151,"./assets/script/app/entities/role/RoleSupply":152,"./assets/script/app/entities/enemy/BossEnemy":153,"./assets/script/app/entities/bullet/BulletHuoJianTong":154,"./assets/script/app/entities/role/RoleAABB":155,"./assets/script/app/entities/prop/Guns":156,"./assets/script/app/entities/bullet/Bullet":157,"./assets/script/app/entities/prop/PropStateController":158,"./assets/script/app/entities/role/ImpenetrableDefence":159,"./assets/script/app/entities/explosive/Explosive":160},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{"./LooseQuadTreeCell":10},"path":"preview-scripts/assets/script/quad-tree/LooseQuadTree.js"},{"deps":{},"path":"preview-scripts/assets/script/test/TestAngle.js"},{"deps":{},"path":"preview-scripts/assets/script/quad-tree/AABBRegion.js"},{"deps":{"../../framework/extend/SpacePartition":55,"../app/entities/enemy/Enemy":150,"../quad-tree/LooseQuadTree":2},"path":"preview-scripts/assets/script/test/CalSpace.js"},{"deps":{},"path":"preview-scripts/assets/script/test/TestSpineEvent.js"},{"deps":{},"path":"preview-scripts/assets/script/test/TestWait.js"},{"deps":{},"path":"preview-scripts/assets/script/test/TestRotation.js"},{"deps":{"./config/AppConfig":87,"../../framework/extend/Extend":60,"../../framework/audio/Music":14,"../../framework/component/View":46,"../../framework/interceptor/Interceptor":22,"./interceptor/OpenViewInterceptor":119,"./interceptor/CloseViewInterceptor":122,"./interceptor/LoadSceneIntercetor":33,"../../framework/persistence/LocalStorage":25,"./info/World":117},"path":"preview-scripts/assets/script/app/StartupCommand.js"},{"deps":{"./LooseQuadTree":2},"path":"preview-scripts/assets/script/quad-tree/LooseQuadTreeCell.js"},{"deps":{"./Bullet":157},"path":"preview-scripts/assets/script/app/entities/bullet/BulletHuoYan.js"},{"deps":{},"path":"preview-scripts/assets/framework/actions/EllipseBy.js"},{"deps":{},"path":"preview-scripts/assets/resources/prefab/mainnode novis/maincall.js"},{"deps":{"../persistence/LocalStorage":25},"path":"preview-scripts/assets/framework/audio/Music.js"},{"deps":{"../facade/Facade":20},"path":"preview-scripts/assets/framework/component/CanvasMediator.js"},{"deps":{},"path":"preview-scripts/assets/framework/config/ExcelConfig.js"},{"deps":{},"path":"preview-scripts/assets/framework/dialog/DialogVO.js"},{"deps":{},"path":"preview-scripts/assets/framework/converter/JsonConverter.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/Shake.js"},{"deps":{"../extend/Extend":60,"../actions/Actions":41,"../interceptor/Interceptor":22},"path":"preview-scripts/assets/framework/facade/Facade.js"},{"deps":{},"path":"preview-scripts/assets/framework/http/HttpProtocol.js"},{"deps":{},"path":"preview-scripts/assets/framework/interceptor/Interceptor.js"},{"deps":{},"path":"preview-scripts/assets/framework/type/KVData.js"},{"deps":{},"path":"preview-scripts/assets/framework/tableview/AbstractTableItem.js"},{"deps":{},"path":"preview-scripts/assets/framework/persistence/LocalStorage.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/ExcelTableNames.js"},{"deps":{"../entities/bulletStrike/BulletStrike":147,"../entities/bullet/Bullet":157,"./GameProxy":85},"path":"preview-scripts/assets/script/app/game/GameBulletsController.js"},{"deps":{"../../../framework/extend/Extend":60,"../../../framework/facade/Facade":20,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../entities/enemy/Enemy":150,"../../../framework/audio/Music":14,"../config/MusicPaths":77,"../info/World":117,"../../../framework/actions/Actions":41,"../game/GameProxy":85,"./WeaponLayerController":113,"../entities/bulletEmitter/BulletEmitter":144},"path":"preview-scripts/assets/script/app/home/HomeController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/info/Formula.js"},{"deps":{"../info/World":117,"../config/AppConfig":87,"../../../framework/http/HttpProtocol":21,"../../../framework/http/HttpClient":65,"../../../framework/persistence/LocalStorage":25,"../../../framework/facade/Facade":20,"../config/NetworkConfig":86},"path":"preview-scripts/assets/script/app/network/Network.js"},{"deps":{"../config/MusicPaths":77,"../../../framework/audio/Music":14},"path":"preview-scripts/assets/script/app/music/ClickSoundCommand.js"},{"deps":{"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/welcome/Welcome.js"},{"deps":{"../../../framework/facade/Facade":20,"../config/MusicPaths":77,"../../../framework/audio/Music":14,"../config/NetworkConfig":86,"../network/Network":30},"path":"preview-scripts/assets/script/app/interceptor/LoadSceneIntercetor.js"},{"deps":{"../../../framework/extend/Extend":60,"../../../framework/component/View":46},"path":"preview-scripts/assets/script/app/tips/ShowTipsCommand.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterHuoJianTong.js"},{"deps":{"./BulletStrike":147},"path":"preview-scripts/assets/script/app/entities/bulletStrike/BulletStrikeLightning.js"},{"deps":{"../../game/GameProxy":85},"path":"preview-scripts/assets/script/app/entities/prop/PropBase.js"},{"deps":{"../../../../framework/audio/Music":14,"./Enemy":150},"path":"preview-scripts/assets/script/app/entities/enemy/EmitBulletEnemy.js"},{"deps":{"./Explosive":160,"../../game/GameProxy":85},"path":"preview-scripts/assets/script/app/entities/explosive/ExplosiveHuoJianTong.js"},{"deps":{"./RoleAABB":155,"./RoleSupply":152},"path":"preview-scripts/assets/script/app/entities/role/Role.js"},{"deps":{},"path":"preview-scripts/assets/framework/actions/Actions.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/DragonBoneMediator.js"},{"deps":{"../actions/Actions":41},"path":"preview-scripts/assets/framework/component/SwingEffect.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/RigidBodyCollisionEvent.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/PauseAllRunningActions.js"},{"deps":{"../extend/Extend":60,"../facade/Facade":20},"path":"preview-scripts/assets/framework/component/View.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/ZIndex.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/CDTimer.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/LifeCycle.js"},{"deps":{"./Music":14,"../component/View":46},"path":"preview-scripts/assets/framework/audio/SwitchAudioCommand.js"},{"deps":{"../facade/Facade":20,"../component/LifeCycle":49,"./DialogMediator":58},"path":"preview-scripts/assets/framework/dialog/ShowDialogCommand.js"},{"deps":{"../actions/Actions":41},"path":"preview-scripts/assets/framework/component/ZoomEffect.js"},{"deps":{},"path":"preview-scripts/assets/framework/converter/IConverter.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/cccollider.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/SpacePartition.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/UIScale.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/ccloaderAwait.js"},{"deps":{"../component/View":46},"path":"preview-scripts/assets/framework/dialog/DialogMediator.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/ccIntersection.js"},{"deps":{"../actions/Actions":41},"path":"preview-scripts/assets/framework/extend/Extend.js"},{"deps":{"./Facade":20},"path":"preview-scripts/assets/framework/facade/OpenViewCommand.js"},{"deps":{"./Facade":20},"path":"preview-scripts/assets/framework/facade/LoadSceneCommand.js"},{"deps":{},"path":"preview-scripts/assets/framework/http/HttpOption.js"},{"deps":{"./Facade":20},"path":"preview-scripts/assets/framework/facade/CloseViewCommand.js"},{"deps":{"./HttpOption":63,"../../script/app/config/NetworkConfig":86},"path":"preview-scripts/assets/framework/http/HttpClient.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/bigNumber.js"},{"deps":{},"path":"preview-scripts/assets/framework/interceptor/PostCommandInterceptor.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/Toast.js"},{"deps":{},"path":"preview-scripts/assets/framework/interceptor/PreCommandInterceptor.js"},{"deps":{"./PostCommandInterceptor":67,"./Interceptor":22},"path":"preview-scripts/assets/framework/interceptor/TestInterceptor.js"},{"deps":{"./PostCommandInterceptor":67},"path":"preview-scripts/assets/framework/interceptor/TestInterceptor2.js"},{"deps":{},"path":"preview-scripts/assets/framework/facade/ICommand.js"},{"deps":{},"path":"preview-scripts/assets/framework/actions/CCCircleAction.js"},{"deps":{},"path":"preview-scripts/assets/framework/component/NodeEvent.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/InviteConfig.js"},{"deps":{},"path":"preview-scripts/assets/framework/interceptor/CommandInterceptor.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/MusicPaths.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/GroupConfig.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/ResConfig.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/LocalStorageKeys.js"},{"deps":{"../entities/enemy/Enemy":150,"../../../framework/extend/SpacePartition":55,"./GameProxy":85,"../entities/prop/PropBase":37},"path":"preview-scripts/assets/script/app/game/GameEnemysController.js"},{"deps":{"../entities/explosive/Explosive":160},"path":"preview-scripts/assets/script/app/game/GameExplosivesController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/game/GameLabelsController.js"},{"deps":{"../../../framework/facade/Facade":20,"../../../framework/extend/Extend":60,"./GameProxy":85,"../info/World":117,"./GameOverLucky":109,"../network/Network":30,"../config/NetworkConfig":86,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/game/GameOver.js"},{"deps":{"../config/ExcelTableNames":26,"../../../framework/config/ExcelConfig":16,"../../../framework/extend/Extend":60,"../info/World":117},"path":"preview-scripts/assets/script/app/game/GameProxy.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/NetworkConfig.js"},{"deps":{},"path":"preview-scripts/assets/script/app/config/AppConfig.js"},{"deps":{"./GameProxy":85,"../config/ExcelTableNames":26,"../../../framework/config/ExcelConfig":16,"../info/World":117,"../../../framework/component/CDTimer":48},"path":"preview-scripts/assets/script/app/game/GameRelive.js"},{"deps":{"../../../framework/tableview/TableViewMediator":126,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"./GameProxy":85,"./GameSupplyItem":90,"../info/World":117},"path":"preview-scripts/assets/script/app/game/GameSupply.js"},{"deps":{"../../../framework/tableview/AbstractTableItem":24,"../info/World":117},"path":"preview-scripts/assets/script/app/game/GameSupplyItem.js"},{"deps":{"../../quad-tree/LooseQuadTree":2,"./GameProxy":85},"path":"preview-scripts/assets/script/app/game/GameCollisionController.js"},{"deps":{"../entities/bulletEmitter/BulletEmitterShanDianQiu":141,"../entities/bulletEmitter/BulletEmitterHuoJianTong":35,"../entities/bulletEmitter/BulletEmitterShouQiang":139,"../entities/bulletEmitter/BulletEmitterSanDanQiang":140,"../entities/role/Role":40,"../../../framework/actions/Actions":41,"../entities/bulletEmitter/BulletEmitterJiGuang":136,"../entities/bulletEmitter/BulletEmitterLiZiPao":145,"../entities/bulletEmitter/BulletEmitterJiaTeLin":146,"../entities/bulletEmitter/BulletEmitterJuJiQiang":138,"../entities/bulletEmitter/BulletEmitterHuoYan":143,"../entities/bulletEmitter/BulletEmitter":144,"../entities/bulletEmitter/BulletEmitterPenZi":137,"./GameProxy":85,"../entities/enemy/Enemy":150,"../entities/bullet/BulletOfFangHuDun":132,"../entities/prop/PropStateController":158,"../../../framework/audio/Music":14,"../info/World":117,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"./GameController":94,"../../../framework/extend/Extend":60},"path":"preview-scripts/assets/script/app/game/GameRoleController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/game/PreloadGameSceneCommand.js"},{"deps":{"./GameProxy":85,"../../../framework/extend/Extend":60,"../info/World":117,"../../../framework/extend/Shake":19,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../../../framework/audio/Music":14},"path":"preview-scripts/assets/script/app/game/GameController.js"},{"deps":{},"path":"preview-scripts/assets/framework/extend/ccnodeAwait.js"},{"deps":{"./GameProxy":85,"../../../framework/extend/Extend":60,"../../../framework/actions/Actions":41},"path":"preview-scripts/assets/script/app/game/GameUIController.js"},{"deps":{"../../../framework/facade/Facade":20,"../../../framework/config/ExcelConfig":16},"path":"preview-scripts/assets/script/app/home/LoadingCommand.js"},{"deps":{"../info/World":117,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../../../framework/extend/Extend":60,"../config/NetworkConfig":86,"../network/Network":30,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/JackpotController.js"},{"deps":{"../../../framework/tableview/AbstractTableItem":24,"../../../framework/extend/Extend":60,"../network/Network":30,"../info/World":117,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/InviteItem.js"},{"deps":{"../../../framework/tableview/AbstractTableItem":24,"./PropsController":103,"../info/World":117},"path":"preview-scripts/assets/script/app/home/PropsItemController.js"},{"deps":{"../../../framework/tableview/TableViewMediator":126,"../config/NetworkConfig":86,"../network/Network":30},"path":"preview-scripts/assets/script/app/home/InvitesController.js"},{"deps":{"../entities/bulletEmitter/BulletEmitterShouQiang":139,"../entities/bulletEmitter/BulletEmitterJuJiQiang":138,"../entities/bulletEmitter/BulletEmitterJiaTeLin":146,"../entities/bulletEmitter/BulletEmitterJiGuang":136,"../entities/bulletEmitter/BulletEmitterHuoYan":143,"../entities/bulletEmitter/BulletEmitterHuoJianTong":35,"../entities/bulletEmitter/BulletEmitterLiZiPao":145,"../entities/bulletEmitter/BulletEmitterPenZi":137,"../entities/bulletEmitter/BulletEmitterSanDanQiang":140,"../entities/bulletEmitter/BulletEmitterShanDianQiu":141,"../entities/bulletEmitter/BulletEmitter":144,"../entities/role/Role":40,"../../../framework/actions/Actions":41,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../info/World":117,"../../../framework/facade/Facade":20,"./HomeController":28,"../game/GameProxy":85},"path":"preview-scripts/assets/script/app/home/RecommendController.js"},{"deps":{"../../../framework/tableview/TableViewMediator":126,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/home/PropsController.js"},{"deps":{"../info/World":117,"../../../framework/extend/Extend":60,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/home/ExchangeController.js"},{"deps":{"../entities/role/Role":40,"../info/World":117,"../../../framework/extend/Extend":60,"../entities/bullet/BulletOfJianGuangSi":130},"path":"preview-scripts/assets/script/app/home/RecommendPropsController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/home/ShadowLayerController.js"},{"deps":{"../info/World":117,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../../../framework/extend/Extend":60,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/RoleLayerController.js"},{"deps":{"../../../framework/facade/Facade":20,"../../../framework/extend/Extend":60,"../info/World":117},"path":"preview-scripts/assets/script/app/home/TakeJackpotController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/game/GameOverLucky.js"},{"deps":{"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/UpEffectController.js"},{"deps":{"../info/World":117,"../../../framework/extend/Extend":60,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/EarningsLayerController.js"},{"deps":{"./World":117,"../config/ExcelTableNames":26,"../../../framework/config/ExcelConfig":16},"path":"preview-scripts/assets/script/app/info/Task.js"},{"deps":{"../info/World":117,"../../../framework/extend/Extend":60,"../../../framework/extend/Toast":68,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/WeaponLayerController.js"},{"deps":{"./World":117},"path":"preview-scripts/assets/script/app/info/Newbies.js"},{"deps":{"./World":117},"path":"preview-scripts/assets/script/app/info/PropInfo.js"},{"deps":{"./World":117,"../../../framework/config/ExcelConfig":16,"../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/info/Armory.js"},{"deps":{"../../../framework/persistence/LocalStorage":25,"../network/Network":30,"../config/NetworkConfig":86,"./Armory":116,"./PropInfo":115,"./Newbies":114,"../game/GameSupply":89,"../home/RecommendPropsController":105,"../home/RecommendController":102,"../home/PropsItemController":100,"../game/GameOver":84,"../home/JackpotController":98,"../game/GameRelive":88,"../home/HomeController":28},"path":"preview-scripts/assets/script/app/info/World.js"},{"deps":{"../info/World":117,"../../../framework/extend/Extend":60,"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/home/TopController.js"},{"deps":{"../../../framework/facade/Facade":20,"../../../framework/component/LifeCycle":49},"path":"preview-scripts/assets/script/app/interceptor/OpenViewInterceptor.js"},{"deps":{"../../../framework/audio/Music":14,"../info/World":117,"../../../framework/component/View":46},"path":"preview-scripts/assets/script/app/home/SettingsController.js"},{"deps":{},"path":"preview-scripts/assets/script/app/game/FirstAidController.js"},{"deps":{"../../../framework/facade/Facade":20},"path":"preview-scripts/assets/script/app/interceptor/CloseViewInterceptor.js"},{"deps":{"./Bullet":157},"path":"preview-scripts/assets/script/app/entities/bullet/BulletJiGuang.js"},{"deps":{"./Bullet":157},"path":"preview-scripts/assets/script/app/entities/bullet/BulletJuJiDan.js"},{"deps":{"./Bullet":157,"../bulletEmitter/BulletEmitter":144,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bullet/BulletLiZiPao.js"},{"deps":{"./AbstractTableItem":24},"path":"preview-scripts/assets/framework/tableview/TableViewMediator.js"},{"deps":{"./BulletOfEnemy":133},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfSpider.js"},{"deps":{"./Bullet":157,"../../../../framework/facade/Facade":20,"../../game/GameProxy":85,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfDiLei.js"},{"deps":{"./Bullet":157,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfXuanFengHuoPao.js"},{"deps":{"./Bullet":157,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfJianGuangSi.js"},{"deps":{"./Bullet":157,"../enemy/Enemy":150,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfLighting.js"},{"deps":{"./Bullet":157,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfFangHuDun.js"},{"deps":{"./Bullet":157,"../../config/ExcelTableNames":26,"../../../../framework/config/ExcelConfig":16,"../../game/GameProxy":85},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfEnemy.js"},{"deps":{"./Bullet":157,"../../../../framework/facade/Facade":20,"../../game/GameProxy":85,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bullet/BulletOfShouLei.js"},{"deps":{"./Bullet":157},"path":"preview-scripts/assets/script/app/entities/bullet/BulletShanDianQiu.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJiGuang.js"},{"deps":{"./BulletEmitter":144,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterPenZi.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJuJiQiang.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterShouQiang.js"},{"deps":{"./BulletEmitter":144,"../../info/World":117,"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterSanDanQiang.js"},{"deps":{"./BulletEmitter":144,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterShanDianQiu.js"},{"deps":{"./BulletStrike":147},"path":"preview-scripts/assets/script/app/entities/bulletStrike/BulletStrikeScale.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterHuoYan.js"},{"deps":{"../../config/ExcelTableNames":26,"../../../../framework/config/ExcelConfig":16,"../../game/GameProxy":85,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitter.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterLiZiPao.js"},{"deps":{"./BulletEmitter":144},"path":"preview-scripts/assets/script/app/entities/bulletEmitter/BulletEmitterJiaTeLin.js"},{"deps":{},"path":"preview-scripts/assets/script/app/entities/bulletStrike/BulletStrike.js"},{"deps":{"../../../../framework/audio/Music":14,"../../game/GameProxy":85,"./Enemy":150},"path":"preview-scripts/assets/script/app/entities/enemy/SpiderEnemy.js"},{"deps":{"../../../quad-tree/AABBRegion":4,"./Enemy":150},"path":"preview-scripts/assets/script/app/entities/enemy/EnemyAABB.js"},{"deps":{"./EnemyAABB":149,"../../config/ExcelTableNames":26,"../../../../framework/config/ExcelConfig":16,"../../game/GameProxy":85,"../../../../framework/audio/Music":14,"../../../../framework/extend/Extend":60},"path":"preview-scripts/assets/script/app/entities/enemy/Enemy.js"},{"deps":{},"path":"preview-scripts/assets/script/app/entities/prop/Lightning.js"},{"deps":{},"path":"preview-scripts/assets/script/app/entities/role/RoleSupply.js"},{"deps":{"./Enemy":150},"path":"preview-scripts/assets/script/app/entities/enemy/BossEnemy.js"},{"deps":{"./Bullet":157,"../../../../framework/facade/Facade":20,"../../info/World":117,"../../../../framework/audio/Music":14},"path":"preview-scripts/assets/script/app/entities/bullet/BulletHuoJianTong.js"},{"deps":{"../../../quad-tree/AABBRegion":4},"path":"preview-scripts/assets/script/app/entities/role/RoleAABB.js"},{"deps":{"./PropBase":37},"path":"preview-scripts/assets/script/app/entities/prop/Guns.js"},{"deps":{"../../../../framework/config/ExcelConfig":16,"../../config/ExcelTableNames":26,"../../info/World":117},"path":"preview-scripts/assets/script/app/entities/bullet/Bullet.js"},{"deps":{"../../../../framework/component/CDTimer":48,"../../game/GameProxy":85},"path":"preview-scripts/assets/script/app/entities/prop/PropStateController.js"},{"deps":{"../../game/GameProxy":85},"path":"preview-scripts/assets/script/app/entities/role/ImpenetrableDefence.js"},{"deps":{"../bullet/Bullet":157},"path":"preview-scripts/assets/script/app/entities/explosive/Explosive.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    