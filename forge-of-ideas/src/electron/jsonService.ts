import { getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';

interface IdeaData {
    nome: string;
    nivel: 1 | 2 | 3;
    cor: string;
    descricao: string;
    path?: string;
}

interface shelfStructure{
    "1": Record<string, { cor: string, path: string}>;
    "2": Record<string, { cor: string, path: string}>;
    "3": Record<string, { cor: string, path: string}>;
}

interface ShelfIdea {
  cor: string;
  path: string;
}

interface ShelfStructure {
  "1": Record<string, ShelfIdea>;
  "2": Record<string, ShelfIdea>;
  "3": Record<string, ShelfIdea>;
}
export function saveJsonToIdeas(json: IdeaData): string {
    const data = json;
    const ideasPath = getIdeasPath();
    const ideaFileName = `${data.nome}.json`;
    const ideaFilePath = path.join(ideasPath, ideaFileName);
    fs.writeFileSync(ideaFilePath, JSON.stringify(json, null, 2), 'utf-8');
    const shelfPath = getShelfPath()
    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');
    const shelf: shelfStructure = JSON.parse(shelfContent);
    const nivelKey = String(data.nivel) as "1" | "2" | "3";
    shelf[nivelKey][data.nome]={
        cor: data.cor,
        path: ideaFilePath
    };
    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), 'utf-8');
    
    return ideaFilePath; // RETORNA O CAMINHO
}

export function loadShelfData(): IdeaData[] {
  const shelfPath = path.join(getIdeasPath(), 'shelf.json');
  const shelfContent = fs.readFileSync(shelfPath, 'utf-8');
  const shelf: ShelfStructure = JSON.parse(shelfContent);
  
  const allIdeas: IdeaData[] = [];
  
  for (const nivel of ['1', '2', '3'] as const) {
    const ideasDoNivel = shelf[nivel];
    
    for (const [nome, dados] of Object.entries(ideasDoNivel)) {
      allIdeas.push({
        nome: nome,
        nivel: Number(nivel) as 1 | 2 | 3,
        cor: dados.cor,
        descricao: '',
        path: dados.path
      });
    }
  }
  
  return allIdeas;
}

export async function readIdeaFile(ideaPath: string): Promise<IdeaData>{
    console.log('Entrou em readIdeaFile')
    try{
        const fullPath = path.resolve(ideaPath);
        // const fileContent = await fs.readFile(fullPath, 'utf-8');
        const fileContent = await fs.readFileSync(fullPath, 'utf-8');
        const ideaData: IdeaData = JSON.parse(fileContent);
        return ideaData;
    } catch (error){
        console.error(`Error reading idea file at ${ideaPath}: `, error);
        throw new Error(`Failed to read idea file: ${error.message}`);
    }
}
