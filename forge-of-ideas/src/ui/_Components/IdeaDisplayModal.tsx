import '../Styles/Modal.css';
import '../Styles/Content.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ideaData: IdeaData|null;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    openRegistrationModal: () => void; 
    forgeIdea: () => Promise<string | null>; 
    deleteIdea: () => Promise<string | null>; 
    isForge: boolean;
}

export default function IdeaDisplayModal({ isOpen, onClose, ideaData, setIsEdit, openRegistrationModal, forgeIdea, isForge, deleteIdea}: ModalProps) {

    if (!isOpen) return null;

    function handleEdit(){
        setIsEdit(true);
        onClose();
        openRegistrationModal();
    }


    function button4DeleteIdea(){
        deleteIdea();
    }

    async function buttonForgeIdea(){
        await forgeIdea();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">{ideaData && ideaData.nome}</h1>
        <div className="description-container">
        <h2 className="description-text">{ideaData && ideaData.descricao}</h2>
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
        <button type="button" onClick={button4DeleteIdea}>forged</button>
        <button type="button"onClick={button4DeleteIdea}>Delete</button>
        </>
        )}
        </div>
        </div>
        </div>
    );
}
