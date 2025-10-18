"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var pathResolver_1 = require("./pathResolver");
var util_1 = require("./util");
electron_1.app.on("ready", function () {
    var mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: (0, pathResolver_1.getPreloadPath)(),
        }
    });
    if ((0, util_1.isDev)()) {
        mainWindow.loadURL('https://localhost:5123');
    }
    else {
        mainWindow.loadFile((0, pathResolver_1.getUIPath)());
    }
});
