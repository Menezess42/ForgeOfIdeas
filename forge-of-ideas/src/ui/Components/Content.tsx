import '../Styles/Components.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import Modal from './Modal.jsx'
import type {IdeaData} from './Modal.tsx'
import { useState, useEffect } from 'react'

export default function Content(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ideas, setIdeas] = useState<IdeaData[]>([]);
    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas);
        };
        loadIdeas();
    }, []);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [error, setError] = useState<string | null>(null);
    const handleModalSubmit = (data: IdeaData): string | null => {
        const ideaExists = ideas.some(idea => idea.nome === data.nome);

        if (ideaExists) {
            return `Existent Idea name: "${data.nome}"!`;
        }

        const updatedIdeas = [...ideas, data];
        updatedIdeas.sort((a, b) => a.nivel - b.nivel);
        setIdeas(updatedIdeas);
        window.api.saveData(data);

        return null; // no error
    }

{error && <div className="error-toast">{error}</div>}

    return (
        <main className="Content">
        {error && <div className="error-toast">{error}</div>}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
            />
            <Shelf openModal={openModal} ideas={ideas} />
            <Anvil/>
            <Furnace />
        </main>
    );
}
