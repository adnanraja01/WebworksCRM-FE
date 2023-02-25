import React from "react";

import styles from "./SingleInfo.module.scss"

export const SingleInfo = (info) => {
  return (
    <div className={styles.single_detail_wrapper}>
      <h4>{info?.title}</h4>
      <p>{info?.detail}</p>
    </div>
  );
};
