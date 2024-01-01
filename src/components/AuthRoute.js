import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";

const AuthRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    console.log("ofoff", user);
    return <Navigate to="/admin" />;
  } else {
    return children;
  }
};

export default AuthRoute;
