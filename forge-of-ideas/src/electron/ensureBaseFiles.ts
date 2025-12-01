import {app} from 'electron';
import path from 'path';
import fs from 'fs';

function getBasePath(): string{
    const isProd = app.isPackaged;

    if (isProd){
        const executableDir = path.dirname(app.getPath('exe'));
        return path.join(executableDir, '..');
    }

    return app.getAppPath()
}

function resolveIdeasPath(): string{
    const basePath = getBasePath();
    return path.join(basePath, 'Ideas');
}

export function ensureIdeasFolder(): string{
    const ideasPath = resolveIdeasPath();

    if (!fs.existsSync(ideasPath)){
        fs.mkdirSync(ideasPath, {recursive: true});
    }

    return ideasPath;
}

export function getIdeasPath(): string{
    return resolveIdeasPath();
}

export function ensureShelfFile(): string {
    const ideasPath = getIdeasPath();
    const shelfPath = path.join(ideasPath, 'shelf.json');

    if (!fs.existsSync(shelfPath)) {
        const initialContent = { "3": {}, "2": {}, "1": {} };
        fs.writeFileSync(shelfPath, JSON.stringify(initialContent, null, 2), 'utf-8');
        console.log(`shelf.json criado em: ${shelfPath}`);
    }

    return shelfPath;
}

export function getShelfPath(): string {
    return path.join(getIdeasPath(), 'shelf.json');
}

export function ensureAnvilFile(): string {
    const ideasPath = getIdeasPath(); // pasta já existente
    const anvilPath = path.join(ideasPath, 'anvil.json');

    if (!fs.existsSync(anvilPath)) {
        const initialContent = {};
        fs.writeFileSync(anvilPath, JSON.stringify(initialContent, null, 2), 'utf-8');
    }

    return anvilPath;
}

export function getanvilPath(): string {
    return path.join(getIdeasPath(), 'anvil.json');
}
