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
    payload: string | null | IdeaData;
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

    function updateLevelsCount(level: number, delta: number) {
        const key = String(level);

        setLvlsCount(prev => ({
            ...prev,
            [key]: String(Number(prev[key]) + delta)
        }));
    }

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
                // updateLevelsCount(data.level);
                updateLevelsCount(data.level, +1);
                setIdeas(updatedIdeas);
                return null;
            }catch(error){
                return error;
            }
        }
    }

    const deleteShelfIdea = async (data: IdeaData): Promise<string|null> =>{
        let response = await window.api.deleteIdea(data);

        if(response)
            return response;
            else{
                setIdeas(ideas.filter(item => item.title !== data?.title));
                updateLevelsCount(data.level, -1);
            }
        return response;
    }

    const  handleDelIdea = async (data: IdeaData): Promise<string | null> => {
        try{
            let response;
            // if(selectedIdea?.nome == forgingIdea?.nome){
            //    response = await deleteForgeIdea();  // ✅ COM AWAIT
            // }else{
            response = await deleteShelfIdea(data);
            // }
            if(response !== null){
                toast.error("Can't delete this Idea", {
                    className: 'minha-toast',
                });
                return "Can't delete this Idea";
            }
            const mode = 'idle';
            const payload = null;
            setAppState({ mode, payload });
            return null;
        } catch(error){
            console.error("ERROR to delete:", error);
            return "Error! Can't delete";
        }
    }

    const handleEditIdea = (data: IdeaData) => {
        const mode = 'edit';
        const payload = data;
        setAppState({ mode, payload });
    }

    const handleUpdate = async (data: IdeaData, old: IdeaData): Promise<String | null> =>{
        // @ts-ignore
        const nameChanged =  old.title !== data.title;

        if (nameChanged) {
            const exists = ideas.some(i => i.title === data.title);
            if (exists) {
                toast.error(`Existent Idea title: "${data.title}"!`, {
                    className: 'minha-toast',
                });
                return `Existent Idea title: "${data.title}"!`;
            }
        }
        try {
            // @ts-ignore
            const updatedPath = await window.api.updateIdea(data, old);
            const updatedIdeas = ideas.map(i =>
                // @ts-ignore
                i.path === old.path
                    ? { ...data, path: updatedPath }
                    : i
            );
            // @ts-ignore
            setIdeas(updatedIdeas);
            if(data.level != old.level){
                updateLevelsCount(old.level, -1);
                updateLevelsCount(data.level, +1);
            }
            const mode = 'read';
            const payload = updatedPath;
            setAppState({ mode, payload });
            return null;
        } catch (error) {
            console.error(error);
            return "Erro ao editar a ideia";
        }
    }
    const handlers = {
        onCreate: handleRegistration,
        onDelete: handleDelIdea,
        onEdit: handleEditIdea,
        onUpdate: handleUpdate,
    }

    return (
        <main className="grid-container">
            <Toaster position="top-center" />
            <div className="col shelf">
                <Shelf
                    onModeChange={(mode, payload) => handleModeChange(mode, payload)}
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
