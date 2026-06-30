import { useState,  } from 'react';

export function useAuth() {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

const [page, setPage] = useState(() => {
  return localStorage.getItem("user") ? "app" : "login";
});

const login = (userDataFromServer) => {
  localStorage.setItem("user", JSON.stringify(userDataFromServer));

  setUser(userDataFromServer);
  setPage("app");
};

  const register = (u) => {
  const newUser = { ...u, role: "Admin" };

  localStorage.setItem("user", JSON.stringify(newUser));

  setUser(newUser);
  setPage("app");
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  setPage("login");
};
  return { user, setUser, page, setPage, login, register, logout };
}
