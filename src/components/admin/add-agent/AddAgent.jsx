import React from "react";

import AddAgentIcon from "../../../assets/svg-new/breadcrumbs/add-agent.svg";

import { Breadcrumb } from "../../breadcrumb/Breadcrumb";
import { AgentForm } from "../../agent/agent_form/AgentForm";

export const AddAgent = () => {
  return (
    <div className="flex flex-col">
      <Breadcrumb
        icon={AddAgentIcon}
        title="Add Agent"
        link="Home / Agents / Add"
      />
      <AgentForm />
    </div>
  );
};
