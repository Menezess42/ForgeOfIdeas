import { useState } from 'react';
import '../Styles/Components.css'; // seu CSS

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IdeaData) => void;
}

export interface IdeaData {
  nome: string;
  nivel: 1 | 2 | 3;
  cor: string;
  descricao: string;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState<1 | 2 | 3>(1);
  const [cor, setCor] = useState('#000000');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: IdeaData = { nome, nivel, cor, descricao };
    onSubmit(data);
    
    // Limpa o formulário
    setNome('');
    setNivel(1);
    setCor('#000000');
    setDescricao('');
    
    onClose();
  };

  if (!isOpen) return null; // Não renderiza se estiver fechado

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="h1Modal">Ideia</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Nível:</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(Number(e.target.value) as 1 | 2 | 3)}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div>
            <label>Cor:</label>
            <input
              type="color"
              id="color-picker"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>

          <div>
            <label>Descrição:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
