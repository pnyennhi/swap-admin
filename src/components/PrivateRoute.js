import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((store) => store.user);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("TOKEN_AUTH") ? (
          <Component {...props} />
        ) : user?.role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
