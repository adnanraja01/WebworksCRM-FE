import React from "react";

import styles from "./client-search.module.scss";

export const AdminClientSearch = () => {
  return (
    <div className={styles.client_search_wrapper}>
      <div className={styles.client_search_container}>
        <input
          type="text"
          placeholder="Search Client"
          className={styles.client_search_input}
        />
        <select name="options" id="options">
          <option value="id">Id</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
    </div>
  );
};
