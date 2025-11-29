const electron = require('electron');

interface IdeaData {
    nome: string;
    nivel: 1 | 2 | 3;
    cor: string;
    descricao: string;
    path?: string;
}

electron.contextBridge.exposeInMainWorld('api', {
    saveClick: () => console.log('Test1'),
    saveData: (json: IdeaData) => electron.ipcRenderer.send('save-data', json),
    loadIdeas: () => electron.ipcRenderer.invoke('load-ideas')
})
