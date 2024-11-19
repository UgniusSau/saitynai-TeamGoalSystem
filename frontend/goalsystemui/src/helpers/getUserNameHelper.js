export const getUserName = (userObject) => {
  return (
    userObject?.user?.decodedJwt?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ] || "Guest"
  );
};
