import React, { Fragment, useEffect, useState } from "react";

import styles from "./OrderList.module.scss";

import OrdersIcon from "../../../../assets/svg-new/breadcrumbs/orders.svg";
import OrderIcon from "../../../../assets/svg-new/navbar/orders.svg";

import { Table } from "../../../table/Table";
import { TableConstants } from "./ListConstant";
import apiUrl from "../../../../url";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState("");

  const limit = 7;
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiUrl.get(
        `/api/admin/orders/?page=${page}&limit=${limit}`
      );
      setError("");
      setOrders(data.results);
      setIsLoading(false);
      const total = data.count;
      setPageCount(+Math.ceil(total / limit));
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setOrders([]);
    }
  };
  useEffect(() => {
    setOrders([]);
    fetchOrders();
  }, [page]);
  const handlePageChange = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  console.log(orders);
  const handleDate = (e) => {
    // console.log(e.target.value);
  };
  return (
    <Fragment>
      <Breadcrumb icon={OrdersIcon} title="Orders" link="Home / Orders" />
      <Table
        cols={TableConstants()}
        data={orders}
        heading="Order List"
        headerImg={OrderIcon}
        className={styles.order_table}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        error={error}
        isDateFilter={true}
        defaultValue="Select Agent"
        handleDate={handleDate}
      />
      {isLoading && (
        <div className={`spinner`}>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};
