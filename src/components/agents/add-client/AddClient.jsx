import React from "react";

import AddAgentIcon from "../../../assets/svg-new/breadcrumbs/add-agent.svg";

import { Breadcrumb } from "../../breadcrumb/Breadcrumb";
import { ClientForm } from "../../agent/client_form/ClientForm";

export const AddClient = () => {
  return (
    <div className="flex flex-col">
      <Breadcrumb
        icon={AddAgentIcon}
        title="Add Client"
        link="Home / Client / Add"
      />
      <ClientForm />
    </div>
  );
};
