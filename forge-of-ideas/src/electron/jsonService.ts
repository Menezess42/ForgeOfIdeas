import { getAnvilPath, getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
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
    data.path= path.join(ideasPath, ideaFileName);;
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
    
    return ideaFilePath;
}

function removeIdeaFromShelf(ideaNome: string): string {
    try {
        const shelfPath = getShelfPath();
        const shelfContent = fs.readFileSync(shelfPath, 'utf-8');
        const shelf = JSON.parse(shelfContent);
        
        let found = false;
        
        for (const nivel of ['1', '2', '3']) {
            if (shelf[nivel] && shelf[nivel][ideaNome]) {
                delete shelf[nivel][ideaNome];
                found = true;
                break;
            }
        }
        
        if (!found) {
            return "Can't delete";
        }
        
        fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), 'utf-8');
        
        return "ok";
    } catch (error) {
        return "Can't delete";
    }
}

export function forgeIdea(data: IdeaData): IdeaData {
    const a = removeIdeaFromShelf(data.nome);
    if(a=="ok"){
        const anvilPath = getAnvilPath();
        fs.writeFileSync(anvilPath, JSON.stringify(data, null, 2), 'utf-8');
    }
    return data;
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

export function loadForge(): IdeaData{
  const anvilPath = path.join(getIdeasPath(), 'anvil.json');
  const anvilContent = fs.readFileSync(anvilPath, 'utf-8');
  const anvil: IdeaData = JSON.parse(anvilContent);
  return anvil;
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


export function saveEdit(newData: IdeaData, oldData: IdeaData): string {
    const ideasPath = getIdeasPath();
    const oldPath = oldData.path;

    const nameChanged = newData.nome !== oldData.nome;
    const levelChanged = newData.nivel !== oldData.nivel;

    const oldFileName = `${oldData.nome}.json`;
    const newFileName = `${newData.nome}.json`;

    const oldFilePath = path.join(ideasPath, oldFileName);
    const newFilePath = path.join(ideasPath, newFileName);

    // ---- Atualizar shelf ----
    const shelfPath = getShelfPath();
    const shelfContent = fs.readFileSync(shelfPath, "utf-8");
    const shelf: shelfStructure = JSON.parse(shelfContent);

    // Remover entrada antiga do shelf
    const oldLevelKey = String(oldData.nivel) as "1" | "2" | "3";
    delete shelf[oldLevelKey][oldData.nome];

    // Criar nova entrada no shelf
    const newLevelKey = String(newData.nivel) as "1" | "2" | "3";
    shelf[newLevelKey][newData.nome] = {
        cor: newData.cor,
        path: newFilePath
    };

    // Se o nome mudou → excluir arquivo antigo e criar um novo
    if (nameChanged) {
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    // Escrever arquivo atualizado
    fs.writeFileSync(newFilePath, JSON.stringify(newData, null, 2), "utf-8");

    // Atualizar shelf
    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), "utf-8");

    return newFilePath;
}
