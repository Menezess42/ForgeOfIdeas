import type { AppState, AppMode } from './MainLayout.tsx';

type ContextProps = {
  appState: AppState;
  onModeChange: (mode: AppMode, payload?: string | null) => void;
};

// Placeholder — substitua pelo seu componente real quando estiver pronto
function CreateView({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="context-view create-view">
      <h2>Nova entrada</h2>
      <p>Formulário de criação aqui...</p>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default function Context({ appState, onModeChange }: ContextProps) {
  const handleCancel = () => {
    onModeChange("idle", null);
  };

  switch (appState.mode) {
    case "create":
      return <CreateView onCancel={handleCancel} />;

    case "read":
      // implementar depois com appState.payload
      return <div className="context-view read-view">Leitura — {appState.payload}</div>;

    case "edit":
      // implementar depois
      return <div className="context-view edit-view">Edição — {appState.payload}</div>;

    case "idle":
    default:
      return null;
  }
}
