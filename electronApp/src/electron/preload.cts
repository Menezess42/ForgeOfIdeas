const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistic: (callback: (statistics: any) => void) => callback({}),
    getStaticData:  () => console.log('static'),
})
