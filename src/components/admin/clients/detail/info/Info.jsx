import React from "react";
import { ToUpperCase } from "../../../../../UI/ToUpperCase/ToUpperCase";

import styles from "./Info.module.scss";

export const Info = (props) => {
  return (
    <div className={styles.info_container}>
      <h4>{<ToUpperCase str={props.title || "Title"} />}</h4>
      <p>{<ToUpperCase str={props.detail || "Detail"} />}</p>
    </div>
  );
};
