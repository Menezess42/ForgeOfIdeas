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
    
    // Carrega as ideias quando o componente monta
    useEffect(() => {
        const loadIdeas = async () => {
            const loadedIdeas = await window.api.loadIdeas();
            setIdeas(loadedIdeas);
        };
        loadIdeas();
    }, []); // Array vazio = executa só uma vez ao montar
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleModalSubmit = (data: IdeaData) => {
        console.log('Nova ideia recebida: ', data);

        // Adiciona a nova ideia
        const updatedIdeas = [...ideas, data];

        // Reordena por nível (1, 2, 3)
        updatedIdeas.sort((a, b) => a.nivel - b.nivel);

        // Atualiza o estado com array ordenado
        setIdeas(updatedIdeas);

        // Salva nos arquivos
        window.api.saveData(data);
    } 

    return (
        <main className="Content">
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
// import { useState } from 'react'
//
//
// export default function Content(){
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [ideas, setIdeas] = useState<IdeaData[]>([]); // Armazena todas as ideias
//
//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);
//
//     const handleModalSubmit = (data: IdeaData) => {
//         console.log('Nova ideia recebida: ', data);
//
//         // "salva" no react
//         setIdeas([...ideas, data]);
//
//         // Salva nos arquivos
//         window.api.saveData(data);
//     }
// return (
//     <main className="Content">
//     < Modal
//     isOpen={isModalOpen}
//     onClose={closeModal}
//     onSubmit={handleModalSubmit}
//     />
//     <Shelf openModal={openModal} ideas={ideas} />
//     <Anvil/>
//     <Furnace />
//     </main>
// );
// }
