import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.scss";

import NavbarLogo from "../../assets/images/WebworksLogo.jpg";
import HomeIcon from "../../assets/svg-new/navbar/home.svg";
import LogoutIcon from "../../assets/svg-new/navbar/logout.svg";
import SettingIcon from "../../assets/svg-new/navbar/settings.svg";
import OrderIcon from "../../assets/svg-new/navbar/orders.svg";
import AgentIcon from "../../assets/svg-new/navbar/agent.svg";
import CilentIcon from "../../assets/svg-new/navbar/cilents.svg";
import AddClientIcon from "../../assets/svg-new/navbar/add-client.svg";

export const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = authCtx.isAdmin;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
    navigate("/login", { replace: true });
  };
  return (
    <div className={styles.aside_nav}>
      <div className={styles.aside_nav_heading}>
        <img src={NavbarLogo} alt="aside navbar logo" />
      </div>
      <div className={styles.aside_nav_navlinks}>
        <ul>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <li
              className={`${styles.aside_nav_navlinks_li} ${styles.active_li}`}
            >
              <span className={styles.aside_nav_navlinks_icon_home}>
                <img src={HomeIcon} alt="home" />
              </span>
              <span className={styles.aside_nav_navlinks_title_home}>Home</span>
            </li>
          </NavLink>

          {isAdmin ? (
            <NavLink
              to="clients"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              <li className={styles.aside_nav_navlinks_li}>
                <span className={styles.aside_nav_navlinks_icon_home}>
                  <img src={CilentIcon} alt="Clients" />
                </span>
                <span className={styles.aside_nav_navlinks_title_home}>
                  Clients
                </span>
              </li>
            </NavLink>
          ) : null}
          {isAdmin ? (
            <NavLink
              to="agents"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              <li className={styles.aside_nav_navlinks_li}>
                <span className={styles.aside_nav_navlinks_icon_home}>
                  <img src={AgentIcon} alt="Agents" />
                </span>
                <span className={styles.aside_nav_navlinks_title_home}>
                  Agents
                </span>
              </li>
            </NavLink>
          ) : null}
          {!isAdmin ? (
            <NavLink
              to="/clients/add"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              <li className={styles.aside_nav_navlinks_li}>
                <span className={styles.aside_nav_navlinks_icon_home}>
                  <img src={AddClientIcon} alt="add Client" />
                </span>
                <span className={styles.aside_nav_navlinks_title_home}>
                  Add Client
                </span>
              </li>
            </NavLink>
          ) : null}
          {isAdmin ? (
            <NavLink
              to="orders"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              <li className={styles.aside_nav_navlinks_li}>
                <span className={styles.aside_nav_navlinks_icon_home}>
                  <img src={OrderIcon} alt="Orders" />
                </span>
                <span className={styles.aside_nav_navlinks_title_home}>
                  Orders
                </span>
              </li>
            </NavLink>
          ) : null}
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <li className={styles.aside_nav_navlinks_li}>
              <span className={styles.aside_nav_navlinks_icon_home}>
                <img src={SettingIcon} alt="Settings" />
              </span>
              <span className={styles.aside_nav_navlinks_title_home}>
                Settings
              </span>
            </li>
          </NavLink>
          <li className={styles.aside_nav_navlinks_li} onClick={logoutHandler}>
            <span className={styles.aside_nav_navlinks_icon_home}>
              <img src={LogoutIcon} alt="Log Out" />
            </span>
            <span className={styles.aside_nav_navlinks_title_home}>
              Log Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
