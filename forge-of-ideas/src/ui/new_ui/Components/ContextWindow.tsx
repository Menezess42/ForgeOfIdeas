import type { AppState, AppMode } from './MainLayout.tsx';
import CreateForms from "./CreateForms.tsx";


type ContextProps = {
  appState: AppState;
  onModeChange: (mode: AppMode, payload?: string | null) => void;
};


export default function Context({ appState, onModeChange }: ContextProps) {
  const handleCancel = () => {
    onModeChange("idle", null);
  };

  switch (appState.mode) {
    case "create":
      return <CreateForms onCancel={handleCancel} />;

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
