import './new_ui/styles/app.css';
import MainLayout from './Components/MainLayout';
import EnsureDir from './Components/EnsureDir';
import { useBasePathStore } from './stores/useBasePathStore';

function App() {
  const basePath = useBasePathStore((s) => s.basePath);

  if (!basePath) {
    return <EnsureDir />;
  }

  // return <Content />;
  return <MainLayout />;
}

export default App;
