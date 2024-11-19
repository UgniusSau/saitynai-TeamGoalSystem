import React, { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../services/authProvider";

export const PrivateRoute = ({ children, accessLevel }) => {
  const userContext = useContext(UserContext);
  const userAccessLevel =
    userContext?.user?.decodedJwt?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  if (userAccessLevel !== undefined && accessLevel.includes(userAccessLevel)) {
    return children;
  }

  return <Navigate to="/login" />;
};
