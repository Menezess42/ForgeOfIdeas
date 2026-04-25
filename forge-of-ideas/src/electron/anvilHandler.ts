import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';


interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

export function loadForge(): IdeaData|null{
  const anvilPath = path.join(getIdeasPath(), 'anvil.json');
  const anvilContent = fs.readFileSync(anvilPath, 'utf-8');
  
  const anvil: IdeaData = JSON.parse(anvilContent);
  
  if(!anvil || Object.keys(anvil).length === 0)
    return null;
  
  return anvil;
}

export function forgeIdea(data: IdeaData): string {
    try{
        const anvilPath = getAnvilPath();
        data.path = anvilPath;
        fs.writeFileSync(anvilPath, JSON.stringify(data, null, 2), 'utf-8');
        return 'ok';
    }catch(error){
        return `${error}`;
    }
}

export function deleteForge(): string {
    try{
        const anvilPath = getAnvilPath();
        fs.writeFileSync(anvilPath, JSON.stringify({}, null, 2), 'utf-8');
        return 'ok';
    }catch(error){
        return `${error}`;
    }
}
