"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ForgeOfIdeas/src/electron/preload.ts
const electron_1 = require("electron");
console.log("⚙️ Preload carregado com sucesso");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    saveIdea: (data) => electron_1.ipcRenderer.invoke("save-idea", data)
});
