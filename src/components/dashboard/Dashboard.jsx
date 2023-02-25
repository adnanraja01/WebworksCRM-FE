import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import HomeIcon from "../../assets/svg-new/breadcrumbs/home.svg";
import TransactionIcon from "../../assets/svg-new/breadcrumbs/transaction.svg";

import styles from "./Dashboard.module.scss";

import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import { Welcome } from "./welcome/Welcome";
import { SearchClient } from "./search/SearchClient";
import { AgentCards } from "./card/agent-card";
import { Card } from "./card/Card";
import { Table } from "../table/Table";
import { AdminClientSearch } from "./admin-search/client-search";

export const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;

  console.log(isAdmin);

  if (isAdmin) {
    return (
      <>
        <div className="mt-20 mr-12">
          <Breadcrumb icon={HomeIcon} title="Home" link="Home / Dashboard" />
          <AdminClientSearch />
          <Card />
          {/* <Table
              className={styles.transaction_table}
              heading="Transactions"
              pageCount={3}
              headerImg={TransactionIcon}
            /> */}
        </div>
      </>
    );
  }
  if (!isAdmin) {
    return (
      <div className="mt-20 mr-12 items-center flex flex-col">
        <Welcome />
        <div className={styles.agent_dash_body}>
          <SearchClient />
          <AgentCards />
        </div>
      </div>
    );
  }
};
