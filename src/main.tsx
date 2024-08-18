// © 2024 Ronald Fernando Chacón Guzmán. Todos los derechos reservados. Uso sujeto a la licencia propietaria.

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
