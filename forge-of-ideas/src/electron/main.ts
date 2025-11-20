import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import { isDev } from './utils.js';
import {ensureAnvilFile, ensureIdeasFolder, ensureShelfFile} from './ensureBaseFiles.js';
import { getPreloadPath } from './pathResolver.js';
import {saveJsonToIdeas, loadShelfData} from './jsonService.js';

ipcMain.on('save-data', (event, json) => {
    saveJsonToIdeas(json);
});

ipcMain.handle('load-ideas', () => {
  return loadShelfData();
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
