"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var pathResolver_ts_1 = require("./pathResolver.ts");
electron_1.app.on("ready", function () {
    var mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: (0, pathResolver_ts_1.getPreloadPath)(),
        }
    });
    if (isDev()) {
        mainWindow.loadURL('https://localhost:5123');
    }
    else {
        mainWindow.loadFile((0, pathResolver_ts_1.getUIPath)());
    }
});
