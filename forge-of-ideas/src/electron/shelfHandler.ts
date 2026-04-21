import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';


// I have to modify this because now the function will return the array with the counters
// of ideas lvl and the array with the ideas

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
    "1"?: string;
    "2"?: string;
    "3"?: string;
}
interface LevelsCount{
    "1": string;
    "2": string;
    "3": string;
}

type ShelfItem = IdeaData | LevelsCount;

export function loadShelfData(): ShelfItem[] {
const shelfPath = path.join(getIdeasPath(), 'shelf.json');

    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');

    const shelf = JSON.parse(shelfContent) as Record<string, ShelfEntry>;

    const allIdeas: ShelfItem[] = [];
 
    for (const [title, data] of Object.entries(shelf)){
        if(title == "lvls_Qtde"){
            allIdeas.push({
                "1": data["1"] ?? "0",
                "2": data["2"] ?? "0",
                "3": data["3"] ?? "0",
            })
        }
        else allIdeas.push({
            title: title,
            description: '',
            level: Number(data.level) as 1 | 2 | 3,
            path: data.path

        });
    };

    return allIdeas;
}
