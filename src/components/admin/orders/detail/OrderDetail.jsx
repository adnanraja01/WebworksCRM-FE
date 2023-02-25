import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import styles from "./OrderDetail.module.scss";

import DetailIcon from "../../../../assets/svg-new/breadcrumbs/detail.svg";
import ClientDp from "../../../../assets/images/agent-dp.png";

import apiUrl from "../../../../url";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";
import { NameCard } from "../../clients/detail/name_card/NameCard";
import { Info } from "../../clients/detail/info/Info";

export const OrderDetail = () => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiUrl.get(
          `api/admin/order-details/${params.Id}`
        );
        const dataArr = [data.data];
        setOrders(dataArr);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <Fragment>
      <Breadcrumb
        icon={DetailIcon}
        title="Order Details"
        link="Home / Orders / Details"
      />
      {orders && (
        <div className={styles.order_detail_container}>
          <div className={styles.order_detail_wrapper}>
            <NameCard img={ClientDp} name={orders.client} />
            <div className={styles.order_detail_info}>
              <Info detail={orders.agent} title="Agent" />
              <Info detail={orders.price} title="Price" />
              <Info detail={orders.date} title="Date" />
              <Info detail={orders.payment_mode} title="Payment Mode" />
            </div>
          </div>
          <div className={styles.order_detail_desc}>
            <div className={`${styles.order_detail_desc_head} `}>
              <h1>Description</h1>
            </div>
            <h2>{`${orders.description} || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            iusto soluta fugiat, facere deserunt laboriosam atque et hic ipsa
            eius voluptatibus consequuntur esse alias illo sequi doloribus unde
            vero id? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur quam accusantium voluptates illum sit ad dicta fugiat,
            cumque nesciunt vitae sequi aliquam obcaecati voluptatem ex
            assumenda nulla iure at corporis natus voluptatum quae dolor esse
            ratione? Delectus commodi et eius perspiciatis iusto ducimus
            laudantium labore maxime optio. Voluptatum, enim Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Quis nobis expedita saepe
            odit. Rerum dolore quis velit odit placeat at perspiciatis maxime
            hic culpa consectetur dolor quas provident accusantium, fugit eaque
            magni sint debitis ipsum facere.`}</h2>
          </div>
        </div>
      )}
      {error ? <p className={styles.order_detail_error}>{error}</p> : null}
      {isLoading && (
        <div className={`spinner`}>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};
