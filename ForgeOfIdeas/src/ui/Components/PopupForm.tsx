import { useState, useEffect } from "react";
import "../Styles/Popup.css";

export default function PopupForm({
  mode,
  idea,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  onEdit,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    color: "#000000",
    priority: "Médio",
  });

  useEffect(() => {
    if (idea) setForm(idea);
  }, [idea]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "create") {
      onCreate(form);
    } else if (mode === "edit") {
      onUpdate(form);
    }
  };

  const isReadOnly = mode === "view";

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          {mode === "create"
            ? "Nova Ideia"
            : mode === "view"
            ? "Detalhes da Ideia"
            : "Editar Ideia"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />
          </label>

          <label>
            Descrição:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isReadOnly}
            />
          </label>

          <label>
            Cor:
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              disabled={isReadOnly}
            />
          </label>

          <label>
            Prioridade:
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={isReadOnly}
            >
              <option>Alto</option>
              <option>Médio</option>
              <option>Baixo</option>
            </select>
          </label>

          <div className="popup-buttons">
            {mode === "create" && (
              <>
                <button type="submit">Criar</button>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
              </>
            )}

            {mode === "view" && (
              <>
                <button type="button" onClick={onEdit}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(idea.id)}>
                  Excluir
                </button>
                <button type="button" onClick={() => alert("Forjar!")}>
                  Forjar
                </button>
              </>
            )}

            {mode === "edit" && (
              <>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
