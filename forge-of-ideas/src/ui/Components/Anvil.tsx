// src/components/Anvil.jsx
import '../Styles/Anvil.css'
import anvil from '../Assets/anvil.png'

interface anvilProps{
    forgeIdea: IdeaData|null;
    onIdeaClick: (ideaPath: string) => void;
    setIsForge: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Anvil({onIdeaClick, forgeIdea, setIsForge}: anvilProps) {

  const getBorderColor = (nivel: 1 | 2 | 3): string => {
    const colors = {
      1: '#00d2c3',
      2: '#f7941e',
      3: '#f5e1b9'
    };
    return colors[nivel];
  };
  
  function clickIdea(){
      setIsForge(true);
      if(forgeIdea)
          onIdeaClick(forgeIdea.path)
  }

  return (
    <div className="Anvil">
    {forgeIdea && forgeIdea.path &&
    <div 
    onClick={clickIdea}
    className="idea-square"
    style={{
        backgroundColor: forgeIdea.cor,
        borderColor: getBorderColor(forgeIdea.nivel)
    }}
    title={forgeIdea.nome}
    >
    </div>
    }
    <img className="Anvil-img" src={anvil} alt="logo" />
    </div>
  );
}
