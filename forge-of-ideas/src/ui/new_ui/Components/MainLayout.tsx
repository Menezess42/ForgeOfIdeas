// import '../Styles/Content.css'
// import Shelf from './Shelf.jsx'
// import Anvil from './Anvil.jsx'
// import Furnace from './Furnace.jsx'
// import RegistrationModal from './IdeaRegistrationModal.jsx'
// import IdeaDisplayModal from './IdeaDisplayModal.jsx'
// import { useState, useEffect } from 'react'
import '../styles/tokens.css';
import '../styles/MainLayout.css';

export default function MainLayout(){

    return (
        <main className="grid-container">
            <section className="col shelf">
                <Shelf/>
            </section>
            <section className="col shelf">
                <Anvil/>
            </section>
            <section className="col shelf">
                <ContextWindow/>
            </section>
        </main>
    );
}
