import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './contexts/UserProvider'
import { ChatsProvider } from './contexts/ChatsProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_API_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ChatsProvider>
         <GoogleOAuthProvider clientId={CLIENT_ID} >
          <App />
         </GoogleOAuthProvider>
      </ChatsProvider>
    </UserProvider>
  </StrictMode>,
)
