import { useState, useEffect } from "react";
import "../Styles/Components.css";
import PopupForm from "./PopupForm";

export default function Shelf() {
    const [ideas, setIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [mode, setMode] = useState(null); // "create", "view", "edit"

    // Carregar do localStorage
    useEffect(() => {
        const saved = localStorage.getItem("ideas");
        if (saved) {
            setIdeas(JSON.parse(saved));
        }
    }, []);

    // Salvar no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("ideas", JSON.stringify(ideas));
    }, [ideas]);

    const handleCreate = (idea) => {
        setIdeas([...ideas, { id: Date.now(), ...idea }]);
        setMode(null);
    };

    const handleUpdate = (updatedIdea) => {
        setIdeas(
            ideas.map((i) => (i.id === updatedIdea.id ? updatedIdea : i))
        );
        setMode(null);
    };

    const handleDelete = (id) => {
        setIdeas(ideas.filter((i) => i.id !== id));
        setMode(null);
    };

    // Exportar JSON
    const handleExport = () => {
        const blob = new Blob([JSON.stringify(ideas, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ideas.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Importar JSON
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data)) {
                    setIdeas(data);
                } else {
                    alert("O arquivo deve conter uma lista de ideias.");
                }
            } catch (err) {
                alert("Erro ao ler o arquivo JSON.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="Shelf">
        <div className="ButtonDiv item-1">
        <div className="ButtonArea BA-left">

        <button
        className="Button B-up"
        onClick={() => document.getElementById("importFile").click()}
        >
        <b>I</b>
        </button>
        <input
        id="importFile"
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleImport}
        />
        <button
        className="Button B-plus"
        onClick={() => {
            setSelectedIdea(null);
            setMode("create");
        }}
        >
        <h1>+</h1>
        </button>

        <button className="Button B-down" onClick={handleExport}>
        <b>E</b>
        </button>
        </div>
        </div>

        <div className="IdeasShelf">
        {ideas.map((idea) => (
            <div
            key={idea.id}
            className="IdeaCard"
            style={{ borderLeft: `6px solid ${idea.color || "#000"}` }}
            onClick={() => {
                setSelectedIdea(idea);
                setMode("view");
            }}
            >
            <h3>{idea.title}</h3>
            <p>{idea.priority}</p>
            </div>
        ))}
        </div>

        <div className="ButtonDiv">
        <div className="ButtonArea BA-right">
        <button className="Button B-up"><b>Ʌ</b></button>
        <button className="Button B-down"><b>V</b></button>
        </div>
        </div>

        {mode && (
            <PopupForm
            mode={mode}
            idea={selectedIdea}
            onClose={() => setMode(null)}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onEdit={() => setMode("edit")}
            />
        )}
        </div>
    );
}
