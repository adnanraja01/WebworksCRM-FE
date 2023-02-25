import React from "react";

import styles from "./DateFilter.module.scss";

export const DateFilter = ({
  className,
  dateValue,
  minValue,
  handleDate,
  dateFilterTitle,
}) => {
  return (
    <div className={`${className} ${styles.date_filter_container}`}>
      <h2>{dateFilterTitle || "Filter"}</h2>
      <input
        type="date"
        // defaultValue={}
        value={dateValue}
        min={minValue || "2015-01-01"}
        onChange={handleDate}
      />
    </div>
  );
};
