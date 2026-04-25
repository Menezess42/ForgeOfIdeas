import { useEffect, useState } from 'react';
import Hex from './Hex.tsx';
import '../styles/anvil.css';

interface AnvilProps {
    anvilData: IdeaData;
    onDelete: () => void;
}

interface IdeaData {
    title: string;
    description: string;
    level: number;
    path?: string;
}

export default function Anvil({anvilData, onDelete}: AnvilProps) {

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
        onDelete()
    }

    return (
        <main className="idea-view">
            <div className="idea-view__row v-indicators">
                <div className="idea-view__hex-grid">
                    <Hex size={80} color={getHexColor(anvilData?.level)} strokeWidth={3} />
                </div>
            </div>
            <div className="idea-view__row idea-view__content">
                <h1 className="idea-view__title">{anvilData?.title}</h1>
                <div className="idea-view__desc-wrapper">
                    <p className="idea-view__desc">{anvilData?.description}</p>
                </div>
            </div>
            <div className="idea-view__row buttons">
                <div className="idea-actions">
                    <button className="btn-forge" onClick={deleteIdea}>FORGED</button>
                    <button className="btn-delete" onClick={deleteIdea}>DELETE</button>
                </div>
            </div>
        </main>
    );
}
