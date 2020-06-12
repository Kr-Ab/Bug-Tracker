import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [listProjects, setListProjects] = useState([]);
  const [user, setUser] = useState("");
  const [myPersonel, setMyPersonel] = useState([]);
  const [listTickets, setListTickets] = useState([]);
  const [typeUser, setTypeUser] = useState("");

  const value = {
    isAuth,
    setIsAuth,
    listProjects,
    setListProjects,
    user,
    setUser,
    myPersonel,
    setMyPersonel,
    listTickets,
    setListTickets,
    typeUser,
    setTypeUser,
    activateAuth: token => {
      setIsAuth(true);
      window.sessionStorage.setItem("token", token);
    },
    removeAuth: () => {
      setIsAuth(false);
      // navigate("/getin");
      navigate("/");
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("active");
      window.location.reload();
    }
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default { Provider };
