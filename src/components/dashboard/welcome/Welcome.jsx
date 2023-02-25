import React, { useContext } from "react";

import AuthContext from "../../../store/auth-context";

import { upperCaseFunc } from "../../../UI/ToUpperCase/ToUpperCase";
import AgentImg from "../../../assets/images/agent-dp.png";

import sytles from "./Welcome.module.scss";

export const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const userName = upperCaseFunc(authCtx.loggedUser);
  return (
    <div className={sytles.welcome_wrapper}>
      <h3><span><img src ={AgentImg} alt="hi agent"/></span>Hi {userName},</h3>
      <h1>Welcome back!</h1>
    </div>
  );
};
