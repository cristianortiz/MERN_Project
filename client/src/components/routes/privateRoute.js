import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import authContext from "../../context/auth/authContext";

//high order component to protects internals routes
const PrivateRoute = ({ component: Component, ...props }) => {
  const AuthContext = useContext(authContext);
  const { auth, loading, authenticatedUser } = AuthContext;

  //to keep the auth prop as true if app is reloaded
  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        //if there is not logged user redirect to "/"
        !auth && !loading ? (
          <Redirect to="/" />
        ) : (
          //if a user is logged redirect to a component
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
