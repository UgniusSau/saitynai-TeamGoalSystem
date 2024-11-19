import { createContext, useState, useEffect } from "react";
import authService from "./auth";

export const UserContext = createContext(null);

function AuthenticationProvider({ children }) {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);

  useEffect(() => {
    const currentUser = authService.getUserInfo();
    setUser(currentUser);
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, []);

  const isLoggedIn = !!user;

  const logout = () => {
    authService.removeCookies();
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const login = (token) => {
    authService.setCookies(token);
    const currentUser = authService.getUserInfo();
    setUser(currentUser);
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        isLoggedIn,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthenticationProvider;
