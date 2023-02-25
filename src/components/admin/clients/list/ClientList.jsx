import React, { useState, useEffect, Fragment, useCallback } from "react";

import styles from "./ClientList.module.scss";

import useHttp from "../../../../hooks/use-http";
import { getRequest } from "../../../../lib/api";

import ClientIcon from "../../../../assets/svg-new/breadcrumbs/clients.svg";
import ClientWhiteIcon from "../../../../assets/svg-new/breadcrumbs/clientsWhite.svg";

import { Table } from "../../../table/Table";
import { TableConstants } from "./ListConstant";
import { agentListUrl } from "../../../../url";
import apiUrl from "../../../../url";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";

export const ClientList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [errorCl, setError] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const { sendRequest, status, data, error } = useHttp(getRequest, true);
  const limit = 7;
  useEffect(() => {
    sendRequest(agentListUrl);
  }, [sendRequest]);

  const agents = data?.results;
  const agentList = [];
  for (const key in agents) {
    const agent = {
      id: agents[key]?.id,
      name: `${agents[key]?.first_name} ${agents[key]?.last_name}`,
    };
    agentList.push(agent);
  }
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await apiUrl.get(
        `/api/admin/list-clients/?agent=${filterValue}&page=${page}&limit=${limit}`
      );
      setOrders(data.results);
      setIsLoading(false);
      const total = data.count;
      setPageCount(+Math.ceil(total / limit));
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setOrders([]);
    }
  }, [filterValue]);
  useEffect(() => {
    setOrders([]);
    fetchOrders();
  }, [page, fetchOrders, filterValue]);

  const handlePageChange = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const filterHandle = (e) => {
    e.preventDefault();
    setFilterValue(+e.target.value);
    setSelectValue(agentList.name);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFilterValue("");
    setSelectValue("");
  };
  return (
    <Fragment>
      <Breadcrumb icon={ClientIcon} title="Clients" link="Home / Clients" />
      <Table
        cols={TableConstants()}
        data={orders}
        error={error}
        heading="Client List"
        className={styles.client_table}
        headerImg={ClientWhiteIcon}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        isFilter={true}
        filterOptions={agentList}
        filterHandle={filterHandle}
        filterValue={filterValue}
        handleFilter={filterHandle}
        defaultValue="Select Agent"
        clearFilter={handleReset}
        selectValue={selectValue}
      />
      {isLoading && (
        <div className={`spinner`}>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};
