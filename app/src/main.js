import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { startFileWatcher } from "./utils/fileWatcher";
import path from 'node:path';
import started from 'electron-squirrel-startup';
import Store from './store.js';

let watcher;
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const store = new Store({
  configName: 'user-data',
  defaults: {
    version: '1.0.2',
    window: {
      width: 800,
      height: 600
    },
    filters: {
      moveset: []
    },
    slippi: {
      tag: '',
      replayDirectory: ''
    }
  }
});

const handleConfigMigration = () => {
  const tempStore = store.getStore();
  switch (tempStore.version) {
    case '1.0.0':
      tempStore.percentThresholdHighliting = true
      tempStore.version = '1.0.1'
      store.setStore(tempStore)
      break;
    case '1.0.1':
      delete tempStore.percentThresholdHighliting
      tempStore.version = '1.0.2'
      store.setStore(tempStore)
    default:
      // no more migrations to perform
      return;
  }
  // re-check if more migration is necessary
  handleConfigMigration();
}

const watchDirectory = async (directory, tag) => {
  watcher = startFileWatcher(directory, tag, mainWindow);
};

const createWindow = () => {
  handleConfigMigration();
  let [width, height] = [800, 600];
  try {
    width = store.get('window').width;
    height = store.get('window').height;
  } catch {};

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    vibrancy: 'fullscreen-ui',    // on MacOS
    backgroundMaterial: 'acrylic', // on Windows 11
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    titleBarOverlay: {
    color: '#12121200',
    symbolColor: 'rgba(255, 255, 255, 0.9)',
    height: 20
  }
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('app:is-production', isProduction)
  ipcMain.handle('dialog:openDirectory', handleDirectoryOpen)
  ipcMain.handle('user-data:getSlippiData', getSlippiDataFromAppData)
  ipcMain.on('user-data:setSlippiData', (_, val) => setSlippiDataIntoAppData(val))
  ipcMain.handle('user-data:getFilterData', getFilterData)
  ipcMain.on('user-data:setFilterData', (_, val) => setFilterData(val))

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    console.log('Running config version ', store.get('version'))
    // mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    // mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
    // mainWindow.setFullScreenable(false);
  })

   mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    console.log('saving width and height ', width, height)
    store.set('window', { width, height });
  });

});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const isProduction = async () => {
  return app.isPackaged;
};

const handleDirectoryOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null, {
    properties: ['openDirectory']
  })
  if (!canceled) {
    return filePaths[0]
  }
}

const getSlippiDataFromAppData = async () => {
  const slippiData = await store.get('slippi');
  if (slippiData && slippiData.tag && slippiData.replayDirectory) {
    watchDirectory(slippiData.replayDirectory, slippiData.tag);
  }
  return slippiData;
}

const setSlippiDataIntoAppData = ({ tag, replayDirectory }) => {
  if (tag && replayDirectory) {
    watchDirectory(replayDirectory, tag);
  }
  return store.set('slippi', { tag: tag || '', replayDirectory: replayDirectory || '' });
}

const getFilterData = async () => {
  const filterData = await store.get('filters');
  mainWindow.webContents.send('update-filters', filterData);
  return filterData;
}

const setFilterData = ({ moveset=[] }) => {
  mainWindow.webContents.send('update-filters', { moveset });
  return store.set('filters', { moveset });
}
