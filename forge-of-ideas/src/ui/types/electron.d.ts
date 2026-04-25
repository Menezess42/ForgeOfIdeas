interface LevelsCount{
    "1": string;
    "2": string;
    "3": string;
}

interface ShelfData{
    ideas: IdeaData[];
    levelsCount: LevelsCount;
}

export interface ElectronAPI {
    saveData: (json: json) => void;
    loadIdeas: () => Promise<ShelfData>;
    getIdeaDetails: (ideaPath: string) => Promise<IdeaData>;
    updateIdea: (data: IdeaData, oldIdea: IdeaData) => Promise<void>;
    forgeIdea: (data: IdeaData) => Promise<string>;
    loadForgeIdea: () => Promise<IdeaData>; // Have to change this becuase now this function
    deleteIdea: (data: IdeaData) => Promise<string|null>;
    chooseIdeasFolder: () => Promise<string | null>;
    getConfig: () => Promise<{ ideasRoot?: string }>;
    deleteForge: () => Promise<string>;
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


