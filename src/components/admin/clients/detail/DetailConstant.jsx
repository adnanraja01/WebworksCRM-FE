import React, { useState } from "react";

import styles from "./ClientDetail.module.scss";

import { ToUpperCase } from "../../../../UI/ToUpperCase/ToUpperCase";
import { DateFormat } from "../../../../UI/DateFormat/DateFormat";
import { Button } from "../../../../UI/Button/Button";

export const TableConstants = () => {
  const handleShow = (e) => {
    e.preventDefault();
    console.log("clicked");
    const popup = document.getElementById("popup");
    popup.classList.toggle("show");
  };
  return [
    {
      title: "ID",
      render: (rowData) => {
        return <span>{rowData.id}</span>;
      },
    },
    {
      title: "Date",
      render: (rowData) => {
        return <DateFormat isoString={rowData.date} />;
      },
    },
    {
      title: "Transaction Type",
      render: (rowData) => {
        return <span>{rowData.transaction_type}</span>;
      },
    },
    {
      title: "Agent",
      render: (rowData) => {
        return <ToUpperCase str={rowData.updated_by} />;
      },
    },
    {
      title: "Amount",
      render: (rowData) => {
        return <span>{rowData.amount}</span>;
      },
    },
    {
      title: "Description",
      render: (rowData) => {
        return (
          <>
            <span className={styles.show}>Desc</span>
            <span className={styles.hide}>{rowData.description}</span>
          </>
        );
      },
    },
  ];
};
