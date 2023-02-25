// Error

import React, { Fragment, useEffect, useState } from "react";

import styles from "./OrderList.module.scss";

import pgStyle from "../../../../UI/PaginationStyle/PaginationStyle.module.scss";

import useHttp from "../../../../hooks/use-http";

import { getRequest } from "../../../../lib/api";
import { orderListUrl } from "../../../../url";

import OrdersIcon from "../../../../assets/svg-new/breadcrumbs/orders.svg";
import OrderIcon from "../../../../assets/svg-new/navbar/orders.svg";

import { Table } from "../../../table/Table";
import { TableConstants } from "./ListConstant";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";
import ReactPaginate from "react-paginate";

export const OrderList = () => {
  const [pageCount, setPageCount] = useState(1);
  const { sendRequest, status, data, error } = useHttp(getRequest, true);
  const limit = 7;

  let url = `${orderListUrl}/?page=${pageCount}&limit=${limit}`;

  useEffect(() => {
    sendRequest(url);
  }, [sendRequest, pageCount]);

  const handlePageChange = ({ selected: selectedPage }) => {
    // let currentPage = datum.selected + 1;
    // debugger;
    setPageCount(selectedPage);
    // console.log(currentPage);
  };
  console.log(pageCount);
  if (status === "pending") {
    return (
      <div className={`spinner`}>
        <Spinner />
      </div>
    );
  }
  return (
    <Fragment>
      <Breadcrumb icon={OrdersIcon} title="Orders" link="Home / Orders" />
      <Table
        cols={TableConstants()}
        data={data?.results}
        heading="List of Orders"
        headerImg={OrderIcon}
        className={styles.order_table}
      />
      <ReactPaginate
        previousLabel={" < "}
        nextLabel={" > "}
        breakLabel={"..."}
        pageCount={+Math.ceil(data?.count / limit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        containerClassName={pgStyle.pagination_container}
        pageClassName={pgStyle.pagination_page}
        pageLinkClassName={pgStyle.pagination_page_link}
        previousClassName={pgStyle.pagination_page}
        previousLinkClassName={pgStyle.pagination_page_link}
        nextClassName={pgStyle.pagination_page}
        nextLinkClassName={pgStyle.pagination_page_link}
        breakClassName={pgStyle.pagination_break}
        breakLinkClassName={pgStyle.pagination_break_link}
        activeClassName={pgStyle.pagination_active}
        // forcePage={pageCount}
      />
    </Fragment>
  );
};
