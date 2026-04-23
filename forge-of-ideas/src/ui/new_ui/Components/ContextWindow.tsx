import type { AppState, AppMode } from './MainLayout.tsx';
import CreateForms from "./CreateForms.tsx";
import ShowIdea from "./ShowIdea.tsx";
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
    }
};


export default function Context({ appState, onModeChange, handlers }: ContextProps) {

    const handleCancel = () => {
        onModeChange("idle", null);
    };

    switch (appState.mode) {
        case "create":
            return <CreateForms onCancel={handleCancel} onSave={handlers.onCreate}/>;

        case "read":
            return <ShowIdea path={appState.payload}/>;

        case "edit":
            return <div className="context-view edit-view">Edição — {appState.payload}</div>;

        case "idle":
        default:
            return null;
    }
}
