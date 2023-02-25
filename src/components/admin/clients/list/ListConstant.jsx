import React from "react";

import { Link } from "react-router-dom";
import { Button } from "../../../../UI/Button/Button";
import { ToUpperCase } from "../../../../UI/ToUpperCase/ToUpperCase";

export const TableConstants = (props) => {
  return [
    {
      title: "ID",
      render: (rowData) => {
        return <span>{rowData.id}</span>;
      },
    },
    {
      title: "Name",
      render: (rowData) => {
        return <ToUpperCase str={rowData.name} />;
      },
    },
    {
      title: "Phone",
      render: (rowData) => {
        return <span>{rowData.phone_number}</span>;
      },
    },
    {
      title: "Email",
      render: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      title: "Agent",
      render: (rowData) => {
        return (
          <ToUpperCase
            str={`${rowData.agent.first_name} ${rowData.agent.last_name}`}
          />
        );
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
