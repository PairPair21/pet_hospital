import { useState } from "react";
import jwt_decode from "jwt-decode";

function useToken() {
  const saveToken = (tokenData) => {
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenData);
  };
  const saveUser = (userData) => {
    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const saveRole = (userRole) => {
    window.localStorage.setItem("role", JSON.stringify(userRole));
    setRole(userRole);
  };

  const getToken = () => {
    let tokenString = window.localStorage.getItem("token");
    let userString = window.localStorage.getItem("user");
    let roleString = window.localStorage.getItem("role");

    let userToken = JSON.parse(tokenString);
    let userData = JSON.parse(userString);
    let userRole = JSON.parse(roleString);

    if (userToken) {
      let decodeTime = jwt_decode(userToken);
      let currentTime = Math.floor(new Date().getTime() / 1000);

      if (decodeTime.exp - currentTime <= 0) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("role");

        return { userToken: "", userData: "", userRole: "" };
      }

      return { userToken, userData, userRole };
    } else {
      return { userToken: "", userData: "", userRole: "" };
    }
  };

  const clearToken = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("role");

    setToken("");
    setUser("");
    setRole("");
  };

  const [token, setToken] = useState(getToken().userToken);
  const [user, setUser] = useState(getToken().userData);
  const [role, setRole] = useState(getToken().userRole);

  return {
    token,
    saveToken,
    clearToken,
    user,
    saveUser,
    role,
    saveRole,
  };
}

export { useToken };
