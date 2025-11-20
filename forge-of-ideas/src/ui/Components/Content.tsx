import '../Styles/Components.css'
import Shelf from './Shelf.jsx'
import Anvil from './Anvil.jsx'
import Furnace from './Furnace.jsx'
import Modal from './Modal.jsx'
import type {IdeaData} from './Modal.tsx'
import { useState } from 'react'


export default function Content(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ideas, setIdeas] = useState<IdeaData[]>([]); // Armazena todas as ideias

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleModalSubmit = (data: IdeaData) => {
        console.log('Nova ideia recebida: ', data);

        // "salva" no react
        setIdeas([...ideas, data]);

        // Salva nos arquivos
        window.api.saveData(data);
    }
return (
    <main className="Content">
    < Modal
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
