import '../Styles/Content.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import RegistrationModal from './IdeaRegistrationModal.jsx'
import IdeaDisplayModal from './IdeaDisplayModal.jsx'
import { useState, useEffect } from 'react'

export default function Content(){

    const [ideas, setIdeas] = useState<IdeaData[]>([]);
    const [selectedIdea, setSelectedIdea] = useState<IdeaData | null>(null);

    const handleIdeaClick = async(ideaPath: string) => {
        const ideaDetails = await window.api.getIdeaDetails(ideaPath);
        ideaDetails.path = ideaPath;
        setSelectedIdea(ideaDetails);
        openDisplayModal();
    }

    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas);
        };
        loadIdeas();
    }, []);
    const [error, setError] = useState<string | null>(null);

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

    const openRegistrationModal = () => setIsRegistrationModalOpen(true);
    const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

    const handleRegistrationSubmit = async (data: IdeaData): Promise<string | null> => {
        const ideaExists = ideas.some(idea => idea.nome === data.nome);

        if (ideaExists) {
            return `Existent Idea name: "${data.nome}"!`;
        }

        try {
            const savedPath = await window.api.saveData(data);

            if (!savedPath) {
                return "Erro ao salvar a ideia";
            }

            const updatedData: IdeaData = { ...data, path: savedPath };
            const updatedIdeas = [...ideas, updatedData];
            updatedIdeas.sort((a, b) => a.nivel - b.nivel);
            setIdeas(updatedIdeas);

            return null; // Sucesso - modal vai fechar
        } catch (error) {
            console.error('Error saving idea:', error);
            return "Erro ao salvar a ideia";
        }
    }

    const [isDisplaymodalOpen, setIsDisplayModalOpen] = useState(false)

    const openDisplayModal = () => setIsDisplayModalOpen(true);
    const closeDisplayModal = () => setIsDisplayModalOpen(false);


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
                ideaData={selectedIdea}
            />
            <Shelf openRegistrationModal={openRegistrationModal} ideas={ideas} onIdeaClick={handleIdeaClick}/>
            <Anvil/>
            <Furnace />
        </main>
    );
}
