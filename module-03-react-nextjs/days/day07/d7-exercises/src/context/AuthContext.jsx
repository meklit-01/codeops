import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// EXERCISE 2 — Separate providers
export function AuthProvider({ children }) {
  const [user, setUser] = useState("Student");

  function login() {
    setUser("Student");
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
