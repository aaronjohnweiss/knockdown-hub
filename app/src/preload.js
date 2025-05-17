// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
    getSlippiData: () => ipcRenderer.invoke('user-data:getSlippiData'),
    setSlippiData: (data) => ipcRenderer.send('user-data:setSlippiData', data),
    getFilterData: () => ipcRenderer.invoke('user-data:getFilterData'),
    setFilterData: (data) => ipcRenderer.send('user-data:setFilterData', data),
    onNewGame: (callback) => ipcRenderer.on('new-game', (_event, value) => callback(value)),
    onPlayerPercentChange: (callback) => ipcRenderer.on('player-percents', (_event, value) => callback(value)),
    onUpdateFilters: (callback) => ipcRenderer.on('update-filters', (_event, value) => callback(value)),
    onMinimize: () => ipcRenderer.send('window:minimize'),
    onCloakUpdate: (callback) => ipcRenderer.on('window:updateCloak', (_event, value) => callback(value)),
    toggleCloak: () => ipcRenderer.send('window:cloak'),
});