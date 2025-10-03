// /src/electron/main.ts
import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import {isDev, ipcHandle} from  './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
// type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }
    else{
    mainWindow.loadFile(getUIPath());
    }

    pollResources(mainWindow);

    ipcHandle("getStaticData", ()=>{
        return getStaticData();
    });
});
