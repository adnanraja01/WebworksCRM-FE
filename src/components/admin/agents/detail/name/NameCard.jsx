import React from "react";

import AgentDp from "../../../../../assets/images/agent-dp.png";
import {
  ToUpperCase,
  upperCaseFunc,
} from "../../../../../UI/ToUpperCase/ToUpperCase";
import styles from "./NameCard.module.scss";

export const NameCard = (name) => {
  const agentName = upperCaseFunc(`${name.firstName} ${name.lastName}`);
  return (
    <div className={styles.name_card_wrapper}>
      <div className={styles.name_card_img}>
        <img src={AgentDp} alt="agent dp" />
      </div>
      <h2>{agentName}</h2>
    </div>
  );
};
