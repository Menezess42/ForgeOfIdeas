import '../Styles/Content.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import RegistrationModal from './IdeaRegistrationModal.jsx'
import IdeaDisplayModal from './IdeaDisplayModal.jsx'
import { useState, useEffect } from 'react'

export default function Content(){

    const [ideas, setIdeas] = useState<IdeaData[]>([]);
    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas);
        };
        loadIdeas();
    }, []);
    const [error, setError] = useState<string | null>(null);

    // REGISTRATION modal STUFF
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

    const openRegistrationModal = () => setIsRegistrationModalOpen(true);
    const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

    const handleRegistrationSubmit = (data: IdeaData): string | null => {
        const ideaExists = ideas.some(idea => idea.nome === data.nome);

        if (ideaExists) {
            return `Existent Idea name: "${data.nome}"!`;
        }

        const updatedIdeas = [...ideas, data];
        updatedIdeas.sort((a, b) => a.nivel - b.nivel);
        setIdeas(updatedIdeas);
        window.api.saveData(data);

        return null;
    }

    // DISPLAY modal STFF
    const [isDisplaymodalOpen, setIsDisplayModalOpen] = useState(false)

    const openDisplayModal = () => setIsDisplayModalOpen(true);
    const closeDisplayModal = () => setIsDisplayModalOpen(false);

    // delete
    // editor
    // forge

{error && <div className="error-toast">{error}</div>}

    return (
        <main className="Content">
        {error && <div className="error-toast">{error}</div>}
            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={closeRegistrationModal}
                onSubmit={handleRegistrationSubmit}
            />
            <IdeaDisplayModal
                isOpen={isDisplaymodalOpen}
                onClose={closeDisplayModal}
            />
            <Shelf openRegistrationModal={openRegistrationModal} ideas={ideas} openDisplayModal={openDisplayModal}/>
            <Anvil/>
            <Furnace />
        </main>
    );
}
