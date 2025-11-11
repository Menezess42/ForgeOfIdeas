"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const pathResolver_js_1 = require("./pathResolver.js");
const util_js_1 = require("./util.js");
const verifyBaseConfig_js_1 = require("./verifyBaseConfig.js");
electron_1.app.on("ready", () => {
    (0, verifyBaseConfig_js_1.verifyBaseConfig)();
    const mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: (0, pathResolver_js_1.getPreloadPath)(),
        }
    });
    if ((0, util_js_1.isDev)()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        const path_ = (0, pathResolver_js_1.getUIPath)();
        mainWindow.loadFile(path_);
    }
});
