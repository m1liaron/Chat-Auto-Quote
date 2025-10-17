import type React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppPath } from "../../common/enums";
import { getLocalStorageItem } from "@/helpers";
import { localStorageState } from "@/common/constants";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = getLocalStorageItem(localStorageState.TOKEN)
  const location = useLocation();

  if (token) {
    return <Navigate to={AppPath.Root} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export { PublicRoute };