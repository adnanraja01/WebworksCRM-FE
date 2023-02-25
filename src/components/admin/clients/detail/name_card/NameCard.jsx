import React from "react";

import styles from "./NameCard.module.scss";

import { ToUpperCase } from "../../../../../UI/ToUpperCase/ToUpperCase";

export const NameCard = (props) => {
  return (
    <div className={styles.name_card_container}>
      <div className={styles.name_card_img}>
        <img src={props.img} alt="client dp" />
      </div>
      <h2>{<ToUpperCase str={props.name || "Name"} />}</h2>
    </div>
  );
};
