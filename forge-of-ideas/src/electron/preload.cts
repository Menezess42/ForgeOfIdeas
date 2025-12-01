import { ipcRenderer } from "electron";

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
    saveData: (data: IdeaData) => electron.ipcRenderer.invoke('save-data', data),
    loadIdeas: () => electron.ipcRenderer.invoke('load-ideas'),
    getIdeaDetails: (ideaPath: string) => ipcRenderer.invoke('get-idea-details', ideaPath)
})
