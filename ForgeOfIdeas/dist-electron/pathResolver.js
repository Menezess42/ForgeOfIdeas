"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreloadPath = getPreloadPath;
exports.baseDirPath = baseDirPath;
exports.getUIPath = getUIPath;
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const util_js_1 = require("./util.js");
function getPreloadPath() {
    return path_1.default.join(electron_1.app.getAppPath(), (0, util_js_1.isDev)() ? '.' : '..', '/preload.js');
}
function baseDirPath() {
    return path_1.default.join(electron_1.app.getAppPath(), (0, util_js_1.isDev)() ? '.' : '..', 'Ideas/');
}
function getUIPath() {
    return path_1.default.join(electron_1.app.getAppPath(), '/dist-react/index.html');
}
