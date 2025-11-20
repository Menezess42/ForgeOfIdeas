import { getIdeasPath, getShelfPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';

interface IdeaData {
    nome: string;
    nivel: 1 | 2 | 3;
    cor: string;
    descricao: string;
}

interface shelfStructure{
    "1": Record<string, { cor: string, path: string}>;
    "2": Record<string, { cor: string, path: string}>;
    "3": Record<string, { cor: string, path: string}>;
}

export function saveJsonToIdeas(json: unknown){
    const data = json as IdeaData;
    const ideasPath = getIdeasPath();

    //1. Criar o arquivo individual da ideia
    const ideaFileName = `${data.nome}.json`;
    const ideaFilePath = path.join(ideasPath, ideaFileName);
    fs.writeFileSync(ideaFilePath, JSON.stringify(json, null, 2), 'utf-8');

    console.log(`Arquivo criado: ${ideaFilePath}`);

    // 2. Atualizar o shelf.json
    const shelfPath = getShelfPath()
    // Lê o shelf.json existente
    const shelfContent = fs.readFileSync(shelfPath, 'utf-8');
    const shelf: shelfStructure = JSON.parse(shelfContent);
    // adiciona a referência no nível correto
    const nivelKey = String(data.nivel) as "1" | "2" | "3";
    shelf[nivelKey][data.nome]={
        cor: data.cor,
        path: ideaFilePath
    };

    fs.writeFileSync(shelfPath, JSON.stringify(shelf, null, 2), 'utf-8');
}
