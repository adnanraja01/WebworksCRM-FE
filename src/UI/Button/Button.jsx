import React from "react";

import styles from "./Button.module.scss";

import { Loader } from "./loader/Loader";

export const Button = (props) => {
  return (
    <button
      type={props.type || "submit"}
      onClick={props.onClick}
      className={`${styles.btn} ${props.className}`}
    >
      {!props.loading ? props.children : null}
      {props.loading ? <Loader /> : null}
    </button>
  );
};
