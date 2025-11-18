import { contextBridge, ipcRenderer} from 'electron';

// expõe APIs seguras para o React
contextBridge.exposeInMainWorld('api', {
    // Função que o react vai chamar
    saveClick: () => ipcRenderer.invoke('save-click')
});
