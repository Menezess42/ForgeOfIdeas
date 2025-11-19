import {app} from 'electron';
import path from 'path';
import fs from 'fs';

/**
* Ensures the Ideas/ folder exists in the appropriate location
* @returns The absolute path to the Ideas folder
**/
export function ensureIdeasFolder(): string{
    const ideasPath = app.isPackaged
    ? path.join(path.dirname(app.getPath('exe')), '..', 'Ideas')
    : path.join(app.getAppPath(), 'Ideas')

    if(!fs.existsSync(ideasPath)){
        fs.mkdirSync(ideasPath, {recursive: true});
        console.log(`Ideas folder created at: ${ideasPath}`);
    }
    return ideasPath;
}

/**
* Gets the Ideas folder path without creating it
* @returns The absolute path to the Ideas folder
**/
export function getIdeasPath(): string {
    return app.isPackaged
    ? path.join(path.dirname(app.getPath('exe')), '..', 'Ideas')
    : path.join(app.getAppPath(), 'Ideas');
}

/**
 * Garante que o arquivo shelf.json exista dentro de Ideas/
 * e que comece com { "3": {}, "2": {}, "1": {} }
 * @returns O caminho absoluto para shelf.json
 */
export function ensureShelfFile(): string {
    const ideasPath = getIdeasPath(); // pasta já existente
    const shelfPath = path.join(ideasPath, 'shelf.json');

    if (!fs.existsSync(shelfPath)) {
        const initialContent = { "3": {}, "2": {}, "1": {} };
        fs.writeFileSync(shelfPath, JSON.stringify(initialContent, null, 2), 'utf-8');
        console.log(`shelf.json criado em: ${shelfPath}`);
    }

    return shelfPath;
}

/**
 * Retorna o caminho absoluto de shelf.json
 * sem criar ou verificar nada
 */
export function getShelfPath(): string {
    return path.join(getIdeasPath(), 'shelf.json');
}


/**
 * Garante que o arquivo anvil.json exista dentro de Ideas/
 * @returns O caminho absoluto para anvil.json
 */
export function ensureAnvilFile(): string {
    const ideasPath = getIdeasPath(); // pasta já existente
    const anvilPath = path.join(ideasPath, 'anvil.json');

    if (!fs.existsSync(anvilPath)) {
        const initialContent = {};
        fs.writeFileSync(anvilPath, JSON.stringify(initialContent, null, 2), 'utf-8');
    }

    return anvilPath;
}

/**
 * Retorna o caminho absoluto de anvil.json
 * sem criar ou verificar nada
 */
export function getanvilPath(): string {
    return path.join(getIdeasPath(), 'anvil.json');
}
