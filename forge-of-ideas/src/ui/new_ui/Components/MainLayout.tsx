import { useState, useEffect } from 'react';
import '../styles/tokens.css';
import '../styles/mainLayout.css';
import Shelf from './Shelf.tsx';
import Context from './ContextWindow.tsx';


interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

interface LevelsCount {
    "1": string;
    "2": string;
    "3": string;
}

export type AppMode = "idle" | "create" | "read" | "edit";

export type AppState = {
    mode: AppMode;
    payload: string | null;
};

export default function MainLayout() {
    const [ideas, setIdeas] = useState<IdeaData[]>([]);
    const [lvlsCount, setLvlsCount] = useState<LevelsCount>({"1": "0","2": "0","3": "0"})
    const [appState, setAppState] = useState<AppState>({ mode: "idle", payload: null });

    const handleModeChange = (mode: AppMode, payload: string | null = null) => {
        setAppState({ mode, payload });
    };

    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas.ideas);
            setLvlsCount(loadedIdeas.levelsCount);
        };
        loadIdeas();
        // const loadForgeIdea = async () => {
        //     const loadedForgeIdea = await window.api.loadForgeIdea();
        //     if(loadedForgeIdea){
        //         setForgingIdea(loadedForgeIdea)
        //     }
        // };
        // loadForgeIdea();
    }, []);

    const handleRegistration = async(data: IdeaData): Promise<string | null> => {
        const exists = ideas.some(i => i.title === data.title);
        if (exists) {
            // Gera um alerta
            // Talvez levantar um toasted falando que já existe essa ideia
        }
        try{
            const savedPath = await window.api.saveData(data);
            const updateData: IdeaData = {...data, path: savedPath};
            const updatedIdeas = [...ideas, updateData];
            setIdeas(updatedIdeas);
            return null;
        }catch(error){
            return error;
        }
    }

    const handlers = {
        onCreate: handleRegistration,
    }

    return (
        <main className="grid-container">
            <div className="col shelf">
                <Shelf
                    onModeChange={(mode) => handleModeChange(mode)}
                    activeMode={appState.mode}
                    ideasList={ideas}
                    lvlsCount={lvlsCount}
                />
            </div>
            <div className="col anvil">
                {/* <Anvil /> */}
            </div>
            <div className="col context">
                <Context
                    appState={appState}
                    onModeChange={handleModeChange}
                    handlers={handlers}
                />
            </div>
        </main>
    );
}
