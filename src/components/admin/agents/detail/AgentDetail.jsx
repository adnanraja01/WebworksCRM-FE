import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../../../hooks/use-http";
import { getRequest } from "../../../../lib/api";

import ProfileIcon from "../../../../assets/svg-new/breadcrumbs/user-profile.svg";

import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";
import { NameCard } from "./name/NameCard";
import { SingleInfo } from "./info/SingleInfo";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { agentDetailUrl } from "../../../../url";

import styles from "./AgentDetail.module.scss";

export const AgentDetail = () => {
  const params = useParams();
  const agentId = params.Id;
  const url = `${agentDetailUrl}${agentId}`;
  const { sendRequest, status, data, error } = useHttp(getRequest, true);

  useEffect(() => {
    sendRequest(url);
  }, [sendRequest, url]);

  console.log(data);
  if (status === "pending") {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <>
        <Breadcrumb
          icon={ProfileIcon}
          title="Agent"
          link="Home / Agents / Profile"
        />
        <h1>{error}</h1>
      </>
    );
  }
  if (status === "completed" && !error) {
    const agent = data?.data;
    return (
      <>
        <Breadcrumb
          icon={ProfileIcon}
          title="Agent"
          link="Home / Agents / Profile"
        />
        <div className={styles.agent_info_wrapper}>
          <NameCard firstName={agent?.first_name} lastName={agent?.last_name} />
          <div className={styles.agent_info_container}>
            <SingleInfo detail={agent?.username} title="Username" />
            <SingleInfo detail={agent?.email} title="Email" />
            <SingleInfo detail={agent?.no_of_clients} title="No. of Clients" />
            <SingleInfo detail={agent?.no_of_sales} title="Sales" />
          </div>
        </div>
      </>
    );
  }
};
