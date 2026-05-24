import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ExtrasApp from './ExtrasApp.jsx'
import './index.css'
import './engine.js'
import './easter-eggs.js'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const tweaksRoot = document.getElementById('tweaks-root');
if (tweaksRoot) {
  ReactDOM.createRoot(tweaksRoot).render(
    <React.StrictMode>
      <ExtrasApp />
    </React.StrictMode>,
  )
}
