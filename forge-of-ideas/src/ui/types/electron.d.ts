import type { IdeaData } from '../Modal';

export interface ElectronAPI {
    saveData: (json: json) => void;
    loadIdeas: () => Promise<IdeaData[]>;
    getIdeaDetails: (ideaPath: string) => Promise<IdeaData>;
    saveEdit: (data: IdeaData) => Promise<void>;
    forgeIdea: (data: IdeaData) => Promise<IdeaData>;
    loadForgeIdea: () => Promise<IdeaData>;
    deleteIdea: (data: IdeaData) => Promise<string|null>;
    chooseIdeasFolder: () => Promise<string | null>;
    getConfig: () => Promise<{ ideasRoot?: string }>;
}

declare global {
    interface Window {
        api: ElectronAPI;
    }
    interface IdeaData {
        title: string;
        description: string;
        level: 1 | 2 | 3;
        path?: string;
    }
}


