import fs from "fs";
import path from "path";

function getBasePath(): string {
    const root = process.env.IDEAS_ROOT;

    if (!root) {
        throw new Error("IDEAS_ROOT is not set. The user has not selected the Ideas folder yet.");
    }

    return root;
}

function resolveIdeasPath(): string {
    return path.join(getBasePath(), "Ideas");
}

export function ensureIdeasFolder(): string {
    const ideasPath = resolveIdeasPath();

    if (!fs.existsSync(ideasPath)) {
        fs.mkdirSync(ideasPath, { recursive: true });
    }

    return ideasPath;
}

export function getIdeasPath(): string {
    return resolveIdeasPath();
}

export function ensureShelfFile(): string {
    const ideasPath = getIdeasPath();
    const shelfPath = path.join(ideasPath, "shelf.json");

    if (!fs.existsSync(shelfPath)) {
        const initialContent = { "3": {}, "2": {}, "1": {} };
        fs.writeFileSync(shelfPath, JSON.stringify(initialContent, null, 2), "utf-8");
    }

    return shelfPath;
}

export function getShelfPath(): string {
    return path.join(getIdeasPath(), "shelf.json");
}

export function ensureAnvilFile(): string {
    const ideasPath = getIdeasPath();
    const anvilPath = path.join(ideasPath, "anvil.json");

    if (!fs.existsSync(anvilPath)) {
        fs.writeFileSync(anvilPath, JSON.stringify(null, null, 2), "utf-8");
    }

    return anvilPath;
}

export function getAnvilPath(): string {
    return path.join(getIdeasPath(), "anvil.json");
}
