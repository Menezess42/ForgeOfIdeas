const electron = require('electron');

electron.contextBridge.exposeInMainWorld('api', {
    saveClick: () => console.log('Test1'),
    saveData: (json: unknown) => electron.ipcRenderer.send('save-data', json),
    loadIdeas: () => electron.ipcRenderer.invoke('load-ideas') // NOVO
})
