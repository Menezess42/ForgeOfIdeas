import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";
import { fileURLToPath } from "url";

export function getPreloadPath() {
  // Ambiente de desenvolvimento normal
  if (isDev()) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, "../dist-electron/preload.cjs");
  }

  const appPath = app.getAppPath();

  // Detecta execução via Nix (nix-store no path)
  if (appPath.includes("/nix/store")) {
    return path.join(
      appPath,              // onde está o main.js
      "preload.cjs"         // preload fica ao lado dele no dist-electron copiado pelo Nix
    );
  }

  // Builds normais (Windows/macOS/Linux)
  return path.join(
    process.resourcesPath,
    "dist-electron",
    "preload.cjs"
  );
}
