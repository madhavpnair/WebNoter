import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './components/Popup.tsx'
// import Sidebar from './components/Sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
)


