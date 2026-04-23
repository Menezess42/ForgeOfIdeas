import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";
import { fileURLToPath } from "url";

export function getPreloadPath() {
  if (isDev()) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, "../dist-electron/preload.cjs");
  }

  const appPath = app.getAppPath();

  if (appPath.includes("/nix/store")) {
    return path.join(
      appPath,
      "preload.cjs"
    );
  }

  return path.join(
    process.resourcesPath,
    "dist-electron",
    "preload.cjs"
  );
}
