import React, { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../services/authProvider";

export const PrivateRoute = ({ children, accessLevel }) => {
  const userContext = useContext(UserContext);
  const userAccessLevel =
    userContext?.user?.decodedJwt?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  if (
    Array.isArray(userAccessLevel) &&
    userAccessLevel.some((role) => accessLevel.includes(role))
  ) {
    return children;
  } else if (
    typeof userAccessLevel === "string" &&
    accessLevel.includes(userAccessLevel)
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
