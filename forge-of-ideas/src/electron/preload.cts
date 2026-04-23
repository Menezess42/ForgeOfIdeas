import { ipcRenderer } from "electron";

const electron = require('electron');

interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

electron.contextBridge.exposeInMainWorld('api', {
    saveData: (data: IdeaData) => electron.ipcRenderer.invoke('create-idea', data),
    loadIdeas: () => electron.ipcRenderer.invoke('load-ideas'),
    loadForgeIdea: () => electron.ipcRenderer.invoke('load-forge-idea'),
    getIdeaDetails: (ideaPath: string) => ipcRenderer.invoke('get-idea-details', ideaPath),
    updateIdea: (newData: IdeaData, oldData: IdeaData) => ipcRenderer.invoke("update-idea", newData, oldData),
    forgeIdea: (data: IdeaData) => ipcRenderer.invoke("forge-idea", data),
    deleteIdea: (data: IdeaData) => ipcRenderer.invoke('delete-idea', data),

    chooseIdeasFolder: () => electron.ipcRenderer.invoke("choose-ideas-folder"),
    getConfig: () => electron.ipcRenderer.invoke("get-config"),
})


