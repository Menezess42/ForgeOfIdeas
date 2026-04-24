import type { AppState, AppMode } from './MainLayout.tsx';
import CreateForms from "./CreateForms.tsx";
import ShowIdea from "./ShowIdea.tsx";
import EditIdea from './EditIdea.tsx';
import {useState, useEffect} from 'react';


interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}

type ContextProps = {
    appState: AppState;
    onModeChange: (mode: AppMode, payload?: string | null) => void;
    handlers: {
        onCreate?: (data: IdeaData) => Promise<string | null>;
        onDelete?: (data: IdeaData) => Promise<string | null>;
        onEdit?: (data: IdeaData) => void;
        onUpdate?: (data: IdeaData, oldTitle: IdeaData) => Promise<string | null>;
    }
};


export default function Context({ appState, onModeChange, handlers }: ContextProps) {

    const handleCancel = () => {
        if (appState.mode === "edit") {
            const idea = appState.payload as IdeaData;
            console.log(idea)
            onModeChange("read", idea.path);
        } else {
            onModeChange("idle", null);
        }
    };

    switch (appState.mode) {
        case "create":
            return <CreateForms onCancel={handleCancel} onSave={handlers.onCreate}/>;

        case "read":
            return <ShowIdea path={appState.payload}
                onDelete={handlers.onDelete}
                onEdit={handlers.onEdit}
            />;

        case "edit":
            return <EditIdea data={appState.payload} onCancel={handleCancel} onSave={handlers.onUpdate}/>;

        case "idle":
        default:
            return null;
    }
}
