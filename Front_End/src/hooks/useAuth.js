import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  const login = (userDataFromServer) => {
  setUser(userDataFromServer);  // store the user
  setPage("app");               // move away from login
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
