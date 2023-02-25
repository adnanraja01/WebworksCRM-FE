import React, { Fragment, useEffect, useState, useCallback } from "react";

import styles from "./AgentList.module.scss";

import AgentsIcon from "../../../../assets/svg-new/breadcrumbs/clients.svg";

import { AgentCard } from "../../../agentcard/AgentCard";
import apiUrl from "../../../../url";
import { Spinner } from "../../../../UI/Spinner/Spinner";
import { Breadcrumb } from "../../../breadcrumb/Breadcrumb";

export const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAgents = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const { data } = await apiUrl.get(`/api/admin/list-agents`);
      setAgents(data.results);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setAgents([]);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return (
    <Fragment>
      <Breadcrumb icon={AgentsIcon} title="Agents" link="Home / Agents" />
      <div className={styles.agentlist_container}>
        {agents?.map((data, key) => (
          <AgentCard key={key} data={data} />
        ))}
        {error && <p className={styles.agentlist_error}>{error}</p>}
      </div>
      {isLoading && (
        <div className={`spinner`}>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};
