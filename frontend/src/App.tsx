import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AppPath } from "./common/enums";
import { MainPage } from "./pages";
import { PublicRoute } from "./navigation";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ProtectedRoute } from "./navigation/ProtectedRoute/ProtectedRoute";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path={AppPath.Root} element={
            <ProtectedRoute>
              <MainPage/>
            </ProtectedRoute>
        } />
        <Route path={AppPath.Register} element={
          <PublicRoute>
            <AuthPage/>
          </PublicRoute>
        } />
        <Route path={AppPath.Login} element={
          <PublicRoute>
            <AuthPage/>
          </PublicRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App