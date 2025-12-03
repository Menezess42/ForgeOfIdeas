import { useState } from 'react';
import '../Styles/Modal.css';
import '../Styles/Content.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ideaData: IdeaData;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    openRegistrationModal: () => void; 
    forgeIdea: () => Promise<string | null>; 
    isForge: boolean;
}

export default function IdeaDisplayModal({ isOpen, onClose, ideaData, setIsEdit, openRegistrationModal, forgeIdea, isForge}: ModalProps) {
    const [error, setError] = useState<string | null>(null); 


    if (!isOpen) return null;

    function handleEdit(){
        setIsEdit(true);
        onClose();
        openRegistrationModal();
    }


    function button4DeleteIdea(){
        onClose();
    }

    async function buttonForgeIdea(){
        await forgeIdea();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">{ideaData.nome}</h1>
        {error && <div className="error-toast">{error}</div>}
        <div className="description-container">
        <h2 className="description-text">{ideaData.descricao}</h2>
        </div>
        <div className="modal-buttons">
        {!isForge ? (
            <>
            <button type="button" onClick={onClose}>Close</button>
            <button type="button" onClick={handleEdit}>Edit</button>
            <button type="button" onClick={button4DeleteIdea}>Delete</button>
            <button type="button" onClick={buttonForgeIdea}>Forge</button>
            </>
        ) : (
        <>
        <button type="button">forged</button>
        <button type="button">Delete</button>
        </>
        )}
        </div>
        </div>
        </div>
    );
}
