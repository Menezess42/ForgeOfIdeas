import { useState, useEffect } from 'react';
import '../styles/tokens.css';
import '../styles/mainLayout.css';
import '../styles/toast.css';
import Shelf from './Shelf.tsx';
import Context from './ContextWindow.tsx';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


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
    const [creatError, setCreatError] = useState<string | null>(null);

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
            toast.error("There's already an idea with that title.", {
                className: 'minha-toast',
            });
            return "duplicate";
        }
        else{
            try{
                const savedPath = await window.api.saveData(data);
                const updateData: IdeaData = {...data, path: savedPath};
                const updatedIdeas = [...ideas, updateData];
                if (data.level == 1) {
                    setLvlsCount(prev => ({
                        ...prev,
                        "1": String(Number(prev["1"]) + 1)
                    }));
                } else if (data.level == 2) {
                    setLvlsCount(prev => ({
                        ...prev,
                        "2": String(Number(prev["2"]) + 1)
                    }));
                } else {
                    setLvlsCount(prev => ({
                        ...prev,
                        "3": String(Number(prev["3"]) + 1)
                    }));
                }
                setIdeas(updatedIdeas);
                return null;
            }catch(error){
                return error;
            }
        }
    }

    const handlers = {
        onCreate: handleRegistration,
    }

    return (
        <main className="grid-container">
            <Toaster position="top-center" />
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
