import { useEffect, useState } from 'react';
import { useBasePathStore } from './stores/useBasePathStore';
import App from './App';

export default function Root() {
  const [booting, setBooting] = useState(true);
  const { setBasePath } = useBasePathStore();

  useEffect(() => {
    window.api.getConfig().then(cfg => {
      //@ts-ignore
      setBasePath(cfg?.ideasRoot ?? null);
      setBooting(false);
    });
  }, []);

  if (booting) return null; // nada aparecendo, sem flicker

  return <App />;
}
