// import '../Styles/Content.css'
// import Anvil from './Anvil.jsx'
// import Furnace from './Furnace.jsx'
// import RegistrationModal from './IdeaRegistrationModal.jsx'
// import IdeaDisplayModal from './IdeaDisplayModal.jsx'
// import { useState, useEffect } from 'react'

import '../styles/tokens.css';
import '../styles/mainLayout.css';
import Shelf from './Shelf.jsx'

export default function MainLayout(){

    return (
        <main className="grid-container">
            <div className="col shelf">
                <Shelf/>
            </div>
            <div className="col anvil">
            </div>
            <div className="col context">
            </div>
        </main>
    );
}
