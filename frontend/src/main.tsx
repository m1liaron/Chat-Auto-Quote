import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './contexts/UserProvider'
import { ChatsProvider } from './contexts/ChatsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ChatsProvider>
         <App />
      </ChatsProvider>
    </UserProvider>
  </StrictMode>,
)
