import { createContext, useContext, useState } from "react";
import {
  clearStoredAuth,
  getStoredAuth,
  getStoredToken,
  setStoredAuth
} from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth();
  const [token, setToken] = useState(getStoredToken());
  const [username, setUsername] = useState(storedAuth?.username || "");

  const login = (authPayload) => {
    setStoredAuth(authPayload);
    setToken(authPayload.token);
    setUsername(authPayload.username);
  };

  const logout = () => {
    clearStoredAuth();
    setToken("");
    setUsername("");
  };

  const value = {
    token,
    username,
    isAuthenticated: Boolean(token),
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
