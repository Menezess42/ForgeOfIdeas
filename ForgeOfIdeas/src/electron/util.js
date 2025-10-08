"use strict";
// import {ipcMain, WebContents, WebFrameMain} from 'electron';
// import {getUIPath} from './pathResolver.ts';
// import {patToFileURL} from 'url';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = isDev;
function isDev() {
    return process.env.NODE_ENV == 'development';
}
