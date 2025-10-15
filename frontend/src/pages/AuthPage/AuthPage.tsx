import { useLocation, useNavigate } from "react-router-dom";

import { ApiPath, AppPath } from "@/common/enums"
import { RegisterForm } from "./Components/RegisterForm/RegisterForm"
import { LoginForm } from "./Components/LoginForm/LoginForm";
import { useUser } from '@/contexts/UserProvider';
import './AuthPage.css';
import { GoogleCredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { setLocalStorageItem } from "@/helpers";
import { localStorageState } from "@/common/constants";

const AuthPage: React.FC = () => {
  const { pathname } = useLocation();
  const { setUser } = useUser();
  const navigate = useNavigate();
  
    const handleGoogleLogin = async (credentials: GoogleCredentialResponse) => {
      if(credentials?.credential) {
        const response = await axios.post(`${ApiPath}/auth/google-login`, { credential: credentials.credential });
        if(response.status <= 400) {
          setUser(response.data.user);
          setLocalStorageItem(localStorageState.TOKEN, response.data.token);
          navigate(AppPath.Root);
        } else {
          return response.data.error.message;
        }
      }
    }

  const getScreen = (path: string): null | React.JSX.Element => {
    switch (path) {
      case AppPath.Register: {
        return <RegisterForm handleGoogleLogin={handleGoogleLogin}/>;
      }

      case AppPath.Login: {
        return <LoginForm handleGoogleLogin={handleGoogleLogin}/>;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div style={{ flex: 1 }}>
        {getScreen(pathname)}
    </div>
  )
}

export { AuthPage }