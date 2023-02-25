import React from "react";

import styles from "./FilterDropdown.module.scss";

import { ToUpperCase } from "../ToUpperCase/ToUpperCase";

export const FilterDropdown = ({
  className,
  dropdownFiltertitle,
  defaultValue,
  filterOptions,
  handleFilter,
  selectValue,
}) => {
  return (
    <div className={`${className} ${styles.filter_container}`}>
      <h2>{dropdownFiltertitle || "Filter"}</h2>
      <select value={selectValue} onChange={handleFilter}>
        <option value="" selected disabled hidden>
          {defaultValue || "Filter"}
        </option>
        {filterOptions?.map((option, key) => (
          <option key={key} value={option.id}>
            <ToUpperCase str={option.name} />
          </option>
        ))}
      </select>
    </div>
  );
};
