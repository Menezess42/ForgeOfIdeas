import "../Styles/Components.css";
import type { IdeaData } from './Modal';

interface ShelfProps {
  openModal: () => void;
  ideas: IdeaData[];
}

export default function Shelf({ openModal, ideas }: ShelfProps) {
  // Define as cores de borda por nível
  const getBorderColor = (nivel: 1 | 2 | 3): string => {
    const colors = {
      1: '#00d2c3',
      2: '#f7941e',
      3: '#f5e1b9'
    };
    return colors[nivel];
  };

  // Distribui as ideias nas 4 prateleiras (8 espaços cada = 32 total)
  const shelves = [
    ideas.slice(0, 8),   // Prateleira 1: ideias 0-7
    ideas.slice(8, 16),  // Prateleira 2: ideias 8-15
    ideas.slice(16, 24), // Prateleira 3: ideias 16-23
    ideas.slice(24, 32)  // Prateleira 4: ideias 24-31
  ];

  return (
    <div className="Shelf">
      <div className="ButtonDiv item-1">
        <div className="ButtonArea BA-left">
          <button 
            onClick={openModal}
            className="Button B-plus"
          >
            <h1>+</h1>
          </button>
        </div>
      </div>

      <div className="IdeasShelf">
        {shelves.map((shelfIdeas, shelfIndex) => (
          <div key={shelfIndex}>
            <div className={`shelf-${shelfIndex + 1}`}>
              {shelfIdeas.map((idea, ideaIndex) => (
                <div
                  key={ideaIndex}
                  className="idea-square"
                  style={{ backgroundColor: idea.cor, borderColor: getBorderColor(idea.nivel)
                  }}
                  title={idea.nome} // ← Tooltip (hover mostra nome)
                >
                </div>
              ))}
            </div>
            {shelfIndex < 3 && <div className="shelf-space"></div>}
          </div>
        ))}
      </div>

      <div className="ButtonDiv">
        <div className="ButtonArea BA-right">
          <button className="Button B-up"><b>Ʌ</b></button>
          <button className="Button B-down"><b>V</b></button>
        </div>
      </div>
    </div>
  );
}
// import "../Styles/Components.css";
// import { useState} from 'react';
// import  type { IdeaData} from './Modal';
//
// interface ShelfProps{
//     openModal: ()=>void;
//     ideas: IdeaData[];
// }
//
//
// export default function Shelf({openModal, ideas}: ShelfProps) {
//     return (
//         <div className="Shelf">
//             <div className="ButtonDiv item-1">
//                 <div className="ButtonArea BA-left">
//                     <button 
//                     onClick = {openModal}
//                     className="Button B-plus"><h1>+</h1></button>
//                 </div>
//             </div>
//
//             <div className="IdeasShelf">
//                 <div className="shelf-1"></div>
//                 <div className="shelf-space"></div>
//                 <div className="shelf-2"></div>
//                 <div className="shelf-space"></div>
//                 <div className="shelf-3"></div>
//                 <div className="shelf-space"></div>
//                 <div className="shelf-4"></div>
//             </div>
//
//             <div className="ButtonDiv">
//                 <div className="ButtonArea BA-right">
//                     <button className="Button B-up"><b>Ʌ</b></button>
//                     <button className="Button B-down"><b>V</b></button>
//                 </div>
//             </div>
//         </div>
//     );
// }
