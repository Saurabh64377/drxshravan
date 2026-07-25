import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import LenisProvider from './LenisProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LenisProvider>
          <App />
        </LenisProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
