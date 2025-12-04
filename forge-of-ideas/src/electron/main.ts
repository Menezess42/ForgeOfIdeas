import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import fs from 'fs';
import { isDev } from './utils.js';
import { ensureAnvilFile, ensureIdeasFolder, ensureShelfFile } from './ensureBaseFiles.js';
import { getPreloadPath } from './pathResolver.js';
import {
  saveJsonToIdeas,
  loadShelfData,
  readIdeaFile,
  saveEdit,
  loadForge,
  forgeIdea,
  deleteIdea
} from './jsonService.js';

interface IdeaData {
  nome: string;
  nivel: 1 | 2 | 3;
  cor: string;
  descricao: string;
  path?: string;
}

app.setName("forgeOfIdeas");
app.setPath("userData", path.join(app.getPath("userData"), "..", app.getName()));

ipcMain.handle("save-edit", (event, newData: IdeaData, oldData: IdeaData) => {
  try {
    const updatedPath = saveEdit(newData, oldData);
    return updatedPath;
  } catch (error) {
    console.error("Error editing idea:", error);
    throw error;
  }
});

ipcMain.handle('delete-idea', (event, data: IdeaData) => {
  try {
    const response = deleteIdea(data);
    return response;
  } catch (error) {
    console.error("Error editing idea:", error);
    throw error;
  }
});

ipcMain.handle('save-data', async (event, data: IdeaData) => {
  try {
    const savedPath = saveJsonToIdeas(data);
    return savedPath;
  } catch (error) {
    console.error('Error in save-data handler:', error);
    throw error;
  }
});

ipcMain.handle('forge-idea', async (event, data: IdeaData) => {
  return forgeIdea(data);
});

ipcMain.handle('load-ideas', () => { return loadShelfData();
});

ipcMain.handle('load-forge-idea', () => {
  return loadForge();
});

ipcMain.handle('get-idea-details', async (event, ideaPath: string) => {
  try {
    const ideaDetails = await readIdeaFile(ideaPath);
    return ideaDetails;
  } catch (error) {
    console.error('Error loading idea details:', error);
    throw error;
  }
});


function getConfigPath(): string {
  return path.join(app.getPath("userData"), "config.json");
}

function loadConfig(): { ideasRoot?: string } | null {
  try {
    const cfgPath = getConfigPath();
    if (!fs.existsSync(cfgPath)) return null;
    return JSON.parse(fs.readFileSync(cfgPath, "utf-8"));
  } catch (err) {
    console.error("Failed to load config:", err);
    return null;
  }
}

function saveConfig(config: any): void {
  try {
    const cfgPath = getConfigPath();
    const dir = path.dirname(cfgPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(cfgPath, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save config:", err);
    throw err;
  }
}


let config: { ideasRoot?: string } = loadConfig() || {};


ipcMain.handle("get-config", async () => {
  return config;
});

ipcMain.handle("choose-ideas-folder", async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    });

    if (result.canceled || !result.filePaths || result.filePaths.length === 0)
      return null;

    const folder = result.filePaths[0];

    // Atualiza config e salva
    config.ideasRoot = folder;
    saveConfig(config);

    // Atualiza IDEAS_ROOT imediatamente
    process.env.IDEAS_ROOT = folder;

    // Garante base de dados imediatamente
    try {
      ensureIdeasFolder();
      ensureShelfFile();
      ensureAnvilFile();
    } catch (err) {
      console.error("Erro ao garantir estrutura de Ideas após escolha:", err);
    }

    // Retorna já pronto para uso
    return folder;
  } catch (err) {
    console.error("Error in choose-ideas-folder handler:", err);
    throw err;
  }
});

app.on("ready", () => {

  const cfg = loadConfig();

  const mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      show: false, // <- ESSENCIAL
      webPreferences: {
          preload: getPreloadPath()
      }
  });

  // Só mostra quando o DOM estiver pronto
  mainWindow.webContents.once("dom-ready", () => {
      mainWindow.show();
  });

 
  if (!cfg?.ideasRoot) {
    if (isDev()) {
      mainWindow.loadURL('http://localhost:5123/#/choose-folder');
    } else {
      mainWindow.loadFile(
        path.join(app.getAppPath(), '../dist-react/index.html'),
        { hash: 'choose-folder' }
      );
    }
    return;
  }

  process.env.IDEAS_ROOT = cfg.ideasRoot;

  try {
    ensureIdeasFolder();
    ensureShelfFile();
    ensureAnvilFile();
  } catch (err) {
    console.error("Erro ao garantir estrutura de Ideas:", err);
  }

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '../dist-react/index.html'));
  }
});
