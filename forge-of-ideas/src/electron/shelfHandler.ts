import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';


interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

interface ShelfEntry{
    level: string;
    title: string;
    path: string;
}

export function loadShelfData(): IdeaData[] {

    const shelfPath = path.join(getIdeasPath(), 'shelf.json');

    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');

    const shelf = JSON.parse(shelfContent) as Record<string, ShelfEntry>;

    const allIdeas: IdeaData[] = [];
 
    for (const [title, data] of Object.entries(shelf)){
        allIdeas.push({
            title: title,
            description: '',
            level: Number(data.level) as 1 | 2 | 3,
            path: data.path

        });
    };

    return allIdeas;
}
