// ForgeOfIdeas/src/electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";

console.log("⚙️ Preload carregado com sucesso");
contextBridge.exposeInMainWorld("electronAPI", {
  saveIdea: (data: any) => ipcRenderer.invoke("save-idea", data)
});
