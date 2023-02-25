import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../../../../store/auth-context";

import styles from "./ClientDetail.module.scss";

import DetailIcon from "../../../../assets/svg-new/breadcrumbs/detail.svg";
import DetailWhiteIcon from "../../../../assets/svg-new/breadcrumbs/detailWhite.svg";
import ClientDp from "../../../../assets/images/agent-dp.png";

import { NameCard } from "./name_card/NameCard";
import { Info } from "./info/Info";

import { Table } from "../../../table/Table";
import { TableConstants } from "./DetailConstant";
import apiUrl from "../../../../url";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";
import { Button } from "../../../../UI/Button/Button";

export const ClientDetail = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = false || authCtx.isAdmin;
  const [orders, setOrders] = useState([]);
  const [transOrders, setTransOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [transError, setTransError] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const limit = 5;

  const params = useParams();
  const fetchOrders = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await apiUrl.get(
        `/api/admin/client-details/${params.Id}`
      );
      setOrders(data.data.client_details);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  const fetchTransaction = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await apiUrl.get(
        `/api/agent/transactions/${params.Id}/?page=${page}&limit=${limit}`
      );
      setTransOrders(data.results);
      setIsLoading(false);
      const total = data.count;
      setPageCount(+Math.ceil(total / limit));
    } catch (err) {
      setIsLoading(false);
      setTransError(err.message);
      setTransOrders([]);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    setTransOrders([]);
    fetchTransaction();
  }, [page]);
  const handlePageChange = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  return (
    <Fragment>
      <Breadcrumb
        icon={DetailIcon}
        title="Client Details"
        link="Home / Clients / Details"
      />
      {orders && !isLoading && (
        <div className={styles.client_detail_container}>
          <div className={styles.client_detail_wrapper}>
            <NameCard img={ClientDp} name={orders.name} />
            <div className={styles.client_detail_info}>
              <Info detail={orders.email} title="Email" />
              <Info detail={orders.phone_number} title="Contact" />
              <Info detail={orders.agent} title="Agent" />
            </div>
            {isAdmin && (
              <Link to="/orders/add">
                <Button className={styles.client_detail_btn}>
                  Create Order
                </Button>
              </Link>
            )}
          </div>
          <Table
            className={styles.client_table}
            heading="Transactions List"
            headerImg={DetailWhiteIcon}
            cols={TableConstants()}
            data={transOrders}
            error={transError}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
      {error ? <p className={styles.client_detail_error}>{error}</p> : null}
      {isLoading && !error && (
        <div className={`spinner`}>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};
