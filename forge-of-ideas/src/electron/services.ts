import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';
import {removeIdeaFromShelf} from './shelfHandler.js';



interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

interface ShelfIdea { cor: string;
  path: string;
}

interface ShelfStructure {
  "1": Record<string, ShelfIdea>;
  "2": Record<string, ShelfIdea>;
  "3": Record<string, ShelfIdea>;
}

export function deleteIdea(data: IdeaData): string|null{
    let response;
    response = removeIdeaFromShelf(data.title);
    if(response=="ok" && data.path){
        fs.unlinkSync(data.path);
        return null;
    }
    return "Error";
}

export function updateIdea(newData: IdeaData, oldData: IdeaData): string {
    const ideasPath = getIdeasPath();

    const nameChanged = newData.title !== oldData.title;

    const oldFileTitle = `${oldData.title}.json`;
    const newFileTitle = `${newData.title}.json`;

    const oldFilePath = path.join(ideasPath, oldFileTitle);
    const newFilePath = path.join(ideasPath, newFileTitle);

    const shelfPath = getShelfPath();
    const shelfContent = fs.readFileSync(shelfPath, "utf-8");
    const shelf = JSON.parse(shelfContent);

    delete shelf[oldData.title];

    shelf[newData.title] = {
        path: newFilePath
    };

    if (shelf.lvls_Qtde && newData.level != oldData.level) {
        const current = Number(shelf.lvls_Qtde[oldData.level]);
        const newLvl = Number(shelf.lvls_Qtde[newData.level]);
        shelf.lvls_Qtde[oldData.level] = String(Math.max(0, current - 1));
        shelf.lvls_Qtde[newData.level] = String(Math.max(0, newLvl + 1));
    }

    if (nameChanged) {
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    fs.writeFileSync(newFilePath, JSON.stringify(newData, null, 2), "utf-8");

    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), "utf-8");

    return newFilePath;
}
