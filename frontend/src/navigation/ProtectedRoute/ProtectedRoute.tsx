import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserProvider";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ApiPath, AppPath } from "../../common/enums";
import { removeLocalStorageItem } from "../../helpers";
import { localStorageState } from "../../common/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const { setUser } = useUser();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await axios.get(`${ApiPath}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth error:", error);
        removeLocalStorageItem(localStorageState.TOKEN);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyToken();
}, [token, setUser]);
    
    if (checkingAuth) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to={AppPath.Login} state={{ from: location }} replace />;
    }

    return <>{children}</>
}

export { ProtectedRoute };  