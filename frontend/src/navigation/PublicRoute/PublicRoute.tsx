import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppPath } from "../../common/enums";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token) {
    return <Navigate to={AppPath.Root} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export { PublicRoute };