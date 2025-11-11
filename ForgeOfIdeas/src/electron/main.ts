import {app, BrowserWindow} from 'electron';
import { getUIPath, getPreloadPath} from './pathResolver.js';
import { isDev } from './util.js';
import { verifyBaseConfig } from './verifyBaseConfig.js';


app.on("ready", () => {
    verifyBaseConfig();
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }else{
            const path_ = getUIPath()
            mainWindow.loadFile(path_);
        }
});
