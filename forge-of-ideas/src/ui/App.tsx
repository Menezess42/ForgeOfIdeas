// import './Styles/App.css';
import './new_ui/styles/app.css';
import MainLayout from './new_ui/Components/MainLayout';
import Content from './Components/Content';
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
