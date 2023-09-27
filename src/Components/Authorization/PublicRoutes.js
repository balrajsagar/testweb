import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getRoleCount } from "../Common/LocalStorage";
let properties;

const PublicRoute = ({ component: Component, auth, ...rest }) => (
  // eslint-disable-next-line
  auth = useSelector(state => state.auth),
  properties = useSelector(state => state.landingReducer.properties),
  console.log(properties.CONTRIBUTOR, properties.SCRUM_MASTER, properties.PRODUCT_OWNER),
  <Route
  {...rest}
  render={props => {
    if (!auth.isAuthenticated) {
      return <Component {...props} />;
    } else {
      if (
        auth.user['role'] === 'Contributor' ||
        auth.user['role'] === 'Limited Access Contributor' ||
        auth.user['role'] === 'Scrum Master' ||
        auth.user['role'] === 'Product Owner'
      ) {
        return <Redirect to="/dashboard" />;
      } else if (
        (getRoleCount('roleCount') >= 1 || auth.user['roleCount'] >= 1) &&
        auth.user['role'] === 'Admin'
      ) {
        return <Redirect to="admin/reports" />;
      } else if (
        (getRoleCount('roleCount') >= 1 || auth.user['roleCount'] >= 1) &&
        auth.user['role'] !== 'Admin'
      ) {
        return <Redirect to="/sprints" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  }}
/>


);
export default PublicRoute;
