import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';
import {removeIdeaFromShelf} from './shelfHandler.js';


// interface IdeaData {
//     nome: string;
//     nivel: 1 | 2 | 3;
//     cor: string;
//     descricao: string;
//     path?: string;
// }
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
