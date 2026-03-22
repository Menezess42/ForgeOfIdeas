import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './Styles/index.css'
import './new_ui/styles/main.css'
import Root from './Root'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
