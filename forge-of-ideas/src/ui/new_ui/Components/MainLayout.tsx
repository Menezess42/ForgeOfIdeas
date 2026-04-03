import { useState } from 'react';
import '../styles/tokens.css';
import '../styles/mainLayout.css';
import Shelf from './Shelf.tsx';
import Context from './ContextWindow.tsx';

export type AppMode = "idle" | "create" | "read" | "edit";

export type AppState = {
  mode: AppMode;
  payload: string | null; // future use: card path for read/edit
};

export default function MainLayout() {
  const [appState, setAppState] = useState<AppState>({ mode: "idle", payload: null });

  const handleModeChange = (mode: AppMode, payload: string | null = null) => {
    setAppState({ mode, payload });
  };

  return (
    <main className="grid-container">
      <div className="col shelf">
        <Shelf
          onModeChange={(mode) => handleModeChange(mode)}
          activeMode={appState.mode}
        />
      </div>
      <div className="col anvil">
        {/* <Anvil /> */}
      </div>
      <div className="col context">
        <Context
          appState={appState}
          onModeChange={handleModeChange}
        />
      </div>
    </main>
  );
}
