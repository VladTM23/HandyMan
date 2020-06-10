import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import NoAuthRoutes from "./routes/NoAuthRoutes";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import CustomNavbar from "./components/CustomNavbar";

import EditProfilePage from "./components/EditProfilePage";

const App = () => {
  const { token, userId, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
      }}
    >
      <Router>
        <div>
          <CustomNavbar />
        </div>
        {/* <EditProfilePage /> */}
        <main>{token ? <AuthRoutes /> : <NoAuthRoutes />}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
