import { useState } from 'react';
import '../Styles/Modal.css';
import '../Styles/Content.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onSubmit: (data: IdeaData) => void;
}

// export interface IdeaData {
//     nome: string;
//     nivel: 1 | 2 | 3;
//     cor: string;
//     descricao: string;
// }


export default function IdeaDisplayModal({ isOpen, onClose}: ModalProps) {
    const [nome, setNome] = useState('Idea Place Holder');
    const [nivel, setNivel] = useState<1 | 2 | 3>(1);
    const [cor, setCor] = useState('#eac26c');
    const [descricao, setDescricao] = useState(' This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation This is a test to see how the div area for the text hold up when I try to show a big ass test in hopes that the div will have an automatic line breaker and good format and indentation ');
    const [error, setError] = useState<string | null>(null); 


    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">{nome}</h1>
        {error && <div className="error-toast">{error}</div>}
        <div className="description-container">
        <h2 className="description-text">{descricao}</h2>
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
