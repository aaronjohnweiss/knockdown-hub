import { SlippiGame } from "@slippi/slippi-js";
import chokidar from "chokidar";
import _ from "lodash";

const noop = (path) => { }; // do nothing.

export const startFileWatcher = (directory, tag, mainWindow) => {
    let ready = false;
    let percents = {};

    var watcher = chokidar.watch(directory, {
        ignored: /[\/\\]\./,
        depth: 0,
        persistent: true,
        usePolling: true,
        ignoreInitial: true
    });

    function onWatcherReady() {
        ready = true;
        console.info('From here can you check for real changes, the initial scan has been completed.');
    }

    const gameByPath = {};
    // Declare the listeners of the watcher
    watcher
        .on('add', function (path) {

        })
        .on('addDir', function (path) {
            console.log('Directory', path, 'has been added');
        })
        .on('change', function (path) {
            if (!ready || !path.endsWith('.slp')) return;
            // console.log('File', path, 'has been changed');

            const start = Date.now();

            let gameState, settings, frames, latestFrame, gameEnd;
            try {
                let game = _.get(gameByPath, [path, "game"]);
                if (!game) {
                    console.log(`New file at: ${path}`);
                    // Make sure to enable `processOnTheFly` to get updated stats as the game progresses
                    game = new SlippiGame(path, { processOnTheFly: true });
                    gameByPath[path] = {
                        game: game,
                        state: {
                            settings: null,
                            detectedPunishes: {},
                        },
                    };
                }

                gameState = _.get(gameByPath, [path, "state"]);

                settings = game.getSettings();

                // You can uncomment the stats calculation below to get complex stats in real-time. The problem
                // is that these calculations have not been made to operate only on new data yet so as
                // the game gets longer, the calculation will take longer and longer
                // stats = game.getStats();

                frames = game.getFrames();
                latestFrame = game.getLatestFrame();
                gameEnd = game.getGameEnd();
            } catch (err) {
                console.log(err);
                return;
            }

            if (!gameState.settings && settings) {
                console.log(`[Game Start] New game has started`);
                console.log(settings);
                gameState.settings = settings;

                settings.players.forEach((p) => percents[p.playerIndex] = 0)

                // Broadcast new game
                mainWindow.webContents.send('new-game', {
                    tag,
                    players: settings.players
                });
                
            }

            // console.log(`We have ${_.size(frames)} frames.`);
            
            _.forEach(settings.players, (player, idx) => {
                const frameData = _.get(latestFrame, ["players", player.playerIndex]);
                if (!frameData) {
                    return;
                }
                percents[player.playerIndex] = frameData.post.percent.toFixed(1)

            mainWindow.webContents.send('player-percents', percents);

                


            
            // _.forEach(settings.players.filter((p) => p.connectCode.toLocaleLowerCase() !== tag.toLocaleLowerCase()), (player) => {
            //     const frameData = _.get(latestFrame, ["players", player.playerIndex]);
            //     if (!frameData) {
            //         return;
            //     }

            //     // Broadcast settings
            //     const percent = frameData.post.percent.toFixed(1);
            //     mainWindow.webContents.send('opponent-percent', percent);

            });

            if (gameEnd) {
                console.log(`[Game Complete]`);
                // Broadcast game cleared
                mainWindow.webContents.send('new-game', {
                    tag,
                    players: []
                });
                mainWindow.webContents.send('player-percents', {});
            }

            // console.log(`Read took: ${Date.now() - start} ms`);
        })
        .on('unlink', function (path) {
            // console.log('File', path, 'has been removed');
        })
        .on('unlinkDir', function (path) {
            // console.log('Directory', path, 'has been removed');
        })
        .on('error', function (error) {
            // console.log('Error happened', error);
        })
        .on('ready', onWatcherReady)
        .on('raw', function (event, path, details) {
            // This event should be triggered everytime something happens.
            // console.log('Raw event info:', event, path, details);
        });

    return watcher;
}