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
    
    console.log("Piroquinha:");
    console.log(data);
    const ideasPath = getIdeasPath();

    const ideaFileName = `${data.title}.json`;

    data.path= path.join(ideasPath, ideaFileName);

    const ideaFilePath = path.join(ideasPath, ideaFileName);

    console.log(ideaFilePath);

    fs.writeFileSync(ideaFilePath, JSON.stringify(json, null, 2), 'utf-8');
    
    return ideaFilePath;
}
