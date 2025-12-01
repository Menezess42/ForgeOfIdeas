import { useState } from "react";
import "../Styles/Shelf.css";

interface ShelfProps {
  openRegistrationModal: () => void; 
  ideas: IdeaData[];
  openDisplayModal: () => void; 
  onIdeaClick: (ideaPath: string) => void;
}

export default function Shelf({ openRegistrationModal, ideas, onIdeaClick}: ShelfProps) {
  const [offset, setOffset] = useState(0);

  const getBorderColor = (nivel: 1 | 2 | 3): string => {
    const colors = {
      1: '#00d2c3',
      2: '#f7941e',
      3: '#f5e1b9'
    };
    return colors[nivel];
  };

  const handleUp = () => {
      if (offset + 32 < ideas.length){
          setOffset(offset+8);
      }
  };

  const handleDown = () => {
      if (offset > 0){
          setOffset(offset - 8);
      }
  }

    const shelves = [
      ideas.slice(offset, offset + 8),
      ideas.slice(offset + 8, offset + 16),
      ideas.slice(offset + 16, offset + 24),
      ideas.slice(offset + 24, offset + 32)
    ];

  
  return (
    <div className="Shelf">
      <div className="ButtonDiv item-1">
        <div className="ButtonArea BA-left">
          <button 
            onClick={openRegistrationModal}
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
              onClick={() => onIdeaClick(idea.path)}
              key={ideaIndex}
              className="idea-square"
              style={{
                  backgroundColor: idea.cor,
                  borderColor: getBorderColor(idea.nivel)
              }}
              title={idea.nome}
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
        <button className="Button B-up" onClick={handleUp}><b>Ʌ</b></button>
        <button className="Button B-down" onClick={handleDown}><b>V</b></button>
        </div>
      </div>
    </div>
  );
}
