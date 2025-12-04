import './Styles/App.css';
import Content from './Components/Content';
import EnsureDir from './Components/EnsureDir';
import { useBasePathStore } from './stores/useBasePathStore';

function App() {
  const basePath = useBasePathStore((s) => s.basePath);

  if (!basePath) {
    return <EnsureDir />;
  }

  return <Content />;
}

export default App;
