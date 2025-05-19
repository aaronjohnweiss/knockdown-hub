// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    // renderer -> backend
    openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
    setSlippiData: (data) => ipcRenderer.send('user-data:setSlippiData', data),
    setFilterData: (data) => ipcRenderer.send('user-data:setFilterData', data),

    // backend -> renderer
    isProduction: () => ipcRenderer.invoke('app:is-production'),
    getSlippiData: () => ipcRenderer.invoke('user-data:getSlippiData'),
    getFilterData: () => ipcRenderer.invoke('user-data:getFilterData'),
    onNewGame: (callback) => ipcRenderer.on('new-game', (_event, value) => callback(value)),
    onPlayerPercentChange: (callback) => ipcRenderer.on('player-percents', (_event, value) => callback(value)),
    onUpdateFilters: (callback) => ipcRenderer.on('update-filters', (_event, value) => callback(value))
});