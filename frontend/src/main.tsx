/**
 * Ponto de Entrada da Aplicação
 * Configura e renderiza o componente raiz com todos os providers necessários
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './provider/Route.tsx'
import { Provider } from 'react-redux'
import { store } from './provider/Store.tsx'

// Importações do PrimeReact para UI
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// Importação do sistema de notificações
import { Toaster } from 'sonner'

// Renderiza a aplicação no elemento root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provider do PrimeReact para componentes de UI */}
    <PrimeReactProvider>
      {/* Provider do Redux para gerenciamento de estado */}
      <Provider store={store}>
        {/* Sistema de notificações toast */}
        <Toaster position='top-right' closeButton />
        
        {/* Provider de roteamento da aplicação */}
        <RouterProvider router={Routes} />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
