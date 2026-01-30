import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import App from './App.jsx'
import createApolloClient from './apollo/client.js'
import './styles/index.css'
import { ToastProvider } from './hooks/useToast'
import Toasts from './components/Toasts.jsx'

const client = createApolloClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastProvider>
        <BrowserRouter>
          <App />
          <Toasts />
        </BrowserRouter>
      </ToastProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
