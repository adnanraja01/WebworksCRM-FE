import React from "react";

import AddAgentIcon from "../../../assets/svg-new/breadcrumbs/add-agent.svg";

import { Breadcrumb } from "../../breadcrumb/Breadcrumb";
import { Description } from "../../agent/description_form/Description";

export const AddDescription = () => {
  return (
    <div className="flex flex-col">
      <Breadcrumb
        icon={AddAgentIcon}
        title="Add Call"
        link="Home / Client / Description"
      />
      <Description />
    </div>
  );
};
