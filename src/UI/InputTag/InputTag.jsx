import React from "react";
import styles from "./InputTag.module.scss";

export const InputTag = (props) => {
  return (
    <div className={styles.input}>
      <input
      className={props.className}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
        autoComplete="off"
        required
      />
      <label className={styles.input_label}>{props.label}</label>
    </div>
  );
};
