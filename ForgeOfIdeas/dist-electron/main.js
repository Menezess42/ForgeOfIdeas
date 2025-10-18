import { app, BrowserWindow } from 'electron';
import { getUIPath, getPreloadPath } from './pathResolver.js';
import { isDev } from './util.js';
app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile(getUIPath());
    }
});
