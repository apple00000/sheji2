const mfs = require('./util/mfs');

const adapterActualPlatform = ['bytedance', 'wechatgame'];

function onBuildFinish(options, callback) {
    if ('mini-game' === options.platform) {
        if (adapterActualPlatform.indexOf(options.actualPlatform) === -1) {
            callback && callback();
            return;
        }

        Editor.log('[minigame-launch-fast]', '小游戏首屏启动优化开始');

        // 首屏优化
        // 1. 移动引擎文件
        const enginePath = mfs.join(options.dest, 'subpackages', 'engine');
        // 复制assets的脚本文件
        const assets = mfs.readdirAllSync(mfs.join(options.dest, 'assets'));
        assets.forEach((item) => {
            if (mfs.extname(item) === '.js') {
                const relative = mfs.relative(options.dest, item);
                mfs.copySync(item, mfs.join(enginePath, relative));
                // 删除脚本文件
                mfs.rmSync(item);
            }
        });
        // 复制cocos文件夹
        mfs.copySync(mfs.join(options.dest, 'cocos'), mfs.join(enginePath, 'cocos'));
        mfs.rmSync(mfs.join(options.dest, 'cocos'));
        // 复制src文件夹
        mfs.copySync(mfs.join(options.dest, 'src'), mfs.join(enginePath, 'src'));
        mfs.rmSync(mfs.join(options.dest, 'src'));
        // 复制引擎文件
        const files = mfs.readdirSync(options.dest);
        const extFiles = ['assets', 'remote', 'subpackages', 'game.json', 'project.config.json'];
        let templatesFiles;
        const templatesPath = mfs.join(options.project, 'build-templates', options.actualPlatform);
        if (mfs.existsSync(templatesPath)) {
            templatesFiles = mfs.readdirSync(templatesPath);
        } else {
            templatesFiles = [];
        }
        files.forEach((item) => {
            if (extFiles.indexOf(item) !== -1 || templatesFiles.indexOf(item) !== -1) {
                return;
            }
            mfs.copySync(mfs.join(options.dest, item), mfs.join(enginePath, item));
            mfs.rmSync(mfs.join(options.dest, item));
        });
        // 加入定制文件
        mfs.copySync(mfs.join(options.project, 'settings', 'first.jpg'), mfs.join(options.dest, 'first.jpg'));
        const firstFiles = ['first-screen.js', 'game.js'];
        firstFiles.forEach((item) => {
            mfs.copySync(mfs.join(__dirname, 'static', item), mfs.join(options.dest, item));
        });

        const gameConfig = JSON.parse(mfs.readFileSync(mfs.join(options.dest, 'game.json')));
        if (!gameConfig.subpackages) {
            gameConfig.subpackages = [];
        }
        let addSub = true;
        gameConfig.subpackages.forEach(item => {
            if (item.name === 'engine') {
                addSub = false;
            }
        });
        if (addSub) {
            gameConfig.subpackages.push({ name: 'engine', root: 'subpackages/engine' });
            mfs.writeFileSync(mfs.join(options.dest, 'game.json'), JSON.stringify(gameConfig));
        }

        Editor.log('[minigame-launch-fast]', '小游戏首屏启动优化完成');
    }

    callback();
}

module.exports = {
    load() {
        Editor.Builder.on('build-finished', onBuildFinish);
    },

    unload() {
        Editor.Builder.removeListener('build-finished', onBuildFinish);
    }
};