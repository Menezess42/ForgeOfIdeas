// import {ipcMain, WebContents, WebFrameMain} from 'electron';
// import {getUIPath} from './pathResolver.ts';
// import {patToFileURL} from 'url';
export function isDev() {
    return process.env.NODE_ENV == 'development';
}
