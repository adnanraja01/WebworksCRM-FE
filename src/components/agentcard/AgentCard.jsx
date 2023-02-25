import React from "react";
import { Link } from "react-router-dom";

import styles from "./AgentCard.module.scss";

import SendIcon from "../../assets/svg/send.svg";

import ProfileImg from "../../assets/images/profile-picture.jpg";
import { Button } from "../../UI/Button/Button";
import { ToUpperCase } from "../../UI/ToUpperCase/ToUpperCase";

export const AgentCard = (props) => {
  return (
    <div className={`${styles.card_container} ${props.className}`}>
      <div className={styles.card_profile}>
        <div className={styles.card_profile_img}>
          <img src={ProfileImg} alt="profile" />
        </div>
        <h2 className={styles.card_profile_name}>
          <ToUpperCase
            str={`${props.data.first_name} ${props.data.last_name}`}
          />
        </h2>
        <h4 className={styles.card_profile_designation}>
          {props.data.username}
        </h4>
        <h4 className={styles.card_profile_email}>{props.data.email}</h4>
        <Link to={`${props.data.id}`}>
          <Button className={styles.card_profile_btn}>
            <span>Detail</span>
            <img src={SendIcon} alt="send" />
          </Button>
        </Link>
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_info_status}>
          <h4 className={styles.card_info_status_type}>Sales</h4>
          <h2 className={styles.card_info_status_data}>
            {props.data.no_of_sales}
          </h2>
        </div>
        <div className={styles.card_info_status}>
          <h4 className={styles.card_info_status_type}>Clients</h4>
          <h2 className={styles.card_info_status_data}>
            {props.data.no_of_clients}
          </h2>
        </div>
        <div className={styles.card_info_status}>
          <h4 className={styles.card_info_status_type}>Amount</h4>
          <h2 className={styles.card_info_status_data}>
            {props.data.total_amount}
          </h2>
        </div>
      </div>
    </div>
  );
};
