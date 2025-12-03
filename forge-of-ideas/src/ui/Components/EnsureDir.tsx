import { useState, useEffect } from 'react';
import { useBasePathStore } from '../stores/useBasePathStore';

function EnsureDir() {
  const setBasePath = useBasePathStore((s) => s.setBasePath);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cfg = await window.api.getConfig();
        if (cfg?.ideasRoot) {
          setBasePath(cfg.ideasRoot);
        }
      } catch (err) {
      }
    })();
  }, [setBasePath]);

  async function handleSelectFolder() {
    setLoading(true);

    try {
      const folder = await window.api.chooseIdeasFolder();
      if (!folder) {
        setLoading(false);
        return;
      }

      setBasePath(folder);
    } catch (err) {
      console.error('Erro ao escolher pasta:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Selecione a pasta onde o diretório Ideas/ ficará</h2>
      <button onClick={handleSelectFolder} disabled={loading}>
        {loading ? "Processando..." : "Escolher pasta"}
      </button>
    </div>
  );
}
export default EnsureDir;
