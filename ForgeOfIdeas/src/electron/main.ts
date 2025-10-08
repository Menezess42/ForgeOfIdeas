import {app, BrowserWindow} from 'electron';
import { getUIPath, getPreloadPath} from './pathResolver.ts';


app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()){
        mainWindow.loadURL('https://localhost:5123');
    }else{
            mainWindow.loadFile(getUIPath());
        }
});
