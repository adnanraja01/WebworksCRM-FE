import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import styles from "./Breadcrumb.module.scss";

import PersonIcon from "../../assets/svg/dashboard/person.svg";
import { upperCaseFunc } from "../../UI/ToUpperCase/ToUpperCase";


export const Breadcrumb = (path) => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const userName = upperCaseFunc(authCtx.loggedUser);

  const pathLinks = path?.link?.split(" ");

  return (
    <div className={styles.breadcrumb_wrapper}>
      <div className={styles.breadcrumb_div_left}>
        <h1>{path?.title}</h1>
        <img src={path?.icon} alt="breadcrumbs" />
        <div className={styles.breadcrumb_links}>
          {pathLinks?.map((link, key) => {
            return <p key={key}>{link}</p>;
          })}
        </div>
      </div>
      <div className={styles.breadcrumb_user}>
        <div className={styles.breadcrumb_user_img}>
          <img src={PersonIcon} alt="user" />
        </div>
        <p>Hi {isAdmin ? "Admin" : `${userName}`} !</p>
      </div>
    </div>
  );
};
