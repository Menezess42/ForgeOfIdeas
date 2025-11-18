import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import { isDev } from './utils.js';
import {ensureIdeasFolder} from './ensureDirs.js';

type test = string;

app.on("ready", ()=>{
    ensureIdeasFolder();
    const mainWindow = new BrowserWindow({});
    if (isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }else{
            mainWindow.loadFile(path.join(app.getAppPath(), '../dist-react/index.html'));
        }
})
