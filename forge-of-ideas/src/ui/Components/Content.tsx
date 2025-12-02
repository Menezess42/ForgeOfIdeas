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

    const [isEdit, setIsEdit] = useState(false);

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

        if (!isEdit) {
            const exists = ideas.some(i => i.nome === data.nome);
            if (exists) {
                return `Existent Idea name: "${data.nome}"!`;
            }

            try {
                const savedPath = await window.api.saveData(data);
                if (!savedPath) return "Erro ao salvar a ideia";

                const updatedData: IdeaData = { ...data, path: savedPath };
                const updatedIdeas = [...ideas, updatedData].sort((a, b) => a.nivel - b.nivel);
                setIdeas(updatedIdeas);

                return null;
            } catch (error) {
                console.error(error);
                return "Erro ao salvar a ideia";
            }
        }

        // ---- Fluxo de edição ----
        const old = selectedIdea;
        const nameChanged = old.nome !== data.nome;

        if (nameChanged) {
            const exists = ideas.some(i => i.nome === data.nome);
            if (exists) {
                return `Existent Idea name: "${data.nome}"!`;
            }
        }

        try {
            const updatedPath = await window.api.saveEdit(data, old);

            const updatedIdeas = ideas.map(i =>
                                           i.path === old.path
                                               ? { ...data, path: updatedPath }
                                               : i
                                          ).sort((a, b) => a.nivel - b.nivel);

                                          setIdeas(updatedIdeas);
                                          setIsEdit(false);

                                          return null;
        } catch (error) {
            console.error(error);
            return "Erro ao editar a ideia";
        }
    };

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
                isEdit={isEdit}
                selectedIdea={selectedIdea}
            />
            <IdeaDisplayModal
                isOpen={isDisplaymodalOpen}
                onClose={closeDisplayModal}
                ideaData={selectedIdea}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                openRegistrationModal={openRegistrationModal}
            />
            <Shelf openRegistrationModal={openRegistrationModal} ideas={ideas} onIdeaClick={handleIdeaClick}/>
            <Anvil/>
            <Furnace />
        </main>
    );
}
