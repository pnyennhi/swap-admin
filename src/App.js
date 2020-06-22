import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./containers/Login/Login";
import Layout from "./containers/Layout/Layout";
import Book from "./containers/Book/Book";
import User from "./containers/User/User";
import Category from "./containers/Category/Category";
import Publisher from "./containers/Publisher/Publisher";
import Profile from "./containers/Personal/Profile";
import ChangePassword from "./containers/Personal/ChangePassword";
import Review from "./containers/Review/Review";
import Coupon from "./containers/Coupon/Coupon";
import Shipping from "./containers/Shipping/Shipping";
import { toast } from "react-toastify";

import Axios from "./Instance";

toast.configure();
function App() {
  const token = localStorage.getItem("TOKEN_AUTH");
  const [user, setUser] = useState(null);

  const handleLog = (user) => {
    setUser(user);
  };

  useEffect(() => {
    if (token) {
      Axios.get(
        `https://bookstoreprojectdut.azurewebsites.net/api/admins`
      ).then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  // return (
  //   <Router>
  //     <Switch>
  //       <PublicRoute restricted={true} component={Login} path="/login" exact />
  //       <PrivateRoute component={Review} path="/review" exact />
  //       <Redirect exact from="/" to="/login" />
  //     </Switch>
  //   </Router>
  // );

  if (token) {
    return (
      <Router>
        <Layout onLogout={handleLog} user={user}>
          <Switch>
            <Route path="/book" component={Book} />
            <Route path="/user" component={User} />
            <Route path="/category" component={Category} />
            <Route path="/publisher" component={Publisher} />
            <Route path="/review" component={Review} />
            <Route path="/coupon" component={Coupon} />
            <Route path="/shipping" component={Shipping} />

            <Route path="/profile" component={Profile} />
            <Route path="/changepassword" component={ChangePassword} />
            <Redirect exact from="/" to="/book" />
            <Redirect exact from="/login" to="/book" />
          </Switch>
        </Layout>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login onLogin={handleLog} />}
          />
          <Redirect exact from="/" to="/login" />
          <Redirect exact from="/user" to="/login" />
          <Redirect exact from="/book" to="/login" />
          <Redirect exact from="/category" to="/login" />
          <Redirect exact from="/publisher" to="/login" />
          <Redirect exact from="/review" to="/login" />
          <Redirect exact from="/coupon" to="/login" />
          <Redirect exact from="/shipping" to="/login" />
          <Redirect exact from="/profile" to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
