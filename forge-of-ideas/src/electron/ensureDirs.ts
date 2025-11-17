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
