import '../Styles/Content.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import Modal from './IdeaRegistrationModal.jsx'
import type {IdeaData} from './IdeaRegistrationModal.jsx'
import { useState, useEffect } from 'react'

export default function Content(){

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
    const [ideas, setIdeas] = useState<IdeaData[]>([]);

    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas);
        };
        loadIdeas();
    }, []);

    const openRegistrationModal = () => setIsRegistrationModalOpen(true);
    const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

    const [error, setError] = useState<string | null>(null);

    const handleRegistrationSubmit = (data: IdeaData): string | null => {
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
                isOpen={isRegistrationModalOpen}
                onClose={closeRegistrationModal}
                onSubmit={handleRegistrationSubmit}
            />
            <Shelf openModal={openRegistrationModal} ideas={ideas} />
            <Anvil/>
            <Furnace />
        </main>
    );
}
