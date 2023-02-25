import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isAdmin: false,
  setAdmin: (value) => {},
  loggedUser: "",
  setUsername: (string) => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  let storedUserBoolean;
  const storedUser = localStorage.getItem("isAdmin");
  if (storedUser === "true") {
    storedUserBoolean = true;
  }
  if (storedUser === "false") {
    storedUserBoolean = false; // error in user role
  }
  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    isAdmin: storedUserBoolean,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  let initialUser;
  if (tokenData) {
    initialUser = tokenData.isAdmin;
  }

  const [token, setToken] = useState(initialToken);
  const [isAdmin, setIsAdmin] = useState(initialUser);
  const [userName, setUserName] = useState("");
  const userIsLoggedIn = !!token;
  const isSuperAdmin = !!isAdmin;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsAdmin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
   

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, user) => {
    setToken(token);
    setIsAdmin(user);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  const setAdminHandler = (value) => {
    setIsAdmin(value);
  };
  const setUserHandler = (str) => {
    setUserName(str);
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    isAdmin: isSuperAdmin,
    setAdmin: setAdminHandler,
    loggedUser: userName,
    setUsername: setUserHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
