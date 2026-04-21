import { ipcRenderer } from "electron";

const electron = require('electron');

//
// interface IdeaData {
//     nome: string;
//     nivel: 1 | 2 | 3;
//     cor: string;
//     descricao: string;
//     path?: string;
// }

interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

electron.contextBridge.exposeInMainWorld('api', {
    saveData: (data: IdeaData) => electron.ipcRenderer.invoke('create-idea', data),
    loadIdeas: () => electron.ipcRenderer.invoke('load-ideas'), // I have to modify this
    // because now the function will return two arrays. One with the counters of ideas
    // and one with the list of ideas
    loadForgeIdea: () => electron.ipcRenderer.invoke('load-forge-idea'),
    getIdeaDetails: (ideaPath: string) => ipcRenderer.invoke('get-idea-details', ideaPath),
    saveEdit: (newData: IdeaData, oldData: IdeaData) => ipcRenderer.invoke("save-edit", newData, oldData),
    forgeIdea: (data: IdeaData) => ipcRenderer.invoke("forge-idea", data),
    deleteIdea: (data: IdeaData) => ipcRenderer.invoke('delete-idea', data),

    chooseIdeasFolder: () => electron.ipcRenderer.invoke("choose-ideas-folder"),
    getConfig: () => electron.ipcRenderer.invoke("get-config"),
})


