import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  //permite reforzar código limpio y que siga buenas prácticas de React
  //dándonos advertencias en consola cuando no logramos hcaerlo.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
