import React from "react";
import { Link } from "react-router-dom";

// import styles from "./OrderList.module.scss";

import { Button } from "../../../../UI/Button/Button";
import { ToUpperCase } from "../../../../UI/ToUpperCase/ToUpperCase";
import { DateFormat } from "../../../../UI/DateFormat/DateFormat";

export const TableConstants = (props) => {
  return [
    {
      title: "ID",
      render: (rowData) => {
        return <span>{rowData.id}</span>;
      },
    },
    {
      title: "Client Name",
      render: (rowData) => {
        return <ToUpperCase str={rowData.client} />;
      },
    },
    {
      title: "Date",
      render: (rowData) => {
        return <DateFormat isoString={rowData.date} />;
      },
    },
    // {
    //   title: "Service",
    //   render: (rowData) => {
    //     return <ToUpperCase str={rowData.client.call_related} />;
    //   },
    // },
    // {
    //   title: "Phone",
    //   render: (rowData) => {
    //     return <span>{rowData.client.phone_number}</span>;
    //   },
    // },
    {
      title: "Price",
      render: (rowData) => {
        return <span>{rowData.total_price}</span>;
      },
    },
    {
      title: "Detail",
      render: (rowData) => {
        return (
          <Link to={`${rowData.id}`}>
            <Button>Detail</Button>
          </Link>
        );
      },
    },
  ];
};
