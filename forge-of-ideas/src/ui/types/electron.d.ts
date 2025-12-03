import type { IdeaData } from '../Modal';

export interface ElectronAPI {
    saveData: (json: json) => void;
    loadIdeas: () => Promise<IdeaData[]>;
    getIdeaDetails: (ideaPath: string) => Promise<IdeaData>;
    saveEdit: (data: IdeaData) => Promise<void>;
    forgeIdea: (data: IdeaData) => Promise<IdeaData>;
    loadForgeIdea: () => Promise<IdeaData>;
    deleteIdea: (data: IdeaData) => Promise<string|null>;
}

declare global {
    interface Window {
        api: ElectronAPI;
    }
    interface IdeaData {
        nome: string;
        nivel: 1 | 2 | 3;
        cor: string;
        descricao: string;
        path: string;
    }
}


