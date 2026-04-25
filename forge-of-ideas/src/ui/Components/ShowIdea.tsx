import { useEffect, useState } from 'react';
import Hex from './Hex.tsx';
import '../styles/showIdea.css';

interface ShowIdeaProps {
    path: string;
    onDelete: (data: IdeaData) => Promise<string | null>;
    onEdit: (data: IdeaData) => void;
    onForge?: (data: IdeaData) => void;
}

interface IdeaData {
    title: string;
    description: string;
    level: number;
    path?: string;
}

export default function ShowIdea({ path, onDelete, onEdit, onForge}: ShowIdeaProps) {
    const [data, setData] = useState<IdeaData | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await window.api.getIdeaDetails(path);
                setData(result);
            } catch (err) {
                console.error(err);
            }
        }

        if (path) loadData();
    }, [path]);

    function getHexColor(level?: number) {
        switch (level) {
            case 1:
                return '#FF6A00';
            case 2:
                return '#00D2C3';
            case 3:
                return '#415A77';
            default:
                return '#8A9BB0';
        }
    }
    function deleteIdea(){
        onDelete(data)
    }
    function editIdea(){
        onEdit(data)
    }
    function forgeIdea(){
        onForge(data)
    }
    return (
        <main className="idea-view">

            <div className="idea-view__row v-indicators">
                <div className="idea-view__hex-grid">
                    <Hex
                        size={80}
                        color={getHexColor(data?.level)}
                        strokeWidth={3}
                    />
                </div>
            </div>

            <div className="idea-view__row idea-view__content">
                <h1 className="idea-view__title">
                    {data?.title}
                </h1>

                <div className="idea-view__desc-wrapper">
                    <p className="idea-view__desc">
                        {data?.description}
                    </p>
                </div>
            </div>

            <div className="idea-view__row buttons">
                <div className="idea-actions">
                    <button className="btn-forge" onClick={forgeIdea}>FORGE</button>
                    <button className="btn-edit" onClick={editIdea}>EDIT</button>
                    <button className="btn-delete" onClick={deleteIdea}>DELETE</button>
                </div>
            </div>

        </main>
    );
}

