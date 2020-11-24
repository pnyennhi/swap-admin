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
import "antd/dist/antd.css";

import Login from "./containers/Login/Login";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoutes from "./AdminRoutes";
import PageNotFound from "./PageNotFound";

import { toast } from "react-toastify";

import Axios from "./Instance";

import { updateUser, deleteUser } from "./redux/actions/user";
import { useSelector } from "react-redux";

toast.configure();
function App() {
  const token = localStorage.getItem("TOKEN_AUTH");
  // const [user, setUser] = useState(null);

  // const handleLog = (user) => {
  //   // setUser(user);
  //   if (user) updateUser(user);
  //   else deleteUser();
  // };

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (token) {
      Axios.get(
        // `https://bookstoreprojectdut.azurewebsites.net/api/admins`
        `http://localhost:3001/users/profile`
      ).then((res) => {
        // setUser(res.data);
        updateUser(res.data);
      });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PrivateRoute component={AdminRoutes} path="/" exact />
        <PrivateRoute component={AdminRoutes} path="/dashboard" exact />
        <PrivateRoute component={AdminRoutes} path="/book" exact />
        <PrivateRoute component={AdminRoutes} path="/verifyProduct" exact />
        <PrivateRoute component={AdminRoutes} path="/user" exact />
        <PrivateRoute component={AdminRoutes} path="/category" exact />
        <PrivateRoute component={AdminRoutes} path="/publisher" exact />
        <PrivateRoute component={AdminRoutes} path="/coupon" exact />
        <PrivateRoute component={AdminRoutes} path="/order" exact />
        <PrivateRoute component={AdminRoutes} path="/review" exact />
        <PrivateRoute component={AdminRoutes} path="/contact" exact />
        <PrivateRoute component={AdminRoutes} path="/shipping" exact />
        <PrivateRoute component={AdminRoutes} path="/subcriber" exact />
        <PrivateRoute component={AdminRoutes} path="/profile" exact />
        <PrivateRoute component={AdminRoutes} path="/changepassword" exact />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
