import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import loading from "../assets/images/loading.gif";

const PrivateAdminRoute = ({ type, component: Component, ...rest }) => {
  const user = useSelector((store) => store.user);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <img src={loading} className="loading" width="50px" />
        ) : user.permissions.indexOf(type.toUpperCase()) < 0 ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateAdminRoute;
