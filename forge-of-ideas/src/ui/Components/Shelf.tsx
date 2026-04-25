import '../styles/tokens.css';
import '../styles/shelf.css';
import Hex from './Hex.tsx';
import HexScroll from './HexScroll.tsx';
import IdeaCard from './IdeaCard.tsx';
import { useState, useRef, useEffect } from 'react';
import { AppMode } from './MainLayout';

interface levelsCount {
    "1": string;
    "2": string;
    "3": string;
}

type ShelfProps = {
    onModeChange: (mode: AppMode, payload?: string | null ) => void;
    activeMode: "idle" | "create" | "read" | "edit";
    ideasList: IdeaData[];
    lvlsCount: levelsCount;
};

export default function Shelf({ onModeChange, activeMode, ideasList, lvlsCount}: ShelfProps) {
    let ctr_lvl1 = lvlsCount?.["1"] ?? "0";
    let ctr_lvl2 = lvlsCount?.["2"] ?? "0";
    let ctr_lvl3 = lvlsCount?.["3"] ?? "0";

    const listRef = useRef<HTMLDivElement>(null);

    const isCreateActive = activeMode === "create";

    const handlePlusClick = () => {
        onModeChange(isCreateActive ? "idle" : "create");
    };


    const [search, setSearch] = useState("");
    const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
    const [filterLevel, setFilterLevel] = useState<string | null>(null);

    const handleLevelClick = (level: string) => {
        setFilterLevel(prev => prev === level ? null : level);
    };

    const filteredIdeas = ideasList
    .filter(idea => !filterLevel || String(idea.level) === filterLevel)
    .filter(idea => idea.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (activeMode !== "read" && activeMode !== "edit") {
            setSelectedIdea(null);
        }
    }, [activeMode]);

    return (
        <main className="shelf-grid-container">
            <div className="row v-indicators">
                <div className="hex-grid">
                    <Hex size={80} color="#ff5a1f" label={ctr_lvl1} 
                        className="hex-orange"
                        onClick={() => handleLevelClick("1")}
                        isActive={filterLevel === "1"}
                        activeStroke="#E6D5B8"
                        strokeWidth={3}
                    />
                    <Hex size={80} color="#00c2b2" label={ctr_lvl2} 
                        className="hex-cyan"
                        onClick={() => handleLevelClick("2")}
                        isActive={filterLevel === "2"}
                        activeStroke="#E6D5B8"
                        strokeWidth={3}
                    />
                    <Hex size={80} color="#3a4f66" label={ctr_lvl3}
                        className="hex-dark"
                        onClick={() => handleLevelClick("3")}
                        isActive={filterLevel === "3"}
                        activeStroke="#E6D5B8"
                        strokeWidth={3}
                    />
                </div>
            </div>

            <div className="row cards">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="cards-list" ref={listRef}>
                    {filteredIdeas.map((idea) => (
                        <IdeaCard
                            key={idea.path}
                            idea={idea}
                            onClick={() => {
                                const isAlreadySelected = selectedIdea === idea.path;

                                setSelectedIdea(isAlreadySelected ? null : idea.path ?? null);

                                onModeChange(
                                    isAlreadySelected ? "idle" : "read",
                                    isAlreadySelected ? null : idea.path ?? null
                                );
                            }}
                            isActive={selectedIdea === idea.path}
                        />
                    ))}
                </div>
            </div>
            <div className="row buttons">
                <div className="hex-grid hex-buttons">
                    <HexScroll size={70} color="#22303c" label="▲" className="hex-bUp"
                        stroke="#8A9BB0" hoverColor="#1A1A1A" activeColor="#0D1B2A"
                        direction="up" targetRef={listRef}
                    />
                    <HexScroll size={70} color="#22303c" label="▼" className="hex-bDown"
                        stroke="#8A9BB0" hoverColor="#1A1A1A" activeColor="#0D1B2A"
                        direction="down" targetRef={listRef}
                    />
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
                    />
                </div>
            </div>
        </main>
    );
}
