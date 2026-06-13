import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import { HelmetProvider } from "react-helmet-async";

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
