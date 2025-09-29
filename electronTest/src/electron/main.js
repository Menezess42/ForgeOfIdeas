import {app, BrowserView, BrowserWindow} from 'electron'
import path from 'path';

app.on("read", ()=>{
    const mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
});
