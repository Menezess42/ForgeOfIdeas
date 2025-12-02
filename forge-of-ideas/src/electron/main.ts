import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import { isDev } from './utils.js';
import {ensureAnvilFile, ensureIdeasFolder, ensureShelfFile} from './ensureBaseFiles.js';
import { getPreloadPath } from './pathResolver.js';
import {saveJsonToIdeas, loadShelfData, readIdeaFile, saveEdit} from './jsonService.js';


interface IdeaData {
    nome: string;
    nivel: 1 | 2 | 3;
    cor: string;
    descricao: string;
    path?: string;
}

ipcMain.handle("save-edit", (event, newData: IdeaData, oldData: IdeaData) => {
    try {
        const updatedPath = saveEdit(newData, oldData);
        return updatedPath;
    } catch (error) {
        console.error("Error editing idea:", error);
        throw error;
    }
});

ipcMain.handle('save-data', async (event, data: IdeaData) => {
    try {
        const savedPath = saveJsonToIdeas(data);
        return savedPath;
    } catch (error) {
        console.error('Error in save-data handler:', error);
        throw error;
    }
});
ipcMain.handle('load-ideas', () => {
  return loadShelfData();
});

ipcMain.handle('get-idea-details', async (event, ideaPath: string) => {
    try{
        const ideaDetails = await readIdeaFile(ideaPath);
        return ideaDetails;
    }catch (error){
        console.error('Error loading idea details:', error);
        throw error;
    }
});

app.on("ready", ()=>{
    ensureIdeasFolder();
    ensureShelfFile();
    ensureAnvilFile();
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    });
    if (isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }else{
            mainWindow.loadFile(path.join(app.getAppPath(), '../dist-react/index.html'));
        }
})
