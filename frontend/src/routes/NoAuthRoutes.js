import React from "react";
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import JobsListingPage from '../pages/JobsListingPage';

const NoAuthRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <div>Insert home page component here NOAuth.</div>
      </Route>
      <Route path="/signup" exact component={RegisterPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path='/jobs' exact component={JobsListingPage}/>
      <Redirect to='/signup' />
    </Switch>
  );
};

export default NoAuthRoutes;
