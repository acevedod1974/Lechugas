import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ExchangeRateProvider } from './context/ExchangeRateContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExchangeRateProvider>
      <App />
    </ExchangeRateProvider>
  </React.StrictMode>,
)
