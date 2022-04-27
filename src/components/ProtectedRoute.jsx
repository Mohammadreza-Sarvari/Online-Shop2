import { useAuth } from "../contexts/Auth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({path, component, key}) => {
  const { user } = useAuth();
  return user.loggedIn ? (
    <Route path={path} component={component} key={key} />
  ) : (
    <Redirect to="/login" key={key}></Redirect>
  );
};

export default ProtectedRoute;
