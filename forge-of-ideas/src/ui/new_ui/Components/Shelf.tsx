import '../styles/tokens.css';
import '../styles/shelf.css';
import Hex from './Hex.tsx';

type ShelfProps = {
    onModeChange: (mode: "idle" | "create") => void;
    activeMode: "idle" | "create" | "read" | "edit";
    ideasList: IdeaData[];
};

export default function Shelf({ onModeChange, activeMode, ideasList}: ShelfProps) {
    let ctr_lvl1 = "0";
    let ctr_lvl2 = "0";
    let ctr_lvl3 = "0";

    const isCreateActive = activeMode === "create";

    const handlePlusClick = () => {
        onModeChange(isCreateActive ? "idle" : "create");
    };

    // Need a function to the search bar

    /* I have to decide, is better to create 3 list with ideas of lvl 1, 2 an 3
        or use just the main list and an aux list for when the user clicks on the 
        lvls counters and just the corresponding ideas shows on the list.

        I think is better just the ideasList and the aux list. Because the counter
        I can increase when it saving a new idea*/

    return (
        <main className="shelf-grid-container">
            <div className="row v-indicators">
                <div className="hex-grid">
                    <Hex size={80} color="#ff5a1f" label={ctr_lvl1} className="hex-orange"/>
                    <Hex size={80} color="#00c2b2" label={ctr_lvl2} className="hex-cyan"/>
                    <Hex size={80} color="#3a4f66" label={ctr_lvl3} className="hex-dark"/>
                </div>
            </div>
            <div className="row cards">
                {/*the ideas goes here:
                    - [ ] Maybe I need a search bar on top of this div
                    - [ ] I need to make a component Card
                    - [ ] then I have to pass idea from ideas
                    - [ ] I don't want a scroll bar, so I need to display
                          half way cards so the user can see that the list goes
                          one. Like netflix does.
                */}
            </div>
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
