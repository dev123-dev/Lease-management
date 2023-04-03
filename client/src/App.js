import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainSuperPage from "./components/dashboard/MainSuperPage";
import Header from "./components/layout/Header";
import TenantFilters from "./components/dashboard/TenantFilters";
import Footer from "./components/layout/Footer";
import HomePage from "./components/layout/HomePage";

import RoutesFile from "./components/routing/RoutesFile";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
//import './App.css';
import "./styles/bootstrap/css/bootstrap.min.css";
import "./styles/CustomisedStyle.css";
// import "./static/images";

import Login from "./components/auth/Login";
// import Alert from "./components/layout/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
var innerW = window.innerWidth;

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />

          <div className="row back_image ">
            <div className="col-lg-1 col-md-1 col-sm-12 no_padding ">
              <TenantFilters />
            </div>
            <div className="col-lg-11 col-md-11 col-sm-12 no_padding">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route component={RoutesFile} />
              </Switch>
            </div>
            <footer className="footer">
              <Footer />
              <br />
            </footer>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
