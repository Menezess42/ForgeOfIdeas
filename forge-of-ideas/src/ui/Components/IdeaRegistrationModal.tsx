import { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import '../Styles/Content.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IdeaData) => Promise <string | null>;
  isEdit: boolean;
  selectedIdea: IdeaData|null;
}

export default function RegistrationModal({ isOpen, onClose, onSubmit, isEdit, selectedIdea }: ModalProps) {

  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState<1 | 2 | 3>(1);
  const [cor, setCor] = useState('#eac26c');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null); 
  const [path, setPath] = useState('');

  useEffect(() => {
      if (isEdit && selectedIdea) {
          setNome(selectedIdea.nome);
          setNivel(selectedIdea.nivel);
          setCor(selectedIdea.cor);
          setDescricao(selectedIdea.descricao);
          setPath(selectedIdea.path);
      } else {
          setNome('');
          setNivel(1);
          setCor('#eac26c');
          setDescricao('');
          setPath('');
      }
  }, [isEdit, selectedIdea]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const data: IdeaData = { nome, nivel, cor, descricao, path};

      const validationError = await onSubmit(data);

      if (validationError) {
          setError(validationError);
          setTimeout(() => setError(null), 3000);
          return;
      }

      setNome('');
      setNivel(1);
      setCor('#eac26c');
      setDescricao('');
      setError(null);

      onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">Idea</h1>
      {error && <div className="error-toast">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
          <label>Priority:</label>
          <div className="radio-group">
          <label className="radio-option">
          <input
          type="radio"
          name="nivel"
          value={1}
          checked={nivel === 1}
          onChange={(e) => setNivel(Number(e.target.value) as 1 | 2 | 3)}
          />
          <span>1</span>
          </label>

          <label className="radio-option">
          <input
          type="radio"
          name="nivel"
          value={2}
          checked={nivel === 2}
          onChange={(e) => setNivel(Number(e.target.value) as 1 | 2 | 3)}
          />
          <span>2</span>
          </label>

          <label className="radio-option">
          <input
          type="radio"
          name="nivel"
          value={3}
          checked={nivel === 3}
          onChange={(e) => setNivel(Number(e.target.value) as 1 | 2 | 3)}
          />
          <span>3</span>
          </label>
          </div>
          </div>

          <div>
            <label>Color:</label>
            <input
              type="color"
              id="color-picker"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
