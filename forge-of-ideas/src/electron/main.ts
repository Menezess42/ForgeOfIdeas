import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import { isDev } from './utils.js';
import {ensureIdeasFolder} from './ensureDirs.js';
import { getPreloadPath } from './pathResolver.js';
import {saveJsonToIdeas} from './jsonService.js';

ipcMain.on('save-data', (event, json) => {
    saveJsonToIdeas(json);
});

app.on("ready", ()=>{
    ensureIdeasFolder();
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
