"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreloadPath = getPreloadPath;
exports.getUIPath = getUIPath;
var path_1 = require("path");
var electron_1 = require("electron");
var util_1 = require("./util");
function getPreloadPath() {
    return path_1.default.join(electron_1.app.getAppPath(), (0, util_1.isDev)() ? '.' : '..', '/preload.cjs');
}
function getUIPath() {
    return path_1.default.join(electron_1.app.getAppPath(), '/dist-react/index.html');
}
