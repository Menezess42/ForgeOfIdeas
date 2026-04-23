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


    const shelf = JSON.parse(shelfContent)

    const level = String(data.level) as "1" | "2" | "3";

    if (level == "1"){
        shelf["lvls_Qtde"]["1"] = String((Number(shelf["lvls_Qtde"]["1"])+1))
    }
    else if(level=="2"){
        shelf["lvls_Qtde"]["2"] = String((Number(shelf["lvls_Qtde"]["2"])+1))
    }
    else{
        shelf["lvls_Qtde"]["3"] = String((Number(shelf["lvls_Qtde"]["3"])+1))
    }

    shelf[data.title]={
        level: level,
        title: data.title,
        path: ideaFilePath
    }

    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), 'utf-8');

    return ideaFilePath;
}

export async function getIdeasPath(ideaPath: string): Promise<IdeaData>{
    try{
        const fullPath = path.resolve(ideaPath);
        // const fileContent = await fs.readFile(fullPath, 'utf-8');
        const fileContent = await fs.readFileSync(fullPath, 'utf-8');
        const ideaData: IdeaData = JSON.parse(fileContent);
        return ideaData;
    } catch (error) {
        console.error(`Error reading idea file at ${ideaPath}: `, error);

        if (error instanceof Error) {
            throw new Error(`Failed to read idea file: ${error.message}`);
        }

        throw new Error(`Failed to read idea file: ${String(error)}`);
    }
}
