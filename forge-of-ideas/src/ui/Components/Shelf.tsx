import { useState } from "react";
import "../Styles/Components.css";
import type { IdeaData } from './Modal';

// vector == array
interface ShelfProps {
  // Interfaces give shapes to objects. Acts like a contract that defines
  // types and methods
  openModal: () => void; // OpenModal is an object (a variable that has as a value a function)
  ideas: IdeaData[]; // ideas is a vector of the type IdeaData
}

export default function Shelf({ openModal, ideas }: ShelfProps) {
  // Receives two variables from the object shelfProps
  const [offset, setOffset] = useState(0);

  // Defines border colors by level
  const getBorderColor = (nivel: 1 | 2 | 3): string => {
    // receives a variable that can be 1 or 2 or 3
    // returns a string
    const colors = {
      1: '#00d2c3',
      2: '#f7941e',
      3: '#f5e1b9'
    }; // creates an object with 3 distinct colors for each level
    return colors[nivel]; // returns the appropriate color for the appropriate level
  };
  
  const handleUp = () => {
      // moves window up (shows ideas from higher index)
      if (offset + 32 < ideas.length){
          setOffset(offset+8);
      }
  };

  const handleDown = () => {
      // moves window down (shows ideas from lower index)
      if (offset > 0){
          setOffset(offset - 8); // shifts back by one shelf
      }
  }

  // Distributes ideas into 4 shelves (8 spaces each = 32 total)
    const shelves = [
      ideas.slice(offset, offset + 8),       // Shelf 1
      ideas.slice(offset + 8, offset + 16),  // Shelf 2
      ideas.slice(offset + 16, offset + 24), // Shelf 3
      ideas.slice(offset + 24, offset + 32)  // Shelf 4
    ];// Creates a vector of vectors, each inside vector is a slice of the ideas vector

  
  return (
    <div className="Shelf">
      <div className="ButtonDiv item-1">
        <div className="ButtonArea BA-left">
          <button 
            onClick={openModal} // When clicked, calls the modal
            className="Button B-plus"
          >
            <h1>+</h1>
          </button>
        </div>
      </div>
      
      <div className="IdeasShelf">
        {shelves.map((shelfIdeas, shelfIndex) => ( // shelves its an array of 4 elements (4 shelfs in a bookshelf)
          // map() iterates over each element
          // shelIdeas = array of ideas of that specific shelf (ex: ideas 0-7 in the shelf)
          // shelfIndex = shelves indexes (0, 1, 2, 3)
          <div key={shelfIndex}> {/* warapper dinamic class */}
          {/* key = {shelfIndex}= reacts needs a unic ID for each element in a loop (for optimizatioon) */}
            <div className={`shelf-${shelfIndex + 1}`}>
            {/* className={`shelf-${shelfIndex+1}`} -> Literal template that creates the classes 
                shelfIndex = 0 -> shelf-1
                shelfIndex = 1 -> shelf-2
                shelfIndex = 2 -> shelf-3
                shelfIndex = 3 -> shelf-4*/}
              {shelfIdeas.map((idea, ideaIndex) => (
                  // internal loop, renders the books(Ideas)
                  // shelfIdeas.map() - iterates over each Idea from that shelf
                  // idea - Object with the Idea data (name, color, level)
                <div
                  key={ideaIndex} // Idea ID
                  className="idea-square" // className
                  style={{
                    backgroundColor: idea.cor,
                    borderColor: getBorderColor(idea.nivel)
                  }} // dynamic CSS inline:
                      // backgroundColor: idea.cor - uses the color defined by the user
                  title={idea.nome} // Tooltip (hover shows name)
                >
                </div>
              ))}
            </div>
            {shelfIndex < 3 && <div className="shelf-space"></div>} {/* space between shelfs 
                What it does:
                    - `shelfIndex < 3` - Condition: only executes for the first 3 shelves (0, 1, 2).
                    - `&&` - Logical operator: if the condition is true, renders the element
                    - `<div className="shelf-space"></div>` - Visual space between shelves
                Why `<3` ?
                    Because after the 4th shelf (index 3) no space is needed
                */}

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
