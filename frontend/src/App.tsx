import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AppPath } from "./common/enums";
import { MainPage, RegisterPage, LoginPage } from "./pages";
import { PublicRoute } from "./navigation";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path={AppPath.Root} element={
            <MainPage/>
        } />
        <Route path={AppPath.Register} element={
          <PublicRoute>
            <RegisterPage/>
          </PublicRoute>
        } />
        <Route path={AppPath.Login} element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App