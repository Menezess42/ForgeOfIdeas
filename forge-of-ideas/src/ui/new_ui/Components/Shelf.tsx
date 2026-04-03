import '../styles/tokens.css';
import '../styles/shelf.css';
import Hex from './Hex.tsx';
 
type ShelfProps = {
  onModeChange: (mode: "idle" | "create") => void;
  activeMode: "idle" | "create" | "read" | "edit";
};
 
export default function Shelf({ onModeChange, activeMode }: ShelfProps) {
  const ctr_lvl1 = "0";
  const ctr_lvl2 = "0";
  const ctr_lvl3 = "0";
 
  const isCreateActive = activeMode === "create";
 
  const handlePlusClick = () => {
    onModeChange(isCreateActive ? "idle" : "create");
  };
 
    return (
        <main className="shelf-grid-container">
            <div className="row v-indicators">
                <div className="hex-grid">
                    <Hex size={80} color="#ff5a1f" label={ctr_lvl1} className="hex-orange"/>
                    <Hex size={80} color="#00c2b2" label={ctr_lvl2} className="hex-cyan"/>
                    <Hex size={80} color="#3a4f66" label={ctr_lvl3} className="hex-dark"/>
                </div>
            </div>
            <div className="row cards"></div>
            <div className="row buttons">
                <div className="hex-grid hex-buttons">
                    <Hex size={70} color="#22303c" label="▲" className="hex-bUp" stroke="#8A9BB0"/>
                    <Hex size={70} color="#22303c" label="▼" className="hex-bDown" stroke="#8A9BB0"/>
                    <Hex
                        size={70}
                        color="#22303c"
                        label="+"
                        className="hex-bPlus"
                        stroke="#8A9BB0"
                        onClick={handlePlusClick}
                        isActive={isCreateActive}
                        activeColor="#0D1B2A"
                        hoverColor="#1A1A1A"
                    />                </div>
            </div>
        </main>
    );
}
