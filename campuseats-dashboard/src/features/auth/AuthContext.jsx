import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("campuseats_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("campuseats_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("campuseats_token", token);
    } else {
      localStorage.removeItem("campuseats_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("campuseats_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("campuseats_user");
    }
  }, [user]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("campuseats_token");
    localStorage.removeItem("campuseats_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
