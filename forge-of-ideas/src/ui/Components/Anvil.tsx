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
        <main className="anvil-view">
            <div className="anvil-view__row v-indicators">
                <div className="anvil-view__hex-grid">
                    <Hex size={80} color={getHexColor(anvilData?.level)} strokeWidth={3} />
                </div>
            </div>
            <div className="anvil-view__row anvil-view__content">
                <h1 className="anvil-view__title">{anvilData?.title}</h1>
                <div className="anvil-view__desc-wrapper">
                    <p className="anvil-view__desc">{anvilData?.description}</p>
                </div>
            </div>
            <div className="anvil-view__row buttons">
                <div className="anvil-actions">
                    <button className="anvil-btn-delete" onClick={deleteIdea}>DELETE</button>
                    <button className="anvil-btn-forge" onClick={deleteIdea}>FORGED</button>
                </div>
            </div>
        </main>
    );
}
