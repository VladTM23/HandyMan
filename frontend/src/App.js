import React, {useState, useEffect} from "react";
import { Route} from "react-router-dom";
  
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import PrivateRoute from './routes/PrivateRoute';
import CustomNavbar from './components/CustomNavbar';
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import JobsListingPage from './pages/JobsListingPage';
import EditProfilePage from './components/EditProfilePage'

import "./index.css";

const App = (props) => {
  const {history} = props;
  const { token, userId, goToLoginPage, login, logout } = useAuth(history);
  const auth = {
    isLoggedIn: !!token,
    token,
    userId,
    goToLoginPage,
    login,
    logout
  }
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    console.log(!!token)
    setFlag(!!token)
  }, [token])

  return (
    <AuthContext.Provider value={auth}>
      <CustomNavbar />
        {console.log(flag)}
        {console.log(!!token)}
        <div>
          <Route path='/' exact>
          <div>Insert home page component here.</div>
          </Route>
          <Route path='/signup' exact component={RegisterPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/jobs' exact component={JobsListingPage}/>
          <PrivateRoute path='/profile' component={EditProfilePage}/>
        </div>
        
        {/* <PrivateRoute path='/jobs/new' exact>
          <div>Insert job creation page component here.</div>
        </PrivateRoute>
        <PrivateRoute path='/jobs/:jobId' exact>
          <div>Insert job page component here.</div>
        </PrivateRoute>
        <PrivateRoute path='/:userId/jobs' exact>
          <div>Insert user-created jobs component here.</div>
        </PrivateRoute> */}
    </AuthContext.Provider>
  );
};

export default App;
