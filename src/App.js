import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect, Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store/store";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";

import { setCurrentUser, logOutUser } from "./store/user/user.action";

const App = ({ setCurrentUser, logOutUser }) => {
  useEffect(() => {
    if (localStorage.jwtToken) {
      //set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      setCurrentUser(decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logOutUser();
        window.location.href = "/";
      }
    }
  }, [setCurrentUser, logOutUser]);

  return (
    <Fragment>
      <div className="container">
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Register/>} />
            {/* <PrivateRoute exact path="/dashboard" component={Contact} /> */}
        </Routes>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = {
  logOutUser,
  setCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
