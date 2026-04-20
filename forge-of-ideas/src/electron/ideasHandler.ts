import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';

interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}


export function createIdea(json: IdeaData): string {
    const data = json;
    
    const ideasPath = getIdeasPath();

    const ideaFileName = `${data.title}.json`;

    data.path= path.join(ideasPath, ideaFileName);

    const ideaFilePath = path.join(ideasPath, ideaFileName);

    fs.writeFileSync(ideaFilePath, JSON.stringify(json, null, 2), 'utf-8');

    const shelfPath = getShelfPath();

    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');

    console.log(shelfContent)

    const shelf = JSON.parse(shelfContent)

    const level = String(data.level) as "1" | "2" | "3";
    shelf[data.title]={
        level: level,
        title: data.title,
        path: ideaFilePath
    }

    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), 'utf-8');

    return ideaFilePath;
}
