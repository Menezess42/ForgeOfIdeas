import type { IdeaData } from '../Modal';

export interface ElectronAPI {
    saveClick: () => void;
    saveData: (json: unknown) => void;
    loadIdeas: () => Promise<IdeaData[]>;
}

declare global {
    interface Window {
        api: ElectronAPI;
    }
}
