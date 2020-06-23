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
        `https://bookstoreprojectdut.azurewebsites.net/api/admins`
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
        <PrivateRoute component={AdminRoutes} path="/book" exact />
        <PrivateRoute component={AdminRoutes} path="/user" exact />
        <PrivateRoute component={AdminRoutes} path="/category" exact />
        <PrivateRoute component={AdminRoutes} path="/publisher" exact />
        <PrivateRoute component={AdminRoutes} path="/coupon" exact />
        <PrivateRoute component={AdminRoutes} path="/review" exact />
        <PrivateRoute component={AdminRoutes} path="/shipping" exact />
        <PrivateRoute component={AdminRoutes} path="/subcriber" exact />
        <PrivateRoute component={AdminRoutes} path="/profile" exact />
        <PrivateRoute component={AdminRoutes} path="/changepassword" exact />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
  );

  // if (token) {
  //   return (
  //     <Router>
  //       <Layout onLogout={handleLog} user={user}>
  //         <Switch>
  //           <Route path="/book" component={Book} />
  //           <Route path="/user" component={User} />
  //           <Route path="/category" component={Category} />
  //           <Route path="/publisher" component={Publisher} />
  //           <Route path="/review" component={Review} />
  //           <Route path="/coupon" component={Coupon} />
  //           <Route path="/shipping" component={Shipping} />

  //           <Route path="/profile" component={Profile} />
  //           <Route path="/changepassword" component={ChangePassword} />
  //           <Redirect exact from="/" to="/book" />
  //           <Redirect exact from="/login" to="/book" />
  //         </Switch>
  //       </Layout>
  //     </Router>
  //   );
  // } else {
  //   return (
  //     <Router>
  //       <Switch>
  //         <Route
  //           exact
  //           path="/login"
  //           render={() => <Login onLogin={handleLog} />}
  //         />
  //         <Redirect exact from="/" to="/login" />
  //         <Redirect exact from="/user" to="/login" />
  //         <Redirect exact from="/book" to="/login" />
  //         <Redirect exact from="/category" to="/login" />
  //         <Redirect exact from="/publisher" to="/login" />
  //         <Redirect exact from="/review" to="/login" />
  //         <Redirect exact from="/coupon" to="/login" />
  //         <Redirect exact from="/shipping" to="/login" />
  //         <Redirect exact from="/profile" to="/login" />
  //       </Switch>
  //     </Router>
  //   );
  // }
}

export default App;
