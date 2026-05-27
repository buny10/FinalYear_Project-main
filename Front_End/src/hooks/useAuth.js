import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  const login = (u) => {
    setUser(u);
    setPage("app");
  };

  const register = (u) => {
    setUser({ ...u, role: "Admin" });
    setPage("app");
  };

  const logout = () => {
    setUser(null);
    setPage("login");
  };

  return { user, setUser, page, setPage, login, register, logout };
}
