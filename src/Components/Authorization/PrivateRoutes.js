import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
// let properties;

export const UserRoute = ({ component: Component, auth, ...rest }) => (
// eslint-disable-next-line
  auth = useSelector(state => state.auth),
  // properties = useSelector(state => state.landingReducer.properties),
  <Route
    {...rest}
    render={props =>

      (auth.isAuthenticated === true && (auth.user['role'] === 'Contributor' || auth.user['role'] === 'Limited Access Contributor' || auth.user['role'] === 'Scrum Master' || auth.user['role'] === 'Product Owner' || auth.user['role'] === "NA")) ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    }
  />

);
export const AdminRoute = ({ component: Component, auth, ...rest }) => (
  // eslint-disable-next-line
    auth = useSelector(state => state.auth),
  
    <Route
      {...rest}
      render={props =>
  
        (auth.isAuthenticated === true && (auth.user['role'] === "admin" || auth.user['role'] === "Admin")) ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  
  );




