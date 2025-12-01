import { useState } from 'react';
import '../Styles/Modal.css';
import '../Styles/Content.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ideaData: IdeaData;
}



export default function IdeaDisplayModal({ isOpen, onClose, ideaData}: ModalProps) {
    console.log(ideaData);
    const [error, setError] = useState<string | null>(null); 


    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">{ideaData.nome}</h1>
        {error && <div className="error-toast">{error}</div>}
        <div className="description-container">
        <h2 className="description-text">{ideaData.descricao}</h2>
        </div>
        <div className="modal-buttons">
        <button type="button" onClick={onClose}>Close</button>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
        <button type="button">Forge</button>
        </div>
        </div>
        </div>
    );
}
