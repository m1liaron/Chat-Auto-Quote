import { useLocation } from "react-router-dom";

import { AppPath } from "@/common/enums"
import { RegisterForm } from "./Components/RegisterForm/RegisterForm"
import { LoginForm } from "./Components/LoginForm/LoginForm";
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const { pathname } = useLocation();

  const getScreen = (path: string): null | React.JSX.Element => {
    switch (path) {
      case AppPath.Register: {
        return <RegisterForm/>;
      }

      case AppPath.Login: {
        return <LoginForm/>;
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