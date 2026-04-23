import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';

interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

interface ShelfEntry {
    level: string;
    title: string;
    path: string;
    "1"?: string;
    "2"?: string;
    "3"?: string;
}

interface LevelsCount {
    "1": string;
    "2": string;
    "3": string;
}

interface ShelfData {
    ideas: IdeaData[];
    levelsCount: LevelsCount;
}

export function loadShelfData(): ShelfData {
    const shelfPath = path.join(getIdeasPath(), 'shelf.json');
    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');
    const shelf = JSON.parse(shelfContent) as Record<string, ShelfEntry>;
    const ideas: IdeaData[] = [];
    let levelsCount: LevelsCount = { "1": "0", "2": "0", "3": "0" };

    for (const [title, data] of Object.entries(shelf)) {
        if (title === "lvls_Qtde") {
            levelsCount = {
                "1": data["1"] ?? "0",
                "2": data["2"] ?? "0",
                "3": data["3"] ?? "0",
            };
        } else {
            ideas.push({
                title,
                description: '',
                level: Number(data.level) as 1 | 2 | 3,
                path: data.path
            });
        }
    }

    return { ideas, levelsCount };
}
